import PageShell from '../components/PageShell';
export const metadata = { title: 'Law Enforcement Guidelines — Riff', description: 'Information for law enforcement agencies requesting user data or reporting criminal activity on Riff.' };
export default function LawEnforcement() {
  return (
    <PageShell title="Law Enforcement Guidelines" subtitle="LEGAL" accent="#EF4444">
      <p style={{ marginBottom: 12, fontSize: 13, color: '#64748B' }}>Last updated: July 2026</p>

      <p style={{ marginBottom: 16, fontSize: 17 }}>Riff is committed to the safety of our users and to cooperating with law enforcement agencies in accordance with applicable law. This page outlines how law enforcement can submit requests for user data and how we handle those requests.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>1. Contacting Riff</h2>
      <p style={{ marginBottom: 16 }}>All law enforcement requests should be directed to:</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Email:</strong> legal@riff-app.co.uk</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Postal address:</strong> Riff Legal Department, Woking, Surrey, United Kingdom</p>
      <p style={{ marginBottom: 16 }}>Requests from law enforcement should be submitted on official letterhead, include the officer's name, badge number, agency, and direct contact information, and clearly state the legal basis for the request.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>2. What data Riff may hold</h2>
      <p style={{ marginBottom: 16 }}>Depending on the user's activity, Riff may hold the following categories of data:</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Account information</strong> — email address, alias (display name), age, country, account creation date, last login date, IP addresses used at registration.</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Verification data</strong> — government ID verification status (via our third-party provider Veriff), selfie verification status, phone number verification status. Riff does not store copies of identity documents; these are held by Veriff under their own data retention policies.</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Communication data</strong> — text messages, voice messages (stored as encrypted data), and connection history between users.</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Payment data</strong> — subscription plan, payment dates, and Stripe customer ID. Full payment card details are held by Stripe, not by Riff.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Usage data</strong> — question answers used for matching, game responses, AI companion chat history, and Trust Score information.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>3. Legal process requirements</h2>
      <p style={{ marginBottom: 16 }}>Riff responds to valid legal process in accordance with UK law, including the Data Protection Act 2018, the Investigatory Powers Act 2016, and applicable mutual legal assistance treaties (MLATs) for international requests.</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Basic subscriber information</strong> — may be disclosed in response to a valid law enforcement request that includes appropriate legal process.</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Message content and communication records</strong> — require a court order, warrant, or equivalent legal instrument.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Real-time interception</strong> — requires authorisation under the Investigatory Powers Act 2016 or equivalent legal authority.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>4. Emergency requests</h2>
      <p style={{ marginBottom: 16 }}>If there is an immediate threat to life or a risk of serious physical harm, Riff may voluntarily disclose information to law enforcement without a court order. Emergency requests should be clearly marked as urgent and include a description of the emergency, the specific data needed, and how the data will help address the threat. Send emergency requests to legal@riff-app.co.uk with the subject line "EMERGENCY DISCLOSURE REQUEST".</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>5. Child safety</h2>
      <p style={{ marginBottom: 16 }}>Riff has zero tolerance for child sexual exploitation or abuse (CSEA). All users must be 18 or over. If we identify or receive a report of CSEA material, we will immediately preserve all relevant data, report the matter to the National Crime Agency (NCA) via the Child Exploitation and Online Protection command (CEOP), and cooperate fully with any resulting investigation. We do not notify the user in these cases.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>6. Data preservation</h2>
      <p style={{ marginBottom: 16 }}>Law enforcement may request that Riff preserve data relating to a specific user account pending the issuance of formal legal process. Preservation requests are honoured for 90 days and may be extended upon request. Submit preservation requests to legal@riff-app.co.uk with the user's email address or alias, the specific data to be preserved, and the case reference number.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>7. User notification</h2>
      <p style={{ marginBottom: 16 }}>Unless prohibited by law or court order, Riff will generally notify users when their data has been requested by law enforcement. If a non-disclosure order is in place, we will comply with its terms and notify the user when the order expires, if permitted.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>8. International requests</h2>
      <p style={{ marginBottom: 16 }}>Riff is a UK-based company. International law enforcement requests should be submitted through the appropriate mutual legal assistance treaty (MLAT) process or other recognised international cooperation mechanism. In urgent cases, we may respond directly while advising the requesting agency to formalise the request through proper channels.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>9. Transparency</h2>
      <p style={{ marginBottom: 16 }}>Riff is committed to transparency about law enforcement requests. We intend to publish an annual transparency report detailing the number and type of requests received, the number of requests complied with, and the number of users affected. The first report will be published after 12 months of operation.</p>

      <p style={{ marginTop: 32, fontSize: 13, color: '#64748B' }}>For all law enforcement enquiries: legal@riff-app.co.uk</p>
    </PageShell>
  );
}
