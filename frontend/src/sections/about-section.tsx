import Section from "../components/section";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <Section title="About" id="about">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full glass p-6 rounded-2xl border-white/5 text-base leading-relaxed text-zinc-400 space-y-5"
            >
                <p>
                    I’m <span className="text-white font-medium">Vivek Shekhawat</span>, a <span className="text-white font-medium">Software Engineer</span> and full-stack developer who builds end-to-end digital products. I completed my <span className="text-white font-medium">B.Tech in Electronics and Communication Engineering</span> in 2026, and I work across the stack — React and Next.js on the front, Node.js and Express with MongoDB or PostgreSQL behind them.
                </p>
                <p>
                    I’m currently a <span className="text-white font-medium">Full Stack Developer Intern at Writecream</span>, shipping features across SaaS products in an AI tools ecosystem that serves <span className="text-zinc-200">1.5M+ users</span>. I built end-to-end features for <span className="text-zinc-200">AI Job Applier</span> — resume parsing, application tracking, and automated apply flows — and optimised 10+ pages across the platform. Before that I was a <span className="text-white font-medium">Frontend Developer Intern at Bulkdoor</span>, working directly with founders to prototype and ship on tight timelines.
                </p>
                <p>
                    Alongside that I build AI-integrated products of my own — <span className="text-zinc-200">Thumbnailio</span> for AI thumbnail generation and <span className="text-zinc-200">DealBee</span> for automated price tracking — focusing on clean, accessible interfaces and scalable architecture. I’m always looking for new challenges at the intersection of modern web development and applied AI.
                </p>
            </motion.div>
        </Section>
    );
}