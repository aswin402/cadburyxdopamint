import { useState, useEffect } from "react";
import logoCad from "../assets/logocad.svg";

interface HeaderProps {
  onNavigateToHome: () => void;
}

export default function Header({ onNavigateToHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#4b0983] py-4 border-b border-gold-primary/10 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3" onClick={onNavigateToHome}>
          <img 
            src={logoCad} 
            alt="Cadbury Logo" 
            className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none" 
          />
        </div>
      </div>
    </header>
  );
}
