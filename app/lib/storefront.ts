export type ProductSize = { name: string; sku: string; price: number; stock: number; isActive?: boolean };
export type ProductOption = { name: string; sizes: ProductSize[]; isActive?: boolean };
export type StoreProduct = { _id: string; name: string; slug: string; description: string; thumbnail: string; images: string[]; minPrice: number; maxPrice: number; totalStock: number; category?: { name: string; slug: string }; website?: { line?: string; comfort?: string; material?: string; badge?: string; hoverImage?: string; highlights?: string[]; details?: { sizeTitle?: string; sizeContent?: string; careTitle?: string; careContent?: string; shippingTitle?: string; shippingContent?: string } }; variants: ProductOption[] };
export type StoreCategory = { _id: string; name: string; slug: string; description?: string; image?: string };
type ProductResponse = { items: StoreProduct[]; pagination: { totalItems: number } };
type ApiEnvelope<T> = { success: boolean; data: T };
const apiBase = process.env.SLEEPNDREAM_API_ORIGIN ? `${process.env.SLEEPNDREAM_API_ORIGIN.replace(/\/$/, '')}/api/v1` : 'http://127.0.0.1:5001/api/v1';

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiBase}${path}`, { next: { revalidate: 60 }, headers: { Accept: 'application/json' } });
    if (!response.ok) return null;
    const payload = (await response.json()) as ApiEnvelope<T> | T;
    if (typeof payload === 'object' && payload !== null && 'data' in payload) {
      return (payload as ApiEnvelope<T>).data;
    }
    return payload as T;
  } catch { return null; }
}

export async function getProducts(limit = 12, category?: string) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (category) params.set('category', category);
  return (await get<ProductResponse>(`/products?${params}`)) ?? { items: [], pagination: { totalItems: 0 } };
}
export async function getFeaturedProducts() { return (await get<StoreProduct[]>('/products/featured')) ?? []; }
export async function getCategories() { return (await get<StoreCategory[]>('/categories')) ?? []; }
export async function getProduct(slug: string) { return get<StoreProduct>(`/products/${encodeURIComponent(slug)}`); }
export function formatRupiah(value: number) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value); }
export function productPrice(product: StoreProduct) { return product.minPrice === product.maxPrice ? formatRupiah(product.minPrice) : `${formatRupiah(product.minPrice)} – ${formatRupiah(product.maxPrice)}`; }
