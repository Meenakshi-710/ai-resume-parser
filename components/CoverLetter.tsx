import { useState } from "react";
import { FileText, Copy, Check } from "lucide-react";

interface CoverLetterProps {
    text: string;
}

export default function CoverLetter({ text }: CoverLetterProps) {
    const [copied, setCopied] = useState(false);

    if (!text) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-10 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative group">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-indigo-600" />
                    AI Generated Cover Letter
                </h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors font-medium text-sm"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-green-600" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy Text
                        </>
                    )}
                </button>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed font-serif bg-gray-50/50 p-6 rounded-xl border border-gray-100/50">
                {text}
            </div>
        </div>
    );
}
