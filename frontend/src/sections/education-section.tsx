import Section from "../components/section";
import { motion } from "framer-motion";

export default function EducationSection() {
    const coursework = [
        "Data Structures & Algorithms",
        "OOP",
        "DBMS",
        "Problem Solving",
    ];

    return (
        <Section title="Education" id="education">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full glass p-6 rounded-2xl border-white/5"
            >
                <div className="flex flex-col md:flex-row items-start gap-4 md:items-center justify-between w-full">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="bg-white/10 p-2 rounded-lg border border-white/10 shrink-0">
                            <img
                                src="/assets/uni-logo.webp"
                                alt="University School of Information, Communication and Technology"
                                width={40}
                                height={40}
                                className="size-10 object-contain grayscale invert p-0.5"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                B.Tech in Electronics and Communication Engineering
                            </h3>
                            <div className="text-white/50 font-mono text-xs uppercase tracking-wider mt-1">
                                University School of Information, Communication and Technology
                            </div>
                            <div className="text-zinc-500 font-mono text-xs mt-1">
                                New Delhi, India
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-2 shrink-0">
                        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono text-[10px] uppercase tracking-widest">
                            Graduated
                        </span>
                        <div className="text-zinc-500 font-mono text-sm whitespace-nowrap">
                            Aug 2022 — Jun 2026
                        </div>
                    </div>
                </div>

                {/* Coursework */}
                <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">
                            Key Coursework
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
                        className="flex flex-wrap gap-2.5"
                    >
                        {coursework.map((course) => (
                            <motion.span
                                key={course}
                                variants={{
                                    hidden: { opacity: 0, y: 8 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-400 text-[13px] font-medium"
                            >
                                {course}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </Section>
    );
}
