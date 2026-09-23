
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import styles from "./AccessoriesRecommendations.module.css";

/* =========================================
   DATA CONTOH
========================================= */

type Swatch = {
  label: string;
  color?: string;
  stripe?: boolean;
};

type Product = {
  id: number;
  category: "Bantal" | "Bedding" | "Pelindung";
  badge?: string;
  image: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  oldPrice: number;
  price: number;
  href: string;
  swatches: Swatch[];
};

const COMMON_SWATCHES: Swatch[] = [
  { label: "Putih", color: "#f7f6f2" },
  { label: "Krem", color: "#e8dfcf" },
  { label: "Beige", color: "#cbbda8" },
  { label: "Garis krem", stripe: true },
  { label: "Sage", color: "#a9b39f" },
  { label: "Biru muda", color: "#91aabe" },
  { label: "Navy", color: "#33475d" },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    category: "Bantal",
    badge: "Pilihan Favorit",
    image: "https://images.unsplash.com/photo-1698746043955-42b03ddedfcb?w=1000&q=88&auto=format&fit=crop",
    name: "Cloud Pillow",
    description: "Bantal lembut dengan dukungan nyaman untuk kepala dan leher.",
    rating: 4.8,
    reviews: 186,
    oldPrice: 899000,
    price: 699000,
    href: "/products",
    swatches: COMMON_SWATCHES,
  },
  {
    id: 2,
    category: "Bantal",
    badge: "Paling Dicari",
    image: "https://images.unsplash.com/photo-1648475234432-f8a94f1338e7?w=1000&q=88&auto=format&fit=crop",
    name: "Everyday Bolster",
    description: "Guling empuk dengan isi yang tetap terasa penuh dan suportif.",
    rating: 4.7,
    reviews: 142,
    oldPrice: 749000,
    price: 579000,
    href: "/products",
    swatches: COMMON_SWATCHES,
  },
  {
    id: 3,
    category: "Bedding",
    badge: "Baru",
    image: "https://images.unsplash.com/photo-1708903077535-8ffd82c26580?w=1000&q=88&auto=format&fit=crop",
    name: "Cotton Sheet Set",
    description: "Set seprai katun yang halus, ringan, dan nyaman digunakan setiap hari.",
    rating: 4.9,
    reviews: 104,
    oldPrice: 1299000,
    price: 999000,
    href: "/products",
    swatches: COMMON_SWATCHES,
  },
  {
    id: 4,
    category: "Bedding",
    badge: "Koleksi Terbaru",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&q=88&auto=format&fit=crop",
    name: "Cozy Blanket",
    description: "Selimut ringan dengan tekstur lembut untuk menambah rasa hangat.",
    rating: 4.6,
    reviews: 89,
    oldPrice: 1099000,
    price: 849000,
    href: "/products",
    swatches: COMMON_SWATCHES,
  },
  {
    id: 5,
    category: "Pelindung",
    badge: "Perlindungan Ekstra",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1000&q=88&auto=format&fit=crop",
    name: "Mattress Protector",
    description: "Pelindung breathable untuk menjaga permukaan kasur tetap bersih dan nyaman.",
    rating: 4.8,
    reviews: 215,
    oldPrice: 999000,
    price: 749000,
    href: "/products",
    swatches: COMMON_SWATCHES,
  },
];

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const CATEGORIES = ["Lihat Semua", "Bantal", "Bedding", "Pelindung"] as const;
type Category = (typeof CATEGORIES)[number];

/* =========================================
   PANAH CHEVRON
========================================= */

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m15 5-7 7 7 7"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================
   PRODUCT CARD
========================================= */

