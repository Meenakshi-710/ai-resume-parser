import { useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadSectionProps {
    file: File | null;
    loading: boolean;
    isDragOver: boolean;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadSection({
    file,
    loading,
    isDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
}: UploadSectionProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className={cn(
                "relative group rounded-3xl p-8 transition-all duration-300 ease-in-out border-2 border-dashed cursor-pointer",
                isDragOver
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-muted/30",
                loading && "opacity-50 pointer-events-none"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
            />

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div
                    className={cn(
                        "p-4 rounded-full bg-primary/10 transition-transform duration-300 placeholder-icon state-layer",
                        isDragOver ? "scale-110" : "group-hover:scale-110"
                    )}
                >
                    {file ? (
                        <FileText className="w-10 h-10 text-primary" />
                    ) : (
                        <Upload className="w-10 h-10 text-primary" />
                    )}
                </div>
                <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">
                        {file ? file.name : "Drop your resume here"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {file ? (
                            <span className="text-green-600 font-medium">Ready to parse</span>
                        ) : (
                            "or click to browse (PDF only)"
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
