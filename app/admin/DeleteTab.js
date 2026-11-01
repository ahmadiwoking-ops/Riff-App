'use client';
// Secure account deletion. Only shown to accounts in ADMIN_DELETE_USER_IDS.
// Unlock (password + authenticator code) gives a delete token for 5 minutes,
// held only in memory - refreshing the page locks it again.
import { useState, useEffect } from 'react';

const box = { padding: 20, borderRadius: 16, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16 };
const field = { width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', color: '#E2E8F0', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' };
const lbl = { fontSize: 12, color: '#94A3B8', fontWeight: 600, marginBottom: 6, display: 'block' };
const hint = { fontSize: 12, color: '#64748B', lineHeight: 1.6, marginTop: 6 };
function btn(bg, color, border) {
  return { padding: '10px 16px', borderRadius: 10, border: border || 'none', background: bg, color: color, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' };
}
const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-');

export function DeleteTab({ adminFetch }) {
  const [deleteToken, setDeleteToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [target, setTarget] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [ackPaid, setAckPaid] = useState(false);
  const [log, setLog] = useState([]);

  const unlocked = deleteToken && expiresAt && new Date(expiresAt).getTime() > now;
  const secsLeft = unlocked ? Math.max(0, Math.round((new Date(expiresAt).getTime() - now) / 1000)) : 0;

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { if (deleteToken && !unlocked) { setDeleteToken(null); setTarget(null); } }, [unlocked, deleteToken]);
  function loadLog() { adminFetch('/api/admin-delete/log').then(d => setLog(d.entries || [])).catch(() => {}); }
  useEffect(() => { loadLog(); }, []);
  useEffect(() => {
    if (q.trim().length < 2) { setResults([]); return; }
    const t = setTimeout(() => {
      adminFetch('/api/admin-delete/search?q=' + encodeURIComponent(q.trim())).then(d => setResults(d.users || [])).catch(() => setResults([]));
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  async function unlock() {
    if (!password || !/^\d{6}$/.test(code.replace(/\s/g, ''))) { alert('Enter your password and the 6-digit code from your authenticator app.'); return; }
    setBusy(true);
    try {
      const r = await adminFetch('/api/admin-delete/unlock', { method: 'POST', body: JSON.stringify({ password, code: code.replace(/\s/g, '') }) });
      setDeleteToken(r.deleteToken); setExpiresAt(r.expiresAt);
    } catch (e) { alert(e.message || 'Could not unlock.'); }
    setPassword(''); setCode(''); setBusy(false);
  }

  function lock() { setDeleteToken(null); setExpiresAt(null); setTarget(null); }

  function choose(u) { setTarget(u); setConfirmEmail(''); setAckPaid(false); }

  async function doDelete() {
    if (!target) return;
    if (confirmEmail.trim().toLowerCase() !== String(target.email).toLowerCase()) { alert('The email you typed does not match.'); return; }
    if (target.paidLive && !ackPaid) { alert('Tick the box about the live paid plan first.'); return; }
    setBusy(true);
    try {
      const r = await adminFetch('/api/admin-delete/users/' + target.id, {
        method: 'POST', headers: { 'X-Delete-Token': deleteToken },
        body: JSON.stringify({ confirmEmail: confirmEmail.trim(), acknowledgePaid: ackPaid }),
      });
      alert('Deleted ' + r.alias + '.');
      setResults(prev => prev.filter(u => u.id !== target.id));
      setTarget(null); loadLog();
    } catch (e) {
      alert(e.message || 'Could not delete.');
      if (/Unlock again/i.test(e.message || '')) lock();
    }
    setBusy(false);
  }

  return (
    <div>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>Delete accounts</h2>
      <div style={{ fontSize: 13, color: '#64748B', marginBottom: 18, lineHeight: 1.6 }}>
        Permanently deletes an account and its data, exactly as if the person used "Delete account" in the app. This cannot be undone.
        Every deletion is logged and emailed to admin@riff-app.co.uk.
      </div>

      {!unlocked ? (
        <div style={box}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0', marginBottom: 12 }}>🔒 Unlock deleting</div>
          <span style={lbl}>Your password</span>
          <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} style={{ ...field, maxWidth: 360, marginBottom: 12 }} />
          <span style={lbl}>6-digit code from your authenticator app</span>
          <input inputMode="numeric" autoComplete="one-time-code" maxLength={7} value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === 'Enter' && unlock()} style={{ ...field, maxWidth: 160, letterSpacing: 4 }} />
          <div style={hint}>Unlocks for 5 minutes. Five wrong attempts lock deleting for an hour.</div>
          <button disabled={busy} onClick={unlock} style={{ ...btn('#EF4444', '#fff'), marginTop: 14, opacity: busy ? 0.6 : 1 }}>{busy ? 'Checking...' : 'Unlock'}</button>
        </div>
      ) : (
        <div style={box}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 10, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#F59E0B' }}>🔓 Unlocked - {Math.floor(secsLeft / 60)}:{String(secsLeft % 60).padStart(2, '0')} left</div>
            <button onClick={lock} style={{ ...btn('transparent', '#94A3B8', '1px solid #1E2740'), padding: '6px 12px' }}>Lock now</button>
          </div>
          <span style={lbl}>Find an account</span>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Alias or email (at least 2 letters)" style={{ ...field, maxWidth: 420 }} />
          <div style={{ marginTop: 12 }}>
            {results.map(u => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.04)', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ color: '#E2E8F0', fontSize: 14, fontWeight: 600 }}>{u.alias} {u.isAdmin ? <span style={{ color: '#A78BFA', fontSize: 11 }}>ADMIN</span> : null} {u.isYou ? <span style={{ color: '#22D3EE', fontSize: 11 }}>YOU</span> : null}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>{u.email}</div>
                  <div style={{ color: '#64748B', fontSize: 11 }}>Plan {u.plan}{u.paidLive ? ' (live)' : ''} · joined {fmt(u.createdAt)} · last active {fmt(u.lastActiveAt)}</div>
                </div>
                <button disabled={u.isAdmin || u.isYou} onClick={() => choose(u)} style={{ ...btn('transparent', '#EF4444', '1px solid #EF4444'), padding: '6px 12px', opacity: u.isAdmin || u.isYou ? 0.35 : 1 }}>Delete…</button>
              </div>
            ))}
            {q.trim().length >= 2 && results.length === 0 ? <div style={{ fontSize: 13, color: '#64748B' }}>No accounts found.</div> : null}
          </div>
        </div>
      )}

      <div style={box}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0', marginBottom: 12 }}>Deletion log</div>
        {log.length === 0 ? <div style={{ fontSize: 13, color: '#64748B' }}>No deletions yet.</div> : log.map((e, i) => (
          <div key={i} style={{ fontSize: 12, color: '#94A3B8', padding: '6px 0', borderTop: i ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            {new Date(e.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} - <span style={{ color: '#E2E8F0' }}>{e.targetAlias}</span> ({e.targetEmailMasked}) deleted by {e.adminAlias || e.adminId}{e.detail ? ' · ' + e.detail : ''}
          </div>
        ))}
      </div>

      {target && unlocked ? (
        <div onClick={() => setTarget(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(5,8,22,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 520, padding: 24, borderRadius: 18, background: '#0F1420', border: '1px solid rgba(239,68,68,0.4)' }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: '#FCA5A5', marginBottom: 6 }}>Delete {target.alias} permanently?</div>
            <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 14 }}>
              Removes the account, messages, voice messages, photos, verification selfie, connections, circles and AI conversations. Safety reports are kept. This cannot be undone.
            </div>
            {target.paidLive ? (
              <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#FCD34D', lineHeight: 1.5, marginBottom: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={ackPaid} onChange={e => setAckPaid(e.target.checked)} style={{ marginTop: 3 }} />
                This account has a live {target.plan} plan. Apple or Stripe may keep charging until the person cancels it themselves. I understand.
              </label>
            ) : null}
            <span style={lbl}>Type {target.email} to confirm</span>
            <input autoFocus value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} onPaste={e => e.preventDefault()} autoComplete="off" style={field} />
            <div style={hint}>Pasting is turned off - type it.</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 18 }}>
              <button onClick={() => setTarget(null)} style={btn('transparent', '#94A3B8', '1px solid #1E2740')}>Cancel</button>
              <button disabled={busy} onClick={doDelete} style={{ ...btn('#EF4444', '#fff'), opacity: busy ? 0.6 : 1 }}>{busy ? 'Deleting...' : 'Delete permanently'}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
