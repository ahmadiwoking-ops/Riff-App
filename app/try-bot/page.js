'use client';
import { useState, useRef, useEffect } from 'react';

const API = 'https://web-production-31dae.up.railway.app';

const CIRCLE_MEMBERS = [
  { name: 'Sage', color: '#22D3EE', initial: 'S' },
  { name: 'Atlas', color: '#84CC16', initial: 'A' },
  { name: 'Echo', color: '#8B5CF6', initial: 'E' },
];

const DEEP_QUESTIONS = [
  { q: 'What draws you to someone most?', opts: ['Their mind', 'Their energy', 'Their kindness', 'Their humour'] },
  { q: 'How do you show someone you care?', opts: ['Words and messages', 'Quality time together', 'Small thoughtful gestures', 'Being there when it matters'] },
  { q: 'What does vulnerability look like for you?', opts: ['Sharing fears and doubts', 'Asking for help', 'Saying how I feel first', 'Letting someone see me at my worst'] },
  { q: 'Your ideal deep conversation happens...', opts: ['Late at night, just us', 'Walking somewhere with no plan', 'Over coffee, face to face', 'In voice notes back and forth'] },
  { q: 'When someone hurts you, you tend to...', opts: ['Go quiet and process alone', 'Talk it through immediately', 'Write down how I feel first', 'Need time, then address it directly'] },
  { q: 'What is non-negotiable for you?', opts: ['Emotional honesty', 'Consistent effort', 'Respecting boundaries', 'Intellectual curiosity'] },
  { q: 'What kind of connection are you looking for?', opts: ['Someone who challenges me to grow', 'Someone who feels like home', 'Someone who matches my energy', 'Someone who sees the real me'] },
];

const CIRCLE_QUESTIONS = [
  { q: 'In a group, you are usually the one who...', opts: ['Makes everyone laugh', 'Plans the activities', 'Checks in on everyone', 'Goes with the flow'] },
  { q: 'Your ideal group hangout is...', opts: ['Game night at someone\'s place', 'Trying a new restaurant together', 'Outdoor adventure', 'Chill vibes, music, good chat'] },
  { q: 'What makes you click with new people?', opts: ['Shared sense of humour', 'Similar values', 'Complementary energy', 'Common interests'] },
  { q: 'When a friend is going through it, you...', opts: ['Show up with food and company', 'Send a long heartfelt message', 'Give them space but check in', 'Try to make them laugh'] },
  { q: 'The group chat energy you love most is...', opts: ['Memes and chaos', 'Deep 2am conversations', 'Planning the next hangout', 'Sharing random life updates'] },
  { q: 'What role do you want in a friend group?', opts: ['The one everyone trusts', 'The adventurous one', 'The connector who brings people together', 'The creative one with niche interests'] },
  { q: 'Friendship dealbreaker?', opts: ['Flakiness and cancelled plans', 'Gossip behind backs', 'Only reaching out when they need something', 'Never being vulnerable'] },
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
  { a: 'Sunrise', b: 'Sunset' }, { a: 'City', b: 'Countryside' }, { a: 'Call', b: 'Text' },
  { a: 'Plan it', b: 'Wing it' }, { a: 'Deep talk', b: 'Comfortable silence' },
];

const SAFETY_PATTERNS = [
  { pattern: /\b(kill|murder|bomb|attack|shoot|stab)\b/i, type: 'violence' },
  { pattern: /\b(sex|nude|naked|porn|nsfw)\b/i, type: 'explicit' },
  { pattern: /\b(suicide|kill myself|end it all|want to die)\b/i, type: 'crisis' },
  { pattern: /\b(underage|minor|child|kid)\b.*\b(date|sex|meet)\b/i, type: 'predatory' },
];
function checkSafety(msg) { for (const s of SAFETY_PATTERNS) { if (s.pattern.test(msg.toLowerCase())) return s.type; } return null; }

const LOCAL_RESPONSES = [
  "wait i love that. tell me more", "okay that actually made me smile",
  "hmm. i did not expect that answer but i really like it", "that is so specific and i am here for it",
  "okay you just got way more interesting", "what is something you think about but never say out loud?",
  "if you could wake up tomorrow with one new ability what would it be?", "what does home feel like to you? not a place. a feeling",
];

