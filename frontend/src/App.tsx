import Navbar from "./components/navbar";
import Footer from "./components/footer";
import LenisScroll from "./components/lenis";
import ScrollProgress from "./components/scroll-progress";
import AboutSection from "./sections/about-section";
import ContactSection from "./sections/contact-section";
import EducationSection from "./sections/education-section";
import ExperienceSection from "./sections/experience-section";
import HeroSection from "./sections/hero-section";
import ProjectsSection from "./sections/projects-section";
import SkillsSection from "./sections/skills-section";
import ChatAssistant from "./components/chat-assistant";


export default function App() {
    return (
        <main className="max-md:px-4">
            <Navbar />
            <ScrollProgress />
            <LenisScroll />
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ContactSection />
            <Footer />
            <ChatAssistant />
        </main>

    )
}