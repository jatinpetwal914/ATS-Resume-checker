import {
  ATSAnalysisResult,
  ATSIssue,
} from "./shared/types";
import {
  ATS_RULES,
  SCORING_WEIGHTS,
  BASE_SCORE,
  RED_FLAGS,
  GREEN_FLAGS,
  calculateATSScore,
  issueSeverity,
  QUICK_FIXES,
} from "./shared/atsRules";
import { getRoleKeywords, getRoleATSKeywords, getCompanyProfile } from "./shared/skillMaps";

export async function analyzeATS(
  resumeText: string,
  jobRole: string,
  company: string,
  jobDescription?: string
): Promise<ATSAnalysisResult> {
  const issues: ATSIssue[] = [];
  let score = BASE_SCORE;

  // Word count analysis
  const wordCount = resumeText.split(/\s+/).length;
  const characterCount = resumeText.length;

  if (wordCount < ATS_RULES.length.minWords) {
    issues.push({
      type: "error",
      message: "Resume too short - may lack detail needed by ATS",
      severity: 3,
      fixSuggestion: "Add more descriptions and achievements",
    });
    score -= 10;
  }

  if (wordCount > ATS_RULES.length.maxWords) {
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
  const foundSections = requiredSections.filter((section) =>
    resumeText.toLowerCase().includes(section)
  );

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
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(
    resumeText
  );
  const hasPhone = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(
    resumeText
  );
  const hasName =
    resumeText.split("\n")[0].length > 5 && resumeText.split("\n")[0].length < 50;

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
  const roleKeywords = getRoleKeywords(jobRole);
  const atsKeywords = getRoleATSKeywords(jobRole);
  const companyProfile = getCompanyProfile(company);

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  const allKeywords = [
    ...roleKeywords,
    ...atsKeywords,
    ...(companyProfile?.keywords || []),
  ];

  allKeywords.forEach((keyword) => {
    if (resumeText.toLowerCase().includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const keywordMatchPercentage = Math.round(
    (matchedKeywords.length / allKeywords.length) * 100
  );

  if (matchedKeywords.length < 5) {
    issues.push({
      type: "warning",
      message: `Only ${matchedKeywords.length} key job-related keywords found`,
      severity: 4,
      fixSuggestion: `Add more keywords: ${missingKeywords.slice(0, 5).join(", ")}`,
    });
    score -= 25;
  } else {
    score += matchedKeywords.length * 2;
  }

  // Action verb analysis
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

  const hasActionVerbs = actionVerbs.some((verb) =>
    resumeText.toLowerCase().includes(verb)
  );

  if (!hasActionVerbs) {
    issues.push({
      type: "warning",
      message: "No strong action verbs detected in resume",
      severity: 3,
      fixSuggestion:
        "Start bullet points with action verbs: Led, Developed, Implemented, etc.",
    });
    score -= 10;
  } else {
    score += 10;
  }

  // Quantification check
  const hasMetrics = /\d+%|\$\d+|increased by \d+|reduced by \d+|\d+ (users|customers|team|projects)/i.test(
    resumeText
  );

  if (!hasMetrics) {
    issues.push({
      type: "warning",
      message: "No quantified achievements found (metrics, percentages, numbers)",
      severity: 4,
      fixSuggestion: "Add specific metrics: '30% improvement', '$100K saved', etc.",
    });
    score -= 15;
  } else {
    score += 15;
  }

  // Formatting issues
  if (resumeText.includes("[") || resumeText.includes("]")) {
    // Possible table or special formatting
    issues.push({
      type: "warning",
      message: "Possible special characters or formatting that ATS may struggle with",
      severity: 2,
      fixSuggestion: "Use simple formatting: bullet points only, no brackets",
    });
    score -= 5;
  }

  // Experience section analysis
  const experienceSection = resumeText
    .substring(
      resumeText.toLowerCase().indexOf("experience"),
      resumeText.toLowerCase().indexOf("education") || resumeText.length
    )
    .toLowerCase();

  const hasRelevantExp = jobRole
    .toLowerCase()
    .split(" ")
    .some((word) => experienceSection.includes(word));

  if (!hasRelevantExp && jobRole !== "Any") {
    issues.push({
      type: "suggestion",
      message: `Experience may not clearly show ${jobRole} expertise`,
      severity: 2,
      fixSuggestion: "Highlight specific projects and achievements related to the role",
    });
    score -= 5;
  } else if (hasRelevantExp) {
    score += 10;
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));

  // Generate recommendations
  const criticalIssues = issues.filter((i) => i.severity >= 4);
  const topIssues = issues
    .sort((a, b) => b.severity - a.severity)
    .slice(0, 3)
    .map((i) => i.message);

  const quickWins = QUICK_FIXES.filter((fix) =>
    issues.some((issue) => issue.message.toLowerCase().includes(fix.issue.toLowerCase()))
  )
    .slice(0, 3)
    .map((fix) => fix.fix);

  const recommendation =
    score >= 80
      ? `Great! Your resume scores ${score}/100. Focus on adding more keywords: ${missingKeywords.slice(0, 3).join(", ")}`
      : score >= 60
      ? `Good foundation! Your resume scores ${score}/100. Address issues above and add: ${missingKeywords.slice(0, 3).join(", ")}`
      : `Your resume needs attention (${score}/100). ${criticalIssues[0]?.fixSuggestion || "Follow recommendations above"}`;

  const result: ATSAnalysisResult = {
    atsScore: score,
    issues,
    missingKeywords: missingKeywords.slice(0, 10),
    matchedKeywords: matchedKeywords.slice(0, 10),
    formatting: {
      length: {
        pages: Math.ceil(wordCount / 250),
        words: wordCount,
        optimal:
          wordCount >= ATS_RULES.length.minWords &&
          wordCount <= ATS_RULES.length.maxWords,
        feedback: `${wordCount} words (${Math.ceil(wordCount / 250)} pages) - ${
          wordCount < ATS_RULES.length.minWords
            ? "too short"
            : wordCount > ATS_RULES.length.maxWords
            ? "too long"
            : "optimal"
        }`,
      },
      structure: {
        hasHeader: hasName,
        hasSections: foundSections.length >= 3,
        bulletPoints: (resumeText.match(/[-•*]\s/g) || []).length,
        feedback: `${foundSections.length}/3 required sections found`,
      },
      readability: {
        complexWords: (resumeText.match(/\b\w{12,}\b/g) || []).length,
        avgWordLength:
          resumeText
            .split(/\s+/)
            .reduce((sum, word) => sum + word.length, 0) / wordCount,
        optimal:
          (resumeText.match(/\b\w{12,}\b/g) || []).length < wordCount * 0.1,
        feedback: `Readability: ${
          (resumeText.match(/\b\w{12,}\b/g) || []).length < wordCount * 0.1
            ? "Good"
            : "Could be improved"
        }`,
      },
    },
    recommendation,
    confidentLevel:
      score > 80
        ? "high"
        : score > 60
        ? "medium"
        : "low",
  };

  return result;
}
