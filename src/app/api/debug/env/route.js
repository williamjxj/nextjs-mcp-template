// Debug endpoint to check environment variables
// Remove this file after debugging!

export async function GET() {
  // Only allow in development or with special header
  if (process.env.NODE_ENV === "production" && !process.env.DEBUG_MODE) {
    return Response.json({ error: "Not allowed" }, { status: 403 })
  }

  return Response.json({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
    DATABASE_URL_PREVIEW: process.env.DATABASE_URL?.substring(0, 50) + "...",
    AUTH_SECRET_EXISTS: !!process.env.AUTH_SECRET,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GOOGLE_ID_EXISTS: !!process.env.AUTH_GOOGLE_ID,
    timestamp: new Date().toISOString(),
  })
}
