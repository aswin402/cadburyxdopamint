import logoCad from "../assets/logocad.svg";

interface FooterProps {
  onNavigateToHome: () => void;
}

export default function Footer({ onNavigateToHome }: FooterProps) {
  return (
    <footer id="footer" className="bg-[#4b0983] border-t border-gold-primary/10 py-16 text-cream-text/75 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Footer Left Column */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <img 
              src={logoCad} 
              alt="Cadbury Logo" 
              className="h-12 w-auto object-contain select-none cursor-pointer" 
              onClick={onNavigateToHome} 
            />
            <p className="text-xs text-cream-text/50 leading-relaxed mt-2">
              © 2026 Mondelez International. All rights reserved.
            </p>
          </div>

          {/* Footer Center Column Legal */}
          <div className="lg:col-span-9 flex flex-col gap-3">
            <p className="text-xs text-cream-text/60 leading-relaxed">
              Talk to Santa is a Cadbury Christmas campaign experience. Every conversation is generated live and is intended for festive fun — not real gift ordering, purchases, or personal advice. The Cadbury Secret Santa gift selection has its own full terms.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
