import { Linkedin, Copy, Check, User } from "lucide-react";
import { useState } from "react";

interface LinkedInOptimizerProps {
    data: {
        headline: string;
        about_section: string;
        skills_to_add: string[];
    };
}

export default function LinkedInOptimizer({ data }: LinkedInOptimizerProps) {
    const [copiedHeadline, setCopiedHeadline] = useState(false);
    const [copiedAbout, setCopiedAbout] = useState(false);

    if (!data) return null;

    const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-10 glass-card rounded-3xl p-8 border border-white/50 relative overflow-hidden text-gray-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                    <Linkedin className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">LinkedIn Optimization</h3>
                    <p className="text-slate-500 font-medium">Stand out to recruiters</p>
                </div>
            </div>

            <div className="space-y-8 relative z-10">
                {/* Headline */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg text-slate-700">Optimized Headline</h4>
                        <button
                            onClick={() => copyToClipboard(data.headline, setCopiedHeadline)}
                            className="text-xs font-medium px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                            {copiedHeadline ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedHeadline ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <div className="p-4 bg-white/60 rounded-xl border border-blue-100/50 text-slate-800 font-medium shadow-sm">
                        {data.headline}
                    </div>
                </div>

                {/* About Section */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg text-slate-700">About Section</h4>
                        <button
                            onClick={() => copyToClipboard(data.about_section, setCopiedAbout)}
                            className="text-xs font-medium px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                            {copiedAbout ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copiedAbout ? "Copied" : "Copy"}
                        </button>
                    </div>
                    <div className="p-4 bg-white/60 rounded-xl border border-blue-100/50 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap shadow-sm max-h-60 overflow-y-auto custom-scrollbar">
                        {data.about_section}
                    </div>
                </div>

                {/* Skills to Add */}
                {data.skills_to_add && data.skills_to_add.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-lg text-slate-700 mb-3">Skills to Add</h4>
                        <div className="flex flex-wrap gap-2">
                            {data.skills_to_add.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                                    + {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
