/**
 * Companion chat host page — Cadbury shell + Dopamint chat widget.
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import CompanionWidget, {
  type CompanionWidgetHandle,
} from '../../components/companion/CompanionWidget';
import {
  getCompanion,
  hasSantaSession,
  SANTA_AVATAR_UUID,
  SANTA_USER_JWT,
  type CompanionId,
} from '../../config/companion';
import logoCad from '../../assets/logocad.svg';

type ChatLocationState = {
  companionName?: string | null;
};

export default function CompanionChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { companionId: rawId } = useParams<{ companionId: string }>();
  const companionId = (
    rawId ? decodeURIComponent(rawId) : 'companion'
  ) as CompanionId;
  const companionName =
    (location.state as ChatLocationState | null)?.companionName ?? null;

  const isSanta = useMemo(() => {
    const flag = searchParams.get('santa');
    const flagged = flag === '1' || flag === 'true';
    return Boolean(
      hasSantaSession() &&
        (flagged || companionId === SANTA_AVATAR_UUID),
    );
  }, [companionId, searchParams]);

  /** Santa uses avatar uuid; picker still passes whatever getAvatarRouteId returns. */
  const embedChatId = isSanta ? SANTA_AVATAR_UUID : companionId;
  const companion = getCompanion(embedChatId);
  const displayName = isSanta
    ? 'Santa'
    : companionName?.trim() || companion.name;

  const widgetRef = useRef<CompanionWidgetHandle>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const goPicker = useCallback(() => navigate('/companions'), [navigate]);

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

  return (
    <div className="min-h-screen bg-[#1F073E] text-cream-text font-sans flex flex-col">
      <header className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-white/10 bg-[#15042A]/80 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          <img src={logoCad} alt="Cadbury" className="h-7 w-auto shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">
              Chat with {displayName}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-cream-text/45">
              Widget · Dopamint companion product
              {isSanta ? ' · santa' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!isSanta && (
            <>
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
                    ? 'Disconnecting…'
                    : 'Connecting…'
                  : isAuthenticated
                    ? 'Disconnect'
                    : 'Connect'}
              </button>
            </>
          )}
          {isSanta && (
            <button
              type="button"
              onClick={goPicker}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-white/15 hover:bg-white/10 cursor-pointer"
            >
              Companions
            </button>
          )}
          <Link
            to="/"
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/10 hover:bg-white/15 cursor-pointer no-underline text-inherit"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto p-3 sm:p-6 flex flex-col">
        <CompanionWidget
          ref={widgetRef}
          companionId={embedChatId}
          santa={isSanta}
          userToken={isSanta ? SANTA_USER_JWT : undefined}
          variant="panel"
          className="flex-1 min-h-[70vh] h-[min(78vh,52rem)]"
          onClose={goPicker}
          onAuthChange={handleAuthChange}
          onLoggedOut={handleLoggedOut}
        />
      </main>
    </div>
  );
}
