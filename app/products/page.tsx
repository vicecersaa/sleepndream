import RecommendedMattresses from "../components/RecommendedMattresses/RecommendedMattresses";
import Footer from "../components/Footer/Footer";

export default function ProductsPage() {
  return <><main><section className="section" style={{ paddingBottom: 0 }}><div className="container-main"><p style={{ margin: 0, color: "var(--color-orange)", fontSize: 12, fontWeight: 800, letterSpacing: ".12em" }}>KOLEKSI KASUR</p><h1 style={{ marginTop: 14, maxWidth: 680 }}>Temukan kasur yang tepat untuk tidur Anda.</h1><p style={{ marginTop: 18, maxWidth: 620, color: "var(--color-blue)" }}>Pilih dukungan dan kenyamanan yang sesuai dengan kebutuhan istirahat Anda.</p></div></section><RecommendedMattresses /></main><Footer /></>;
}
