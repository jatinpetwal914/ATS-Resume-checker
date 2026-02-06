import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function parseResume(
  buffer: Buffer,
  fileType: "pdf" | "docx"
): Promise<string> {
  try {
    if (fileType === "pdf") {
      const data = await pdf(buffer);
      return data.text || "";
    }

    if (fileType === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      return result.value || "";
    }

    throw new Error("Unsupported file type. Please use PDF or DOCX.");
  } catch (error: any) {
    console.error("Error parsing resume:", error.message);
    throw new Error(`Failed to parse ${fileType} file: ${error.message}`);
  }
}
