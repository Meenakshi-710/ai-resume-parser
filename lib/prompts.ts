export function resumePrompt(text: string, jobDescription?: string) {
  const jdSection = jobDescription ? `
    IMPORTANT: COMPARE THE RESUME AGAINST THIS JOB DESCRIPTION:
    "${jobDescription}"
    
    - "ats_score" (0-100): How well does the resume match the job description? match keywords, experience, and title.
    - "missing_keywords": List 3-5 critical skills/tools from the JD that are missing in the resume.
    - "matching_keywords": List 3-5 key skills present in both.
    ` : `
    - "ats_score": 0 (default if no JD provided)
    - "missing_keywords": []
    - "matching_keywords": []
    `;

  return `
You are an expert resume parser and ATS (Applicant Tracking System) simulator.

Extract the following fields from the resume text below and return ONLY valid JSON.
Do not add explanations or markdown.

Rules:
- Use null if a value is missing
- Deduplicate skills
- Match this exact structure:

{
  "personal_info": {
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "+1234567890",
    "location": "City, Country",
    "links": ["linkedin.com/in/...", "github.com/..."]
  },
  "skills": ["Skill1", "Skill2"],
  "work_experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "duration": "MMM YYYY - MMM YYYY",
      "description": ["Key achievement 1", "Key achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Name",
      "year": "YYYY",
      "details": ["Honors", "Relevant Coursework"]
    }
  ],
  "resume_score": 85,
  "executive_summary": "A brief 2-3 sentence professional summary/critique of the resume.",
  "improvement_suggestions": [
    "Actionable tip 1",
    "Actionable tip 2",
    "Actionable tip 3"
  ],
  "ats_score": 0,
  "missing_keywords": ["Skill A", "Tool B"],
  "matching_keywords": ["Skill C", "Tool D"],
  "cover_letter": "A professional, 3-4 paragraph cover letter customized for the job description (if provided) or general profile.",
  "interview_questions": [
    {
      "question": "Tell me about your experience with X",
      "context": "Based on your project Y...",
      "sample_answer": "Key points to mention..."
    }
  ],
  "linkedin_optimization": {
    "headline": "Result-oriented [Role] | Specialist in [Skill 1], [Skill 2]",
    "about_section": "Professional summary optimized for LinkedIn...",
    "skills_to_add": ["Skill X", "Skill Y"]
  },
  "career_path": {
      "suggested_roles": ["Senior Role A", "Lead Role B"],
      "seniority_level": "Mid-Senior",
      "estimated_salary_range": "$120k - $150k"
  },
  "skill_gap_analysis": [
      { "missing_skill": "Kubernetes", "action_plan": "Build a cluster, take CKA course..." }
  ]
}

- For 'resume_score' (0-100): Evaluate based on impact (quantifiable results), structure/readability, and relevance.
- For 'executive_summary': Provide a high-level critique of the candidate's profile strength.
- For 'improvement_suggestions': Provide 3-5 specific, tactical improvements (e.g., 'Quantify impact in X role', 'Use stronger action verbs').
- For 'cover_letter':
  - Tone: Professional, confident, and persuasive.
  - Structure:
    1. Introduction: State interest in the role (mention company/title if in JD).
    2. Body Paragraph(s): Connect specific past achievements to the JD's requirements. Use keywords from the JD.
    3. Conclusion: Reiterate value and request an interview.
  - If no JD is provided, write a strong general cover letter standardizing on the candidate's top skill group.
- For 'interview_questions':
  - Generate 3-5 personalized interview questions.
  - Mix technical (probing specific skills/projects in the resume) and behavioral questions.
  - 'context': Explain WHY this question is being asked based on the resume content.
  - 'sample_answer': Brief bullet points of what a good answer should cover.
${jdSection}

Resume Text:
${text}
`;
}
