import { createContext, useContext } from "react";

/** Section ids in document order — drives both the navbar and the scroll-spy. */
export const SECTION_IDS = [
    "about",
    "experience",
    "projects",
    "education",
    "skills",
    "contact",
] as const;

export const ActiveSectionContext = createContext<string | null>(null);

/** Id of the section currently under the scroll line, or null when above the first one. */
export function useActiveSection() {
    return useContext(ActiveSectionContext);
}

/**
 * True once the hero avatar has scrolled away, meaning it should be rendered
 * docked in the navbar instead. Single source of truth so exactly one element
 * ever holds the shared `layoutId` — two would break the flight animation.
 */
export const HeroDockedContext = createContext(false);

export function useHeroDocked() {
    return useContext(HeroDockedContext);
}

/** Shared between the hero avatar and its docked navbar counterpart. */
export const AVATAR_LAYOUT_ID = "profile-avatar";
