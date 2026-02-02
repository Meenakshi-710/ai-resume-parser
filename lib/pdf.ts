// Polyfill for Promise.withResolvers (required by pdfjs-dist)
if (typeof Promise.withResolvers === "undefined") {
    if (typeof window !== "undefined") {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        window.Promise.withResolvers = function () {
            let resolve, reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return { promise, resolve, reject };
        };
    } else {
        // @ts-expect-error This does not exist outside of polyfill which this is doing
        global.Promise.withResolvers = function () {
            let resolve, reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return { promise, resolve, reject };
        };
    }
}

// Polyfill for DOMMatrix (required by pdfjs-dist)
if (typeof DOMMatrix === "undefined") {
    // @ts-expect-error Polyfill for Node.js
    global.DOMMatrix = class DOMMatrix {
        a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
        constructor() { }
    };
}


// export async function extractTextFromPDF(buffer: ArrayBuffer) {
//     const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

//     // Required for Node.js
//     // pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-dist/legacy/build/pdf.worker.mjs";

//     const loadingTask = pdfjsLib.getDocument({
//         data: buffer,
//         // Use system fonts to avoid resolving issues
//         standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
//     });

//     const pdf = await loadingTask.promise;
//     let text = "";

//     for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const content = await page.getTextContent();

//         const strings = content.items.map((item: any) => item.str);
//         text += strings.join(" ") + " ";
//     }

//     return text.trim();
// }

// Switching to a more robust implementation that handles imports safely
export async function extractTextFromPDF(buffer: ArrayBuffer) {
    try {
        const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

        // No worker needed for basic text extraction in legacy mode usually
        // But if needed, we can point to a CDN or local file, but serverless paths are tricky.

        const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(buffer), // Ensure Uint8Array
            useSystemFonts: true,
        });

        const pdf = await loadingTask.promise;
        let text = "";
        let count = 0;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();

            // @ts-ignore
            const strings = content.items.map((item: any) => item.str);
            text += strings.join(" ") + " ";
            count++;
        }

        return text.trim();
    } catch (error: any) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to parse PDF: " + error.message);
    }
}
