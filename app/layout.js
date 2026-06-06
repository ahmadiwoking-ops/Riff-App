import './globals.css';

export const metadata = {
  title: 'Riff — Understand someone before you see them',
  description: 'Riff matches you through questions, voice, and trust — not photos and swipes. Find deep connections and real friendships with people who think like you.',
  keywords: 'social app, dating, friendship, connection, voice messaging, trust, verified, no swiping',
  openGraph: {
    title: 'Riff — Understand someone before you see them',
    description: 'Find deep connections and real friendships through questions, voice, and trust.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Riff',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riff — Understand someone before you see them',
    description: 'Find deep connections and real friendships through questions, voice, and trust.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
