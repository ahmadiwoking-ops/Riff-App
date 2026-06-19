import PageShell from '../components/PageShell';
export const metadata = { title: 'Blog — Riff', description: 'Thoughts on connection, trust, and building a better way to meet people.' };
export default function Blog() {
  return (
    <PageShell title="Blog" subtitle="THOUGHTS" accent="#EC4899">
      <div style={{ padding: 40, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✍️</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Coming soon</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>We are writing our first posts on connection, loneliness, trust, and why we built Riff the way we did. Check back soon.</p>
      </div>
    </PageShell>
  );
}
