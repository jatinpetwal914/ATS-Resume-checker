"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = exports.resumeAI = void 0;
const https_1 = require("firebase-functions/v2/https");
const generativeClient_1 = require("./generativeClient");
const uploadResume_1 = require("./uploadResume");
const parseResume_1 = require("./parseResume");
const analyzeATS_1 = require("./analyzeATS");
const aiImprove_1 = require("./aiImprove");
const generateResume_1 = require("./generateResume");
exports.resumeAI = (0, https_1.onRequest)(async (req, res) => {
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    }
    try {
        // Initialize Gemini client (ensures model is ready)
        (0, generativeClient_1.initGenerativeClient)(process.env.GEMINI_API_KEY, "gemini-1.5-flash");
        const startTime = Date.now();
        const request = req.body;
        // Validate input
        if (!request) {
            res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_REQUEST",
                    message: "Request body is required",
                },
                metadata: {
                    processingTimeMs: 0,
                    timestamp: new Date().toISOString(),
                },
            });
            return;
        }
        if (!request.jobRole || !request.company) {
            res.status(400).json({
                success: false,
                error: {
                    code: "MISSING_FIELDS",
                    message: "jobRole and company are required",
                },
                metadata: {
                    processingTimeMs: 0,
                    timestamp: new Date().toISOString(),
                },
            });
            return;
        }
        // Parse resume - either from file or text
        let resumeText = "";
        const parsedResume = {
            text: "",
            sections: [],
            skills: [],
            experience: [],
            education: [],
            fileName: "resume",
            fileType: "text",
        };
        if (request.resumeFile) {
            // Parse uploaded file
            const uploadResult = (0, uploadResume_1.uploadResume)(request.resumeFile.fileName);
            if (!uploadResult.success) {
                res.status(400).json({
                    success: false,
                    error: {
                        code: "UPLOAD_FAILED",
                        message: uploadResult.message,
                    },
                    metadata: {
                        processingTimeMs: Date.now() - startTime,
                        timestamp: new Date().toISOString(),
                    },
                });
                return;
            }
            // Convert array to Buffer if needed
            let fileBuffer = request.resumeFile.content;
            if (Array.isArray(fileBuffer)) {
                fileBuffer = Buffer.from(fileBuffer);
            }
            else if (typeof fileBuffer === "string") {
                fileBuffer = Buffer.from(fileBuffer, "base64");
            }
            resumeText = await (0, parseResume_1.parseResume)(fileBuffer, request.resumeFile.fileType);
            parsedResume.fileName = request.resumeFile.fileName;
            parsedResume.fileType = request.resumeFile.fileType;
        }
        else if (request.resumeText) {
            resumeText = request.resumeText;
        }
        else {
            res.status(400).json({
                success: false,
                error: {
                    code: "NO_RESUME",
                    message: "Either resumeFile or resumeText is required",
                },
                metadata: {
                    processingTimeMs: 0,
                    timestamp: new Date().toISOString(),
                },
            });
            return;
        }
        // Extract resume data
        parsedResume.text = resumeText;
        // Analyze resume with ATS
        const atsResult = await (0, analyzeATS_1.analyzeATS)(resumeText, request.jobRole, request.company, request.jobDescription);
        // Get AI improvements
        const aiResult = await (0, aiImprove_1.aiImprove)(resumeText, request.jobRole, request.company, request.jobDescription);
        // Generate improved resume
        const improvedResumeData = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1-234-567-8900",
            linkedin: "linkedin.com/in/johndoe",
            summary: "Results-driven professional with expertise in " +
                request.jobRole +
                " seeking to drive impact at " +
                request.company,
            experience: [
                {
                    title: "Senior " + request.jobRole,
                    company: "Tech Company",
                    duration: "2022 - Present",
                    bullets: aiResult.improvedBullets.slice(0, 3).map((b) => b.improved),
                },
            ],
            education: [
                {
                    degree: "Bachelor of Science",
                    field: "Computer Science",
                    institution: "University",
                    year: "2020",
                },
            ],
            skills: [...atsResult.matchedKeywords, ...aiResult.keywordSuggestions],
            projects: [
                {
                    title: "AI Resume Optimizer Project",
                    duration: "2024",
                    bullets: ["Increased resume ATS compatibility by 40%"],
                },
            ],
        };
        const generatedResume = (0, generateResume_1.generateResume)(request.targetFormat || "IIT", improvedResumeData);
        // Calculate potential improvement
        const potentialScore = Math.min(100, atsResult.atsScore + 20);
        const response = {
            success: true,
            data: {
                parsedResume,
                atsAnalysis: atsResult,
                aiImprovements: aiResult,
                generatedResume,
                summary: {
                    currentScore: atsResult.atsScore,
                    potentialScore: potentialScore,
                    topIssues: atsResult.issues.slice(0, 3).map((i) => i.message),
                    quickWins: aiResult.formatTips.slice(0, 3),
                },
            },
            metadata: {
                processingTimeMs: Date.now() - startTime,
                timestamp: new Date().toISOString(),
            },
        };
        res.json(response);
    }
    catch (error) {
        console.error("Error in resumeAI:", error);
        const response = {
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: error.message || "An error occurred during analysis",
                details: process.env.NODE_ENV === "development" ? error.stack : undefined,
            },
            metadata: {
                processingTimeMs: 0,
                timestamp: new Date().toISOString(),
            },
        };
        res.status(500).json(response);
    }
});
// Health check endpoint
exports.health = (0, https_1.onRequest)((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
