import PageShell from '../components/PageShell';
export const metadata = { title: 'Refund Policy — Riff', description: 'Our refund policy for Riff subscriptions and purchases. Fair, transparent, and straightforward.' };
export default function RefundPolicy() {
  return (
    <PageShell title="Refund Policy" subtitle="POLICY" accent="#84CC16">
      <p style={{ marginBottom: 12, fontSize: 13, color: '#64748B' }}>Last updated: July 2026</p>

      <p style={{ marginBottom: 16, fontSize: 17 }}>We want you to be happy with Riff. This refund policy explains when and how you can request a refund for your subscription or purchase.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>1. Subscription plans</h2>
      <p style={{ marginBottom: 16 }}>Riff offers the following paid plans: Single (£2.99/month), Bot Connection (£7.99/month), Explorer (£5.99/month), and Inner Circle (£11.99/month). All subscriptions are billed monthly or annually through Stripe, Apple App Store, or Google Play Store depending on your platform.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>2. Cooling-off period</h2>
      <p style={{ marginBottom: 16 }}>In accordance with UK consumer law (Consumer Contracts Regulations 2013), you have a 14-day cooling-off period from the date of purchase. During this period, you may request a full refund for any reason, even if you have used the service. To exercise this right, contact Admin@riff-app.co.uk within 14 days of your purchase with your account email and the reason for your request.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>3. Refunds after the cooling-off period</h2>
      <p style={{ marginBottom: 16 }}>After the 14-day cooling-off period, refunds are considered on a case-by-case basis. You may be eligible for a full or partial refund if:</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Technical failure</strong> — a significant platform issue prevented you from using features you paid for, and we were unable to resolve it within a reasonable timeframe.</p>
      <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text-primary)' }}>Billing error</strong> — you were charged incorrectly, charged twice, or charged after cancelling your subscription.</p>
      <p style={{ marginBottom: 16 }}><strong style={{ color: 'var(--text-primary)' }}>Account compromise</strong> — unauthorised purchases were made on your account and you reported them promptly.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>4. Non-refundable circumstances</h2>
      <p style={{ marginBottom: 16 }}>Refunds will generally not be issued in the following cases:</p>
      <p style={{ marginBottom: 8 }}>Your account was banned for violating our Acceptable Use Policy or Terms of Service.</p>
      <p style={{ marginBottom: 8 }}>You have used the service extensively during the billing period and are requesting a refund for reasons of personal preference.</p>
      <p style={{ marginBottom: 8 }}>You did not cancel your subscription before the renewal date and are requesting a refund for the renewed period after significant use.</p>
      <p style={{ marginBottom: 16 }}>The introductory pricing period (£3.99 for 6 months on the Single plan) has been fully consumed.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>5. Verification fee</h2>
      <p style={{ marginBottom: 16 }}>The one-time verification fee (£2.99) covers the cost of third-party identity verification through Veriff. This fee is non-refundable once the verification process has been initiated, as we incur the cost from our verification provider regardless of the outcome. If verification fails due to a technical error on our part, a full refund of the verification fee will be issued.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>6. How to request a refund</h2>
      <p style={{ marginBottom: 16 }}>To request a refund, email Admin@riff-app.co.uk with the following information: your account email address, the date of purchase, the amount charged, and a brief description of why you are requesting a refund. We aim to acknowledge all refund requests within 2 working days and process approved refunds within 5-10 working days.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>7. App Store and Google Play purchases</h2>
      <p style={{ marginBottom: 16 }}>If you purchased your subscription through the Apple App Store or Google Play Store, your refund is subject to their respective refund policies. You may need to request the refund directly through Apple or Google. We are happy to support your request by providing transaction records or confirming account details — contact Admin@riff-app.co.uk and we will assist.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>8. Cancelling your subscription</h2>
      <p style={{ marginBottom: 16 }}>You can cancel your subscription at any time through the app settings or by emailing Admin@riff-app.co.uk. When you cancel, your subscription remains active until the end of the current billing period. You will not be charged again after cancellation. Cancelling your subscription does not automatically trigger a refund for the current period.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>9. Pro-rata refunds</h2>
      <p style={{ marginBottom: 16 }}>For annual subscriptions, if a refund is approved after the cooling-off period, we will calculate a pro-rata refund based on the number of full months remaining on your subscription minus a 15% administration fee. Monthly subscriptions are not eligible for pro-rata refunds.</p>

      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>10. Changes to this policy</h2>
      <p style={{ marginBottom: 16 }}>We may update this refund policy from time to time. Changes will be posted on this page with an updated date. The policy in effect at the time of your purchase applies to that purchase.</p>

      <p style={{ marginTop: 32, fontSize: 13, color: '#64748B' }}>For refund requests or billing questions: Admin@riff-app.co.uk</p>
    </PageShell>
  );
}
