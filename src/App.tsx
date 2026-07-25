import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Check } from "lucide-react";
import { LoginPage } from "./components/LoginPage";

// Import custom assets
import bannerImage from "./assets/Banner_Image.png";
import mobileBannerImage from "./assets/Mobile_Banner_JPEG.jpg";
import secretSantaImg from "./assets/Secret_santa.png";
import logoCad from "./assets/logocad.svg";

// Section 2 custom assets
import santaCapImg from "./assets/santacap.png";
import bgForSectionImg from "./assets/bgforsection.png";
import cad1Img from "./assets/cad1.png";
import cad2Img from "./assets/cad2.png";
import bgTextureImg from "./assets/Background_Texture.jpg";

// Prize Ticket custom assets
import ticket1Img from "./assets/Ticket_1_L.png";
import ticket2Img from "./assets/Ticket_2_L.png";
import aboveFooterImg from "./assets/above_Footer_Image.jpg.jpeg";
import mobileScreenImg from "./assets/Mobile_Screen.png";

// Roadmap Step assets
import keyImg from "./assets/key.png";
import chatImg from "./assets/chat.png";
import codeImg from "./assets/code.png";
import santaRidingImg from "./assets/santa_riding.png";
import chiminiImg from "./assets/chimini.png";
import giftImg from "./assets/gift.png";

// Hook for scroll animation reveal
function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isIntersecting] as const;
}

