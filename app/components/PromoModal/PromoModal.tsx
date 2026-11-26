"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import promoArtwork from "../../../public/images/hero/hero-sleepndream.png";
import styles from "./PromoModal.module.css";

export const PROMO_DIALOG_ID = "sleepndream-promo";
const PROMO_STORAGE_KEY = "sleepndream-promo-dismissed-v1";

export default function PromoModal() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    if (pathname !== "/") {
      if (modal.open) modal.close();
      return;
    }

    try {
      if (!modal.open && !window.localStorage.getItem(PROMO_STORAGE_KEY)) modal.showModal();
    } catch {
      // The promo remains available from the navigation if storage is unavailable.
    }
  }, [pathname]);

  function dismiss() {
    try {
      window.localStorage.setItem(PROMO_STORAGE_KEY, "true");
    } catch {
      // Closing the dialog still works when storage is unavailable.
    }
  }

  return (
    <dialog
      id={PROMO_DIALOG_ID}
      className={styles.modal}
      ref={dialog}
      aria-label="Promo Sleep & Dream"
      onClose={dismiss}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <button className={styles.close} type="button" aria-label="Tutup promo" onClick={() => dialog.current?.close()}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" width="20" height="20">
          <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <Link href="/products/cloud-one" className={styles.imageLink} aria-label="Lihat promo Cloud One"
        onClick={() => dialog.current?.close()}
      >
        <Image src={promoArtwork} alt="" sizes="(max-width: 700px) 100vw, 960px" />
      </Link>
    </dialog>
  );
}
