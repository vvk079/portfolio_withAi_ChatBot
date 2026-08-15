import Section from "../components/section";
import { motion } from "framer-motion";

interface Experience {
    image?: string;
    title: string;
    company: string;
    start: string;
    end: string;
    description: string[];
}

export default function ExperienceSection() {
    const experience: Experience[] = [
        {
            image: "/assets/writecream-logo.svg",
            title: "Full Stack Developer Intern",
            company: "Writecream",
            start: "Mar 2026",
            end: "Present",
            description: [
                "Shipped features across multiple SaaS products in an AI tools ecosystem serving 1.5M+ users, working across the full stack with React, Next.js, TypeScript, and Node.js.",
                "Built end-to-end features for AI Job Applier, an AI-powered job application product, covering resume parsing, application tracking, and automated apply flows, with LLM-driven content generation and REST API integration.",
                "Optimized 10+ Writecream web pages and tool interfaces with responsive layouts, loading, error, and empty states, and ARIA-based accessibility, improving Lighthouse performance and reducing bundle size.",
                "Integrated LLM, REST, and GraphQL APIs with secure authentication (JWT, OAuth 2.0), request throttling, retry logic, and structured error handling.",
                "Created a reusable React component library adopted across 3 AI tools, reducing duplicate UI code and keeping design consistent between products.",
            ],
        },
        {
            title: "Frontend Developer Intern",
            company: "Bulkdoor",
            start: "Dec 2025",
            end: "Feb 2026",
            description: [
                "Developed and shipped 5+ responsive, reusable React components for an early-stage startup, translating product requirements into clean, maintainable, production-ready UI.",
                "Worked directly with founders to rapidly prototype features, iterate on feedback, and deliver releases on tight timelines.",
                "Integrated REST APIs into the frontend with proper state handling, error management, and consistent rendering across mobile, tablet, and desktop breakpoints.",
            ],
        },
    ];

    return (
        <Section title="Experience" id="experience">
            <div className="space-y-8">
                {experience.map((exp, index) => (
                    <motion.div
                        key={exp.company}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="w-full glass p-6 rounded-2xl border-white/5 relative"
                    >
                        <div className="flex flex-col md:flex-row items-start gap-4 md:items-center justify-between w-full">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="bg-white/10 p-2 rounded-lg border border-white/10 shrink-0">
                                    {exp.image ? (
                                        <img
                                            src={exp.image}
                                            alt={exp.company}
                                            width={40}
                                            height={40}
                                            className="brightness-0 invert p-1"
                                        />
                                    ) : (
                                        <div
                                            aria-hidden="true"
                                            className="size-10 flex items-center justify-center font-mono text-lg font-bold text-white/70"
                                        >
                                            {exp.company.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {exp.title}
                                    </h3>
                                    <div className="text-white/50 font-mono text-xs uppercase tracking-wider">{exp.company}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm shrink-0">
                                {exp.end === "Present" && (
                                    <span className="size-2 rounded-full bg-white animate-pulse" />
                                )}
                                {exp.start} — {exp.end}
                            </div>
                        </div>
                        <ul className="mt-6 space-y-3">
                            {exp.description.map((item, i) => (
                                <li key={i} className="flex gap-3 text-zinc-400 text-sm leading-relaxed">
                                    <span className="text-white/30 mt-1">▹</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
