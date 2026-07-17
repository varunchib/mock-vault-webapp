// Lightweight, synchronous hint of whether the user was signed in last time.
// Written on login, cleared on verified logout (see AuthProvider). It only
// influences which LAYOUT to show optimistically (public chrome vs app shell)
// so returning users don't flicker on load — it never grants access; real
// gating always runs on the verified `user`.
export const SESSION_HINT_KEY = "mv.session";

export function hasSessionHint(): boolean {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(SESSION_HINT_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSessionHint(on: boolean): void {
  try {
    if (on) window.localStorage.setItem(SESSION_HINT_KEY, "1");
    else window.localStorage.removeItem(SESSION_HINT_KEY);
  } catch {
    /* storage unavailable — the hint is only an optimisation */
  }
}
