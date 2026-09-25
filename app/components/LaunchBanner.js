'use client';
import { useState, useEffect } from 'react';

// Site-wide launch notice. Dismissal is remembered per browser so it does not
// nag on every page, but the site is fully usable either way.
export default function LaunchBanner() {
  const [dismissed, setDismissed] = useState(true);   // assume dismissed until localStorage says otherwise, to avoid a flash
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');          // idle | sending | done | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem('riff_launch_banner') === 'dismissed');
    } catch {
      setDismissed(false);
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try { window.localStorage.setItem('riff_launch_banner', 'dismissed'); } catch {}
  }

  async function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setMessage('');
    try {
      const res = await fetch('https://api.riff-app.co.uk/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'launch-banner' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setState('done');
      setMessage(data.alreadyOn ? "You're already on the list — we'll be in touch." : "You're on the list. We'll email you at launch.");
    } catch {
      setState('error');
      setMessage('Could not reach us just now. Please try again.');
    }
  }

  if (dismissed) return null;

  return (
    <>
      <div style={{
        position: 'relative', zIndex: 50,
        background: 'linear-gradient(90deg, rgba(139,92,246,0.18), rgba(34,211,238,0.18))',
        borderBottom: '1px solid rgba(139,92,246,0.3)',
        padding: '11px 44px 11px 20px',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 14, color: '#E2E8F0' }}>
          Riff launches soon on iOS and Android.{' '}
          <button
            onClick={() => setOpen(true)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              font: 'inherit', color: '#A78BFA', fontWeight: 600, textDecoration: 'underline',
            }}
          >
            Be first to know →
          </button>
        </span>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#8B8B96', fontSize: 18,
            cursor: 'pointer', lineHeight: 1, padding: 4,
          }}
        >
          ×
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#151B2B', borderRadius: 20, padding: 28,
              width: '100%', maxWidth: 420, border: '1px solid #1E2740',
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F0ECE5', margin: '0 0 8px' }}>
              Know when Riff launches
            </h3>
            <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6, margin: '0 0 20px' }}>
              We&apos;re finishing the iOS and Android apps. Leave your email and we&apos;ll tell you the moment they&apos;re live.
            </p>

            {state === 'done' ? (
              <div style={{
                padding: 16, borderRadius: 12, background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)', color: '#4ADE80', fontSize: 14,
              }}>
                {message}
              </div>
            ) : (
              <form onSubmit={submit}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoFocus
                  style={{
                    width: '100%', boxSizing: 'border-box', padding: '13px 14px',
                    borderRadius: 12, border: '1px solid #1E2740', background: '#0F1420',
                    color: '#E2E8F0', fontSize: 15, marginBottom: 12,
                  }}
                />
                {message && state === 'error' && (
                  <p style={{ fontSize: 13, color: '#F87171', margin: '0 0 12px' }}>{message}</p>
                )}
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  style={{
                    width: '100%', padding: 14, borderRadius: 12, border: 'none',
                    background: '#8B5CF6', color: '#fff', fontSize: 15, fontWeight: 700,
                    cursor: state === 'sending' ? 'default' : 'pointer',
                    opacity: state === 'sending' ? 0.6 : 1,
                  }}
                >
                  {state === 'sending' ? 'Adding you…' : 'Notify me at launch'}
                </button>
                {/* A specific promise rather than generic marketing consent. */}
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, margin: '14px 0 0' }}>
                  We&apos;ll email you once, when Riff launches. Nothing else, and you can
                  unsubscribe at any time. See our{' '}
                  <a href="/privacy-policy" style={{ color: '#8B5CF6' }}>privacy policy</a>.
                </p>
              </form>
            )}

            <button
              onClick={() => setOpen(false)}
              style={{
                width: '100%', marginTop: 14, padding: 12, borderRadius: 12,
                background: 'none', border: '1px solid #1E2740', color: '#94A3B8',
                fontSize: 14, cursor: 'pointer',
              }}
            >
              {state === 'done' ? 'Close' : 'Not now'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
