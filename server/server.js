import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(express.json({ limit: "100kb" }));

// CORS: allow localhost static servers; adjust as needed
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5500,http://127.0.0.1:5500,http://localhost:8080,http://127.0.0.1:8080"
).split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no origin (like curl or file://) and allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

// Utilities
function sanitizeString(value, maxLen) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  const withoutControl = trimmed.replace(/[\x00-\x1F\x7F]/g, "");
  const collapsed = withoutControl.replace(/\s+/g, " ");
  return collapsed.slice(0, maxLen);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildText({ name, email, phone, message }) {
  return `New inquiry from the website:\n\nName: ${name}\nEmail: ${email}\nPhone: ${
    phone || "-"
  }\n\nMessage:\n${message}`;
}

function buildHtml({ name, email, phone, message }) {
  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[c])
    );
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;font-size:14px;color:#222">
      <h2>New inquiry from the website</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Phone:</strong> ${esc(phone || "-")}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space:pre-wrap;border-left:3px solid #8a1113;padding-left:10px">${esc(
        message
      )}</div>
    </div>
  `;
}

// Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: String(process.env.SMTP_SECURE) === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", limiter, async (req, res) => {
  try {
    const {
      name: rawName,
      email: rawEmail,
      phone: rawPhone,
      message: rawMessage,
      company: rawCompany, // honeypot
    } = req.body || {};

    const name = sanitizeString(rawName, 120);
    const email = sanitizeString(rawEmail, 200);
    const phone = sanitizeString(rawPhone, 60);
    const message = sanitizeString(rawMessage, 2000);
    const company = sanitizeString(rawCompany, 50);

    if (company) {
      return res.status(400).json({ ok: false, error: "spam_detected" });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "missing_fields" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "invalid_email" });
    }

    const toEmail = process.env.TO_EMAIL || "info@albhurhanregional.com";
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;

    const mail = {
      from: fromEmail,
      to: toEmail,
      subject: `New Inquiry from ${name}`,
      replyTo: email,
      text: buildText({ name, email, phone, message }),
      html: buildHtml({ name, email, phone, message }),
    };

    await transporter.sendMail(mail);
    return res.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error:", err?.message || err);
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

app.listen(PORT, () => {
  console.log(`Contact server listening on http://localhost:${PORT}`);
});
