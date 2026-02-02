import { TrendingUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeScorecardProps {
    score: number;
    summary: string;
    improvements: string[];
}

export default function ResumeScorecard({ score, summary, improvements }: ResumeScorecardProps) {
    return (
        <div className="mb-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative flex-shrink-0">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-gray-200"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={364}
                            strokeDashoffset={364 - (364 * (score || 0)) / 100}
                            className={cn(
                                "transition-all duration-1000 ease-out",
                                (score || 0) >= 80 ? "text-green-500" :
                                    (score || 0) >= 60 ? "text-yellow-500" : "text-red-500"
                            )}
                        />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-3xl font-bold text-gray-800">{score || 0}</span>
                        <span className="block text-xs text-gray-500 uppercase font-semibold">Score</span>
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-900">
                            <TrendingUp className="w-5 h-5 text-indigo-600" />
                            Executive Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed mt-1">
                            {summary || "No summary available."}
                        </p>
                    </div>

                    {improvements && improvements.length > 0 && (
                        <div className="bg-white/60 rounded-xl p-4 border border-indigo-100/50">
                            <h4 className="text-sm font-bold flex items-center gap-2 text-amber-700 mb-2">
                                <Lightbulb className="w-4 h-4 text-amber-500" />
                                Recommended Improvements
                            </h4>
                            <ul className="space-y-2">
                                {improvements.map((suggestion, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-gray-700">
                                        <span className="text-amber-500 mt-0.5">•</span>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
