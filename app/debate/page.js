'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DEBATERS = [
  { key: 'sameer', name: 'Sameer', age: 44, subject: 'Comparative religion',
    blurb: 'Argues sincerely for the existence of God, and will tell you plainly where his own answer runs out.',
    colour: '#8B5CF6' },
  { key: 'rosa', name: 'Rosa', age: 38, subject: 'Political philosophy',
    blurb: 'Judges a society by how it treats the worst-off. Can state the case against her own position better than most of its supporters.',
    colour: '#EC4899' },
  { key: 'dev', name: 'Dev', age: 36, subject: 'AI and technology',
    blurb: 'Neither evangelist nor doomer, and impatient with both. Concedes the real harms because pretending otherwise weakens the case.',
    colour: '#84CC16' },
  { key: 'vera', name: 'Vera', age: 41, subject: 'Anything you bring',
    blurb: 'States your argument back at its strongest before she takes it apart. If she has it wrong, that is where the real debate starts.',
    colour: '#F59E0B' },
  { key: 'orin', name: 'Orin', age: 50, subject: 'Evidence and claims',
    blurb: 'Knows that some things called conspiracy theories turned out to be true, and that most did not. Attacks the claim, never the person.',
    colour: '#22D3EE' },
];

const CRITERIA = [
  ['Engagement', 'Did you answer their strongest point, or the easiest one?'],
  ['Concession', 'Did you give ground where you should have?'],
  ['Progression', 'Did the argument move, or did you restate?'],
  ['Evidence', 'Were your claims supported? Did you admit real uncertainty?'],
  ['Conduct', 'Did you argue about ideas rather than about the person?'],
];

