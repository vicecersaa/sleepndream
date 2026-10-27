"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { addToCart } from "../../lib/cart";
import styles from "./ProductHero.module.css";

const images = [
  "/images/hero/hero-sleepndream.png",
  "/images/featured-mattress.jpg",
  "/images/quality-blue-bedroom.jpg",
  "/images/featured-bedroom-set.jpg",
  "/images/featured-pillows.jpg",
  "/images/featured-bed-frame.jpg",
];
const sizes = ["Single", "Super Single", "Queen", "King"];
const colors = ["#fbfaf4", "#cbd6c6", "#d8d1bd", "#9db8c8", "#d8ccb8", "#253f5a", "#f2ece1"];
const format = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
const products: Record<string, { name: string; type: string; description: string }> = {
  "cloud-one": { name: "Cloud One", type: "Kasur Busa Premium", description: "Kasur terpopuler kami dengan teknologi terbaru untuk kenyamanan ekstra dan sirkulasi udara yang baik." },
  harmony: { name: "Kasur Harmony", type: "Kasur Hybrid", description: "Permukaan lembut dengan dukungan nyaman untuk istirahat setiap malam." },
  serenity: { name: "Kasur Serenity", type: "Kasur Busa", description: "Kenyamanan seimbang dengan rasa empuk yang tetap menopang tubuh." },
  restore: { name: "Kasur Restore", type: "Kasur Springbed", description: "Dukungan lebih kokoh untuk menjaga posisi tidur tetap nyaman." },
  dream: { name: "Kasur Dream", type: "Kasur Busa", description: "Kenyamanan lembut dengan desain sederhana untuk kamar modern." },
  bloom: { name: "Kasur Bloom", type: "Kasur Hybrid", description: "Pilihan nyaman untuk melengkapi waktu istirahat seluruh keluarga." },
};

