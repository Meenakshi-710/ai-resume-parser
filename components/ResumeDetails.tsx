import { useState } from "react";

interface ResumeDetailsProps {
    data: any;
}

export default function ResumeDetails({ data }: ResumeDetailsProps) {
    const [showDetails, setShowDetails] = useState(false);

    if (!data) return null;

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
                >
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>
            </div>

            {showDetails && (
                <ul className="list-disc list-outside ml-6 space-y-10 text-foreground text-lg sm:text-lg tracking-wide animate-in fade-in zoom-in-95 duration-300">
                    {/* Name */}
                    <li className="font-bold text-3xl sm:text-4xl text-primary">
                        Name: <span className="font-medium text-2xl sm:text-3xl text-foreground">{data.personal_info?.name || "Candidate Name"}</span>
                    </li>

                    {/* Contact Details */}
                    <li>
                        <span className="font-bold text-xl text-primary">Contact Details:</span>
                        <ul className="list-[circle] list-outside ml-8 space-y-3 mt-4 text-base sm:text-lg text-muted-foreground/90">
                            {data.personal_info?.email && (
                                <li><span className="font-semibold text-foreground">Email:</span> {data.personal_info.email}</li>
                            )}
                            {data.personal_info?.phone && (
                                <li><span className="font-semibold text-foreground">Phone:</span> {data.personal_info.phone}</li>
                            )}
                            {(data.personal_info?.location || data.personal_info?.address) && (
                                <li><span className="font-semibold text-foreground">Location:</span> {data.personal_info.location || data.personal_info.address}</li>
                            )}
                        </ul>
                    </li>

                    {/* Skills */}
                    <li>
                        <span className="font-bold text-xl text-primary">Skills:</span>
                        {data.skills?.length > 0 ? (
                            <ul className="list-[circle] list-outside ml-8 space-y-2 mt-4 text-base sm:text-lg text-muted-foreground/90 columns-1 sm:columns-2 gap-x-12">
                                {data.skills.map((skill: string, i: number) => (
                                    <li key={i} className="break-inside-avoid">{skill}</li>
                                ))}
                            </ul>
                        ) : <span className="ml-2 text-muted-foreground text-base">None</span>}
                    </li>

                    {/* Work Experience */}
                    <li>
                        <span className="font-bold text-xl text-primary">Work Experience:</span>
                        {data.work_experience?.length > 0 ? (
                            <ul className="list-[circle] list-outside ml-8 space-y-6 mt-4 text-base sm:text-lg text-muted-foreground/90">
                                {data.work_experience.map((exp: any, i: number) => (
                                    <li key={i}>
                                        <span className="font-bold text-foreground text-lg">{exp.position}</span> <span className="text-muted-foreground">at</span> <span className="font-semibold text-foreground">{exp.company}</span> <span className="text-sm italic text-muted-foreground">({exp.duration})</span>
                                        {exp.description && Array.isArray(exp.description) && (
                                            <ul className="list-[square] list-outside ml-8 space-y-2 mt-2 text-muted-foreground text-sm sm:text-base leading-relaxed">
                                                {exp.description.map((desc: string, j: number) => (
                                                    <li key={j}>{desc}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : <span className="ml-2 text-muted-foreground text-base">None</span>}
                    </li>
                    {/* Education */}
                    <li>
                        <span className="font-bold text-xl text-primary">Education:</span>
                        {data.education?.length > 0 ? (
                            <ul className="list-[circle] list-outside ml-8 space-y-6 mt-4 text-base sm:text-lg text-muted-foreground/90">
                                {data.education.map((edu: any, i: number) => (
                                    <li key={i}>
                                        <span className="font-bold text-foreground">{edu.institution}</span> - <span className="font-medium">{edu.degree}</span> <span className="text-sm italic text-muted-foreground">({edu.year})</span>
                                        {edu.details && Array.isArray(edu.details) && (
                                            <ul className="list-[square] list-outside ml-8 space-y-2 mt-2 text-muted-foreground text-sm sm:text-base leading-relaxed">
                                                {edu.details.map((detail: string, j: number) => (
                                                    <li key={j}>{detail}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : <span className="ml-2 text-muted-foreground text-base">None</span>}
                    </li>
                </ul>
            )}
        </div>
    );
}
