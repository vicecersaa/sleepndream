import type { Metadata } from "next";
import AuthForm from "../components/Auth/AuthForm";
export const metadata: Metadata = { title: "Masuk | Sleep N Dream" };
export default function LoginPage() { return <AuthForm mode="login" />; }
