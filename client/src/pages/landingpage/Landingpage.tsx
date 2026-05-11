import "./Landingpage.scss";
import Searchbar from "@/components/searchbar/Searchbar";

// ─── Icons ────────────────────────────────────────────────────────────────────

import Hero from "@/pages/landingpage/components/hero/Hero";

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Background */}
      <div className="landing__bg" />
      <div className="landing__overlay" />

      {/* Hero */}
      <div className="hero-section">
        <Hero />
        <Searchbar />
      </div>
    </div>
  );
}
