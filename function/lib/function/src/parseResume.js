"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResume = parseResume;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
async function parseResume(buffer, fileType) {
    try {
        if (fileType === "pdf") {
            const data = await (0, pdf_parse_1.default)(buffer);
            return data.text || "";
        }
        if (fileType === "docx") {
            const result = await mammoth_1.default.extractRawText({ buffer });
            return result.value || "";
        }
        throw new Error("Unsupported file type. Please use PDF or DOCX.");
    }
    catch (error) {
        console.error("Error parsing resume:", error.message);
        throw new Error(`Failed to parse ${fileType} file: ${error.message}`);
    }
}
