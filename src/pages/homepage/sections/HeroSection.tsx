import bannerImage from "../../../assets/Banner_Image.webp";
import mobileBannerImage from "../../../assets/Mobile Banner_JPEG_2.webp";
import secretSantaImg from "../../../assets/Secret_santa.webp";

interface HeroSectionProps {
  onNavigateToLogin: () => void;
}

export default function HeroSection({ onNavigateToLogin }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-transparent aspect-[1080/2218] md:aspect-[1920/1338]">
      {/* Desktop Banner Image (Visible on md screens and up) */}
      <img
        src={bannerImage}
        alt="Cadbury Secret Santa Hero Banner"
        className="hidden md:block w-full h-auto select-none pointer-events-none"
        width={1920}
        height={1338}
        fetchPriority="high"
        loading="eager"
      />
      {/* Mobile Banner Image (Visible on mobile screens < md) */}
      <img
        src={mobileBannerImage}
        alt="Cadbury Secret Santa Hero Mobile Banner"
        className="block md:hidden w-full h-auto select-none pointer-events-none"
        width={1080}
        height={2218}
        fetchPriority="high"
        loading="eager"
      />

      {/* Content Overlaid on top of the image */}
      <div className="absolute inset-0 z-10 flex items-start pt-24 sm:pt-32 md:pt-40 lg:pt-48">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start">
            {/* Secret Santa Title Image */}
            <img
              src={secretSantaImg}
              alt="Secret Santa"
              className="w-[70%] sm:w-[80%] md:w-[85%] lg:w-full max-w-[420px] object-contain hover:scale-102 transition-transform duration-500 mb-2 sm:mb-3 md:mb-4 select-none"
              fetchPriority="high"
              loading="eager"
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
                onClick={onNavigateToLogin}
                className="px-5 py-3 sm:px-6 sm:py-3.5 bg-metallic-gold text-[#4b0983] font-bold rounded-xl text-xs sm:text-sm md:text-base border border-[#FFE9A0]/60 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shadow-md"
              >
                Santa's Waiting for You
              </button>
            </div>
          </div>

          {/* Right column empty to let Santa in his sleigh shine */}
          <div className="hidden lg:block lg:col-span-7 xl:col-span-7 h-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
