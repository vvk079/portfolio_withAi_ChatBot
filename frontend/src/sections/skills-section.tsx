import Section from "../components/section";
import { motion } from "framer-motion";

interface SkillGroup {
    label: string;
    items: string[];
}

export default function SkillsSection() {
    const skillGroups: SkillGroup[] = [
        {
            label: "Languages",
            items: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "HTML5", "CSS3", "SQL"],
        },
        {
            label: "Frontend",
            items: ["React.js", "Next.js", "React Hooks", "State Management", "Tailwind CSS", "shadcn/ui", "Responsive Design", "Web Accessibility (ARIA)"],
        },
        {
            label: "Backend",
            items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "JSON", "Middleware", "Server-Side Rendering (SSR)", "JWT", "OAuth 2.0"],
        },
        {
            label: "AI & LLM",
            items: ["Claude", "Gemini API", "OpenRouter", "LLM Integration", "Prompt Engineering", "AI Chatbots"],
        },
        {
            label: "Databases",
            items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "Supabase", "RDBMS", "Schema Design", "Query Optimization"],
        },
        {
            label: "Tools & Platforms",
            items: ["Git", "GitHub", "VS Code", "Postman", "Docker", "npm", "Vercel", "Netlify", "Cloudinary", "CI/CD"],
        },
        {
            label: "Core CS & Practices",
            items: ["MERN Stack", "Data Structures & Algorithms", "OOP", "DBMS", "SDLC", "Agile", "Code Review", "Debugging", "Problem Solving"],
        },
    ];

    const listVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.09 },
        },
    };

    const groupVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.035 },
        },
    };

    const labelVariants = {
        hidden: { opacity: 0, x: -8 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" as const },
        },
    };

    const pillVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.94 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring" as const, stiffness: 260, damping: 20 },
        },
    };

    return (
        <Section title="Skills" id="skills">
            <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="w-full glass p-6 rounded-2xl border-white/5 flex flex-col gap-7"
            >
                {skillGroups.map((group) => (
                    <motion.div key={group.label} variants={groupVariants} className="space-y-3">
                        <motion.div variants={labelVariants} className="flex items-center gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">
                                {group.label}
                            </span>
                            <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                        </motion.div>

                        <div className="flex flex-wrap gap-2.5">
                            {group.items.map((skill) => (
                                <motion.span
                                    key={skill}
                                    variants={pillVariants}
                                    whileHover={{ y: -3, scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    className="px-3.5 py-1.5 rounded-lg bg-white/[0.08] border border-white/10 text-zinc-400 text-[13px] font-medium cursor-default transition-colors duration-200 hover:bg-white/[0.16] hover:border-white/40 hover:text-white hover:shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
