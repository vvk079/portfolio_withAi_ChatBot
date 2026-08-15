import { useEffect, useState } from "react";
import {
    ActiveSectionContext,
    HeroDockedContext,
    SECTION_IDS,
} from "../context/active-section-context";

/**
 * Tracks which section is currently under an imaginary line 35% down the
 * viewport and shares it with the navbar and section headings.
 *
 * Uses a rAF-throttled scroll listener rather than IntersectionObserver so the
 * top-of-page (nothing active) and bottom-of-page (last section active, even
 * though it sits above the line) cases are both handled explicitly.
 */
export default function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
    const [active, setActive] = useState<string | null>(null);
    const [heroDocked, setHeroDocked] = useState(false);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.35;

            // Dock the avatar into the navbar once the hero portrait has
            // scrolled up out of view. Measured off the real element so it
            // stays correct across viewport sizes.
            const avatar = document.getElementById("hero-avatar-anchor");
            const dockAt = avatar
                ? avatar.offsetTop + avatar.offsetHeight - 64
                : window.innerHeight * 0.3;
            setHeroDocked(window.scrollY > dockAt);

            // At the bottom the last section can never cross the line, so pin it.
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 2;
            if (atBottom) {
                setActive(SECTION_IDS[SECTION_IDS.length - 1]);
                return;
            }

            let current: string | null = null;
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (!el) continue;
                const { top, bottom } = el.getBoundingClientRect();
                if (top <= line && bottom > line) {
                    current = id;
                    break;
                }
                // Otherwise remember the last section that began above the line.
                if (top <= line) current = id;
            }
            setActive(current);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <ActiveSectionContext.Provider value={active}>
            <HeroDockedContext.Provider value={heroDocked}>
                {children}
            </HeroDockedContext.Provider>
        </ActiveSectionContext.Provider>
    );
}
