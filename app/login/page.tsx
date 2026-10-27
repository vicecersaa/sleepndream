import type { Metadata } from 'next'
import AuthForm from '@/app/components/AuthForm'
export const metadata: Metadata = { title: 'Masuk | Sleep & Dream' }
export default function LoginPage() { return <AuthForm mode="login" /> }
