import type { Metadata } from "next";
import AuthForm from "../components/Auth/AuthForm";
export const metadata: Metadata = { title: "Buat Akun | Sleep N Dream" };
export default function RegisterPage() { return <AuthForm mode="register" />; }
