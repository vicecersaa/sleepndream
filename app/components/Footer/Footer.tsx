import Link from "next/link";

import styles from "./Footer.module.css";

const FOOTER_GROUPS = [
  {
    title: "Belanja",
    links: ["Kasur", "Rangka Tempat Tidur", "Perlengkapan Tidur", "Aksesori"],
  },
  {
    title: "Pilih Ukuran",
    links: ["Single", "Queen", "King", "Panduan Ukuran"],
  },
  {
    title: "Bantuan",
    links: ["Panduan Memilih Kasur", "Pengiriman", "Garansi", "Hubungi Kami"],
  },
  {
    title: "Layanan",
    links: ["Coba di Toko", "Pelacakan Pesanan", "Pembayaran", "Perawatan Kasur"],
  },
  {
    title: "Tentang Kami",
    links: ["Cerita Kami", "Teknologi Tidur", "Toko Kami", "FAQ"],
  },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.7" r="1" className={styles.fillIcon} />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 20v-7h2.5l.4-3h-2.9V8.1c0-.9.3-1.6 1.7-1.6H18V3.8c-.5-.1-1.4-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.3V10H9v3h2.4v7h3.1Z" className={styles.fillIcon} />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" className={styles.fillIcon} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.brandBlock}>
            <h2 className={styles.brandTitle}>
              Jadi yang pertama tahu tentang <em>kenyamanan terbaru.</em>
            </h2>
          </div>

          <div className={styles.newsletter}>
            <form className={styles.form} action="#" method="post">
              <div className={styles.signupRow}>
                <label className={styles.srOnly} htmlFor="footer-email">Alamat email</label>
                <input id="footer-email" name="email" type="email" placeholder="Masukkan alamat email" required />
                <button type="submit">Daftar</button>
              </div>
              <label className={styles.consent}>
                <input type="checkbox" required />
                <span>Saya setuju menerima promo dan kabar terbaru dari Sleep & Dream.</span>
              </label>
            </form>
          </div>
        </div>

        <div className={styles.navigation}>
          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} className={styles.linkGroup} aria-label={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link}><Link href="#">{link}</Link></li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.contactBlock}>
            <h3>Butuh bantuan memilih?</h3>
            <a href="https://wa.me/620000000000" className={styles.contactLink}>Chat dengan kami</a>
            <div className={styles.socials} aria-label="Media sosial Sleep & Dream">
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="YouTube"><YoutubeIcon /></a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Sleep & Dream. Seluruh hak cipta dilindungi.</p>
          <div className={styles.legalLinks}>
            <Link href="#">Privasi</Link>
            <Link href="#">Syarat & Ketentuan</Link>
            <Link href="#">Aksesibilitas</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
