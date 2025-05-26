import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MeetingGPT - AI-powered Meeting Assistant',
  description: 'MeetingGPT is an innovative desktop application that processes audio content in real-time, providing customized intelligent responses.',
  metadataBase: new URL('https://20280101.xyz'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://sandbox-cdn.paddle.com;
          connect-src 'self' https://*.paddle.com https://*.20280101.xyz http://127.0.0.1:8082 http://localhost:8082;
          frame-src 'self' https://*.paddle.com;
          style-src 'self' 'unsafe-inline' https://cdn.paddle.com https://sandbox-cdn.paddle.com;
          img-src 'self' data: https://*.paddle.com https://*.paddlecdn.com;
        " />
      </head>
      <body className="min-h-screen antialiased bg-white dark:bg-gray-900 text-black dark:text-white" suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
