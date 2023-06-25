import LoggedInUserProvider from './context/store';
import Header from './components/Header';
import './globals.css'
import { Inter } from 'next/font/google';

const font = Inter({
  weight: ['400', '700'],
  subsets: ['latin']
});

export const metadata = {
  title: 'Responsive Next.js app',
  description: 'Next13 and Tailwind CSS app. Powered by Vercel.',
}

export default function RootLayout({children}: { children: React.ReactNode}) {

  return (
    <html lang="en">
      <body className={font.className}>
        <LoggedInUserProvider>
          <Header/>
            <main>
              {children}
            </main>
          </LoggedInUserProvider>
        </body>
    </html>
  )
}