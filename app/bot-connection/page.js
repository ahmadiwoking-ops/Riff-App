'use client';
import Link from 'next/link';

const PERSONAS = [
  { alias: 'Zara', age: 36, flag: '🇬🇧', role: 'Startup CEO', img: '/personas/zara.png', color: '#0EA5E9', bio: 'Serial entrepreneur who sold her first company at 28. Now mentors founders through the chaos of building something from nothing.', helps: 'Business strategy, fundraising, leadership' },
  { alias: 'Naia', age: 31, flag: '🇺🇸', role: 'Clinical Psychologist', img: '/personas/naia.png', color: '#A855F7', bio: 'Warm, insightful therapist specialising in anxiety, identity and emotional growth. A safe space to think out loud.', helps: 'Mental wellbeing, self-reflection, stress' },
  { alias: 'Oscar', age: 40, flag: '🇲🇽', role: 'Football Legend', img: '/personas/oscar.png', color: '#22C55E', bio: 'Retired La Liga pro who now runs a youth academy. Full of hard-won wisdom about discipline, setbacks and staying grounded.', helps: 'Discipline, motivation, resilience' },
  { alias: 'Maya', age: 28, flag: '🇺🇸', role: 'Human Rights Lawyer', img: '/personas/maya.png', color: '#6366F1', bio: 'Sharp, principled advocate who left corporate law to fight for what matters. Direct, brave, and endlessly thoughtful.', helps: 'Critical thinking, ethics, advocacy' },
  { alias: 'Luna', age: 27, flag: '🇵🇹', role: 'Bookshop Owner', img: '/personas/luna.png', color: '#EC4899', bio: 'Runs a tiny bookshop in Lisbon. Warm, curious and poetic — the friend who asks the questions that make you think.', helps: 'Reflection, creativity, perspective' },
  { alias: 'Aisha', age: 32, flag: '🇦🇪', role: 'Finance Director', img: '/personas/aisha.png', color: '#F59E0B', bio: 'Polished, precise investment strategist who reads markets like stories. Calm under pressure, generous with knowledge.', helps: 'Finance, investing, career growth' },
  { alias: 'Felix', age: 35, flag: '🇩🇪', role: 'Head Chef', img: '/personas/felix.png', color: '#EF4444', bio: 'Runs a Michelin-tipped kitchen in Berlin. Passionate, exacting and surprisingly philosophical about craft and patience.', helps: 'Craft, creativity, discipline' },
  { alias: 'Sam', age: 29, flag: '🇳🇬', role: 'Sports Coach', img: '/personas/sam.png', color: '#10B981', bio: 'Youth football coach and personal trainer. High-energy, motivating, and always in your corner pushing you to be better.', helps: 'Fitness, motivation, goal-setting' },
];

const BENEFITS = [
  { icon: '🎯', title: 'Career Development', color: '#0EA5E9', points: ['Practise interviews with a CEO or hiring manager persona', 'Get feedback on business ideas from an entrepreneur', 'Learn negotiation, leadership and strategy through conversation', 'Explore a career change with someone who has been there'] },
  { icon: '🧠', title: 'Mental Wellbeing', color: '#A855F7', points: ['A judgement-free space to talk through what is on your mind', 'Practise difficult conversations before you have them', 'Reflect on your goals with a thoughtful listener', 'Build confidence in social interaction at your own pace'] },
  { icon: '🌱', title: 'Personal Growth', color: '#84CC16', points: ['Learn new subjects from experts in their field', 'Get motivated by an athlete or coach persona', 'Explore philosophy, creativity and big ideas', 'Develop discipline and accountability through daily check-ins'] },
  { icon: '💬', title: 'Everyday Connection', color: '#EC4899', points: ['Someone to talk to any time, day or night', 'Play games, share stories, or just have a laugh', 'Combat loneliness with genuine, flowing conversation', 'Voice replies that make it feel like a real call'] },
];

