// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse");

export async function extractTextFromPDF(buffer: ArrayBuffer) {
    try {
        const nodeBuffer = Buffer.from(buffer);
        const data = await pdf(nodeBuffer);
        return data.text;
    } catch (error: any) {
        console.error("Error parsing PDF with pdf-parse:", error);
        throw new Error("Failed to parse PDF: " + (error.message || String(error)));
    }
}
