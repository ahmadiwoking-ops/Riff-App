import PageShell from '../components/PageShell';
export const metadata = { title: 'Deep Connection — Riff', description: 'One person, full depth. Mentorship, collaboration, or profound friendship, built one stage at a time.' };
export default function DeepConnection() {
  return (
    <PageShell title="Deep Connection" subtitle="PRODUCT" accent="#22D3EE">
      <p style={{ marginBottom: 16, fontSize: 17 }}>Deep Connection is Riff's core mode. One match, three stages, full depth. Designed for mentorship, collaboration, or a profound 1:1 connection that helps you grow.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>How it works</h2>
      <p style={{ marginBottom: 16 }}>You are matched with one person based on 25 compatibility questions. No one else sees your answers — they exist purely to find someone who thinks like you and can help you progress on your path.</p>
      <p style={{ marginBottom: 16 }}>From there you talk — by text and voice from the very first message. When you are both ready, you reveal your faces at the same moment. After that, video. Nothing moves forward until you both choose it.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>What makes it different</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Voice from the start.</strong> You can send voice notes from your first conversation. Hearing someone tells you things text never will — long before you see a face.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Simultaneous reveal.</strong> Photos appear at the exact same moment for both of you. No power imbalance. No one deciding while the other waits.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Fading, without the awkwardness.</strong> Not every connection is meant to continue, and ghosting helps nobody. You can end things with a message of your own, or let Riff write a gentle goodbye for you over a few days.</p>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Who it is for</h2>
      <p style={{ marginBottom: 16 }}>Anyone looking for a meaningful connection that goes beyond surface level. People seeking a mentor, a collaborator, or someone who truly understands their goals and can help them get there. One real connection, not a hundred shallow ones.</p>
    </PageShell>
  );
}
