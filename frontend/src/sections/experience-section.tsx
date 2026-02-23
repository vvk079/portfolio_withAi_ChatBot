import Section from "../components/section";
import { motion } from "framer-motion";

export default function ExperienceSection() {
    const experience = [
        {
            image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
            title: "Frontend Developer Intern",
            company: "IBM SkillsBuild (CSRBOX)",
            location: "Remote",
            start: "July 2025",
            end: "Aug 2025",
            description: [
                "Developed responsive and user-friendly web interfaces using modern frontend technologies.",
                "Integrated Google OAuth authentication and RESTful APIs for secure user login and data communication.",
                "Collaborated on deploying production-ready applications using Vercel and Netlify.",
                "Worked on AI-integrated systems and SaaS-style architecture.",
            ],
        },
    ];

    return (
        <Section title="Experience">
            <div className="space-y-8">
                {experience.map((exp, index) => (
                    <motion.div
                        key={exp.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="w-full glass p-6 rounded-2xl border-white/5 relative"
                    >
                        <div className="flex flex-col md:flex-row items-start gap-4 md:items-center justify-between w-full">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="bg-white/10 p-2 rounded-lg border border-white/10">
                                    <img
                                        src={exp.image}
                                        alt={exp.company}
                                        width={40}
                                        height={40}
                                        className="brightness-0 invert p-1"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {exp.title}
                                    </h3>
                                    <div className="text-white/50 font-mono text-xs uppercase tracking-wider">{exp.company}</div>
                                </div>
                            </div>
                            <div className="text-zinc-500 font-mono text-sm">{exp.start} — {exp.end}</div>
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