'use client';
import { useEffect } from 'react';
export default function VerificationComplete() {
  useEffect(() => { window.location.href = '/get-started?veriff_return=true'; }, []);
  return <div style={{ minHeight: '100vh', background: '#050816', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontFamily: 'sans-serif' }}>Redirecting...</div>;
}
