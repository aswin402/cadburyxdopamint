/**
 * CompanionWidget — loads Dopamint chat inside a host page (iframe).
 *
 * Host stays lightweight: iframe + postMessage only.
 * Companion must allow this host in CSP frame-ancestors.
 *
 * postMessage (from iframe):
 *   { type: 'dopamint:ready' }
 *   { type: 'dopamint:resize', height: number }
 *   { type: 'dopamint:close' }
 *   { type: 'dopamint:back' }
 *   { type: 'dopamint:loggedIn' }
 *   { type: 'dopamint:loggedOut' }
 *
 * postMessage (to iframe):
 *   { type: 'dopamint:focusConnect' }
 *   { type: 'dopamint:logout' }
 */

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  COMPANION_EMBED_MODE,
  COMPANION_ORIGIN,
  WIDGET_DEFAULTS,
  buildCompanionEmbedSrc,
  getCompanionEmbedOrigin,
  type CompanionId,
  type EmbedMode,
} from '../../config/companion';
import {
  exitAppFullscreen,
  requestAppFullscreen,
} from '../../lib/fullscreen';

type WidgetStatus = 'loading' | 'ready' | 'blocked' | 'error';

export interface CompanionWidgetHandle {
  /** Focus the Connect Wallet control inside the Dopamint iframe. */
  connect: () => void;
  /** Ask the Dopamint iframe to disconnect wallet + clear session. */
  disconnect: () => void;
}

interface CompanionWidgetProps {
  companionId: CompanionId;
  mode?: EmbedMode;
  className?: string;
  onClose?: () => void;
  onAuthChange?: (authenticated: boolean) => void;
  onLoggedOut?: () => void;
  /** Fired when chat ends inside the iframe (End Chat). */
  onSessionEnded?: (info: { durationSeconds: number; companionId?: string }) => void;
  variant?: 'panel' | 'card';
  /** Widget theme: `light` | `dark` | `cadbury`. */
  theme?: string;
  /** Host id on the embed URL (`?host=`). */
  host?: string;
  /** Embed JWT — silent auth, no wallet Connect. */
  userToken?: string;
  /** Edge-to-edge immersive iframe. */
  maximized?: boolean;
}

