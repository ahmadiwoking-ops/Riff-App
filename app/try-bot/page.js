'use client';
import { useState, useRef, useEffect } from 'react';

const API = 'https://web-production-31dae.up.railway.app';
const MAX_MESSAGES = 7;

const SAFETY_PATTERNS = [
  { pattern: /\b(kill|murder|bomb|attack|shoot|stab)\b/i, type: 'violence' },
  { pattern: /\b(sex|nude|naked|porn|nsfw)\b/i, type: 'explicit' },
  { pattern: /\b(drug|cocaine|heroin|meth|weed)\b/i, type: 'drugs' },
  { pattern: /\b(suicide|kill myself|end it all|want to die)\b/i, type: 'crisis' },
  { pattern: /\b(underage|minor|child|kid)\b.*\b(date|sex|meet)\b/i, type: 'predatory' },
];

function checkSafety(message) {
  const lower = message.toLowerCase();
  for (const s of SAFETY_PATTERNS) {
    if (s.pattern.test(lower)) return s.type;
  }
  return null;
}

const SAFETY_RESPONSES = {
  violence: "I cannot engage with violent content. This is a space for genuine human connection. If you are experiencing thoughts of harming yourself or others, please contact emergency services or the Samaritans on 116 123.",
  explicit: "Riff is designed for depth, not that kind of conversation. Let us keep things respectful.",
  drugs: "I cannot discuss illegal substances. Let us talk about something more meaningful.",
  crisis: "I hear you, and I care. Please reach out to someone who can help right now. Samaritans: 116 123 (free, 24/7). You matter more than you know.",
  predatory: "This conversation is being ended for safety reasons.",
};

const LOCAL_RESPONSES = {
  greetings: [
    "hey! glad you decided to try this. i'm luna, 27, from lisbon. what should i call you?",
    "oh hi! i was just making coffee. perfect timing. tell me something about yourself?",
    "hey there. so this is what riff feels like. no photos, no pressure, just... talking. what brings you here?",
  ],
  reactions: [
    "wait i love that. tell me more",
    "okay that actually made me smile",
    "hmm. i did not expect that answer but i really like it",
    "that is so specific and i am here for it",
    "okay you just got way more interesting",
    "hold on. i need to think about that for a second",
    "i actually relate to that more than i expected",
    "you know what, nobody has ever said that to me before",
  ],
  questions: [
    "okay real question. what is something you think about but never say out loud?",
    "if you could wake up tomorrow with one new ability, what would it be?",
    "what is a song that makes you feel something you cannot explain?",
    "when was the last time you felt completely at peace?",
    "what does home feel like to you? not a place. a feeling",
    "if your younger self could see you now, what would they think?",
    "what is the most important conversation you have ever had?",
  ],
  deep: [
    "i think about that too. the gap between who we are and who we show people",
    "you know what scares me? not being alone. being with someone and still feeling alone",
    "i think vulnerability is the bravest thing. harder than anything physical",
    "sometimes i wonder if the people we lose teach us more than the people who stay",
    "there is this concept i love - that the people who understand you without explanation are your people",
  ],
  funny: [
    "okay but why is that so accurate it hurts a little",
    "i just snorted laughing. my cat pessoa is judging me. worth it though",
    "adding that to my list of things that keep me up at 3am",
    "that is the most chaotic thing i have heard today and i love it",
  ],
  empathy: [
    "i hear you. that sounds really hard and i am glad you told me",
    "you do not have to have it all figured out. nobody does",
    "it is okay to not be okay. genuinely",
    "i think what you are feeling makes complete sense",
  ],
  farewell: [
    "this was really nice. i hope you got a feel for what riff is about - real conversations, real depth. see you on the app?",
    "okay i have to go but honestly? this was a good chat. imagine doing this with someone who actually matched your personality. that is what riff does.",
    "that is our last message but i wanted to say - you are interesting to talk to. the real version of this, with someone matched to you, is even better.",
  ],
};

