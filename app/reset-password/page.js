'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const API = 'https://api.riff-app.co.uk';

function ResetForm() {
  const token = useSearchParams().get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [state, setState] = useState('idle');   // idle | sending | done | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setState('error');
      setMessage('This link is missing its token. Ask for a new reset email.');
    }
  }, [token]);

  async function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;
    if (password.length < 8) {
      setMessage('Choose a password of at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setMessage('Those two passwords do not match.');
      return;
    }
    setState('sending');
    setMessage('');
    try {
      const res = await fetch(API + '/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState('idle');
        setMessage(data.error || 'That did not work. Ask for a new link.');
        return;
      }
      setState('done');
    } catch {
      setState('idle');
      setMessage('Could not reach us just now. Try again in a moment.');
    }
  }

  if (state === 'done') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <h1 style={s.title}>Password changed</h1>
        <p style={s.body}>
          You can sign in to Riff with your new password now.
        </p>
        <Link href="/" style={s.link}>Back to riff-app.co.uk</Link>
      </div>
    );
  }

  return (
    <>
      <h1 style={s.title}>Choose a new password</h1>
      <p style={s.body}>
        At least 8 characters. Something you have not used elsewhere.
      </p>

      <form onSubmit={submit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          autoComplete="new-password"
          disabled={state === 'error'}
          style={s.input}
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Type it again"
          autoComplete="new-password"
          disabled={state === 'error'}
          style={s.input}
        />

        {message ? <p style={s.error}>{message}</p> : null}

        <button
          type="submit"
          disabled={state === 'sending' || state === 'error'}
          style={{
            ...s.button,
            opacity: state === 'sending' || state === 'error' ? 0.5 : 1,
            cursor: state === 'sending' || state === 'error' ? 'default' : 'pointer',
          }}
        >
          {state === 'sending' ? 'Saving…' : 'Save new password'}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div style={s.page}>
      <div style={s.card}>
        <Link href="/" style={s.brand}>
          <img src="/logo.png" alt="Riff" width={30} height={30} style={{ borderRadius: 7 }} />
          <span style={s.brandText}>Riff</span>
        </Link>
        <Suspense fallback={<p style={s.body}>Loading…</p>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh', background: '#050816', display: 'flex',
    alignItems: 'center', justifyContent: 'center', padding: 20,
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
  },
  card: {
    width: '100%', maxWidth: 420, background: '#151B2B', borderRadius: 20,
    padding: 32, border: '1px solid #1E2740',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    textDecoration: 'none', marginBottom: 26,
  },
  brandText: { fontFamily: "'Sora', sans-serif", fontSize: 19, fontWeight: 800, color: '#F0ECE5' },
  title: { fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#F0ECE5', margin: '0 0 8px' },
  body: { fontSize: 14, color: '#94A3B8', lineHeight: 1.7, margin: '0 0 22px' },
  input: {
    width: '100%', boxSizing: 'border-box', padding: '13px 14px', marginBottom: 12,
    borderRadius: 12, border: '1px solid #1E2740', background: '#0F1420',
    color: '#E2E8F0', fontSize: 15, fontFamily: 'inherit',
  },
  error: { fontSize: 13, color: '#F87171', margin: '0 0 12px', lineHeight: 1.6 },
  button: {
    width: '100%', padding: 14, borderRadius: 12, border: 'none',
    background: '#8B5CF6', color: '#fff', fontSize: 15, fontWeight: 700,
    fontFamily: 'inherit',
  },
  link: { fontSize: 14, color: '#8B5CF6', textDecoration: 'none' },
};
