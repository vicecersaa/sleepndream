"use client";

import type { FormEvent } from "react";
import styles from "./Footer.module.css";

export default function FooterNewsletter({ whatsappUrl }: { whatsappUrl: string }) {
  function requestSubscription(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (typeof email !== "string") return;

    const url = new URL(whatsappUrl);
    url.searchParams.set("text", "Halo Sleep & Dream, saya setuju menerima promo dan kabar terbaru melalui email " + email.trim() + ".");
    window.location.assign(url.toString());
  }

  return (
    <form onSubmit={requestSubscription}>
      <div className={styles.signupRow}>
        <label className={styles.srOnly} htmlFor="footer-email">Alamat email</label>
        <input id="footer-email" name="email" type="email" autoComplete="email" placeholder="Masukkan alamat email" required />
        <button type="submit" aria-label="Daftar newsletter melalui WhatsApp">Daftar</button>
      </div>
      <label className={styles.consent}>
        <input type="checkbox" required />
        <span>Saya setuju menerima promo dan kabar terbaru dari Sleep &amp; Dream.</span>
      </label>
    </form>
  );
}
