import { Poppins } from 'next/font/google'

const font = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Simple Todo App',
  description: 'A simple todo app by Eudin',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
