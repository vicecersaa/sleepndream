"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./PromoModal.module.css";

const PROMO_STORAGE_KEY = "sleepndream-promo-dismissed-v1";

export default function PromoModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setOpen(false);
      return;
    }

    setOpen(!window.localStorage.getItem(PROMO_STORAGE_KEY));
  }, [pathname]);

  function close() {
    window.localStorage.setItem(PROMO_STORAGE_KEY, "true");
    setOpen(false);
  }

  if (!open) return null;

  return <div className={styles.backdrop} role="presentation">
    <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="promo-title">
      <div className={styles.imageWrap}>
        <Image src="/images/hero/hero-sleepndream.png" alt="Cloud One Sleep & Dream" fill priority sizes="(max-width: 700px) 100vw, 640px" />
        <span>Promo Sleep &amp; Dream</span>
        <button type="button" onClick={close} aria-label="Tutup promo">×</button>
      </div>
      <div className={styles.content}>
        <h2 id="promo-title">Dapatkan Potongan 30%<br />Untuk Pembelian Pertama.</h2>
        <p className={styles.product}><b>Cloud One</b><i />Kasur Busa Premium</p>
        <p className={styles.copy}>Kenyamanan ekstra dengan teknologi RefinedCore+™ dan sirkulasi udara yang baik. Temukan promo Cloud One yang tersedia untuk Anda.</p>
        <Link href="/products/cloud-one" className={styles.cta} onClick={close}>Tanya Promo Cloud One</Link>
        <button type="button" className={styles.dismiss} onClick={close}>Nanti saja, saya ingin lanjut melihat</button>
      </div>
    </section>
  </div>;
}
