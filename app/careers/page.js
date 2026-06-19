import PageShell from '../components/PageShell';
export const metadata = { title: 'Careers — Riff', description: 'Join us. We are building the antidote to swiping culture.' };
export default function Careers() {
  return (
    <PageShell title="Careers at Riff" subtitle="JOIN US" accent="#F59E0B">
      <p style={{ marginBottom: 16, fontSize: 17 }}>Riff is early-stage and growing. We are looking for people who care about building technology that genuinely improves how humans connect.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>What we value</h2>
      <p style={{ marginBottom: 16 }}>Craft over speed. Empathy over metrics. Shipping over talking about shipping. We are a small team, so everyone touches everything — there are no passengers.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Open roles</h2>
      <div style={{ padding: 24, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)', marginBottom: 16 }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>No open roles right now — but we are always interested in hearing from exceptional people. If Riff's mission resonates with you, reach out.</p>
      </div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Get in touch</h2>
      <p style={{ marginBottom: 16 }}>Email <strong style={{ color: 'var(--cyan)' }}>careers@riff-app.co.uk</strong> with a few lines about who you are and what you would build if you joined. No formal CVs required.</p>
    </PageShell>
  );
}
