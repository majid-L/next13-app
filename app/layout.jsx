import LoggedInUserContext from './context/store';
import Header from './components/Header';
import './globals.css'
import { Inter } from 'next/font/google';

const font = Inter({
  weight: ['400', '700'], // or we can provide a single value
  subsets: ['latin']
});

// These are the global meta tags
export const metadata = {
  title: 'My first Next app!',
  description: 'Yayayayaya.',
}

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <body className={font.className}>
        <LoggedInUserContext>
          <Header/>
            <main>
              {children}
            </main>
          </LoggedInUserContext>
        </body>
    </html>
  )
}

/*
Root layout wraps all pages with layout. E.g. nav or footer in all pages.
Custom layout (defined separately in each subfolder) applies it to that specific page

Global context provider allows us to access context from within our pages
*/