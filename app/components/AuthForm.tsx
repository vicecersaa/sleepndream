'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type GoogleCredentialResponse = { credential: string }

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void
          renderButton: (element: HTMLElement, options: Record<string, unknown>) => void
        }
      }
    }
  }
}

const api = '/api/v1/auth'

function loadGoogleIdentity() {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve()
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Google Sign-In tidak dapat dimuat.')), { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Google Sign-In tidak dapat dimuat.'))
    document.head.appendChild(script)
  })
}

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const googleButton = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const isLogin = mode === 'login'

  const finish = () => {
    window.dispatchEvent(new Event('sleepndream-auth-changed'))
    router.push('/')
    router.refresh()
  }

  useEffect(() => {
    if (!clientId || !googleButton.current) return
    let cancelled = false
    void loadGoogleIdentity().then(() => {
      if (cancelled || !googleButton.current || !window.google?.accounts.id) return
      googleButton.current.replaceChildren()
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          setBusy(true)
          setError('')
          try {
            const response = await fetch(`${api}/google`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential }) })
            const body = await response.json().catch(() => null)
            if (!response.ok) throw new Error(body?.message || 'Login Google gagal.')
            finish()
          } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Login Google gagal.')
          } finally { setBusy(false) }
        },
      })
      window.google.accounts.id.renderButton(googleButton.current, { type: 'standard', theme: 'outline', size: 'large', text: isLogin ? 'signin_with' : 'signup_with', shape: 'rectangular', logo_alignment: 'left', width: Math.min(400, googleButton.current.clientWidth), locale: 'id' })
    }).catch((cause: unknown) => !cancelled && setError(cause instanceof Error ? cause.message : 'Google Sign-In tidak tersedia.'))
    return () => { cancelled = true }
  }, [clientId, isLogin])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('')
    if (!isLogin && password !== confirmPassword) { setError('Konfirmasi kata sandi belum sama.'); return }
    setBusy(true)
    try {
      const response = await fetch(`${api}/${isLogin ? 'login' : 'register'}`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim(), password }) })
      const body = await response.json().catch(() => null)
      if (!response.ok) throw new Error(body?.message || 'Tidak dapat memproses permintaan.')
      finish()
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Tidak dapat terhubung ke server.') } finally { setBusy(false) }
  }

  return <main className="min-h-[calc(100vh-100px)] bg-surface px-5 py-12 sm:px-8 lg:py-20"><section className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg lg:grid-cols-[.85fr_1.15fr]"><div className="bg-navy p-8 text-white sm:p-12 lg:p-14"><p className="text-label text-gold">SLEEP &amp; DREAM</p><h1 className="text-display mt-5 text-4xl sm:text-5xl">Istirahat yang lebih baik dimulai dari sini.</h1><p className="text-body mt-6 max-w-md text-white/75">Simpan pesanan, kelola alamat pengiriman, dan nikmati perjalanan tidur yang terasa personal.</p><div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/65">Nyaman dipilih. Nyaman dijalani.</div></div><div className="p-8 sm:p-12 lg:p-14"><p className="text-label text-amber">{isLogin ? 'SELAMAT DATANG KEMBALI' : 'BUAT AKUN'}</p><h2 className="text-heading mt-3 text-3xl text-navy">{isLogin ? 'Masuk ke akun Anda' : 'Mulai tidur lebih nyaman'}</h2><p className="text-body mt-3 text-steel">{isLogin ? 'Masuk untuk melihat pesanan dan melanjutkan belanja.' : 'Daftar untuk menyimpan pesanan dan alamat Anda.'}</p>{error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}{clientId ? <div ref={googleButton} className="mt-7 flex min-h-11 w-full justify-center" /> : <p className="mt-7 rounded-lg border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-navy">Login Google akan aktif setelah <code>NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> dipasang di frontend.</p>}<div className="my-7 flex items-center gap-3 text-xs font-medium tracking-wide text-steel before:h-px before:flex-1 before:bg-navy/15 after:h-px after:flex-1 after:bg-navy/15">ATAU DENGAN EMAIL</div><form onSubmit={submit} className="space-y-5"><label className="block text-sm font-semibold text-navy">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" className="mt-2 h-12 w-full rounded-lg border border-navy/20 px-4 font-body text-base outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/20" /></label><label className="block text-sm font-semibold text-navy">Kata sandi<input required minLength={6} type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 6 karakter" className="mt-2 h-12 w-full rounded-lg border border-navy/20 px-4 font-body text-base outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/20" /></label>{!isLogin && <label className="block text-sm font-semibold text-navy">Konfirmasi kata sandi<input required minLength={6} type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Ulangi kata sandi" className="mt-2 h-12 w-full rounded-lg border border-navy/20 px-4 font-body text-base outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/20" /></label>}<button disabled={busy} className="flex h-12 w-full items-center justify-center rounded-lg bg-amber px-5 font-sans text-sm font-semibold text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Memproses...' : isLogin ? 'Masuk' : 'Buat akun'}</button></form><p className="mt-7 text-center text-sm text-steel">{isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'} <Link href={isLogin ? '/register' : '/login'} className="font-semibold text-navy underline decoration-amber decoration-2 underline-offset-4">{isLogin ? 'Daftar sekarang' : 'Masuk'}</Link></p></div></section></main>
}
