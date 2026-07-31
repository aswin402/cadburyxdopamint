import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SparkleCanvas from "../../../components/SparkleCanvas";
import ticket1Img from "../../../assets/Ticket_1_L.webp";
import ticket2Img from "../../../assets/Ticket_2_L.webp";

export default function PrizeTicketSection() {
  const navigate = useNavigate();
  const [mobileTicketState, setMobileTicketState] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileTicketState((prev) => (prev === 1 ? 2 : 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="prizes" className="bg-cream-bg py-6 md:py-10 text-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div
          className="relative rounded-2xl bg-[linear-gradient(135deg,_#2D1060_0%,_#4B1A8E_50%,_#3B1A6E_100%)] p-2 sm:p-3 md:p-4 overflow-hidden shadow-xl border border-gold-primary/20 cursor-pointer"
          onClick={() => navigate("/login")}
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
              loading="lazy"
            />

            {/* Hover Ticket 1 Image (Standard Ticket) - Transitions on top of default image */}
            <img
              src={ticket1Img}
              alt="Cadbury Secret Santa Ticket"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out select-none pointer-events-none lg:opacity-0 lg:group-hover:opacity-100 ${
                mobileTicketState === 1 ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
