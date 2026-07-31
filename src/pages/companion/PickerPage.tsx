/**
 * Companion picker host page — Cadbury chrome only.
 * Catalog cards + API live in the Dopamint /widget/picker embed.
 */

import { Link, useNavigate } from 'react-router-dom';
import CompanionPickerWidget from '../../components/companion/CompanionPickerWidget';
import type { CompanionId } from '../../config/companion';
import logoCad from '../../assets/logocad.svg';

export default function CompanionPickerPage() {
  const navigate = useNavigate();

  const handleSelect = (id: CompanionId, name?: string) => {
    navigate(`/companions/${encodeURIComponent(id)}`, {
      state: name ? { companionName: name } : undefined,
    });
  };

  return (
    <div className="h-[100dvh] bg-[#1F073E] text-cream-text font-sans relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,168,76,0.12)_0%,_transparent_55%)] pointer-events-none" />

      <header className="relative z-10 flex shrink-0 items-center justify-between px-4 sm:px-8 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer bg-transparent border-0 p-0 no-underline"
        >
          <img src={logoCad} alt="Cadbury" className="h-8 w-auto" />
          <span className="text-xs uppercase tracking-widest text-gold-light/80 font-bold">
            × Dopamint Companions
          </span>
        </Link>
        <Link
          to="/"
          className="text-sm text-cream-text/60 hover:text-white cursor-pointer no-underline"
        >
          ← Back home
        </Link>
      </header>

      <main className="relative z-10 flex-1 min-h-0 w-full max-w-[90rem] mx-auto px-3 sm:px-6 pb-4">
        <CompanionPickerWidget
          theme="cadbury"
          host="cadbury"
          className="h-full"
          onSelect={handleSelect}
        />
      </main>
    </div>
  );
}
