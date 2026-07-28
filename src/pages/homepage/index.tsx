import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "./sections/HeroSection";
import ExperienceSection from "./sections/ExperienceSection";
import PrizeTicketSection from "./sections/PrizeTicketSection";
import aboveFooterImg from "../../assets/above_Footer_Image.jpg.webp";

interface HomepageProps {
  onNavigateToLogin: () => void;
  onNavigateToHome: () => void;
}

export default function Homepage({ onNavigateToLogin, onNavigateToHome }: HomepageProps) {
  return (
    <div className="min-h-screen bg-[#4b0983] text-cream-text font-sans selection:bg-gold-primary selection:text-[#4b0983] overflow-x-hidden">
      <Header onNavigateToHome={onNavigateToHome} />

      <main>
        <HeroSection onNavigateToLogin={onNavigateToLogin} />
        
        <ExperienceSection />
        
        <PrizeTicketSection onNavigateToLogin={onNavigateToLogin} />
        
        {/* Above Footer Image Banner */}
        <section className="w-full bg-cream-bg leading-[0] overflow-hidden">
          <img
            src={aboveFooterImg}
            alt="Cadbury Christmas Campaign Banner"
            className="w-full h-auto block select-none"
            width={1920}
            height={882}
            loading="lazy"
          />
        </section>
      </main>

      <Footer onNavigateToHome={onNavigateToHome} />
    </div>
  );
}
