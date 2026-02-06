import { VercelRequest, VercelResponse } from "@vercel/node";
import { uploadResume } from "../function/lib/function/src/uploadResume";
import { parseResume } from "../function/lib/function/src/parseResume";
import { analyzeATS } from "../function/lib/function/src/analyzeATS";
import { aiImprove } from "../function/lib/function/src/aiImprove";
import { generateResume } from "../function/lib/function/src/generateResume";
import { ResumeAnalysisRequest, ResumeAnalysisResponse } from "../function/lib/function/src/shared/types";

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    const startTime = Date.now();
    const request: ResumeAnalysisRequest = req.body;

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
          processingTimeMs: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    // Parse resume - either from file or text
    let resumeText = "";
    const parsedResume = {
      text: "",
      sections: [] as any[],
      skills: [] as string[],
      experience: [] as any[],
      education: [] as any[],
      fileName: "resume",
      fileType: "text" as any,
    };

    if (request.resumeFile) {
      // Parse uploaded file
      const uploadResult = uploadResume(request.resumeFile.fileName);
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
      } else if (typeof fileBuffer === "string") {
        fileBuffer = Buffer.from(fileBuffer, "base64");
      }

      resumeText = await parseResume(
        fileBuffer,
        request.resumeFile.fileType
      );
      parsedResume.fileName = request.resumeFile.fileName;
      parsedResume.fileType = request.resumeFile.fileType;
    } else if (request.resumeText) {
      resumeText = request.resumeText;
    } else {
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
    const atsResult = await analyzeATS(
      resumeText,
      request.jobRole,
      request.company,
      request.jobDescription
    );

    // Get AI improvements
    const aiResult = await aiImprove(
      resumeText,
      request.jobRole,
      request.company,
      request.jobDescription
    );

    // Generate improved resume
    const improvedResumeData = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1-234-567-8900",
      linkedin: "linkedin.com/in/johndoe",
      summary:
        "Results-driven professional with expertise in " +
        request.jobRole +
        " seeking to drive impact at " +
        request.company,
      experience: [
        {
          title: "Senior " + request.jobRole,
          company: "Tech Company",
          duration: "2022 - Present",
          bullets: aiResult.improvedBullets.slice(0, 3).map((b: any) => b.improved),
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

    const generatedResume = generateResume(
      request.targetFormat || "IIT",
      improvedResumeData
    );

    // Calculate potential improvement
    const potentialScore = Math.min(100, atsResult.atsScore + 20);

    const response: ResumeAnalysisResponse = {
      success: true,
      data: {
        parsedResume,
        atsAnalysis: atsResult,
        aiImprovements: aiResult,
        generatedResume,
        summary: {
          currentScore: atsResult.atsScore,
          potentialScore: potentialScore,
          topIssues: atsResult.issues.slice(0, 3).map((i: any) => i.message),
          quickWins: aiResult.formatTips.slice(0, 3),
        },
      },
      metadata: {
        processingTimeMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error("Error in resumeAI:", error);

    const response: ResumeAnalysisResponse = {
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
};
