import { Target, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ATSResultsProps {
    score: number;
    missingKeywords: string[];
    matchingKeywords: string[];
}

export default function ATSResults({ score, missingKeywords, matchingKeywords }: ATSResultsProps) {
    if (score === undefined || score === 0) return null;

    return (
        <div className="mb-10 bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl text-white">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">ATS Compatibility Check</h3>
                            <p className="text-slate-400 text-sm">Targeting: Job Description Analysis</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <span
                            className={cn(
                                "text-4xl font-black",
                                score >= 80 ? "text-emerald-400" :
                                    score >= 60 ? "text-yellow-400" : "text-red-400"
                            )}
                        >
                            {score}%
                        </span>
                        <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">
                            Match Rate
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Missing Keywords */}
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-red-300 mb-3 uppercase tracking-wide">
                            <AlertCircle className="w-4 h-4" />
                            Missing Keywords
                        </h4>
                        {missingKeywords && missingKeywords.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {missingKeywords.map((keyword, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-200 text-sm font-medium"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-sm italic">Great job! No critical keywords missing.</p>
                        )}
                    </div>

                    {/* Matching Keywords */}
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-300 mb-3 uppercase tracking-wide">
                            <CheckCircle className="w-4 h-4" />
                            Matching Keywords
                        </h4>
                        {matchingKeywords && matchingKeywords.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {matchingKeywords.map((keyword, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm font-medium"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-sm italic">No strong matches found yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
