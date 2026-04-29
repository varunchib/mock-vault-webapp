export const env = {
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string | undefined,
  adminEmails:
    (import.meta.env.VITE_ADMIN_EMAILS as string | undefined)
      ?.split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean) ?? [],
};
