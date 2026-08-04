/**
 * Companion chat host page — Cadbury shell + Dopamint chat widget.
 * After End Chat (≥ 5 min), shows Santa's gift card on the right.
 */

import { useCallback, useMemo, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Check, Copy } from "lucide-react";
import CompanionWidget, {
  type CompanionWidgetHandle,
} from "../../components/companion/CompanionWidget";
import {
  hasSantaSession,
  SANTA_AVATAR_UUID,
  SANTA_USER_JWT,
  type CompanionId,
} from "../../config/companion";
import { exitAppFullscreen } from "../../lib/fullscreen";
import logoCad from "../../assets/logocad.svg";

const GIFT_ELIGIBLE_SECONDS = 5; // TODO: restore to 5 * 60 for production

function makeGiftCode() {
  const chunk = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X");
  return `SANTA-${chunk()}-${chunk()}`;
}

export default function CompanionChatPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { companionId: rawId } = useParams<{ companionId: string }>();
  const companionId = (
    rawId ? decodeURIComponent(rawId) : "companion"
  ) as CompanionId;

  const isSanta = useMemo(() => {
    const flag = searchParams.get("santa");
    const flagged = flag === "1" || flag === "true";
    return Boolean(
      hasSantaSession() && (flagged || companionId === SANTA_AVATAR_UUID),
    );
  }, [companionId, searchParams]);

  const embedChatId = isSanta ? SANTA_AVATAR_UUID : companionId;

  const widgetRef = useRef<CompanionWidgetHandle>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [giftCode, setGiftCode] = useState("");
  const [copied, setCopied] = useState(false);

  const goPicker = useCallback(() => navigate("/companions"), [navigate]);

  const leaveSanta = useCallback(async () => {
    await exitAppFullscreen();
    navigate("/");
  }, [navigate]);

  const handleAuthChange = useCallback((authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    setIsBusy(false);
  }, []);

  const handleLoggedOut = useCallback(() => {
    setIsAuthenticated(false);
    setIsBusy(false);
  }, []);

  const handleAuthAction = useCallback(() => {
    if (isAuthenticated) {
      setIsBusy(true);
      widgetRef.current?.disconnect();
      window.setTimeout(() => setIsBusy(false), 4000);
    } else {
      widgetRef.current?.connect();
    }
  }, [isAuthenticated]);

  const handleSessionEnded = useCallback(
    async ({ durationSeconds }: { durationSeconds: number }) => {
      if (!isSanta) return;
      if (durationSeconds < GIFT_ELIGIBLE_SECONDS) return;

      await exitAppFullscreen();
      setGiftCode((prev) => prev || makeGiftCode());
      setShowGiftCard(true);
    },
    [isSanta],
  );

  const copyGiftCode = useCallback(async () => {
    if (!giftCode) return;
    try {
      await navigator.clipboard.writeText(giftCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [giftCode]);

  const showGiftLayout = isSanta && showGiftCard;

  return (
    <div className="relative min-h-screen bg-[#1F073E] text-cream-text font-sans flex flex-col">
      {!isSanta && (
        <header className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-white/10 bg-[#15042A]/80 backdrop-blur">
          <Link
            to="/"
            className="flex items-center gap-3 min-w-0 cursor-pointer no-underline"
          >
            <img src={logoCad} alt="Cadbury" className="h-7 w-auto shrink-0" />
          </Link>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={goPicker}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-white/15 hover:bg-white/10 cursor-pointer"
            >
              Switch
            </button>
            <button
              type="button"
              onClick={handleAuthAction}
              disabled={isBusy}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gold-primary/40 text-gold-light hover:bg-gold-primary/10 disabled:opacity-60 cursor-pointer"
            >
              {isBusy
                ? isAuthenticated
                  ? "Disconnecting…"
                  : "Connecting…"
                : isAuthenticated
                  ? "Disconnect"
                  : "Connect"}
            </button>
            <Link
              to="/"
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/10 hover:bg-white/15 cursor-pointer no-underline text-inherit"
            >
              Home
            </Link>
          </div>
        </header>
      )}

      <main
        className={
          showGiftLayout
            ? "flex-1 w-full min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_min(22rem,36%)] gap-0 lg:gap-4 p-0 lg:p-4"
            : isSanta
              ? "flex-1 w-full min-h-0 flex flex-col p-0"
              : "flex-1 w-full max-w-3xl mx-auto p-3 sm:p-6 flex flex-col"
        }
      >
        <div
          className={
            showGiftLayout
              ? "min-h-[70vh] lg:min-h-[calc(100dvh-2rem)] flex flex-col"
              : "contents"
          }
        >
          <CompanionWidget
            ref={widgetRef}
            companionId={embedChatId}
            theme="cadbury"
            host="cadbury"
            userToken={isSanta ? SANTA_USER_JWT : undefined}
            maximized={isSanta}
            variant="panel"
            className={
              showGiftLayout
                ? "flex-1 !min-h-[70vh] !h-full max-h-[calc(100dvh-2rem)] rounded-none lg:rounded-2xl border-0 lg:border lg:border-white/10"
                : isSanta
                  ? "min-h-[100dvh] h-[100dvh] w-full rounded-none border-0"
                  : "flex-1 min-h-[70vh] h-[min(78vh,52rem)]"
            }
            onClose={isSanta ? leaveSanta : goPicker}
            onAuthChange={handleAuthChange}
            onLoggedOut={handleLoggedOut}
            onSessionEnded={handleSessionEnded}
          />
        </div>

        {showGiftLayout && (
          <aside className="flex flex-col justify-center gap-4 border-t border-white/10 bg-[#15042A] px-5 py-8 lg:border-t-0 lg:border-l lg:rounded-2xl lg:px-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-primary/80 mb-2">
                Reward unlocked
              </p>
              <h2 className="text-2xl font-spartan font-bold text-gold-light">
                Santa&apos;s Gift Card
              </h2>
              <p className="mt-2 text-sm text-cream-text/70 leading-relaxed">
                Thanks for chatting with Santa.
              </p>
              <p className="mt-1 text-sm text-cream-text/70 leading-relaxed">
                Copy your code below.
              </p>
            </div>

            <div className="flex items-stretch gap-2">
              <input
                type="text"
                readOnly
                value={giftCode}
                aria-label="Santa gift card code"
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-[#1F073E] px-3 py-3 font-mono text-sm tracking-wide text-cream-text outline-none"
              />
              <button
                type="button"
                onClick={copyGiftCode}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-gold-primary/40 bg-metallic-gold px-3 py-3 text-sm font-bold text-[#4b0983] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
