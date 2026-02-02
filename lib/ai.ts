import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumePrompt } from "./prompts";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
);

export async function parseResumeWithAI(resumeText: string, jobDescription?: string) {
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
