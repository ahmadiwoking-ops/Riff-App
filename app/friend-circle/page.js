import PageShell from '../components/PageShell';
export const metadata = { title: 'Friend Circle — Riff', description: 'Four compatible people, group question rounds, and real friendships. Find your tribe.' };
export default function FriendCircle() {
  return (
    <PageShell title="Friend Circle" subtitle="PRODUCT" accent="#84CC16">
      <p style={{ marginBottom: 16, fontSize: 17 }}>Friend Circle matches you with four compatible people simultaneously. Group question rounds reveal personalities before faces. Built for finding your tribe.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>How it works</h2>
      <p style={{ marginBottom: 16 }}>The same 25 questions that power Deep Connection also feed Friend Circle — but instead of finding one match, the algorithm assembles a group of four people with high mutual compatibility.</p>
      <p style={{ marginBottom: 16 }}>You start with group question rounds: everyone answers the same prompt, and you see each other's responses anonymously. Patterns emerge. You start to recognise who thinks like you.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Features</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Group question rounds.</strong> Everyone answers, everyone reads. The best icebreaker ever designed.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>1:1 deep dives.</strong> Within the circle, you can start private conversations with anyone. Some friendships are group energy; some are quiet side conversations.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Mosaic photo reveal.</strong> All four photos appear at once, as a mosaic. Everyone is revealed to everyone simultaneously.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Group chat and meetup calendar.</strong> After the reveal, you unlock a permanent group chat and a shared calendar for meeting in real life.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Who it is for</h2>
      <p style={{ marginBottom: 16 }}>People who moved to a new city. People who outgrew their old friendships. People who want friends who actually get them — not just people who happen to live nearby.</p>
    </PageShell>
  );
}
