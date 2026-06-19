import PageShell from '../components/PageShell';
export const metadata = { title: 'Safety — Riff', description: 'Three-tier trust system, ID verification, AI moderation, and crisis support. Safety is not a feature — it is the foundation.' };
export default function Safety() {
  return (
    <PageShell title="Safety at Riff" subtitle="TRUST & SAFETY" accent="#22C55E">
      <p style={{ marginBottom: 16, fontSize: 17 }}>Safety is not a feature we bolted on. It is the foundation everything else is built on. Every design decision — the staged reveal, the mutual scoring, the trust badges — exists because safety came first.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Three-tier trust system</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: '#EF4444' }}>Red badge</strong> — unverified. Limited features, visible to matches as unverified.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: '#F59E0B' }}>Yellow badge</strong> — selfie verified. Live selfie matched against a human face, confirming you are a real person. Free for everyone.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: '#22C55E' }}>Green badge</strong> — fully verified. Government ID checked via Veriff, phone number confirmed via SMS. The highest level of trust.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>AI-powered moderation</h2>
      <p style={{ marginBottom: 16 }}>Every message passes through real-time safety scanning. Harassment, explicit content, and predatory behaviour are caught instantly. The system flags, warns, or blocks depending on severity.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Crisis support</h2>
      <p style={{ marginBottom: 16 }}>If someone mentions self-harm or suicide, Riff responds with genuine care and connects them to real support — Samaritans (116 123), available 24/7, free. We never brush past it.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>No contact sharing</h2>
      <p style={{ marginBottom: 16 }}>Phone numbers, email addresses, and social media handles cannot be shared through Riff messaging. All communication stays on-platform until both parties are ready.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Report and block</h2>
      <p style={{ marginBottom: 16 }}>Every conversation has a one-tap report button. Reports are reviewed within 24 hours. Blocked users cannot contact you, see your profile, or know they have been blocked.</p>
    </PageShell>
  );
}
