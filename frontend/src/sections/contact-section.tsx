import Section from "../components/section";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <Section title="Contact" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="grid gap-6 w-full"
            >
                <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-white/50 transition-colors">
                        <Mail className="size-5 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Email</p>
                        <a href="mailto:vivekkushwah776@gmail.com" className="text-zinc-200 hover:text-white transition-colors">
                            vivekkushwah776@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-white/50 transition-colors">
                        <Phone className="size-5 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Phone</p>
                        <a href="tel:+917065250776" className="text-zinc-200 hover:text-white transition-colors">
                            +91 7065250776
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4 group">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-white/50 transition-colors">
                        <MapPin className="size-5 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Location</p>
                        <p className="text-zinc-200">Delhi, India</p>
                    </div>
                </div>
            </motion.div>
        </Section>
    );
}