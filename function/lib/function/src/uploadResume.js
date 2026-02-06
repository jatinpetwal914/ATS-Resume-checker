"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = uploadResume;
function uploadResume(fileName) {
    if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
        throw new Error("Only PDF or DOCX files are allowed");
    }
    return {
        success: true,
        message: "Resume uploaded successfully",
        fileName
    };
}
