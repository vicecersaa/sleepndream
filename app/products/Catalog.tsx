"use client";

import Link from "next/link";
import { ProductCard, PRODUCTS } from "../components/RecommendedMattresses/RecommendedMattresses";
import styles from "./Catalog.module.css";

const SERIES = [{ value: "chiro", label: "Chiro Series" }, { value: "econo", label: "Econo Series" }];
const MATERIALS = ["Springbed", "Hybrid", "Busa"];
const COMFORTS = ["Soft", "Soft Medium", "Medium", "Medium Firm", "Firm", "Extra Firm"];

type Filters = { series: string; material: string; comfort: string; query: string };

function catalogUrl({ series, material, comfort, query }: Filters) {
  const params = new URLSearchParams();
  if (series) params.set("series", series);
  if (material) params.set("material", material);
  if (comfort) params.set("comfort", comfort);
  if (query) params.set("q", query);
  const search = params.toString();
  return search ? "/products?" + search : "/products";
}

function FilterDropdown({ name, options, field, filters }: {
  name: string;
  options: string[];
  field: "material" | "comfort";
  filters: Filters;
}) {
  const selected = filters[field];

  return <details className={styles.dropdown} name="catalog-filter"
    onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
    }}
    onKeyDown={(event) => {
      if (event.key === "Escape" && event.currentTarget.open) {
        event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }
    }}
  >
    <summary className={styles.trigger}>
      {selected ? name + ": " + selected : name}
      <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </summary>
    <ul className={styles.options}>
      {["", ...options].map((value) => <li key={value}>
        <Link href={catalogUrl({ ...filters, [field]: value })}
          aria-current={selected === value ? "true" : undefined}
          onClick={(event) => {
            const details = event.currentTarget.closest("details");
            if (details) {
              details.open = false;
              details.querySelector("summary")?.focus();
            }
          }}
        >{value || "Semua " + name.toLowerCase()}</Link>
      </li>)}
    </ul>
  </details>;
}

export default function Catalog({ series, material, comfort, query }: Filters) {
  const filters = {
    series: SERIES.some((entry) => entry.value === series) ? series : "",
    material: MATERIALS.includes(material) ? material : "",
    comfort: COMFORTS.includes(comfort) ? comfort : "",
    query: query.trim(),
  };
  const search = filters.query.toLocaleLowerCase("id");
  const items = PRODUCTS.filter((product) =>
    (!filters.material || filters.material === product.category) &&
    (!filters.comfort || filters.comfort === product.comfort) &&
    (!search || [product.name, product.category, product.description].some((text) => text.toLocaleLowerCase("id").includes(search))),
  );
  const sections = SERIES.filter((entry) => !filters.series || entry.value === filters.series);
  const hasResults = sections.some((entry) => items.some((product) => product.series === entry.value));

  return <main className={styles.catalog}>
    <nav className={styles.toolbar} aria-label="Koleksi dan filter kasur">
      <div className={"container-main " + styles.controls}>
        <div className={styles.series}>
          <Link href={catalogUrl({ ...filters, series: "" })} className={styles.collection}>Koleksi Sleep &amp; Dream</Link>
          {SERIES.map((entry) => (
            <Link className={styles.pill} key={entry.value}
              href={catalogUrl({ ...filters, series: entry.value })}
              data-active={entry.value === (filters.series || "chiro")}
              aria-current={entry.value === filters.series ? "page" : undefined}
            >{entry.label}</Link>
          ))}
        </div>
        <div className={styles.filters}>
          <span className={styles.filterLabel}>Filter</span>
          <FilterDropdown name="Material" options={MATERIALS} field="material" filters={filters} />
          <FilterDropdown name="Kenyamanan" options={COMFORTS} field="comfort" filters={filters} />
        </div>
      </div>
    </nav>
    <div className={"container-main " + styles.results}>
      <h1 className={styles.srOnly}>Koleksi kasur Sleep &amp; Dream</h1>
      {filters.query && <p className={styles.search}>Hasil pencarian: {filters.query} <Link href={catalogUrl({ ...filters, query: "" })}>Hapus pencarian</Link></p>}
      {hasResults ? sections.map((entry) => {
        const products = items.filter((product) => product.series === entry.value);
        if (!products.length) return null;
        return <section key={entry.value} aria-labelledby={entry.value} className={styles.seriesSection}>
          <h2 id={entry.value}>Koleksi <strong>{entry.label}</strong></h2>
          <div className={styles.grid}>
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>;
      }) : <div className={styles.empty}>
        <h2>Kasur yang cocok belum ditemukan</h2>
        <p>Coba ganti seri, material, atau tingkat kenyamanannya.</p>
        <Link href="/products">Lihat semua kasur</Link>
      </div>}
    </div>
  </main>;
}
