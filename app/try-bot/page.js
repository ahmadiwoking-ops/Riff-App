'use client';
import { useState, useRef, useEffect } from 'react';

const API = 'https://web-production-31dae.up.railway.app';

// ═══ DEMO CONSTANTS ═══
const CIRCLE_MEMBERS = [
  { name: 'Sage', color: '#22D3EE', initial: 'S' },
  { name: 'Atlas', color: '#84CC16', initial: 'A' },
  { name: 'Echo', color: '#8B5CF6', initial: 'E' },
];

const WYR_ROUNDS = [
  { a: 'Always know what people think of you', b: 'Never care what anyone thinks' },
  { a: 'Have one deep friendship that lasts forever', b: 'Have many good friendships that come and go' },
  { a: 'Know how your story ends', b: 'Be surprised by everything' },
];

const HOT_TAKES = [
  'It is better to be honest and hurt someone than to lie to protect them.',
  'Long-distance relationships can be stronger than in-person ones.',
  'You can truly know someone without ever meeting them in person.',
];

const THIS_THAT = [
  { a: 'Sunrise', b: 'Sunset' },
  { a: 'City', b: 'Countryside' },
  { a: 'Call', b: 'Text' },
  { a: 'Plan it', b: 'Wing it' },
  { a: 'Deep talk', b: 'Comfortable silence' },
];

const VOICE_MESSAGES = [
  { sender: 'Luna', duration: '0:08', text: 'hey, it is me. i have been thinking about what you said earlier and honestly it stuck with me. like, the way you put that into words...' },
  { sender: 'You', duration: '0:05', text: null },
  { sender: 'Luna', duration: '0:12', text: 'okay so i know this might sound intense but i feel like i already know you? like the way you think about things, it is rare. also my cat just walked across my keyboard so sorry if that was weird.' },
];

const SAFETY_PATTERNS = [
  { pattern: /\b(kill|murder|bomb|attack|shoot|stab)\b/i, type: 'violence' },
  { pattern: /\b(sex|nude|naked|porn|nsfw)\b/i, type: 'explicit' },
  { pattern: /\b(suicide|kill myself|end it all|want to die)\b/i, type: 'crisis' },
  { pattern: /\b(underage|minor|child|kid)\b.*\b(date|sex|meet)\b/i, type: 'predatory' },
];

function checkSafety(msg) {
  for (const s of SAFETY_PATTERNS) { if (s.pattern.test(msg.toLowerCase())) return s.type; }
  return null;
}

const LOCAL_RESPONSES = [
  "wait i love that. tell me more",
  "okay that actually made me smile",
  "hmm. i did not expect that answer but i really like it",
  "that is so specific and i am here for it",
  "okay you just got way more interesting",
  "what is something you think about but never say out loud?",
  "if you could wake up tomorrow with one new ability what would it be?",
  "what does home feel like to you? not a place. a feeling",
];

// ═══ STAGE COMPONENTS ═══

function VerificationStage({ onComplete }) {
  const [step, setStep] = useState(0); // 0=intro, 1=scanning, 2=selfie, 3=complete
  useEffect(() => {
    if (step === 1) { const t = setTimeout(() => setStep(2), 2200); return () => clearTimeout(t); }
    if (step === 2) { const t = setTimeout(() => setStep(3), 2500); return () => clearTimeout(t); }
    if (step === 3) { const t = setTimeout(onComplete, 1800); return () => clearTimeout(t); }
  }, [step]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      {step === 0 && (
        <>
          <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 36 }}>🛡</span>
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#E2E8F0' }}>Identity verification</div>
          <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, marginBottom: 8, maxWidth: 300 }}>Every Riff user is verified. This keeps the community safe and ensures you are talking to real people.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280, margin: '20px 0' }}>
            {[
              { icon: '📄', label: 'Government ID scan', desc: 'Passport or driving licence' },
              { icon: '🤳', label: 'Live selfie match', desc: 'Confirms you are you' },
              { icon: '📱', label: 'Phone verification', desc: 'SMS code to your number' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 12, background: '#151B2B', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)} style={{ padding: '14px 40px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>
            Start verification
          </button>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 12 }}>Powered by Veriff · Data stored in EU</div>
        </>
      )}
      {step === 1 && (
        <>
          <div style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid #22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'pulse 1.5s infinite' }}>
            <span style={{ fontSize: 48 }}>📄</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#E2E8F0', marginBottom: 8 }}>Scanning ID...</div>
          <div style={{ fontSize: 13, color: '#22C55E' }}>Reading document details</div>
        </>
      )}
      {step === 2 && (
        <>
          <div style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid #22D3EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'pulse 1.5s infinite' }}>
            <span style={{ fontSize: 48 }}>🤳</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#E2E8F0', marginBottom: 8 }}>Matching selfie...</div>
          <div style={{ fontSize: 13, color: '#22D3EE' }}>Verifying liveness</div>
        </>
      )}
      {step === 3 && (
        <>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 36 }}>✓</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#22C55E', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>Verified</div>
          <div style={{ fontSize: 13, color: '#94A3B8' }}>Green badge earned · Trust score: high</div>
        </>
      )}
    </div>
  );
}