export default function DebatePage() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ background: '#050816', minHeight: '100vh' }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: '80px 24px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'inline-block', padding: '6px 14px', borderRadius: 999, marginBottom: 20,
          background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)',
          fontSize: 12, fontWeight: 700, color: '#F59E0B', letterSpacing: 0.5,
        }}>
          NEW IN RIFF
        </div>

        <h1 style={{
          fontFamily: "'Sora', sans-serif", fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 800,
          color: '#F0ECE5', lineHeight: 1.05, letterSpacing: -1.5, marginBottom: 20, maxWidth: 760,
        }}>
          Think you can win<br />the argument?
        </h1>

        <p style={{ fontSize: 19, color: '#94A3B8', lineHeight: 1.7, maxWidth: 620, marginBottom: 12 }}>
          Pick a subject. Pick your side. Argue it out with someone who actually
          knows the material and will not simply agree with you.
        </p>
        <p style={{ fontSize: 19, color: '#94A3B8', lineHeight: 1.7, maxWidth: 620, marginBottom: 36 }}>
          Then a separate judge reads every word and tells you, honestly, who
          made the better case.
        </p>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 48 }}>
          {[['5', 'specialists'], ['15', 'exchanges'], ['Any', 'language'], ['1', 'impartial judge']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#8B5CF6', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {[
            ['/debate/debate-companions.jpg', 'Five specialists, waiting'],
            ['/debate/debate-exchange.jpg', 'A real argument, not a chat'],
            ['/debate/debate-list.jpg', 'Every debate, judged and kept'],
          ].map(([src, cap]) => (
            <figure key={src} style={{ margin: 0, flex: '1 1 260px', maxWidth: 320 }}>
              <div style={{
                borderRadius: 20, overflow: 'hidden',
                border: '1px solid rgba(139,92,246,0.3)',
                boxShadow: '0 18px 50px rgba(0,0,0,0.6)',
              }}>
                <Image src={src} alt={cap} width={640} height={1300}
                  style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <figcaption style={{ fontSize: 12.5, color: '#64748B', marginTop: 10, textAlign: 'center' }}>{cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: '60px 24px', background: '#080B14' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: '#F0ECE5', marginBottom: 12 }}>
            How a debate works
          </h2>
          <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 40, maxWidth: 560 }}>
            Four steps, and none of them involve anyone being polite about a bad argument.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
            {[
              ['01', 'Choose your opponent', 'Five specialists, each with a real temperament. Or Vera, who will take on anything.'],
              ['02', 'Set the topic', 'Bring your own, or let them suggest five. Nothing is off limits for being uncomfortable.'],
              ['03', 'Pick your side', 'Agree or disagree. They take the other. Speak your argument or type it.'],
              ['04', 'Get judged', 'A separate judge reads the lot and scores both sides. It will tell you when you won.'],
            ].map(([n, t, d]) => (
              <div key={n} style={{
                padding: 22, borderRadius: 16, background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#8B5CF6', letterSpacing: 1, marginBottom: 10 }}>{n}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F0ECE5', marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13.5, color: '#8B8B96', lineHeight: 1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE DEBATERS ═══ */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: '#F0ECE5', marginBottom: 12 }}>
            Who you are up against
          </h2>
          <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 36, maxWidth: 620 }}>
            Each one argues their side sincerely — and each one can be argued out
            of a point. A debater who cannot lose is not debating.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {DEBATERS.map(d => (
              <button
                key={d.key}
                onClick={() => setOpen(open === d.key ? null : d.key)}
                style={{
                  textAlign: 'left', cursor: 'pointer', padding: 0, border: 'none',
                  background: 'transparent', fontFamily: 'inherit',
                }}
              >
                <div style={{
                  borderRadius: 16, overflow: 'hidden', border: '2px solid ' + d.colour,
                  marginBottom: 12, aspectRatio: '1', position: 'relative',
                }}>
                  <Image src={'/debaters/' + d.key + '.jpg'} alt={d.name} width={512} height={512}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#F0ECE5' }}>
                  {d.name}<span style={{ fontSize: 13, fontWeight: 400, color: '#64748B' }}>{'  ' + d.age}</span>
                </div>
                <div style={{ fontSize: 12.5, color: d.colour, marginTop: 2, marginBottom: 6 }}>{d.subject}</div>
                <div style={{
                  fontSize: 13, color: '#8B8B96', lineHeight: 1.6,
                  maxHeight: open === d.key ? 200 : 0, overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  {d.blurb}
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
                  {open === d.key ? 'Less' : 'More'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE JUDGE ═══ */}
      <section style={{ padding: '60px 24px', background: '#080B14' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block', padding: '6px 14px', borderRadius: 999, marginBottom: 18,
            background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)',
            fontSize: 12, fontWeight: 700, color: '#22D3EE', letterSpacing: 0.5,
          }}>
            MEET ARBITER
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, color: '#F0ECE5', marginBottom: 14 }}>
            The judge never took part
          </h2>
          <p style={{ fontSize: 16.5, color: '#94A3B8', lineHeight: 1.75, marginBottom: 14 }}>
            Arbiter reads the whole debate from the outside and scores both sides
            on five things. It is not judging who is <em>right</em> — it is
            judging who argued better, which is a different question and often a
            different answer.
          </p>
          <p style={{ fontSize: 16.5, color: '#94A3B8', lineHeight: 1.75, marginBottom: 30 }}>
            It quotes your strongest moment back at you, names the point that
            decided it, and tells you one concrete thing to do better next time.
          </p>

          <div style={{ borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            {CRITERIA.map(([t, d], i) => (
              <div key={t} style={{
                display: 'flex', gap: 16, padding: '16px 20px',
                borderTop: i ? '1px solid rgba(255,255,255,0.06)' : 'none',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: '#22D3EE', minWidth: 110 }}>{t}</div>
                <div style={{ fontSize: 14, color: '#8B8B96', lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPEAK IT ═══ */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            ['🎤', 'Say it out loud', 'Speak your argument instead of typing it. Useful if you are practising for something real — an interview, a viva, a difficult conversation. They always reply in writing, so you get thinking time.'],
            ['🌍', 'In your own language', 'Argue in Urdu, Spanish, Arabic, Mandarin — whatever you think in. They will argue back in the same language, and tell you honestly if they cannot do it justice.'],
            ['⚖️', 'Nothing is off limits for being uncomfortable', 'Religion, politics, the Middle East, immigration. Real disagreements are uncomfortable. What ends a debate is how it is argued, not what it is about.'],
          ].map(([icon, t, d]) => (
            <div key={t} style={{
              padding: 26, borderRadius: 18, background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#F0ECE5', marginBottom: 8 }}>{t}</div>
              <div style={{ fontSize: 14, color: '#8B8B96', lineHeight: 1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section style={{ padding: '60px 24px', background: '#080B14' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 30, fontWeight: 700, color: '#F0ECE5', marginBottom: 14 }}>
            What it costs
          </h2>
          <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.75, marginBottom: 26 }}>
            Debate is not part of a subscription. Everyone gets{' '}
            <strong style={{ color: '#F0ECE5' }}>50 free debate messages</strong>{' '}
            to try it — separate from your monthly companion messages, so trying
            it costs you nothing you were already paying for.
          </p>

          <div style={{
            padding: 22, borderRadius: 16, marginBottom: 20,
            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)',
          }}>
            <div style={{ fontSize: 15, color: '#E2E8F0', lineHeight: 1.7 }}>
              After that, debate messages come out of your credit balance at{' '}
              <strong style={{ color: '#A78BFA' }}>2 credits each</strong>.
            </div>
            <div style={{ fontSize: 13.5, color: '#8B8B96', lineHeight: 1.7, marginTop: 10 }}>
              A debate costs more than a chat message because the debater carries
              the whole argument with it every turn, and the judge reads all of it
              at the end. Two credits is what that actually costs to run.
            </div>
          </div>

          <p style={{ fontSize: 14.5, color: '#64748B', lineHeight: 1.7 }}>
            Credits are bought in packs and never expire. A typical debate runs
            eight to twelve exchanges before it reaches its natural end.
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '70px 24px 90px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#F0ECE5', marginBottom: 14, letterSpacing: -0.8 }}>
          Go on then. Convince someone.
        </h2>
        <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
          Riff launches soon on iOS and Android. Debate comes with it.
        </p>
        <Link href="/get-started" style={{
          display: 'inline-block', padding: '16px 34px', borderRadius: 999,
          background: '#8B5CF6', color: '#fff', fontSize: 16, fontWeight: 700,
          textDecoration: 'none',
        }}>
          Get started
        </Link>
      </section>
    </div>
  );
}
