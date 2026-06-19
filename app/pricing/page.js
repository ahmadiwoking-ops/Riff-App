import PageShell from '../components/PageShell';
export const metadata = { title: 'Pricing — Riff', description: 'Free tier, Explorer, and Inner Circle plans. Real connection starts free.' };
export default function Pricing() {
  const plans = [
    { name: 'Free', price: '£0', period: 'forever', color: '#64748B', features: ['1 Deep Connection', '1 Friend Circle', 'Yellow trust badge (selfie verified)', 'Text + voice messaging', 'Photo reveal'] },
    { name: 'Explorer', price: '£4.99', period: '/month', color: '#8B5CF6', features: ['2 Deep Connections', '3 Friend Circles', 'Green trust badge (full ID verification included)', 'Priority matching', 'Custom questions', 'Read receipts'] },
    { name: 'Inner Circle', price: '£9.99', period: '/month', color: '#EC4899', features: ['Unlimited Deep Connections', '5 Friend Circles', 'Green trust badge (full ID verification included)', 'Priority matching', 'Custom questions', 'See who rated you highly', 'Early access to new features'] },
  ];
  return (
    <PageShell title="Simple, honest pricing" subtitle="PRICING" accent="#8B5CF6">
      <p style={{ marginBottom: 32, fontSize: 17 }}>Riff's core experience is free. Paid plans unlock more connections and features — but never a better algorithm. Everyone gets the same matching quality.</p>
      <div style={{ display: 'grid', gap: 16 }}>
        {plans.map((p, i) => (
          <div key={i} style={{ padding: 24, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 600, color: p.color }}>{p.name}</div>
              <div><span style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>{p.price}</span><span style={{ color: 'var(--text-dim)', fontSize: 14 }}>{p.period}</span></div>
            </div>
            {p.features.map((f, fi) => (
              <div key={fi} style={{ fontSize: 14, color: 'var(--text-secondary)', padding: '4px 0', display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ color: p.color }}>✓</span> {f}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p style={{ marginTop: 32, fontSize: 13, color: 'var(--text-dim)' }}>All prices in GBP. Yearly billing available at a 20% discount. Cancel any time from your account settings.</p>
    </PageShell>
  );
}
