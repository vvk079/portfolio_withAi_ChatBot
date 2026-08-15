export default function Footer() {
    return (
        <footer className="mt-32 w-full text-center py-8 text-zinc-500 border-t border-white/5">
            <p>
                © {new Date().getFullYear()}{" "}
                <span className="text-zinc-300">Vivek Shekhawat</span>
                . All rights reserved.
            </p>
        </footer>
    );
}