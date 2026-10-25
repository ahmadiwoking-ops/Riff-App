import PageShell from '../components/PageShell';
export const metadata = { title: "Privacy Policy — Riff", description: "How Riff collects, uses, shares and protects your personal information." };

// Written to match what the Riff app and backend actually do (October 2026).
// If a feature or provider changes, update this text in the same change.
const SECTIONS = [
  {
    "body": [
      "This policy explains what personal information Riff collects, what we do with it, who we share it with, how long we keep it, and the choices and rights you have. We have tried to write it plainly and to describe exactly what the app does today.",
      {
        "b": "Who we are.",
        "t": "Riff is operated by Riff Apps Limited, a company registered in England and Wales. Riff Apps Limited is the \"controller\" of your personal information, which means we decide how it is used and are responsible for protecting it. We are registered with the Information Commissioner's Office (ICO), registration number ZC258314."
      },
      {
        "b": "Contact.",
        "t": "For anything about your data, email privacy@riff-app.co.uk. This is also how to reach us about any right described below."
      },
      {
        "b": "Age.",
        "t": "Riff is only for people aged 18 and over. We do not knowingly collect information from anyone under 18, and we close accounts that we find belong to someone under 18."
      }
    ]
  },
  {
    "h": "1. Information we collect",
    "body": [
      {
        "b": "Account information.",
        "t": "Your email address, password (stored only as a secure one-way hash, never in readable form), alias (the name other people see), age, gender, who you would like to meet, the kind of connection you are looking for, country, language, and the town or area you choose."
      },
      {
        "b": "Your matching answers.",
        "t": "Your answers to the Riff questionnaire, used to suggest compatible people. Your individual answers are not shown to other users."
      },
      {
        "b": "Profile and reveal photos.",
        "t": "Photos you take or add in the app, including your display photo and the photo taken at a reveal. The first reveal photo is kept as a fixed reference so we can spot fake or swapped profiles."
      },
      {
        "b": "Verification.",
        "t": "If you choose to verify your account:"
      },
      {
        "list": [
          {
            "b": "Selfie check:",
            "t": "we keep the selfie you take as a reference for your account until you delete it. It is visible only to the Riff safety team, not to other users."
          },
          {
            "b": "ID check:",
            "t": "carried out by Veriff. You scan your ID and face in Veriff's service. Veriff tells us whether the check passed. We do not receive or store a copy of your ID document."
          },
          {
            "b": "Phone check:",
            "t": "your phone number, verified by a text-message code sent through Twilio."
          }
        ]
      },
      {
        "b": "What you share with other people.",
        "t": "Messages, voice messages, photos, \"life chapters\", answers in circle games and rounds, votes and voice ratings. These are stored on our servers so they can be delivered and shown in your conversations."
      },
      {
        "b": "Video calls.",
        "t": "Calls are connected through Twilio Video (and, for some calls, Jitsi Meet). We do not record calls."
      },
      {
        "b": "AI companions, Debate and Parallel Lives.",
        "t": "What you write or say to Riff's AI features, the replies, and short notes the AI keeps so companions remember earlier conversations. See section 3 for which AI providers are used."
      },
      {
        "b": "Payments.",
        "t": "Your plan, when it renews or ends, your message credit balance, and a record of each purchase. Card details are handled by Apple (in the app) or Stripe (on our website). We never see or store your card number."
      },
      {
        "b": "Device and technical information.",
        "t": "The IP address you signed up from and an approximate location worked out from it (town or region level), a push-notification token if you allow notifications, your notification settings, when you were last active, and standard server logs (such as IP address and the time of each request)."
      },
      {
        "b": "Safety reports.",
        "t": "If you report someone, or someone reports you, we keep the report, the content reported and our decision."
      },
      {
        "b": "Emails.",
        "t": "Whether you have unsubscribed from news and offers, and a record of which of our emails were sent to you."
      },
      {
        "b": "What we do not collect.",
        "t": "Riff does not access your device's GPS location, contacts or photo library beyond photos you choose to share. We do not use advertising identifiers, analytics or tracking tools, and we do not sell your information."
      }
    ]
  },
  {
    "h": "2. How we use it, and our legal reasons",
    "body": [
      "UK data protection law requires a legal reason (\"lawful basis\") for each use of personal information. Ours are:",
      {
        "list": [
          {
            "b": "To provide Riff (contract):",
            "t": "creating your account, matching you, delivering messages, calls and circles, running AI features, processing purchases and plans, and sending account emails such as password resets and email confirmation."
          },
          {
            "b": "To keep Riff safe (legitimate interests):",
            "t": "verification, preventing fake and duplicate accounts, investigating reports, banning accounts that break our rules, protecting against fraud and misuse (including using your sign-up IP address and approximate location), and fixing problems."
          },
          {
            "b": "Sensitive information (your explicit consent):",
            "t": "who you would like to meet can reveal your sexual orientation, and the selfie and ID checks involve your face. The law treats this as special information. We use it only to match you and to verify you, and you can withdraw consent by deleting the information or your account."
          },
          {
            "b": "News and offers (legitimate interests):",
            "t": "we may email account holders about new Riff features and offers. Every one of these emails has an unsubscribe link, and you can opt out at any time. Unsubscribing does not stop essential account emails."
          },
          {
            "b": "Legal obligations:",
            "t": "keeping payment and tax records, and responding to lawful requests from authorities."
          }
        ]
      }
    ]
  },
  {
    "h": "3. Who we share it with",
    "body": [
      "We share personal information only with the service providers below, only as much as each needs to do its job, and never for their own advertising. Several are outside the UK (see section 4).",
      {
        "list": [
          {
            "b": "Railway",
            "t": "(hosting our servers and database) and Vercel (hosting our website)."
          },
          {
            "b": "Moonshot AI (Kimi)",
            "t": "- powers AI companions, Debate, Parallel Lives and companion memory. Receives what you write to these features and the conversation needed to reply. Moonshot AI is based in China."
          },
          {
            "b": "OpenAI",
            "t": "- turns your voice into text when you speak in Debate, and turns some AI replies into speech. Receives the audio or text concerned."
          },
          {
            "b": "xAI",
            "t": "- turns some AI companion replies into speech. Receives the reply text."
          },
          {
            "b": "Anthropic",
            "t": "- powers the practice chat. Receives the messages you send to the practice bot."
          },
          {
            "b": "Veriff",
            "t": "- ID verification."
          },
          {
            "b": "Twilio",
            "t": "- text-message codes for phone verification, and video calls. Jitsi Meet (operated by 8x8) is used for some video calls."
          },
          {
            "b": "Apple and RevenueCat",
            "t": "- in-app purchases. RevenueCat receives your Riff account ID and your purchase history so we can apply what you bought."
          },
          {
            "b": "Stripe",
            "t": "- payments made on our website."
          },
          {
            "b": "Expo, Apple and Google",
            "t": "- delivering push notifications to your phone."
          },
          {
            "b": "Resend",
            "t": "- sending our emails (receives your email address and the email). Replies to us are received through Microsoft 365."
          },
          {
            "b": "ip-api.com",
            "t": "- receives your sign-up IP address to return an approximate location."
          }
        ]
      },
      "Text read aloud in Debate uses your phone's own voices and never leaves your device. Other users see what you choose to share with them: your alias, profile, messages and photos at the stages the app describes. We may also disclose information if the law requires it, to protect someone from serious harm, or to a buyer if Riff is ever sold (in which case this policy would continue to apply)."
    ]
  },
  {
    "h": "4. Information sent outside the UK",
    "body": [
      "Some providers above store or process information outside the UK, including in the European Union, the United States and China. Where the UK has recognised a country's protections as adequate (such as the EU, and US companies certified under the UK-US data bridge), we rely on that. Otherwise we rely on the provider's contractual data protection terms. Data protection law in some countries, including China, is weaker than in the UK. If you would rather not have your words processed by Moonshot AI, avoid AI companions, Debate and Parallel Lives - the rest of Riff does not use it."
    ]
  },
  {
    "h": "5. How long we keep it",
    "body": [
      {
        "list": [
          {
            "b": "While your account is open",
            "t": "we keep your account information, photos, selfie, matching answers, messages, voice messages and AI conversations. We do not currently delete conversations automatically."
          },
          {
            "b": "When you delete your account",
            "t": "we delete your account and the information linked to it, including your messages, voice messages, photos, verification selfie, matching answers, connections, circles and AI conversations."
          },
          {
            "b": "What we keep after deletion:",
            "t": "safety reports (with the alias and email address from the time of the report), so we can stop banned people from returning and respond to the authorities; and payment records, which the law requires us to keep for up to six years. Apple, Stripe and RevenueCat also keep their own purchase records."
          },
          {
            "b": "Server logs",
            "t": "are kept by our hosting provider for a limited period and then overwritten."
          }
        ]
      }
    ]
  },
  {
    "h": "6. Your rights",
    "body": [
      "Under UK data protection law you have the right to:",
      {
        "list": [
          "get a copy of the personal information we hold about you;",
          "have inaccurate information corrected;",
          "have your information deleted (you can delete your account yourself in the app, under Profile);",
          "restrict or object to how we use it, including objecting to news and offers at any time;",
          "receive your information in a portable format;",
          "withdraw consent where we rely on it."
        ]
      },
      "Email privacy@riff-app.co.uk to use any of these rights. We may ask you to confirm it is your account. We reply within one month. You also have the right to complain to the Information Commissioner's Office at ico.org.uk, though we would appreciate the chance to put things right first."
    ]
  },
  {
    "h": "7. Safety and moderation",
    "body": [
      "Messages between people are not read automatically. The Riff safety team may read a conversation, and view photos or the verification selfie, when someone reports it or when we need to investigate a safety concern. Messages you send to AI companions and the practice chat are automatically checked for signs of danger (for example, someone at risk of harm, or someone under 18), and a possible concern is flagged to our safety team."
    ]
  },
  {
    "h": "8. Security",
    "body": [
      "Information travels between the app and our servers over encrypted connections. Passwords are stored only as secure hashes. Access to personal information is limited to the people who need it to run and protect Riff. Messages are not end-to-end encrypted: they are stored on our servers so they can be delivered and so reports can be investigated. No system is perfectly secure; if a breach puts you at risk, we will tell you and the ICO as the law requires."
    ]
  },
  {
    "h": "9. Changes to this policy",
    "body": [
      "We will update this policy when the app changes. If a change materially affects how we use your information, we will tell you in the app or by email before it takes effect. The date at the top shows when it was last updated."
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

export default function PrivacyPolicy() {
  return (
    <PageShell title="Privacy policy" subtitle="LEGAL" accent="#8B5CF6">
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
