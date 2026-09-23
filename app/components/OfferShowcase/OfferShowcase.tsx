"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./OfferShowcase.module.css";

const OFFERS = [
  {
    title: "Kenyamanan pilihan untuk kamar utama",
    discount: "Hemat 25%",
    image:
      "https://images.unsplash.com/photo-1784318519037-7ee0b1668e95?auto=format&fit=crop&w=1100&q=88",
    href: "/products",
  },
  {
    title: "Ruang istirahat dengan sentuhan modern",
    discount: "Hemat 20%",
    image:
      "https://images.unsplash.com/photo-1742319096912-7bb94fdfeb03?auto=format&fit=crop&w=1100&q=88",
    href: "/products",
  },
  {
    title: "Koleksi tidur untuk kenyamanan menyeluruh",
    discount: "Hemat 15%",
    image:
      "https://images.unsplash.com/photo-1776348065068-476a708a2d3a?auto=format&fit=crop&w=1100&q=88",
    href: "/products",
  },
  {
    title: "Pilihan lembut untuk malam yang lebih tenang",
    discount: "Hemat 18%",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1100&q=88",
    href: "/products",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OfferShowcase() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollLeft(track.scrollLeft > 2);
    setCanScrollRight(track.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    updateControls();
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);

    for (const card of track.children) observer.observe(card);

    return () => observer.disconnect();
  }, [updateControls]);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(`.${styles.offerCard}`);

    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  return (
    <section className={styles.section} aria-labelledby="offer-showcase-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <h2 id="offer-showcase-title" className={styles.title}>
            <span>Hemat hingga 25%.</span>
            <span>Tidur lebih nyaman.</span>
          </h2>
          <p className={styles.description}>
            Temukan pilihan kasur dan perlengkapan tidur dengan penawaran khusus,
            dirancang untuk menghadirkan kenyamanan yang terasa lebih baik setiap malam.
          </p>
          <Link href="/products" className={styles.cta}>
            Lihat Semua Promo
          </Link>
        </div>

        <div className={styles.gallery}>
          <div ref={trackRef} className={styles.track} onScroll={updateControls}>
            {OFFERS.map((offer) => (
              <Link key={offer.title} href={offer.href} className={styles.offerCard}>
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 767px) 78vw, (max-width: 1024px) 46vw, 29vw"
                  className={styles.image}
                />
                <span className={styles.discountTag}>{offer.discount}</span>
                <span className={styles.overlay} aria-hidden="true" />
                <h3>{offer.title}</h3>
              </Link>
            ))}
          </div>

          <div className={styles.controls} aria-label="Navigasi penawaran">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!canScrollLeft}
              aria-label="Promo sebelumnya"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={!canScrollRight}
              aria-label="Promo berikutnya"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
