import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tailwindcss from "@tailwindcss/vite";
import contactHandler from "./api/contact.js";

// https://vitejs.dev/config/
const createContactApiMiddleware = () => ({
  name: "contact-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/contact", (req, res) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", async () => {
        const request = req;
        request.body = body.trim().length ? body : {};

        const response = Object.assign(res, {
          status(code: number) {
            res.statusCode = code;
            return response;
          },
          json(payload: unknown) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
            return response;
          },
        });

        try {
          await contactHandler(request, response);
        } catch (error) {
          if (!res.writableEnded) {
            response
              .status(500)
              .json({ error: "Failed to send your message. Please try again shortly." });
          }
        }
      });
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      tailwindcss(),
      react(),
      mode === "development" && componentTagger(),
      createContactApiMiddleware(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
