import ProductHero from "../../components/ProductHero/ProductHero";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductHero slug={slug} />;
}
