import './globals.css';
export const metadata = {
  title: 'Riff — Understand someone before you see them',
  description: 'Riff connects you through questions, voice, and trust — not photos and profiles. Build meaningful connections, find mentors, and grow with people who think like you.',
  keywords: 'social app, networking, friendship, connection, voice messaging, trust, verified, mentorship, personal growth, community',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