function getLocalResponse(message, msgCount) {
  const lower = message.toLowerCase().trim();

  if (msgCount >= MAX_MESSAGES - 1) {
    return LOCAL_RESPONSES.farewell[Math.floor(Math.random() * LOCAL_RESPONSES.farewell.length)];
  }

  if (/^(hi|hey|hello|yo|sup|hiya)/.test(lower)) {
    return LOCAL_RESPONSES.greetings[Math.floor(Math.random() * LOCAL_RESPONSES.greetings.length)];
  }

  if (/sad|depressed|lonely|anxious|worried|scared|hurt|struggle|difficult|hard time/.test(lower)) {
    return LOCAL_RESPONSES.empathy[Math.floor(Math.random() * LOCAL_RESPONSES.empathy.length)];
  }

  if (/lol|haha|funny|hilarious|laugh/.test(lower)) {
    return LOCAL_RESPONSES.funny[Math.floor(Math.random() * LOCAL_RESPONSES.funny.length)];
  }

  if (lower.includes('?') || lower.startsWith('what') || lower.startsWith('how') || lower.startsWith('why')) {
    return LOCAL_RESPONSES.deep[Math.floor(Math.random() * LOCAL_RESPONSES.deep.length)];
  }

  if (message.length < 15) {
    return LOCAL_RESPONSES.questions[Math.floor(Math.random() * LOCAL_RESPONSES.questions.length)];
  }

  if (message.length > 80) {
    return LOCAL_RESPONSES.reactions[Math.floor(Math.random() * LOCAL_RESPONSES.reactions.length)] +
      '. ' + LOCAL_RESPONSES.questions[Math.floor(Math.random() * LOCAL_RESPONSES.questions.length)];
  }

  const all = [...LOCAL_RESPONSES.reactions, ...LOCAL_RESPONSES.questions, ...LOCAL_RESPONSES.deep];
  return all[Math.floor(Math.random() * all.length)];
}

