'use client';
import { useState, useEffect } from 'react';

const API = 'https://web-production-31dae.up.railway.app';

// ═══ CONTENT STUDIO CONFIG ═══
const PLATFORMS = [
  { key: 'tiktok', label: 'TikTok / Reels', icon: '🎬', format: 'a TikTok/Reels concept: a punchy 3-second hook line, then a short voiceover script (about 25–35 seconds), 3–4 on-screen text captions, and 4–6 hashtags.' },
  { key: 'instagram', label: 'Instagram', icon: '📸', format: 'an Instagram caption: a scroll-stopping first line, 2–3 short paragraphs, a clear CTA, then 6–8 relevant hashtags on a new line.' },
  { key: 'twitter', label: 'X / Twitter', icon: '💬', format: 'an X/Twitter thread of 4–6 tweets. Number each tweet (1/, 2/ …). The first tweet must hook hard. Keep every tweet under 280 characters.' },
  { key: 'reddit', label: 'Reddit', icon: '💭', format: 'a Reddit post for a relevant community: an honest, curiosity-driven title, then a value-first body that tells a real story or shares a genuine insight. Reddit dislikes ads, so keep any mention of Riff light and authentic, only at the end.' },
  { key: 'blog', label: 'Blog', icon: '📝', format: 'a blog opener: an SEO-friendly headline, a 2-paragraph introduction that earns the read, then a short outline of 4–5 H2 section headings.' },
  { key: 'linkedin', label: 'LinkedIn', icon: '💼', format: 'a LinkedIn post: a strong opening line (before the "see more" fold), then 5–8 short paragraphs mixing story and insight, ending with a question. Professional but human.' },
  { key: 'appstore', label: 'App Store', icon: '📱', format: 'App Store / Play Store copy: a tagline (under 30 chars), a subtitle (under 50 chars), then a description with 3 feature paragraphs, each led by an emoji.' },
  { key: 'press', label: 'Press Release', icon: '🌐', format: 'a press release: a clear headline, a dateline, a strong lead paragraph, 2 body paragraphs with quotes, and a boilerplate "About Riff" section.' },
];

