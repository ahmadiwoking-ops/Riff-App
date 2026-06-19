import PageShell from '../components/PageShell';
export const metadata = { title: 'Contact — Riff', description: 'Get in touch with the Riff team.' };
export default function Contact() {
  return (
    <PageShell title="Contact us" subtitle="GET IN TOUCH" accent="#8B5CF6">
      <p style={{ marginBottom: 32, fontSize: 17 }}>We read every message. Here is how to reach the right team.</p>
      {[
        { label: 'General enquiries', email: 'hello@riff-app.co.uk', desc: 'Questions about Riff, partnerships, or anything else.' },
        { label: 'Support', email: 'support@riff-app.co.uk', desc: 'Account issues, bug reports, or help with the app.' },
        { label: 'Press', email: 'press@riff-app.co.uk', desc: 'Media enquiries, interviews, and brand assets.' },
        { label: 'Careers', email: 'careers@riff-app.co.uk', desc: 'Interested in joining the team.' },
        { label: 'Legal & data requests', email: 'privacy@riff-app.co.uk', desc: 'GDPR requests, data deletion, and legal matters.' },
      ].map((c, i) => (
        <div key={i} style={{ padding: 20, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg-card)', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{c.label}</div>
          <div style={{ fontSize: 14, color: 'var(--cyan)', marginBottom: 6 }}>{c.email}</div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{c.desc}</div>
        </div>
      ))}
      <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text-dim)' }}>Riff is based in Woking, England, United Kingdom.</p>
    </PageShell>
  );
}
