import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'App Showcase',
  description: 'Your All-in-One App Solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
