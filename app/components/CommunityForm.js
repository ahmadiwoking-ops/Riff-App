'use client';
// "Say hello" form. Sends the message to the Riff backend, which posts it into the Discord server.
// The Discord webhook URL is kept on the server (Railway), never in the website.
import { useEffect, useRef, useState } from 'react';
import { API_URL } from './community-config';

const FIELD = {
  width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.35)',
  background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 16, fontFamily: 'inherit', outline: 'none',
};

export default function CommunityForm() {
  const opened = useRef(Date.now());
  const [enabled, setEnabled] = useState(null);
  const [f, setF] = useState({ name: '', area: '', message: '', adult: false, website: '' });
  const [state, setState] = useState({ busy: false, sent: false, error: '' });

  useEffect(() => {
    fetch(API_URL + '/api/community/status').then((r) => r.json()).then((d) => setEnabled(!!d.enabled)).catch(() => setEnabled(false));
  }, []);
  if (enabled === false) return null;

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  async function send(e) {
    e.preventDefault();
    setState({ busy: true, sent: false, error: '' });
    try {
      const r = await fetch(API_URL + '/api/community/message', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, openedMs: Date.now() - opened.current }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Something went wrong. Please try again.');
      setState({ busy: false, sent: true, error: '' });
      setF({ name: '', area: '', message: '', adult: false, website: '' });
    } catch (err) {
      setState({ busy: false, sent: false, error: err.message });
    }
  }

  if (state.sent) {
    return (
      <div style={{ background: 'rgba(255,255,255,0.14)', borderRadius: 16, padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Thanks, your message is in the Riff Discord.</div>
        <div style={{ opacity: 0.9, marginBottom: 12 }}>Join the server to see replies.</div>
        <button type="button" onClick={() => setState({ busy: false, sent: false, error: '' })}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.5)', color: '#fff', borderRadius: 999, padding: '8px 16px', cursor: 'pointer', fontSize: 15 }}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={send} style={{ background: 'rgba(255,255,255,0.10)', borderRadius: 16, padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Say hello without leaving the site</div>
      <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 14 }}>Your name and message are posted publicly in the Riff Discord. Please don't include contact details.</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginBottom: 10 }}>
        <input aria-label="Name or nickname" placeholder="Name or nickname" value={f.name} onChange={set('name')} maxLength={40} required style={FIELD} />
        <input aria-label="Your area (optional)" placeholder="Your area (optional)" value={f.area} onChange={set('area')} maxLength={40} style={FIELD} />
      </div>
      <textarea aria-label="Message" placeholder="What would you like Riff to do? Where should we launch next?" value={f.message} onChange={set('message')}
        maxLength={1000} required rows={4} style={{ ...FIELD, resize: 'vertical', marginBottom: 10 }} />
      <input type="text" name="website" value={f.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }} />
      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, marginBottom: 14, cursor: 'pointer' }}>
        <input type="checkbox" checked={f.adult} onChange={set('adult')} required style={{ marginTop: 3 }} />
        <span>I'm 18 or over and happy for this to be posted publicly in the Riff Discord.</span>
      </label>
      {state.error ? <div role="alert" style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 10, padding: '10px 12px', marginBottom: 12, fontSize: 15 }}>{state.error}</div> : null}
      <button type="submit" disabled={state.busy} style={{
        background: '#fff', color: '#4752C4', fontWeight: 700, fontSize: 16, padding: '12px 22px',
        borderRadius: 999, border: 'none', cursor: state.busy ? 'wait' : 'pointer', opacity: state.busy ? 0.7 : 1,
      }}>
        {state.busy ? 'Sending…' : 'Post to Discord'}
      </button>
    </form>
  );
}
