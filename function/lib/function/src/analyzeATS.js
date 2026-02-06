"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeATS = analyzeATS;
const atsRules_1 = require("./shared/atsRules");
const skillMaps_1 = require("./shared/skillMaps");
const generativeClient_1 = require("./generativeClient");
// We'll still keep local heuristics as fallback, but prefer Gemini analysis when available
async function analyzeATS(resumeText, jobRole, company, jobDescription) {
    // Attempt to use Gemini for an ATS-style analysis first
    try {
        const model = (0, generativeClient_1.getGenerativeModel)();
        if (model && typeof model.generateContent === "function") {
            const prompt = `You are an expert ATS reviewer. Given the resume text and job context, produce a JSON object with keys: atsScore (0-100), issues (array of {type,message,severity,fixSuggestion}), missingKeywords (array), matchedKeywords (array), formatting (object), recommendation (string), confidentLevel (high|medium|low). Resume:\n\n${resumeText}\n\nJobRole: ${jobRole}\nCompany: ${company}\nJobDescription: ${jobDescription || ""}`;
            const response = await model.generateContent({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
            });
            const text = (response && response.response && typeof response.response.text === "function")
                ? response.response.text()
                : null;
            if (text) {
                try {
                    const parsed = JSON.parse(text);
                    // Basic validation and fallback mapping
                    const result = {
                        atsScore: typeof parsed.atsScore === "number" ? Math.max(0, Math.min(100, parsed.atsScore)) : atsRules_1.BASE_SCORE,
                        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
                        missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords : [],
                        matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords : [],
                        formatting: parsed.formatting || {
                            length: { pages: 1, words: resumeText.split(/\s+/).length, optimal: true, feedback: "" },
                            structure: { hasHeader: true, hasSections: true, bulletPoints: 0, feedback: "" },
                            readability: { complexWords: 0, avgWordLength: 0, optimal: true, feedback: "" },
                        },
                        recommendation: parsed.recommendation || "",
                        confidentLevel: parsed.confidentLevel || "medium",
                    };
                    return result;
                }
                catch (err) {
                    console.error("Failed to parse Gemini ATS response:", err);
                }
            }
        }
    }
    catch (err) {
        console.error("Gemini ATS analysis failed:", err);
    }
    // Fallback to local heuristic analysis if Gemini fails
    const issues = [];
    let score = atsRules_1.BASE_SCORE;
    // Word count analysis
    const wordCount = resumeText.split(/\s+/).length;
    const characterCount = resumeText.length;
    if (wordCount < atsRules_1.ATS_RULES.length.minWords) {
        issues.push({
            type: "error",
            message: "Resume too short - may lack detail needed by ATS",
            severity: 3,
            fixSuggestion: "Add more descriptions and achievements",
        });
        score -= 10;
    }
    if (wordCount > atsRules_1.ATS_RULES.length.maxWords) {
        issues.push({
            type: "warning",
            message: `Resume is ${wordCount} words - exceeds optimal 1-2 page length`,
            severity: 2,
            fixSuggestion: "Reduce content to 1-1.5 pages",
        });
        score -= 15;
    }
    // Section structure analysis
    const requiredSections = ["experience", "education", "skills"];
    const foundSections = requiredSections.filter((section) => resumeText.toLowerCase().includes(section));
    if (foundSections.length < 3) {
        issues.push({
            type: "error",
            message: `Missing key sections: ${requiredSections
                .filter((s) => !foundSections.includes(s))
                .join(", ")}`,
            severity: 4,
            fixSuggestion: "Add missing sections: Experience, Education, Skills",
        });
        score -= 20;
    }
    // Contact information check
    const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resumeText);
    const hasPhone = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
    const hasName = resumeText.split("\n")[0].length > 5 && resumeText.split("\n")[0].length < 50;
    if (!hasEmail) {
        issues.push({
            type: "error",
            message: "No email address found in resume",
            severity: 5,
            fixSuggestion: "Add your email address at the top of the resume",
        });
        score -= 20;
    }
    if (!hasPhone) {
        issues.push({
            type: "error",
            message: "No phone number found in resume",
            severity: 5,
            fixSuggestion: "Add your phone number in contact information",
        });
        score -= 15;
    }
    // Keyword analysis
    const roleKeywords = (0, skillMaps_1.getRoleKeywords)(jobRole);
    const atsKeywords = (0, skillMaps_1.getRoleATSKeywords)(jobRole);
    const companyProfile = (0, skillMaps_1.getCompanyProfile)(company);
    const matchedKeywords = [];
    const missingKeywords = [];
    const allKeywords = [
        ...roleKeywords,
        ...atsKeywords,
        ...((companyProfile === null || companyProfile === void 0 ? void 0 : companyProfile.keywords) || []),
    ];
    allKeywords.forEach((keyword) => {
        if (resumeText.toLowerCase().includes(keyword.toLowerCase())) {
            matchedKeywords.push(keyword);
        }
        else {
            missingKeywords.push(keyword);
        }
    });
    if (matchedKeywords.length < 5) {
        issues.push({
            type: "warning",
            message: `Only ${matchedKeywords.length} key job-related keywords found`,
            severity: 4,
            fixSuggestion: `Add more keywords: ${missingKeywords.slice(0, 5).join(", ")}`,
        });
        score -= 25;
    }
    else {
        score += matchedKeywords.length * 2;
    }
    // Action verb and metrics checks
    const actionVerbs = [
        "led",
        "developed",
        "implemented",
        "designed",
        "built",
        "optimized",
        "improved",
        "increased",
        "achieved",
        "delivered",
        "managed",
        "created",
    ];
    const hasActionVerbs = actionVerbs.some((verb) => resumeText.toLowerCase().includes(verb));
    if (!hasActionVerbs) {
        issues.push({
            type: "warning",
            message: "No strong action verbs detected in resume",
            severity: 3,
            fixSuggestion: "Start bullet points with action verbs: Led, Developed, Implemented, etc.",
        });
        score -= 10;
    }
    else {
        score += 10;
    }
    const hasMetrics = /\d+%|\$\d+|increased by \d+|reduced by \d+|\d+ (users|customers|team|projects)/i.test(resumeText);
    if (!hasMetrics) {
        issues.push({
            type: "warning",
            message: "No quantified achievements found (metrics, percentages, numbers)",
            severity: 4,
            fixSuggestion: "Add specific metrics: '30% improvement', '$100K saved', etc.",
        });
        score -= 15;
    }
    else {
        score += 15;
    }
    // Finalize
    score = Math.max(0, Math.min(100, score));
    const result = {
        atsScore: score,
        issues,
        missingKeywords: missingKeywords.slice(0, 10),
        matchedKeywords: matchedKeywords.slice(0, 10),
        formatting: {
            length: {
                pages: Math.ceil(wordCount / 250),
                words: wordCount,
                optimal: wordCount >= atsRules_1.ATS_RULES.length.minWords &&
                    wordCount <= atsRules_1.ATS_RULES.length.maxWords,
                feedback: `${wordCount} words (${Math.ceil(wordCount / 250)} pages) - ${wordCount < atsRules_1.ATS_RULES.length.minWords
                    ? "too short"
                    : wordCount > atsRules_1.ATS_RULES.length.maxWords
                        ? "too long"
                        : "optimal"}`,
            },
            structure: {
                hasHeader: hasName,
                hasSections: foundSections.length >= 3,
                bulletPoints: (resumeText.match(/[-•*]\s/g) || []).length,
                feedback: `${foundSections.length}/3 required sections found`,
            },
            readability: {
                complexWords: (resumeText.match(/\b\w{12,}\b/g) || []).length,
                avgWordLength: resumeText
                    .split(/\s+/)
                    .reduce((sum, word) => sum + word.length, 0) / wordCount,
                optimal: (resumeText.match(/\b\w{12,}\b/g) || []).length < wordCount * 0.1,
                feedback: `Readability: ${(resumeText.match(/\b\w{12,}\b/g) || []).length < wordCount * 0.1
                    ? "Good"
                    : "Could be improved"}`,
            },
        },
        recommendation: score >= 80
            ? `Great! Your resume scores ${score}/100. Focus on adding more keywords: ${missingKeywords.slice(0, 3).join(", ")}`
            : score >= 60
                ? `Good foundation! Your resume scores ${score}/100. Address issues above and add: ${missingKeywords.slice(0, 3).join(", ")}`
                : `Your resume needs attention (${score}/100). Follow recommendations above`,
        confidentLevel: score > 80 ? "high" : score > 60 ? "medium" : "low",
    };
    return result;
}
