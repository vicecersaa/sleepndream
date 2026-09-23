
import Image from "next/image";
import Link from "next/link";

import styles from "./Hero.module.css";

const HERO_IMAGE = "/images/hero/hero-sleepndream.png";

export default function Hero() {
  return (
    <section
      className={styles.section}
      aria-labelledby="hero-title"
    >
      <div className={styles.container}>
        {/* BAR PROMO */}
        <div className={styles.promoBar}>
          <span className={styles.promoLabel}>
            PENAWARAN SPESIAL
          </span>

          <p className={styles.promoText}>
            Saatnya tidur lebih nyaman bersama Sleep N Dream
          </p>

          <Link href="/deals" className={styles.promoButton}>
            Lihat Promo
          </Link>

          <Link href="/products" className={styles.promoLink}>
            Jelajahi Kasur
          </Link>
        </div>

        {/* HERO */}
        <div className={styles.hero}>
          <Image
            src={HERO_IMAGE}
            alt="Kamar tidur nyaman dengan seseorang bersantai di atas kasur"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 1280px"
            className={styles.image}
          />

          <div
            className={styles.imageOverlay}
            aria-hidden="true"
          />

          <div className={styles.heroContent}>
            <div className={styles.contentInner}>
              <span className={styles.eyebrow}>
                SELAMAT DATANG DI SLEEP N DREAM
              </span>

              <h1 id="hero-title" className={styles.title}>
                <em className={styles.italic}>Nyaman hingga pagi.</em>
              </h1>

              <p className={styles.description}>
                Temukan kasur yang nyaman dan menopang tubuh
                dengan baik, untuk tidur lebih berkualitas
                setiap malam.
              </p>

              <div className={styles.actions}>
                <Link
                  href="/products"
                  className={styles.primaryButton}
                >
                  Jelajahi Koleksi Kasur
                </Link>

                <Link
                  href="/bed-frames"
                  className={styles.secondaryButton}
                >
                  Lihat Rangka Tempat Tidur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
