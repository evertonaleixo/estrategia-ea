import './globals.css'
import Head from 'next/head';

import { Inter } from 'next/font/google'
import Header from './header'
import Footer from './footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Emerson Consultorias',
  description: 'Consultoria Financeiras',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className } >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
