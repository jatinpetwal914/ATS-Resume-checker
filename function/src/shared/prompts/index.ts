/**
 * LLM Prompts for Resume AI Helper
 */

export const LLM_PROMPTS = {
  // Prompt for analyzing resume and suggesting improvements
  IMPROVE_RESUME: `You are an expert resume coach and ATS specialist. Your task is to improve a resume to make it more ATS-friendly and impactful.

Given the following resume content, job role, and company context:
- RESUME: {resume}
- JOB ROLE: {jobRole}
- COMPANY: {company}
- JOB DESCRIPTION KEYWORDS: {jobKeywords}

Please:
1. Identify weak bullet points and suggest stronger action-verb based alternatives
2. Point out missing high-impact keywords from the job description
3. Suggest specific metrics and quantifiable achievements
4. Recommend structural improvements for better readability
5. Ensure all suggestions follow ATS best practices (no tables, icons, special characters)

Format your response as JSON with this structure:
{
  "improvedBullets": [
    {
      "original": "original text",
      "improved": "improved text",
      "reasoning": "why this is better",
      "impactScore": 85
    }
  ],
  "missingKeywords": ["keyword1", "keyword2"],
  "formatTips": ["tip1", "tip2"],
  "estimatedImprovement": 15
}`,

  // Prompt for extracting job description details
  ANALYZE_JOB_DESCRIPTION: `You are an expert in job description analysis. Extract and categorize the key requirements from this job posting:

JOB DESCRIPTION:
{jobDescription}

Please identify and extract:
1. Required technical skills (must-have)
2. Preferred/nice-to-have skills
3. Key metrics or achievements mentioned
4. Years of experience required
5. Seniority level (junior/mid/senior/lead)
6. Most important keywords that appear multiple times
7. Company culture keywords or soft skills emphasized

Format your response as JSON:
{
  "requiredSkills": [],
  "preferredSkills": [],
  "keyMetrics": [],
  "experienceYears": 0,
  "seniorityLevel": "mid",
  "topKeywords": [],
  "cultureKeywords": []
}`,

  // Prompt for ATS compatibility analysis
  ANALYZE_ATS_COMPATIBILITY: `You are an ATS (Applicant Tracking System) specialist. Analyze this resume for ATS compatibility:

RESUME TEXT:
{resumeText}

TARGET JOB KEYWORDS:
{targetKeywords}

Evaluate:
1. Keyword match percentage (how many target keywords are present)
2. Formatting issues that might confuse ATS (special characters, symbols, etc.)
3. Missing high-value keywords
4. Bullet point effectiveness (action verbs, specificity)
5. Structure clarity (clear sections with standard headers)
6. Experience relevance to target role
7. Achievement quantification (% improvements, numbers, metrics)

Provide a detailed analysis and score.

Format response as JSON:
{
  "atsScore": 75,
  "keywordMatchPercentage": 65,
  "issues": [
    {
      "severity": 5,
      "message": "description",
      "suggestion": "how to fix"
    }
  ],
  "strengths": ["strength1", "strength2"],
  "criticalChanges": ["change1", "change2"],
  "estimatedImprovementPotential": 20
}`,

  // Prompt for generating improved resume sections
  GENERATE_RESUME_SECTIONS: `You are a professional resume writer. Generate improved resume sections based on the following:

ORIGINAL RESUME:
{resumeText}

TARGET JOB ROLE: {jobRole}
TARGET COMPANY: {company}
KEY REQUIREMENTS: {jobKeywords}
EMPHASIS: {companyEmphasis}

Create an improved resume with:
1. Strong, action-oriented bullet points
2. Quantified achievements and metrics
3. Relevant keywords naturally integrated
4. Clear section organization
5. ATS-optimized formatting

Format the output as a well-structured resume following the {format} style.
Ensure it's under 1 page for readability.

Rules:
- Use action verbs (Led, Developed, Implemented, etc.)
- Include metrics (increased by 25%, reduced time by 40%, etc.)
- Avoid: tables, images, symbols, special characters, multiple fonts
- Keep: clear structure, bullet points, consistent formatting`,

  // Skill gap analysis
  IDENTIFY_SKILL_GAPS: `Analyze the skill gaps between the candidate's resume and the job requirements:

CANDIDATE SKILLS (from resume):
{candidateSkills}

REQUIRED SKILLS (from job description):
{requiredSkills}

PREFERRED SKILLS:
{preferredSkills}

Provide:
1. Missing critical skills
2. Partially matching skills that could be emphasized better
3. Transferable skills that could be repositioned
4. Skill building recommendations
5. Priority ranking of skills to focus on

Format as JSON:
{
  "criticalGaps": [],
  "partialMatches": [],
  "transferableSkills": [],
  "recommendations": [],
  "priorityOrder": []
}`,

  // Company-specific recommendations
  COMPANY_ANALYSIS: `You are familiar with this company's culture and hiring practices:

COMPANY: {company}
INDUSTRY: {industry}
COMPANY DESCRIPTION: {companyDescription}

Given a resume for the role of {jobRole}, provide company-specific recommendations:

1. What does this company value most in candidates?
2. What keywords/phrases resonate with this company?
3. What achievements would be most impressive to them?
4. How should the resume tone differ for this company?
5. What company-specific keywords should be included?

Format as actionable recommendations.`
};

