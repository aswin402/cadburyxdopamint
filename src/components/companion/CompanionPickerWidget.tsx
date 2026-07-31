/**
 * CompanionPickerWidget — embeds Dopamint's catalog picker iframe.
 * Cadbury only hosts chrome + listens for dopamint:select.
 *
 * Uses a fixed viewport panel with internal iframe scrolling (no live
 * height-resize loop — that was causing sticky scroll).
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  COMPANION_ORIGIN,
  buildCompanionPickerEmbedSrc,
  getCompanionEmbedOrigin,
  type CompanionId,
} from '../../config/companion';

type WidgetStatus = 'loading' | 'ready' | 'blocked' | 'error';

interface CompanionPickerWidgetProps {
  theme?: string;
  host?: string;
  className?: string;
  onSelect: (id: CompanionId, name?: string) => void;
}

export default function CompanionPickerWidget({
  theme = 'cadbury',
  host = 'cadbury',
  className = '',
  onSelect,
}: CompanionPickerWidgetProps) {
  const [status, setStatus] = useState<WidgetStatus>('loading');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const blockTimer = useRef<number | null>(null);

  const embedSrc = useMemo(
    () => buildCompanionPickerEmbedSrc({ theme, host }),
    [theme, host],
  );

  useEffect(() => {
    setStatus('loading');
    blockTimer.current = window.setTimeout(() => {
      setStatus((s) => (s === 'ready' ? s : 'blocked'));
    }, 10000);
    return () => {
      if (blockTimer.current) window.clearTimeout(blockTimer.current);
    };
  }, [embedSrc]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const embedOrigin = getCompanionEmbedOrigin();
      const allowed =
        event.origin === COMPANION_ORIGIN ||
        event.origin === embedOrigin ||
        event.origin === window.location.origin;
      if (!allowed) return;

      const data = event.data;
      if (!data || typeof data !== 'object') return;
      const type = String(data.type || '');

      if (type === 'dopamint:ready' || type === 'ready') {
        setStatus('ready');
        if (blockTimer.current) window.clearTimeout(blockTimer.current);
      }

      // Ignore dopamint:resize for picker — fixed panel + internal scroll.

      if (type === 'dopamint:select' || type === 'select') {
        const companionId = String(data.companionId || data.id || '').trim();
        const name = String(data.name || '').trim() || undefined;
        if (companionId) onSelect(companionId, name);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onSelect]);

  return (
    <div
      className={`relative w-full h-full min-h-0 overflow-hidden rounded-3xl border border-white/10 bg-[#15042A] ${className}`}
    >
      {status === 'loading' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#15042A]/90 px-6 text-center pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-gold-primary/25 border-t-gold-primary animate-spin" />
          <p className="text-sm text-cream-text/70">Loading companions…</p>
        </div>
      )}

      {status === 'blocked' || status === 'error' ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#15042A]/95 px-6 text-center">
          <p className="text-sm text-cream-text/80 max-w-md leading-relaxed">
            Picker widget did not load. Run Dopamint on port 3001, then retry.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('loading');
              if (iframeRef.current) iframeRef.current.src = embedSrc;
            }}
            className="px-5 py-2.5 bg-metallic-gold text-[#4b0983] font-bold rounded-xl text-sm cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : null}

      <iframe
        ref={iframeRef}
        key={embedSrc}
        title="Dopamint companion picker"
        src={embedSrc}
        className="block h-full w-full border-0 bg-transparent"
        allow="clipboard-read; clipboard-write"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          setStatus('ready');
          if (blockTimer.current) window.clearTimeout(blockTimer.current);
        }}
        onError={() => setStatus('blocked')}
      />
    </div>
  );
}
