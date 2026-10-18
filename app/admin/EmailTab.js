'use client';
// Admin email: bulk sends (Email tab) and one-to-one emails (Email button on each user).
// Talks to the backend routes under /api/email/admin.
import { useState, useEffect } from 'react';

const box = { padding: 20, borderRadius: 16, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16 };
const field = { width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', color: '#E2E8F0', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' };
const lbl = { fontSize: 12, color: '#94A3B8', fontWeight: 600, marginBottom: 6, display: 'block' };
const hint = { fontSize: 12, color: '#64748B', lineHeight: 1.6, marginTop: 6 };
function btn(bg, color, border) {
  return { padding: '10px 16px', borderRadius: 10, border: border || 'none', background: bg, color: color, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' };
}

const KINDS = [
  { key: 'announcement', label: 'Announcement', help: 'Service news about Riff: changes to the app or terms, maintenance, important updates. Goes to everyone in the audience.' },
  { key: 'marketing', label: 'News & offers', help: 'Promotions and feature news. Adds an unsubscribe link and leaves out anyone who has unsubscribed.' },
];
const KIND_LABEL = { announcement: 'Announcement', marketing: 'News & offers', direct: 'Individual' };

export function EmailTab({ adminFetch }) {
  const [kind, setKind] = useState('announcement');
  const [audiences, setAudiences] = useState([]);
  const [audience, setAudience] = useState('all');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState({ campaigns: [], budgetLeft: null, dailyLimit: null });

  function loadAudiences() {
    adminFetch('/api/email/admin/audiences?kind=' + kind).then(d => setAudiences(d.audiences || [])).catch(() => {});
  }
  function loadHistory() {
    adminFetch('/api/email/admin/campaigns').then(setHistory).catch(() => {});
  }
  useEffect(() => { loadAudiences(); }, [kind]);
  useEffect(() => {
    loadHistory();
    const t = setInterval(loadHistory, 5000); // progress of a send in the background
    return () => clearInterval(t);
  }, []);

  const current = audiences.find(a => a.key === audience);
  const count = current ? current.count : 0;
  const ready = subject.trim() && body.trim();

  async function sendTest() {
    if (!ready) { alert('Add a subject and a message first.'); return; }
    setBusy(true);
    try {
      const r = await adminFetch('/api/email/admin/test', { method: 'POST', body: JSON.stringify({ subject, body, kind }) });
      alert('Test sent to ' + r.to + '. Check it looks right before sending to everyone.');
    } catch (e) { alert(e.message || 'Could not send the test.'); }
    setBusy(false);
  }

  async function sendAll() {
    if (!ready) { alert('Add a subject and a message first.'); return; }
    if (!count) { alert('Nobody is in that audience.'); return; }
    const typed = prompt('This sends "' + subject.trim() + '" to ' + count + ' user' + (count === 1 ? '' : 's') + ' (' + (current ? current.label : audience) + ').\n\nIt cannot be undone. Type SEND to confirm.');
    if (typed !== 'SEND') return;
    setBusy(true);
    try {
      const r = await adminFetch('/api/email/admin/campaigns', { method: 'POST', body: JSON.stringify({ subject, body, kind, audience, confirm: 'SEND' }) });
      alert(r.total > r.budgetLeft
        ? ('Sending ' + r.budgetLeft + ' of ' + r.total + ' now. That uses up today\'s limit - press Continue in the history tomorrow to send the rest.')
        : ('Sending to ' + r.total + '. Progress shows in the history below.'));
      setSubject(''); setBody('');
      loadHistory(); loadAudiences();
    } catch (e) { alert(e.message || 'Could not send.'); }
    setBusy(false);
  }

  async function continueSend(id) {
    try {
      await adminFetch('/api/email/admin/campaigns/' + id + '/continue', { method: 'POST', body: JSON.stringify({}) });
      loadHistory();
    } catch (e) { alert(e.message || 'Could not continue.'); }
  }

  const kindInfo = KINDS.find(k => k.key === kind);
  return (
    <div>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#E2E8F0', marginBottom: 6 }}>Email users</h2>
      <div style={{ fontSize: 13, color: '#64748B', marginBottom: 18 }}>
        To email one person, use the Email button in the Users tab.
        {history.dailyLimit ? (' Bulk sending limit: ' + history.budgetLeft + ' of ' + history.dailyLimit + ' left today.') : ''}
      </div>

      <div style={box}>
        <span style={lbl}>Type</span>
        <div style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          {KINDS.map(k => (
            <button key={k.key} onClick={() => setKind(k.key)} style={kind === k.key ? btn('#1E2740', '#E2E8F0', '1px solid #8B5CF6') : btn('transparent', '#94A3B8', '1px solid #1E2740')}>{k.label}</button>
          ))}
        </div>
        <div style={hint}>{kindInfo.help}</div>

        <div style={{ marginTop: 16 }}>
          <span style={lbl}>Audience</span>
          <select value={audience} onChange={e => setAudience(e.target.value)} style={{ ...field, maxWidth: 360 }}>
            {audiences.map(a => <option key={a.key} value={a.key}>{a.label} ({a.count})</option>)}
          </select>
          <div style={hint}>Banned accounts are always left out.</div>
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={lbl}>Subject</span>
          <input value={subject} onChange={e => setSubject(e.target.value)} maxLength={150} placeholder="e.g. Something new in Riff" style={field} />
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={lbl}>Message</span>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={10} placeholder={'Hi {name},\n\nWrite your message here. Leave a blank line between paragraphs.'} style={{ ...field, resize: 'vertical', lineHeight: 1.6 }} />
          <div style={hint}>{'{name}'} is replaced with each person's alias. Links starting with https:// become clickable. It is sent in the Riff email style from admin@riff-app.co.uk, and replies come to that inbox.</div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
          <button disabled={busy} onClick={sendTest} style={btn('transparent', '#A78BFA', '1px solid #8B5CF6')}>Send a test to me</button>
          <button disabled={busy || !count} onClick={sendAll} style={{ ...btn('linear-gradient(135deg, #8B5CF6, #EC4899)', '#fff'), opacity: busy || !count ? 0.5 : 1 }}>
            {busy ? 'Working...' : ('Send to ' + count + ' user' + (count === 1 ? '' : 's'))}
          </button>
        </div>
      </div>

      <div style={box}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0', marginBottom: 12 }}>History</div>
        {history.campaigns.length === 0 ? <div style={{ fontSize: 13, color: '#64748B' }}>Nothing sent yet.</div> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, color: '#94A3B8' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 10 }}>
                  <th style={{ padding: '6px 8px' }}>Date</th><th style={{ padding: '6px 8px' }}>Subject</th><th style={{ padding: '6px 8px' }}>Type</th>
                  <th style={{ padding: '6px 8px' }}>To</th><th style={{ padding: '6px 8px' }}>Sent</th><th style={{ padding: '6px 8px' }}>Status</th><th />
                </tr>
              </thead>
              <tbody>
                {history.campaigns.map(c => (
                  <tr key={c.id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>{new Date(c.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                    <td style={{ padding: '8px', color: '#E2E8F0' }}>{c.subject}</td>
                    <td style={{ padding: '8px' }}>{KIND_LABEL[c.kind] || c.kind}</td>
                    <td style={{ padding: '8px' }}>{c.audience}</td>
                    <td style={{ padding: '8px', whiteSpace: 'nowrap' }}>
                      {c.sentCount} / {c.total}
                      {c.failedCount ? <span style={{ color: '#EF4444' }}>{' · ' + c.failedCount + ' failed'}</span> : null}
                      {c.skippedCount ? <span style={{ color: '#64748B' }}>{' · ' + c.skippedCount + ' skipped'}</span> : null}
                    </td>
                    <td style={{ padding: '8px', color: c.running ? '#22D3EE' : c.status === 'done' ? '#22C55E' : '#F59E0B' }}>
                      {c.running ? 'Sending...' : c.status === 'done' ? 'Done' : (c.pendingCount + ' waiting')}
                    </td>
                    <td style={{ padding: '8px' }}>
                      {!c.running && c.status !== 'done' && c.pendingCount > 0 ? (
                        <button onClick={() => continueSend(c.id)} style={{ ...btn('transparent', '#22D3EE', '1px solid #22D3EE'), padding: '4px 10px', fontSize: 11 }}>Continue</button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function EmailUserModal({ user, adminFetch, onClose }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('Hi {name},\n\n');
  const [busy, setBusy] = useState(false);

  async function send() {
    if (!subject.trim() || !body.trim()) { alert('Add a subject and a message.'); return; }
    if (!confirm('Send this email to ' + user.email + '?')) return;
    setBusy(true);
    try {
      await adminFetch('/api/email/admin/user/' + user.id, { method: 'POST', body: JSON.stringify({ subject, body }) });
      alert('Sent to ' + user.email);
      onClose();
    } catch (e) { alert(e.message || 'Could not send.'); setBusy(false); }
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(5,8,22,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, padding: 24, borderRadius: 18, background: '#0F1420', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Email {user.alias}</div>
        <div style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>{user.email}</div>
        <span style={lbl}>Subject</span>
        <input autoFocus value={subject} onChange={e => setSubject(e.target.value)} maxLength={150} style={{ ...field, marginBottom: 14 }} />
        <span style={lbl}>Message</span>
        <textarea value={body} onChange={e => setBody(e.target.value)} rows={9} style={{ ...field, resize: 'vertical', lineHeight: 1.6 }} />
        <div style={hint}>Sent from admin@riff-app.co.uk in the Riff email style. Their reply comes to that inbox.</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 18 }}>
          <button onClick={onClose} style={btn('transparent', '#94A3B8', '1px solid #1E2740')}>Cancel</button>
          <button disabled={busy} onClick={send} style={{ ...btn('linear-gradient(135deg, #8B5CF6, #EC4899)', '#fff'), opacity: busy ? 0.6 : 1 }}>{busy ? 'Sending...' : 'Send email'}</button>
        </div>
      </div>
    </div>
  );
}
