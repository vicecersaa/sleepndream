
import Image from "next/image";
import Link from "next/link";

import styles from "./SocialStrip.module.css";

export default function SocialStrip() {
  return (
    <section
      className={styles.section}
      aria-label="Kenali Sleep N Dream"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* KIRI — BIRU + MATAHARI */}
          <div className={`${styles.card} ${styles.blueCard}`}>
            <div className={styles.blueContent}>
              <span className={styles.eyebrow}>
                SLEEP N DREAM
              </span>

              <h2 className={styles.blueTitle}>
                Dibuat untuk malam
                <br />
                yang lebih nyaman.
              </h2>

              <p className={styles.blueDescription}>
                Kenali koleksi yang menemani waktu istirahatmu.
              </p>
            </div>

            <div className={styles.iconWrap} aria-hidden="true">
              <Image
                src="/images/icons/sleepndream-icon.png"
                alt=""
                width={220}
                height={220}
                className={styles.iconImage}
                sizes="(max-width: 767px) 90px, 120px"
              />
            </div>
          </div>

          {/* KANAN — PUTIH + BULAN */}
          <div className={`${styles.card} ${styles.whiteCard}`}>
            <div className={styles.whiteContent}>
              <span className={styles.eyebrow}>
                TEMUKAN PILIHANMU
              </span>

              <h2 className={styles.whiteTitle}>
                Kenyamanan dimulai
                <br />
                dari kasur yang tepat.
              </h2>

              <Link
                href="/products"
                className={styles.textLink}
              >
                Jelajahi koleksi kasur
              </Link>
            </div>

            <div className={styles.iconWrap} aria-hidden="true">
              <Image
                src="/images/icons/sleepndream-moon.png"
                alt=""
                width={220}
                height={220}
                className={styles.iconImage}
                sizes="(max-width: 767px) 90px, 120px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
