import { Inter } from 'next/font/google'
import Footer from './components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Reads',
  description: 'Keep track of your monthly Spotify audiobooks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      <Footer />
        </body>

    </html>
  )
}
