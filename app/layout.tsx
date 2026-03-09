import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Birthday RSVP',
  description: 'RSVP for the birthday party',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
        {children}
      </body>
    </html>
  )
}
