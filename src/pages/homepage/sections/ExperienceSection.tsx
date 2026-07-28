import keyImg from "../../../assets/key.webp";
import chatImg from "../../../assets/chat.webp";
import codeImg from "../../../assets/code.webp";
import santaRidingImg from "../../../assets/santa_riding.webp";
import chiminiImg from "../../../assets/chimini.webp";
import giftImg from "../../../assets/gift.webp";
import mobileScreenImg from "../../../assets/Mobile_Screen.webp";

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-16 md:py-24 bg-[#f5efe6] relative overflow-hidden text-[#2B0E54]">
      {/* Decorative Top Stars & Background elements */}
      <div className="absolute top-10 left-12 text-[#E6CE8A]/50 text-xl select-none">★</div>
      <div className="absolute top-24 right-20 text-[#E6CE8A]/30 text-2xl select-none">★</div>
      <div className="absolute top-1/3 left-10 text-[#E6CE8A]/30 text-xl select-none">★</div>
      <div className="absolute bottom-1/3 right-12 text-[#E6CE8A]/50 text-xl select-none">★</div>
      <div className="absolute bottom-12 left-24 text-[#E6CE8A]/30 text-2xl select-none">★</div>

      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-spartan font-bold text-[#2B0E54] tracking-wide">
            Your Christmas Adventure Starts Here
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center items-center w-full">
            <div className="relative flex flex-col gap-8 sm:gap-12 lg:gap-0 w-full max-w-xl h-auto lg:h-[650px] lg:justify-between">
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
                    loading="lazy"
                  />
                </div>

                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#2B0E54]/5 shadow-[0_10px_35px_rgba(43,14,84,0.05)] flex-grow flex items-center justify-between gap-4 text-left relative overflow-visible">
                  {/* Number Badge inside Card */}
                  <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-[#2B0E54] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                    01
                  </div>
                  <div className="flex-grow pr-2">
                    <h3 className="text-lg sm:text-xl font-spartan font-extrabold text-[#2B0E54] mb-1.5">01 · Step Into Santa's World</h3>
                    <p className="text-[#2B0E54]/75 text-xs sm:text-sm leading-relaxed">
                      Tell Santa your name and email. Santa never forgets the children on his Nice List.
                    </p>
                  </div>
                  {/* Santa Riding Sleigh Embedded on the Right End of Card 1 */}
                  <div className="w-20 sm:w-24 shrink-0 select-none pointer-events-none">
                    <img
                      src={santaRidingImg}
                      alt="Santa Riding Sleigh"
                      className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                      loading="lazy"
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
                    loading="lazy"
                  />
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#2B0E54]/5 shadow-[0_10px_35px_rgba(43,14,84,0.05)] flex-grow flex items-center justify-between gap-4 text-left relative overflow-visible">
                  {/* Number Badge inside Card */}
                  <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-[#2B0E54] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                    02
                  </div>
                  <div className="flex-grow pr-2">
                    <h3 className="text-lg sm:text-xl font-spartan font-extrabold text-[#2B0E54] mb-1.5">02 · Make a Wish</h3>
                    <p className="text-[#2B0E54]/75 text-xs sm:text-sm leading-relaxed">
                      Share your Christmas wish, your favourite Cadbury chocolate or ask Santa anything.
                    </p>
                  </div>
                  {/* Chimney Embedded on the Right End of Card 2 */}
                  <div className="w-12 sm:w-16 shrink-0 select-none pointer-events-none">
                    <img
                      src={chiminiImg}
                      alt="Chimney decoration"
                      className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                      loading="lazy"
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
                    loading="lazy"
                  />
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#2B0E54]/5 shadow-[0_10px_35px_rgba(43,14,84,0.05)] flex-grow flex items-center justify-between gap-4 text-left relative overflow-visible">
                  {/* Number Badge inside Card */}
                  <div className="absolute -top-4 -left-4 w-9 h-9 rounded-full bg-[#2B0E54] border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
                    03
                  </div>
                  <div className="flex-grow pr-2">
                    <h3 className="text-lg sm:text-xl font-spartan font-extrabold text-[#2B0E54] mb-1.5">03 · Claim Your Secret Santa Gift</h3>
                    <p className="text-[#2B0E54]/75 text-xs sm:text-sm leading-relaxed">
                      Complete your conversation to receive a unique code.
                    </p>
                  </div>
                  {/* Gift Box Embedded on the Right End of Card 3 */}
                  <div className="w-12 sm:w-16 shrink-0 select-none pointer-events-none">
                    <img
                      src={giftImg}
                      alt="Purple Gift box"
                      className="w-full h-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)]"
                      loading="lazy"
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
              className="w-full max-w-[92%] sm:max-w-[450px] lg:max-w-none h-auto lg:h-[730px] lg:w-auto object-contain drop-shadow-2xl select-none pointer-events-none hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>

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
  );
}