function ModeSelectStage({ onSelect }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 6, textAlign: 'center' }}>Choose your path</div>
      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 28, textAlign: 'center' }}>How do you want to connect?</p>
      {[
        { mode: 'deep', icon: '◎', title: 'Deep Connection', tagline: 'One person. Full depth.', desc: 'Five stages with a single match — text, voice, reveal.', color: '#22D3EE' },
        { mode: 'circle', icon: '◍', title: 'Friend Circle', tagline: 'Four people. Real friendships.', desc: 'Group games, question rounds, and shared reveals.', color: '#84CC16' },
      ].map((m, i) => (
        <button key={i} onClick={() => onSelect(m.mode)} style={{
          width: '100%', maxWidth: 320, padding: 22, borderRadius: 18, marginBottom: 14,
          background: '#0F1420', border: '1.5px solid rgba(255,255,255,0.06)',
          cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s', fontFamily: 'inherit',
        }}
          onMouseOver={e => e.currentTarget.style.borderColor = m.color}
          onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 22, color: m.color }}>{m.icon}</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: '#E2E8F0' }}>{m.title}</span>
          </div>
          <div style={{ fontSize: 13, color: m.color, marginBottom: 4 }}>{m.tagline}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{m.desc}</div>
        </button>
      ))}
    </div>
  );
}

