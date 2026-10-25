import PageShell from '../components/PageShell';
export const metadata = { title: "Cookie Policy — Riff", description: "How Riff uses cookies and similar storage." };

// Written to match what the Riff app and backend actually do (October 2026).
// If a feature or provider changes, update this text in the same change.
const SECTIONS = [
  {
    "body": [
      "This page explains how the Riff website and app use cookies and similar storage."
    ]
  },
  {
    "h": "The website",
    "body": [
      "The Riff website does not use advertising cookies, analytics cookies, tracking pixels or any other tracking. It does not set cookies to identify you. If we ever add analytics or anything that is not strictly necessary, we will ask for your permission first and update this page."
    ]
  },
  {
    "h": "The app",
    "body": [
      "The Riff app does not use cookies. It stores your login token in your phone's secure storage so you stay signed in, and keeps a few settings on your device (for example, whether you have seen a tip). Signing out removes your login token. Deleting the app removes the rest."
    ]
  },
  {
    "h": "Questions",
    "body": [
      "Email privacy@riff-app.co.uk. Our Privacy Policy explains how we handle personal information more generally."
    ]
  }
];

const H2 = { fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 };
const P = { marginBottom: 16 };
const B = { color: 'var(--text-primary)' };
function Item({ item }) {
  if (typeof item === 'string') return <p style={P}>{item}</p>;
  if (item.list) return (
    <ul style={{ marginBottom: 16, paddingLeft: 22 }}>
      {item.list.map((li, i) => <li key={i} style={{ marginBottom: 8 }}>{typeof li === 'string' ? li : <><strong style={B}>{li.b}</strong> {li.t}</>}</li>)}
    </ul>
  );
  return <p style={P}><strong style={B}>{item.b}</strong> {item.t}</p>;
}

export default function CookiePolicy() {
  return (
    <PageShell title="Cookie policy" subtitle="LEGAL" accent="#8B5CF6">
      <p style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-dim)' }}>Last updated: October 2026</p>
      {SECTIONS.map((s, i) => (
        <div key={i}>
          {s.h ? <h2 style={H2}>{s.h}</h2> : null}
          {s.body.map((item, j) => <Item key={j} item={item} />)}
        </div>
      ))}
    </PageShell>
  );
}
