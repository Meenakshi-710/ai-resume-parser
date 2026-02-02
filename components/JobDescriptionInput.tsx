
interface JobDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                Job Description (Optional)
            </label>
            <textarea
                className="w-full p-4 rounded-2xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 min-h-[120px] resize-none"
                placeholder="Paste the job description here to check your ATS match score..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
