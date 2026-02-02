import { TrendingUp, DollarSign, Briefcase } from "lucide-react";

interface CareerPathProps {
    data: {
        suggested_roles: string[];
        seniority_level: string;
        estimated_salary_range: string;
    };
}

export default function CareerPath({ data }: CareerPathProps) {
    if (!data) return null;

    return (
        <div className="mb-10 glass-card rounded-3xl p-8 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
                    <Briefcase className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Career Trajectory</h3>
                    <p className="text-slate-500 font-medium">Your potential next steps</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
                {/* Salary Estimation */}
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2 text-emerald-800 font-semibold">
                        <DollarSign className="w-5 h5" />
                        Estimated Market Value
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                        {data.estimated_salary_range}
                    </div>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">Based on experience & skills</p>
                </div>

                {/* Seniority */}
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-2 mb-2 text-indigo-800 font-semibold">
                        <TrendingUp className="w-5 h5" />
                        Assessed Level
                    </div>
                    <div className="text-3xl font-bold text-gray-800">
                        {data.seniority_level}
                    </div>
                    <p className="text-xs text-indigo-600 mt-2 font-medium">Current professional standing</p>
                </div>
            </div>

            {/* Suggested Roles */}
            <div className="mt-8 relative z-10">
                <h4 className="font-semibold text-lg text-slate-700 mb-4">Recommended Roles</h4>
                <div className="flex flex-wrap gap-3">
                    {data.suggested_roles.map((role, i) => (
                        <div key={i} className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            {role}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
