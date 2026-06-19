import PageShell from '../components/PageShell';
export const metadata = { title: 'Cookie Policy — Riff', description: 'How Riff uses cookies and similar technologies.' };
export default function CookiePolicy() {
  return (
    <PageShell title="Cookie policy" subtitle="LEGAL" accent="#8B5CF6">
      <p style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)' }}>Last updated: June 2026</p>
      <p style={{ marginBottom: 16 }}>Riff uses a minimal number of cookies. We do not use advertising cookies or sell cookie data to third parties.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>What cookies we use</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Essential cookies.</strong> Authentication tokens that keep you logged in. Session identifiers. These are strictly necessary for the app to function and cannot be disabled.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Analytics cookies.</strong> We use privacy-respecting analytics to understand how people use Riff (page views, feature usage, error rates). No personal data is attached to analytics events. No cross-site tracking.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>What we do not use</h2>
      <p style={{ marginBottom: 16 }}>No advertising cookies. No social media tracking pixels. No cross-site tracking. No fingerprinting. No selling cookie data.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Managing cookies</h2>
      <p style={{ marginBottom: 16 }}>You can clear cookies at any time through your browser settings. Clearing essential cookies will log you out. For more information, contact privacy@riff-app.co.uk.</p>
    </PageShell>
  );
}
