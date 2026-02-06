import { GeneratedResume } from "./shared/types";

export function generateResume(
  format: "IIT" | "OVERLEAF",
  resumeData: any
): GeneratedResume {
  const timestamp = new Date().toISOString();

  if (format === "IIT") {
    return {
      format: "IIT",
      content: generateIITBombayFormat(resumeData),
      metadata: {
        generatedAt: timestamp,
        version: "1.0",
        atsCompatible: true,
        estimatedScore: 85,
      },
    };
  } else {
    return {
      format: "OVERLEAF",
      content: generateOverleafLatexFormat(resumeData),
      metadata: {
        generatedAt: timestamp,
        version: "1.0",
        atsCompatible: true,
        estimatedScore: 80,
      },
    };
  }
}

/**
 * Generate IIT Bombay style resume format
 * Clean, simple, ATS-friendly format
 */
function generateIITBombayFormat(data: any): string {
  const resume = [];

  // Header
  resume.push("═══════════════════════════════════════════════════════════════");
  resume.push(`${data.name || "YOUR NAME"}`);
  resume.push(`${data.email || "email@example.com"} | ${data.phone || "+1-XXX-XXX-XXXX"} | ${data.linkedin || "linkedin.com/in/profile"}`);
  resume.push("═══════════════════════════════════════════════════════════════");
  resume.push("");

  // Summary
  if (data.summary) {
    resume.push("PROFESSIONAL SUMMARY");
    resume.push(data.summary);
    resume.push("");
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    resume.push("PROFESSIONAL EXPERIENCE");
    data.experience.forEach((job: any) => {
      resume.push(
        `${job.title || "Position"} | ${job.company || "Company"} | ${job.duration || "XX/XXXX - XX/XXXX"}`
      );
      if (job.description || job.bullets) {
        const bullets = job.bullets || [job.description];
        bullets.forEach((bullet: string) => {
          resume.push(`  • ${bullet}`);
        });
      }
      resume.push("");
    });
  }

  // Education
  if (data.education && data.education.length > 0) {
    resume.push("EDUCATION");
    data.education.forEach((edu: any) => {
      resume.push(
        `${edu.degree || "Degree"} in ${edu.field || "Field"} | ${edu.institution || "University"} | ${edu.year || "XXXX"}`
      );
      if (edu.gpa) {
        resume.push(`  GPA: ${edu.gpa}`);
      }
      resume.push("");
    });
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    resume.push("TECHNICAL SKILLS");
    resume.push(
      data.skills.map((skill: any) => (typeof skill === "string" ? skill : skill.name)).join(" • ")
    );
    resume.push("");
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    resume.push("PROJECTS");
    data.projects.forEach((project: any) => {
      resume.push(`${project.title || "Project Name"} | ${project.duration || "XXXX"}`);
      if (project.bullets) {
        project.bullets.forEach((bullet: string) => {
          resume.push(`  • ${bullet}`);
        });
      }
      resume.push("");
    });
  }

  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    resume.push("CERTIFICATIONS");
    data.certifications.forEach((cert: any) => {
      resume.push(`  • ${cert.title || "Certification"} - ${cert.issuer || "Issuer"}`);
    });
    resume.push("");
  }

  return resume.join("\n");
}

/**
 * Generate Overleaf LaTeX format resume
 * Professional, PDF-based format with proper LaTeX escaping
 */
