import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Required for Node.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-dist/legacy/build/pdf.worker.mjs";

export async function extractTextFromPDF(buffer: ArrayBuffer) {
    const loadingTask = pdfjsLib.getDocument({
        data: buffer,
    });

    const pdf = await loadingTask.promise;
    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();

        const strings = content.items.map((item: any) => item.str);
        text += strings.join(" ") + " ";
    }

    return text.trim();
}
