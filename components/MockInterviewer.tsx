import { MessageSquare } from "lucide-react";

interface Question {
    question: string;
    context: string;
    sample_answer: string;
}

interface MockInterviewerProps {
    questions: Question[];
}

export default function MockInterviewer({ questions }: MockInterviewerProps) {
    if (!questions || questions.length === 0) return null;

    return (
        <div className="mb-10 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-2xl p-6 border border-fuchsia-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-fuchsia-500/10 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-fuchsia-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">AI Mock Interviewer</h3>
                    <p className="text-gray-500 text-sm">Personalized questions based on your profile</p>
                </div>
            </div>

            <div className="space-y-4">
                {questions.map((q, i) => (
                    <details
                        key={i}
                        className="group bg-white rounded-xl border border-fuchsia-100 open:shadow-md transition-all duration-200"
                    >
                        <summary className="flex items-start gap-3 p-4 cursor-pointer list-none select-none">
                            <div className="mt-1 min-w-[24px] flex items-center justify-center w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-600 font-bold text-xs">
                                {i + 1}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 group-hover:text-fuchsia-700 transition-colors">
                                    {q.question}
                                </h4>
                            </div>
                            <div className="transform transition-transform duration-200 group-open:rotate-180 text-gray-400">
                                ▼
                            </div>
                        </summary>
                        <div className="px-4 pb-4 pl-12 space-y-3">
                            <div className="text-sm">
                                <span className="font-semibold text-fuchsia-700 block mb-1 uppercase tracking-wider text-xs">
                                    WHY THIS QUESTION?
                                </span>
                                <p className="text-gray-600 bg-fuchsia-50/50 p-3 rounded-lg border border-fuchsia-100/50 italic">
                                    "{q.context}"
                                </p>
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold text-emerald-700 block mb-1 uppercase tracking-wider text-xs">
                                    SAMPLE ANSWER KEY POINTS
                                </span>
                                <div className="text-gray-700 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50 whitespace-pre-wrap">
                                    {q.sample_answer}
                                </div>
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}
