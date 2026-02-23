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
                className="text-base leading-relaxed text-zinc-400 space-y-5"
            >
                <p>
                    I’m <span className="text-white font-medium">Vivek</span>, a <span className="text-white font-medium">Software Engineer</span> and a full-stack developer passionate about building end-to-end digital experiences. I specialize in the <span className="text-white font-medium">MERN stack</span> and AI integration, transforming complex ideas into elegant, functional web applications.
                </p>
                <p>
                    I have experience building innovative platforms like <span className="text-zinc-200">Thumbnailio</span> (AI-powered generation) and <span className="text-zinc-200">Dealbee</span> (automated price tracking), focusing on scalable architecture and seamless user experiences. I'm always eager to learn and take on new challenges at the intersection of modern web technologies and scalable software.
                </p>
            </motion.div>
        </Section>
    );
}