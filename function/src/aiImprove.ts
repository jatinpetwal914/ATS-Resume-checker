import { GoogleGenerativeAI } from "@google/generative-ai";
import { LLM_PROMPTS, SYSTEM_PROMPT_IMPROVE } from "./shared/prompts";
import { AIImprovementResult } from "./shared/types";
import { getRoleKeywords, getRoleATSKeywords } from "./shared/skillMaps";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function aiImprove(
  resumeText: string,
  jobRole: string,
  company: string,
  jobDescription?: string
): Promise<AIImprovementResult> {
  try {
    // Extract job keywords if job description is provided
    const jobKeywords =
      jobDescription && jobDescription.length > 0
        ? await extractJobKeywords(jobDescription)
        : getRoleKeywords(jobRole);

    // Create the improvement prompt
    const improvePrompt = LLM_PROMPTS.IMPROVE_RESUME.replace(
      "{resume}",
      resumeText
    )
      .replace("{jobRole}", jobRole)
      .replace("{company}", company)
      .replace("{jobKeywords}", jobKeywords.join(", "));

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT_IMPROVE}\n\n${improvePrompt}`,
            },
          ],
        },
      ],
    });

    // Parse response
    const content = result.response.text() || "{}";
    let improvedData;

    try {
      improvedData = JSON.parse(content);
    } catch {
      // If JSON parsing fails, create default response
      improvedData = {
        improvedBullets: [
          {
            improved:
              "Increased system efficiency by 25% through optimization",
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
    const result_data: AIImprovementResult = {
      improvedBullets: (improvedData.improvedBullets || []).map((bullet: any) => ({
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
  } catch (error: any) {
    console.error("Error in aiImprove:", error.message);

    // Fallback response if API fails
    return {
      improvedBullets: [
        {
          improved: "Increased efficiency and delivered results on time",
          reasoning:
            "Added specificity and action-oriented language",
          impactScore: 70,
        },
      ],
      formatTips: [
        "Start bullet points with strong action verbs",
        "Add quantifiable metrics (%, $, numbers)",
        "Avoid tables, icons, and special characters",
        "Keep one idea per bullet point",
      ],
      keywordSuggestions: getRoleATSKeywords(jobRole).slice(0, 8),
      toneAnalysis: {
        current: "mixed",
        suggestion: "Use active voice and specific achievements",
      },
      estimatedImprovementScore: 10,
    };
  }
}

// Helper function to extract keywords from job description
async function extractJobKeywords(jobDescription: string): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent({
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
    });

    const content = result.response.text() || "[]";
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      const keywords = JSON.parse(jsonMatch ? jsonMatch[0] : "[]");
      return Array.isArray(keywords) ? keywords.filter(k => typeof k === 'string') : [];
    } catch {
      return [];
    }
  } catch (error) {
    console.error("Error extracting keywords:", error);
    return [];
  }
}
