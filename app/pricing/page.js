'use client';
import { useState } from 'react';
import PageShell from '../components/PageShell';

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: 'Single',
      tagline: '1 deep connection',
      color: 'var(--gradient)',
      monthly: { price: '£2.99', period: '/mo', note: 'Start with £3.99 for your first 6 months' },
      yearly: { price: '£3.99', period: '/6 months', note: 'Then £2.99/month or £29.88/year' },
      badge: yearly ? 'Special offer' : null,
      badgeColor: 'linear-gradient(135deg, #EF4444, #EC4899)',
      features: ['1 Deep Connection', '1 Friend Circle', '🟢 Green verification included', 'Text + voice messaging', 'Photo reveal'],
      cta: 'Get started',
      ctaStyle: 'outline',
    },
    {
      name: 'Explorer',
      tagline: 'More connections',
      color: 'var(--gradient)',
      monthly: { price: '£5.99', period: '/mo', note: null },
      yearly: { price: '£3.79', period: '/mo', note: 'Billed annually' },
      badge: 'Most popular',
      badgeColor: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
      features: ['2 Deep Connections', '3 Friend Circles', '🟢 Green verification included', 'Priority matching', 'Custom questions'],
      cta: 'Start exploring',
      ctaStyle: 'primary',
      highlight: true,
    },
    {
      name: 'Inner Circle',
      tagline: 'Full experience',
      color: 'var(--gradient)',
      monthly: { price: '£11.99', period: '/mo', note: null },
      yearly: { price: '£7.49', period: '/mo', note: 'Billed annually' },
      badge: null,
      badgeColor: null,
      features: ['Unlimited connections', 'Unlimited circles', '🟢 Green verification included', 'Circle analytics', 'Early access features'],
      cta: 'Go all in',
      ctaStyle: 'outline',
    },
  ];

  return (
    <PageShell title="Simple, honest pricing" subtitle="PRICING" accent="#8B5CF6">
      <p style={{ marginBottom: 32, fontSize: 17 }}>Every plan includes green verification. No hidden fees. Cancel any time.</p>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="pricing-toggle">
          <button className={!yearly ? 'active' : ''} onClick={() => setYearly(false)}>Monthly</button>
          <button className={yearly ? 'active' : ''} onClick={() => setYearly(true)}>Yearly</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {plans.map((p, i) => {
          const pricing = yearly ? p.yearly : p.monthly;
          const showBadge = yearly ? p.badge : (p.badge === 'Most popular' ? p.badge : null);
          return (
            <div key={i} style={{ position: 'relative', paddingTop: showBadge ? 16 : 0 }}>
              {showBadge && (
                <div style={{
                  position: 'absolute', top: -2, left: '50%', transform: 'translateX(-50%)',
                  background: p.badgeColor, padding: '5px 16px', borderRadius: 20,
                  fontSize: 12, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', zIndex: 1,
                }}>
                  {showBadge}
                </div>
              )}
              <div style={{
                padding: 28, borderRadius: 20,
                background: 'var(--bg-card)',
                border: p.highlight ? '1.5px solid var(--cyan)' : '1px solid var(--border)',
                height: '100%', display: 'flex', flexDirection: 'column',
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700,
                  background: p.color, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 20 }}>{p.tagline}</div>

                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 800, color: 'var(--text-primary)' }}>
                    {pricing.price}
                  </span>
                  <span style={{ fontSize: 16, color: 'var(--text-dim)' }}>{pricing.period}</span>
                </div>
                {pricing.note && (
                  <div style={{ fontSize: 13, color: 'var(--cyan)', marginBottom: 16 }}>{pricing.note}</div>
                )}
                {!pricing.note && <div style={{ height: 16, marginBottom: 16 }} />}

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 20, flex: 1 }}>
                  {p.features.map((f, fi) => (
                    <div key={fi} style={{ fontSize: 14, color: 'var(--text-secondary)', padding: '5px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: 'var(--cyan)', fontSize: 14 }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                {p.ctaStyle === 'primary' ? (
                  <button className="btn-primary" style={{ width: '100%', padding: '14px 0' }}>{p.cta}</button>
                ) : (
                  <button className="btn-outline" style={{ width: '100%', padding: '14px 0' }}>{p.cta}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 32, fontSize: 13, color: 'var(--text-dim)', textAlign: 'center' }}>All prices in GBP. Cancel any time from your account settings.</p>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </PageShell>
  );
}
