interface Props {
    title: string;
    children: React.ReactNode;
    id?: string;
}

export default function Section({ title, children, id }: Props) {
    return (
        <section id={id} className="flex flex-col md:flex-row items-center justify-center md:items-start gap-8 w-full max-w-4xl mx-auto mt-28 px-4 scroll-mt-24">
            <div className="w-full md:max-w-[120px] pt-3 shrink-0">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-white/50 mb-2 md:mb-0">
                    {title}
                </h2>
                <div className="h-[1px] w-8 bg-white/10 hidden md:block mt-2"></div>
            </div>
            <div className="w-full">
                {children}
            </div>
        </section>
    );
}