export default function TryBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [ended, setEnded] = useState(false);
  const [safetyWarning, setSafetyWarning] = useState(0);
  const [history, setHistory] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        { id: 0, text: "hey. welcome to riff. i'm luna - 27, lisbon, bookshop worker, cat mum. this is a sample of what chatting feels like here. you have " + MAX_MESSAGES + " messages. make them count. what should i call you?", sender: 'bot' },
      ]);
      setHistory([{ role: 'assistant', content: "hey. welcome to riff. i'm luna - 27, lisbon, bookshop worker, cat mum. this is a sample of what chatting feels like here. you have " + MAX_MESSAGES + " messages. make them count. what should i call you?" }]);
    }, 800);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  async function send() {
    if (!input.trim() || ended) return;
    const text = input.trim();
    setInput('');

    // Safety check
    const safetyType = checkSafety(text);
    if (safetyType) {
      const newWarning = safetyWarning + 1;
      setSafetyWarning(newWarning);

      setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);

      if (safetyType === 'crisis') {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: SAFETY_RESPONSES.crisis, sender: 'system' }]);
        return;
      }

      if (newWarning >= 2 || safetyType === 'predatory') {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "This conversation has been ended due to safety policy violations. Riff is a space for genuine, respectful connection.", sender: 'system' }]);
        setEnded(true);
        return;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Warning: " + SAFETY_RESPONSES[safetyType] + " This is your first warning. One more violation will end the conversation.", sender: 'system' }]);
      return;
    }

    const newCount = msgCount + 1;
    setMsgCount(newCount);

    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);

    if (newCount >= MAX_MESSAGES) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "that was our last message. i hope you felt something real here - no photos, no swiping, just genuine conversation. imagine doing this with someone perfectly matched to your personality. that is what riff does. see you on the app?",
          sender: 'bot'
        }]);
        setEnded(true);
      }, 2000);
      return;
    }

    setTyping(true);
    const newHistory = [...history, { role: 'user', content: text }];
    setHistory(newHistory);

    // Try API first, fallback to local
    let botText;
    try {
      const res = await fetch(API + '/api/bot/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId: 'web-demo', message: text, conversationHistory: newHistory.slice(-6) }),
      });
      console.log('[try-bot] status', res.status);
      if (res.ok) {
        const data = await res.json();
        botText = data.response || data.text;
      }
      // 429 = rate limited; fall through to local Luna so the visitor still gets a smooth reply
    } catch (e) { console.error('[try-bot] fetch failed:', e); }

    if (!botText) {
      botText = getLocalResponse(text, newCount);
    }

    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
      setHistory(prev => [...prev, { role: 'assistant', content: botText }]);
    }, delay);
  }

  return (
    <div style={{ height: '100vh', maxHeight: '100dvh', background: '#050816', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E2740', display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: 22 }}>&lsaquo;</a>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#8B5CF6' }}>L</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>Luna</div>
          <div style={{ fontSize: 11, color: '#22C55E' }}>online</div>
        </div>
        <div style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(34,211,238,0.1)', fontSize: 11, color: '#22D3EE', fontWeight: 600 }}>
          {ended ? 'Chat ended' : (MAX_MESSAGES - msgCount) + ' messages left'}
        </div>
      </div>

      {/* Info banner */}
      <div style={{ padding: '10px 20px', background: 'rgba(139,92,246,0.06)', borderBottom: '1px solid rgba(139,92,246,0.15)', textAlign: 'center' }}>
        <span style={{ fontSize: 11, color: '#8B5CF6', fontWeight: 600 }}>SAMPLE CHAT &mdash; {MAX_MESSAGES} messages to experience Riff</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : msg.sender === 'system' ? 'center' : 'flex-start' }}>
            {msg.sender === 'system' ? (
              <div style={{ maxWidth: '85%', padding: '10px 14px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', fontSize: 13, color: '#EF4444', lineHeight: 1.6, textAlign: 'center' }}>
                {msg.text}
              </div>
            ) : (
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: 18,
                background: msg.sender === 'user' ? '#22D3EE' : '#151B2B',
                borderBottomRightRadius: msg.sender === 'user' ? 4 : 18,
                borderBottomLeftRadius: msg.sender === 'bot' ? 4 : 18,
                color: msg.sender === 'user' ? '#000' : '#E2E8F0',
                fontSize: 14, lineHeight: 1.6,
              }}>
                {msg.text}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '10px 14px', borderRadius: 18, borderBottomLeftRadius: 4, background: '#151B2B', fontSize: 13, color: '#94A3B8' }}>
              Luna is typing<span className="typing-dots">...</span>
            </div>
          </div>
        )}

        {ended && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 16 }}>Want the full experience with someone matched to you?</div>
            <a href="/#pricing" style={{
              display: 'inline-block', padding: '14px 32px', borderRadius: 14,
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none',
            }}>
              View plans from £2.99/mo
            </a>
          </div>
        )}
      </div>

      {/* Input */}
      {!ended && (
        <div style={{ padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', borderTop: '1px solid #1E2740', display: 'flex', gap: 8, flexShrink: 0 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            style={{
              flex: 1, height: 42, borderRadius: 12, border: '1px solid #1E2740',
              background: '#151B2B', padding: '0 14px', fontSize: 14, color: '#E2E8F0',
              outline: 'none', fontFamily: 'inherit',
            }}
          />
          <button onClick={send} style={{
            width: 42, height: 42, borderRadius: 12, background: '#22D3EE',
            border: 'none', color: '#000', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            &rarr;
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes dotPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .typing-dots { animation: dotPulse 1.2s infinite; }
        input::placeholder { color: #64748B; }
        @media (min-width: 768px) {
          div[style*="height: 100vh"] { max-width: 480px; margin: 0 auto; border-left: 1px solid #1E2740; border-right: 1px solid #1E2740; }
        }
      `}</style>
    </div>
  );
}
