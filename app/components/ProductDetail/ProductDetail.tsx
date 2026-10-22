"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "../Footer/Footer";
import styles from "./ProductDetail.module.css";

type Detail = { title?: string; content?: string };
type Product = {
  name?: string; slug?: string; description?: string; images?: string[]; price?: number;
  variants?: { name?: string; sizes?: { name?: string; price?: number; stock?: number }[] }[];
  website?: { comfort?: string; material?: string; highlights?: string[]; details?: Detail[] };
};

const money = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const faqs = [
  ["Apa yang membuat Cloud One nyaman?", "Lapisan comfort foam, pocket spring, dan breathable knit bekerja bersama untuk rasa lembut dengan dukungan yang stabil."],
  ["Cocok untuk posisi tidur apa?", "Cloud One nyaman untuk tidur telentang, menyamping, dan tengkurap dengan pilihan tingkat kenyamanan medium soft."],
  ["Apakah tersedia layanan pengiriman?", "Ya. Tim kami akan mengatur jadwal pengiriman setelah pesanan dikonfirmasi."],
  ["Bagaimana garansi produknya?", "Kasur Sleep n Dream dilengkapi garansi resmi sesuai ketentuan produk."],
];
const accessories = [
  ["Cloud Pillow", "/images/featured-pillows.jpg", "Rp 499.000"],
  ["Sprei Everyday", "/images/featured-bedding.jpg", "Rp 699.000"],
  ["Bed Frame Haven", "/images/featured-bed-frame.jpg", "Rp 4.999.000"],
];

function StarRating() { return <span className={styles.stars} aria-label="4.9 dari 5 bintang">★★★★★ <b>4.9</b> <small>(128 ulasan)</small></span>; }
function Check() { return <span className={styles.check}>✓</span>; }

