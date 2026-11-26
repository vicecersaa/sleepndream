import Image from "next/image";

import styles from "./QualityPromise.module.css";

const BENEFITS = [
  {
    title: "Material Pilihan",
    copy: "Bahan dipilih untuk menghadirkan sentuhan lembut, sirkulasi yang baik, dan rasa nyaman yang tahan lama.",
    icon: <path d="M12 1.6 15 8l7 .9a.9.9 0 0 1 .5 1.5l-5.2 5 1.3 7a.9.9 0 0 1-1.3.9L12 19.8l-5.3 3.5a.9.9 0 0 1-1.3-.9l1.3-7-5.2-5A.9.9 0 0 1 2 8.9l7-.9 3-6.4Z" />,
  },
  {
    title: "Dibuat dengan Perhatian",
    copy: "Setiap detail dirangkai dengan standar yang konsisten agar kualitasnya dapat dirasakan setiap hari.",
    icon: <><path d="M13 3.5c3-4 9-1 7.3 3.5-.8 2-3.5 4.2-7.3 7-3.8-2.8-6.5-5-7.3-7C4 2.5 10-.5 13 3.5Z" /><path d="m1 18 3-2 4 6-3 2-4-6Zm5-2 3-2 5 1.4a1.3 1.3 0 0 1-.6 2.5l-3-.7-.3 1.2 3.6.8c.6.1 1.2 0 1.7-.3l5.3-3.1a1.3 1.3 0 0 1 1.5 2.1l-6.1 4c-.5.3-1 .4-1.6.3l-5.2-1L6 16Z" /></>,
  },
  {
    title: "Teruji untuk Keseharian",
    copy: "Didesain untuk menemani rutinitas tidur dan menjaga pengalaman istirahat tetap terasa baik.",
    icon: <><path d="m12 1 2.7 1.5 3.1-.1 1.5 2.7L22 6.7l-.1 3.1 1.1 2.9-1.7 2.6-.5 3-2.9 1.2-2 2.4-3-.5-3 .8-2.2-2.2-3-.9-.8-3-1.9-2.5.9-3-.4-3 2.6-1.7 1.3-2.8 3.1-.2L12 1Z" /><path d="m7.5 12.3 3.2 3.1 5.7-6" fill="none" stroke="var(--color-background)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>,
  },
];

export default function QualityPromise() {
  return (
    <div className={`container-main ${styles.section}`}>
      <section aria-labelledby="quality-title" className={styles.story}>
        <div className={styles.copyColumn}>
          <p className={styles.eyebrow}>Kualitas yang terasa</p>
          <h2 id="quality-title" className={styles.title}>Nyaman tanpa Kompromi.</h2>

          <ul className={styles.points}>
            {BENEFITS.map(({ title, copy, icon }) => (
              <li className={styles.point} key={title}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">{icon}</svg>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.imageWrap}>
          <Image
            src="/images/quality-blue-bedroom.jpg"
            alt="Kamar tidur bernuansa biru dengan tempat tidur berlapis kain"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className={styles.qualityImage}
          />
        </div>
      </section>

      <section id="showroom" aria-labelledby="showroom-title" className={styles.story}>
        <div className={styles.imageWrap}>
          <Image
            src="/images/hero/hero-sleepndream.png"
            alt="Ilustrasi kasur Sleep & Dream dalam kamar tidur"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className={styles.showroomImage}
          />
        </div>
        <div className={styles.copyColumn}>
          <p className={styles.showroomIntro}>Coba langsung di <strong>Showroom Kami</strong></p>
          <h2 id="showroom-title" className={styles.title}>Mall Artha Gading</h2>
          <address className={styles.address}>Lt. 3 Blok B2 No. 1, Jakarta Utara</address>
        </div>
      </section>
    </div>
  );
}
