#!/usr/bin/env node
/**
 * Simple test server to run Firebase functions locally
 */

require("dotenv").config();

const functions = require("./lib/function/src/index.js");
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "50mb" }));

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Root path - serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

// Mount the resumeAI function
const resumeAIFunction = functions.resumeAI;
app.post("/resumeAI", async (req, res) => {
  try {
    await resumeAIFunction(req, res);
  } catch (error) {
    console.error("Function error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`✅ Resume AI Helper server running on http://localhost:${PORT}`);
  console.log(`📝 API Endpoint: http://localhost:${PORT}/resumeAI`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`\n🎯 You can now test the application!`);
  console.log(`🌐 Update the API_URL in frontend/public/index.html to point to this server`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
