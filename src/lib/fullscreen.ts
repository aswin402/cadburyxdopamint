/** Browser fullscreen helpers (hides tab/address chrome). Requires a user gesture. */

export async function requestAppFullscreen(
  el: Element = document.documentElement,
): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  if (document.fullscreenElement) return true;
  const req =
    el.requestFullscreen?.bind(el) ||
    // @ts-expect-error vendor
    el.webkitRequestFullscreen?.bind(el);
  if (!req) return false;
  try {
    await req();
    return Boolean(document.fullscreenElement);
  } catch {
    return false;
  }
}

export async function exitAppFullscreen(): Promise<void> {
  if (typeof document === 'undefined' || !document.fullscreenElement) return;
  const exit =
    document.exitFullscreen?.bind(document) ||
    // @ts-expect-error vendor
    document.webkitExitFullscreen?.bind(document);
  try {
    await exit?.();
  } catch {
    /* ignore */
  }
}
