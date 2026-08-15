import Section from "../components/section";
import { Github, ExternalLink, X, Zap, Layers, ArrowRightIcon } from "lucide-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useReducedMotion,
    type MotionValue,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    github?: string;
    live?: string;
    tags: string[];
    features: string[];
    techDetails: string;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
};

/**
 * One row of the project list.
 *
 * Split into its own component so `useTransform` isn't called inside a loop,
 * and so the scroll-driven `x` lives on a wrapper: Framer's layout projection
 * (used by `layoutId` for the modal morph) conflicts with a transform animated
 * on the same element.
 */
function ProjectRow({
    project,
    index,
    progress,
    onSelect,
}: {
    project: Project;
    index: number;
    progress: MotionValue<number>;
    onSelect: (id: string) => void;
}) {
    const reduceMotion = useReducedMotion();
    // Alternate rows drift in opposite directions, meeting at centre-screen.
    const direction = index % 2 === 0 ? -1 : 1;
    const drift = reduceMotion ? 0 : 90 * direction;
    const x = useTransform(progress, [0, 0.5, 1], [drift, 0, -drift]);

    return (
        <li>
            <motion.div style={{ x }}>
                <motion.div
                    layoutId={project.id}
                    variants={itemVariants}
                    onClick={() => onSelect(project.id)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="group relative glass rounded-2xl overflow-hidden cursor-pointer border-white/5 hover:border-white/20 transition-colors flex flex-col sm:flex-row sm:min-h-52"
                >
                    {/* Thumbnail */}
                    <div className="relative shrink-0 w-full sm:w-72 aspect-video sm:aspect-auto overflow-hidden">
                        <motion.img
                            layoutId={`image-${project.id}`}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            src={project.image}
                            alt={project.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#030712]/60 hidden sm:block" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 p-6 flex flex-col justify-center gap-3.5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2.5">
                                    <span className="font-mono text-[10px] text-white/30 tabular-nums">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <motion.h3
                                        layoutId={`title-${project.id}`}
                                        className="text-xl font-bold text-white truncate"
                                    >
                                        {project.title}
                                    </motion.h3>
                                </div>
                                <motion.p
                                    layoutId={`desc-${project.id}`}
                                    className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mt-2"
                                >
                                    {project.description}
                                </motion.p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} source code on GitHub`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                                    >
                                        <Github size={16} />
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.title} live demo`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 rounded-lg bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                                <button
                                    type="button"
                                    aria-label={`Expand details for ${project.title}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(project.id);
                                    }}
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-zinc-950 transition-all"
                                >
                                    <ArrowRightIcon className="size-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </li>
    );
}

export default function ProjectsSection() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // 0 as the list enters from the bottom, 1 as it leaves past the top.
    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ["start end", "end start"],
    });

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedId]);

    const projects = [
        {
            id: "thumbnailio",
            title: "Thumbnailio",
            description: "Full-stack AI thumbnail generation platform. Generate high-quality thumbnails using Google's Gemini API.",
            longDescription: "A comprehensive AI-driven tool for content creators to generate click-worthy thumbnails instantly. Leveraging Google's Gemini Pro Vision model, the platform analyzes video context to suggest and create visual assets with high precision.",
            image: "/assets/project-1.png",
            github: "https://github.com/vvk079/thumbnailio",
            live: "https://thumbnailio.vercel.app/",
            tags: ["MERN Stack", "Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Cloudinary"],
            features: [
                "Gemini AI Integration for context-aware thumbnails",
                "Real-time image generation and processing",
                "Custom style presets and aspect ratio control",
                "User history and generation dashboard"
            ],
            techDetails: "Built with a modern MERN stack, utilizing specialized prompts for the Gemini Pro Vision model to ensure visual consistency."
        },
        {
            id: "dealbee",
            title: "DealBee",
            description: "An automated price tracking system and deals aggregator. Get notified when prices drop for your favorite items across multiple platforms.",
            longDescription: "A high-performance e-commerce utility that monitors product prices across major retailers. Uses Firecrawl for sophisticated web scraping and Supabase for real-time data persistence, providing visualized price trends to help users save money.",
            image: "/assets/project-2.png",
            live: "https://dealbee.vercel.app/",
            github: "https://github.com/vvk079/TrackPrice",
            tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Firecrawl", "Recharts"],
            features: [
                "Advanced Web Scraping with Firecrawl for dynamic content",
                "Email alerts for customized price thresholds",
                "Historical price data visualization using Recharts",
                "Cross-retailer price comparison engine"
            ],
            techDetails: "Leverages Supabase as a real-time database and auth provider, with Firecrawl handling the heavy lifting of multi-site scraping."
        },
    ];

    const selectedProject = projects.find(p => p.id === selectedId);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    };

    return (
        <Section title="Projects" id="projects">
            <div ref={listRef}>
                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col gap-4"
                >
                    {projects.map((project, index) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            index={index}
                            progress={scrollYProgress}
                            onSelect={setSelectedId}
                        />
                    ))}
                </motion.ul>
            </div>

            <AnimatePresence>
                {selectedId && selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
                        />
                        <motion.div
                            layoutId={selectedId}
                            className="relative w-[95vw] h-[92vh] flex flex-col md:flex-row bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10"
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white z-30 transition-all border border-white/10 backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden shrink-0">
                                <motion.img
                                    layoutId={`image-${selectedId}`}
                                    src={selectedProject.image}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950/20" />
                            </div>

                            <div
                                className="w-full md:w-1/2 flex-1 p-8 md:p-16 lg:p-24 space-y-12 overflow-y-auto custom-scrollbar"
                                data-lenis-prevent
                            >
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-mono">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <motion.h3 layoutId={`title-${selectedId}`} className="text-4xl font-bold text-white mb-4">
                                        {selectedProject.title}
                                    </motion.h3>
                                    <motion.p layoutId={`desc-${selectedId}`} className="text-zinc-300 text-lg leading-relaxed">
                                        {selectedProject.longDescription}
                                    </motion.p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-white">
                                                <Zap size={24} />
                                            </div>
                                            <h4 className="text-xl font-semibold text-white">Key Features</h4>
                                        </div>
                                        <ul className="grid gap-3">
                                            {selectedProject.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-zinc-400 group">
                                                    <div className="mt-1.5 size-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors" />
                                                    <span className="leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-white/5">
                                        <h4 className="flex items-center gap-2 text-white font-mono text-sm uppercase tracking-widest">
                                            <Layers size={16} /> Tech Insight_
                                        </h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed italic">
                                            {selectedProject.techDetails}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    {selectedProject.github && (
                                        <a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all border border-white/5"
                                        >
                                            <Github size={20} />
                                            Source Code
                                        </a>
                                    )}
                                    {selectedProject.live && (
                                        <a
                                            href={selectedProject.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-medium transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        >
                                            <ExternalLink size={20} />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Section>
    );
}