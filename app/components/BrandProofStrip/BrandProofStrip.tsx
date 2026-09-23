import styles from "./BrandProofStrip.module.css";

const HIGHLIGHTS = [
  { value: "2", suffix: "Lokasi", label: "Galeri Sleep & Dream" },
  { value: "10", suffix: "Tahun", label: "Garansi pilihan" },
  { value: "100", suffix: "%", label: "Komitmen untuk tidur lebih baik" },
];

export default function BrandProofStrip() {
  return (
    <section className={styles.section} aria-label="Tentang kualitas Sleep & Dream">
      <div className={styles.container}>
        <div className={styles.highlights}>
          {HIGHLIGHTS.map((item) => (
            <div className={styles.highlight} key={item.label}>
              <p className={styles.value}>
                {item.value}
                {item.suffix && <span>{item.suffix}</span>}
              </p>
              <p className={styles.label}>{item.label}</p>
            </div>
          ))}
        </div>

        <div className={styles.story}>
          <p>
            Sleep & Dream merancang kenyamanan yang terasa lebih baik, dari malam hingga pagi.
          </p>
          <span>Istirahat lebih baik, dimulai dari sini.</span>
        </div>
      </div>
    </section>
  );
}
