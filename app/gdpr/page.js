import PageShell from '../components/PageShell';
export const metadata = { title: "GDPR — Riff", description: "How Riff follows UK data protection law." };

// Written to match what the Riff app and backend actually do (October 2026).
// If a feature or provider changes, update this text in the same change.
const SECTIONS = [
  {
    "body": [
      "Riff is operated by Riff Apps Limited, a company registered in England and Wales, which is the controller of your personal information. We follow the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. This page is a short summary; the full detail is in our Privacy Policy."
    ]
  },
  {
    "h": "Our lawful bases",
    "body": [
      {
        "list": [
          {
            "b": "Contract:",
            "t": "to run your account, matching, messaging, calls, circles, AI features and purchases."
          },
          {
            "b": "Legitimate interests:",
            "t": "safety, verification, preventing fraud and fake accounts, fixing problems, and emailing account holders about news and offers (you can unsubscribe at any time)."
          },
          {
            "b": "Explicit consent:",
            "t": "for sensitive information - who you would like to meet (which can reveal sexual orientation) and the selfie and ID checks."
          },
          {
            "b": "Legal obligation:",
            "t": "keeping payment and tax records."
          }
        ]
      }
    ]
  },
  {
    "h": "Your rights",
    "body": [
      "You can ask for a copy of your information, have it corrected or deleted, restrict or object to its use, receive it in a portable format, and withdraw consent. Email privacy@riff-app.co.uk. We reply within one month. You can delete your account yourself in the app under Profile. You can also complain to the Information Commissioner's Office at ico.org.uk."
    ]
  },
  {
    "h": "Where your information goes",
    "body": [
      "We use service providers for hosting, AI features, verification, calls, payments, notifications and email. Some are outside the UK, in the European Union, the United States and China (Moonshot AI, which powers AI companions, Debate and Parallel Lives). The Privacy Policy lists every provider and what each receives."
    ]
  },
  {
    "h": "Deleting your data",
    "body": [
      "Deleting your account in the app removes your account and the information linked to it straight away. Safety reports and payment records are kept afterwards, as explained in the Privacy Policy. If you cannot get into the app, email privacy@riff-app.co.uk and we will delete your account within one month."
    ]
  },
  {
    "h": "Contact",
    "body": [
      "Data protection questions: privacy@riff-app.co.uk. ICO registration number ZC258314."
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

export default function GDPR() {
  return (
    <PageShell title="GDPR" subtitle="LEGAL" accent="#8B5CF6">
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
