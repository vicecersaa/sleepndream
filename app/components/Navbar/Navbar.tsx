
"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Navbar.module.css";
import { PROMO_DIALOG_ID } from "../PromoModal/PromoModal";
import { CART_CHANGED_EVENT, readCart } from "../../lib/cart";

const WHATSAPP_URL = "https://wa.me/628170150815";
const inquire = (type: string) => WHATSAPP_URL + "?text=" + encodeURIComponent("Halo Sleep & Dream, saya ingin tanya tentang " + type + ".");

const MATTRESS_GROUPS = [
  {
    title: "Jenis",
    items: [
      { label: "Kasur Set", image: "/images/featured-bedroom-set.jpg", href: inquire("kasur set") },
      { label: "Kasur", image: "/images/featured-mattress.jpg", href: "/products" },
      { label: "Headboard", image: "/images/featured-bed-frame.jpg", href: inquire("headboard") },
      { label: "Dipan", image: "/images/quality-blue-bedroom.jpg", href: inquire("dipan") },
      { label: "Custom Kasur (Konsultasi)", image: "/images/hero/hero-sleepndream.png", href: inquire("kasur custom") },
    ],
  },
  {
    title: "Kenyamanan",
    items: [
      { label: "Soft", image: "/images/featured-bedding.jpg", href: "/products?comfort=Soft" },
      { label: "Medium Soft", image: "/images/featured-bedroom-set.jpg", href: "/products?series=econo&comfort=Soft+Medium" },
      { label: "Medium Firm", image: "/images/featured-mattress.jpg", href: "/products?comfort=Medium+Firm" },
      { label: "Firm", image: "/images/featured-bed-frame.jpg", href: "/products?comfort=Firm" },
      { label: "Extra Firm", image: "/images/quality-blue-bedroom.jpg", href: "/products?comfort=Extra+Firm" },
    ],
  },
];

const BEDDING_GROUPS = [{
  title: "Jenis",
  items: [
    { label: "Bantal", image: "/images/featured-pillows.jpg", href: "/#aksesori-bantal" },
    { label: "Guling", image: "/images/featured-accessories.jpg", href: "/#aksesori-guling" },
    { label: "Bed Cover", image: "/images/featured-bedding.jpg", href: "/#aksesori-bed-cover" },
  ],
}];

const MEGA_MENUS = [
  { label: "Kasur", groups: MATTRESS_GROUPS, href: "/products", image: "/images/featured-mattress.jpg" },
  { label: "Perlengkapan Tidur", groups: BEDDING_GROUPS, href: "/#accessories-title", image: "/images/featured-bedding.jpg" },
];

type MenuItem = (typeof MATTRESS_GROUPS)[number]["items"][number];

function MegaGroups({ groups, onNavigate, onPreview }: {
  groups: typeof MATTRESS_GROUPS;
  onNavigate: () => void;
  onPreview?: (item: MenuItem) => void;
}) {
  return groups.map(({ title, items }) => (
    <div className={styles.megaGroup} key={title}>
      <p className={styles.megaHeading}>{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item.label} onPointerEnter={onPreview ? (event) => { if (event.pointerType === "mouse") onPreview(item); } : undefined} onFocus={onPreview ? () => onPreview(item) : undefined}>
            {item.href.startsWith("/#aksesori-")
              ? <a className={styles.megaLink} href={item.href} onClick={onNavigate}>{item.label}</a>
              : <Link className={styles.megaLink} href={item.href} onClick={onNavigate}>{item.label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  ));
}

function MegaPreview({ menu, item, onNavigate }: {
  menu: (typeof MEGA_MENUS)[number];
  item?: MenuItem;
  onNavigate: () => void;
}) {
  const href = item?.href ?? menu.href;
  const label = item?.label ?? "Lihat koleksi " + menu.label.toLowerCase();
  const images = <>
    <Image src={menu.image} alt="" fill sizes="(min-width: 1200px) 440px, 40vw" />
    {item && <Image
      key={item.image}
      className={styles.hoverArtwork}
      src={item.image}
      alt=""
      fill
      sizes="(min-width: 1200px) 440px, 40vw"
      onLoad={(event) => { event.currentTarget.dataset.loaded = "true"; }}
    />}
  </>;

  return href.startsWith("/#aksesori-")
    ? <a href={href} className={styles.megaImage} aria-label={label} onClick={onNavigate}>{images}</a>
    : <Link href={href} className={styles.megaImage} aria-label={label} onClick={onNavigate}>{images}</Link>;
}

/* =========================================
   PROMO TENGAH
========================================= */

const ANNOUNCEMENTS = [
  {
    text: "Temukan kasur untuk tidur lebih nyaman",
    href: "/products",
  },
  {
    text: "Jelajahi koleksi Sleep N Dream",
    href: "/products",
  },
  {
    text: "Lihat penawaran spesial kami",
    href: "/#offer-showcase-title",
  },
] as const;

/* =========================================
   ICONS
========================================= */

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function SearchIcon() {
  return (
    <IconBase>
      <circle cx="10.8" cy="10.8" r="7.2" />
      <path d="m16.2 16.2 4.5 4.5" />
    </IconBase>
  );
}

function UserIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </IconBase>
  );
}

