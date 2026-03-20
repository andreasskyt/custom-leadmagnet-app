import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Agency Operations Audit — SKYT Systems',
  description: 'Discover your agency\'s operational bottlenecks. 20 questions, 4 pillars, a personalised AI report.',
  icons: {
    icon: '/favicons/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/favicon-96x96.png" />
        {/* Meta Pixel — add your pixel ID here */}
        {/* <script dangerouslySetInnerHTML={{ __html: `...fbq snippet...` }} /> */}
      </head>
      <body className={`${poppins.className} min-h-screen overflow-y-auto bg-[#2b3327]`}>
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-bl from-[#2b3327]/100 via-[#2f3a2c]/30 to-[#ffffff]/10 animate-gradient-5"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/90 via-[#2f3a2c]/80 to-[#000000]/80 animate-gradient-6 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ffffff]/70 via-[#000000]/100 to-[#2f3a2c]/80 animate-gradient-7"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f18]/0 via-[#2f3a2c]/25 to-transparent animate-gradient-8"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-[#2b3327]/20 to-[#1a1f18]/0 animate-gradient-9"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