function generateOverleafLatexFormat(data: any): string {
  const resume = [];

  // LaTeX document structure
  resume.push("\\documentclass[11pt]{article}");
  resume.push("\\usepackage[margin=0.75in]{geometry}");
  resume.push("\\usepackage{hyperref}");
  resume.push("\\usepackage{xcolor}");
  resume.push("\\usepackage{array}");
  resume.push("");
  resume.push("\\setlength{\\parindent}{0pt}");
  resume.push("\\setlength{\\parskip}{0pt}");
  resume.push("");

  // Title formatting
  resume.push("\\newcommand{\\sectionstart}{\\vspace{8pt}\\noindent\\textbf}");
  resume.push("\\newcommand{\\sectionend}{\\vspace{4pt}}");
  resume.push("");

  // Begin document
  resume.push("\\begin{document}");
  resume.push("");

  // Header with name
  resume.push(
    `\\centerline{\\Large\\textbf{${escapeLatex(data.name || "YOUR NAME")}}}`
  );
  resume.push(
    `\\centerline{\\normalsize ${escapeLatex(data.email || "email@example.com")} $\\mid$ ${escapeLatex(data.phone || "+1-XXX-XXX-XXXX")} $\\mid$ \\href{https://linkedin.com}{${escapeLatex(data.linkedin || "LinkedIn")}}}`
  );
  resume.push("");

  // Summary
  if (data.summary) {
    resume.push("\\sectionstart{PROFESSIONAL SUMMARY}\\sectionend");
    resume.push(`${escapeLatex(data.summary)}`);
    resume.push("");
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    resume.push("\\sectionstart{PROFESSIONAL EXPERIENCE}\\sectionend");
    data.experience.forEach((job: any) => {
      resume.push(
        `\\textbf{${escapeLatex(job.title || "Position")}} $\\mid$ \\textit{${escapeLatex(job.company || "Company")}} \\hfill ${escapeLatex(job.duration || "XX/XXXX - XX/XXXX")} \\\\`
      );

      if (job.description || job.bullets) {
        resume.push("\\begin{itemize}");
        const bullets = job.bullets || [job.description];
        bullets.forEach((bullet: string) => {
          resume.push(`  \\item ${escapeLatex(bullet)}`);
        });
        resume.push("\\end{itemize}");
      }
      resume.push("");
    });
  }

  // Education
  if (data.education && data.education.length > 0) {
    resume.push("\\sectionstart{EDUCATION}\\sectionend");
    data.education.forEach((edu: any) => {
      resume.push(
        `\\textbf{${escapeLatex(edu.degree || "Degree")}} in ${escapeLatex(edu.field || "Field")} $\\mid$ ${escapeLatex(edu.institution || "University")} \\hfill ${escapeLatex(edu.year || "XXXX")} \\\\`
      );
      if (edu.gpa) {
        resume.push(`GPA: ${escapeLatex(edu.gpa)} \\\\`);
      }
      resume.push("");
    });
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    resume.push("\\sectionstart{TECHNICAL SKILLS}\\sectionend");
    const skillsText = data.skills
      .map((skill: any) =>
        escapeLatex(typeof skill === "string" ? skill : skill.name)
      )
      .join(" $\\cdot$ ");
    resume.push(`${skillsText}`);
    resume.push("");
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    resume.push("\\sectionstart{PROJECTS}\\sectionend");
    data.projects.forEach((project: any) => {
      resume.push(
        `\\textbf{${escapeLatex(project.title || "Project Name")}} \\hfill ${escapeLatex(project.duration || "XXXX")} \\\\`
      );
      if (project.bullets) {
        resume.push("\\begin{itemize}");
        project.bullets.forEach((bullet: string) => {
          resume.push(`  \\item ${escapeLatex(bullet)}`);
        });
        resume.push("\\end{itemize}");
      }
      resume.push("");
    });
  }

  // Certifications
  if (data.certifications && data.certifications.length > 0) {
    resume.push("\\sectionstart{CERTIFICATIONS}\\sectionend");
    resume.push("\\begin{itemize}");
    data.certifications.forEach((cert: any) => {
      resume.push(
        `  \\item ${escapeLatex(cert.title || "Certification")} - ${escapeLatex(cert.issuer || "Issuer")}`
      );
    });
    resume.push("\\end{itemize}");
    resume.push("");
  }

  // End document
  resume.push("\\end{document}");

  return resume.join("\n");
}

/**
 * Escape special LaTeX characters
 */
function escapeLatex(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/[&%$#_{}~^]/g, (char) => {
      const escapeMap: Record<string, string> = {
        "&": "\\&",
        "%": "\\%",
        $: "\\$",
        "#": "\\#",
        _: "\\_",
        "{": "\\{",
        "}": "\\}",
        "~": "\\textasciitilde{}",
        "^": "\\textasciicircum{}",
      };
      return escapeMap[char] || char;
    });
}
