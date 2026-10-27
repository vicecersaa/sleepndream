import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Sora, Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/components/Navbar'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sleep & Dream',
  description: 'Kasur berkualitas untuk tidur yang lebih baik.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