function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(0);

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {product.badge && (
          <span className={styles.badge}>
            {product.badge}
          </span>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 82vw, (max-width: 1024px) 45vw, 30vw"
          className={styles.image}
          draggable={false}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.headingRow}>
          <h3 className={styles.cardTitle}>
            <Link href={product.href}>{product.name}</Link>
          </h3>

          <div
            className={styles.ratingRow}
            aria-label={`Nilai ${product.rating} dari 5, berdasarkan ${product.reviews} ulasan`}
          >
            <span className={styles.stars} aria-hidden="true">
              ★★★★★
            </span>

            <span className={styles.ratingValue}>
              {product.rating.toFixed(1)}
            </span>

            <span className={styles.reviews}>
              ({product.reviews})
            </span>
          </div>
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceRow}>
          <span className={styles.oldPrice}>
            {rupiah.format(product.oldPrice)}
          </span>

          <span className={styles.price}>
            {rupiah.format(product.price)}
          </span>

          <span className={styles.discountBadge}>
            Hemat {discount}%
          </span>
        </div>

        <div className={styles.purchaseRow}>
          <Link
            href={product.href}
            className={styles.cta}
            draggable={false}
          >
            Lihat Produk
          </Link>

          <div className={styles.swatchSection}>
            <div
              className={styles.swatchList}
              role="group"
              aria-label={`Pilihan warna ${product.name}`}
            >
              {product.swatches.map((swatch, index) => (
                <button
                  key={`${swatch.label}-${index}`}
                  type="button"
                  className={`${styles.swatch} ${
                    selectedColor === index
                      ? styles.swatchActive
                      : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                  aria-label={`${product.name}, warna ${swatch.label}`}
                  aria-pressed={selectedColor === index}
                  title={swatch.label}
                >
                  <span
                    className={`${styles.swatchFill} ${
                      swatch.stripe
                        ? styles.swatchStripeFill
                        : ""
                    }`}
                    style={
                      swatch.color
                        ? { backgroundColor: swatch.color }
                        : undefined
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}

/* =========================================
   SLIDER
========================================= */

export default function AccessoriesRecommendations() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("Lihat Semua");

  const dragRef = useRef({
    pressed: false,
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const suppressClickRef = useRef(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollThumbSize, setScrollThumbSize] = useState(100);

  const visibleProducts =
    activeCategory === "Lihat Semua"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeCategory);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    setCanScrollLeft(track.scrollLeft > 2);
    setCanScrollRight(
      track.scrollLeft < maxScroll - 2
    );

    setScrollProgress(
      maxScroll > 0 ? Math.min(100, (track.scrollLeft / maxScroll) * 100) : 0
    );
    setScrollThumbSize(
      track.scrollWidth > 0
        ? Math.min(100, (track.clientWidth / track.scrollWidth) * 100)
        : 100
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    updateArrows();

    const observer = new ResizeObserver(updateArrows);

    observer.observe(track);

    for (const card of track.children) {
      observer.observe(card);
    }

    return () => observer.disconnect();
  }, [activeCategory, updateArrows]);

  function selectCategory(category: Category) {
    setActiveCategory(category);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) return;

    const card = track.querySelector<HTMLElement>(
      `.${styles.card}`
    );

    if (!card) return;

    const gap =
      parseFloat(
        window.getComputedStyle(track).columnGap
      ) || 0;

    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const track = trackRef.current;

    if (!track) return;

    dragRef.current = {
      pressed: true,
      dragging: false,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };

    suppressClickRef.current = false;
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (event.pointerType !== "mouse") return;

    const track = trackRef.current;
    const drag = dragRef.current;

    if (!track || !drag.pressed) return;

    const distance = event.clientX - drag.startX;

    if (!drag.dragging && Math.abs(distance) < 6) {
      return;
    }

    if (!drag.dragging) {
      drag.dragging = true;
      suppressClickRef.current = true;

      track.classList.add(styles.dragging);

      if (!track.hasPointerCapture(event.pointerId)) {
        track.setPointerCapture(event.pointerId);
      }
    }

    track.scrollLeft =
      drag.startScrollLeft - distance;
  }

  function endDrag(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    const track = trackRef.current;

    dragRef.current.pressed = false;
    dragRef.current.dragging = false;

    if (!track) return;

    track.classList.remove(styles.dragging);

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    updateArrows();
  }

  function handleTrackClickCapture(
    event: ReactMouseEvent<HTMLDivElement>
  ) {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    suppressClickRef.current = false;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="accessories-title"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            id="accessories-title"
            className={styles.title}
          >
            Aksesori pilihan untukmu
          </h2>

          <div className={styles.categoryFilters} aria-label="Filter kategori aksesori">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.categoryFilter} ${
                  activeCategory === category ? styles.categoryFilterActive : ""
                }`}
                onClick={() => selectCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          onScroll={updateArrows}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleTrackClickCapture}
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div
          className={`${styles.sliderFooter} ${
            !canScrollLeft && !canScrollRight ? styles.sliderFooterHidden : ""
          }`}
        >
          <div
            className={styles.scrollTracker}
            role="progressbar"
            aria-label="Posisi slider rekomendasi aksesori"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress)}
          >
            <span
              className={styles.scrollTrackerFill}
              style={{
                width: `${scrollThumbSize}%`,
                left: `${(scrollProgress * (100 - scrollThumbSize)) / 100}%`,
              }}
            />
          </div>

          <div className={styles.footerRow}>
            <div className={styles.controls} aria-label="Navigasi rekomendasi aksesori">
              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollLeft}
                aria-label="Lihat aksesori sebelumnya"
              >
                <ArrowLeftIcon />
              </button>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => scrollByCard(1)}
                disabled={!canScrollRight}
                aria-label="Lihat aksesori berikutnya"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