// ═══ VERIFICATION ═══
function VerificationStage({ onComplete }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step === 1) { const t = setTimeout(() => setStep(2), 2200); return () => clearTimeout(t); }
    if (step === 2) { const t = setTimeout(() => setStep(3), 2500); return () => clearTimeout(t); }
    if (step === 3) { const t = setTimeout(onComplete, 1800); return () => clearTimeout(t); }
  }, [step]);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      {step === 0 && (<>
        <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}><span style={{ fontSize: 36 }}>🛡</span></div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#E2E8F0' }}>Identity verification</div>
        <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, marginBottom: 8, maxWidth: 300 }}>Every Riff user is verified. This keeps the community safe and real.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280, margin: '20px 0' }}>
          {[{ icon: '📄', label: 'Government ID scan', desc: 'Passport or driving licence' }, { icon: '🤳', label: 'Live selfie match', desc: 'Confirms you are you' }, { icon: '📱', label: 'Phone verification', desc: 'SMS code to your number' }].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 12, background: '#151B2B', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div style={{ textAlign: 'left' }}><div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>{s.label}</div><div style={{ fontSize: 11, color: '#64748B' }}>{s.desc}</div></div>
            </div>
          ))}
        </div>
        <button onClick={() => setStep(1)} style={{ padding: '14px 40px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Start verification</button>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 12 }}>Powered by Veriff · Data stored in EU</div>
      </>)}
      {step === 1 && (<><div style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid #22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'pulse 1.5s infinite' }}><span style={{ fontSize: 48 }}>📄</span></div><div style={{ fontSize: 16, fontWeight: 600, color: '#E2E8F0', marginBottom: 8 }}>Scanning ID...</div><div style={{ fontSize: 13, color: '#22C55E' }}>Reading document details</div></>)}
      {step === 2 && (<><div style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid #22D3EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'pulse 1.5s infinite' }}><span style={{ fontSize: 48 }}>🤳</span></div><div style={{ fontSize: 16, fontWeight: 600, color: '#E2E8F0', marginBottom: 8 }}>Matching selfie...</div><div style={{ fontSize: 13, color: '#22D3EE' }}>Verifying liveness</div></>)}
      {step === 3 && (<><div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><span style={{ fontSize: 36 }}>✓</span></div><div style={{ fontSize: 20, fontWeight: 700, color: '#22C55E', fontFamily: 'var(--font-heading)', marginBottom: 8 }}>Verified</div><div style={{ fontSize: 13, color: '#94A3B8' }}>Green badge earned · Trust score: high</div></>)}
    </div>
  );
}

// ═══ MODE SELECT ═══
function ModeSelectStage({ onSelect }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 6, textAlign: 'center' }}>Choose your path</div>
      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 28, textAlign: 'center' }}>How do you want to connect?</p>
      {[
        { mode: 'deep', icon: '◎', title: 'Deep Connection', tagline: 'One person. Full depth.', desc: 'Five stages with a single match — text, voice, reveal.', color: '#22D3EE' },
        { mode: 'circle', icon: '◍', title: 'Friend Circle', tagline: 'Four people. Real friendships.', desc: 'Group games, question rounds, and shared reveals.', color: '#84CC16' },
      ].map((m, i) => (
        <button key={i} onClick={() => onSelect(m.mode)} style={{ width: '100%', maxWidth: 320, padding: 22, borderRadius: 18, marginBottom: 14, background: '#0F1420', border: '1.5px solid rgba(255,255,255,0.06)', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
          onMouseOver={e => e.currentTarget.style.borderColor = m.color} onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}><span style={{ fontSize: 22, color: m.color }}>{m.icon}</span><span style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: '#E2E8F0' }}>{m.title}</span></div>
          <div style={{ fontSize: 13, color: m.color, marginBottom: 4 }}>{m.tagline}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{m.desc}</div>
        </button>
      ))}
    </div>
  );
}

