import { notFound } from "next/navigation";
import ProductDetail from "../../components/ProductDetail/ProductDetail";

const API_BASE = process.env.SLEEPNDREAM_API_ORIGIN || "https://sleepndream-api.vicecersaa.workers.dev/api/v1";

type ApiProduct = {
  name?: string;
  slug?: string;
  description?: string;
  images?: string[];
  featuredImage?: string;
  price?: number;
  variants?: { name?: string; sizes?: { name?: string; price?: number; stock?: number }[] }[];
  website?: { comfort?: string; material?: string; highlights?: string[]; details?: { title?: string; content?: string }[] };
};

const fallbackProduct = {
  name: "Cloud One",
  slug: "cloud-one",
  description: "Kasur hybrid dengan permukaan lembut, dukungan seimbang, dan sirkulasi udara yang nyaman untuk istirahat setiap malam.",
  price: 4299000,
  images: [
    "/images/hero/hero-sleepndream.png",
    "/images/quality-blue-bedroom.jpg",
    "/images/featured-mattress.jpg",
    "/images/featured-bedroom-set.jpg",
  ],
  variants: [
    { name: "Kasur saja", sizes: [{ name: "Single", price: 4299000, stock: 12 }, { name: "Super Single", price: 4899000, stock: 8 }, { name: "Queen", price: 6299000, stock: 6 }, { name: "King", price: 7499000, stock: 4 }] },
    { name: "Set kasur", sizes: [{ name: "Single", price: 5399000, stock: 5 }, { name: "Super Single", price: 5999000, stock: 4 }, { name: "Queen", price: 7399000, stock: 4 }, { name: "King", price: 8599000, stock: 2 }] },
  ],
  website: {
    comfort: "Medium Soft",
    material: "Hybrid foam & pocket spring",
    highlights: ["Pressure relief yang mengikuti bentuk tubuh", "Dukungan stabil untuk tidur lebih nyenyak", "Kain knit lembut dengan sirkulasi udara baik"],
  },
};

async function getProduct(slug: string): Promise<ApiProduct> {
  try {
    const response = await fetch(`${API_BASE}/products/${slug}`, { next: { revalidate: 120 } });
    if (!response.ok) return fallbackProduct;
    const payload = await response.json();
    return payload.data ?? payload;
  } catch {
    return fallbackProduct;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) notFound();
  const product = await getProduct(slug);
  return <ProductDetail product={{ ...fallbackProduct, ...product, images: product.images?.length ? product.images : fallbackProduct.images }} />;
}
