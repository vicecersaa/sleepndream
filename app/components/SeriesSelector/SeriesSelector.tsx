import Image from "next/image";
import Link from "next/link";

import styles from "./SeriesSelector.module.css";

const SERIES = [
  {
    name: "Chiro Series",
    description:
      "Dukungan lebih terarah untuk membantu menjaga posisi tubuh tetap stabil sepanjang malam.",
    image:
      "https://images.unsplash.com/photo-1784318519037-7ee0b1668e95?auto=format&fit=crop&w=1500&q=88",
    href: "/products",
  },
  {
    name: "Econo Series",
    description:
      "Kenyamanan seimbang dan praktis untuk melengkapi kebutuhan istirahat setiap hari.",
    image:
      "https://images.unsplash.com/photo-1742319096912-7bb94fdfeb03?auto=format&fit=crop&w=1500&q=88",
    href: "/products",
  },
] as const;

function ArrowIcon() {
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

export default function SeriesSelector() {
  return (
    <section className={styles.section} aria-labelledby="series-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="series-title" className={styles.title}>
            Pilih series yang sesuai untukmu
          </h2>
        </div>

        <div className={styles.grid}>
          {SERIES.map((series) => (
            <article className={styles.card} key={series.name}>
              <div className={styles.imageWrap}>
                <Image
                  src={series.image}
                  alt={`Kamar dari ${series.name}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className={styles.image}
                />
                <span className={styles.imageShade} aria-hidden="true" />
                <div className={styles.cardCopy}>
                  <h3>{series.name}</h3>
                  <p>{series.description}</p>
                </div>
                <Link
                  href={series.href}
                  className={styles.cta}
                  aria-label={`Lihat ${series.name}`}
                >
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
