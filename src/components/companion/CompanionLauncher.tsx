/**
 * Floating launcher — opens Santa chat (same flow as hero CTA).
 */

import { useNavigate } from 'react-router-dom';
import {
  hasSantaSession,
  SANTA_AVATAR_UUID,
} from '../../config/companion';
import { requestAppFullscreen } from '../../lib/fullscreen';

export default function CompanionLauncher() {
  const navigate = useNavigate();

  const openSantaChat = async () => {
    const href = hasSantaSession()
      ? `/companions/${encodeURIComponent(SANTA_AVATAR_UUID)}?santa=1`
      : '/companions';
    await requestAppFullscreen();
    navigate(href);
  };

  return (
    <button
      type="button"
      onClick={openSantaChat}
      className="fixed bottom-5 right-4 z-[60] flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-metallic-gold text-[#4b0983] font-bold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
      aria-label="Chat with Santa"
    >
      <span className="w-9 h-9 rounded-full bg-[#4b0983] text-gold-light flex items-center justify-center text-sm font-spartan">
        S
      </span>
      <span className="text-sm">Chat with Santa</span>
    </button>
  );
}
