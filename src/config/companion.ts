/**
 * Dopamint AI Companion widget config (Cadbury host product only).
 *
 * Cadbury stays lightweight: iframe shells + postMessage only.
 * Catalog cards / avatars API live in Dopamint `/widget/picker`.
 */

export type CompanionId = string;

export type EmbedMode = "iframe" | "popup" | "auto";

export interface CompanionProfile {
  id: CompanionId;
  name: string;
  tagline?: string;
  accent?: string;
}

/** Full Dopamint companion app (popup / deep links). */
export const COMPANION_ORIGIN =
  (import.meta.env.VITE_COMPANION_EMBED_ORIGIN as string | undefined)?.replace(
    /\/$/,
    "",
  ) || "http://localhost:5040";

export const COMPANION_EMBED_MODE: EmbedMode =
  (import.meta.env.VITE_COMPANION_EMBED as EmbedMode | undefined) || "iframe";

/**
 * Santa studio JWT — passed into the widget for normal session flow.
 * No wallet Connect UI. Env: VITE_SANTA_USER_ID=<jwt>
 */
export const SANTA_USER_JWT = String(
  import.meta.env.VITE_SANTA_USER_ID || "",
).trim();

/**
 * Avatar uuid from /api/avatars (e.g. Aiko).
 * Cadbury route + iframe ?chat=<uuid>
 */
export const SANTA_AVATAR_UUID: CompanionId = String(
  import.meta.env.VITE_SANTA_AVATAR_ID || "",
).trim();

/** @deprecated alias — same as SANTA_AVATAR_UUID */
export const SANTA_AVATAR_ID = SANTA_AVATAR_UUID;

export function hasSantaSession() {
  return Boolean(SANTA_USER_JWT && SANTA_AVATAR_UUID);
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .trim();
}

/** Lightweight local label for host chrome (no catalog API on Cadbury). */
export function getCompanion(id: string | null | undefined): CompanionProfile {
  const safeId = String(id || "companion").trim() || "companion";
  const short =
    safeId.length > 12 && safeId.includes("-")
      ? `Companion`
      : titleCase(safeId);
  return {
    id: safeId,
    name: short,
    tagline: "Dopamint AI companion",
    accent: "#C9A84C",
  };
}

/**
 * Origin loaded inside the Cadbury iframe.
 * Defaults to local ai_companion (port 5040) — not Cadbury's 5173.
 */
export function getCompanionEmbedOrigin() {
  if (import.meta.env.VITE_COMPANION_EMBED_ORIGIN) {
    return String(import.meta.env.VITE_COMPANION_EMBED_ORIGIN).replace(
      /\/$/,
      "",
    );
  }
  return COMPANION_ORIGIN;
}

function applyChatParams(
  url: URL,
  companionId: CompanionId,
  opts?: { theme?: string },
) {
  url.searchParams.set("chat", companionId);
  if (opts?.theme) url.searchParams.set("theme", opts.theme);
  return url.toString();
}

/** Direct Dopamint URL (full page / popup fallback) */
export function buildCompanionChatUrl(
  companionId: CompanionId,
  opts?: { theme?: string },
) {
  return applyChatParams(
    new URL(`${COMPANION_ORIGIN}/companion`),
    companionId,
    opts,
  );
}

/**
 * In-page chat widget iframe URL.
 *
 * Silent auth (any host): pass `userToken` → `?token=<jwt>` (no wallet UI).
 * Full-bleed chat: pass `maximized: true` → `?max=1`.
 */
export function buildCompanionEmbedSrc(
  companionId: CompanionId,
  opts?: {
    theme?: string;
    host?: string;
    /** Embed JWT — cookie / Bearer for session APIs; skips wallet Connect. */
    userToken?: string;
    /** Start chat UI edge-to-edge (immersive). */
    maximized?: boolean;
  },
) {
  const url = new URL(`${getCompanionEmbedOrigin()}/widget/companion`);
  url.searchParams.set("host", opts?.host || "host");
  applyChatParams(url, companionId, { theme: opts?.theme });
  const token = String(opts?.userToken || "").trim();
  if (token) url.searchParams.set("token", token);
  if (opts?.maximized) url.searchParams.set("max", "1");
  return url.toString();
}

/** Companion catalog picker widget — host only needs a thin iframe shell. */
export function buildCompanionPickerEmbedSrc(opts?: {
  theme?: string;
  host?: string;
}) {
  const url = new URL(`${getCompanionEmbedOrigin()}/widget/picker`);
  url.searchParams.set("host", opts?.host || "host");
  if (opts?.theme) url.searchParams.set("theme", opts.theme);
  return url.toString();
}

/**
 * Top-level Dopamint Google sign-in URL (optional host helper).
 * Prefer in-iframe Connect on prod — OAuth popup path is not required for Santa.
 */
export function buildCompanionSignInUrl() {
  return `${getCompanionEmbedOrigin()}/`;
}

export const WIDGET_DEFAULTS = {
  width: 400,
  height: 680,
  popupFeatures:
    "width=420,height=720,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes",
} as const;
