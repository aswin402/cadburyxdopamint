import { useNavigate } from "react-router-dom";
import bannerImage from "../../../assets/Banner_Image.webp";
import mobileBannerImage from "../../../assets/Mobile Banner_JPEG_2.webp";
import secretSantaImg from "../../../assets/Secret_santa.webp";
import { hasSantaSession, SANTA_AVATAR_UUID } from "../../../config/companion";
import { requestAppFullscreen } from "../../../lib/fullscreen";

export default function HeroSection() {
  const navigate = useNavigate();
  const santaHref = hasSantaSession()
    ? `/companions/${encodeURIComponent(SANTA_AVATAR_UUID)}?santa=1`
    : "/companions";

  /** Same click gesture → browser fullscreen (no tab chrome), then open Santa chat. */
  const openSanta = async () => {
    await requestAppFullscreen();
    navigate(santaHref);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#4b0983] aspect-[1080/2218] md:aspect-[1920/1338]">
      {/* Cover art — section height follows content so CTA stays visible when narrow (e.g. DevTools). */}
      <img
        src={bannerImage}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[center_top] select-none md:block"
        width={1920}
        height={1338}
        fetchPriority="high"
        loading="eager"
      />
      <img
        src={mobileBannerImage}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 block h-full w-full object-cover object-[center_top] select-none md:hidden"
        width={1080}
        height={2218}
        fetchPriority="high"
        loading="eager"
      />

      <div className="absolute inset-0 z-10 flex items-start pt-24 pb-10 sm:pt-28 sm:pb-12 md:min-h-0 md:pt-[10%] md:pb-0 lg:min-h-0 lg:pt-[12%] lg:pb-0">
        <div className="container mx-auto grid grid-cols-1 items-start gap-6 px-4 md:px-8 lg:grid-cols-12 lg:px-12">
          <div className="flex flex-col items-start lg:col-span-5 xl:col-span-5">
            <img
              src={secretSantaImg}
              alt="Secret Santa"
              className="mb-2 w-[70%] max-w-[420px] object-contain transition-transform duration-500 hover:scale-102 select-none sm:mb-3 sm:w-[80%] md:mb-4 md:w-[85%] lg:w-full max-[900px]:max-w-[min(100%,18rem)]"
              fetchPriority="high"
              loading="eager"
            />

            <p className="mb-2 text-xs font-semibold tracking-wider text-gold-light uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-sm">
              Ho Ho Ho... Santa's finally here!
            </p>

            <p className="mb-4 max-w-md text-xs leading-relaxed text-cream-text/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:mb-5 sm:text-sm md:mb-7 md:text-base max-[900px]:mb-4 max-[900px]:line-clamp-3">
              This Christmas, don't just write to Santa, talk to him. Share your
              wishes and hear Santa reply in his warm, real-time voice. Better
              yet, he'll remember your name and continue the conversation.
            </p>

            <div className="flex w-full shrink-0 flex-col items-start gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={openSanta}
                className="cursor-pointer rounded-xl border border-[#FFE9A0]/60 bg-metallic-gold px-5 py-3 text-xs font-bold text-[#4b0983] shadow-md transition-all hover:scale-[1.03] active:scale-[0.98] sm:px-6 sm:py-3.5 sm:text-sm md:text-base"
              >
                Santa's Waiting for You
              </button>
            </div>
          </div>

          <div className="pointer-events-none hidden h-10 lg:col-span-7 lg:block xl:col-span-7" />
        </div>
      </div>
    </section>
  );
}
