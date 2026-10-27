"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./AuthForm.module.css";

type CredentialResponse = { credential: string };

declare global {
  interface Window {
    google?: { accounts: { id: {
      initialize: (options: { client_id: string; callback: (response: CredentialResponse) => void }) => void;
      renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
    } } };
  }
}

const AUTH_API = "/api/v1/auth";

function loadGoogle() {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.accounts.id) return resolve();
    const prior = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');
    if (prior) {
      prior.addEventListener("load", () => resolve(), { once: true });
      prior.addEventListener("error", () => reject(new Error("Google Sign-In tidak dapat dimuat.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Sign-In tidak dapat dimuat."));
    document.head.appendChild(script);
  });
}

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const isLogin = mode === "login";

  const complete = () => {
    window.dispatchEvent(new Event("sleepndream-auth-changed"));
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    if (!clientId || !buttonRef.current) return;
    let cancelled = false;
    void loadGoogle().then(() => {
      if (cancelled || !buttonRef.current || !window.google?.accounts.id) return;
      buttonRef.current.replaceChildren();
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          setBusy(true); setMessage("");
          try {
            const response = await fetch(`${AUTH_API}/google`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ credential }) });
            const body = await response.json().catch(() => null);
            if (!response.ok) throw new Error(body?.message || "Login Google gagal.");
            complete();
          } catch (error) { setMessage(error instanceof Error ? error.message : "Login Google gagal."); } finally { setBusy(false); }
        },
      });
      window.google.accounts.id.renderButton(buttonRef.current, { theme: "outline", size: "large", type: "standard", text: isLogin ? "signin_with" : "signup_with", shape: "rectangular", logo_alignment: "left", width: Math.min(400, buttonRef.current.clientWidth), locale: "id" });
    }).catch((error: unknown) => !cancelled && setMessage(error instanceof Error ? error.message : "Google Sign-In tidak tersedia."));
    return () => { cancelled = true; };
  }, [clientId, isLogin]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!isLogin && password !== confirmation) { setMessage("Konfirmasi kata sandi belum sama."); return; }
    setBusy(true);
    try {
      const response = await fetch(`${AUTH_API}/${isLogin ? "login" : "register"}`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim(), password }) });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.message || "Tidak dapat memproses permintaan.");
      complete();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Tidak dapat terhubung ke server."); } finally { setBusy(false); }
  }

  return <main className={styles.page}><section className={styles.shell}><aside className={styles.story}><p className={styles.eyebrow}>SLEEP N DREAM</p><h1>Bangun dengan rasa yang lebih baik.</h1><p>Masuk untuk menyimpan pesanan, alamat pengiriman, dan pilihan tidur Anda.</p><span>Better sleep, better mornings.</span></aside><section className={styles.formPanel}><p className={styles.eyebrow}>{isLogin ? "SELAMAT DATANG KEMBALI" : "BUAT AKUN"}</p><h2>{isLogin ? "Masuk ke akun Anda" : "Mulai perjalanan tidur Anda"}</h2><p className={styles.intro}>{isLogin ? "Lanjutkan belanja dan lihat pesanan Anda." : "Buat akun untuk pengalaman belanja yang lebih personal."}</p>{message && <p className={styles.error} role="alert">{message}</p>}{clientId ? <div className={styles.google} ref={buttonRef} /> : <p className={styles.notice}>Login Google akan aktif setelah <code>NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> dipasang di frontend.</p>}<div className={styles.divider}>ATAU DENGAN EMAIL</div><form onSubmit={submit}><label>Email<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" /></label><label>Kata sandi<input type="password" required minLength={6} autoComplete={isLogin ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 6 karakter" /></label>{!isLogin && <label>Konfirmasi kata sandi<input type="password" required minLength={6} autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="Ulangi kata sandi" /></label>}<button className="btn btn-primary btn-full" disabled={busy}>{busy ? "Memproses..." : isLogin ? "Masuk" : "Buat akun"}</button></form><p className={styles.switch}>{isLogin ? "Belum punya akun?" : "Sudah punya akun?"} <Link href={isLogin ? "/register" : "/login"}>{isLogin ? "Daftar sekarang" : "Masuk"}</Link></p></section></section></main>;
}
