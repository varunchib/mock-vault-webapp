import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext, type AuthContextValue } from "../../context/auth-core";
import {
  APIError,
  authenticateWithGoogle,
  fetchCurrentUser,
  logoutAuthSession,
  refreshAuthSession,
} from "../../lib/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const response = await fetchCurrentUser();
        if (!cancelled) setUser(response.user);
        return;
      } catch (error) {
        if (!(error instanceof APIError) || error.status !== 401) {
          if (!cancelled) setUser(null);
          return;
        }
      }

      try {
        const refreshed = await refreshAuthSession();
        if (!cancelled) setUser(refreshed.user);
      } catch {
        if (!cancelled) setUser(null);
      }
    };

    void bootstrap().finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    loginWithGoogleCredential: async (credential: string) => {
      const response = await authenticateWithGoogle(credential);
      setUser(response.user);
    },
    logout: async () => {
      try {
        await logoutAuthSession();
      } finally {
        setUser(null);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
