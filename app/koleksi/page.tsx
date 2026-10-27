import Link from 'next/link';
import ProductCard from '@/app/components/ProductCard';
import { getCategories, getProducts } from '@/app/lib/storefront';

export const revalidate = 60;
export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const [catalog, categories] = await Promise.all([getProducts(48, category), getCategories()]);
  return <main className="min-h-screen bg-bg"><div className="container section"><p className="text-label text-amber">SLEEP & DREAM COLLECTION</p><h1 className="text-display mt-3 text-4xl text-navy">Temukan yang paling nyaman.</h1><p className="mt-4 max-w-2xl text-body text-steel">Pilih berdasarkan koleksi, lalu lihat pilihan ukuran dan konfigurasi yang tersedia di tiap produk.</p><nav className="mt-8 flex flex-wrap gap-2"><Link href="/koleksi" className={`rounded-full px-4 py-2 text-sm font-semibold ${!category ? 'bg-navy text-white' : 'bg-white text-navy'}`}>Semua</Link>{categories.map(item => <Link key={item._id} href={`/koleksi?category=${item.slug}`} className={`rounded-full px-4 py-2 text-sm font-semibold ${category === item.slug ? 'bg-navy text-white' : 'bg-white text-navy'}`}>{item.name}</Link>)}</nav><div className="mt-10"><p className="mb-5 text-sm text-steel">{catalog.pagination.totalItems} produk ditemukan</p>{catalog.items.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{catalog.items.map(product => <ProductCard key={product._id} product={product} />)}</div> : <div className="rounded-xl bg-white p-10 text-center text-steel">Belum ada produk pada koleksi ini.</div>}</div></div></main>;
}
