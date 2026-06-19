import PageShell from '../components/PageShell';
export const metadata = { title: 'Deep Connection — Riff', description: 'One person, full depth. Romance, mentorship, or profound friendship through five stages of trust.' };
export default function DeepConnection() {
  return (
    <PageShell title="Deep Connection" subtitle="PRODUCT" accent="#22D3EE">
      <p style={{ marginBottom: 16, fontSize: 17 }}>Deep Connection is Riff's core mode. One match, five stages, full depth. Designed for romance, mentorship, or a profound 1:1 friendship.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>How it works</h2>
      <p style={{ marginBottom: 16 }}>You are matched with one person based on 25 compatibility questions. No one else sees your answers — they exist purely to find someone who thinks like you.</p>
      <p style={{ marginBottom: 16 }}>From there, you progress through five stages: text, voice, the simultaneous photo reveal, life chapters, and full connection. Each stage unlocks only when both people are ready.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>What makes it different</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Voice scoring.</strong> Before photos, you hear each other. Both rate the voice connection out of 5. If both score 4 or higher, the reveal unlocks. If not, you can keep talking or move on — no awkwardness.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Simultaneous reveal.</strong> Photos appear at the exact same moment for both of you. No power imbalance. No one deciding while the other waits.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Life chapters.</strong> After the reveal, you exchange deeper stories — childhood, turning points, dreams. The things you only share with people you trust.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Who it is for</h2>
      <p style={{ marginBottom: 16 }}>Anyone who wants to be understood before being seen. People tired of surface-level swiping. People looking for one real connection, not a hundred shallow ones.</p>
    </PageShell>
  );
}
