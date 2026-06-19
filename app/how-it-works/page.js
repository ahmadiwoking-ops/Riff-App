import PageShell from '../components/PageShell';
export const metadata = { title: 'How Riff works — Riff', description: 'Five stages from questions to connection. No photos, no swiping — just real conversation.' };
export default function HowItWorks() {
  const stages = [
    { num: '01', title: 'Answer 25 questions', desc: 'Across values, emotions, humour, and dealbreakers. Your answers stay private — they power the matching algorithm, not a public profile. Takes about 8 minutes.', color: '#8B5CF6' },
    { num: '02', title: 'Get matched', desc: 'Our algorithm compares your answers against every other user and finds the people who genuinely think like you. 72% compatibility minimum — most matches land between 78% and 91%.', color: '#EC4899' },
    { num: '03', title: 'Riff in text', desc: 'You and your match start talking — no photos, no real names, just personality. Ask anything. Share anything. Find out if this person gets you.', color: '#F59E0B' },
    { num: '04', title: 'Unlock voice', desc: 'When you are both ready, swap voice messages. Hearing someone changes everything. Both of you rate the connection — if you both score 4/5 or higher, the reveal unlocks.', color: '#22D3EE' },
    { num: '05', title: 'The reveal', desc: 'Photos appear simultaneously for both of you. No power imbalance, no one-sided judgment. Then you choose: continue building this, or let it fade gracefully.', color: '#84CC16' },
  ];
  return (
    <PageShell title="How Riff works" subtitle="THE PROCESS" accent="#8B5CF6">
      <p style={{ marginBottom: 24, fontSize: 17 }}>Riff replaces swiping with a five-stage journey from anonymous questions to a real connection. Each stage earns trust before the next one unlocks.</p>
      {stages.map((s, i) => (
        <div key={i} style={{ padding: 24, marginBottom: 16, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 6 }}>STAGE {s.num}</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{s.title}</div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{s.desc}</p>
        </div>
      ))}
      <p style={{ marginTop: 32 }}>The whole process can take a day or a month — Riff moves at the speed of trust, not the speed of swiping.</p>
    </PageShell>
  );
}
