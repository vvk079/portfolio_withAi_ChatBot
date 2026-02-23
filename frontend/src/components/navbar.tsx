import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
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
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-white font-bold text-xl tracking-tighter hover:opacity-70 transition-opacity">
                    VIVEK<span className="text-zinc-500">_</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => smoothScroll(e, link.href)}
                            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
                        </a>
                    ))}

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
                    className="md:hidden p-2 rounded-full bg-white text-zinc-950"
                >
                    <Bot size={20} />
                </button>
            </div>
        </motion.nav>
    );
}
