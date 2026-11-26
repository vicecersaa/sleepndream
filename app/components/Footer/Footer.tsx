import Link from "next/link";

import FooterNewsletter from "./FooterNewsletter";
import styles from "./Footer.module.css";

const WHATSAPP_URL = "https://wa.me/628170150815";
const ask = (topic: string) => WHATSAPP_URL + "?text=" + encodeURIComponent("Halo Sleep & Dream, saya ingin tanya tentang " + topic + ".");

const FOOTER_GROUPS = [
  {
    title: "Produk",
    links: [
      { label: "CHIRO Series", href: "/products?series=chiro" },
      { label: "ECONO Series", href: "/products?series=econo" },
      { label: "Perlengkapan Tidur", href: "/#accessories-title" },
      { label: "Aksesoris", href: "/#aksesori-bantal" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Tentang Kami", href: "/#quality-title" },
      { label: "Showroom", href: "/#showroom" },
      { label: "Review", href: "/#reviews-title" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "Pesanan", href: ask("pesanan saya") },
      { label: "Panduan Perawatan", href: "/panduan-perawatan" },
      { label: "Kebijakan & Ketentuan", href: ask("kebijakan dan ketentuan") },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const CHANNELS = [
  { name: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL, icon: <>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none" />
  </> },
  { name: "Shopee", href: process.env.NEXT_PUBLIC_SHOPEE_URL, icon: <>
    <path d="M8 8V6a4 4 0 0 1 8 0v2M4 8h16l-1 13H5L4 8Z" />
    <path d="M14.5 11.5c-2-1.6-5-1-5 .9 0 2.1 5 1.5 5 3.7 0 1.9-3.2 2.5-5.4.8" />
  </> },
  { name: "Tokopedia", href: process.env.NEXT_PUBLIC_TOKOPEDIA_URL, icon: <>
    <path d="M8 8V6a4 4 0 0 1 8 0v2M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
    <circle cx="8.7" cy="13.9" r="2.2" /><circle cx="15.3" cy="13.9" r="2.2" />
    <path d="m10.8 17 1.2 1.3 1.2-1.3" />
  </> },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-main">
        <div className={styles.topGrid}>
          <h2 className={styles.brandTitle}>
            Jadi yang pertama tahu tentang <em>kenyamanan terbaru.</em>
          </h2>
          <FooterNewsletter whatsappUrl={WHATSAPP_URL} />
        </div>

        <div className={styles.navigation}>
          {FOOTER_GROUPS.map(({ title, links }) => (
            <nav key={title} className={styles.linkGroup} aria-label={title}>
              <h3>{title}</h3>
              <ul>
                {links.map(({ label, href }) => (
                  <li key={label}>{href.startsWith("https://") || href.startsWith("/#aksesori-")
                    ? <a href={href}>{label}</a>
                    : <Link href={href}>{label}</Link>}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.contactBlock}>
            <h3>Cari Tahu Lebih</h3>
            <a href={WHATSAPP_URL}>Hubungi Kami</a>
            <p>Sleep &amp; Dream</p>
            <div className={styles.socials} aria-label="Kanal Sleep & Dream">
              {CHANNELS.map(({ name, href, icon }) => {
                const graphic = <svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>;
                return href
                  ? <a key={name} href={href} aria-label={name}>{graphic}</a>
                  : <span key={name} role="img" aria-label={name}>{graphic}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
