import "./globals.css"

export const metadata = {
  title: "Nextjs + MCP + Auth",
  description: "create-next-app, mcp, auth, and more",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
