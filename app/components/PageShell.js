'use client';
import Link from 'next/link';

const FOOTER_COLS = [
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
];

export default function PageShell({ children, title, subtitle, accent }) {
  const accentColor = accent || 'var(--purple)';
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img src="/logo.png" alt="Riff" width={32} height={32} style={{ borderRadius: 8 }} />
            <span className="nav-logo-text">Riff</span>
          </Link>
          <div className="nav-links">
            <Link href="/#how" className="nav-link">How it works</Link>
            <Link href="/#safety" className="nav-link">Safety</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/try-bot" className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }}>Try Riff Demo Free</Link>
          </div>
        </div>
      </nav>

      <main>
        <div className="section" style={{ paddingTop: 60, paddingBottom: 40 }}>
          <div style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ color: accentColor }}>{subtitle}</div>
            <h1 className="section-title" style={{ fontSize: 42, marginBottom: 0 }}>{title}</h1>
          </div>
        </div>
        <div className="section" style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: 720, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {children}
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', marginTop: 40 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 32px' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, marginBottom: 32 }}>
            <div className="footer-brand">
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text-primary)', marginBottom: 12 }}>
                <img src="/logo.png" alt="Riff" width={28} height={28} style={{ borderRadius: 6 }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800 }}>Riff</span>
              </Link>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>Understand someone before you see them.</p>
            </div>
            {FOOTER_COLS.map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14, color: 'var(--text-secondary)' }}>{col.title}</div>
                {col.links.map((l, li) => (
                  <Link key={li} href={l.href} style={{ display: 'block', fontSize: 13, color: 'var(--text-dim)', padding: '5px 0', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseOut={e => e.target.style.color = 'var(--text-dim)'}>{l.label}</Link>
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