function ChatStage({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [history, setHistory] = useState([]);
  const scrollRef = useRef(null);
  const MAX = 7;

  useEffect(() => {
    setTimeout(() => {
      const intro = "hey. i was hoping you would message. i am luna, 27, lisbon. tell me something about yourself?";
      setMessages([{ id: 0, text: intro, sender: 'bot' }]);
      setHistory([{ role: 'assistant', content: intro }]);
    }, 800);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, typing]);

  async function send() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    const safety = checkSafety(text);
    if (safety) { setMessages(p => [...p, { id: Date.now(), text, sender: 'user' }, { id: Date.now()+1, text: 'i do not think i can go there. can we talk about something else?', sender: 'bot' }]); return; }
    const n = msgCount + 1;
    setMsgCount(n);
    setMessages(p => [...p, { id: Date.now(), text, sender: 'user' }]);
    if (n >= MAX) { setTyping(true); setTimeout(() => { setTyping(false); setMessages(p => [...p, { id: Date.now()+1, text: "that was great. i feel like i already know you a little. ready for the next stage?", sender: 'bot' }]); setTimeout(onComplete, 2500); }, 1500); return; }
    setTyping(true);
    const nh = [...history, { role: 'user', content: text }];
    setHistory(nh);
    let botText;
    try {
      const res = await fetch(API + '/api/bot/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ connectionId: 'web-demo', message: text, conversationHistory: nh.slice(-6) }) });
      if (res.ok) { const d = await res.json(); botText = d.response || d.text; }
    } catch {}
    if (!botText) botText = LOCAL_RESPONSES[Math.floor(Math.random() * LOCAL_RESPONSES.length)];
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { id: Date.now()+1, text: botText, sender: 'bot' }]);
      setHistory(p => [...p, { role: 'assistant', content: botText }]);
    }, 1000 + Math.random() * 1500);
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 20px', background: 'rgba(34,211,238,0.06)', borderBottom: '1px solid rgba(34,211,238,0.15)', textAlign: 'center' }}>
        <span style={{ fontSize: 11, color: '#22D3EE', fontWeight: 600 }}>DEEP CONNECTION · TEXT STAGE — {MAX - msgCount} messages left</span>
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: 18, background: m.sender === 'user' ? '#22D3EE' : '#151B2B', borderBottomRightRadius: m.sender === 'user' ? 4 : 18, borderBottomLeftRadius: m.sender === 'bot' ? 4 : 18, color: m.sender === 'user' ? '#000' : '#E2E8F0', fontSize: 14, lineHeight: 1.6 }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && <div style={{ display: 'flex' }}><div style={{ padding: '10px 14px', borderRadius: 18, borderBottomLeftRadius: 4, background: '#151B2B', fontSize: 13, color: '#94A3B8' }}>Luna is typing...</div></div>}
      </div>
      <div style={{ padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', borderTop: '1px solid #1E2740', display: 'flex', gap: 8, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Type a message..." style={{ flex: 1, height: 42, borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', padding: '0 14px', fontSize: 14, color: '#E2E8F0', outline: 'none', fontFamily: 'inherit' }} />
        <button onClick={send} style={{ width: 42, height: 42, borderRadius: 12, background: '#22D3EE', border: 'none', color: '#000', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&rarr;</button>
      </div>
    </div>
  );
}

function GamesStage({ onComplete }) {
  const [screen, setScreen] = useState('menu'); // menu, wyr, hot_take, this_that
  const [round, setRound] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [timer, setTimer] = useState(5);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    if (screen === 'this_that' && timer > 0 && !chosen) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, screen, chosen]);

  function startGame(id) { setScreen(id); setRound(0); setChosen(null); setRevealed(false); setTimer(5); }

  function choose(val) {
    setChosen(val);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 1200);
  }

  function nextRound(maxRounds) {
    if (round + 1 >= maxRounds) {
      const played = gamesPlayed + 1;
      setGamesPlayed(played);
      setScreen('menu');
      if (played >= 2) setTimeout(onComplete, 800);
      return;
    }
    setRound(r => r + 1); setChosen(null); setRevealed(false); setTimer(5);
  }

  const fakeVotes = () => CIRCLE_MEMBERS.map(m => ({ ...m, pick: Math.random() > 0.5 ? 'a' : 'b' }));

  if (screen === 'menu') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
        <div style={{ padding: '10px 0', textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 11, color: '#84CC16', fontWeight: 600 }}>FRIEND CIRCLE · GAMES{gamesPlayed > 0 ? ` — ${gamesPlayed}/2 played` : ''}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
          {CIRCLE_MEMBERS.map((m, i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: 12, background: `${m.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>{m.initial}</span>
            </div>
          ))}
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(245,158,11,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#F59E0B' }}>Y</span>
          </div>
        </div>
        {[
          { id: 'wyr', title: 'Would You Rather', icon: '⚡', color: '#EC4899', tag: 'Quick · 2 min', desc: 'Two choices. No middle ground.' },
          { id: 'hot_take', title: 'Hot Takes', icon: '🔥', color: '#EF4444', tag: 'Debate · 3 min', desc: 'Agree or disagree on spicy statements.' },
          { id: 'this_that', title: 'This or That', icon: '⚖️', color: '#22D3EE', tag: 'Fast · 1 min', desc: 'Rapid-fire. 5 seconds each.' },
        ].map((g, i) => (
          <button key={i} onClick={() => startGame(g.id)} style={{
            display: 'flex', gap: 14, alignItems: 'center', padding: 16, borderRadius: 14,
            background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 10,
            cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit', transition: 'border-color 0.2s',
          }}
            onMouseOver={e => e.currentTarget.style.borderColor = g.color}
            onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${g.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{g.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{g.title}</div>
              <div style={{ fontSize: 11, color: g.color }}>{g.tag}</div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{g.desc}</div>
            </div>
          </button>
        ))}
        {gamesPlayed >= 2 && <div style={{ textAlign: 'center', fontSize: 13, color: '#84CC16', marginTop: 12 }}>Great bonding! Moving to voice stage...</div>}
      </div>
    );
  }

  // ═══ Would You Rather ═══
  if (screen === 'wyr') {
    const q = WYR_ROUNDS[round];
    const votes = fakeVotes();
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#EC4899' }}>WOULD YOU RATHER · ROUND {round + 1}/{WYR_ROUNDS.length}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['a', 'b'].map(opt => (
            <button key={opt} onClick={() => !chosen && choose(opt)} style={{
              padding: 20, borderRadius: 16, border: chosen === opt ? '2px solid #EC4899' : '1px solid rgba(255,255,255,0.06)',
              background: chosen === opt ? 'rgba(236,72,153,0.1)' : '#0F1420',
              cursor: chosen ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 15, color: '#E2E8F0', lineHeight: 1.5 }}>{q[opt]}</div>
              {revealed && (
                <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {votes.filter(v => v.pick === opt).map((v, vi) => (
                    <span key={vi} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 8, background: `${v.color}22`, color: v.color }}>{v.name}</span>
                  ))}
                  {chosen === opt && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 8, background: 'rgba(245,158,11,0.13)', color: '#F59E0B' }}>You</span>}
                </div>
              )}
            </button>
          ))}
        </div>
        {revealed && <button onClick={() => nextRound(WYR_ROUNDS.length)} style={{ marginTop: 20, padding: '12px 28px', borderRadius: 12, border: 'none', background: '#EC4899', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'center' }}>{round + 1 >= WYR_ROUNDS.length ? 'Finish game' : 'Next round'}</button>}
      </div>
    );
  }

  // ═══ Hot Takes ═══
  if (screen === 'hot_take') {
    const q = HOT_TAKES[round];
    const votes = CIRCLE_MEMBERS.map(m => ({ ...m, pick: Math.random() > 0.4 ? 'agree' : 'disagree' }));
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#EF4444' }}>HOT TAKES · ROUND {round + 1}/{HOT_TAKES.length}</span>
        </div>
        <div style={{ padding: 24, borderRadius: 18, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20, textAlign: 'center' }}>
          <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>🔥</span>
          <div style={{ fontSize: 16, color: '#E2E8F0', lineHeight: 1.6, fontStyle: 'italic' }}>"{q}"</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['agree', 'disagree'].map(opt => (
            <button key={opt} onClick={() => !chosen && choose(opt)} style={{
              flex: 1, padding: 16, borderRadius: 14,
              border: chosen === opt ? `2px solid ${opt === 'agree' ? '#22C55E' : '#EF4444'}` : '1px solid rgba(255,255,255,0.06)',
              background: chosen === opt ? (opt === 'agree' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)') : '#0F1420',
              cursor: chosen ? 'default' : 'pointer', fontFamily: 'inherit',
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{opt === 'agree' ? '👍' : '👎'}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: opt === 'agree' ? '#22C55E' : '#EF4444', textTransform: 'capitalize' }}>{opt}</div>
            </button>
          ))}
        </div>
        {revealed && (
          <>
            <div style={{ marginTop: 16, display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
              {votes.map((v, vi) => (
                <span key={vi} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 8, background: v.pick === 'agree' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: v.pick === 'agree' ? '#22C55E' : '#EF4444' }}>{v.name}: {v.pick}</span>
              ))}
            </div>
            <button onClick={() => nextRound(HOT_TAKES.length)} style={{ marginTop: 16, padding: '12px 28px', borderRadius: 12, border: 'none', background: '#EF4444', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'center' }}>{round + 1 >= HOT_TAKES.length ? 'Finish game' : 'Next round'}</button>
          </>
        )}
      </div>
    );
  }

  // ═══ This or That ═══
  if (screen === 'this_that') {
    const q = THIS_THAT[round];
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#22D3EE' }}>THIS OR THAT · ROUND {round + 1}/{THIS_THAT.length}</span>
        </div>
        {!chosen && <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'var(--font-heading)', color: timer <= 2 ? '#EF4444' : '#E2E8F0' }}>{timer}</div>
          <div style={{ fontSize: 11, color: '#64748B' }}>seconds to choose</div>
        </div>}
        <div style={{ display: 'flex', gap: 12 }}>
          {['a', 'b'].map(opt => (
            <button key={opt} onClick={() => !chosen && choose(opt)} style={{
              flex: 1, padding: 28, borderRadius: 16,
              border: chosen === opt ? '2px solid #22D3EE' : '1px solid rgba(255,255,255,0.06)',
              background: chosen === opt ? 'rgba(34,211,238,0.1)' : '#0F1420',
              cursor: chosen ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#E2E8F0' }}>{q[opt]}</div>
            </button>
          ))}
        </div>
        {(revealed || (timer === 0 && !chosen)) && (
          <button onClick={() => { if (round + 1 >= THIS_THAT.length) { setGamesPlayed(g => g + 1); setScreen('menu'); if (gamesPlayed + 1 >= 2) setTimeout(onComplete, 800); } else { nextRound(THIS_THAT.length); }}} style={{ marginTop: 20, padding: '12px 28px', borderRadius: 12, border: 'none', background: '#22D3EE', color: '#000', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'center' }}>
            {round + 1 >= THIS_THAT.length ? 'Finish game' : 'Next round'}
          </button>
        )}
      </div>
    );
  }
  return null;
}

function VoiceStage({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recorded, setRecorded] = useState(false);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (playing && progress < 100) {
      const t = setTimeout(() => setProgress(p => p + 4), 120);
      return () => clearTimeout(t);
    }
    if (playing && progress >= 100) {
      setPlaying(false);
      if (current < VOICE_MESSAGES.length - 1) setTimeout(() => setCurrent(c => c + 1), 800);
    }
  }, [playing, progress]);

  function playMessage() { setPlaying(true); setProgress(0); }
  function startRecording() { setRecording(true); setTimeout(() => { setRecording(false); setRecorded(true); setTimeout(() => setCurrent(c => c + 1), 1000); }, 3000); }

  const allDone = current >= VOICE_MESSAGES.length;

  useEffect(() => { if (allDone) { const t = setTimeout(onComplete, 2000); return () => clearTimeout(t); } }, [allDone]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#F59E0B' }}>VOICE STAGE</span>
      </div>
      {!allDone && (
        <>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 36 }}>🎙</span>
          </div>
          {VOICE_MESSAGES[current]?.text ? (
            <>
              <div style={{ fontSize: 14, color: '#E2E8F0', marginBottom: 6 }}>{VOICE_MESSAGES[current].sender}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>{VOICE_MESSAGES[current].duration}</div>
              <div style={{ width: '100%', maxWidth: 280, height: 6, borderRadius: 3, background: '#1E2740', marginBottom: 12 }}>
                <div style={{ width: `${progress}%`, height: '100%', borderRadius: 3, background: '#F59E0B', transition: 'width 0.1s' }} />
              </div>
              {playing && <div style={{ padding: 16, borderRadius: 14, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', maxWidth: 300, marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#94A3B8', fontStyle: 'italic', lineHeight: 1.6 }}>"{VOICE_MESSAGES[current].text}"</p>
              </div>}
              {!playing && progress === 0 && <button onClick={playMessage} style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: '#F59E0B', color: '#000', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Play message</button>}
              {!playing && progress >= 100 && <div style={{ fontSize: 13, color: '#22C55E' }}>✓ Listened</div>}
            </>
          ) : (
            <>
              <div style={{ fontSize: 14, color: '#E2E8F0', marginBottom: 16 }}>Your turn — record a voice message</div>
              {!recorded && !recording && <button onClick={startRecording} style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(239,68,68,0.3)' }}><span style={{ fontSize: 24 }}>🎙</span></button>}
              {recording && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1s infinite' }}><span style={{ fontSize: 24 }}>🎙</span></div>
                <span style={{ fontSize: 13, color: '#EF4444' }}>Recording...</span>
              </div>}
              {recorded && <div style={{ fontSize: 13, color: '#22C55E' }}>✓ Message sent</div>}
            </>
          )}
        </>
      )}
      {allDone && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#F59E0B' }}>Voice stage complete</div>
          <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>Both scored 4/5+. Reveal unlocked.</div>
        </div>
      )}
    </div>
  );
}

function RevealStage({ onComplete }) {
  const [countdown, setCountdown] = useState(3);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (countdown > 0) { const t = setTimeout(() => setCountdown(c => c - 1), 1000); return () => clearTimeout(t); }
    if (countdown === 0 && !revealed) { setRevealed(true); }
  }, [countdown, revealed]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      {!revealed ? (
        <>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: '#94A3B8', marginBottom: 12 }}>Photo reveal in</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 72, fontWeight: 800, color: '#E2E8F0', marginBottom: 12, animation: 'pulse 1s infinite' }}>{countdown}</div>
          <div style={{ fontSize: 13, color: '#64748B' }}>Both photos appear simultaneously</div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Luna', gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
              { label: 'You', gradient: 'linear-gradient(135deg, #22D3EE, #84CC16)' },
            ].map((p, i) => (
              <div key={i} style={{ width: 130, height: 160, borderRadius: 20, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', animation: 'fadeIn 1.5s ease' }}>
                <span style={{ fontSize: 40, marginBottom: 8 }}>📸</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{p.label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>Photos revealed</div>
          <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>No power imbalance. Both revealed at the same moment.</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={onComplete} style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Continue →</button>
          </div>
        </>
      )}
    </div>
  );
}

function FinalStage() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 36 }}>🎉</span>
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 10 }}>Deep connection activated</div>
      <div style={{ padding: 20, borderRadius: 16, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20, maxWidth: 320 }}>
        <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7 }}>If both parties continue, the full deep connection is activated — allowing access to all features: text, voice, and video.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 280, marginBottom: 24 }}>
        {['Unlimited text messaging', 'Voice and video calls', 'Life chapters exchange', 'Shared memories timeline'].map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px', borderRadius: 10, background: '#151B2B' }}>
            <span style={{ color: '#22C55E', fontSize: 14 }}>✓</span>
            <span style={{ fontSize: 13, color: '#E2E8F0' }}>{f}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>That was a taste of Riff. Ready for the real thing?</div>
      <a href="/#pricing" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>View plans from £2.99/mo</a>
    </div>
  );
}

// ═══ MAIN PAGE ═══
export default function TryBot() {
  const [stage, setStage] = useState('verify'); // verify, mode, chat, games, voice, reveal, final
  const [mode, setMode] = useState(null);

  function handleModeSelect(m) {
    setMode(m);
    setStage(m === 'deep' ? 'chat' : 'games');
  }

  return (
    <div style={{ height: '100vh', maxHeight: '100dvh', background: '#050816', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #1E2740', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <a href="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: 22 }}>&lsaquo;</a>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#8B5CF6' }}>R</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>Try Riff</div>
          <div style={{ fontSize: 11, color: '#22C55E' }}>demo experience</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['verify', 'mode', stage === 'chat' || stage === 'games' ? (mode === 'deep' ? 'chat' : 'games') : 'connect', 'voice', 'reveal'].map((s, i) => (
            <div key={i} style={{ width: 24, height: 3, borderRadius: 2, background: ['verify','mode','chat','games','voice','reveal','final'].indexOf(stage) >= i ? 'linear-gradient(90deg, #8B5CF6, #EC4899)' : '#1E2740' }} />
          ))}
        </div>
      </div>

      {/* Stage content */}
      {stage === 'verify' && <VerificationStage onComplete={() => setStage('mode')} />}
      {stage === 'mode' && <ModeSelectStage onSelect={handleModeSelect} />}
      {stage === 'chat' && <ChatStage onComplete={() => setStage('voice')} />}
      {stage === 'games' && <GamesStage onComplete={() => setStage('voice')} />}
      {stage === 'voice' && <VoiceStage onComplete={() => setStage('reveal')} />}
      {stage === 'reveal' && <RevealStage onComplete={() => setStage('final')} />}
      {stage === 'final' && <FinalStage />}

      <style jsx>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        input::placeholder { color: #64748B; }
        @media (min-width: 768px) {
          div[style*="height: 100vh"] { max-width: 480px; margin: 0 auto; border-left: 1px solid #1E2740; border-right: 1px solid #1E2740; }
        }
      `}</style>
    </div>
  );
}
