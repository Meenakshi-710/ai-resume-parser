import { z } from "zod";

export const ResumeSchema = z.object({
    personal_info: z.object({
        name: z.string().nullable(),
        email: z.string().nullable(),
        phone: z.string().nullable(),
        location: z.string().nullable(),
        links: z.array(z.string()).optional(),
    }),
    skills: z.array(z.string()),
    work_experience: z.array(
        z.object({
            company: z.string().nullable(),
            position: z.string().nullable(),
            duration: z.string().nullable(),
            description: z.array(z.string()).optional(),
        })
    ),
    education: z.array(
        z.object({
            institution: z.string().nullable(),
            degree: z.string().nullable(),
            year: z.string().nullable(),
            details: z.array(z.string()).optional(),
        })
    ),
    resume_score: z.number().min(0).max(100).default(0),
    executive_summary: z.string().optional(),
    improvement_suggestions: z.array(z.string()).optional(),
    ats_score: z.number().optional(),
    missing_keywords: z.array(z.string()).optional(),
    matching_keywords: z.array(z.string()).optional(),
    cover_letter: z.string().optional(),
    interview_questions: z.array(z.object({
        question: z.string(),
        context: z.string(),
        sample_answer: z.string(),
    })).optional(),
    linkedin_optimization: z.object({
        headline: z.string(),
        about_section: z.string(),
        skills_to_add: z.array(z.string()),
    }).optional(),
    career_path: z.object({
        suggested_roles: z.array(z.string()),
        seniority_level: z.string(),
        estimated_salary_range: z.string(),
    }).optional(),
    skill_gap_analysis: z.array(z.object({
        missing_skill: z.string(),
        action_plan: z.string(),
    })).optional(),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
