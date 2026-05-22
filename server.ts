import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const INQUIRIES_FILE = path.join(process.cwd(), "inquiries.json");

// Parse JSON bodies
app.use(express.json());

// Initialize Google GenAI securely
// Check for GEMINI_API_KEY. Use lazy-loading or dummy error fallback so it doesn't crash on startup.
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is missing.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Ensure inquiries store exists
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf8");
}

// Read inquiries helper
const readInquiries = () => {
  try {
    const data = fs.readFileSync(INQUIRIES_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading inquiries:", err);
    return [];
  }
};

// Write inquiries helper
const writeInquiries = (data: any) => {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing inquiries:", err);
  }
};

// API: Get inquiries list
app.get("/api/inquiries", (req, res) => {
  const inquiries = readInquiries();
  res.json(inquiries);
});

// API: Submit a new inquiry (admission or contact form)
app.post("/api/inquiries", (req, res) => {
  const { name, phone, grade, subject, message, type } = req.body;
  
  if (!name || !phone) {
    return res.status(400).json({ error: "Student Name and Phone Number are required." });
  }

  const inquiries = readInquiries();
  const newInquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name,
    phone,
    grade: grade || "N/A",
    subject: subject || "N/A",
    message: message || "",
    type: type || "Demo Class Request",
    status: "Pending",
    notes: "",
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  writeInquiries(inquiries);

  res.status(201).json({ success: true, inquiry: newInquiry });
});

// API: Update inquiry status/notes (Admin panel)
app.post("/api/inquiries/:id/update", (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  
  const inquiries = readInquiries();
  const index = inquiries.findIndex((item: any) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Inquiry not found" });
  }

  if (status !== undefined) inquiries[index].status = status;
  if (notes !== undefined) inquiries[index].notes = notes;

  writeInquiries(inquiries);
  res.json({ success: true, inquiry: inquiries[index] });
});

// API: Delete inquiry
app.delete("/api/inquiries/:id", (req, res) => {
  const { id } = req.params;
  const inquiries = readInquiries();
  const filtered = inquiries.filter((item: any) => item.id !== id);

  if (inquiries.length === filtered.length) {
    return res.status(404).json({ error: "Inquiry not found" });
  }

  writeInquiries(filtered);
  res.json({ success: true, message: "Inquiry deleted successfully" });
});

// API: AI Study Counselor Recommendations
app.post("/api/ai/advise", async (req, res) => {
  const { grade, interests, studyGoals, challenge } = req.body;

  if (!grade) {
    return res.status(400).json({ error: "Standard/Grade is required." });
  }

  const ai = getGenAI();
  if (!ai) {
    // Elegant recovery fallback response if no API key is set
    return res.json({
      advice: `### 🌟 Your Personalized Rajeev Classes AI Study Guide

Based on a student in **${grade}** interested in **${interests || "General Studies"}**, here is an expert recommended path:

1. **Focus Areas**: Strengthen core math, analytical reasoning, and structured logic early.
2. **Recommended Subjects**: High attention to board patterns while preparing deep foundations.
3. **Weekly Practice**: We advise taking weekly assessments to map progress.
4. **Rajeev Classes Tip**: Schedule a direct session with Rajeev sir for physical counseling!

*Note: AI Counselor is running in local offline demo mode. Provide a GEMINI_API_KEY in Settings > Secrets for highly customized dynamically generated roadmaps!*`
    });
  }

  try {
    const prompt = `You are the Expert AI Academic Counselor and Mentor at "Rajeev Classes", a premium, friendly, highly successful coaching center in New Delhi for school students of Classes 1st to 12th.
A student in: **${grade}**
Enjoys / interests: **${interests || "General scientific studies and logic"}**
Primary goals: **${studyGoals || "Excel in school midterms, master concepts, build good character"}**
Biggest challenge: **${challenge || "Staying consistently focused and resolving doubts"}**

Provide a detailed, customized, encouraging study plan and stream recommendation.
Structure your markdown response into clear visual sections using emojis and clean typography:
1. **🎓 Stream / Course Recommendation**: Suggest the ideal Rajeev Classes course segment (e.g. Science, Commerce, Foundation). Explain WHY it is perfect for their interests.
2. **🚀 7-Day Study Blueprint**: Outline a simple, structured study timetable with specific subjects and tips tailored to their grade.
3. **💡 Smart Preparation Strategies**: Give 3-4 actionable tips to overcome their biggest challenge.
4. **🎒 Why Rajeev Classes**: Briefly explain how our individual attention, regular tests, and doubt clearing sessions can help them achieve this goal.

Write in a warm, motivating, highly professional, direct mentor tone. Keep the language clean and highly structured, suitable for both parents and students.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const adviceText = response.text || "Failed to generate personal advice. Let's reach out on our phone line!";
    res.json({ advice: adviceText });
  } catch (err: any) {
    console.error("Gemini Advisor Error:", err);
    res.status(500).json({ error: "An error occurred with our GenAI Mentor. Please try again soon." });
  }
});

// Setup development or static serving depending on environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server runs on port ${PORT}`);
  });
}

startServer();