function LogoutIcon() {
  return (
    <IconBase>
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 3v18a2 2 0 0 1-2 2h-7" />
    </IconBase>
  );
}

function BagIcon() {
  return (
    <IconBase>
      <path d="M4.5 8.5h15l-1.3 12h-12l-1.7-12Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </IconBase>
  );
}

function MenuIcon() {
  return (
    <IconBase>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </IconBase>
  );
}

function CloseIcon() {
  return (
    <IconBase>
      <path d="M5 5 19 19M19 5 5 19" />
    </IconBase>
  );
}

function ChevronLeftIcon() {
  return (
    <IconBase>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

function ChevronRightIcon() {
  return (
    <IconBase>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

/* =========================================
   NAVBAR
========================================= */

export default function Navbar() {
  const router = useRouter();

  const desktopNav = useRef<HTMLElement>(null);
  const [preview, setPreview] = useState<{ menu: string; item: MenuItem } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [signedIn, setSignedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const activeAnnouncement = ANNOUNCEMENTS[announcementIndex];

  function closePanels() {
    desktopNav.current?.querySelector<HTMLDetailsElement>("details[open]")?.removeAttribute("open");
    setMenuOpen(false);
    setSearchOpen(false);
  }

  function openPromo(fromMobile = false) {
    closePanels();
    if (fromMobile) document.querySelector<HTMLButtonElement>('button[aria-controls="navbar-mobile-menu"]')?.focus();
    const dialog = document.getElementById(PROMO_DIALOG_ID) as HTMLDialogElement | null;
    if (dialog && !dialog.open) dialog.showModal();
  }

  function toggleMenu() {
    setMenuOpen((current) => !current);
    setSearchOpen(false);
  }

  function toggleSearch() {
    desktopNav.current?.querySelector<HTMLDetailsElement>("details[open]")?.removeAttribute("open");
    setSearchOpen((current) => !current);
    setMenuOpen(false);
  }

  function changeAnnouncement(direction: number) {
    setAnnouncementIndex(
      (current) =>
        (current + direction + ANNOUNCEMENTS.length) %
        ANNOUNCEMENTS.length
    );
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    closePanels();
    router.push(`/products?q=${encodeURIComponent(query)}`);
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const syncCart = () => setCartCount(readCart().reduce((total, item) => total + item.quantity, 0));
    syncCart();
    window.addEventListener(CART_CHANGED_EVENT, syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener(CART_CHANGED_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const checkSession = async () => {
      try {
        const response = await fetch("/api/v1/auth/me", { credentials: "include" });
        if (active) setSignedIn(response.ok);
      } catch {
        if (active) setSignedIn(false);
      }
    };
    void checkSession();
    window.addEventListener("sleepndream-auth-changed", checkSession);
    return () => {
      active = false;
      window.removeEventListener("sleepndream-auth-changed", checkSession);
    };
  }, []);

  async function logout() {
    await fetch("/api/v1/auth/logout", { method: "POST", credentials: "include" }).catch(() => undefined);
    setSignedIn(false);
    closePanels();
    router.push("/");
    router.refresh();
  }

  return (
    <header className={styles.header}>
      {/* =====================================
          ANNOUNCEMENT BAR
      ===================================== */}

      <div className={styles.announcement}>
        <div
          className={`container-main ${styles.announcementInner}`}
        >
          {/* KIRI — TETAP SEPERTI SEBELUMNYA */}

          <div className={styles.announcementMessage}>
            <span>Tidur Nyenyak Dimulai di Sini.</span>

            <Link
              href="/products"
              className={styles.announcementLink}
              onClick={closePanels}
            >
              Jelajahi Koleksi Kami
            </Link>
          </div>

          {/* TENGAH — PROMO DENGAN PANAH */}

          <div className={styles.announcementCarousel}>
            <button
              type="button"
              className={styles.announcementArrow}
              aria-label="Promo sebelumnya"
              onClick={() => changeAnnouncement(-1)}
            >
              <ChevronLeftIcon />
            </button>

            <Link
              href={activeAnnouncement.href}
              className={styles.announcementSlide}
              onClick={closePanels}
              aria-live="polite"
              aria-atomic="true"
            >
              {activeAnnouncement.text}
            </Link>

            <button
              type="button"
              className={styles.announcementArrow}
              aria-label="Promo berikutnya"
              onClick={() => changeAnnouncement(1)}
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* KANAN */}

          <div className={styles.announcementLinks}>
            <Link href="/#showroom" onClick={closePanels}>
              Cari Toko
            </Link>

            <Link href="/login" onClick={closePanels}>Masuk</Link>
          </div>
        </div>
      </div>

      {/* =====================================
          NAVBAR UTAMA
      ===================================== */}

      <div className={styles.navbar}>
        <div
          className={`container-main ${styles.navbarInner}`}
        >
          <div className={styles.navLeft}>
            <Link
              href="/"
              className={styles.logo}
              onClick={closePanels}
              aria-label="Beranda Sleep N Dream"
            >
              <Image
                src="/images/logo/logo-sleepndream-navy.png"
                alt="Sleep N Dream"
                width={190}
                height={64}
                priority
                className={styles.logoImage}
              />
            </Link>

            <nav
              className={styles.desktopNav}
              aria-label="Navigasi utama"
            >
              {MEGA_MENUS.map((menu) => (
                <details key={menu.label} name="sleepndream-mega-menu" className={styles.megaDropdown}
                  onToggle={(event) => {
                    if (!event.currentTarget.open) setPreview((current) => current?.menu === menu.label ? null : current);
                  }}
                  onPointerEnter={(event) => { if (event.pointerType === "mouse") event.currentTarget.open = true; }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) event.currentTarget.open = false;
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape" && event.currentTarget.open) {
                      event.currentTarget.open = false;
                      event.currentTarget.querySelector("summary")?.focus();
                    }
                  }}
                >
                  <summary className={styles.navLink}>{menu.label}</summary>
                  <div className={styles.megaPanel} data-compact={menu.groups.length === 1}>
                    <MegaGroups groups={menu.groups} onNavigate={closePanels} onPreview={(item) => setPreview({ menu: menu.label, item })} />
                    <MegaPreview menu={menu} item={preview?.menu === menu.label ? preview.item : undefined} onNavigate={closePanels} />
                  </div>
                </details>
              ))}
              <button type="button" className={styles.navLink} aria-haspopup="dialog" aria-controls={PROMO_DIALOG_ID} onPointerEnter={closePanels} onClick={() => openPromo()}>Promo</button>
            </nav>
          </div>

          {/* IKON KANAN */}

          <div className={styles.navActions}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label={
                searchOpen ? "Tutup pencarian" : "Cari produk"
              }
              aria-expanded={searchOpen}
              aria-controls="navbar-search"
              onClick={toggleSearch}
              title="Cari produk"
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>

            {signedIn ? (
              <button type="button" className={`${styles.iconButton} ${styles.desktopAction}`} aria-label="Keluar dari akun" title="Keluar" onClick={() => void logout()}>
                <LogoutIcon />
              </button>
            ) : (
              <Link href="/login" className={`${styles.iconButton} ${styles.desktopAction}`} aria-label="Masuk ke akun" title="Masuk" onClick={closePanels}>
                <UserIcon />
              </Link>
            )}

            <Link
              href="/cart"
              className={styles.iconButton}
              aria-label="Keranjang belanja"
              title="Keranjang belanja"
              onClick={closePanels}
            >
              <BagIcon />
              {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
            </Link>

            <button
              type="button"
              className={`${styles.iconButton} ${styles.menuButton}`}
              aria-label={
                menuOpen ? "Tutup menu" : "Buka menu"
              }
              aria-expanded={menuOpen}
              aria-controls="navbar-mobile-menu"
              onClick={toggleMenu}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================
          PENCARIAN
      ===================================== */}

      {searchOpen && (
        <div
          id="navbar-search"
          className={styles.searchPanel}
        >
          <div className="container-main">
            <form
              className={styles.searchForm}
              onSubmit={handleSearch}
              role="search"
            >
              <SearchIcon />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Cari kasur atau perlengkapan tidur..."
                aria-label="Cari produk"
                autoFocus
              />

              <button
                type="submit"
                className={styles.searchSubmit}
                disabled={!searchQuery.trim()}
              >
                Cari
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
          MENU MOBILE
      ===================================== */}

      {menuOpen && (
        <nav
          id="navbar-mobile-menu"
          className={styles.mobileMenu}
          aria-label="Navigasi seluler"
        >
          <div className={styles.mobileMenuInner}>
            {MEGA_MENUS.map((menu) => (
              <details key={menu.label} name="sleepndream-mobile-menu" className={styles.mobileDropdown}>
                <summary className={styles.mobileLink}>
                  {menu.label}<span className={styles.mobilePlus} aria-hidden="true" />
                </summary>
                <div className={styles.mobileSubmenu}>
                  <MegaGroups groups={menu.groups} onNavigate={closePanels} />
                </div>
              </details>
            ))}
            <button type="button" className={styles.mobileLink} aria-haspopup="dialog" aria-controls={PROMO_DIALOG_ID} onClick={() => openPromo(true)}>Promo</button>

            <div className={styles.mobileMenuFooter}>
              <Link href="/#showroom" onClick={closePanels}>
                Cari Toko
              </Link>

              {signedIn ? <button type="button" onClick={() => void logout()}>Keluar</button> : <Link href="/login" onClick={closePanels}>Masuk</Link>}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
