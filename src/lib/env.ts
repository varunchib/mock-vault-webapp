export const env = {
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  apiBaseUrl:     process.env.NEXT_PUBLIC_API_BASE_URL,
  adminEmails:
    (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? '')
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean),
}