export default function ProductDetail({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [added, setAdded] = useState(false);
  const images = product.images?.length ? product.images : ["/images/hero/hero-sleepndream.png"];
  const variants = product.variants?.length ? product.variants : [{ name: "Kasur saja", sizes: [{ name: "Queen", price: product.price ?? 4299000, stock: 8 }] }];
  const selectedVariant = variants[variantIndex] ?? variants[0];
  const sizes = selectedVariant.sizes?.length ? selectedVariant.sizes : [{ name: "Queen", price: product.price ?? 4299000, stock: 8 }];
  const selectedSize = sizes[Math.min(sizeIndex, sizes.length - 1)] ?? sizes[0];
  const price = selectedSize.price ?? product.price ?? 0;
  const details = useMemo(() => product.website?.details?.length ? product.website.details : [
    { title: "Product overview", content: product.description },
    { title: "Size information", content: "Tersedia dalam Single, Super Single, Queen, dan King. Ukuran akhir dapat sedikit berbeda sesuai koleksi." },
    { title: "Care instructions", content: "Putar kasur setiap tiga bulan, jaga permukaan tetap kering, dan gunakan pelindung kasur yang breathable." },
    { title: "Shipping & returns", content: "Pengiriman terjadwal tersedia di area tertentu. Hubungi tim kami untuk bantuan pengiriman dan layanan purnajual." },
  ], [product.description, product.website?.details]);

  function pickVariant(index: number) { setVariantIndex(index); setSizeIndex(0); }
  return (
    <main className={styles.page}>
      <div className={`${styles.container} ${styles.breadcrumb}`}><Link href="/">Home</Link><span>/</span><Link href="/products">Kasur</Link><span>/</span><strong>{product.name}</strong></div>
      <section className={`${styles.container} ${styles.hero}`}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}><Image src={images[imageIndex]} alt={product.name ?? "Produk Sleep n Dream"} fill priority sizes="(max-width: 900px) 100vw, 55vw" /></div>
          <div className={styles.thumbnails}>{images.map((image, index) => <button key={image} className={index === imageIndex ? styles.thumbActive : ""} onClick={() => setImageIndex(index)} aria-label={`Lihat gambar ${index + 1}`}><Image src={image} alt="" fill sizes="120px" /></button>)}</div>
          <div className={styles.galleryNote}><span>◉</span> Gambar produk dapat digeser untuk melihat detail</div>
        </div>
        <div className={styles.summary}>
          <p className={styles.eyebrow}>SLEEP N DREAM / CLOUD COLLECTION · MEDIUM SOFT</p>
          <h1>{product.name}</h1><StarRating />
          <p className={styles.description}>{product.description}</p>
          <div className={styles.priceRow}><strong>{money.format(price)}</strong><span>termasuk PPN</span></div>
          <div className={styles.divider} />
          <div className={styles.optionGroup}><div className={styles.optionLabel}>Pilih paket <b>{selectedVariant.name}</b></div><div className={styles.options}>{variants.map((variant, index) => <button key={variant.name} className={index === variantIndex ? styles.optionActive : ""} onClick={() => pickVariant(index)}>{variant.name}</button>)}</div></div>
          <div className={styles.optionGroup}><div className={styles.optionLabel}>Pilih ukuran <b>{selectedSize.name}</b></div><div className={styles.options}>{sizes.map((size, index) => <button key={size.name} className={index === sizeIndex ? styles.optionActive : ""} onClick={() => setSizeIndex(index)}>{size.name}</button>)}</div></div>
          <div className={styles.benefitList}><p><Check />Gratis pengiriman untuk area terpilih</p><p><Check />Garansi resmi Sleep n Dream</p><p><Check />Konsultasi tidur dengan tim kami</p></div>
          <div className={styles.purchase}><div className={styles.quantity}><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div><button className={styles.addButton} onClick={() => setAdded(true)}>{added ? "Ditambahkan ke keranjang ✓" : "Tambah ke keranjang"}</button></div>
          <button className={styles.buyButton}>Beli sekarang</button>
          <div className={styles.assurances}><span>🛡️ Pembayaran aman</span><span>↗ Pengiriman terjadwal</span><span>♡ Dukungan purnajual</span></div>
        </div>
      </section>
      <section className={`${styles.container} ${styles.quickFacts}`}><div><span>Comfort feel</span><b>{product.website?.comfort ?? "Medium Soft"}</b></div><div><span>Material</span><b>{product.website?.material ?? "Hybrid Foam & Pocket Spring"}</b></div><div><span>Ideal untuk</span><b>Istirahat setiap hari</b></div><div><span>Garansi</span><b>Hingga 10 tahun</b></div></section>`n      <section className={`${styles.container} ${styles.deliveryBanner}`}><Image src="/images/logo/logo-sleepndream-navy.png" alt="Sleep n Dream" width={120} height={42} /><p><b>Pesan sekarang, tidur nyaman lebih cepat.</b><span>Pengiriman terjadwal dan konsultasi produk dari tim Sleep n Dream.</span></p><button>Lebih lanjut</button></section>
      <section className={`${styles.container} ${styles.information}`}><div className={styles.infoLead}><p className={styles.eyebrow}>DIRANCANG UNTUK TIDUR LEBIH BAIK</p><h2>Setiap lapisan dibuat untuk mendukung istirahatmu.</h2><p>{product.website?.highlights?.[0] ?? "Rasa nyaman yang menyambut tubuh, dari malam hingga pagi."}</p></div><div className={styles.accordions}>{details.map((detail, index) => <details key={detail.title} open={index === 0}><summary>{detail.title}<span>+</span></summary><p>{detail.content}</p></details>)}</div></section>
      <section className={styles.specSection}><div className={styles.container}><div className={styles.specTitle}><p className={styles.eyebrow}>SPESIFIKASI PRODUK</p><h2>Spesifikasi Produk</h2></div><div className={styles.specGrid}><div className={styles.specList}>{["Knit fabric yang lembut dan breathable", "Comfort foam untuk pressure relief", "Adaptive support foam", "Pocket spring untuk dukungan stabil"].map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b><i>+</i></div>)}</div><div className={styles.mattressArt}><span className={styles.layer1}/><span className={styles.layer2}/><span className={styles.layer3}/><span className={styles.layer4}/><span className={styles.layer5}/><strong>Cloud<br/>One</strong></div></div></div></section>
      <section className={`${styles.container} ${styles.compare}`}><div className={styles.centerHead}><p className={styles.eyebrow}>BANDINGKAN PRODUK SERUPA</p><h2>Komparasi Produk Serupa</h2></div><div className={styles.compareCards}>{["Cloud One", "Cloud Plus"].map((name, index) => <article key={name}><div className={styles.compareImage}><Image src={images[index % images.length]} alt={name} fill sizes="(max-width: 700px) 100vw, 45vw" /></div><h3>{name}</h3><StarRating /><p>{index ? "Dukungan lebih kokoh untuk tidur yang lebih stabil." : "Lembut, seimbang, dan mudah disukai."}</p><button>Pilih {name}</button></article>)}</div><div className={styles.metricGrid}>{[["Medium-Soft", "Rasa nyaman"], ["Ergonomic Support", "Dukungan tubuh"], ["Cooling & Breathability", "Sirkulasi udara"], ["11\"", "Tinggi kasur"], ["4", "Lapisan utama"]].map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div></section>
      <section className={`${styles.container} ${styles.faq}`}><div className={styles.faqIntro}><p className={styles.eyebrow}>PERTANYAAN TERKAIT</p><h2>Pertanyaan Terkait</h2><p>Temukan jawaban untuk hal yang paling sering ditanyakan sebelum memilih kasurmu.</p></div><div className={styles.faqList}>{faqs.map(([question, answer], index) => <article key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<span>{openFaq === index ? "−" : "+"}</span></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>
      <section className={styles.accessories}><div className={styles.container}><div className={styles.addOnHead}><div><p className={styles.eyebrow}>AKSESORI PILIHAN UNTUKMU</p><h2>Aksesori pilihan untukmu</h2></div><Link href="/accessories">Lihat semua</Link></div><div className={styles.accessoryGrid}>{accessories.map(([name, image, price]) => <article key={name}><div className={styles.accessoryImage}><Image src={image} alt={name} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><h3>{name}</h3><p>{price}</p><button>Tambah</button></article>)}</div></div></section>
      <section className={styles.reviews}><div className={styles.container}><div className={styles.centerHead}><p className={styles.eyebrow}>RATINGS & REVIEWS</p><h2>Ratings & Reviews</h2></div><div className={styles.reviewSummary}><div><strong>4.9</strong><StarRating /><p>Dari 128 ulasan pelanggan</p></div><div className={styles.bars}>{[95, 4, 1].map((width, index) => <p key={width}><span>{5-index} ★</span><i><b style={{ width: `${width}%` }}/></i><em>{width}%</em></p>)}</div><button>Tulis ulasan</button></div><div className={styles.reviewList}>{["Kasurnya nyaman dari malam pertama.", "Rasanya empuk tapi tetap menopang pinggang.", "Pengiriman rapi dan timnya sangat membantu."].map((review, index) => <article key={review}><StarRating /><p>“{review}”</p><span>{["Nadia P.", "Rama S.", "Dina A."][index]} · Pembelian terverifikasi</span></article>)}</div></div></section>
      <Footer />
    </main>
  );
}


