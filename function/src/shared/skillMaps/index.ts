/**
 * Skill Maps and Role/Company Configurations
 */

export const SKILL_MAPS = {
  // Data Analyst role requirements
  "Data Analyst": {
    level: "mid",
    requiredSkills: ["SQL", "Python", "Excel", "Data Analysis", "Statistics"],
    preferredSkills: [
      "Tableau",
      "Power BI",
      "R",
      "Pandas",
      "Business Intelligence",
      "Database Design"
    ],
    niceToHaveSkills: [
      "Machine Learning",
      "Advanced Excel",
      "Hadoop",
      "Spark",
      "Cloud Platforms"
    ],
    years: 2,
    keywords: [
      "SQL",
      "Python",
      "Excel",
      "Analytics",
      "Dashboard",
      "Report",
      "Data Analysis",
      "Tableau",
      "Power BI",
      "Metrics",
      "KPI",
      "Query",
      "Database"
    ],
    atsKeywords: [
      "SQL query",
      "Python script",
      "Excel pivot",
      "data analysis",
      "statistical",
      "dashboard",
      "reporting tool",
      "data visualization",
      "metrics",
      "insights"
    ]
  },

  // Software Engineer role
  "Software Engineer": {
    level: "mid",
    requiredSkills: [
      "JavaScript",
      "React",
      "Node.js",
      "Problem Solving",
      "Git"
    ],
    preferredSkills: [
      "TypeScript",
      "REST APIs",
      "SQL",
      "Docker",
      "Cloud Platforms",
      "Testing"
    ],
    niceToHaveSkills: [
      "AWS",
      "Kubernetes",
      "GraphQL",
      "CI/CD",
      "Microservices",
      "System Design"
    ],
    years: 2,
    keywords: [
      "JavaScript",
      "React",
      "Node.js",
      "API",
      "REST",
      "Database",
      "Git",
      "Testing",
      "Frontend",
      "Backend",
      "Full Stack",
      "Problem Solving"
    ],
    atsKeywords: [
      "javascript development",
      "react component",
      "node.js",
      "rest api",
      "git version control",
      "unit test",
      "code review",
      "agile development",
      "debugging",
      "full-stack"
    ]
  },

  // Product Manager role
  "Product Manager": {
    level: "senior",
    requiredSkills: [
      "Product Strategy",
      "Leadership",
      "Analytics",
      "Communication",
      "Stakeholder Management"
    ],
    preferredSkills: [
      "A/B Testing",
      "User Research",
      "Data Analysis",
      "Agile",
      "Product Roadmap",
      "Market Analysis"
    ],
    niceToHaveSkills: [
      "Technical Knowledge",
      "Design Thinking",
      "Business Acumen",
      "Executive Presence",
      "Negotiation"
    ],
    years: 3,
    keywords: [
      "Product Strategy",
      "Roadmap",
      "Leadership",
      "Analytics",
      "User",
      "Market",
      "Growth",
      "Innovation",
      "Stakeholder",
      "Vision"
    ],
    atsKeywords: [
      "product strategy",
      "roadmap development",
      "stakeholder engagement",
      "data-driven decision",
      "user research",
      "a/b testing",
      "market analysis",
      "product launch",
      "cross-functional leadership",
      "metrics-driven"
    ]
  },

  // Project Manager role
  "Project Manager": {
    level: "mid",
    requiredSkills: [
      "Project Management",
      "Leadership",
      "Communication",
      "Risk Management",
      "Planning"
    ],
    preferredSkills: [
      "Agile",
      "Scrum",
      "Budgeting",
      "Scheduling",
      "Documentation",
      "Conflict Resolution"
    ],
    niceToHaveSkills: [
      "PMP Certification",
      "Waterfall",
      "Six Sigma",
      "JIRA",
      "Microsoft Project",
      "Executive Presence"
    ],
    years: 2,
    keywords: [
      "Project Management",
      "Leadership",
      "Planning",
      "Team",
      "Schedule",
      "Budget",
      "Quality",
      "Risk",
      "Communication",
      "Coordination"
    ],
    atsKeywords: [
      "project management",
      "team leadership",
      "risk management",
      "project schedule",
      "stakeholder communication",
      "resource allocation",
      "scope management",
      "quality assurance",
      "budget management",
      "agile methodology"
    ]
  }
};

