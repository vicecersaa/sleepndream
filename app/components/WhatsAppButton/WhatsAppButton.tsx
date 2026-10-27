import styles from "./WhatsAppButton.module.css";

const WHATSAPP_URL = "https://wa.me/628170150815";

export default function WhatsAppButton() {
  return <a className={styles.button} href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat Sleep N Dream via WhatsApp">
    <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M26.9 4.9A15.2 15.2 0 0 0 2.7 23L1 30.9l8.1-1.7A15.1 15.1 0 0 0 16 30.8h.1A15.2 15.2 0 0 0 26.9 4.9ZM16.1 28.2h-.1a12.6 12.6 0 0 1-6.4-1.7l-.5-.3-4.8 1 1-4.7-.3-.5A12.6 12.6 0 1 1 16.1 28.2Zm6.9-9.4c-.4-.2-2.5-1.2-2.9-1.3s-.7-.2-1 .2-1.1 1.3-1.3 1.6-.5.3-.9.1a10.3 10.3 0 0 1-3-1.9 11.4 11.4 0 0 1-2.1-2.6c-.2-.4 0-.6.1-.8l.7-.8c.2-.3.3-.5.4-.8s0-.6-.1-.8l-1.3-3c-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.8.1-1.2.6s-1.6 1.5-1.6 3.8 1.7 4.5 1.9 4.8 3.3 5 8 7c1.1.5 2 .8 2.7 1 .9.3 1.8.2 2.4.1.7-.1 2.5-1 2.8-2s.4-1.9.3-2.1-.4-.3-.8-.5Z" /></svg>
    <span>WhatsApp</span>
  </a>;
}
