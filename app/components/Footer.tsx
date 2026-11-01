import Link from 'next/link'

const shopLinks: [string, string][] = [
  ['Kasur', '/koleksi'],
  ['Koleksi', '/koleksi'],
  ['Promo', '/promo'],
]

const supportLinks: [string, string][] = [
  ['Panduan memilih kasur', '/panduan'],
  ['Pengiriman', '/pengiriman'],
  ['Hubungi kami', '/kontak'],
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container py-14 md:py-16">
        <div className="grid gap-10 border-b border-white/20 pb-11 lg:grid-cols-[1.25fr_.75fr_.75fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-baseline gap-1 font-sans text-2xl font-bold tracking-tight">
              <span>Sleep</span><span className="text-amber">&amp;</span><span>Dream</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">Tidur yang lebih nyaman dimulai dari pilihan yang tepat untuk tubuh dan ruang Anda.</p>
          </div>

          <FooterLinks title="Belanja" links={shopLinks} />
          <FooterLinks title="Bantuan" links={supportLinks} />

          <div>
            <h2 className="font-sans text-sm font-semibold">Dapatkan kabar terbaru</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">Promo dan inspirasi tidur langsung ke email Anda.</p>
            <form className="mt-4 flex overflow-hidden rounded-md border border-white/35" action="#">
              <label className="sr-only" htmlFor="footer-email">Alamat email</label>
              <input id="footer-email" type="email" placeholder="Email Anda" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/45 focus:outline-none" />
              <button type="submit" className="bg-amber px-4 font-sans text-xs font-semibold text-navy transition-colors hover:bg-gold">Daftar</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sleep &amp; Dream. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-5"><Link href="/privacy" className="hover:text-white">Privasi</Link><Link href="/terms" className="hover:text-white">Syarat &amp; Ketentuan</Link></div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({ title, links }: { title: string; links: [string, string][] }) {
  return <div>
    <h2 className="font-sans text-sm font-semibold">{title}</h2>
    <ul className="mt-4 space-y-3 text-sm text-white/70">
      {links.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-amber">{label}</Link></li>)}
    </ul>
  </div>
}