// Company profiles and preferences
export const COMPANY_PROFILES = {
  Google: {
    industry: "Technology",
    culture: ["Innovation", "Data-Driven", "User Focus", "Collaboration"],
    keywords: [
      "impact",
      "scale",
      "innovation",
      "user-centric",
      "data",
      "technology"
    ],
    atsPreferences: {
      preferredFormat: "ats-optimized",
      favoredKeywords: [
        "impact at scale",
        "user experience",
        "data-driven",
        "innovation",
        "collaboration"
      ],
      valuesEmphasized: ["impact", "ownership", "innovation", "quality"]
    }
  },

  Amazon: {
    industry: "Technology",
    culture: [
      "Customer Obsession",
      "Ownership",
      "Bias for Action",
      "Frugality"
    ],
    keywords: [
      "customer",
      "ownership",
      "action",
      "results",
      "operations",
      "scale"
    ],
    atsPreferences: {
      preferredFormat: "ats-optimized",
      favoredKeywords: [
        "customer obsession",
        "ownership",
        "bias for action",
        "frugality",
        "results"
      ],
      valuesEmphasized: ["ownership", "results", "customer focus", "efficiency"]
    }
  },

  Microsoft: {
    industry: "Technology",
    culture: ["Growth Mindset", "Collaboration", "Quality", "Innovation"],
    keywords: [
      "collaboration",
      "quality",
      "growth",
      "innovation",
      "teamwork",
      "excellence"
    ],
    atsPreferences: {
      preferredFormat: "ats-optimized",
      favoredKeywords: [
        "collaboration",
        "quality mindset",
        "growth mindset",
        "teamwork",
        "innovation"
      ],
      valuesEmphasized: ["quality", "teamwork", "growth", "innovation"]
    }
  },

  IIT: {
    industry: "Education",
    culture: ["Excellence", "Research", "Innovation", "Leadership"],
    keywords: [
      "academic",
      "research",
      "innovation",
      "excellence",
      "teaching",
      "contribution"
    ],
    atsPreferences: {
      preferredFormat: "plain",
      favoredKeywords: [
        "research",
        "academic excellence",
        "innovation",
        "teaching",
        "contribution"
      ],
      valuesEmphasized: ["excellence", "research", "innovation", "leadership"]
    }
  },

  Meta: {
    industry: "Technology",
    culture: ["Fast Moving", "Bold", "Social Impact", "Technical Excellence"],
    keywords: ["impact", "scale", "technical", "innovation", "social", "bold"],
    atsPreferences: {
      preferredFormat: "ats-optimized",
      favoredKeywords: [
        "social impact",
        "technical excellence",
        "fast moving",
        "bold innovation",
        "scale"
      ],
      valuesEmphasized: ["impact", "technical depth", "boldness", "speed"]
    }
  },

  Tesla: {
    industry: "Automotive/Energy",
    culture: ["Innovation", "Speed", "Efficiency", "Execution"],
    keywords: [
      "engineering",
      "innovation",
      "efficiency",
      "speed",
      "execution",
      "impact"
    ],
    atsPreferences: {
      preferredFormat: "ats-optimized",
      favoredKeywords: [
        "engineering excellence",
        "rapid execution",
        "efficiency",
        "innovation",
        "impact"
      ],
      valuesEmphasized: ["execution", "innovation", "efficiency", "impact"]
    }
  }
};

// Skill gap bridging suggestions
export const SKILL_BRIDGE_SUGGESTIONS = {
  "missing-sql": "Highlight any data manipulation experience, even if not explicit SQL",
  "missing-python": "Emphasize scripting, automation, or any programming experience",
  "missing-tableau": "Highlight any data visualization or reporting tool experience",
  "missing-excel": "Emphasize spreadsheet work, analysis, or financial modeling",
  "missing-cloud": "Highlight on-premise infrastructure, DevOps, or SaaS experience",
  "missing-agile": "Emphasize iterative work, sprint planning, or collaborative projects",
  "missing-leadership": "Highlight mentoring, team collaboration, or project ownership"
};

// Metrics and quantification suggestions
export const QUANTIFICATION_PHRASES = [
  "increased by %",
  "improved by %",
  "reduced by %",
  "grew by %",
  "delivered in X days",
  "saved $ or %",
  "processed X records",
  "served X users",
  "led X-person team",
  "managed $ budget"
];

// Section-specific keywords
export const SECTION_KEYWORDS = {
  experience: [
    "Led",
    "Developed",
    "Implemented",
    "Increased",
    "Decreased",
    "Optimized",
    "Streamlined",
    "Managed",
    "Created"
  ],
  education: ["Degree", "GPA", "Honors", "Relevant Coursework", "Distinction"],
  skills: [
    "Proficient",
    "Expert",
    "Experienced",
    "Skilled",
    "Certified",
    "Knowledgeable"
  ],
  projects: [
    "Architected",
    "Developed",
    "Designed",
    "Built",
    "Deployed",
    "Launched",
    "Contributed"
  ]
};

// Export all skill maps
export function getSkillMap(role: string) {
  return (SKILL_MAPS as Record<string, any>)[role] || SKILL_MAPS["Software Engineer"];
}

// Export company profile
export function getCompanyProfile(company: string) {
  return (COMPANY_PROFILES as Record<string, any>)[company] || COMPANY_PROFILES["Google"];
}

// Get all keywords for a role
export function getRoleKeywords(role: string): string[] {
  const skillMap = getSkillMap(role);
  return skillMap?.keywords || [];
}

// Get all ATS keywords for a role
export function getRoleATSKeywords(role: string): string[] {
  const skillMap = getSkillMap(role);
  return skillMap?.atsKeywords || [];
}
