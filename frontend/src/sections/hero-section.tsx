import { ArrowRightIcon, Linkedin, Github, Mail, Terminal, Bot } from 'lucide-react';
import { motion } from "framer-motion";

export default function HeroSection() {
    const name = "VIVEK";
    const nameArray = name.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Background Tech Elements */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
            <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

            {/* Animated Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-20 size-80 bg-white/5 rounded-full blur-[100px] -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.1, 0.05],
                    x: [0, -40, 0],
                    y: [0, 40, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 -right-20 size-80 bg-zinc-500/10 rounded-full blur-[100px] -z-10"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative group"
            >
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-white/20 to-zinc-500/20 blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
                <img
                    src="/assets/user-image.jpg"
                    alt="Profile Image"
                    className="relative size-36 rounded-full border-2 border-white/30 object-cover shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    width={144}
                    height={144}
                />
            </motion.div>

            <div className="text-center mt-8 px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-zinc-400 text-xs font-mono mb-6"
                >
                    <Terminal size={14} />
                    <span>System Status: Monochromatic</span>
                </motion.div>

                <motion.h1
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white flex justify-center"
                >
                    {nameArray.map((letter, index) => (
                        <motion.span key={index} variants={child} className={letter === " " ? "mr-4" : ""}>
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="text-xl md:text-2xl font-mono mt-6 text-zinc-400 max-w-2xl mx-auto"
                >
                    Full-Stack Developer & Software Engineer
                    <span className="block mt-2 text-sm text-zinc-500 font-sans italic">Architecting scalable solutions with modern web technologies.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    <button
                        className="group relative px-8 py-3 bg-white hover:bg-zinc-200 text-zinc-950 rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2"
                        onClick={() => window.open('/viveks_Resume.pdf', '_blank')}
                    >
                        View Resume
                        <ArrowRightIcon className="group-hover:translate-x-1 transition-transform size-5" />
                    </button>

                    <button
                        className="px-8 py-3 border border-zinc-700 hover:border-white/50 hover:bg-zinc-800 text-zinc-300 rounded-full font-medium transition-all flex items-center gap-2"
                        onClick={() => window.location.href = 'mailto:vivekkushwah776@gmail.com'}
                    >
                        <Mail size={18} />
                        Get in Touch
                    </button>

                    <button
                        className="px-8 py-3 bg-white/5 border border-white/10 hover:border-white/30 text-white rounded-full font-medium transition-all flex items-center gap-2 group/ai shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                    >
                        <Bot size={18} className="group-hover/ai:scale-110 transition-transform" />
                        Ask AI
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="flex justify-center gap-6 mt-12"
                >
                    <a href="https://linkedin.com/in/vivek-shekhawat-5021b1193" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://github.com/vvk079" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white transition-colors">
                        <Github size={24} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}