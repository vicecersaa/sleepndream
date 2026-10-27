import Link from 'next/link';
import { productPrice, type StoreProduct } from '@/app/lib/storefront';

export default function ProductCard({ product }: { product: StoreProduct }) {
  const image = product.website?.hoverImage || product.thumbnail || product.images?.[0];
  return <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg"><Link href={`/produk/${product.slug}`} className="block"><div className="aspect-[4/5] overflow-hidden bg-surface">{image ? <img src={image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-sm text-steel">Foto produk segera hadir</div>}</div><div className="p-5"><p className="text-label text-steel">{product.website?.line || product.category?.name || 'Sleep & Dream'}</p><h3 className="mt-2 text-heading text-lg text-navy">{product.name}</h3><p className="mt-2 text-sm font-semibold text-navy">{productPrice(product)}</p>{product.website?.comfort && <p className="mt-2 text-sm text-steel">Comfort: {product.website.comfort}</p>}</div></Link></article>;
}
