import Image from "next/image";
import Link from "next/link";

import styles from "./QualityPromise.module.css";

const STORIES = [
  {
    title: "Kualitas yang terasa",
    accent: "nyaman tanpa kompromi.",
    description:
      "Setiap lapisan dirancang untuk memberi rasa nyaman yang konsisten dari malam ke malam.",
    image: "/images/quality-blue-bedroom.jpg",
    imageAlt: "Kamar tidur Sleep & Dream bernuansa biru",
    points: [
      {
        title: "Material pilihan",
        copy: "Bahan dipilih untuk menghadirkan sentuhan lembut, sirkulasi yang baik, dan rasa nyaman yang tahan lama.",
      },
      {
        title: "Dibuat dengan perhatian",
        copy: "Setiap detail dirangkai dengan standar yang konsisten agar kualitasnya dapat dirasakan setiap hari.",
      },
    ],
  },
  {
    title: "Dukungan yang tepat",
    accent: "istirahat yang lebih utuh.",
    description:
      "Kenyamanan yang baik dimulai dari dukungan yang mengikuti kebutuhan tubuhmu.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1500&q=88",
    imageAlt: "Kamar tidur modern dengan tempat tidur yang nyaman",
    points: [
      {
        title: "Kenyamanan seimbang",
        copy: "Perpaduan rasa empuk dan topangan membantu tubuh beristirahat dalam posisi yang lebih nyaman.",
      },
      {
        title: "Teruji untuk keseharian",
        copy: "Didesain untuk menemani rutinitas tidur dan menjaga pengalaman istirahat tetap terasa baik.",
      },
    ],
  },
] as const;

export default function QualityPromise() {
  return (
    <section className={styles.section} aria-label="Komitmen kualitas Sleep & Dream">
      <div className={styles.container}>
        {STORIES.map((story, index) => (
          <article
            className={`${styles.story} ${index % 2 ? styles.reverse : ""}`}
            key={story.title}
          >
            <div className={styles.copyColumn}>
              <h2 className={styles.title}>
                {story.title}
                <em>{story.accent}</em>
              </h2>

              <p className={styles.description}>{story.description}</p>

              <div className={styles.points}>
                {story.points.map((point) => (
                  <div className={styles.point} key={point.title}>
                    <h3>{point.title}</h3>
                    <p>{point.copy}</p>
                  </div>
                ))}
              </div>

              <Link href="/products" className={styles.button}>
                Lihat Koleksi
              </Link>
            </div>

            <div className={styles.imageWrap}>
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 58vw"
                className={styles.image}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
