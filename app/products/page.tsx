import Catalog from "./Catalog";

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const params = await searchParams;

  return <Catalog
    series={typeof params.series === "string" ? params.series : ""}
    material={typeof params.material === "string" ? params.material : ""}
    comfort={typeof params.comfort === "string" ? params.comfort : ""}
    query={typeof params.q === "string" ? params.q : ""}
  />;
}
