import React, { useState } from "react";
import logoCad from "../../assets/logocad.svg";
import cad1Img from "../../assets/cad1.webp";
import cad2Img from "../../assets/cad2.webp";

interface LoginPageProps {
  onBackToHome: () => void;
  onLoginSuccess?: (name: string, code: string) => void;
  onNavigateToMeetSanta: () => void;
}

export default function LoginPage({ onBackToHome, onLoginSuccess, onNavigateToMeetSanta }: LoginPageProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    
    // Generate a random 12-digit ticket code
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    if (onLoginSuccess) {
      onLoginSuccess(firstName.trim(), code);
    }
    onNavigateToMeetSanta();
  };

  return (
    <div className="min-h-screen bg-[#4b0983] text-cream-text font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-gold-primary selection:text-[#4b0983]">
      {/* Background Decorative Gradient & Ambient Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-light/20 via-[#4b0983] to-[#240346] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full py-6 px-4 md:px-8 flex items-center justify-between container mx-auto">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent"
        >
          <img src={logoCad} alt="Cadbury Logo" className="h-10 md:h-12 w-auto object-contain select-none" />
        </button>

        <button
          onClick={onBackToHome}
          className="px-6 py-2 rounded-full bg-metallic-gold text-[#4b0983] font-bold text-xs sm:text-sm border border-[#FFE9A0]/60 hover:scale-105 transition-all cursor-pointer shadow-md"
        >
          ← Back to Home
        </button>
      </header>

      {/* Main Login Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow max-w-4xl">
        {/* Header Text */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-spartan font-bold text-white mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            Welcome, <br />
            <span className="text-gold-light">Santa's ready to chat.</span>
          </h1>
          <p className="text-cream-text/85 text-xs sm:text-sm md:text-base leading-relaxed">
            Sign in to continue your conversation and make this Christmas extra special.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-[#2B0E54]/90 backdrop-blur-xl border border-gold-primary/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative my-4">
          {/* Top Cadbury Emblem Badge */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#1F073E] border-2 border-gold-primary flex items-center justify-center shadow-lg">
            <span className="font-serif italic font-bold text-2xl text-gold-light select-none">C</span>
          </div>

          <div className="pt-3 text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-spartan font-bold text-white mb-1.5">
              Step into the grotto
            </h2>
            <p className="text-cream-text/70 text-xs sm:text-sm">
              Just a name and email, and you're through the door.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs sm:text-sm font-medium text-cream-text/90">
                Your first name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Priya"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#1A0734] border border-purple-light/40 focus:border-gold-primary text-white text-sm rounded-xl px-4 py-3.5 outline-none transition-colors placeholder:text-cream-text/30"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs sm:text-sm font-medium text-cream-text/90">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="e.g. priya@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1A0734] border border-purple-light/40 focus:border-gold-primary text-white text-sm rounded-xl px-4 py-3.5 outline-none transition-colors placeholder:text-cream-text/30"
              />
            </div>

            {firstName.trim() && email.trim() ? (
              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 bg-metallic-gold text-[#4b0983] font-bold rounded-xl text-sm sm:text-base border border-[#FFE9A0]/60 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg mt-2 animate-fade-in"
              >
                Ho ho — let's talk
              </button>
            ) : (
              <div className="h-14 sm:h-16 flex items-center justify-center text-xs text-cream-text/40 italic">
                Fill in your name and email to proceed
              </div>
            )}

            <p className="text-[11px] sm:text-xs text-cream-text/60 text-center leading-relaxed mt-2">
              This is a demo sign-in — your name is only used to personalise your conversation with Santa in your browser. Nothing is saved or sent anywhere else.
            </p>
          </form>
        </div>
      </main>

      {/* Decorative Bottom Row Graphics with cad1.png and cad2.png - Enlarged */}
      <div className="relative z-10 w-full py-4 px-4 md:px-8 container mx-auto flex items-center justify-between pointer-events-none mt-4 overflow-visible">
        {/* cad1.png bottom left */}
        <div className="w-48 sm:w-64 md:w-80 lg:w-96 select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
          <img
            src={cad1Img}
            alt="Cadbury Product Pack"
            className="w-full h-auto object-contain rotate-[-6deg]"
          />
        </div>

        {/* cad2.png bottom right */}
        <div className="w-48 sm:w-64 md:w-80 lg:w-96 select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
          <img
            src={cad2Img}
            alt="Cadbury Celebration Pack"
            className="w-full h-auto object-contain rotate-[6deg]"
          />
        </div>
      </div>

      {/* Full Footer Section - Solid #4b0983 background */}
      <footer className="bg-[#4b0983] border-t border-gold-primary/10 py-12 text-cream-text/75 relative z-20 w-full">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Footer Left Column */}
            <div className="lg:col-span-3 flex flex-col items-start gap-3">
              <img
                src={logoCad}
                alt="Cadbury Logo"
                className="h-10 w-auto object-contain select-none cursor-pointer"
                onClick={onBackToHome}
              />
              <p className="text-xs text-cream-text/50 leading-relaxed mt-1">
                © 2026 Mondelez International. All rights reserved.
              </p>
            </div>

            {/* Footer Center Column Legal */}
            <div className="lg:col-span-9 flex flex-col gap-2">
              <p className="text-xs text-cream-text/60 leading-relaxed">
                Talk to Santa is a Cadbury Christmas campaign experience. Every conversation is generated live and is intended for festive fun — not real gift ordering, purchases, or personal advice.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
