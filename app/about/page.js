import PageShell from '../components/PageShell';
export const metadata = { title: 'About Riff', description: 'We are building the antidote to swiping culture. Real connection through conversation, trust, and patience.' };
export default function About() {
  return (
    <PageShell title="About Riff" subtitle="OUR STORY" accent="#8B5CF6">
      <p style={{ marginBottom: 16, fontSize: 17 }}>Riff exists because swiping is broken. Not just inefficient — broken. It rewards looks over substance, speed over depth, and quantity over quality.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>The problem</h2>
      <p style={{ marginBottom: 16 }}>The average dating app user spends 90 minutes a day swiping and feels worse about themselves afterwards. People are lonelier than ever despite having more ways to connect than ever. Something is fundamentally wrong with the model.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Our approach</h2>
      <p style={{ marginBottom: 16 }}>Riff flips the script. You understand someone before you see them. Questions reveal compatibility. Voice reveals personality. The photo reveal is mutual, simultaneous, and earned — not the starting point.</p>
      <p style={{ marginBottom: 16 }}>This is not faster dating. It is deeper connection. Some users find their person in a week. Some take months. The speed does not matter — the quality does.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Built in the UK</h2>
      <p style={{ marginBottom: 16 }}>Riff is built in Woking, England. We are a small, focused team obsessed with one thing: making online connection feel real again. We comply with UK data protection law, GDPR, and the EU AI Act.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Our values</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Depth over speed.</strong> Every feature is designed to slow things down just enough that real connection can happen.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Safety first.</strong> Not as a marketing line — as the literal first thing we build before any feature ships.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Honesty.</strong> We tell you what we do with your data. We tell you how the algorithm works. We do not use dark patterns.</p>
    </PageShell>
  );
}
