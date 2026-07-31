import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoCad from "../../assets/logocad.svg";
import cad1Img from "../../assets/cad1.webp";
import cad2Img from "../../assets/cad2.webp";

export default function LoginPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;

    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    navigate("/meet-santa", {
      state: { userName: firstName.trim(), unicode: code },
    });
  };

  return (
    <div className="min-h-screen bg-[#4b0983] text-cream-text font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-gold-primary selection:text-[#4b0983]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-light/20 via-[#4b0983] to-[#240346] pointer-events-none" />

      <header className="relative z-20 w-full py-6 px-4 md:px-8 flex items-center justify-between container mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent"
        >
          <img src={logoCad} alt="Cadbury Logo" className="h-10 md:h-12 w-auto object-contain select-none" />
        </Link>

        <Link
          to="/"
          className="px-6 py-2 rounded-full bg-metallic-gold text-[#4b0983] font-bold text-xs sm:text-sm border border-[#FFE9A0]/60 hover:scale-105 transition-all cursor-pointer shadow-md"
        >
          ← Back to Home
        </Link>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center flex-grow max-w-4xl">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-spartan font-bold text-white mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            Welcome, <br />
            <span className="text-gold-light">Santa's ready to chat.</span>
          </h1>
          <p className="text-cream-text/85 text-xs sm:text-sm md:text-base leading-relaxed">
            Sign in to continue your conversation and make this Christmas extra special.
          </p>
        </div>

        <div className="w-full max-w-md bg-[#2B0E54]/90 backdrop-blur-xl border border-gold-primary/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative my-4">
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="firstName" className="text-xs font-semibold text-cream-text/80 ml-1">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your first name"
                className="w-full px-4 py-3 rounded-xl bg-[#1F073E]/80 border border-gold-primary/25 text-white placeholder:text-cream-text/35 focus:outline-none focus:border-gold-primary/60 focus:ring-1 focus:ring-gold-primary/40 transition-all text-sm"
                required
                autoComplete="given-name"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-cream-text/80 ml-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#1F073E]/80 border border-gold-primary/25 text-white placeholder:text-cream-text/35 focus:outline-none focus:border-gold-primary/60 focus:ring-1 focus:ring-gold-primary/40 transition-all text-sm"
                required
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-xl bg-metallic-gold text-[#4b0983] font-bold text-sm sm:text-base border border-[#FFE9A0]/60 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              Meet Santa
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] text-cream-text/45 leading-relaxed">
            By continuing you agree to the campaign terms. This is a festive demo — not a real purchase flow.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8 opacity-70">
          <img src={cad1Img} alt="" className="h-10 w-auto object-contain select-none" />
          <img src={cad2Img} alt="" className="h-10 w-auto object-contain select-none" />
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center">
        <Link
          to="/"
          className="text-xs text-cream-text/50 hover:text-gold-light transition-colors cursor-pointer"
        >
          ← Back to Cadbury home
        </Link>
      </footer>
    </div>
  );
}
