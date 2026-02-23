import Section from "../components/section";
import { motion } from "framer-motion";

export default function SkillsSection() {
    const skills = [
        "JavaScript", "TypeScript", "Python", "Java",
        "React", "Next.js", "Node.js", "Express.js",
        "TailwindCSS", "Framer Motion", "MongoDB", "Supabase",
        "Cloudinary", "Git", "Docker", "Gemini API",
        "Prompt Engineering",
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <Section title="Skills" id="skills">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
            >
                {skills.map((skill) => (
                    <motion.span
                        key={skill}
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium hover:border-white/50 hover:text-white transition-colors shadow-sm"
                    >
                        {skill}
                    </motion.span>
                ))}
            </motion.div>
        </Section>
    );
}