"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Footer from "../Footer/Footer";
import { CART_CHANGED_EVENT, type CartItem, readCart, writeCart } from "../../lib/cart";
import styles from "./CartPage.module.css";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const suggestions = [
  { name: "Fondasi Kasur", price: 2891000, image: "/images/featured-bed-frame.jpg", slug: "harmony" },
  { name: "Bantal Original", price: 1065000, image: "/images/featured-pillows.jpg", slug: "serenity" },
  { name: "Bantal Tidur Siang", price: 890000, image: "/images/featured-bedding.jpg", slug: "restore" },
];

function BagIcon() {
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 22h38l-3.6 29H16.6L13 22Z" /><path d="M23 24v-6a9 9 0 0 1 18 0v6" /><circle cx="43" cy="18" r="9" /></svg>;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    window.addEventListener(CART_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items]);
  const savings = Math.round(subtotal * 0.2);
  const total = subtotal - savings;

  function updateQuantity(id: string, delta: number) {
    const next = items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item);
    setItems(next);
    writeCart(next);
  }

  function removeItem(id: string) {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    writeCart(next);
  }

  return <>
    <main className={styles.page}>
      <div className={styles.container}>
        {items.length === 0 ? <section className={styles.empty}>
          <BagIcon />
          <h1>Keranjang Anda kosong</h1>
          <p>Temukan pilihan tidur yang nyaman untuk melengkapi malam Anda.</p>
          <Link href="/products" className={styles.primaryButton}>Lanjut belanja</Link>
        </section> : <>
          <h1 className={styles.title}>Keranjang</h1>
          <div className={styles.cartLayout}>
            <section className={styles.cartList} aria-label="Produk di keranjang">
              <div className={styles.tableHeader}><span>Produk</span><span>Kuantitas</span><span>Total</span></div>
              {items.map((item) => <article className={styles.item} key={item.id}>
                <div className={styles.itemInfo}><Image className={styles.itemImage} src={item.image} alt={item.name} width={108} height={108} /><h2>{item.name}</h2><p>{item.variant}</p><b>{formatPrice(item.price)}</b><button type="button" onClick={() => removeItem(item.id)}>Hapus</button></div>
                <div className={styles.quantity} aria-label={`Jumlah ${item.name}`}><button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label="Kurangi jumlah">−</button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label="Tambah jumlah">+</button></div>
                <strong className={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</strong>
              </article>)}
              <div className={styles.listFooter}><span>{items.reduce((amount, item) => amount + item.quantity, 0)} item</span><strong>Subtotal: {formatPrice(subtotal)}</strong></div>
            </section>
            <aside className={styles.summary}>
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Penghematan</span><strong className={styles.saving}>−{formatPrice(savings)}</strong></div>
              <div className={styles.summaryTotal}><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <p>Pajak dan ongkos kirim dihitung saat checkout.</p>
              <Link href="/checkout" className={styles.primaryButton}>Lanjut ke pembayaran</Link>
              <span className={styles.or}>atau bayar dengan</span>
              <button type="button" className={styles.shopPay}>Shop Pay</button>
              <button type="button" className={styles.paypal}>PayPal</button>
              <button type="button" className={styles.googlePay}>Google Pay</button>
            </aside>
          </div>
          <section className={styles.recommendations}><h2>Mungkin Anda suka</h2><div className={styles.recommendationGrid}>{suggestions.map((product) => <article key={product.name} className={styles.recommendation}><Image src={product.image} alt={product.name} width={360} height={190} /><span>Terlaris</span><h3>{product.name}</h3><p>{formatPrice(product.price)}</p><Link href={`/products/${product.slug}`}>Tambah ke Keranjang</Link></article>)}</div></section>
        </>}
      </div>
    </main>
    <Footer />
  </>;
}
