import PageShell from '../components/PageShell';
import { DISCORD_URL } from '../components/community-config';
import CommunityForm from '../components/CommunityForm';

export const metadata = {
  title: 'Community — Riff',
  description: 'Join the Riff community on Discord: meet early members, shape the app and hear about events near you.',
};

const H2 = { fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 };
const P = { marginBottom: 16 };
const B = { color: 'var(--text-primary)' };
const BUTTON = {
  display: 'inline-block', background: '#5865F2', color: '#fff', fontWeight: 700, fontSize: 17,
  padding: '14px 26px', borderRadius: 999, textDecoration: 'none', margin: '8px 0 24px',
};

export default function Community() {
  return (
    <PageShell title="Join the Riff community" subtitle="COMMUNITY" accent="#5865F2">
      <p style={P}>Riff is being built with the people who use it. Our Discord server is where members, early testers and the Riff team talk every day.</p>
      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" style={BUTTON}>Join the Discord &rarr;</a>

      <h2 style={H2}>What happens there</h2>
      <ul style={{ marginBottom: 16, paddingLeft: 22 }}>
        <li style={{ marginBottom: 8 }}><strong style={B}>Meet early members</strong> before Riff opens properly in your area.</li>
        <li style={{ marginBottom: 8 }}><strong style={B}>Shape the app.</strong> Suggest features, report bugs and try new things first.</li>
        <li style={{ marginBottom: 8 }}><strong style={B}>Local launches and events.</strong> Debate nights, socials, and news of where Riff opens next.</li>
        <li style={{ marginBottom: 8 }}><strong style={B}>Talk to the team</strong> directly about anything Riff.</li>
      </ul>

      <h2 style={H2}>Say hello from here</h2>
      <div style={{ background: 'linear-gradient(135deg, #5865F2 0%, #8B5CF6 100%)', color: '#fff', borderRadius: 20, padding: 4, marginBottom: 16 }}>
        <CommunityForm />
      </div>

      <h2 style={H2}>House rules</h2>
      <ul style={{ marginBottom: 16, paddingLeft: 22 }}>
        <li style={{ marginBottom: 8 }}>18+ only, the same as the app.</li>
        <li style={{ marginBottom: 8 }}>Be kind. No harassment, hate or unwanted messages.</li>
        <li style={{ marginBottom: 8 }}>Keep personal details private: yours and other people's.</li>
        <li style={{ marginBottom: 8 }}>No spam or selling.</li>
      </ul>
      <p style={P}>Discord is run by Discord Inc. and has its own privacy policy. Joining our server does not link your Discord account to your Riff account. Messages sent with the form above are posted publicly in our Discord with the name you give; we don't send your email or IP address.</p>
    </PageShell>
  );
}
