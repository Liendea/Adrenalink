import "./Landingpage.scss";
import Searchbar from "@/components/searchbar/Searchbar";

// ─── Icons ────────────────────────────────────────────────────────────────────

import Hero from "@/components/hero/Hero";
import Navigation from "@/components/navigation/Navigation";

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Background */}
      <div className="landing__bg" />
      <div className="landing__overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="hero-section">
        <Hero />
        <Searchbar />
      </section>
    </div>
  );
}
