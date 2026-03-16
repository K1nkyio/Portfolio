import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROJECT_TYPES = new Set(['web', 'mobile', 'ai', 'consulting']);
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_MESSAGE_LENGTH = 1000;

const sanitizeHeader = (value) => value.replace(/[\r\n]/g, ' ').trim();

const parseBody = (body) => {
  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body ?? {};
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const destinationEmail =
    process.env.CONTACT_TO || 'nicholasmaina826@gmail.com';

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({
      error:
        'Email service is not configured. Please set SMTP_USER and SMTP_PASS.',
    });
  }

  let body;

  try {
    body = parseBody(req.body);
  } catch (_error) {
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const projectType =
    typeof body.projectType === 'string' ? body.projectType.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ error: 'Name is invalid.' });
  }

  if (
    email.length < 3 ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_REGEX.test(email)
  ) {
    return res.status(400).json({ error: 'Email is invalid.' });
  }

  if (!PROJECT_TYPES.has(projectType)) {
    return res.status(400).json({ error: 'Project type is invalid.' });
  }

  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Message is invalid.' });
  }

  const safeName = sanitizeHeader(name);
  const safeProjectType = sanitizeHeader(projectType);
  const safeEmail = sanitizeHeader(email);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: destinationEmail,
      replyTo: safeEmail,
      subject: `New ${safeProjectType} inquiry from ${safeName}`,
      text: [
        'New portfolio contact form submission:',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact form email:', error);
    return res.status(500).json({
      error: 'Failed to send your message. Please try again shortly.',
    });
  }
}
