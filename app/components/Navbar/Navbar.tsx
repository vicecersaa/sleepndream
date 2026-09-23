
"use client";

import { useEffect, useState } from "react";
import type { FormEvent, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Navbar.module.css";

type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Kasur",
    href: "/products",
    children: [
      { label: "Semua Kasur", href: "/products" },
      { label: "Kasur Pegas", href: "/products?category=spring" },
      {
        label: "Kasur Busa Memori",
        href: "/products?category=memory-foam",
      },
      { label: "Kasur Hibrida", href: "/products?category=hybrid" },
    ],
  },
  {
    label: "Rangka Tempat Tidur",
    href: "/bed-frames",
    children: [
      { label: "Semua Rangka Tempat Tidur", href: "/bed-frames" },
      {
        label: "Tempat Tidur Berlapis Kain",
        href: "/bed-frames?category=upholstered",
      },
      {
        label: "Tempat Tidur Platform",
        href: "/bed-frames?category=platform",
      },
    ],
  },
  {
    label: "Perlengkapan Tidur",
    href: "/bedding",
    children: [
      { label: "Semua Perlengkapan Tidur", href: "/bedding" },
      { label: "Bantal", href: "/bedding?category=pillows" },
      { label: "Seprai", href: "/bedding?category=bedsheets" },
      {
        label: "Pelindung Kasur",
        href: "/bedding?category=protectors",
      },
    ],
  },
  { label: "Aksesori", href: "/accessories" },
  { label: "Promo", href: "/deals" },
];

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
    href: "/deals",
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

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const activeAnnouncement = ANNOUNCEMENTS[announcementIndex];

  function closePanels() {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((current) => !current);
    setSearchOpen(false);
  }

  function toggleSearch() {
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
    router.push(`/search?q=${encodeURIComponent(query)}`);
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
            <Link href="/stores" onClick={closePanels}>
              Cari Toko
            </Link>

            <Link href="/account" onClick={closePanels}>
              Akun Saya
            </Link>
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
              {NAV_ITEMS.map((item) => {
                if (!item.children) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={styles.navLink}
                      onClick={closePanels}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <details
                    key={item.label}
                    className={styles.navDropdown}
                  >
                    <summary className={styles.navLink}>
                      {item.label}
                    </summary>

                    <div className={styles.dropdownPanel}>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={styles.dropdownLink}
                          onClick={(event) => {
                            const details =
                              event.currentTarget.closest("details");

                            if (details) {
                              details.open = false;
                            }
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}
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

            <Link
              href="/account"
              className={`${styles.iconButton} ${styles.desktopAction}`}
              aria-label="Akun saya"
              title="Akun saya"
              onClick={closePanels}
            >
              <UserIcon />
            </Link>

            <Link
              href="/cart"
              className={styles.iconButton}
              aria-label="Keranjang belanja"
              title="Keranjang belanja"
              onClick={closePanels}
            >
              <BagIcon />
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
            {NAV_ITEMS.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.mobileLink}
                    onClick={closePanels}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <details
                  key={item.label}
                  className={styles.mobileDropdown}
                >
                  <summary className={styles.mobileLink}>
                    <span>{item.label}</span>

                    <span
                      className={styles.mobilePlus}
                      aria-hidden="true"
                    />
                  </summary>

                  <div className={styles.mobileSubmenu}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closePanels}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}

            <div className={styles.mobileMenuFooter}>
              <Link href="/stores" onClick={closePanels}>
                Cari Toko
              </Link>

              <Link href="/account" onClick={closePanels}>
                Akun Saya
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
