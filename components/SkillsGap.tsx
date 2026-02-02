import { AlertTriangle, ArrowRight } from "lucide-react";

interface SkillsGapProps {
    data: {
        missing_skill: string;
        action_plan: string;
    }[];
}

export default function SkillsGap({ data }: SkillsGapProps) {
    if (!data || data.length === 0) return null;

    return (
        <div className="mb-10 glass-card rounded-3xl p-8 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Skills Gap Analysis</h3>
                    <p className="text-slate-500 font-medium">Actionable steps to improve</p>
                </div>
            </div>

            <div className="grid gap-4 relative z-10">
                {data.map((item, i) => (
                    <div key={i} className="bg-white/60 p-5 rounded-2xl border border-amber-100/50 shadow-sm flex flex-col md:flex-row gap-4 md:items-center">
                        <div className="md:w-1/3">
                            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Missing Skill</div>
                            <div className="text-lg font-bold text-gray-800">{item.missing_skill}</div>
                        </div>

                        <div className="hidden md:block text-slate-300">
                            <ArrowRight className="w-6 h-6" />
                        </div>

                        <div className="flex-1">
                            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Recommended Action</div>
                            <div className="text-sm text-slate-700 leading-relaxed">{item.action_plan}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
