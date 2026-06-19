import PageShell from '../components/PageShell';
export const metadata = { title: 'Privacy Policy — Riff', description: 'How Riff collects, uses, and protects your personal data.' };
export default function PrivacyPolicy() {
  return (
    <PageShell title="Privacy policy" subtitle="LEGAL" accent="#8B5CF6">
      <p style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)' }}>Last updated: June 2026</p>
      <p style={{ marginBottom: 16 }}>Riff ("we", "us", "our") is operated by Riff App Ltd, registered in England. This policy explains what personal data we collect, why, and your rights.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>1. Data we collect</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Account data.</strong> Email address, alias (display name), age, gender, and connection preferences. We do not require your real name.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Verification data.</strong> Selfie photos (for liveness checks), government ID images (processed by Veriff — we do not store your ID documents), and phone number (verified via Twilio). Selfie images are deleted after verification.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Questionnaire answers.</strong> Your responses to matching questions. These are used solely by the matching algorithm and are never displayed publicly.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Messages and voice messages.</strong> Encrypted in transit and at rest. We scan messages in real time for safety purposes (detecting harassment, explicit content, and crisis language) using automated systems. We do not read your messages manually unless responding to a safety report.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Usage data.</strong> App interactions, feature usage, and crash reports. No location tracking.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>2. How we use your data</h2>
      <p style={{ marginBottom: 16 }}>To match you with compatible people. To verify your identity and maintain platform safety. To send you messages from your matches. To improve the product. We never sell your data to advertisers or third parties.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>3. Third-party processors</h2>
      <p style={{ marginBottom: 16 }}>We share data with: Veriff (ID verification, EU data storage), Twilio (SMS verification), Stripe (payment processing), Anthropic (AI-powered chat bot for the demo, no user data shared), and Railway (hosting, EU). All processors are GDPR-compliant and bound by data processing agreements.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>4. Data retention</h2>
      <p style={{ marginBottom: 16 }}>Account data is retained while your account is active. Verification images are deleted after processing. Messages are retained for 12 months after the last activity in a conversation, then automatically deleted. You can request full data deletion at any time.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>5. Your rights</h2>
      <p style={{ marginBottom: 16 }}>Under UK GDPR and the Data Protection Act 2018, you have the right to: access your data, rectify inaccuracies, request deletion, restrict processing, data portability, and object to processing. Contact privacy@riff-app.co.uk to exercise any right. We respond within 30 days.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>6. Security</h2>
      <p style={{ marginBottom: 16 }}>All data is encrypted in transit (TLS 1.3) and at rest. Passwords are hashed with bcrypt. API keys are stored as environment variables, never in code. Our infrastructure is hosted in the EU.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>7. Contact</h2>
      <p style={{ marginBottom: 16 }}>Data controller: Riff App Ltd, Woking, England. Email: privacy@riff-app.co.uk.</p>
    </PageShell>
  );
}
