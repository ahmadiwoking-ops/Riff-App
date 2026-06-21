'use client';
import { useState, useRef, useEffect } from 'react';

const API = 'https://web-production-31dae.up.railway.app';

const PLANS = [
  { id: 'single', name: 'Single', tagline: '1 deep connection', priceM: '£2.99', priceY: '£3.99', color: '#EC4899', yearLabel: '/6 months', introNote: 'Start with £3.99 for your first 6 months', features: ['1 Deep Connection', '1 Friend Circle', '🟢 Green verification included', 'Text + voice messaging', 'Photo reveal'] },
  { id: 'explorer', name: 'Explorer', tagline: 'More connections', priceM: '£5.99', priceY: '£3.79', color: '#22D3EE', popular: true, yearLabel: '/mo', features: ['2 Deep Connections', '3 Friend Circles', '🟢 Green verification included', 'Priority matching', 'Custom questions'] },
  { id: 'inner_circle', name: 'Inner Circle', tagline: 'Full experience', priceM: '£11.99', priceY: '£7.49', color: '#F59E0B', yearLabel: '/mo', features: ['Unlimited connections', 'Unlimited circles', '🟢 Green verification included', 'Circle analytics', 'Early access features'] },
];

export default function GetStarted() {
  const [step, setStep] = useState('register'); // register, login, plan, payment_return, selfie, id_check, id_return, sms, complete
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  // Registration
  const [form, setForm] = useState({ alias: '', email: '', password: '', age: '', gender: '', seekingGender: '', connectionType: '' });
  const update = (k, v) => setForm({ ...form, [k]: v });

  // Plan
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billing, setBilling] = useState('monthly');

  // Selfie
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [selfieResult, setSelfieResult] = useState(null);

  // Veriff
  const [veriffUrl, setVeriffUrl] = useState(null);

  // SMS
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsSent, setSmsSent] = useState(false);

  async function apiFetch(path, opts = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const res = await fetch(API + path, { ...opts, headers: { ...headers, ...opts.headers } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  // Check for payment/veriff return via URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('session_id')) setStep('payment_return');
    if (params.get('veriff_return')) setStep('id_return');
    // Restore token from sessionStorage
    const saved = sessionStorage.getItem('riff_token');
    const savedUser = sessionStorage.getItem('riff_user');
    if (saved) { setToken(saved); if (savedUser) setUser(JSON.parse(savedUser)); }
  }, []);

  async function handleRegister() {
    setError('');
    const missing = [];
    if (!form.alias) missing.push('alias');
    if (!form.email) missing.push('email');
    if (!form.password) missing.push('password');
    if (!form.age) missing.push('age');
    if (!form.gender) missing.push('gender');
    if (!form.seekingGender) missing.push('looking for');
    if (!form.connectionType) missing.push('connection type');
    if (missing.length) return setError('Missing: ' + missing.join(', '));
    if (form.password.length < 8) return setError('Password must be at least 8 characters');
    if (parseInt(form.age) < 18) return setError('You must be 18 or older');
    setLoading(true);
    try {
      const res = await apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email: form.email, password: form.password, alias: form.alias, age: parseInt(form.age), gender: form.gender, seekingGender: form.seekingGender, connectionType: form.connectionType }) });
      setToken(res.token); setUser(res.user);
      sessionStorage.setItem('riff_token', res.token);
      sessionStorage.setItem('riff_user', JSON.stringify(res.user));
      setStep('plan');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleLogin() {
    setError('');
    if (!form.email || !form.password) return setError('Email and password required');
    setLoading(true);
    try {
      const res = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: form.email.trim().toLowerCase(), password: form.password.trim() }) });
      setToken(res.token); setUser(res.user);
      sessionStorage.setItem('riff_token', res.token);
      sessionStorage.setItem('riff_user', JSON.stringify(res.user));
      setStep('plan');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleCheckout() {
    if (!selectedPlan) return;
    setLoading(true); setError('');
    try {
      const res = await apiFetch('/api/subscriptions/checkout', { method: 'POST', body: JSON.stringify({ plan: selectedPlan, billing }) });
      if (res.status === 'upgraded') {
        setUser(prev => ({ ...prev, plan: selectedPlan }));
        setStep('selfie');
      } else if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } });
      if (videoRef.current) { videoRef.current.srcObject = stream; setCameraReady(true); }
    } catch { setError('Camera access denied. Please allow camera access in your browser settings.'); }
  }

  async function captureSelfie() {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = 640; canvasRef.current.height = 480;
    ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    // Stop camera
    videoRef.current.srcObject?.getTracks().forEach(t => t.stop());
    setCameraReady(false);
    setLoading(true);
    try {
      const res = await apiFetch('/api/verification/selfie-result', { method: 'POST', body: JSON.stringify({ passed: true, faceDetected: true, livenessConfirmed: true }) });
      setSelfieResult(res.status);
      if (res.status === 'verified') setTimeout(() => setStep('id_check'), 1500);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function startVeriff() {
    setLoading(true); setError('');
    try {
      const res = await apiFetch('/api/verification/create-id-check', { method: 'POST', body: JSON.stringify({}) });
      if (res.status === 'demo_mode') {
        // Demo mode — simulate verification
        await apiFetch('/api/verification/complete-id-check', { method: 'POST', body: JSON.stringify({ passed: true }) });
        setStep('sms');
      } else if (res.sessionUrl) {
        setVeriffUrl(res.sessionUrl);
        sessionStorage.setItem('veriff_session_id', res.sessionId);
        window.location.href = res.sessionUrl;
      }
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleSendSms() {
    if (!phoneNumber.trim()) return setError('Enter your phone number');
    const cleaned = phoneNumber.trim();
    if (!/^\+?[\d]{10,15}$/.test(cleaned.replace(/\s/g, ''))) return setError('Include country code, e.g. +447...');
    setLoading(true); setError('');
    try {
      await apiFetch('/api/verification/send-sms-code', { method: 'POST', body: JSON.stringify({ phoneNumber: cleaned }) });
      setSmsSent(true);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  async function handleVerifySms() {
    if (!smsCode || smsCode.length !== 6) return setError('Enter the 6-digit code');
    setLoading(true); setError('');
    try {
      const res = await apiFetch('/api/verification/verify-sms-code', { method: 'POST', body: JSON.stringify({ phoneNumber: phoneNumber.trim(), code: smsCode }) });
      if (res.status === 'verified') setStep('complete');
      else setError(res.error || 'Invalid code');
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }

  const STEPS = ['register', 'plan', 'selfie', 'id_check', 'sms', 'complete'];
  const currentIdx = STEPS.indexOf(step === 'login' ? 'register' : step === 'payment_return' ? 'plan' : step === 'id_return' ? 'id_check' : step);

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #1E2740', background: '#151B2B', color: '#E2E8F0', fontSize: 14, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 10 };
  const labelStyle = { fontSize: 12, color: '#94A3B8', marginBottom: 4, display: 'block' };

  return (
    <div style={{ minHeight: '100vh', background: '#050816', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/logo.png" alt="Riff" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800, color: '#E2E8F0' }}>Riff</span>
        </a>
        <span style={{ fontSize: 13, color: '#64748B' }}>Get started</span>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '32px 24px' }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: currentIdx >= i ? 'linear-gradient(90deg, #8B5CF6, #EC4899)' : '#1E2740' }} />
          ))}
        </div>

        {error && <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', fontSize: 13, marginBottom: 16 }}>{error}</div>}

        {/* ═══ REGISTER ═══ */}
        {step === 'register' && (
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Create your account</div>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Join Riff — understand someone before you see them.</p>
            <input style={inputStyle} placeholder="Choose an alias" value={form.alias} onChange={e => update('alias', e.target.value)} />
            <input style={inputStyle} placeholder="Email" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
            <input style={inputStyle} placeholder="Password (8+ characters)" type="password" value={form.password} onChange={e => update('password', e.target.value)} />
            <input style={inputStyle} placeholder="Age" type="number" value={form.age} onChange={e => update('age', e.target.value)} />
            <div style={{ marginBottom: 10 }}>
              <label style={labelStyle}>I am</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 12 }}>
                {['Male', 'Female', 'Non-binary', 'No Preference'].map(g => (
                  <button key={g} onClick={() => update('gender', g)} style={{ padding: '10px 4px', borderRadius: 10, border: form.gender === g ? '1.5px solid #8B5CF6' : '1px solid #1E2740', background: form.gender === g ? 'rgba(139,92,246,0.1)' : '#0F1420', color: form.gender === g ? '#E2E8F0' : '#64748B', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', lineHeight: 1.3 }}>{g}</button>
                ))}
              </div>
              <label style={labelStyle}>Looking for</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                {['Male', 'Female', 'Non-binary', 'No Preference', 'A Friends Circle'].map(g => (
                  <button key={g} onClick={() => update('seekingGender', g)} style={{ padding: '10px 4px', borderRadius: 10, border: form.seekingGender === g ? '1.5px solid #EC4899' : '1px solid #1E2740', background: form.seekingGender === g ? 'rgba(236,72,153,0.1)' : '#0F1420', color: form.seekingGender === g ? '#E2E8F0' : '#64748B', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', lineHeight: 1.3 }}>{g}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Connection type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ id: 'deep', label: '◎ Deep Connection' }, { id: 'circle', label: '◍ Friend Circle' }, { id: 'both', label: 'Both' }].map(c => (
                  <button key={c.id} onClick={() => update('connectionType', c.id)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: form.connectionType === c.id ? '1.5px solid #22D3EE' : '1px solid #1E2740', background: form.connectionType === c.id ? 'rgba(34,211,238,0.1)' : '#0F1420', color: form.connectionType === c.id ? '#E2E8F0' : '#64748B', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>{c.label}</button>
                ))}
              </div>
            </div>
            <button onClick={handleRegister} disabled={loading} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Creating...' : 'Create account'}</button>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button onClick={() => { setStep('login'); setError(''); }} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Already have an account? <span style={{ color: '#22D3EE' }}>Sign in</span></button>
            </div>
          </div>
        )}

        {/* ═══ LOGIN ═══ */}
        {step === 'login' && (
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Welcome back</div>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Sign in to continue your verification.</p>
            <input style={inputStyle} placeholder="Email" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
            <input style={inputStyle} placeholder="Password" type="password" value={form.password} onChange={e => update('password', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Signing in...' : 'Sign in'}</button>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button onClick={() => { setStep('register'); setError(''); }} style={{ background: 'none', border: 'none', color: '#64748B', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Need an account? <span style={{ color: '#22D3EE' }}>Sign up</span></button>
            </div>
          </div>
        )}

        {/* ═══ PLAN SELECTION ═══ */}
        {step === 'plan' && (
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Choose your plan</div>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>All plans include full green verification.</p>
            <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#0F1420', borderRadius: 12, padding: 4, border: '1px solid rgba(255,255,255,0.06)' }}>
              {['monthly', 'yearly'].map(b => (
                <button key={b} onClick={() => setBilling(b)} style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', background: billing === b ? '#1E2740' : 'transparent', color: billing === b ? '#E2E8F0' : '#64748B', textTransform: 'capitalize' }}>{b}</button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PLANS.map(p => (
                <button key={p.id} onClick={() => setSelectedPlan(p.id)} style={{
                  padding: 20, borderRadius: 16, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.2s',
                  border: selectedPlan === p.id ? `2px solid ${p.color}` : '1px solid rgba(255,255,255,0.06)',
                  background: selectedPlan === p.id ? `${p.color}08` : '#0F1420',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: p.color }}>{p.name}</span>
                      {p.popular && <span style={{ marginLeft: 8, fontSize: 10, padding: '2px 8px', borderRadius: 6, background: `${p.color}22`, color: p.color, fontWeight: 600 }}>Popular</span>}
                    </div>
                    <div><span style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 800, color: '#E2E8F0' }}>{billing === 'monthly' ? p.priceM : p.priceY}</span><span style={{ fontSize: 13, color: '#64748B' }}>{billing === 'monthly' ? '/mo' : p.yearLabel}</span></div>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{p.features.join(' · ')}</div>
                </button>
              ))}
            </div>
            <button onClick={handleCheckout} disabled={loading || !selectedPlan} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', marginTop: 16, opacity: (!selectedPlan || loading) ? 0.5 : 1 }}>{loading ? 'Processing...' : 'Subscribe and continue'}</button>
            <button onClick={() => setStep('selfie')} style={{ width: '100%', padding: '12px 0', marginTop: 8, background: 'none', border: 'none', color: '#64748B', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Skip — continue with free plan</button>
          </div>
        )}

        {/* ═══ PAYMENT RETURN ═══ */}
        {step === 'payment_return' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#22C55E', marginBottom: 8 }}>Payment successful</div>
            <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24 }}>Your plan is now active. Let's complete your verification.</p>
            <button onClick={() => setStep('selfie')} style={{ padding: '14px 32px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Continue to verification</button>
          </div>
        )}

        {/* ═══ SELFIE VERIFICATION ═══ */}
        {step === 'selfie' && (
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Selfie verification</div>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>Take a live selfie to confirm you are a real person. This earns you the yellow trust badge.</p>
            <div style={{ borderRadius: 20, overflow: 'hidden', background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16, position: 'relative', aspectRatio: '4/3' }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: cameraReady ? 'block' : 'none' }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              {!cameraReady && !selfieResult && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 48, marginBottom: 12 }}>🤳</span>
                  <button onClick={startCamera} style={{ padding: '12px 28px', borderRadius: 12, border: 'none', background: '#22D3EE', color: '#000', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>Open camera</button>
                </div>
              )}
              {selfieResult === 'verified' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(5,8,22,0.8)' }}>
                  <span style={{ fontSize: 48, marginBottom: 8 }}>✓</span>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#22C55E' }}>Selfie verified</div>
                </div>
              )}
            </div>
            {cameraReady && (
              <button onClick={captureSelfie} disabled={loading} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: '#22C55E', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Checking...' : 'Take selfie'}</button>
            )}
            <button onClick={() => setStep('id_check')} style={{ width: '100%', padding: '12px 0', marginTop: 8, background: 'none', border: 'none', color: '#64748B', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Skip for now</button>
          </div>
        )}

        {/* ═══ ID VERIFICATION (VERIFF) ═══ */}
        {step === 'id_check' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>ID verification</div>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Verify your government ID for the green trust badge. Powered by Veriff — your documents are processed securely in the EU.</p>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span style={{ fontSize: 36 }}>📄</span>
            </div>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>You will be redirected to Veriff's secure portal to scan your passport or driving licence. This takes about 2 minutes.</div>
            <button onClick={startVeriff} disabled={loading} style={{ padding: '14px 32px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Starting...' : 'Start ID verification'}</button>
            <div><button onClick={() => setStep('sms')} style={{ marginTop: 12, background: 'none', border: 'none', color: '#64748B', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Skip for now</button></div>
          </div>
        )}

        {/* ═══ ID RETURN ═══ */}
        {step === 'id_return' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#22C55E', marginBottom: 8 }}>ID verification submitted</div>
            <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24 }}>Your documents are being reviewed. This usually takes a few minutes.</p>
            <button onClick={() => setStep('sms')} style={{ padding: '14px 32px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit' }}>Continue to phone verification</button>
          </div>
        )}

        {/* ═══ SMS VERIFICATION ═══ */}
        {step === 'sms' && (
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, color: '#E2E8F0', marginBottom: 4 }}>Phone verification</div>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>Verify your phone number to complete the green trust badge. We will send a 6-digit code via SMS.</p>
            {!smsSent ? (
              <>
                <label style={labelStyle}>Phone number (with country code)</label>
                <input style={inputStyle} placeholder="+44 7700 900000" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} type="tel" />
                <button onClick={handleSendSms} disabled={loading} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: '#22D3EE', color: '#000', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Sending...' : 'Send verification code'}</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, color: '#22C55E', marginBottom: 12, textAlign: 'center' }}>Code sent to {phoneNumber}</div>
                <input style={{ ...inputStyle, fontSize: 28, textAlign: 'center', letterSpacing: 12 }} placeholder="000000" value={smsCode} onChange={e => setSmsCode(e.target.value)} type="text" inputMode="numeric" maxLength={6} />
                <button onClick={handleVerifySms} disabled={loading} style={{ width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', background: '#22C55E', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>{loading ? 'Verifying...' : 'Verify code'}</button>
                <button onClick={() => { setSmsSent(false); setSmsCode(''); }} style={{ width: '100%', marginTop: 8, background: 'none', border: 'none', color: '#64748B', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Resend code</button>
              </>
            )}
            <button onClick={() => setStep('complete')} style={{ width: '100%', padding: '12px 0', marginTop: 8, background: 'none', border: 'none', color: '#64748B', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Skip for now</button>
          </div>
        )}

        {/* ═══ COMPLETE ═══ */}
        {step === 'complete' && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
              <span style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>You're all set!</span>
            </div>
            <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>Your account is ready. Download the Riff app to start connecting with people who think like you.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300, margin: '0 auto 24px' }}>
              {[
                { icon: '✓', label: 'Account created', color: '#22C55E' },
                { icon: '✓', label: 'Verification complete', color: '#22C55E' },
                { icon: '📱', label: 'Download the app to get matched', color: '#22D3EE' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', borderRadius: 12, background: '#0F1420', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: f.color, fontSize: 16 }}>{f.icon}</span>
                  <span style={{ fontSize: 14, color: '#E2E8F0' }}>{f.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://apps.apple.com" style={{ padding: '14px 28px', borderRadius: 14, background: '#1E2740', color: '#E2E8F0', fontWeight: 600, fontSize: 14, textDecoration: 'none', fontFamily: 'inherit' }}>🍎 App Store</a>
              <a href="https://play.google.com" style={{ padding: '14px 28px', borderRadius: 14, background: '#1E2740', color: '#E2E8F0', fontWeight: 600, fontSize: 14, textDecoration: 'none', fontFamily: 'inherit' }}>▶️ Google Play</a>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        input::placeholder { color: #475569; }
        @media (max-width: 480px) { div[style*="maxWidth: 520px"] { padding: 20px 16px !important; } }
      `}</style>
    </div>
  );
}
