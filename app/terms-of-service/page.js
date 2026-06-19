import PageShell from '../components/PageShell';
export const metadata = { title: 'Terms of Service — Riff', description: 'Terms and conditions for using Riff.' };
export default function Terms() {
  return (
    <PageShell title="Terms of service" subtitle="LEGAL" accent="#8B5CF6">
      <p style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)' }}>Last updated: June 2026</p>
      <p style={{ marginBottom: 16 }}>By using Riff, you agree to these terms. If you do not agree, please do not use the app.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>1. Eligibility</h2>
      <p style={{ marginBottom: 16 }}>You must be at least 18 years old to use Riff. By creating an account, you confirm that you are 18 or older and that all information you provide is accurate.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>2. Your account</h2>
      <p style={{ marginBottom: 16 }}>You are responsible for your account credentials and all activity under your account. One account per person. Impersonation, fake accounts, and misleading information are grounds for immediate suspension.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>3. Acceptable use</h2>
      <p style={{ marginBottom: 16 }}>You agree not to: send harassing, threatening, or sexually explicit messages; share contact details or attempt to move conversations off-platform before the reveal stage; use Riff for commercial solicitation; upload content that infringes intellectual property; attempt to circumvent safety features or verification systems; create multiple accounts.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>4. Content</h2>
      <p style={{ marginBottom: 16 }}>You retain ownership of content you create on Riff (messages, voice messages, photos). By uploading content, you grant Riff a limited licence to process, store, and display it within the app as needed for the service to function. We do not use your content for advertising or sell it to third parties.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>5. Safety and moderation</h2>
      <p style={{ marginBottom: 16 }}>Messages are scanned in real time by automated safety systems. Riff may warn, restrict, or suspend accounts that violate community standards. We reserve the right to end any conversation or terminate any account that poses a safety risk, without prior notice.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>6. Subscriptions and payments</h2>
      <p style={{ marginBottom: 16 }}>Paid plans are billed monthly or yearly through Stripe. You can cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period — no partial refunds. Prices may change with 30 days' notice.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>7. Limitation of liability</h2>
      <p style={{ marginBottom: 16 }}>Riff is provided "as is." We do our best to create a safe, reliable platform, but we cannot guarantee uninterrupted service or that every user is who they claim to be. Riff is not liable for the actions of other users. Please exercise the same caution you would in any social interaction.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>8. Governing law</h2>
      <p style={{ marginBottom: 16 }}>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>9. Contact</h2>
      <p style={{ marginBottom: 16 }}>Questions about these terms: legal@riff-app.co.uk.</p>
    </PageShell>
  );
}
