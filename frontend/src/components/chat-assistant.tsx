import { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat', handleOpenChat);
        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [history, isOpen]);

    const handleSend = async () => {
        if (!message.trim()) return;

        const userMsg: Message = { role: 'user', content: message };
        setHistory(prev => [...prev, userMsg]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    history: history,
                }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            const aiMsg: Message = { role: 'assistant', content: data.response };
            setHistory(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errMsg: Message = { role: 'assistant', content: "SYSTEM_ERROR: Connection failed. Please ensure the backend is operational." };
            setHistory(prev => [...prev, errMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[calc(100vw-3rem)] md:w-96 h-[500px] glass rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 bg-zinc-900/50 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-white animate-pulse" />
                                <span className="font-mono text-xs uppercase tracking-widest text-white/50">AI CORE v2.0_</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" data-lenis-prevent>
                            {history.length === 0 && (
                                <div className="text-center space-y-4 mt-16">
                                    <div className="size-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                                        <Bot className="text-white size-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-white font-medium text-sm">Initialization Complete</p>
                                        <p className="text-zinc-500 text-xs max-w-[200px] mx-auto leading-relaxed">
                                            I am Vivek's neural interface. Ask anything about vivek ?
                                        </p>
                                    </div>
                                </div>
                            )}

                            {history.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`relative max-w-[85%] p-3.5 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-white text-zinc-950 rounded-tr-none shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                        : 'bg-zinc-800/50 text-zinc-300 border border-white/5 rounded-tl-none'
                                        }`}>
                                        {msg.role === 'assistant' && (
                                            <div className="flex items-center gap-1.5 mb-2 text-[10px] font-mono uppercase tracking-tighter text-white/40">
                                                <Sparkles size={10} />
                                                <span>AI_REPLY</span>
                                            </div>
                                        )}
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-800/30 text-zinc-500 border border-white/5 p-3.5 rounded-2xl rounded-tl-none text-xs font-mono flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <div className="size-1 bg-white/30 rounded-full animate-bounce" />
                                            <div className="size-1 bg-white/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <div className="size-1 bg-white/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                        PROCESSING...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-zinc-900/50 border-t border-white/5 flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Execute command..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 font-mono"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !message.trim()}
                                className="p-2.5 bg-white text-zinc-950 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-30 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group p-4 rounded-full shadow-2xl transition-all duration-300 border border-white/10 flex items-center justify-center ${isOpen ? 'bg-zinc-800 text-white' : 'bg-zinc-900 text-white'
                    }`}
            >
                {/* Desktop Label */}
                <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-zinc-800 border border-white/5 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                    {isOpen ? 'TERMINATE_SESSION' : 'INITIALIZE_ASSISTANT'}
                </span>

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="bot" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                            <Bot size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isOpen && (
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-white/20 -z-10"
                    />
                )}
            </motion.button>
        </div>
    );
}