function Icon({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>; }

export default function ProductHero({ slug }: { slug: string }) {
  const product = products[slug] || products["cloud-one"];
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(0);
  const [model, setModel] = useState("Cloud One");
  const [size, setSize] = useState("Queen");
  const [upgrade, setUpgrade] = useState(true);
  const [insurance, setInsurance] = useState(false);
  const [added, setAdded] = useState(false);
  const price = useMemo(() => 19667704 + (model === "The One" ? -1380000 : 0) + (size === "King" ? 2300000 : size === "Single" ? -4600000 : 0) + (upgrade ? 3948000 : 0), [model, size, upgrade]);
  return <main className={styles.page}>
    <div className={styles.container}>
      <nav className={styles.crumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/products">Kasur</Link><span>›</span><b>{product.name}</b></nav>
      <div className={styles.layout}>
        <section className={styles.gallery} aria-label="Galeri produk">
          <div className={styles.heroImage}><Image src={images[activeImage]} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 55vw" /><span className={styles.report}>Sleep n Dream<br/><small>Comfort verified</small></span><button className={styles.share} aria-label="Bagikan produk">↗</button></div>
          <div className={styles.grid}>{images.slice(1).map((src, index) => <button type="button" key={src} onClick={() => setActiveImage(index + 1)} className={activeImage === index + 1 ? styles.selectedImage : ""}><Image src={src} alt={`${product.name} view ${index + 2}`} fill sizes="(max-width: 900px) 50vw, 28vw" /></button>)}</div>
        </section>
        <section className={styles.info}>
          <div className={styles.rating}><span>☆ ☆ ☆ ☆ ☆</span><b>4.8</b><i>({169})</i></div>
          <p className={styles.category}>Kasur</p><h1>{product.name}</h1><h2>{product.type}</h2>
          <div className={styles.price}><strong>{format(price)}</strong><em>HEMAT 20%</em></div><span className={styles.popular}>⌁ 85% pelanggan memilih tipe ini</span>
          <p className={styles.installment}>Mulai dari Rp1.638.328 / <b>bulan</b> atau bunga 0% dengan kartu kredit pilihan. <u>Cek Status Anda</u></p><hr />
          <div className={styles.features}><div><Icon><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" /></Icon><span>Cover<br/>Lembut</span></div><div><Icon><path d="M3 15h18M5 11c2-7 4 7 7 0s5 7 7 0" /></Icon><span>Busa<br/>Empuk</span></div></div>
          <p className={styles.label}>Pilihan warna</p><div className={styles.swatches}>{colors.map((value, index) => <button type="button" aria-label={`Warna ${index + 1}`} key={value} onClick={() => setColor(index)} className={color === index ? styles.swatchActive : ""} style={{ background: value }} />)}</div>
          <p className={styles.tagline}>A mattress made for better mornings.</p><p className={styles.copy}>{product.description}</p>
          <p className={styles.label}>Pilih model:</p><div className={styles.models}>{["The One", "Cloud One"].map(item => <button key={item} type="button" onClick={() => setModel(item)} className={model === item ? styles.modelActive : ""}><b>{item}</b>{item === "The One" && <small>Rekomendasi</small>}<span>{item === "The One" ? "Tiga lapisan busa yang nyaman dengan feel seimbang." : "Tiga lapisan busa yang nyaman dengan tekstur yang responsif."}</span></button>)}</div>
          <div className={styles.sectionLine}><p className={styles.label}>Pilih ukuran:</p><small>Jenis ukuran ⓘ</small></div><div className={styles.sizes}>{sizes.map(item => <button type="button" key={item} onClick={() => setSize(item)} className={size === item ? styles.sizeActive : ""}>{item}</button>)}</div>
          <div className={styles.upgrade}><div className={styles.sectionLine}><p className={styles.label}>Tingkatkan kasur:</p><small>Penawaran spesial ⓘ</small></div><label><input type="checkbox" checked={upgrade} onChange={event => setUpgrade(event.target.checked)} /><span />Aktifkan peningkatan <b>{format(3948000)}</b></label><div className={styles.bundle}><div><Image src="/images/featured-pillows.jpg" alt="Bantal" width={62} height={62}/><p>Original Pillow Double Pack<br/><small>Bantal lembut untuk tidur lebih nyaman.</small></p></div><strong>＋</strong><div><Image src="/images/featured-bedding.jpg" alt="Pelindung kasur" width={62} height={62}/><p>Breathable Mattress Protector<br/><small>Melindungi kasur dan mendukung sirkulasi udara.</small></p></div></div></div>
          <div className={styles.insurance}><label><input type="checkbox" checked={insurance} onChange={event => setInsurance(event.target.checked)} /> <b>Aktifkan asuransi pengiriman</b></label><p>Mencakup kerusakan akibat kecelakaan seperti noda, goresan, dan lainnya.</p><div><button>5 Tahun: <b>1,5 Juta</b></button><button>10 Tahun: <b>1,8 Juta</b></button></div></div>
          <p className={styles.stock}>▣ Stok tersedia, pengiriman 1–2 hari kerja | Gratis ongkir & pengembalian</p><div className={styles.total}><b>Subtotal: <strong>{format(price + (insurance ? 1500000 : 0))}</strong></b></div><div className="product-purchase-actions"><button className={styles.cart} onClick={() => { addToCart({ id: `${slug}-${model}-${size}`, name: product.name, variant: `${model} · ${size}`, price: price + (insurance ? 1500000 : 0), image: images[activeImage] }); setAdded(true); }}>{added ? "Ditambahkan ke keranjang ✓" : "Add to cart"}</button><Link href="/checkout" className="product-checkout">Checkout sekarang</Link></div><p className={styles.finance}>Cicilan tersedia mulai dari Rp54.000/bulan. Tidak perlu kartu kredit.</p>
          <div className={styles.benefits}><div>▱<b>Pengiriman gratis</b></div><div>☾<b>Uji coba 100 malam</b></div><div>◎<b>10 tahun garansi</b></div></div>
        </section>
      </div>
    </div>
  </main>;
}
