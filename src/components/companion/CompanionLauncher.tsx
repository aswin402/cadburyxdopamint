/**
 * Floating launcher — Intercom-style bubble that opens the companion widget.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanionWidget from './CompanionWidget';
import { getCompanion, type CompanionId } from '../../config/companion';

interface CompanionLauncherProps {
  companionId?: CompanionId;
}

export default function CompanionLauncher({
  companionId = 'serena',
}: CompanionLauncherProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const companion = getCompanion(companionId);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-[60] w-[min(100vw-2rem,400px)] shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 rounded-t-3xl bg-[#2B0E54] border border-b-0 border-white/10">
            <div className="text-left">
              <p className="text-sm font-bold text-gold-light">{companion.name}</p>
              <p className="text-[10px] text-cream-text/50 uppercase tracking-wider">
                Dopamint companion
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(`/companions/${encodeURIComponent(companion.id)}`)}
                className="text-[10px] font-bold uppercase tracking-wide text-cream-text/60 hover:text-white px-2 py-1"
              >
                Expand
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white text-sm hover:bg-white/20"
                aria-label="Close widget"
              >
                ✕
              </button>
            </div>
          </div>
          <CompanionWidget
            companionId={companion.id}
            mode="iframe"
            variant="card"
            className="rounded-t-none min-h-[520px]"
            onClose={() => setOpen(false)}
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-[60] flex items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-metallic-gold text-[#4b0983] font-bold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label={open ? 'Close companion chat' : 'Open companion chat'}
      >
        <span className="w-9 h-9 rounded-full bg-[#4b0983] text-gold-light flex items-center justify-center text-sm font-spartan">
          {companion.name.slice(0, 1)}
        </span>
        <span className="text-sm">{open ? 'Close chat' : `Chat with ${companion.name}`}</span>
      </button>
    </>
  );
}
