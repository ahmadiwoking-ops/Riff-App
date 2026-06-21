'use client';

import { useState } from 'react';
import Image from 'next/image';

const STAGES = [
  { num: '01', title: 'Answer questions', desc: '25 questions across values, emotions, humor, and dealbreakers. No swiping — just honest answers.', icon: '💭', color: '#8B5CF6' },
  { num: '02', title: 'Get matched', desc: 'Our algorithm finds people who think like you — not look like you. 72%+ compatibility required.', icon: '✦', color: '#EC4899' },
  { num: '03', title: 'Riff in text', desc: 'Message your match. Ask anything. No photos, no names — just pure personality.', icon: '💬', color: '#F59E0B' },
  { num: '04', title: 'Unlock voice', desc: 'Hear each other for the first time. Rate the connection. If both score 4/5+, the reveal unlocks.', icon: '🎙', color: '#22D3EE' },
  { num: '05', title: 'The reveal', desc: 'Both photos appear at the exact same moment. No power imbalance. Then choose: continue or let it fade.', icon: '📸', color: '#84CC16' },
];

const FEATURES = [
  {
    mode: 'Deep Connection', icon: '◎', color: '#22D3EE',
    tagline: 'One person. Full depth.',
    desc: 'Progress through 5 stages with a single match — text, voice, reveal, life stories, full connection. Designed for romance, mentorship, or a profound friendship.',
    highlights: ['Voice scoring system', 'Simultaneous photo reveal', 'Life chapters exchange', 'Full video unlock'],
  },
  {
    mode: 'Friend Circle', icon: '◍', color: '#84CC16',
    tagline: 'Four people. Real friendships.',
    desc: 'Matched with 4 compatible people simultaneously. Group question rounds reveal personalities before faces. Built for finding your tribe.',
    highlights: ['Group question rounds', '1:1 deep dives within circle', 'Mosaic photo reveal', 'Group chat + meetup calendar'],
  },
];

const SAFETY = [
  { icon: '🛡', title: 'ID verified', desc: 'Government ID + live selfie match. Every user is confirmed real.' },
  { icon: '🟢', title: 'Trust score', desc: 'Green, yellow, or red indicator. Cross-references claims against verified data.' },
  { icon: '🤖', title: 'Practice mode', desc: 'AI companions keep you engaged while we find your real match. Fully transparent.' },
  { icon: '⚑', title: 'Real-time safety', desc: '7-layer detection system monitors for harmful behaviour and protects every user.' },
  { icon: '🔐', title: 'Encrypted', desc: 'Photos and voice messages encrypted end-to-end. We can\'t see them. Nobody can.' },
  { icon: '👁', title: 'Liveness detection', desc: 'Photos require in-app capture with blink and head-turn verification. No catfishing.' },
];

const PRICING = [
  {
    tier: 'Single', priceM: '2.99', priceY: '3.99', color: '#EC4899', desc: '1 deep connection', isIntro: true,
    features: ['1 Deep Connection', '1 Friend Circle', '\u{1F7E2} Green verification included', 'Text + voice messaging', 'Photo reveal'],
    cta: 'Get started', yearLabel: '/6 months', introOffer: true,
  },
  {
    tier: 'Explorer', priceM: '5.99', priceY: '3.79', color: '#22D3EE', desc: 'More connections', popular: true,
    features: ['2 Deep Connections', '3 Friend Circles', '\u{1F7E2} Green verification included', 'Priority matching', 'Custom questions'],
    cta: 'Start exploring', yearLabel: '/mo',
  },
  {
    tier: 'Inner Circle', priceM: '11.99', priceY: '7.49', color: '#F59E0B', desc: 'Full experience',
    features: ['Unlimited connections', 'Unlimited circles', '\u{1F7E2} Green verification included', 'Circle analytics', 'Early access features'],
    cta: 'Go all in', yearLabel: '/mo',
  },
];

