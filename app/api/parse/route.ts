import { NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdf";
import { parseResumeWithAI } from "@/lib/ai";
import { ResumeSchema } from "@/lib/schema";

export const maxDuration = 60; // 60 seconds
export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json({ status: "ok", message: "API is working" });
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const jobDescription = formData.get("jobDescription") as string | null;
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();

        // 1. Extract text from PDF
        const resumeText = await extractTextFromPDF(arrayBuffer);

        if (!resumeText || resumeText.length < 50) {
            return NextResponse.json(
                { error: "Could not extract meaningful text from PDF" },
                { status: 400 }
            );
        }

        // 2. Send text to AI
        const aiResponse = await parseResumeWithAI(resumeText, jobDescription || undefined);

        // 3. Parse AI JSON safely
        let parsedJSON;
        try {
            parsedJSON = JSON.parse(aiResponse);
        } catch {
            return NextResponse.json(
                { error: "AI returned invalid JSON" },
                { status: 500 }
            );
        }

        // 4. Validate schema
        const validatedData = ResumeSchema.parse(parsedJSON);

        return NextResponse.json({ data: validatedData });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
