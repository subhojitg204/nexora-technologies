const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const pool = require("./db");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Allow requests from your local React app


 // Allow requests from local React and live Vercel website
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Parse incoming JSON
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Basic API rate limiting
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "NEXORA Technologies Backend API",
    status: "running",
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NEXORA Backend is running successfully!",
    timestamp: new Date().toISOString(),
  });
});

const { z } = require("zod");

// Validate contact form submissions
const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(2000),
});

// Contact form API

app.post("/api/contact", async (req, res) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid contact information.",
      errors: z.flattenError(result.error),
    });
  }

  const { name, email, subject, message } = result.data;

  const phone =
    typeof req.body.phone === "string"
      ? req.body.phone.trim().slice(0, 20)
      : null;

  try {
    const savedMessage = await pool.query(
      `INSERT INTO contact_messages
       (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [name, email, phone, subject, message]
    );

    return res.status(201).json({
      success: true,
      message: "Your message has been saved successfully!",
      id: savedMessage.rows[0].id,
    });
  } catch (error) {
    console.error("Database insert failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save your message. Please try again.",
    });
  }
});

const ADMIN_COOKIE = "nexora_admin";

app.post("/api/admin/login", requireTrustedOrigin, async (req, res) => {
  try {
    const loginSchema = z.object({
      email: z.email(),
      password: z.string().min(1),
    });

    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid login details.",
      });
    }

    const { email, password } = validation.data;

    const configuredEmail = process.env.ADMIN_EMAIL;
    const configuredHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!configuredEmail || !configuredHash || !jwtSecret) {
      console.error("Admin authentication is not configured.");

      return res.status(503).json({
        success: false,
        message: "Authentication service unavailable.",
      });
    }

    const emailMatches =
      email.toLowerCase() === configuredEmail.toLowerCase();

    const passwordMatches = await bcrypt.compare(
      password,
      configuredHash
    );

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      jwtSecret,
      {
        expiresIn: "1h",
        issuer: "nexora-api",
        audience: "nexora-admin",
      }
    );

   
res.cookie(ADMIN_COOKIE, token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 60 * 60 * 1000,
  path: "/api/admin",
});
 

    return res.json({
      success: true,
      message: "Admin login successful!",
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to log in. Please try again.",
    });
  }
});

function requireAdmin(req, res, next) {
  const token = req.cookies?.nexora_admin;

  if (!token || !process.env.JWT_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "nexora-api",
      audience: "nexora-admin",
      algorithms: ["HS256"],
    });

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Administrator access required.",
      });
    }

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid. Please log in again.",
    });
  }
}

app.post("/api/admin/logout", requireTrustedOrigin, (req, res) => {
  res.clearCookie(ADMIN_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/api/admin",
  });

  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
});

app.get("/api/admin/messages", requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, phone, subject, message, status, created_at
       FROM contact_messages
       ORDER BY created_at DESC, id DESC
       LIMIT 100`
    );

    return res.json({
      success: true,
      messages: result.rows,
    });
  } catch (error) {
    console.error("Unable to retrieve messages:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load customer inquiries.",
    });
  }
});

function requireTrustedOrigin(req, res, next) {
  const origin = req.get("Origin");

  const trustedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  if (!origin || !trustedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Request origin not allowed.",
    });
  }

  next();
}

app.patch("/api/admin/messages/:id/status", requireTrustedOrigin, requireAdmin, async (req, res) => {

  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = ["New", "In Progress", "Resolved"];

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message status.",
      });
    }

    const result = await pool.query(
      `UPDATE contact_messages
       SET status = $1
       WHERE id = $2
       RETURNING id, status`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    return res.json({
      success: true,
      message: "Status updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Status update error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update message status.",
    });
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Start backend server
app.listen(PORT, () => {
  console.log(`NEXORA Backend running on http://localhost:${PORT}`);
});
