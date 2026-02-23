import Section from "../components/section";
import { motion } from "framer-motion";

export default function EducationSection() {
    return (
        <Section title="Education" id="education">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full glass p-6 rounded-2xl border-white/5"
            >
                <div className="flex flex-col md:flex-row items-start gap-4 md:items-center justify-between w-full">
                    <div className="relative p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="relative size-24 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center p-5">
                                    <img
                                        src="/assets/uni-logo.webp"
                                        alt="University Logo"
                                        className="w-full h-full object-contain grayscale invert opacity-20"
                                    />
                                </div>
                            </motion.div>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shrink-0">
                                <img
                                    src="/assets/uni-logo.webp"
                                    alt="University Logo"
                                    className="w-full h-full object-contain grayscale invert"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Bachelor of Technology in Electronics and Communication Engineering
                                </h3>
                                <div className="text-white/50 font-mono text-xs mt-1 uppercase tracking-wider">
                                    University School of Information, Communication and Technology
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-zinc-500 font-mono text-sm">2022 – 2026</div>
                </div>
                <p className="text-zinc-400 italic border-l-2 border-white/30 pl-4 mt-6">
                    "Focused on <span className="text-white">digital transformation</span> and software intelligence."
                </p>
            </motion.div>
        </Section>
    );
}