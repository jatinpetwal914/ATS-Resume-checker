"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGenerativeClient = initGenerativeClient;
exports.getGenerativeModel = getGenerativeModel;
exports.getGenerativeClient = getGenerativeClient;
const generative_ai_1 = require("@google/generative-ai");
let genAI = null;
let model = null;
function initGenerativeClient(apiKey, modelName = "gemini-1.5-flash") {
    if (!genAI) {
        genAI = new generative_ai_1.GoogleGenerativeAI(apiKey || process.env.GEMINI_API_KEY || "");
        try {
            model = genAI.getGenerativeModel({ model: modelName });
        }
        catch (err) {
            // fallback: keep genAI initialized
            model = null;
            console.error("Failed to get generative model:", err);
        }
    }
    return { genAI, model };
}
function getGenerativeModel() {
    return model;
}
function getGenerativeClient() {
    return genAI;
}
