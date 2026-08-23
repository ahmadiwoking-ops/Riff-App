import PageShell from '../components/PageShell';
export const metadata = { title: 'How Riff works — Riff', description: 'Five stages from questions to connection. No photos, no profiles — just real conversation.' };
export default function HowItWorks() {
  const stages = [
    { num: '01', title: 'Answer 25 questions', desc: 'Across values, emotions, humour, and dealbreakers. Your answers stay private — they power the matching algorithm, not a public profile. Takes about 8 minutes.', color: '#8B5CF6' },
    { num: '02', title: 'Get matched', desc: 'Our algorithm compares your answers against every other user and finds the people who genuinely think like you. Every match comes with a compatibility score and a breakdown showing where you align.', color: '#EC4899' },
    { num: '03', title: 'Riff in text and voice', desc: 'You and your match start talking — no photos, no real names, just personality. Text and voice notes from the first message. Hearing someone changes everything, and you do it long before you see them.', color: '#F59E0B' },
    { num: '04', title: 'The reveal', desc: 'When you both tap ready, you each take a live selfie and they appear simultaneously. No power imbalance, no one-sided judgement. That photo becomes your profile picture — so what people see is really you.', color: '#22D3EE' },
    { num: '05', title: 'Video, or a graceful goodbye', desc: 'If you both want to, unlock video and meet properly. And if it is not right, you can fade at any point — end it with a message of your own, or let Riff write a gentle goodbye for you over a few days. No ghosting.', color: '#84CC16' },
  ];
  return (
    <PageShell title="How Riff works" subtitle="THE PROCESS" accent="#8B5CF6">
      <p style={{ marginBottom: 24, fontSize: 17 }}>Riff replaces shallow networking with a five-step journey from anonymous questions to a real connection. You talk first — and nothing moves forward unless you both choose it.</p>
      {stages.map((s, i) => (
        <div key={i} style={{ padding: 24, marginBottom: 16, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 6 }}>STAGE {s.num}</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{s.title}</div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{s.desc}</p>
        </div>
      ))}
      <p style={{ marginTop: 32 }}>The whole process can take a day or a month — Riff moves at the speed of trust, not the speed of scrolling.</p>
    </PageShell>
  );
}