const FAQS = [
  { q: 'How is Riff different from dating apps?', a: 'Dating apps show you a photo and ask you to judge in seconds. Riff shows you nothing — you connect through questions, text, and voice before you ever see a face. By the time the photo reveal happens, you already know if you click. It\'s connection first, appearance second.' },
  { q: 'Is Riff only for dating?', a: 'No. Riff has two modes: Deep Connection (for romance, mentorship, or profound 1:1 friendship) and Friend Circle (for finding a group of 4 real friends). Many users use both simultaneously.' },
  { q: 'What\'s Practice Mode?', a: 'While we search for your real match, you\'ll connect with an AI companion that helps you explore the app and discover what matters to you in a conversation. It\'s fully transparent — you\'ll always know it\'s practice, and it naturally fades when your real match arrives.' },
  { q: 'How do you prevent catfishing?', a: 'Every user submits a government ID and takes a live selfie with liveness detection (blink and head-turn prompts). Photos in the app require in-app capture and pass reverse image search. Your Trust Score is visible to your matches.' },
  { q: 'What if I don\'t like my match after the photo reveal?', a: 'Both people independently choose \'Continue\' or \'Let it fade.\' If either person chooses to fade, the connection closes gracefully. Neither person knows who made the choice. No blame, no awkwardness.' },
  { q: 'Is my data safe?', a: 'Photos and voice messages are encrypted end-to-end. Your verified identity is never shared with other users — they only see your Trust Score colour. We comply with GDPR, California privacy laws, and the EU AI Act.' },
  { q: 'How much does it cost?', a: 'Single plan starts at £3.99 for 6 months (then £2.99/mo). Explorer (£5.99/mo) adds more connections and priority matching. Inner Circle (£11.99/mo) unlocks everything. Try the bot companion free before subscribing.' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Home() {
  const [mobileNav, setMobileNav] = useState(false);
  const [faqOpen, setFaqOpen] = useState(-1);
  const [billing, setBilling] = useState('monthly');

  const NAV_ITEMS = [
    { label: 'How it works', id: 'how' },
    { label: 'Features', id: 'features' },
    { label: 'Safety', id: 'safety' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      {/* ═══ NAVIGATION ═══ */}
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-logo" onClick={() => scrollTo('hero')}>
            <Image src="/logo.png" alt="Riff" width={32} height={32} style={{ borderRadius: 8 }} />
            <span className="nav-logo-text">Riff</span>
          </a>
          <div className="nav-links">
            {NAV_ITEMS.map((n) => (
              <button key={n.id} className="nav-link" onClick={() => scrollTo(n.id)}>{n.label}</button>
            ))}
            <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>Download app</button>
          </div>
          <button className="nav-hamburger" onClick={() => setMobileNav(!mobileNav)}>
            <span /><span /><span />
          </button>
        </div>
        <div className={`nav-mobile ${mobileNav ? 'open' : ''}`}>
          {NAV_ITEMS.map((n) => (
            <button key={n.id} className="nav-link" onClick={() => { scrollTo(n.id); setMobileNav(false); }} style={{ textAlign: 'left', padding: '12px 0' }}>{n.label}</button>
          ))}
          <button className="btn-primary" style={{ marginTop: 8, width: '100%', padding: 12 }}>Download app</button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section" style={{ paddingTop: 100, paddingBottom: 100 }}>
          <div className="hero-grid" style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
            <div style={{ flex: 1 }}>
              <div className="section-label gradient-text">The connection app</div>
              <h1 className="hero-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 52, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 20 }}>
                Understand someone<br /><span className="gradient-text">before you see them.</span>
              </h1>
              <p className="section-sub" style={{ marginBottom: 32 }}>
                Riff matches you through questions, voice, and trust — not photos and swipes. Find deep connections and real friendships with people who think like you.
              </p>
              <div className="hero-btns" style={{ display: 'flex', gap: 12 }}>
                <a href="/try-bot" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>Try Riff Demo Free</a>
                <button className="btn-outline" onClick={() => scrollTo('how')}>See how it works</button>
              </div>
              <div className="hero-stats" style={{ display: 'flex', gap: 24, marginTop: 32 }}>
                {[['10K+', 'Active users'], ['4.9★', 'App Store'], ['152', 'Countries']].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{s[0]}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{s[1]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hide-mobile" style={{ flex: 0.7, display: 'flex', justifyContent: 'center' }}>
              <div className="phone-frame">
                <div className="phone-screen">
                  <div style={{ padding: '16px 16px 10px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Image src="/logo.png" alt="" width={20} height={20} style={{ borderRadius: 5 }} />
                      <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Riff</span>
                    </div>
                  </div>
                  <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ textAlign: 'center', margin: '8px 0' }}>
                      <span style={{ fontSize: 9, color: 'var(--text-dim)', background: '#1a1f30', padding: '3px 10px', borderRadius: 10 }}>A new riff found</span>
                    </div>
                    <div style={{ alignSelf: 'flex-start', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '12px 12px 12px 4px', fontSize: 11, lineHeight: 1.5, maxWidth: '85%', color: '#CBD5E1' }}>
                      hey. your answer about what matters in a deep connection really stayed with me. what made you choose that one?
                    </div>
                    <div style={{ alignSelf: 'flex-end', background: 'var(--cyan)', padding: '8px 12px', borderRadius: '12px 12px 4px 12px', fontSize: 11, lineHeight: 1.5, maxWidth: '85%', color: '#000' }}>
                      I think because when someone just gets you without explanation... that&apos;s everything.
                    </div>
                    <div style={{ alignSelf: 'flex-start', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '12px 12px 12px 4px', fontSize: 11, lineHeight: 1.5, maxWidth: '85%', color: '#CBD5E1' }}>
                      hmm. yeah. there&apos;s a word for that feeling — saudade. what you described feels adjacent to that somehow.
                    </div>
                    <div style={{ alignSelf: 'flex-start', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '12px 12px 12px 4px', fontSize: 10, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                      sorry that was a lot for a second message lol
                    </div>
                  </div>
                  <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, height: 32, borderRadius: 10, background: 'var(--bg-surface)', border: '1px solid var(--border)' }} />
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff' }}>→</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" style={{ background: '#080B14' }}>
        <div className="section">
          <div className="section-label" style={{ color: 'var(--purple)' }}>How Riff works</div>
          <h2 className="section-title">Five stages to a real connection</h2>
          <p className="section-sub" style={{ marginBottom: 48 }}>No swiping. No judging photos. You earn the reveal through genuine conversation.</p>
          <div>
            {STAGES.map((s, i) => (
              <div key={i} className="stage-row" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '28px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <div style={{ minWidth: 60 }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800, color: s.color, opacity: 0.3 }}>{s.num}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 600 }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 500 }}>{s.desc}</p>
                </div>
                <div className="hide-mobile" style={{ width: 4, height: 60, borderRadius: 2, background: s.color, opacity: 0.4 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ background: 'linear-gradient(180deg, #080B14 0%, #0a0e1a 100%)' }}>
        <div className="section">
          <div className="section-label" style={{ color: 'var(--pink)' }}>Two ways to connect</div>
          <h2 className="section-title">Deep bonds or friend groups. You choose.</h2>
          <p className="section-sub" style={{ marginBottom: 48 }}>Run both modes simultaneously. Find love and friendship in the same app.</p>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="glass" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: f.color }} />
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 4, color: f.color }}>{f.mode}</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>{f.tagline}</div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {f.highlights.map((h, hi) => (
                    <div key={hi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#CBD5E1' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SAFETY ═══ */}
      <section id="safety" style={{ background: 'var(--bg-primary)' }}>
        <div className="section">
          <div className="section-label" style={{ color: 'var(--green)' }}>Trust and safety</div>
          <h2 className="section-title">No fakes. No filters. No shortcuts.</h2>
          <p className="section-sub" style={{ marginBottom: 48 }}>Every person on Riff is verified. Every conversation is protected. Every connection is earned.</p>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {SAFETY.map((s, i) => (
              <div key={i} className="glass" style={{ padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRACTICE MODE ═══ */}
      <section style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0a0520 50%, var(--bg-primary) 100%)' }}>
        <div className="section" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div className="section-label" style={{ color: 'var(--amber)' }}>Practice mode</div>
            <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Never alone while you wait</h2>
            <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32 }}>
              While we search for your perfect match, you&apos;ll riff with an AI companion to explore the app and discover what matters to you. Fully transparent — you&apos;ll always know — and it fades naturally when the real thing arrives.
            </p>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: '10 unique personas', sub: 'Diverse personalities, backgrounds, and communication styles' },
                { label: 'Psychology-informed', sub: 'Responses grounded in conversation research and human behaviour' },
                { label: 'Always safe', sub: '7-layer safety system detects and handles harmful interactions' },
              ].map((p, i) => (
                <div key={i} className="glass" style={{ padding: '20px 24px', flex: '1 1 180px', maxWidth: 220, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5 }}>{p.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ background: 'var(--bg-primary)' }}>
        <div className="section">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ color: 'var(--cyan)' }}>Pricing</div>
            <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Plans from £2.99/month. Try Riff Demo Free.</h2>
            <div className="pricing-toggle">
              <button className={billing === 'monthly' ? 'active' : ''} onClick={() => setBilling('monthly')}>Monthly</button>
              <button className={billing === 'yearly' ? 'active' : ''} onClick={() => setBilling('yearly')}>
                6 months+ <span style={{ fontSize: 11, color: 'var(--green)', marginLeft: 4 }}>Best value</span>
              </button>
            </div>
          </div>
          <div className="grid-3 pricing-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {PRICING.map((p, i) => {
              const price = billing === 'monthly' ? p.priceM : p.priceY;
              return (
                <div key={i} className="glass" style={{ padding: 28, position: 'relative', border: p.popular ? '1.5px solid rgba(34,211,238,0.3)' : undefined }}>
                  {p.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 20, background: 'var(--gradient)', color: '#fff', whiteSpace: 'nowrap' }}>Most popular</div>}
                  {p.introOffer && billing === 'yearly' && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 600, padding: '4px 14px', borderRadius: 20, background: '#EC4899', color: '#fff', whiteSpace: 'nowrap' }}>Special offer</div>}
                  <div style={{ fontSize: 14, fontWeight: 600, color: p.color, marginBottom: 4 }}>{p.tier}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>{p.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                    {/* Price display */}
                  <div>
                        {p.isIntro && billing === 'yearly' ? (
                          <>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 800 }}>£3.99</span>
                            <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>/6 months</span>
                          </>
                        ) : (
                          <>
                            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 800 }}>£{price}</span>
                            <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>{billing === 'yearly' ? (p.yearLabel || '/mo') : '/mo'}</span>
                          </>
                        )}
                      </div>
                  </div>
                  {billing === 'yearly' && !p.isIntro && (
                    <div style={{ fontSize: 12, color: 'var(--green)', marginBottom: 8 }}>Billed annually</div>
                  )}
                  {p.isIntro && billing === 'yearly' && (
                    <div style={{ fontSize: 12, color: '#EC4899', marginBottom: 8 }}>Then £2.99/month or £29.88/year</div>
                  )}
                  {p.isIntro && billing === 'monthly' && (
                    <div style={{ fontSize: 12, color: '#EC4899', marginBottom: 8 }}>Start with £3.99 for your first 6 months</div>
                  )}
                  <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {p.features.map((f, fi) => (
                      <div key={fi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#CBD5E1' }}>
                        <span style={{ color: p.color, fontSize: 14, marginTop: 1 }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <a href="/get-started" className={p.popular ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', padding: 12, fontSize: 13, textDecoration: 'none' }}>{p.cta}</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" style={{ background: '#080B14' }}>
        <div className="section">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ color: 'var(--purple)' }}>FAQ</div>
            <h2 className="section-title">Common questions</h2>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}>
                <div className="faq-question">
                  <h3>{f.q}</h3>
                  <div className="faq-toggle" style={{ transform: faqOpen === i ? 'rotate(45deg)' : 'none' }}>+</div>
                </div>
                {faqOpen === i && <div className="faq-answer">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ background: 'var(--bg-primary)' }}>
        <div className="section" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 32px', borderRadius: 28, background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(34,211,238,0.08))', border: '1px solid var(--border)' }}>
            <Image src="/logo.png" alt="Riff" width={56} height={56} style={{ borderRadius: 14, marginBottom: 20 }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.5px' }}>Ready to riff?</h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
              Start from £2.99/month. Answer questions. Discover someone real.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary">🍎 App Store</button>
              <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #22D3EE, #3B82F6)' }}>▶ Google Play</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: '1px solid var(--border)', background: '#030610' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 32px' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Image src="/logo.png" alt="Riff" width={28} height={28} style={{ borderRadius: 7 }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800 }}>Riff</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 280 }}>
                Understand someone before you see them. Real connections through questions, voice, and trust.
              </p>
            </div>
            {[
              { title: 'Product', links: [
                { label: 'How it works', href: '/how-it-works' },
                { label: 'Deep Connection', href: '/deep-connection' },
                { label: 'Friend Circle', href: '/friend-circle' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Safety', href: '/safety' },
              ]},
              { title: 'Company', links: [
                { label: 'About us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Careers', href: '/careers' },
                { label: 'Press', href: '/press' },
                { label: 'Contact', href: '/contact' },
              ]},
              { title: 'Legal', links: [
                { label: 'Privacy policy', href: '/privacy-policy' },
                { label: 'Terms of service', href: '/terms-of-service' },
                { label: 'Cookie policy', href: '/cookie-policy' },
                { label: 'GDPR', href: '/gdpr' },
                { label: 'AI transparency', href: '/ai-transparency' },
              ]},
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: 'var(--text-secondary)' }}>{col.title}</div>
                {col.links.map((l, li) => (
                  <a key={li} href={l.href} style={{ display: 'block', fontSize: 13, color: 'var(--text-dim)', padding: '5px 0', textDecoration: 'none' }}>{l.label}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 12, color: '#475569' }}>© 2026 Riff. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Twitter', 'Instagram', 'TikTok', 'LinkedIn'].map((s, i) => (
                <span key={i} style={{ fontSize: 12, color: '#475569', cursor: 'pointer' }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
