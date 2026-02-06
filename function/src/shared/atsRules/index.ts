/**
 * ATS Rules and Scoring Configuration
 */

export const ATS_RULES = {
  // Length requirements
  length: {
    minWords: 200,
    maxWords: 1500,
    optimalPages: 1,
    maxPages: 2,
    scoring: {
      tooShort: -15,
      tooLong: -10,
      optimal: 10
    }
  },

  // Structure requirements
  structure: {
    requiredSections: [
      "Contact Information",
      "Experience",
      "Education",
      "Skills"
    ],
    optionalSections: [
      "Certifications",
      "Projects",
      "Summary",
      "Publications",
      "Volunteering"
    ],
    scoring: {
      missingRequired: -20,
      goodStructure: 15,
      excellentStructure: 25
    }
  },

  // Formatting rules
  formatting: {
    forbiddenElements: [
      "images",
      "tables",
      "text boxes",
      "multiple columns",
      "headers/footers with info",
      "page breaks in middle",
      "unusual fonts",
      "colors (except black/dark gray)"
    ],
    allowedSymbols: ["-", "•", "*", "|", "/"],
    recommendedFont: ["Arial", "Calibri", "Times New Roman", "Helvetica"],
    fontSizeRange: [10, 12],
    scoring: {
      forbiddenElement: -10,
      allowedElement: 2,
      properFormatting: 5
    }
  },

  // Keyword matching
  keywords: {
    minKeywordMatches: 3,
    scoring: {
      perKeywordMatch: 2,
      bonusFor5Plus: 5,
      bonusFor10Plus: 10,
      noMatches: -30
    }
  },

  // Bullet point analysis
  bulletPoints: {
    minBulletsPerRole: 5,
    scoring: {
      strongActionVerb: 3,
      quantifiedAchievement: 5,
      specificity: 2,
      passiveVoice: -2,
      generic: -1
    },
    actionVerbExamples: [
      "Led",
      "Developed",
      "Implemented",
      "Designed",
      "Built",
      "Optimized",
      "Improved",
      "Increased",
      "Achieved",
      "Delivered"
    ],
    weakWords: ["Responsible for", "Involved in", "Worked on", "Helped with"]
  },

  // Experience relevance
  experience: {
    scoring: {
      relevantRole: 10,
      relevantCompany: 5,
      yearsMismatched: -5,
      noExperienceSection: -25
    }
  },

  // Skills section
  skills: {
    minSkills: 5,
    scoring: {
      relevantSkill: 3,
      certifications: 5,
      technology: 2,
      softSkill: 1,
      overflowingSkills: -5 // if too many
    }
  },

  // Education
  education: {
    scoring: {
      relatedDegree: 10,
      prestigiousInstitution: 5,
      gpa: 2,
      honors: 3,
      noEducation: -10
    }
  },

  // Readability
  readability: {
    maxWordsPerBullet: 20,
    maxWordsPerSentence: 25,
    scoring: {
      excellentReadability: 10,
      goodReadability: 5,
      poorReadability: -10
    }
  },

  // Contact information
  contactInfo: {
    required: ["name", "phone", "email"],
    optional: ["linkedin", "portfolio", "github"],
    scoring: {
      completeInfo: 5,
      incompleteInfo: -5,
      noContactInfo: -20
    }
  }
};

// Scoring weights for overall ATS score
export const SCORING_WEIGHTS = {
  structure: 0.15, // 15%
  keywords: 0.25, // 25% - Most important for ATS
  formatting: 0.15, // 15%
  content: 0.2, // 20%
  readability: 0.1, // 10%
  experience: 0.15 // 15%
};

// Base scoring
export const BASE_SCORE = 100;

// Red flag detection
export const RED_FLAGS = {
  "no-email": "Resume missing email address",
  "no-phone": "Resume missing phone number",
  "no-experience": "No work experience section found",
  "no-education": "No education section found",
  "images-detected": "Images detected - may cause ATS parsing issues",
  "tables-detected": "Tables detected - may cause ATS parsing issues",
  "special-chars": "Special characters or symbols detected",
  "too-long": "Resume exceeds 2 pages",
  "too-short": "Resume content very short",
  "no-metrics": "No quantified achievements found",
  "weak-keywords": "Few job-relevant keywords",
  "no-skills": "Skills section missing or very short",
  "multiple-columns": "Multi-column layout detected",
  "pdf-scan": "Resume appears to be a scanned PDF image"
};

