import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumePrompt } from "./prompts";


export async function parseResumeWithAI(resumeText: string, jobDescription?: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest",
    });

    const prompt = resumePrompt(resumeText, jobDescription);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
        throw new Error("Empty response from Gemini");
    }

    return text;
}
