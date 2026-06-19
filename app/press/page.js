import PageShell from '../components/PageShell';
export const metadata = { title: 'Press — Riff', description: 'Press resources, media enquiries, and brand assets for Riff.' };
export default function Press() {
  return (
    <PageShell title="Press" subtitle="MEDIA" accent="#22D3EE">
      <p style={{ marginBottom: 16, fontSize: 17 }}>For press enquiries, interviews, or brand assets, get in touch at the address below.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Contact</h2>
      <p style={{ marginBottom: 16 }}>Email <strong style={{ color: 'var(--cyan)' }}>press@riff-app.co.uk</strong> for media enquiries. We typically respond within 24 hours.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>About Riff</h2>
      <p style={{ marginBottom: 16 }}>Riff is a social connection app that matches people through questions, voice, and trust — not photos and swiping. Users understand each other before they see each other, progressing through five stages of conversation before a mutual photo reveal.</p>
      <p style={{ marginBottom: 16 }}>Founded in 2026 in Woking, England. Available on iOS and Android.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Key facts</h2>
      <p style={{ marginBottom: 16 }}>Riff uses a 25-question compatibility algorithm, three-tier identity verification (selfie, government ID, phone), real-time AI safety moderation, and a simultaneous photo reveal system. The app supports two connection modes: Deep Connection (1:1) and Friend Circle (groups of four).</p>
    </PageShell>
  );
}
