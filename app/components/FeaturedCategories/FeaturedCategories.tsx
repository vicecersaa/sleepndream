
"use client";

import { useCallback, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./FeaturedCategories.module.css";

const CATEGORIES = [
  {
    id: "mattress",
    name: "Kasur",
    image: "/images/featured-mattress.jpg",
    alt: "Kasur di kamar tidur yang nyaman",
    href: "/products?category=mattress",
    badge: { top: "10%", bottom: "diskon" },
  },
  {
    id: "bed-frame",
    name: "Rangka Tempat Tidur",
    image: "/images/featured-bed-frame.jpg",
    alt: "Tempat tidur dengan bed frame",
    href: "/products?category=bed-frame",
  },
  {
    id: "bedroom-set",
    name: "Set Kamar Tidur",
    image: "/images/featured-bedroom-set.jpg",
    alt: "Set furnitur untuk kamar tidur",
    href: "/products?category=bedroom-set",
    badge: { top: "15%", bottom: "diskon" },
  },
  {
    id: "pillows",
    name: "Bantal",
    image: "/images/featured-pillows.jpg",
    alt: "Bantal dan perlengkapan tidur",
    href: "/products?category=pillows",
  },
  {
    id: "accessories",
    name: "Aksesori",
    image: "/images/featured-accessories.jpg",
    alt: "Aksesori untuk melengkapi kamar tidur",
    href: "/products?category=accessories",
    badge: { top: "12%", bottom: "diskon" },
  },
  {
    id: "bedding",
    name: "Perlengkapan Tidur",
    image: "/images/featured-bedding.jpg",
    alt: "Seprai dan perlengkapan tempat tidur",
    href: "/products?category=bedding",
  },
];

export default function FeaturedCategories() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;

    setCanScrollLeft(track.scrollLeft > 2);
    setCanScrollRight(track.scrollLeft < maxScroll - 2);
    setScrollProgress(
      maxScroll > 0 ? Math.min(100, (track.scrollLeft / maxScroll) * 100) : 0
    );
  }, []);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(
      `.${styles.card}`
    );

    const cardWidth = firstCard?.offsetWidth ?? 240;
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap) || 0;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const drag = dragRef.current;
    const track = trackRef.current;

    if (!drag.active || !track) return;

    const distance = event.clientX - drag.startX;

    if (!drag.moved && Math.abs(distance) > 5) {
      drag.moved = true;
      setIsDragging(true);
      track.setPointerCapture(event.pointerId);
    }

    if (drag.moved) {
      track.scrollLeft = drag.startScrollLeft - distance;
      updateArrows();
    }
  };

  const stopDragging = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    dragRef.current.active = false;
    setIsDragging(false);

    const track = trackRef.current;

    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    updateArrows();
  };

  const handleClickCapture = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="featured-categories-title"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            id="featured-categories-title"
            className={styles.title}
          >
            Kategori pilihan{" "}
            <span className={styles.titleItalic}>
              untukmu
            </span>
          </h2>

        </div>

        <div
          ref={trackRef}
          className={`${styles.track} ${
            isDragging ? styles.dragging : ""
          }`}
          onScroll={updateArrows}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onClickCapture={handleClickCapture}
        >
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={styles.card}
              draggable={false}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 767px) 65vw, (max-width: 1024px) 32vw, 250px"
                  className={styles.image}
                  draggable={false}
                />

                {category.badge && (
                  <span className={styles.badge}>
                    <span className={styles.badgeTop}>{category.badge.top}</span>
                    <span className={styles.badgeBottom}>
                      {category.badge.bottom}
                    </span>
                  </span>
                )}

              </div>

              <span className={styles.cardContent}>
                <span className={styles.cardTitle}>{category.name}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.sliderFooter}>
          <div
            className={styles.scrollTracker}
            role="progressbar"
            aria-label="Posisi slider kategori"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress)}
          >
            <span
              className={styles.scrollTrackerFill}
              style={{ left: `${scrollProgress * 0.82}%` }}
            />
          </div>

          <div className={styles.footerRow}>
            <p className={styles.footerCopy}>
              Jelajahi kebutuhan kamar untuk
              <br />
              istirahat yang lebih lengkap.
            </p>
            <div className={styles.footerActions}>
              <Link href="/products" className={styles.viewAllButton}>
                Lihat Semua Kategori
              </Link>
              <div className={styles.controls} aria-label="Navigasi kategori">
                <button
                  type="button"
                  className={styles.arrowButton}
                  aria-label="Geser kategori ke kiri"
                  disabled={!canScrollLeft}
                  onClick={() => scrollByCard(-1)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.arrowButton}
                  aria-label="Geser kategori ke kanan"
                  disabled={!canScrollRight}
                  onClick={() => scrollByCard(1)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
