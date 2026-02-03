const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Read .env.local
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
        process.env.GEMINI_API_KEY = match[1].trim();
    }
} catch (e) {
    console.error("Could not read .env.local", e);
}

if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not found in environment or .env.local");
    process.exit(1);
}

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Note: listModels is on the model manager or similar in some versions, 
    // but in 0.x it might be direct or via a specific endpoint.
    // Actually, looking at docs, there isn't a direct 'listModels' on genAI instance in some versions.
    // However, we can try to use the model generic method or check if there is a storage API.

    // As of recent SDK versions, listing models might not be directly exposed via the helper optimization.
    // But let's try to just use a known stable model name if this fails.

    // Wait, the error message said "Call ListModels".
    // I can assume there might be a lower level way. 
    // But for now, let's just try to infer or use `curl` to be safer and not depend on SDK wrappers if I am unsure of the method signature.
}

// Easier way: use curl to list models
console.log("Use curl to list models needs api key. printing instructions.");