// System prompt for resume improvement AI
export const SYSTEM_PROMPT_IMPROVE = `You are an expert resume optimization AI trained to improve resumes for ATS compatibility and recruiter impact. 

Your expertise includes:
- ATS (Applicant Tracking System) parsing and optimization
- Resume formatting best practices
- Action verb usage and impact quantification
- Keyword matching and job description alignment
- Professional communication and achievement highlighting

Always provide constructive, specific, and actionable feedback. Format responses as structured JSON when requested.`;

// System prompt for ATS analysis
export const SYSTEM_PROMPT_ATS = `You are an ATS specialist and resume database expert. You understand exactly how ATS systems parse and score resumes.

Your expertise includes:
- ATS parsing mechanics and limitations
- Keyword extraction and matching
- Formatting element detection (tables, images, special chars)
- Section recognition and structure validation
- Scoring algorithms used by common ATS platforms

Provide detailed, specific issues with clear solutions and scoring rationale.`;

// Default keywords by role
export const ROLE_KEYWORDS = {
  "Data Analyst": [
    "SQL",
    "Python",
    "Excel",
    "Tableau",
    "Power BI",
    "Data Analysis",
    "Statistics",
    "Analytics",
    "Report",
    "Dashboard",
    "Query",
    "Database",
    "Business Intelligence",
    "Data Visualization",
    "Metrics",
    "KPI"
  ],
  "Software Engineer": [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "Git",
    "APIs",
    "REST",
    "Database",
    "SQL",
    "HTML",
    "CSS",
    "Testing",
    "Debugging",
    "Problem Solving"
  ],
  "Product Manager": [
    "Product Strategy",
    "Roadmap",
    "Stakeholder Management",
    "Data-Driven",
    "Analytics",
    "User Research",
    "A/B Testing",
    "Agile",
    "Leadership",
    "Communication",
    "Metrics",
    "Market Analysis"
  ],
  "Project Manager": [
    "Project Management",
    "Agile",
    "Scrum",
    "Leadership",
    "Risk Management",
    "Budgeting",
    "Timeline",
    "Coordination",
    "Communication",
    "Scheduling",
    "Stakeholder Management"
  ]
};

// Common action verbs for resume
export const ACTION_VERBS = [
  "Achieved",
  "Accelerated",
  "Accomplished",
  "Analyzed",
  "Built",
  "Coordinated",
  "Created",
  "Decreased",
  "Delivered",
  "Demonstrated",
  "Designed",
  "Developed",
  "Drove",
  "Earned",
  "Enabled",
  "Enhanced",
  "Established",
  "Exceeded",
  "Expanded",
  "Improved",
  "Increased",
  "Implemented",
  "Innovated",
  "Launched",
  "Led",
  "Leveraged",
  "Maximized",
  "Optimized",
  "Organized",
  "Orchestrated",
  "Pioneered",
  "Produced",
  "Reduced",
  "Redesigned",
  "Resolved",
  "Restructured",
  "Revamped",
  "Scaled",
  "Secured",
  "Spearheaded",
  "Streamlined",
  "Strengthened",
  "Transformed",
  "Accelerated"
];

// ATS-safe formatting rules
export const ATS_FORMATTING_RULES = {
  forbiddenSymbols: ["•", "◦", "■", "★", "→", "©", "®", "™"],
  forbiddenFormatting: ["images", "tables", "text boxes", "headers", "columns"],
  recommendedSections: [
    "Contact Information",
    "Summary/Objective",
    "Experience/Professional Experience",
    "Education",
    "Skills",
    "Certifications",
    "Projects"
  ],
  maxPages: 2,
  minPages: 0.5,
  recommendedPageCount: 1
};
