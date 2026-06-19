import PageShell from '../components/PageShell';
export const metadata = { title: 'GDPR — Riff', description: 'How Riff complies with GDPR and UK data protection law.' };
export default function GDPR() {
  return (
    <PageShell title="GDPR compliance" subtitle="LEGAL" accent="#8B5CF6">
      <p style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)' }}>Last updated: June 2026</p>
      <p style={{ marginBottom: 16 }}>Riff complies with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and the EU GDPR. This page summarises our approach.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Lawful bases for processing</h2>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Contract.</strong> Processing necessary to provide you with the Riff service (matching, messaging, verification).</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Legitimate interests.</strong> Platform safety, fraud prevention, and service improvement — balanced against your privacy rights.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Consent.</strong> Where required (e.g. optional analytics), we ask for explicit, informed consent that can be withdrawn at any time.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Your rights</h2>
      <p style={{ marginBottom: 16 }}>You have the right to: access your personal data (Article 15), rectify inaccuracies (Article 16), request erasure (Article 17, "right to be forgotten"), restrict processing (Article 18), data portability (Article 20), and object to processing (Article 21).</p>
      <p style={{ marginBottom: 16 }}>To exercise any right, email privacy@riff-app.co.uk. We respond within 30 days. If you are unsatisfied with our response, you may lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Data storage and transfers</h2>
      <p style={{ marginBottom: 16 }}>Your data is stored on servers in the European Union (Railway, Ireland). Verification data is processed by Veriff (EU data centre, Republic of Ireland). SMS verification is processed by Twilio (US, with EU Standard Contractual Clauses). Payments are processed by Stripe (certified under the EU-US Data Privacy Framework).</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Data Protection Officer</h2>
      <p style={{ marginBottom: 16 }}>For data protection enquiries: privacy@riff-app.co.uk. Riff App Ltd, Woking, England, United Kingdom.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>Data deletion</h2>
      <p style={{ marginBottom: 16 }}>You can delete your account and all associated data from the Settings screen in the app. Alternatively, email privacy@riff-app.co.uk and we will process the deletion within 30 days. Deletion is permanent and irreversible.</p>
    </PageShell>
  );
}
