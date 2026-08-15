import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { useState, useEffect } from "react";
import {
    AVATAR_LAYOUT_ID,
    useActiveSection,
    useHeroDocked,
} from "../context/active-section-context";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const activeSection = useActiveSection();
    const heroDocked = useHeroDocked();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Education", href: "#education" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: 'smooth' });
    };

    const activeLabel = navLinks.find(
        (link) => link.href.slice(1) === activeSection
    )?.name;

    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openChat = () => {
        window.dispatchEvent(new CustomEvent('open-chat'));
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{
                y: 0,
                backgroundColor: scrolled ? "rgba(3, 7, 18, 0.8)" : "rgba(3, 7, 18, 0)",
                backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
                paddingTop: scrolled ? "1rem" : "1.5rem",
                paddingBottom: scrolled ? "1rem" : "1.5rem",
                borderBottomColor: scrolled ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0)",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-[100] border-b"
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <a
                        href="#"
                        onClick={scrollToTop}
                        className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl tracking-tighter hover:opacity-70 transition-opacity min-w-0"
                    >
                        <AnimatePresence>
                            {heroDocked && (
                                <motion.img
                                    layoutId={AVATAR_LAYOUT_ID}
                                    src="/assets/user-image.jpg"
                                    alt="Vivek Shekhawat"
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                    className="size-8 rounded-full border border-white/30 object-cover shrink-0"
                                />
                            )}
                        </AnimatePresence>
                        <span className="truncate">
                            VIVEK SHEKHAWAT<span className="text-zinc-500">_</span>
                        </span>
                    </a>

                    {/* Current section, popping in as you scroll through the page */}
                    <AnimatePresence mode="wait">
                        {activeLabel && (
                            <motion.div
                                key={activeLabel}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="hidden sm:flex items-center gap-3 min-w-0"
                            >
                                <span className="h-4 w-px bg-white/15 shrink-0" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 truncate">
                                    {activeLabel}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.slice(1);
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => smoothScroll(e, link.href)}
                                aria-current={isActive ? "true" : undefined}
                                className={`text-sm font-medium transition-colors relative group ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                <span
                                    className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                />
                            </a>
                        );
                    })}

                    <button
                        onClick={openChat}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 text-sm font-bold hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] ml-4"
                    >
                        <Bot size={16} />
                        Ask AI
                    </button>
                </div>

                {/* Mobile AI Trigger */}
                <button
                    onClick={openChat}
                    aria-label="Open AI assistant"
                    className="lg:hidden p-2 rounded-full bg-white text-zinc-950 shrink-0"
                >
                    <Bot size={20} />
                </button>
            </div>
        </motion.nav>
    );
}
