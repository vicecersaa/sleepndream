import type { Metadata } from 'next'
import AuthForm from '@/app/components/AuthForm'
export const metadata: Metadata = { title: 'Buat Akun | Sleep & Dream' }
export default function RegisterPage() { return <AuthForm mode="register" /> }
