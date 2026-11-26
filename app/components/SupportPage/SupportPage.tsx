import Image from "next/image";
import styles from "./SupportPage.module.css";

const STEPS = [
  {
    title: "Gunakan Mattress Protector Sejak Hari Pertama",
    question: "Kapan sebaiknya mulai memakai mattress protector?",
    body: "Pasang pelindung kasur anti-air yang tetap memungkinkan sirkulasi udara sejak hari pertama untuk membantu mencegah noda dan kelembapan. Ikuti syarat garansi untuk model kasur Anda.",
  },
  {
    title: "Rotasi Kasur Secara Berkala",
    question: "Seberapa sering kasur perlu diputar?",
    body: "Putar posisi kepala ke kaki (180°) setiap 3 bulan pada tahun pertama, lalu setiap 6 bulan pada tahun berikutnya agar tekanan tubuh merata. Untuk kasur non-flip, cukup putar tanpa membaliknya.",
  },
  {
    title: "Jaga Sirkulasi Udara",
    question: "Bagaimana cara menjaga kasur tetap kering?",
    body: "Buka seprai selama 1–2 jam saat menggantinya agar udara bersirkulasi. Hindari menjemur kasur di bawah sinar matahari langsung karena panas dapat merusak busa.",
  },
  {
    title: "Gunakan Alas yang Kokoh & Rata",
    body: "Letakkan kasur di atas dipan yang kokoh dan rata. Jika memakai dipan berbilah, ikuti panduan jarak antarbilah untuk model kasur Anda. Jarak 5–7 cm membantu memberi topangan yang merata.",
  },
  {
    title: "Bersihkan dengan Aman",
    body: "Vakum permukaan kasur setiap 1–2 bulan. Jika terkena noda, serap cairan dengan kain kering tanpa menggosoknya. Bersihkan dengan kain lembap dan sabun lembut, lalu angin-anginkan sampai kering. Hindari pemutih dan pembersih uap.",
  },
];

const LOCATIONS = ["Mal Artha Gading, Jakarta Utara", "Green Lake City, Tangerang"];
const whatsapp = "https://wa.me/628170150815?text=" + encodeURIComponent(
  "Halo Sleep & Dream, saya ingin rekomendasi mattress protector.",
);

function ContactStrip() {
  return (
    <aside className={styles.contact} aria-label="Bantuan dan showroom">
      <div className={`container-main ${styles.contactGrid}`}>
        <a className={styles.whatsapp} href={whatsapp}>
          <svg aria-hidden="true" viewBox="0 0 32 32" fill="none">
            <path d="M6 24.5 4.5 29l5-1.6a12 12 0 1 0-3.5-2.9Z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M12.4 10.2c-.9-.7-2.7.6-2.1 2.7 1 3.9 4.3 7.1 8.2 8.1 2.2.5 3.4-1.2 2.7-2l-2.8-1.5c-.5-.3-.8-.1-1.2.5l-.6.8a9 9 0 0 1-4.3-4.2l.8-.6c.6-.4.8-.7.5-1.2l-1.2-2.6Z" fill="currentColor" />
          </svg>
          <span>Butuh rekomendasi mattress protector (tersedia ukuran custom hingga 3,2 meter)? <strong>Hubungi tim kami di sini.</strong></span>
        </a>
        <div className={styles.showrooms}>
          <p>Mau coba langsung kasur Sleep &amp; Dream?<br />Datang langsung ke showroom kami di</p>
          <ul>
            {LOCATIONS.map((location) => (
              <li key={location}>
                <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Sleep & Dream " + location)}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2a7 7 0 0 0-7 7c0 4.8 7 12 7 12s7-7.2 7-12a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>
                  {location}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default function SupportPage({ faq = false }: { faq?: boolean }) {
  return (
    <main className={styles.page}>
      <header className={styles.banner}>
        <h1>{faq ? "FAQ" : <><span>Panduan</span>Perawatan Kasur</>}</h1>
      </header>

      <div className="container-main">
        <div className={styles.row}>
          <div className={styles.copy}>
            <ol className={styles.steps}>
              {STEPS.slice(0, 3).map(({ title, question, body }) => (
                <li key={title}>
                  <h2>{faq ? question : title}</h2>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.photo}>
            <Image src="/images/hero/hero-sleepndream.png" alt="Kasur Sleep & Dream dalam kamar tidur" fill sizes="(max-width: 767px) 100vw, 50vw" />
          </div>
        </div>

        {!faq && <div className={`${styles.row} ${styles.alternate}`}>
          <div className={styles.copy}>
            <ol start={4} className={styles.steps}>
              {STEPS.slice(3).map(({ title, body }) => (
                <li key={title}><h2>{title}</h2><p>{body}</p></li>
              ))}
            </ol>
            <section className={styles.avoid}>
              <h2>Hal yang Harus Dihindari</h2>
              <ul>
                <li>Melompat atau berdiri di atas kasur.</li>
                <li>Menekuk atau melipat kasur secara paksa saat dipindahkan.</li>
                <li>Meletakkan benda panas seperti setrika atau laptop langsung di atas kasur.</li>
              </ul>
            </section>
          </div>
          <div className={styles.photo}>
            <Image src="/images/quality-blue-bedroom.jpg" alt="Kasur dengan alas yang menopang permukaan secara merata" fill sizes="(max-width: 767px) 100vw, 50vw" className={styles.bedroom} />
          </div>
        </div>}
      </div>

      <ContactStrip />
    </main>
  );
}
