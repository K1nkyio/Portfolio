import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import pg from "pg";
import nodemailer from "nodemailer";

const app = express();
const port = Number(process.env.PORT || 3001);
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: true } : undefined });
app.disable("x-powered-by");
app.set("trust proxy", process.env.TRUST_PROXY === "true" ? 1 : false);
app.use(helmet());
app.use(express.json({ limit: "12kb" }));
app.use("/api/contact", rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: "draft-8", legacyHeaders: false, message: { error: "Too many messages. Please try again later." } }));

const inquirySchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(254), topic: z.string().trim().min(1).max(80), message: z.string().trim().min(10).max(5000), website: z.string().max(0).optional().default("") });

function hasDatabasePlaceholders() {
  const value = process.env.DATABASE_URL || "";
  return /(?:@HOST:|:\/\/USER:PASSWORD@|\/DATABASE(?:\?|$))/i.test(value);
}

app.post("/api/contact", async (req, res) => {
  const parsed = inquirySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Please check the form fields and try again." });
  const { name, email, topic, message, website } = parsed.data;
  if (website) return res.status(202).json({ ok: true });
  const provider = (process.env.EMAIL_PROVIDER || "smtp").toLowerCase();
  const emailConfigured = provider === "resend"
    ? Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM)
    : Boolean(process.env.SMTP_HOST && (process.env.SMTP_USER ? process.env.SMTP_PASS : true));
  if (!process.env.DATABASE_URL || hasDatabasePlaceholders()) return res.status(503).json({ error: "Database is not configured. Replace the sample USER, PASSWORD, HOST, and DATABASE values in DATABASE_URL with your PostgreSQL connection details." });
  if (!process.env.CONTACT_TO || !emailConfigured) return res.status(503).json({ error: "Contact email is not configured. Check the selected email provider settings." });
  let inquiry;
  try {
    const result = await pool.query("INSERT INTO inquiries (name, email, topic, message) VALUES ($1, $2, $3, $4) RETURNING id, created_at", [name, email, topic, message]);
    inquiry = result.rows[0];
  } catch (error) {
    const code = error?.code;
    console.error("Could not store contact inquiry", code || error?.name || "database error");
    if (code === "ENOTFOUND" || code === "ECONNREFUSED" || code === "ETIMEDOUT") return res.status(503).json({ error: "Could not reach PostgreSQL. Check the database host and connection settings in DATABASE_URL." });
    return res.status(503).json({ error: "We couldn't save your message. Please try again shortly." });
  }
  try {
    const subject = `Portfolio inquiry: ${topic}`;
    const text = `Inquiry #${inquiry.id}\nFrom: ${name} <${email}>\nTopic: ${topic}\n\n${message}`;
    if (provider === "resend") {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: process.env.EMAIL_FROM, to: [process.env.CONTACT_TO], reply_to: email, subject, text }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) {
        console.error("Resend notification failed with status", response.status);
        throw new Error("Email notification failed");
      }
    } else {
      const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === "true", auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined });
      await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER || process.env.CONTACT_TO, to: process.env.CONTACT_TO, replyTo: email, subject, text });
    }
  } catch (error) {
    console.error(`Inquiry ${inquiry.id} was stored but its email notification failed`, error);
    return res.status(202).json({ ok: true, notification: "delayed" });
  }
  return res.status(201).json({ ok: true });
});

app.get("/health", async (_req, res) => {
  if (!process.env.DATABASE_URL || hasDatabasePlaceholders()) return res.status(503).json({ ok: false, database: "not configured" });
  try { await pool.query("SELECT 1"); return res.json({ ok: true, database: "connected" }); }
  catch (error) { console.error("Database health check failed", error?.code || error?.name || "database error"); return res.status(503).json({ ok: false, database: "unavailable" }); }
});
app.listen(port, () => console.log(`Contact API listening on port ${port}`));
if (hasDatabasePlaceholders()) console.warn("DATABASE_URL still contains sample placeholder values; contact submissions are disabled until it is configured.");