export default function BotConnectionPage() {
  return (
    <div style={{ background: 'var(--bg, #0A0E18)', color: 'var(--text-primary, #F0ECE5)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 0', textAlign: 'left' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#8B8B96', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to home
        </Link>
      </section>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 20, background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.3)', marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#EC4899', letterSpacing: 0.5 }}>✦ BOT CONNECTION</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 52, fontWeight: 800, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
          Conversations so real,<br />you'll forget they're AI
        </h1>
        <p style={{ fontSize: 20, color: '#8B8B96', maxWidth: 640, margin: '0 auto 16px', lineHeight: 1.5 }}>
          Riff's AI companions are not chatbots. They are fully-realised characters with careers, personalities, opinions and voices — designed to talk with you like a real human being would.
        </p>
        <p style={{ fontSize: 16, color: '#6A6A72', maxWidth: 580, margin: '0 auto 32px', lineHeight: 1.6 }}>
          Every companion remembers your conversations, responds with genuine warmth and depth, and even speaks back in their own unique voice. It is the closest thing to messaging a real person — available whenever you need it.
        </p>
        <Link href="/get-started" style={{ display: 'inline-block', padding: '16px 36px', borderRadius: 14, background: '#EC4899', color: '#fff', fontSize: 17, fontWeight: 700, textDecoration: 'none' }}>
          Start chatting free
        </Link>
        <p style={{ fontSize: 13, color: '#4A4A54', marginTop: 14 }}>5 companions free · No card needed</p>
      </section>

      {/* Realistic conversation section */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 30, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Like texting a real person</h2>
          <p style={{ fontSize: 16, color: '#8B8B96', textAlign: 'center', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Our companions are powered by advanced AI and crafted with detailed personalities. They have moods, memories, humour and depth. They ask you questions back. They remember what you told them yesterday. They feel real because they are designed to.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div style={{ padding: 20, borderRadius: 16, background: 'rgba(236,72,153,0.04)', border: '1px solid rgba(236,72,153,0.15)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🎙️</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Real voice replies</h3>
              <p style={{ fontSize: 14, color: '#8B8B96', lineHeight: 1.5 }}>Each companion has their own distinct voice. Hear them speak, not just read text.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.15)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🧠</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>They remember</h3>
              <p style={{ fontSize: 14, color: '#8B8B96', lineHeight: 1.5 }}>Conversations continue where you left off. Your companion recalls your story.</p>
            </div>
            <div style={{ padding: 20, borderRadius: 16, background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.15)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🎮</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Play together</h3>
              <p style={{ fontSize: 14, color: '#8B8B96', lineHeight: 1.5 }}>Trivia, Would You Rather, 20 Questions, storytelling and more built in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the personas */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 34, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Meet a few of your companions</h2>
        <p style={{ fontSize: 16, color: '#8B8B96', textAlign: 'center', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
          20 unique personas, each with a real career, a distinct personality, and their own way of talking. Here are just a few.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {PERSONAS.map((p) => (
            <div key={p.alias} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ height: 200, overflow: 'hidden', background: '#1a1a2e' }}>
                <img src={p.img} alt={p.alias} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }} />
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: p.color }}>{p.alias}</h3>
                  <span style={{ fontSize: 14, color: '#6A6A72' }}>{p.flag} {p.age}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#8B8B96', marginBottom: 10 }}>{p.role}</div>
                <p style={{ fontSize: 14, color: '#8B8B96', lineHeight: 1.5, marginBottom: 12 }}>{p.bio}</p>
                <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 12, color: '#6A6A72' }}>Helps with: </span>
                  <span style={{ fontSize: 12, color: p.color, fontWeight: 600 }}>{p.helps}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: 15, color: '#6A6A72', marginTop: 32 }}>
          ...plus 12 more, including a marine biologist, a K-pop artist, a fashion designer, an architect and a sound engineer.
        </p>
      </section>

      {/* Benefits */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 34, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>More than conversation</h2>
        <p style={{ fontSize: 16, color: '#8B8B96', textAlign: 'center', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Your companions are here to help you grow, reflect and feel supported — in whatever way you need.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {BENEFITS.map((b) => (
            <div key={b.title} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: b.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{b.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: b.color }}>{b.title}</h3>
              </div>
              {b.points.map((pt, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: b.color, fontSize: 14 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#C8C4BE', lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* How to use it well */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px' }}>
        <div style={{ background: 'rgba(236,72,153,0.04)', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 24, padding: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 28 }}>Tips to get the most from your companion</h2>
          {[
            { n: '1', t: 'Be specific about what you need', d: 'Tell your companion if you want advice, a sounding board, or just a chat. They adapt to what you are looking for.' },
            { n: '2', t: 'Use the right persona for the moment', d: 'Talking through a career move? Pick Zara or Aisha. Need to decompress? Naia or Luna. Want motivation? Oscar or Sam.' },
            { n: '3', t: 'Switch to Reflect mode for depth', d: 'Reflect mode turns your companion into a thoughtful guide for deeper, more meaningful conversations.' },
            { n: '4', t: 'Come back regularly', d: 'Because your companion remembers, the relationship builds over time. Daily check-ins create real continuity.' },
          ].map((tip) => (
            <div key={tip.n} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: '#EC4899', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>{tip.n}</div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{tip.t}</h3>
                <p style={{ fontSize: 14, color: '#8B8B96', lineHeight: 1.5 }}>{tip.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '20px 24px 100px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Meet your first companion today</h2>
        <p style={{ fontSize: 17, color: '#8B8B96', marginBottom: 28, lineHeight: 1.6 }}>
          Start with five companions completely free. Upgrade any time to unlock all 20, plus 500 messages a month and voice replies.
        </p>
        <Link href="/get-started" style={{ display: 'inline-block', padding: '16px 36px', borderRadius: 14, background: '#EC4899', color: '#fff', fontSize: 17, fontWeight: 700, textDecoration: 'none' }}>
          Start chatting free
        </Link>
      </section>
    </div>
  );
}
