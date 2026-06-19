import PageShell from '../components/PageShell';
export const metadata = { title: 'AI Transparency — Riff', description: 'How Riff uses artificial intelligence, and where humans remain in control.' };
export default function AITransparency() {
  return (
    <PageShell title="AI transparency" subtitle="LEGAL" accent="#8B5CF6">
      <p style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)' }}>Last updated: June 2026</p>
      <p style={{ marginBottom: 16 }}>Riff uses AI in specific, defined ways. This page explains exactly where, why, and what safeguards are in place — in compliance with the EU AI Act and UK AI regulatory principles.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>1. Practice chat bot (Luna)</h2>
      <p style={{ marginBottom: 16 }}>The "Try Riff" demo on our website uses an AI-powered chat bot named Luna. Luna is powered by Anthropic's Claude language model. She simulates what a Riff conversation feels like. Luna is clearly labelled as a sample chat and is not a real person. No personal data from demo conversations is stored or used for training.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>2. Safety moderation</h2>
      <p style={{ marginBottom: 16 }}>Every message sent on Riff passes through a real-time safety scanner. This system uses pattern matching and keyword detection to identify harassment, explicit content, predatory behaviour, and crisis language (such as references to self-harm). Flagged messages may result in warnings, content blocking, or account suspension. The system errs on the side of caution — false positives are reviewed by humans.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>3. Matching algorithm</h2>
      <p style={{ marginBottom: 16 }}>Riff's matching algorithm compares your questionnaire answers against other users to calculate compatibility scores. The algorithm does not use photos, location, income, ethnicity, or any demographic data beyond age and gender preferences that you explicitly set. The algorithm is deterministic (not a neural network) — the same inputs always produce the same match score.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>4. What AI does not do</h2>
      <p style={{ marginBottom: 16 }}>AI does not read your private messages (the safety scanner uses pattern matching, not comprehension). AI does not write messages on behalf of users. AI does not influence who you are matched with beyond the questionnaire algorithm. AI does not make decisions about account verification — that is handled by Veriff's identity verification system with human review.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>5. Human oversight</h2>
      <p style={{ marginBottom: 16 }}>All AI systems on Riff operate under human oversight. Safety reports are reviewed by people. Account suspensions triggered by automated systems can be appealed and reviewed manually. We do not delegate final decisions about user safety to automated systems alone.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>6. Questions</h2>
      <p style={{ marginBottom: 16 }}>If you have questions about how Riff uses AI, email privacy@riff-app.co.uk.</p>
    </PageShell>
  );
}