const CompanionWidget = forwardRef<CompanionWidgetHandle, CompanionWidgetProps>(
  function CompanionWidget(
    {
      companionId,
      mode = COMPANION_EMBED_MODE,
      className = '',
      onClose,
      onAuthChange,
      onLoggedOut,
      onSessionEnded,
      variant = 'panel',
      theme = 'cadbury',
      host = 'host',
      userToken,
      maximized = false,
    },
    ref,
  ) {
    const [status, setStatus] = useState<WidgetStatus>('loading');
    const [usePopupUi, setUsePopupUi] = useState(mode === 'popup');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const blockTimer = useRef<number | null>(null);

    const embedOpts = useMemo(
      () => ({
        theme,
        host,
        userToken,
        maximized,
      }),
      [theme, host, userToken, maximized],
    );

    const embedSrc = useMemo(
      () => buildCompanionEmbedSrc(companionId, embedOpts),
      [companionId, embedOpts],
    );
    const directUrl = useMemo(
      () => buildCompanionEmbedSrc(companionId, embedOpts),
      [companionId, embedOpts],
    );

    const postToIframe = useCallback((type: string) => {
      const win = iframeRef.current?.contentWindow;
      if (!win) return;
      win.postMessage({ type }, getCompanionEmbedOrigin());
    }, []);

    const connect = useCallback(() => {
      postToIframe('dopamint:focusConnect');
      iframeRef.current?.focus();
    }, [postToIframe]);

    const disconnect = useCallback(() => {
      postToIframe('dopamint:logout');
    }, [postToIframe]);

    useImperativeHandle(ref, () => ({ connect, disconnect }), [
      connect,
      disconnect,
    ]);

    const openPopup = useCallback(() => {
      const win = window.open(
        directUrl,
        `dopamint-${companionId}`,
        WIDGET_DEFAULTS.popupFeatures,
      );
      if (!win) {
        setStatus('error');
        return;
      }
      setUsePopupUi(true);
      setStatus('ready');
      const tick = window.setInterval(() => {
        if (win.closed) {
          window.clearInterval(tick);
          onClose?.();
        }
      }, 600);
    }, [companionId, directUrl, onClose]);

    useEffect(() => {
      if (mode === 'popup') {
        setUsePopupUi(true);
        setStatus('ready');
        return;
      }

      setUsePopupUi(false);
      setStatus('loading');

      blockTimer.current = window.setTimeout(() => {
        setStatus((s) => (s === 'ready' ? s : 'blocked'));
      }, 10000);

      return () => {
        if (blockTimer.current) window.clearTimeout(blockTimer.current);
      };
    }, [companionId, mode, embedSrc]);

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
        if (
          (type === 'dopamint:resize' || type === 'resize') &&
          typeof data.height === 'number' &&
          iframeRef.current
        ) {
          iframeRef.current.style.height = `${Math.max(320, data.height)}px`;
        }
        if (type === 'dopamint:exitFullscreen') {
          void exitAppFullscreen();
        }
        if (type === 'dopamint:requestFullscreen') {
          void requestAppFullscreen();
        }
        if (type === 'dopamint:close' || type === 'close') {
          void exitAppFullscreen().finally(() => onClose?.());
        }
        if (type === 'dopamint:back' || type === 'back') {
          void exitAppFullscreen().finally(() => onClose?.());
        }
        if (type === 'dopamint:sessionEnded' || type === 'sessionEnded') {
          const durationSeconds = Number(data.durationSeconds) || 0;
          onSessionEnded?.({
            durationSeconds,
            companionId:
              typeof data.companionId === 'string' ? data.companionId : undefined,
          });
        }
        if (type === 'dopamint:loggedIn' || type === 'loggedIn') {
          onAuthChange?.(true);
        }
        if (type === 'dopamint:loggedOut' || type === 'loggedOut') {
          onAuthChange?.(false);
          onLoggedOut?.();
        }
      };

      window.addEventListener('message', onMessage);
      return () => window.removeEventListener('message', onMessage);
    }, [onAuthChange, onClose, onLoggedOut, onSessionEnded]);

    const shell =
      maximized
        ? 'overflow-hidden bg-black'
        : variant === 'card'
          ? 'rounded-3xl border border-white/10 bg-[#1A0734] shadow-2xl overflow-hidden'
          : 'rounded-3xl border border-white/10 bg-[#15042A] overflow-hidden';

    if (usePopupUi) {
      return (
        <div
          className={`${shell} ${className} p-8 flex flex-col items-center text-center gap-5`}
        >
          <div className="w-16 h-16 rounded-full bg-metallic-gold/20 border border-gold-primary/40 flex items-center justify-center text-2xl">
            💬
          </div>
          <div>
            <h3 className="text-xl font-spartan font-bold text-gold-light mb-2">
              Open companion chat
            </h3>
            <p className="text-sm text-cream-text/70 max-w-sm leading-relaxed">
              Popup fallback — prefer the in-page embed when the proxy is running.
            </p>
          </div>
          <button
            type="button"
            onClick={openPopup}
            className="px-6 py-3 bg-metallic-gold text-[#4b0983] font-bold rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Launch {companionId} chat
          </button>
          <button
            type="button"
            onClick={() => {
              setUsePopupUi(false);
              setStatus('loading');
            }}
            className="text-xs text-cream-text/50 underline hover:text-cream-text"
          >
            Try in-page embed again
          </button>
        </div>
      );
    }

    return (
      <div
        className={`${shell} relative flex flex-col ${
          maximized ? 'h-[100dvh] w-full' : 'min-h-[560px]'
        } ${className}`}
      >
        {status === 'loading' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#15042A] px-6 text-center pointer-events-none">
            <div className="w-9 h-9 rounded-full border-2 border-gold-primary/25 border-t-gold-primary animate-spin" />
            <p className="text-sm text-cream-text/70">Opening companion…</p>
          </div>
        )}

        {status === 'blocked' || status === 'error' ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#15042A]/95 px-6 text-center">
            <p className="text-sm text-cream-text/80 max-w-md leading-relaxed">
              Embed did not load. In another terminal run{' '}
              <code className="text-gold-light">
                cd ai_companion/frontend && npm run dev
              </code>{' '}
              (port 5040), then retry — or use popup.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  setStatus('loading');
                  if (iframeRef.current) {
                    iframeRef.current.src = embedSrc;
                  }
                }}
                className="px-5 py-2.5 bg-metallic-gold text-[#4b0983] font-bold rounded-xl text-sm cursor-pointer"
              >
                Retry embed
              </button>
              <button
                type="button"
                onClick={openPopup}
                className="px-5 py-2.5 border border-white/20 text-cream-text font-bold rounded-xl text-sm cursor-pointer"
              >
                Open popup
              </button>
            </div>
          </div>
        ) : null}

        <iframe
          ref={iframeRef}
          key={embedSrc}
          title={`Dopamint companion — ${companionId}`}
          src={embedSrc}
          className={
            maximized
              ? 'h-full w-full flex-1 min-h-0 border-0 bg-black'
              : 'w-full flex-1 min-h-[560px] border-0 bg-[#111827]'
          }
          allow="microphone; camera; fullscreen; clipboard-read; clipboard-write"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => {
            setStatus('ready');
            if (blockTimer.current) window.clearTimeout(blockTimer.current);
          }}
          onError={() => setStatus('blocked')}
        />
      </div>
    );
  },
);

export default CompanionWidget;
