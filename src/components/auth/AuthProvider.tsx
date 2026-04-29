import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  AuthContext,
  type AuthUser,
  type AuthContextValue,
} from "../../context/auth-core";
import { env } from "../../lib/env";
import { authenticateWithGoogle } from "../../lib/api";

type GoogleCredentialPayload = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  exp: number;
};

type StoredSession = {
  user: AuthUser;
  token: string;
  expiresAt: number;
};

const storageKey = "pyqvault.google.session";

function readStoredSession(): StoredSession | null {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed.expiresAt || parsed.expiresAt <= Date.now()) {
      window.localStorage.removeItem(storageKey);
      return null;
    }
    return parsed;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

function getInitialUser() {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed.expiresAt || parsed.expiresAt <= Date.now()) {
      window.localStorage.removeItem(storageKey);
      return null;
    }
    return parsed.user;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginWithGoogleCredential: async (credential: string) => {
        try {
          const authResponse = await authenticateWithGoogle(credential);

          // Store the backend JWT token and user info
          const session = {
            user: authResponse.user,
            token: authResponse.token,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          };

          window.localStorage.setItem(storageKey, JSON.stringify(session));
          setUser(authResponse.user);
        } catch (error) {
          console.error("Authentication error:", error);
          throw error;
        }
      },
      logout: () => {
        window.localStorage.removeItem(storageKey);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