// Green flags (positive indicators)
export const GREEN_FLAGS = {
  "strong-keywords": "Good keyword alignment with job",
  "quantified-bullets": "Bullets include metrics and percentages",
  "action-verbs": "Strong action verbs used throughout",
  "clear-structure": "Clear section organization",
  "relevant-experience": "Experience highly relevant to role",
  "recent-date": "Recent employment dates",
  "consistent-format": "Consistent formatting throughout",
  "ats-safe": "ATS-safe formatting detected"
};

// Quick fix suggestions
export const QUICK_FIXES = [
  {
    issue: "No metrics found",
    fix: "Add quantified achievements like '% improvement' or '$ saved'",
    impact: "high"
  },
  {
    issue: "Generic bullet points",
    fix: "Use strong action verbs and specific details",
    impact: "high"
  },
  {
    issue: "Missing job keywords",
    fix: "Review job description and add relevant terms naturally",
    impact: "high"
  },
  {
    issue: "Resume too long",
    fix: "Remove older positions or combine similar items",
    impact: "medium"
  },
  {
    issue: "Weak skills section",
    fix: "Add 10-15 relevant technical and soft skills",
    impact: "medium"
  },
  {
    issue: "Passive language",
    fix: "Replace with active voice and strong verbs",
    impact: "medium"
  },
  {
    issue: "No summary",
    fix: "Add 2-3 line professional summary at top",
    impact: "low"
  }
];

// ATS keyword categories
export const KEYWORD_CATEGORIES = {
  technical: {
    label: "Technical Skills",
    examples: ["Python", "SQL", "React", "AWS", "Machine Learning"]
  },
  soft: {
    label: "Soft Skills",
    examples: ["Leadership", "Communication", "Problem Solving", "Teamwork"]
  },
  industry: {
    label: "Industry Terms",
    examples: ["Data Analysis", "Full Stack", "Agile", "DevOps"]
  },
  metrics: {
    label: "Metrics & Achievements",
    examples: ["increased", "improved", "reduced", "delivered", "achieved"]
  },
  responsibility: {
    label: "Responsibility Words",
    examples: ["Led", "Managed", "Implemented", "Designed", "Developed"]
  }
};

// Calculation function for ATS score
export function calculateATSScore(analysis: any): number {
  let score = BASE_SCORE;

  // Structure scoring
  if (analysis.structure?.missingRequired) {
    score -= ATS_RULES.structure.scoring.missingRequired;
  } else if (analysis.structure?.isGood) {
    score += ATS_RULES.structure.scoring.goodStructure;
  }

  // Length scoring
  const words = analysis.wordCount || 0;
  if (words < ATS_RULES.length.minWords) {
    score += ATS_RULES.length.scoring.tooShort;
  } else if (words > ATS_RULES.length.maxWords) {
    score += ATS_RULES.length.scoring.tooLong;
  } else {
    score += ATS_RULES.length.scoring.optimal;
  }

  // Keyword scoring
  const keywordMatches = analysis.keywordMatches || 0;
  score += keywordMatches * ATS_RULES.keywords.scoring.perKeywordMatch;
  if (keywordMatches >= 10) {
    score += ATS_RULES.keywords.scoring.bonusFor10Plus;
  } else if (keywordMatches >= 5) {
    score += ATS_RULES.keywords.scoring.bonusFor5Plus;
  }

  // Formatting scoring
  const forbiddenCount = analysis.forbiddenElements || 0;
  score -= forbiddenCount * ATS_RULES.formatting.scoring.forbiddenElement;

  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, score));
}

// Get severity level for issues
export function issueSeverity(issueType: string): number {
  const severityMap: Record<string, number> = {
    "no-email": 5,
    "no-phone": 5,
    "no-experience": 4,
    "no-education": 3,
    "images-detected": 5,
    "tables-detected": 4,
    "special-chars": 3,
    "too-long": 2,
    "too-short": 2,
    "no-metrics": 3,
    "weak-keywords": 4,
    "no-skills": 3,
    "multiple-columns": 4,
    "pdf-scan": 5
  };
  return severityMap[issueType] || 2;
}
