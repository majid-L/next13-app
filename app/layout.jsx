import LoggedInUserProvider from './context/store';
import Header from './components/Header';
import './globals.css'
import { Inter } from 'next/font/google';

const font = Inter({
  weight: ['400', '700'],
  subsets: ['latin']
});

export const metadata = {
  title: 'My first Next app!',
  description: 'Yayayayaya.',
}

export default function RootLayout({children}) {

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