const TOPICS = [
  { key: 'loneliness', label: 'Loneliness epidemic', prompt: 'the modern loneliness crisis — people are more connected digitally but lonelier than ever' },
  { key: 'swiping', label: 'Swiping culture', prompt: 'why swiping culture is broken and what genuine connection looks like instead' },
  { key: 'trust', label: 'Trust & safety', prompt: 'how Riff builds trust through verification, staged reveals, and real identity' },
  { key: 'voice', label: 'Voice connection', prompt: 'why hearing someone\'s voice before seeing their face changes everything about connection' },
  { key: 'friendship', label: 'Adult friendships', prompt: 'the difficulty of making real friends as an adult and how technology can help' },
  { key: 'reveal', label: 'The reveal moment', prompt: 'the simultaneous photo reveal — no power imbalance, no one-sided judgment' },
  { key: 'custom', label: 'Custom topic', prompt: '' },
];

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [flags, setFlags] = useState([]);
  // Content studio state
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [customTopic, setCustomTopic] = useState('');
  const [postCount, setPostCount] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState({});
  const [copied, setCopied] = useState(null);

  async function adminFetch(path, opts = {}) {
    const res = await fetch(API + path, { ...opts, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, ...opts.headers } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  async function login() {
    setLoginError('');
    const trimEmail = email.trim().toLowerCase();
    const trimPass = password.trim();
    console.log('Login attempt:', trimEmail, trimPass.length, 'chars');
    try {
      const res = await fetch(API + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: trimEmail, password: trimPass }) });
      const data = await res.json();
      console.log('Login response:', res.status, data);
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setToken(data.token);
    } catch (e) { setLoginError(e.message); }
  }

  useEffect(() => {
    if (!token) return;
    if (tab === 'dashboard') adminFetch('/api/admin/stats').then(setStats).catch(() => {});
    if (tab === 'users') adminFetch('/api/admin/users?search=' + userSearch).then(d => setUsers(d.users || [])).catch(() => {});
    if (tab === 'flags') adminFetch('/api/admin/flags').then(d => setFlags(d.flags || [])).catch(() => {});
  }, [token, tab, userSearch]);

  async function resolveFlag(id, action) {
    try {
      await adminFetch('/api/admin/flags/' + id + '/resolve', { method: 'POST', body: JSON.stringify({ action, notes: action }) });
      setFlags(f => f.filter(fl => fl.id !== id));
    } catch {}
  }

  // ═══ CONTENT STUDIO FUNCTIONS ═══
  function togglePlatform(key) {
    setSelectedPlatforms(p => p.includes(key) ? p.filter(k => k !== key) : [...p, key]);
  }

  async function generateContent() {
    if (!selectedPlatforms.length || !selectedTopic) return;
    setGenerating(true);
    setResults({});
    const topic = selectedTopic === 'custom' ? customTopic : TOPICS.find(t => t.key === selectedTopic)?.prompt;
    for (const platKey of selectedPlatforms) {
      const platform = PLATFORMS.find(p => p.key === platKey);
      const initResults = Array.from({ length: postCount }, () => ({ status: 'loading', text: '' }));
      setResults(r => ({ ...r, [platKey]: initResults }));
      for (let i = 0; i < postCount; i++) {
        try {
          const res = await adminFetch('/api/admin/generate-content', {
            method: 'POST',
            body: JSON.stringify({ topic, platform: platform.label, format: platform.format, variety: postCount > 1 ? `\nThis is variation ${i + 1} of ${postCount}. Make each one distinctly different in angle and tone.` : '' }),
          });
          setResults(r => {
            const arr = [...(r[platKey] || [])]; arr[i] = { status: 'done', text: res.text };
            return { ...r, [platKey]: arr };
          });
        } catch {
          setResults(r => {
            const arr = [...(r[platKey] || [])]; arr[i] = { status: 'error', text: '' };
            return { ...r, [platKey]: arr };
          });
        }
      }
    }
    setGenerating(false);
  }

  function copyText(id, text) {
    navigator.clipboard.writeText(text); setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  // ═══ LOGIN SCREEN ═══
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: '#050816', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)' }}>
        <div style={{ width: 360, padding: 32, borderRadius: 20, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Riff Admin</div>
          <div style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Sign in with your admin account</div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', color: '#E2E8F0', fontSize: 14, marginBottom: 10, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" onKeyDown={e => e.key === 'Enter' && login()} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', color: '#E2E8F0', fontSize: 14, marginBottom: 16, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          {loginError && <div style={{ fontSize: 13, color: '#EF4444', marginBottom: 12 }}>{loginError}</div>}
          <button onClick={login} style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Sign in</button>
        </div>
      </div>
    );
  }

  // ═══ ADMIN DASHBOARD ═══
  const TABS = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'users', label: 'Users', icon: '👥' },
    { key: 'flags', label: 'Safety', icon: '🛡' },
    { key: 'content', label: 'Content Studio', icon: '✨' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#050816', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo.png" alt="Riff" width={28} height={28} style={{ borderRadius: 6 }} />
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Riff</span>
          </a>
          <span style={{ fontSize: 13, color: '#64748B', marginLeft: 8 }}>Admin</span>
        </div>
        <button onClick={() => { setToken(null); }} style={{ fontSize: 13, color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 24 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
              background: tab === t.key ? '#1E2740' : 'transparent', color: tab === t.key ? '#E2E8F0' : '#64748B',
            }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* ═══ DASHBOARD TAB ═══ */}
        {tab === 'dashboard' && (
          <div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 20 }}>Dashboard</h2>
            {stats ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Total users', value: stats.totalUsers, color: '#8B5CF6' },
                  { label: 'Active (24h)', value: stats.activeUsers24h, color: '#22D3EE' },
                  { label: 'Paid users', value: stats.paidUsers, color: '#22C55E' },
                  { label: 'Connections', value: stats.activeConnections, color: '#EC4899' },
                  { label: 'Active circles', value: stats.activeCircles, color: '#84CC16' },
                  { label: 'Pending flags', value: stats.pendingFlags, color: stats.pendingFlags > 0 ? '#EF4444' : '#64748B' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: 20, borderRadius: 16, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            ) : <div style={{ color: '#64748B', fontSize: 14 }}>Loading stats...</div>}
          </div>
        )}

        {/* ═══ USERS TAB ═══ */}
        {tab === 'users' && (
          <div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 16 }}>Users</h2>
            <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search by alias or email..." style={{ width: '100%', maxWidth: 400, padding: '10px 14px', borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', color: '#E2E8F0', fontSize: 14, marginBottom: 16, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 0.8fr 0.8fr 0.8fr', padding: '10px 16px', background: '#0F1420', fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <span>Alias</span><span>Email</span><span>Plan</span><span>Trust</span><span>Status</span>
              </div>
              {users.map((u, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 0.8fr 0.8fr 0.8fr', padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: 13, color: '#94A3B8', alignItems: 'center' }}>
                  <span style={{ color: '#E2E8F0', fontWeight: 500 }}>{u.alias}</span>
                  <span>{u.email}</span>
                  <span style={{ color: u.plan === 'free' ? '#64748B' : '#22C55E' }}>{u.plan}</span>
                  <span style={{ color: u.trustScore === 'green' ? '#22C55E' : u.trustScore === 'yellow' ? '#F59E0B' : '#EF4444' }}>●</span>
                  <span style={{ color: u.isBanned ? '#EF4444' : '#22C55E' }}>{u.isBanned ? 'Banned' : 'Active'}</span>
                </div>
              ))}
              {users.length === 0 && <div style={{ padding: 20, textAlign: 'center', color: '#64748B', fontSize: 13 }}>No users found</div>}
            </div>
          </div>
        )}

        {/* ═══ FLAGS TAB ═══ */}
        {tab === 'flags' && (
          <div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 16 }}>Safety flags</h2>
            {flags.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', borderRadius: 16, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
                <div style={{ fontSize: 14, color: '#22C55E' }}>No pending flags</div>
              </div>
            ) : flags.map((f, i) => (
              <div key={i} style={{ padding: 16, borderRadius: 14, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{f.user?.alias || 'Unknown'}</span>
                    <span style={{ fontSize: 12, color: '#64748B', marginLeft: 8 }}>{f.type}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#64748B' }}>{new Date(f.createdAt).toLocaleDateString()}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 12, lineHeight: 1.6 }}>{f.content || f.reason || 'No details'}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => resolveFlag(f.id, 'dismiss')} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #1E2740', background: 'transparent', color: '#94A3B8', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Dismiss</button>
                  <button onClick={() => resolveFlag(f.id, 'warn')} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#F59E0B', color: '#000', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Warn</button>
                  <button onClick={() => resolveFlag(f.id, 'ban')} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#EF4444', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Ban</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ CONTENT STUDIO TAB ═══ */}
        {tab === 'content' && (
          <div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Content Studio</h2>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>AI-powered content generation for Riff's social channels</p>

            {/* Topic Selection */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Topic</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TOPICS.map(t => (
                  <button key={t.key} onClick={() => setSelectedTopic(t.key)} style={{
                    padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                    border: selectedTopic === t.key ? '1.5px solid #22D3EE' : '1px solid rgba(255,255,255,0.06)',
                    background: selectedTopic === t.key ? 'rgba(34,211,238,0.1)' : '#0F1420',
                    color: selectedTopic === t.key ? '#22D3EE' : '#94A3B8',
                  }}>{t.label}</button>
                ))}
              </div>
              {selectedTopic === 'custom' && (
                <input value={customTopic} onChange={e => setCustomTopic(e.target.value)} placeholder="Describe your topic..." style={{ width: '100%', marginTop: 10, padding: '10px 14px', borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', color: '#E2E8F0', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              )}
            </div>

            {/* Platform Selection */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Platforms</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {PLATFORMS.map(p => (
                  <button key={p.key} onClick={() => togglePlatform(p.key)} style={{
                    padding: '12px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center',
                    border: selectedPlatforms.includes(p.key) ? '1.5px solid #8B5CF6' : '1px solid rgba(255,255,255,0.06)',
                    background: selectedPlatforms.includes(p.key) ? 'rgba(139,92,246,0.1)' : '#0F1420',
                    color: selectedPlatforms.includes(p.key) ? '#E2E8F0' : '#64748B',
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{p.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 500 }}>{p.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Post Count */}
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5 }}>Variations</span>
              {[1, 2, 3].map(n => (
                <button key={n} onClick={() => setPostCount(n)} style={{
                  width: 36, height: 36, borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                  border: postCount === n ? '1.5px solid #EC4899' : '1px solid rgba(255,255,255,0.06)',
                  background: postCount === n ? 'rgba(236,72,153,0.1)' : '#0F1420',
                  color: postCount === n ? '#EC4899' : '#64748B',
                }}>{n}</button>
              ))}
            </div>

            {/* Generate Button */}
            <button onClick={generateContent} disabled={generating || !selectedPlatforms.length || !selectedTopic || (selectedTopic === 'custom' && !customTopic)} style={{
              padding: '14px 32px', borderRadius: 14, border: 'none', cursor: generating ? 'default' : 'pointer', fontFamily: 'inherit',
              background: generating ? '#1E2740' : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              color: generating ? '#64748B' : '#fff', fontWeight: 600, fontSize: 15, opacity: (!selectedPlatforms.length || !selectedTopic) ? 0.5 : 1,
            }}>
              {generating ? '✨ Generating...' : `✨ Generate ${selectedPlatforms.length} platform${selectedPlatforms.length !== 1 ? 's' : ''} × ${postCount} variation${postCount !== 1 ? 's' : ''}`}
            </button>

            {/* Results */}
            {Object.keys(results).length > 0 && (
              <div style={{ marginTop: 24 }}>
                {Object.entries(results).map(([platKey, posts]) => {
                  const plat = PLATFORMS.find(p => p.key === platKey);
                  return (
                    <div key={platKey} style={{ marginBottom: 16, borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div style={{ padding: '12px 18px', background: '#0F1420', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ fontSize: 16 }}>{plat?.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0' }}>{plat?.label}</span>
                      </div>
                      {posts.map((r, idx) => {
                        const id = `${platKey}-${idx}`;
                        return (
                          <div key={idx} style={{ padding: '14px 18px', borderTop: idx ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: r.status === 'done' ? 8 : 0 }}>
                              {posts.length > 1 && <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Variation {idx + 1}</span>}
                              {r.status === 'done' && (
                                <button onClick={() => copyText(id, r.text)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, color: copied === id ? '#22D3EE' : '#64748B', padding: '5px 10px', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', marginLeft: 'auto' }}>
                                  {copied === id ? '✓ Copied' : '📋 Copy'}
                                </button>
                              )}
                            </div>
                            {r.status === 'loading' && <div style={{ color: '#64748B', fontSize: 14 }}>✨ Drafting...</div>}
                            {r.status === 'error' && <div style={{ color: '#EF4444', fontSize: 14 }}>Failed — run again to retry</div>}
                            {r.status === 'done' && <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: 14, lineHeight: 1.65, color: '#E2E8F0' }}>{r.text}</pre>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}

            <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24, marginBottom: 40 }}>AI-drafted — give each post a quick human read before it goes live.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(3"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="gridTemplateColumns: repeat(4"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="gridTemplateColumns: 1.5fr 2fr"] { grid-template-columns: 1fr !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  );
}
