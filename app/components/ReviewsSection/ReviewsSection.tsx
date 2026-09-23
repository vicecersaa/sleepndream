
import Image from "next/image";
import Link from "next/link";

import styles from "./ReviewsSection.module.css";

// Dummy data untuk development.
// Ganti dengan ulasan pelanggan asli sebelum website dipublikasikan.
const REVIEWS = [
  {
    id: "nadia",
    tag: "Nyaman banget",
    quote:
      "Kasurnya nyaman banget buat rebahan setelah aktivitas seharian. Dari pertama dicoba langsung terasa pas dan bikin kamar jadi tempat favoritku.",
    name: "Nadia P.",
    initials: "NP",
    product: "Harmony Mattress",
  },
  {
    id: "rizky",
    tag: "Tidur makin enak",
    quote:
      "Suka sama feel kasurnya yang empuk tapi tetap terasa menopang badan. Setiap pulang kerja rasanya pengen langsung istirahat.",
    name: "Rizky A.",
    initials: "RA",
    product: "Serenity Mattress",
  },
  {
    id: "michelle",
    tag: "Favorit di rumah",
    quote:
      "Awalnya cuma mau ganti kasur lama, ternyata sekarang malah jadi bagian paling nyaman di kamar. Desainnya juga cocok banget sama ruanganku.",
    name: "Michelle T.",
    initials: "MT",
    product: "Dream Mattress",
  },
];

export default function ReviewsSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="reviews-title"
    >
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* FOTO KIRI — TANPA TULISAN / OVERLAY */}
          <div className={styles.photo}>
            <Image
              src="https://images.unsplash.com/photo-1642544435906-c6f9b99d5ba4?auto=format&fit=crop&w=1200&q=85"
              alt="Seseorang sedang bersantai di atas kasur"
              fill
              sizes="(max-width: 900px) 100vw, (max-width: 1100px) 38vw, 440px"
              className={styles.photoImage}
            />
          </div>

          {/* KONTEN KANAN */}
          <div className={styles.right}>
            <div className={styles.header}>
              <h2
                id="reviews-title"
                className={styles.title}
              >
                Malam lebih nyaman,
                <br />
                <span>pagi terasa berbeda.</span>
              </h2>

              <div className={styles.actions}>
                <a
                  href="#review-cards"
                  className={styles.primaryButton}
                >
                  Lihat cerita mereka
                </a>

                <Link
                  href="/products"
                  className={styles.secondaryButton}
                >
                  Jelajahi kasur
                </Link>
              </div>
            </div>

            {/* REVIEW CARDS */}
            <div
              id="review-cards"
              className={styles.reviewGrid}
              aria-label="Contoh tampilan ulasan pelanggan"
            >
              {REVIEWS.map((review) => (
                <article
                  key={review.id}
                  className={styles.reviewCard}
                >
                  <span className={styles.tag}>
                    {review.tag}
                  </span>

                  <div className={styles.reviewContent}>
                    <div
                      className={styles.stars}
                      aria-label="Contoh rating lima bintang"
                    >
                      <span aria-hidden="true">★★★★★</span>
                    </div>

                    <p className={styles.quote}>
                      “{review.quote}”
                    </p>

                    <div className={styles.reviewFooter}>
                    <span
                      className={styles.avatar}
                      aria-hidden="true"
                    >
                      {review.initials}
                    </span>

                    <div className={styles.reviewerInfo}>
                      <span className={styles.reviewer}>
                        {review.name}
                      </span>

                      <span className={styles.product}>
                        {review.product}
                      </span>
                    </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