// Sparkle Canvas Component
function SparkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
    }> = [];

    // Create particles
    const initParticles = () => {
      const count = Math.min(Math.floor(width / 30), 40);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedY: -(Math.random() * 0.4 + 0.1),
          opacity: Math.random(),
          opacitySpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;

        if (p.opacity > 1 || p.opacity < 0) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        // Reset particle to bottom when it goes off screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 201, 124, ${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "login">("home");
  const [userName, setUserName] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToLogin = () => {
    setCurrentPage("login");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Section Refs for scroll reveals
  const [heroTextRef, heroTextVisible] = useIntersectionObserver();
  const [stepsRef, stepsVisible] = useIntersectionObserver();
  const [bannerRef, bannerVisible] = useIntersectionObserver();
  const [featuresRef, featuresVisible] = useIntersectionObserver();

  // If on login page, render the LoginPage component
  if (currentPage === "login") {
    return (
      <LoginPage
        onBackToHome={navigateToHome}
        onLoginSuccess={(name) => {
          setUserName(name);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#4b0983] text-cream-text font-sans selection:bg-gold-primary selection:text-[#4b0983] overflow-x-hidden">
      {/* Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#4b0983] py-4 border-b border-gold-primary/10 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3" onClick={navigateToHome}>
            <img 
              src={logoCad} 
              alt="Cadbury Logo" 
              className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition-transform cursor-pointer select-none" 
            />
          </div>

          {/* Desktop Navigation Links (Removed) */}
          <div className="hidden md:flex flex-grow" />

          {/* Sign In Button with Metallic Gold Gradient */}
          <div className="hidden md:block">
            <button
              onClick={navigateToLogin}
              className="px-6 py-2 bg-metallic-gold text-[#4b0983] font-bold rounded-full border border-[#FFE9A0]/50 hover:scale-105 transition-all cursor-pointer shadow-md"
            >
              {userName ? `Hi, ${userName}` : "Sign in"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-gold-light hover:text-gold-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-50 bg-[#4b0983] backdrop-blur-lg transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <img src={logoCad} alt="Cadbury Logo" className="h-8 w-auto object-contain" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gold-light hover:text-gold-primary transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <button
            onClick={navigateToLogin}
            className="w-full py-3 bg-metallic-gold text-[#4b0983] font-bold rounded-full border border-[#FFE9A0]/50 mt-auto cursor-pointer shadow-md"
          >
            {userName ? `Hi, ${userName}` : "Sign in"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-transparent">
        {/* Desktop Banner Image (Visible on md screens and up) */}
        <img
          src={bannerImage}
          alt="Cadbury Secret Santa Hero Banner"
          className="hidden md:block w-full h-auto select-none pointer-events-none"
        />
        {/* Mobile Banner Image (Visible on mobile screens < md) */}
        <img
          src={mobileBannerImage}
          alt="Cadbury Secret Santa Hero Mobile Banner"
          className="block md:hidden w-full h-auto select-none pointer-events-none"
        />

        {/* Content Overlaid on top of the image */}
        <div className="absolute inset-0 z-10 flex items-start pt-24 sm:pt-32 md:pt-40 lg:pt-48">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div
              ref={heroTextRef as any}
              className={`lg:col-span-5 xl:col-span-5 flex flex-col items-start transition-all duration-1000 ${
                heroTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* Secret Santa Title Image */}
              <img
                src={secretSantaImg}
                alt="Secret Santa"
                className="w-[70%] sm:w-[80%] md:w-[85%] lg:w-full max-w-[420px] object-contain hover:scale-102 transition-transform duration-500 mb-2 sm:mb-3 md:mb-4 select-none"
              />

              {/* Sub-tagline */}
              <p className="text-gold-light font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                Ho Ho Ho... Santa's finally here!
              </p>

              {/* Concise 3-Sentence Description Paragraph */}
              <p className="text-xs sm:text-sm md:text-base text-cream-text/95 leading-relaxed mb-4 sm:mb-5 md:mb-7 max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                This Christmas, don't just write to Santa, talk to him. Share your wishes and hear Santa reply in his warm, real-time voice. Better yet, he'll remember your name and continue the conversation.
              </p>

              {/* Single Primary Action Button with Metallic Gold Gradient */}
              <div className="flex flex-col items-start gap-3 w-full sm:w-auto">
                <button
                  onClick={navigateToLogin}
                  className="px-5 py-3 sm:px-6 sm:py-3.5 bg-metallic-gold text-[#4b0983] font-bold rounded-xl text-xs sm:text-sm md:text-base border border-[#FFE9A0]/60 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shadow-md"
                >
                  Have a conversation with Santa
                </button>

                {/* Green Check Badge matching reference image */}
                <div className="flex items-start gap-2.5 mt-2">
                  <div className="w-5 h-5 rounded-full bg-green-check flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                    <Check size={12} strokeWidth={3.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Cadbury Christmas Secret Santa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column empty to let Santa in his sleigh shine */}
            <div className="hidden lg:block lg:col-span-7 xl:col-span-7 h-10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* The Experience Section - Road to the North Pole Step Section */}
      <section id="experience" className="w-full py-16 md:py-24 bg-[#f5efe6] relative overflow-hidden text-[#2B0E54]">
        {/* Decorative Top Stars & Background elements */}
        <div className="absolute top-10 left-12 text-[#E6CE8A]/50 text-xl select-none">★</div>
        <div className="absolute top-24 right-20 text-[#E6CE8A]/30 text-2xl select-none">★</div>
        <div className="absolute top-1/3 left-10 text-[#E6CE8A]/30 text-xl select-none">★</div>
        <div className="absolute bottom-1/3 right-12 text-[#E6CE8A]/50 text-xl select-none">★</div>
        <div className="absolute bottom-12 left-24 text-[#E6CE8A]/30 text-2xl select-none">★</div>

        <div className="container max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center items-center w-full">
            <div className="relative flex flex-col gap-8 sm:gap-12 lg:gap-0 w-full max-w-xl h-auto lg:h-[680px] lg:justify-between">
              {/* SVG Winding Dashed Road Path - Exactly matching badge column */}
              <div className="absolute left-0 top-10 bottom-10 w-20 sm:w-28 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 100 800" fill="none" preserveAspectRatio="none">
                  <path
                    d="M50 0 C80 60, 80 190, 50 250 C20 310, 20 440, 50 500 C80 560, 80 690, 50 750"
                    stroke="#2B0E54"
                    strokeWidth="3"
                    strokeDasharray="6 6"
                  />
                </svg>
              </div>

              {/* Step 01 */}
              <div className="flex items-center gap-6 sm:gap-10 md:gap-12 relative z-10 group">
                {/* Badge 1 (Key inside Purple Circle) */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-full bg-[#2B0E54] border-4 border-white flex items-center justify-center shadow-[0_8px_24px_rgba(43,14,84,0.25)] relative overflow-hidden">
                  <img
                    src={keyImg}
                    alt="Sign In Badge"
                    className="w-[95%] h-[95%] object-contain select-none pointer-events-none"
                  />
                </div>

                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#2B0E54]/5 shadow-[0_10px_35px_rgba(43,14,84,0.05)] flex-grow flex items-center justify-between gap-4 text-left relative overflow-visible">
                  {/* Number Badge inside Card */}
                  <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-[#2B0E54] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                    01
                  </div>
                  <div className="flex-grow pr-2">
                    <span className="text-[#2B0E54]/60 font-bold text-xs uppercase tracking-wider block mb-1">Step 01</span>
                    <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#2B0E54] mb-1.5">Sign In</h3>
                    <p className="text-[#2B0E54]/75 text-xs sm:text-sm leading-relaxed">
                      Tell Santa your name. Takes only a few seconds.
                    </p>
                  </div>
                  {/* Santa Riding Sleigh Embedded on the Right End of Card 1 */}
                  <div className="w-20 sm:w-24 shrink-0 select-none pointer-events-none">
                    <img
                      src={santaRidingImg}
                      alt="Santa Riding Sleigh"
                      className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="flex items-center gap-6 sm:gap-10 md:gap-12 relative z-10 group">
                {/* Badge 2 (Chat inside Purple Circle) */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-full bg-[#2B0E54] border-4 border-white flex items-center justify-center shadow-[0_8px_24px_rgba(43,14,84,0.25)] relative overflow-hidden">
                  <img
                    src={chatImg}
                    alt="Make a Wish Badge"
                    className="w-[115%] h-[115%] object-contain select-none pointer-events-none"
                  />
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#2B0E54]/5 shadow-[0_10px_35px_rgba(43,14,84,0.05)] flex-grow flex items-center justify-between gap-4 text-left relative overflow-visible">
                  {/* Number Badge inside Card */}
                  <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-[#2B0E54] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                    02
                  </div>
                  <div className="flex-grow pr-2">
                    <span className="text-[#2B0E54]/60 font-bold text-xs uppercase tracking-wider block mb-1">Step 02</span>
                    <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#2B0E54] mb-1.5">Make a Wish</h3>
                    <p className="text-[#2B0E54]/75 text-xs sm:text-sm leading-relaxed">
                      Share your Christmas wish with Santa.
                    </p>
                  </div>
                  {/* Chimney Embedded on the Right End of Card 2 */}
                  <div className="w-12 sm:w-16 shrink-0 select-none pointer-events-none">
                    <img
                      src={chiminiImg}
                      alt="Chimney decoration"
                      className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div className="flex items-center gap-6 sm:gap-10 md:gap-12 relative z-10 group">
                {/* Badge 3 (Code inside Purple Circle) */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-full bg-[#2B0E54] border-4 border-white flex items-center justify-center shadow-[0_8px_24px_rgba(43,14,84,0.25)] relative overflow-hidden">
                  <img
                    src={codeImg}
                    alt="Get Code Badge"
                    className="w-[115%] h-[115%] object-contain select-none pointer-events-none"
                  />
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#2B0E54]/5 shadow-[0_10px_35px_rgba(43,14,84,0.05)] flex-grow flex items-center justify-between gap-4 text-left relative overflow-visible">
                  {/* Number Badge inside Card */}
                  <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-[#2B0E54] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                    03
                  </div>
                  <div className="flex-grow pr-2">
                    <span className="text-[#2B0E54]/60 font-bold text-xs uppercase tracking-wider block mb-1">Step 03</span>
                    <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#2B0E54] mb-1.5">Get Your Unique Code</h3>
                    <p className="text-[#2B0E54]/75 text-xs sm:text-sm leading-relaxed">
                      Receive your unique code from Santa.
                    </p>
                  </div>
                  {/* Gift Box Embedded on the Right End of Card 3 */}
                  <div className="w-12 sm:w-16 shrink-0 select-none pointer-events-none">
                    <img
                      src={giftImg}
                      alt="Purple Gift box"
                      className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Mobile_Screen */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <img
              src={mobileScreenImg}
              alt="Secret Santa Mobile Chat Experience"
              className="w-full max-w-[92%] sm:max-w-[450px] lg:max-w-none h-auto lg:h-[680px] lg:w-auto object-contain drop-shadow-2xl select-none pointer-events-none hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

        </div>

        {/* Lavender Pine Trees background decorators */}
        <div className="absolute bottom-0 left-2 sm:left-4 w-16 sm:w-20 opacity-20 pointer-events-none select-none">
          <svg viewBox="0 0 60 100" fill="none" className="w-full h-auto">
            <path d="M30,10 L50,45 L10,45 Z" fill="#A855F7" />
            <path d="M30,30 L55,70 L5,70 Z" fill="#C084FC" />
            <path d="M30,55 L60,95 L0,95 Z" fill="#E9D5FF" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-2 sm:right-4 w-20 sm:w-24 opacity-20 pointer-events-none select-none">
          <svg viewBox="0 0 60 100" fill="none" className="w-full h-auto">
            <path d="M30,10 L50,45 L10,45 Z" fill="#A855F7" />
            <path d="M30,30 L55,70 L5,70 Z" fill="#C084FC" />
            <path d="M30,55 L60,95 L0,95 Z" fill="#E9D5FF" />
          </svg>
        </div>
      </section>


      {/* Prize Ticket Section - Compact Purple Container with Sparkle Canvas & Ticket Hover Transition */}
      <section id="prizes" className="bg-cream-bg py-6 md:py-10 text-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <div
            ref={bannerRef as any}
            className={`relative rounded-2xl bg-[linear-gradient(135deg,_#2D1060_0%,_#4B1A8E_50%,_#3B1A6E_100%)] p-2 sm:p-3 md:p-4 overflow-hidden shadow-xl border border-gold-primary/20 transition-all duration-1000 ${
              bannerVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-98"
            }`}
            onClick={navigateToLogin}
          >
            {/* Canvas Sparkles Background Animation */}
            <SparkleCanvas />

            {/* Ticket Graphic with Hover Transition - Constrained height with full width */}
            <div className="relative z-10 w-full group cursor-pointer overflow-hidden rounded-xl h-[220px] sm:h-[320px] md:h-[400px] lg:h-[480px]">
              {/* Default Ticket 2 Image (Golden Ticket) - Always opaque underneath to prevent purple background bleed-through */}
              <img
                src={ticket2Img}
                alt="Cadbury Secret Santa Golden Ticket"
                className="w-full h-full block object-contain select-none"
              />

              {/* Hover Ticket 1 Image (Standard Ticket) - Transitions on top of default image */}
              <img
                src={ticket1Img}
                alt="Cadbury Secret Santa Ticket"
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Above Footer Image Banner */}
      <section className="w-full bg-cream-bg leading-[0] overflow-hidden">
        <img
          src={aboveFooterImg}
          alt="Cadbury Christmas Campaign Banner"
          className="w-full h-auto block select-none"
        />
      </section>

      {/* Footer Section - Solid #4b0983 background */}
      <footer id="footer" className="bg-[#4b0983] border-t border-gold-primary/10 py-16 text-cream-text/75 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Footer Left Column */}
            <div className="lg:col-span-3 flex flex-col items-start gap-4">
              <img src={logoCad} alt="Cadbury Logo" className="h-12 w-auto object-contain select-none cursor-pointer" onClick={navigateToHome} />
              <p className="text-xs text-cream-text/50 leading-relaxed mt-2">
                © 2026 Mondelez International. All rights reserved.
              </p>
            </div>

            {/* Footer Center Column Legal */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <p className="text-xs text-cream-text/60 leading-relaxed">
                Talk to Santa is a Cadbury Christmas campaign experience. Every conversation is generated live by Dopamint and is intended for festive fun — not real gift ordering, purchases, or personal advice. The Cadbury Secret Santa gift selection has its own full terms.
              </p>
            </div>

            {/* Footer Right Column Partners / Socials */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-6">
              <div className="flex items-center gap-3 text-xs tracking-wider">
                <span className="text-white-soft font-semibold">Cadbury</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-primary/20 hover:border-gold-primary text-gold-primary hover:text-gold-light flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-primary/20 hover:border-gold-primary text-gold-primary hover:text-gold-light flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-primary/20 hover:border-gold-primary text-gold-primary hover:text-gold-light flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  aria-label="Youtube"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-primary/20 hover:border-gold-primary text-gold-primary hover:text-gold-light flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;