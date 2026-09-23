import Image from "next/image";
import Link from "next/link";

import styles from "./PromoBanner.module.css";

const LOGO_SRC = "/images/logo/logo-sleepndream-navy.png";

export default function PromoBanner() {
  return (
    <section
      className={styles.section}
      aria-label="Promo Sleep N Dream"
    >
      <div className={styles.container}>
        <div className={styles.card}>
          {/* LEFT — LOGO */}
          <div className={styles.logoSide}>
            <div className={styles.logoWrap}>
              <Image
                src={LOGO_SRC}
                alt="Logo Sleep N Dream"
                fill
                className={styles.logo}
                sizes="(max-width: 767px) 180px, 220px"
              />
            </div>
          </div>

          {/* DIVIDER */}
          <span
            className={styles.divider}
            aria-hidden="true"
          />

          {/* RIGHT — PROMO */}
          <div className={styles.contentSide}>
            <div className={styles.copy}>
              <span className={styles.eyebrow}>
                PENAWARAN TERBATAS
              </span>

              <h2 className={styles.title}>
                Diskon spesial hingga 50%
                <br />
                untuk pilihan kasur tertentu
              </h2>
            </div>

            <Link
              href="/products"
              className={styles.button}
            >
              Lihat Promo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}