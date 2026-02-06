"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiImprove = aiImprove;
const prompts_1 = require("./shared/prompts");
const skillMaps_1 = require("./shared/skillMaps");
const generativeClient_1 = require("./generativeClient");
async function aiImprove(resumeText, jobRole, company, jobDescription) {
    try {
        // Extract job keywords if job description is provided
        const jobKeywords = jobDescription && jobDescription.length > 0
            ? await extractJobKeywords(jobDescription)
            : (0, skillMaps_1.getRoleKeywords)(jobRole);
        // Create the improvement prompt
        const improvePrompt = prompts_1.LLM_PROMPTS.IMPROVE_RESUME.replace("{resume}", resumeText)
            .replace("{jobRole}", jobRole)
            .replace("{company}", company)
            .replace("{jobKeywords}", jobKeywords.join(", "));
        // Call Gemini API
        const model = (0, generativeClient_1.getGenerativeModel)();
        let result = null;
        if (model && typeof model.generateContent === "function") {
            result = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `${prompts_1.SYSTEM_PROMPT_IMPROVE}\n\n${improvePrompt}`,
                            },
                        ],
                    },
                ],
            });
        }
        // Parse response
        const content = (result && result.response && typeof result.response.text === "function")
            ? result.response.text()
            : "{}";
        let improvedData;
        try {
            improvedData = JSON.parse(content);
        }
        catch (_a) {
            // If JSON parsing fails, create default response
            improvedData = {
                improvedBullets: [
                    {
                        improved: "Increased system efficiency by 25% through optimization",
                        reasoning: "Added metrics and quantification",
                        impactScore: 85,
                    },
                ],
                missingKeywords: jobKeywords.slice(0, 5),
                formatTips: [
                    "Start each bullet with a strong action verb",
                    "Include specific metrics and percentages",
                    "Keep bullet points to 1-2 lines",
                ],
                estimatedImprovement: 15,
            };
        }
        // Ensure all required fields exist
        const result_data = {
            improvedBullets: (improvedData.improvedBullets || []).map((bullet) => ({
                original: bullet.original || "",
                improved: bullet.improved || "",
                reasoning: bullet.reasoning || "Improved for ATS compatibility",
                impactScore: bullet.impactScore || 75,
            })),
            formatTips: improvedData.formatTips || [
                "Use action verbs at the start of each bullet point",
                "Add numbers to show quantifiable impact",
                "Avoid tables, images, and special characters",
                "Keep consistent formatting throughout",
            ],
            keywordSuggestions: improvedData.missingKeywords || jobKeywords.slice(0, 5),
            toneAnalysis: {
                current: "mixed",
                suggestion: "Use more active voice and specific metrics",
            },
            estimatedImprovementScore: improvedData.estimatedImprovement || 15,
        };
        return result_data;
    }
    catch (error) {
        console.error("Error in aiImprove:", error.message);
        // Fallback response if API fails
        return {
            improvedBullets: [
                {
                    improved: "Increased efficiency and delivered results on time",
                    reasoning: "Added specificity and action-oriented language",
                    impactScore: 70,
                },
            ],
            formatTips: [
                "Start bullet points with strong action verbs",
                "Add quantifiable metrics (%, $, numbers)",
                "Avoid tables, icons, and special characters",
                "Keep one idea per bullet point",
            ],
            keywordSuggestions: (0, skillMaps_1.getRoleATSKeywords)(jobRole).slice(0, 8),
            toneAnalysis: {
                current: "mixed",
                suggestion: "Use active voice and specific achievements",
            },
            estimatedImprovementScore: 10,
        };
    }
}
// Helper function to extract keywords from job description
async function extractJobKeywords(jobDescription) {
    try {
        const model = (0, generativeClient_1.getGenerativeModel)();
        const result = model && typeof model.generateContent === "function"
            ? await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are an expert in extracting job requirements. Extract the top 10 most important keywords, skills, and phrases from this job description. Return ONLY a JSON array of strings, nothing else.\n\nJob description:\n${jobDescription}`,
                            },
                        ],
                    },
                ],
            })
            : null;
        const content = (result && result.response && typeof result.response.text === "function")
            ? result.response.text()
            : "[]";
        try {
            // Extract JSON from the response
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            const keywords = JSON.parse(jsonMatch ? jsonMatch[0] : "[]");
            return Array.isArray(keywords) ? keywords.filter(k => typeof k === 'string') : [];
        }
        catch (_a) {
            return [];
        }
    }
    catch (error) {
        console.error("Error extracting keywords:", error);
        return [];
    }
}
