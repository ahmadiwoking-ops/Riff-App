'use client';
import { useState } from 'react';
import PageShell from '../components/PageShell';

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  // Annual prices are totals, matching Stripe and the app. Paying monthly
  // costs more over a year, which is the point of the yearly option.
  const plans = [
    {
      name: 'Riff Single',
      tagline: '1 deep connection',
      color: 'var(--gradient)',
      monthly: { price: '£5.99', period: '/mo', note: null },
      yearly: { price: '£35.00', period: '/year', note: 'Save 51% against paying monthly' },
      badge: null,
      badgeColor: null,
      features: ['1 Deep Connection', '1 Friend Circle', '🟢 Green verification included', 'Voice notes and photo sharing', 'AI Companions included'],
      cta: 'Get started',
      ctaStyle: 'outline',
    },
    {
      name: 'Explorer',
      tagline: 'More connections',
      color: 'var(--gradient)',
      monthly: { price: '£8.99', period: '/mo', note: null },
      yearly: { price: '£45.00', period: '/year', note: 'Save 58% against paying monthly' },
      badge: 'Most popular',
      badgeColor: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
      features: ['2 Deep Connections', '3 Friend Circles', '🟢 Green verification included', 'Local circles by county', 'AI Companions included'],
      cta: 'Start exploring',
      ctaStyle: 'primary',
      highlight: true,
    },
    {
      name: 'Inner Circle',
      tagline: 'Full experience',
      color: 'var(--gradient)',
      monthly: { price: '£11.99', period: '/mo', note: null },
      yearly: { price: '£74.99', period: '/year', note: 'Save 48% against paying monthly' },
      badge: null,
      badgeColor: null,
      features: ['Unlimited connections over time', 'Five at a time, so you can go deep', 'Unlimited Friend Circles', '🟢 Green verification included', 'Parallel Lives'],
      cta: 'Go all in',
      ctaStyle: 'outline',
    },
  ];

  // Not a fourth tier competing with the others - it is the option for someone
  // who only wants the companions, and it comes free with everything above.
  const companions = {
    name: 'AI Companions',
    tagline: 'Companions only',
    color: 'var(--gradient)',
    monthly: { price: '£7.99', period: '/mo', note: null },
    yearly: { price: '£71.88', period: '/year', note: 'Save 25% against paying monthly' },
    features: ['25 AI companions', '500 messages a month', 'Voice responses', 'Games and reflective mode', 'Included free with every plan above'],
    cta: 'Start chatting',
  };

  function Card({ p, standalone }) {
    const price = yearly ? p.yearly : p.monthly;
    return (
      <div
        className="glass"
        style={{
          padding: 28,
          position: 'relative',
          border: p.highlight ? '1.5px solid rgba(34,211,238,0.3)' : undefined,
          width: standalone ? '100%' : undefined,
          maxWidth: standalone ? 360 : undefined,
        }}
      >
        {p.badge && (
          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 20, background: p.badgeColor, color: '#fff', whiteSpace: 'nowrap' }}>
            {p.badge}
          </div>
        )}
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>{p.tagline}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 38, fontWeight: 800 }}>{price.price}</span>
          <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>{price.period}</span>
        </div>
        {price.note && <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 6 }}>{price.note}</div>}
        <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {p.features.map((f, fi) => (
            <div key={fi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#CBD5E1' }}>
              <span style={{ color: 'var(--purple)', fontSize: 14, marginTop: 1 }}>✓</span>
              {f}
            </div>
          ))}
        </div>
        <a
          href="/get-started"
          className={p.ctaStyle === 'primary' ? 'btn-primary' : 'btn-outline'}
          style={{ width: '100%', padding: 12, fontSize: 13, textDecoration: 'none', display: 'block', textAlign: 'center' }}
        >
          {p.cta}
        </a>
      </div>
    );
  }

  return (
    <PageShell title="Simple, honest pricing" subtitle="PRICING" accent="#8B5CF6">
      <p style={{ marginBottom: 32, fontSize: 17 }}>
        Everyone starts with a 7-day free trial. Every paid plan includes green verification. No hidden fees. Cancel any time.
      </p>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div className="pricing-toggle">
          <button className={!yearly ? 'active' : ''} onClick={() => setYearly(false)}>Monthly</button>
          <button className={yearly ? 'active' : ''} onClick={() => setYearly(true)}>Yearly</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
        {plans.map((p, i) => <Card key={i} p={p} />)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Card p={companions} standalone />
      </div>

      <div style={{ marginTop: 48, padding: 24, borderRadius: 16, background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.2)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>What does green verification mean?</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          Every paid plan includes full verification: phone, email and government photo ID, checked with liveness detection.
          Because Riff shows you an illustrated avatar rather than a photograph until you both reveal, verification is what
          tells you someone is real before you ever see their face.
        </p>
      </div>
    </PageShell>
  );
}