// ═══ QUESTIONS ═══
function QuestionsStage({ mode, onComplete }) {
  const questions = mode === 'deep' ? DEEP_QUESTIONS : CIRCLE_QUESTIONS;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const color = mode === 'deep' ? '#22D3EE' : '#84CC16';
  const label = mode === 'deep' ? 'COMPATIBILITY QUESTIONS' : 'CIRCLE MATCHING';

  function pick(idx) {
    if (animating) return;
    setSelected(idx);
    setAnimating(true);
    const newAnswers = [...answers, idx];
    setTimeout(() => {
      setAnswers(newAnswers);
      if (current + 1 >= questions.length) {
        onComplete(newAnswers);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setAnimating(false);
      }
    }, 600);
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
      <div style={{ textAlign: 'center', marginBottom: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color }}>{label}</span>
      </div>
      <div style={{ width: '100%', height: 4, borderRadius: 2, background: '#1E2740', marginBottom: 6, flexShrink: 0 }}>
        <div style={{ width: `${progress}%`, height: '100%', borderRadius: 2, background: color, transition: 'width 0.4s ease' }} />
      </div>
      <div style={{ fontSize: 12, color: '#64748B', textAlign: 'center', marginBottom: 20, flexShrink: 0 }}>{current + 1} of {questions.length}</div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, fontWeight: 600, color: '#E2E8F0', textAlign: 'center', marginBottom: 24, lineHeight: 1.4 }}>{q.q}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 340, alignSelf: 'center', width: '100%' }}>
          {q.opts.map((opt, i) => (
            <button key={i} onClick={() => pick(i)} style={{
              padding: '14px 18px', borderRadius: 14, border: selected === i ? `2px solid ${color}` : '1px solid rgba(255,255,255,0.06)',
              background: selected === i ? `${color}15` : '#0F1420', cursor: animating ? 'default' : 'pointer',
              fontSize: 14, color: selected === i ? '#E2E8F0' : '#94A3B8', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.2s',
            }}>{opt}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══ MATCH FOUND ═══
function MatchFoundStage({ mode, onComplete }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3000);
    const t3 = setTimeout(onComplete, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const score = 78 + Math.floor(Math.random() * 14);

  if (mode === 'deep') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        {step === 0 && (<><div style={{ fontSize: 36, marginBottom: 16, animation: 'pulse 1s infinite' }}>🔍</div><div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#94A3B8' }}>Analysing your answers...</div></>)}
        {step === 1 && (<><div style={{ fontSize: 36, marginBottom: 16, animation: 'pulse 1s infinite' }}>✦</div><div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#22D3EE' }}>Searching for compatible minds...</div></>)}
        {step === 2 && (<>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, animation: 'fadeIn 0.8s ease' }}><span style={{ fontSize: 28, fontWeight: 700, color: '#8B5CF6' }}>L</span></div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Match found</div>
          <div style={{ fontSize: 15, color: '#22D3EE', marginBottom: 4 }}>Luna, 27, Lisbon</div>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 10, background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: '#22D3EE' }}>{score}%</span><span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 6 }}>compatible</span>
          </div>
          <div style={{ fontSize: 13, color: '#64748B' }}>Based on your answers · Above 72% threshold</div>
        </>)}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      {step === 0 && (<><div style={{ fontSize: 36, marginBottom: 16, animation: 'pulse 1s infinite' }}>🔍</div><div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#94A3B8' }}>Analysing your answers...</div></>)}
      {step === 1 && (<><div style={{ fontSize: 36, marginBottom: 16, animation: 'pulse 1s infinite' }}>◍</div><div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: '#84CC16' }}>Building your circle...</div></>)}
      {step === 2 && (<>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 16 }}>Circle formed!</div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {[...CIRCLE_MEMBERS, { name: 'You', color: '#F59E0B', initial: 'Y' }].map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, animation: `fadeIn ${0.5 + i * 0.2}s ease` }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: `${m.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 18, fontWeight: 700, color: m.color }}>{m.initial}</span></div>
              <span style={{ fontSize: 11, color: m.color }}>{m.name}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 10, background: 'rgba(132,204,22,0.1)', border: '1px solid rgba(132,204,22,0.2)' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, color: '#84CC16' }}>{score}%</span><span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 6 }}>avg compatibility</span>
        </div>
      </>)}
    </div>
  );
}

// ═══ DEEP CONNECTION CHAT ═══
function ChatStage({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [history, setHistory] = useState([]);
  const scrollRef = useRef(null);
  const MAX = 3;

  useEffect(() => {
    setTimeout(() => {
      const intro = "hey. i was hoping you would message. we matched really high on the emotional honesty questions, which... yeah, that is rare. tell me something about yourself?";
      setMessages([{ id: 0, text: intro, sender: 'bot' }]);
      setHistory([{ role: 'assistant', content: intro }]);
    }, 800);
  }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, typing]);

  async function send() {
    if (!input.trim()) return;
    const text = input.trim(); setInput('');
    const safety = checkSafety(text);
    if (safety) { setMessages(p => [...p, { id: Date.now(), text, sender: 'user' }, { id: Date.now()+1, text: 'i do not think i can go there. can we talk about something else?', sender: 'bot' }]); return; }
    const n = msgCount + 1; setMsgCount(n);
    setMessages(p => [...p, { id: Date.now(), text, sender: 'user' }]);
    if (n >= MAX) { setTyping(true); setTimeout(() => { setTyping(false); setMessages(p => [...p, { id: Date.now()+1, text: "that was great. i feel like i already know you a little. ready for the next stage?", sender: 'bot' }]); setTimeout(onComplete, 2500); }, 1500); return; }
    setTyping(true);
    const nh = [...history, { role: 'user', content: text }]; setHistory(nh);
    let botText;
    try { const res = await fetch(API + '/api/bot/demo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ connectionId: 'web-demo', message: text, conversationHistory: nh.slice(-6) }) }); if (res.ok) { const d = await res.json(); botText = d.response || d.text; } } catch {}
    if (!botText) botText = LOCAL_RESPONSES[Math.floor(Math.random() * LOCAL_RESPONSES.length)];
    setTimeout(() => { setTyping(false); setMessages(p => [...p, { id: Date.now()+1, text: botText, sender: 'bot' }]); setHistory(p => [...p, { role: 'assistant', content: botText }]); }, 1000 + Math.random() * 1500);
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '10px 20px', background: 'rgba(34,211,238,0.06)', borderBottom: '1px solid rgba(34,211,238,0.15)', textAlign: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: '#22D3EE', fontWeight: 600 }}>DEEP CONNECTION · TEXT STAGE — {MAX - msgCount} messages left</span>
      </div>
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: 18, background: m.sender === 'user' ? '#22D3EE' : '#151B2B', borderBottomRightRadius: m.sender === 'user' ? 4 : 18, borderBottomLeftRadius: m.sender === 'bot' ? 4 : 18, color: m.sender === 'user' ? '#000' : '#E2E8F0', fontSize: 14, lineHeight: 1.6 }}>{m.text}</div>
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

// ═══ FRIEND CIRCLE GROUP CHAT WITH GAMES ═══
function GroupChatStage({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [msgCount, setMsgCount] = useState(0);
  const [showGames, setShowGames] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameRound, setGameRound] = useState(0);
  const [gameChosen, setGameChosen] = useState(null);
  const [gameRevealed, setGameRevealed] = useState(false);
  const [gameTimer, setGameTimer] = useState(5);
  const scrollRef = useRef(null);
  const MAX = 5;

  const autoMessages = [
    { delay: 800, sender: 'Sage', color: '#22D3EE', text: 'hey everyone! so excited this circle formed. i already feel like we are going to get along.' },
    { delay: 3000, sender: 'Echo', color: '#8B5CF6', text: 'same!! okay who wants to break the ice? should we play a game?' },
    { delay: 5000, sender: 'Luna', color: '#EC4899', text: 'yes! someone hit the games button. i am competitive, fair warning.' },
  ];

  useEffect(() => {
    autoMessages.forEach(m => {
      setTimeout(() => setMessages(p => [...p, { id: Date.now() + Math.random(), text: m.text, sender: m.sender, color: m.color }]), m.delay);
    });
  }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);
  useEffect(() => {
    if (activeGame === 'this_that' && gameTimer > 0 && !gameChosen) {
      const t = setTimeout(() => setGameTimer(gt => gt - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [gameTimer, activeGame, gameChosen]);

  function sendMsg() {
    if (!input.trim()) return;
    const text = input.trim(); setInput('');
    const n = msgCount + 1; setMsgCount(n);
    setMessages(p => [...p, { id: Date.now(), text, sender: 'You', color: '#F59E0B' }]);

    if (gameCompleted && n >= MAX) {
      setTimeout(() => {
        setMessages(p => [...p, { id: Date.now()+1, text: 'okay this group is genuinely great. i think we are ready to hear each other\'s voices!', sender: 'Luna', color: '#EC4899' }]);
        setTimeout(onComplete, 2500);
      }, 1500);
      return;
    }

    const replies = [
      { sender: 'Sage', color: '#22D3EE', texts: ['haha i love that', 'okay you are definitely my kind of person', 'wait that is so interesting'] },
      { sender: 'Echo', color: '#8B5CF6', texts: ['yesss exactly', 'okay tell me more about that', 'i was literally thinking the same thing'] },
    ];
    const r = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => setMessages(p => [...p, { id: Date.now()+2, text: r.texts[Math.floor(Math.random() * r.texts.length)], sender: r.sender, color: r.color }]), 1500 + Math.random() * 1000);
  }

  function startGame(id) { setActiveGame(id); setShowGames(false); setGameRound(0); setGameChosen(null); setGameRevealed(false); setGameTimer(5); }

  function gameChoose(val) { setGameChosen(val); setGameRevealed(false); setTimeout(() => setGameRevealed(true), 1200); }

  function gameNextRound(maxR) {
    if (gameRound + 1 >= maxR) {
      setActiveGame(null);
      setGameCompleted(true);
      setMessages(p => [...p,
        { id: Date.now(), text: '🎮 Game completed!', sender: 'system', color: '#84CC16' },
        { id: Date.now()+1, text: 'that was so fun! okay sage your answers cracked me up', sender: 'Luna', color: '#EC4899' },
        { id: Date.now()+2, text: 'haha what can i say, i am full of surprises', sender: 'Sage', color: '#22D3EE' },
      ]);
      return;
    }
    setGameRound(r => r + 1); setGameChosen(null); setGameRevealed(false); setGameTimer(5);
  }

  const fakeVotes = () => CIRCLE_MEMBERS.map(m => ({ ...m, pick: Math.random() > 0.5 ? 'a' : 'b' }));

  // ═══ ACTIVE GAME SCREENS ═══
  if (activeGame === 'wyr') {
    const q = WYR_ROUNDS[gameRound];
    const votes = fakeVotes();
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}><span style={{ fontSize: 11, fontWeight: 600, color: '#EC4899' }}>WOULD YOU RATHER · ROUND {gameRound + 1}/{WYR_ROUNDS.length}</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['a', 'b'].map(opt => (
            <button key={opt} onClick={() => !gameChosen && gameChoose(opt)} style={{ padding: 20, borderRadius: 16, border: gameChosen === opt ? '2px solid #EC4899' : '1px solid rgba(255,255,255,0.06)', background: gameChosen === opt ? 'rgba(236,72,153,0.1)' : '#0F1420', cursor: gameChosen ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 15, color: '#E2E8F0', lineHeight: 1.5 }}>{q[opt]}</div>
              {gameRevealed && <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {votes.filter(v => v.pick === opt).map((v, vi) => (<span key={vi} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 8, background: `${v.color}22`, color: v.color }}>{v.name}</span>))}
                {gameChosen === opt && <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 8, background: 'rgba(245,158,11,0.13)', color: '#F59E0B' }}>You</span>}
              </div>}
            </button>
          ))}
        </div>
        {gameRevealed && <button onClick={() => gameNextRound(WYR_ROUNDS.length)} style={{ marginTop: 20, padding: '12px 28px', borderRadius: 12, border: 'none', background: '#EC4899', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'center' }}>{gameRound + 1 >= WYR_ROUNDS.length ? 'Finish' : 'Next'}</button>}
      </div>
    );
  }
  if (activeGame === 'hot_take') {
    const q = HOT_TAKES[gameRound];
    const votes = CIRCLE_MEMBERS.map(m => ({ ...m, pick: Math.random() > 0.4 ? 'agree' : 'disagree' }));
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}><span style={{ fontSize: 11, fontWeight: 600, color: '#EF4444' }}>HOT TAKES · ROUND {gameRound + 1}/{HOT_TAKES.length}</span></div>
        <div style={{ padding: 24, borderRadius: 18, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20, textAlign: 'center' }}>
          <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>🔥</span>
          <div style={{ fontSize: 16, color: '#E2E8F0', lineHeight: 1.6, fontStyle: 'italic' }}>"{q}"</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['agree', 'disagree'].map(opt => (
            <button key={opt} onClick={() => !gameChosen && gameChoose(opt)} style={{ flex: 1, padding: 16, borderRadius: 14, border: gameChosen === opt ? `2px solid ${opt === 'agree' ? '#22C55E' : '#EF4444'}` : '1px solid rgba(255,255,255,0.06)', background: gameChosen === opt ? (opt === 'agree' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)') : '#0F1420', cursor: gameChosen ? 'default' : 'pointer', fontFamily: 'inherit' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{opt === 'agree' ? '👍' : '👎'}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: opt === 'agree' ? '#22C55E' : '#EF4444', textTransform: 'capitalize' }}>{opt}</div>
            </button>
          ))}
        </div>
        {gameRevealed && (<>
          <div style={{ marginTop: 16, display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>{votes.map((v, vi) => (<span key={vi} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 8, background: v.pick === 'agree' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: v.pick === 'agree' ? '#22C55E' : '#EF4444' }}>{v.name}: {v.pick}</span>))}</div>
          <button onClick={() => gameNextRound(HOT_TAKES.length)} style={{ marginTop: 16, padding: '12px 28px', borderRadius: 12, border: 'none', background: '#EF4444', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'center' }}>{gameRound + 1 >= HOT_TAKES.length ? 'Finish' : 'Next'}</button>
        </>)}
      </div>
    );
  }
  if (activeGame === 'this_that') {
    const q = THIS_THAT[gameRound];
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}><span style={{ fontSize: 11, fontWeight: 600, color: '#22D3EE' }}>THIS OR THAT · ROUND {gameRound + 1}/{THIS_THAT.length}</span></div>
        {!gameChosen && <div style={{ textAlign: 'center', marginBottom: 16 }}><div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'var(--font-heading)', color: gameTimer <= 2 ? '#EF4444' : '#E2E8F0' }}>{gameTimer}</div><div style={{ fontSize: 11, color: '#64748B' }}>seconds to choose</div></div>}
        <div style={{ display: 'flex', gap: 12 }}>
          {['a', 'b'].map(opt => (
            <button key={opt} onClick={() => !gameChosen && gameChoose(opt)} style={{ flex: 1, padding: 28, borderRadius: 16, border: gameChosen === opt ? '2px solid #22D3EE' : '1px solid rgba(255,255,255,0.06)', background: gameChosen === opt ? 'rgba(34,211,238,0.1)' : '#0F1420', cursor: gameChosen ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#E2E8F0' }}>{q[opt]}</div>
            </button>
          ))}
        </div>
        {(gameRevealed || (gameTimer === 0 && !gameChosen)) && (
          <button onClick={() => { if (gameRound + 1 >= THIS_THAT.length) gameNextRound(THIS_THAT.length); else gameNextRound(THIS_THAT.length); }} style={{ marginTop: 20, padding: '12px 28px', borderRadius: 12, border: 'none', background: '#22D3EE', color: '#000', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'center' }}>{gameRound + 1 >= THIS_THAT.length ? 'Finish' : 'Next'}</button>
        )}
      </div>
    );
  }

  // ═══ GAMES OVERLAY ═══
  if (showGames) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: '#E2E8F0' }}>Circle Games</span>
          <button onClick={() => setShowGames(false)} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>
        {[
          { id: 'wyr', title: 'Would You Rather', icon: '⚡', color: '#EC4899', tag: 'Quick · 2 min' },
          { id: 'hot_take', title: 'Hot Takes', icon: '🔥', color: '#EF4444', tag: 'Debate · 3 min' },
          { id: 'this_that', title: 'This or That', icon: '⚖️', color: '#22D3EE', tag: 'Fast · 1 min' },
        ].map((g, i) => (
          <button key={i} onClick={() => startGame(g.id)} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 16, borderRadius: 14, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 10, cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.borderColor = g.color} onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${g.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{g.icon}</div>
            <div><div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{g.title}</div><div style={{ fontSize: 11, color: g.color }}>{g.tag}</div></div>
          </button>
        ))}
      </div>
    );
  }

  // ═══ GROUP CHAT ═══
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '10px 20px', background: 'rgba(132,204,22,0.06)', borderBottom: '1px solid rgba(132,204,22,0.15)', textAlign: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: '#84CC16', fontWeight: 600 }}>FRIEND CIRCLE · GROUP CHAT</span>
      </div>
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {messages.map(m => (
          <div key={m.id}>
            {m.sender === 'system' ? (
              <div style={{ textAlign: 'center', fontSize: 12, color: m.color, padding: '8px 0' }}>{m.text}</div>
            ) : (
              <div style={{ display: 'flex', justifyContent: m.sender === 'You' ? 'flex-end' : 'flex-start', gap: 8 }}>
                {m.sender !== 'You' && <div style={{ width: 28, height: 28, borderRadius: 8, background: `${m.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}><span style={{ fontSize: 11, fontWeight: 700, color: m.color }}>{m.sender[0]}</span></div>}
                <div>
                  {m.sender !== 'You' && <div style={{ fontSize: 11, color: m.color, marginBottom: 2 }}>{m.sender}</div>}
                  <div style={{ maxWidth: 240, padding: '9px 13px', borderRadius: 14, background: m.sender === 'You' ? '#F59E0B' : '#151B2B', borderBottomRightRadius: m.sender === 'You' ? 4 : 14, borderBottomLeftRadius: m.sender !== 'You' ? 4 : 14, color: m.sender === 'You' ? '#000' : '#E2E8F0', fontSize: 13, lineHeight: 1.5 }}>{m.text}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', borderTop: '1px solid #1E2740', display: 'flex', gap: 8, flexShrink: 0 }}>
        <button onClick={() => setShowGames(true)} style={{ width: 42, height: 42, borderRadius: 12, background: gameCompleted ? '#151B2B' : 'rgba(132,204,22,0.15)', border: '1px solid rgba(132,204,22,0.3)', color: '#84CC16', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🎮</button>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} placeholder="Message the circle..." style={{ flex: 1, height: 42, borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', padding: '0 14px', fontSize: 14, color: '#E2E8F0', outline: 'none', fontFamily: 'inherit' }} />
        <button onClick={sendMsg} style={{ width: 42, height: 42, borderRadius: 12, background: '#84CC16', border: 'none', color: '#000', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&rarr;</button>
      </div>
    </div>
  );
}

// ═══ VOICE STAGE ═══
function VoiceStage({ mode, onComplete }) {
  const deepMsgs = [
    { sender: 'Luna', color: '#8B5CF6', duration: '0:08', text: 'hey, it is me. i have been thinking about what you said earlier and honestly it stuck with me. like, the way you put that into words...' },
    { sender: 'You', color: '#F59E0B', duration: null, text: null },
    { sender: 'Luna', color: '#8B5CF6', duration: '0:12', text: 'okay so i know this might sound intense but i feel like i already know you? the way you think about things, it is rare.' },
  ];
  const circleMsgs = [
    { sender: 'Luna', color: '#EC4899', duration: '0:06', text: 'hey everyone! that game was so fun. sage your answers killed me honestly.' },
    { sender: 'Sage', color: '#22D3EE', duration: '0:07', text: 'haha thanks luna. echo i cannot believe you picked that option though, we need to talk.' },
    { sender: 'Echo', color: '#8B5CF6', duration: '0:05', text: 'listen, i stand by it. also this group is already my favourite people.' },
    { sender: 'You', color: '#F59E0B', duration: null, text: null },
  ];
  const voiceMessages = mode === 'circle' ? circleMsgs : deepMsgs;
  const stageLabel = mode === 'circle' ? 'FRIEND CIRCLE · VOICE CHAT' : 'DEEP CONNECTION · VOICE STAGE';
  const stageColor = mode === 'circle' ? '#84CC16' : '#F59E0B';

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recorded, setRecorded] = useState(false);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (playing && progress < 100) { const t = setTimeout(() => setProgress(p => p + 4), 120); return () => clearTimeout(t); }
    if (playing && progress >= 100) { setPlaying(false); if (current < voiceMessages.length - 1) setTimeout(() => setCurrent(c => c + 1), 800); }
  }, [playing, progress]);
  function playMsg() { setPlaying(true); setProgress(0); }
  function startRec() { setRecording(true); setTimeout(() => { setRecording(false); setRecorded(true); setTimeout(() => setCurrent(c => c + 1), 1000); }, 3000); }
  const allDone = current >= voiceMessages.length;
  useEffect(() => { if (allDone) { const t = setTimeout(onComplete, 2000); return () => clearTimeout(t); } }, [allDone]);
  const msg = voiceMessages[current];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ marginBottom: 20, textAlign: 'center' }}><span style={{ fontSize: 11, fontWeight: 600, color: stageColor }}>{stageLabel}</span></div>
      {mode === 'circle' && !allDone && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[...CIRCLE_MEMBERS, { name: 'You', color: '#F59E0B', initial: 'Y' }].map((m, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 10, background: `${m.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: msg && msg.sender === m.name ? `2px solid ${m.color}` : '2px solid transparent' }}><span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.initial}</span></div>
          ))}
        </div>
      )}
      {!allDone && (<>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${(msg?.color || stageColor)}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><span style={{ fontSize: 36 }}>🎙</span></div>
        {msg?.text ? (<>
          <div style={{ fontSize: 14, color: msg.color, fontWeight: 600, marginBottom: 6 }}>{msg.sender}</div>
          <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>{msg.duration}</div>
          <div style={{ width: '100%', maxWidth: 280, height: 6, borderRadius: 3, background: '#1E2740', marginBottom: 12 }}><div style={{ width: `${progress}%`, height: '100%', borderRadius: 3, background: msg.color, transition: 'width 0.1s' }} /></div>
          {playing && <div style={{ padding: 16, borderRadius: 14, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', maxWidth: 300, marginBottom: 16 }}><p style={{ fontSize: 13, color: '#94A3B8', fontStyle: 'italic', lineHeight: 1.6 }}>"{msg.text}"</p></div>}
          {!playing && progress === 0 && <button onClick={playMsg} style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: msg.color, color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Play message</button>}
          {!playing && progress >= 100 && <div style={{ fontSize: 13, color: '#22C55E' }}>✓ Listened</div>}
        </>) : (<>
          <div style={{ fontSize: 14, color: '#E2E8F0', marginBottom: 16 }}>Your turn — record a voice message</div>
          {!recorded && !recording && <button onClick={startRec} style={{ width: 64, height: 64, borderRadius: '50%', border: 'none', background: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(239,68,68,0.3)' }}><span style={{ fontSize: 24 }}>🎙</span></button>}
          {recording && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><div style={{ width: 64, height: 64, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1s infinite' }}><span style={{ fontSize: 24 }}>🎙</span></div><span style={{ fontSize: 13, color: '#EF4444' }}>Recording...</span></div>}
          {recorded && <div style={{ fontSize: 13, color: '#22C55E' }}>✓ Message sent</div>}
        </>)}
      </>)}
      {allDone && (<div style={{ textAlign: 'center' }}><div style={{ fontSize: 40, marginBottom: 12 }}>✓</div><div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: stageColor }}>Voice stage complete</div><div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{mode === 'circle' ? 'Your circle is bonding! Moving on...' : 'Both scored 4/5+. Reveal unlocked.'}</div></div>)}
    </div>
  );
}

// ═══ PHOTO REVEAL ═══
function RevealStage({ mode, onContinue, onFade }) {
  const [countdown, setCountdown] = useState(3);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (countdown > 0) { const t = setTimeout(() => setCountdown(c => c - 1), 1000); return () => clearTimeout(t); }
    if (countdown === 0 && !revealed) setRevealed(true);
  }, [countdown, revealed]);

  const deepCards = [
    { label: 'Luna', gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
    { label: 'You', gradient: 'linear-gradient(135deg, #22D3EE, #84CC16)' },
  ];
  const circleCards = [
    { label: 'Sage', gradient: 'linear-gradient(135deg, #22D3EE, #3B82F6)' },
    { label: 'Atlas', gradient: 'linear-gradient(135deg, #84CC16, #22C55E)' },
    { label: 'Echo', gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
    { label: 'You', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
  ];
  const cards = mode === 'circle' ? circleCards : deepCards;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      {!revealed ? (<>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, color: '#94A3B8', marginBottom: 12 }}>{mode === 'circle' ? 'Group photo reveal in' : 'Photo reveal in'}</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 72, fontWeight: 800, color: '#E2E8F0', marginBottom: 12, animation: 'pulse 1s infinite' }}>{countdown}</div>
        <div style={{ fontSize: 13, color: '#64748B' }}>{mode === 'circle' ? 'All photos appear simultaneously' : 'Both photos appear simultaneously'}</div>
      </>) : (<>
        <div style={{ display: 'flex', gap: mode === 'circle' ? 10 : 16, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {cards.map((p, i) => (
            <div key={i} style={{ width: mode === 'circle' ? 100 : 130, height: mode === 'circle' ? 120 : 160, borderRadius: 20, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', animation: `fadeIn ${0.5 + i * 0.3}s ease` }}>
              <span style={{ fontSize: mode === 'circle' ? 28 : 40, marginBottom: 6 }}>📸</span><span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{p.label}</span>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>{mode === 'circle' ? 'Circle revealed!' : 'Photos revealed'}</div>
        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>{mode === 'circle' ? 'Everyone revealed at the same moment. No one goes first.' : 'No power imbalance. Both at the same moment.'}</div>
        <div style={{ fontSize: 14, color: '#E2E8F0', marginBottom: 16 }}>{mode === 'circle' ? 'Want to continue with this circle?' : 'Would you like to continue with Luna?'}</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onContinue} style={{ padding: '14px 28px', borderRadius: 14, border: 'none', background: mode === 'circle' ? 'linear-gradient(135deg, #84CC16, #22C55E)' : 'linear-gradient(135deg, #22C55E, #16A34A)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Continue →</button>
          <button onClick={onFade} style={{ padding: '14px 28px', borderRadius: 14, border: '1.5px solid #334155', background: 'transparent', color: '#94A3B8', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{mode === 'circle' ? 'Leave' : 'Fade'}</button>
        </div>
      </>)}
    </div>
  );
}

// ═══ VIDEO CHAT ═══
function VideoStage({ mode, onComplete }) {
  const [step, setStep] = useState(0);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => { if (step === 0) { const t = setTimeout(() => setStep(1), 2500); return () => clearTimeout(t); } }, [step]);
  useEffect(() => {
    if (step === 1 && callTime < 15) { const t = setTimeout(() => setCallTime(c => c + 1), 1000); return () => clearTimeout(t); }
    if (step === 1 && callTime >= 15) setStep(2);
  }, [step, callTime]);
  const formatTime = (s) => `0:${s.toString().padStart(2, '0')}`;

  const deepParticipants = [
    { label: 'Luna', emoji: '👩', gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
    { label: 'You', emoji: '🧑', gradient: 'linear-gradient(135deg, #22D3EE, #84CC16)' },
  ];
  const circleParticipants = [
    { label: 'Sage', emoji: '🧑', gradient: 'linear-gradient(135deg, #22D3EE, #3B82F6)' },
    { label: 'Atlas', emoji: '👩', gradient: 'linear-gradient(135deg, #84CC16, #22C55E)' },
    { label: 'Echo', emoji: '🧑', gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
    { label: 'You', emoji: '🧑', gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)' },
  ];
  const participants = mode === 'circle' ? circleParticipants : deepParticipants;
  const stageColor = mode === 'circle' ? '#84CC16' : '#8B5CF6';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ marginBottom: 16 }}><span style={{ fontSize: 11, fontWeight: 600, color: stageColor }}>{mode === 'circle' ? 'GROUP VIDEO CALL' : 'VIDEO CALL'}</span></div>

      {step === 0 && (<>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: `${stageColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, animation: 'pulse 1.5s infinite' }}><span style={{ fontSize: 44 }}>📹</span></div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#E2E8F0', marginBottom: 6 }}>{mode === 'circle' ? 'Connecting the circle...' : 'Connecting to Luna...'}</div>
        <div style={{ fontSize: 13, color: '#94A3B8' }}>Setting up secure video</div>
      </>)}

      {step === 1 && (<>
        <div style={{ display: 'flex', gap: mode === 'circle' ? 8 : 16, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {participants.map((p, i) => (
            <div key={i} style={{ width: mode === 'circle' ? 100 : 140, height: mode === 'circle' ? 120 : 180, borderRadius: 20, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative' }}>
              <span style={{ fontSize: mode === 'circle' ? 32 : 44, marginBottom: 6 }}>{p.emoji}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{p.label}</span>
              <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }} />
            </div>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>{formatTime(callTime)}</div>
        <div style={{ fontSize: 13, color: '#22C55E', marginBottom: 16 }}>{mode === 'circle' ? 'Group video call in progress' : 'Video call in progress'}</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[{ icon: '🔇', label: 'Mute' }, { icon: '📷', label: 'Camera' }, { icon: '💬', label: 'Chat' }].map((b, i) => (
            <div key={i} style={{ width: 48, height: 48, borderRadius: 14, background: '#151B2B', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{b.icon}</div>
          ))}
          <button onClick={() => setStep(2)} style={{ width: 48, height: 48, borderRadius: 14, background: '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>📞</button>
        </div>
      </>)}

      {step === 2 && (<>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${stageColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><span style={{ fontSize: 36 }}>📹</span></div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#E2E8F0', marginBottom: 4 }}>Call ended</div>
        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Duration: {formatTime(callTime)}</div>
        {mode === 'circle' ? (<>
          <div style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Sage and Echo want to continue the circle. Atlas is still deciding.</div>
          <div style={{ fontSize: 15, color: '#E2E8F0', marginBottom: 16, fontWeight: 500 }}>Do you want to continue this circle?</div>
        </>) : (<>
          <div style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Luna also wants to continue this connection.</div>
          <div style={{ fontSize: 15, color: '#E2E8F0', marginBottom: 16, fontWeight: 500 }}>Do you want to continue this match?</div>
        </>)}
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => onComplete('continue')} style={{ padding: '14px 28px', borderRadius: 14, border: 'none', background: mode === 'circle' ? 'linear-gradient(135deg, #84CC16, #22C55E)' : 'linear-gradient(135deg, #22C55E, #16A34A)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{mode === 'circle' ? 'Continue circle' : 'Continue match'}</button>
          <button onClick={() => onComplete('fade')} style={{ padding: '14px 28px', borderRadius: 14, border: '1.5px solid #334155', background: 'transparent', color: '#94A3B8', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{mode === 'circle' ? 'Leave circle' : 'Fade match'}</button>
        </div>
      </>)}
    </div>
  );
}

// ═══ FADE / LEAVE SCREEN ═══
function FadeStage({ mode }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(100,116,139,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 36 }}>🌙</span>
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: '#E2E8F0', marginBottom: 8 }}>{mode === 'circle' ? 'You left the circle' : 'Match faded gracefully'}</div>
      <div style={{ padding: 20, borderRadius: 16, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 24, maxWidth: 320 }}>
        <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7 }}>{mode === 'circle' ? 'No hard feelings. The remaining members can continue their circle without you. That is how Riff keeps things pressure-free.' : 'No awkwardness. No ghosting. Just a respectful end that both people feel okay about. That is how Riff works.'}</p>
      </div>
      <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>{mode === 'circle' ? 'In the real app, you would be matched into a new circle based on your answers.' : 'In the real app, you would be matched with someone new based on your compatibility answers.'}</div>
      <a href="/#pricing" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>View plans from £2.99/mo</a>
    </div>
  );
}

// ═══ FINAL CELEBRATION ═══
function FinalStage({ mode }) {
  const [showFeatures, setShowFeatures] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowFeatures(true), 1200); return () => clearTimeout(t); }, []);

  if (mode === 'deep') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 12, animation: 'fadeIn 1s ease' }}>🎉</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
          <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Congratulations!</span>
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, color: '#E2E8F0', marginBottom: 6 }}>Both parties chose to continue</div>
        <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24 }}>All features are now unlocked</div>

        {showFeatures && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 300, marginBottom: 24, animation: 'fadeIn 0.8s ease' }}>
            {[
              { icon: '💬', label: 'Unlimited chat', desc: 'Text messaging with no limits', color: '#22D3EE' },
              { icon: '🎙', label: 'Voice messages', desc: 'Send and receive voice notes anytime', color: '#F59E0B' },
              { icon: '📹', label: 'Video calls', desc: 'Face-to-face whenever you want', color: '#8B5CF6' },
              { icon: '📖', label: 'Life chapters', desc: 'Share your deeper stories', color: '#EC4899' },
              { icon: '📸', label: 'Shared memories', desc: 'Build a timeline together', color: '#84CC16' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 14, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', animation: `fadeIn ${0.3 + i * 0.15}s ease` }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>That was a taste of Riff. Ready for the real thing?</div>
        <a href="/#pricing" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>View plans from £2.99/mo</a>
      </div>
    );
  }

  // Friend Circle final
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 12, animation: 'fadeIn 1s ease' }}>🎉</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800 }}>
        <span style={{ background: 'linear-gradient(135deg, #84CC16, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Congratulations!</span>
      </div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, color: '#E2E8F0', marginTop: 4, marginBottom: 6 }}>3 of 4 members chose to continue</div>
      <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>Your circle is now fully connected — all features are open!</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[{ name: 'Sage', color: '#22D3EE', initial: 'S', stayed: true }, { name: 'Atlas', color: '#84CC16', initial: 'A', stayed: false }, { name: 'Echo', color: '#8B5CF6', initial: 'E', stayed: true }, { name: 'You', color: '#F59E0B', initial: 'Y', stayed: true }].map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: m.stayed ? 1 : 0.35, animation: `fadeIn ${0.3 + i * 0.15}s ease` }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${m.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: m.color }}>{m.initial}</span>
            </div>
            <span style={{ fontSize: 10, color: m.stayed ? '#22C55E' : '#64748B' }}>{m.stayed ? '✓ stayed' : 'left'}</span>
          </div>
        ))}
      </div>

      {showFeatures && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 300, marginBottom: 24, animation: 'fadeIn 0.8s ease' }}>
          {[
            { icon: '💬', label: 'Group chat', desc: 'Unlimited group messaging', color: '#84CC16' },
            { icon: '🎙', label: 'Voice messages', desc: 'Voice notes to the group', color: '#F59E0B' },
            { icon: '📹', label: 'Group video calls', desc: 'Video chat with your circle', color: '#22D3EE' },
            { icon: '🎮', label: 'Circle games', desc: 'All 8 games unlocked', color: '#EC4899' },
            { icon: '📅', label: 'Meetup calendar', desc: 'Plan real-life hangouts', color: '#8B5CF6' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 14, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', animation: `fadeIn ${0.3 + i * 0.15}s ease` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{f.label}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>That was a taste of Riff. Ready for the real thing?</div>
      <a href="/#pricing" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: 14, background: 'linear-gradient(135deg, #84CC16, #22C55E)', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>View plans from £2.99/mo</a>
    </div>
  );
}

// ═══ MAIN ═══
export default function TryBot() {
  const [stage, setStage] = useState('verify');
  const [mode, setMode] = useState(null);
  function handleModeSelect(m) { setMode(m); setStage('questions'); }
  function handleQuestionsComplete() { setStage('matchfound'); }
  function handleMatchComplete() { setStage(mode === 'deep' ? 'chat' : 'groupchat'); }

  const stageOrder = mode === 'deep'
    ? ['verify','mode','questions','matchfound','chat','voice','reveal','video','final']
    : ['verify','mode','questions','matchfound','groupchat','voice','reveal','video','final'];
  const currentIdx = stageOrder.indexOf(stage);

  return (
    <div style={{ height: '100vh', maxHeight: '100dvh', background: '#050816', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #1E2740', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <a href="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: 22 }}>&lsaquo;</a>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 16, fontWeight: 700, color: '#8B5CF6' }}>R</span></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>Try Riff</div><div style={{ fontSize: 11, color: '#22C55E' }}>demo experience</div></div>
        <div style={{ display: 'flex', gap: 4 }}>
          {stageOrder.map((s, i) => (
            <div key={i} style={{ width: 20, height: 3, borderRadius: 2, background: currentIdx >= i ? 'linear-gradient(90deg, #8B5CF6, #EC4899)' : '#1E2740' }} />
          ))}
        </div>
      </div>

      {stage === 'verify' && <VerificationStage onComplete={() => setStage('mode')} />}
      {stage === 'mode' && <ModeSelectStage onSelect={handleModeSelect} />}
      {stage === 'questions' && <QuestionsStage mode={mode} onComplete={handleQuestionsComplete} />}
      {stage === 'matchfound' && <MatchFoundStage mode={mode} onComplete={handleMatchComplete} />}
      {stage === 'chat' && <ChatStage onComplete={() => setStage('voice')} />}
      {stage === 'groupchat' && <GroupChatStage onComplete={() => setStage('voice')} />}
      {stage === 'voice' && <VoiceStage mode={mode} onComplete={() => setStage('reveal')} />}
      {stage === 'reveal' && <RevealStage mode={mode} onContinue={() => setStage('video')} onFade={() => setStage('fade')} />}
      {stage === 'video' && <VideoStage mode={mode} onComplete={(decision) => setStage(decision === 'continue' ? 'final' : 'fade')} />}
      {stage === 'fade' && <FadeStage mode={mode} />}
      {stage === 'final' && <FinalStage mode={mode} />}

      <style jsx>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        input::placeholder { color: #64748B; }
        @media (min-width: 768px) { div[style*="height: 100vh"] { max-width: 480px; margin: 0 auto; border-left: 1px solid #1E2740; border-right: 1px solid #1E2740; } }
      `}</style>
    </div>
  );
}
