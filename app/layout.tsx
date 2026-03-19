import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Rachel's Birthday RSVP",
  description: "RSVP for Rachel's birthday party",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎉</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-black" style={{ fontFamily: "'Exo 2', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
