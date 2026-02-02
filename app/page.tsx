"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import ResumeScorecard from "@/components/ResumeScorecard";
import ATSResults from "@/components/ATSResults";
import MockInterviewer from "@/components/MockInterviewer";
import CoverLetter from "@/components/CoverLetter";
import ResumeDetails from "@/components/ResumeDetails";

import LinkedInOptimizer from "@/components/LinkedInOptimizer";
import CareerPath from "@/components/CareerPath";
import SkillsGap from "@/components/SkillsGap";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    if (jobDescription) {
      formData.append("jobDescription", jobDescription);
    }

    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <Hero />

      <div className="w-full space-y-8">
        <UploadSection
          file={file}
          loading={loading}
          isDragOver={isDragOver}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
        />

        <JobDescriptionInput
          value={jobDescription}
          onChange={setJobDescription}
        />

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className={cn(
              "px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-all duration-300 transform",
              !file || loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:-translate-y-1 active:scale-95"
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Parsing Resume...
              </span>
            ) : (
              "Parse Resume"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-6 py-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full mx-auto">
            <div className="p-4 sm:p-8">
              <ResumeScorecard
                score={result.resume_score}
                summary={result.executive_summary}
                improvements={result.improvement_suggestions}
              />

              <ATSResults
                score={result.ats_score}
                missingKeywords={result.missing_keywords}
                matchingKeywords={result.matching_keywords}
              />

              <SkillsGap data={result.skill_gap_analysis} />

              <CareerPath data={result.career_path} />

              <MockInterviewer questions={result.interview_questions} />

              <CoverLetter text={result.cover_letter} />

              <LinkedInOptimizer data={result.linkedin_optimization} />

              <ResumeDetails data={result} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
