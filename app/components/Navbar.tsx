'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ── PROMO TEXT (ganti isi array ini sesuai kebutuhan) ──────
const PROMO_MESSAGES = [
  'Nikmati Diskon 30% untuk semua kasur pilihan kami',
  'Gratis Bed Set senilai Rp 1.500.000 untuk setiap pembelian kasur',
  'Tersedia di AEON Mall Sentul Lantai Ground — 11 hingga 23 September 2026',
  'Free ongkir ke seluruh Indonesia untuk pembelian di atas Rp 2.000.000',
  'Cicilan 0% hingga 24 bulan dengan kartu kredit pilihan',
  'Garansi tidur nyaman 100 malam atau uang kembali',
  'Kunjungi showroom kami dan rasakan sendiri kenyamanannya',
]

const MARQUEE_TEXT = PROMO_MESSAGES.join('   •   ')

// ── MENU ITEMS ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Produk',       href: '/koleksi' },
  { label: 'Koleksi',      href: '/koleksi' },
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Promo',        href: '/promo', highlight: true },
]

export default function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled]         = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [cartCount]                     = useState(0)
  const [signedIn, setSignedIn]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let active = true
    const checkSession = async () => {
      try {
        const response = await fetch('/api/v1/auth/me', { credentials: 'include' })
        if (active) setSignedIn(response.ok)
      } catch {
        if (active) setSignedIn(false)
      }
    }
    void checkSession()
    window.addEventListener('sleepndream-auth-changed', checkSession)
    return () => {
      active = false
      window.removeEventListener('sleepndream-auth-changed', checkSession)
    }
  }, [])

  const logout = async () => {
    await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => undefined)
    setSignedIn(false)
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-[200] w-full">

      {/* ── TOP BAR ──────────────────────────────────────── */}
      <div className="bg-navy overflow-hidden">
        <div className="flex items-center h-9 relative">
          {/* Marquee track — dua salinan teks biar looping mulus */}
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            <span className="text-white/90 text-xs font-body font-medium tracking-wide px-8">
              {MARQUEE_TEXT}
            </span>
            {/* Duplikat untuk seamless loop */}
            <span
              aria-hidden
              className="text-white/90 text-xs font-body font-medium tracking-wide px-8"
            >
              {MARQUEE_TEXT}
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ──────────────────────────────────── */}
      <nav
        className={[
          'bg-white transition-shadow duration-250',
          scrolled ? 'shadow-md' : 'shadow-sm',
        ].join(' ')}
      >
        <div className="max-w-[80rem] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-baseline gap-1 select-none"
            >
              <span className="font-sans font-bold text-xl text-navy tracking-tight leading-none">
                Sleep
              </span>
              <span className="font-sans font-bold text-xl text-amber tracking-tight leading-none">
                &
              </span>
              <span className="font-sans font-bold text-xl text-navy tracking-tight leading-none">
                Dream
              </span>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      'relative px-4 py-2 font-sans font-medium text-sm transition-colors duration-150',
                      'rounded-md group',
                      link.highlight
                        ? 'text-amber hover:text-amber/80'
                        : 'text-navy/80 hover:text-navy',
                    ].join(' ')}
                  >
                    {link.label}
                    {/* Underline aksen pada hover */}
                    {!link.highlight && (
                      <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left rounded-full" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-1">

              {/* Search */}
              <button
                aria-label="Cari produk"
                className="p-2.5 rounded-md text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors duration-150"
              >
                <IconSearch />
              </button>

              {/* Account */}
              {signedIn ? (
                <button
                  type="button"
                  onClick={() => void logout()}
                  aria-label="Keluar dari akun"
                  title="Keluar"
                  className="p-2.5 rounded-md text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors duration-150"
                >
                  <IconLogout />
                </button>
              ) : (
                <Link
                  href="/login"
                  aria-label="Masuk ke akun"
                  className="p-2.5 rounded-md text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors duration-150"
                >
                  <IconUser />
                </Link>
              )}

              {/* Cart */}
              <button
                aria-label={`Keranjang belanja${cartCount > 0 ? `, ${cartCount} item` : ''}`}
                className="relative p-2.5 rounded-md text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors duration-150"
              >
                <IconCart />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber text-white text-[10px] font-sans font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden p-2.5 rounded-md text-navy/70 hover:text-navy hover:bg-navy/5 transition-colors duration-150 ml-1"
              >
                {mobileOpen ? <IconX /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ────────────────────────────────── */}
        <div
          className={[
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-navy/10',
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <ul className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'block px-3 py-2.5 rounded-md font-sans font-medium text-sm transition-colors duration-150',
                    link.highlight
                      ? 'text-amber'
                      : 'text-navy/80 hover:text-navy hover:bg-navy/5',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}

// ── ICONS (inline SVG, no extra dependency) ────────────────
function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function IconLogout() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 3v18a2 2 0 01-2 2h-7" />
    </svg>
  )
}

function IconCart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}
