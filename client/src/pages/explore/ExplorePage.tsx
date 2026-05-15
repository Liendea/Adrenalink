import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ExploreNav from "@/components/navigation/tabNav/ExploreNav";
import Card from "@/components/cards/Card";
import DiscoveryMap from "@/components/map/DiscoveryMap";
import "./ExplorePage.scss";
import type { Lesson } from "@/types/types";
import useExploreSearch from "@/hooks/useExploreSearch";

type ExploreTab = "activities" | "schools" | "rentals";

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as ExploreTab) ?? "activities";
  const [mapVisible, setMapVisible] = useState(false);

  const rawCountry = searchParams.get("country");
  const countryParam = rawCountry === "Where?" ? null : rawCountry;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const handleTabChange = (tab: ExploreTab) => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });
  };

  const { activities, schools, loading, error } = useExploreSearch({
    country: countryParam,
    startDate,
    endDate,
  });

  const renderCards = () => {
    if (activeTab === "activities") {
      if (loading) return <p>Laddar aktiviteter...</p>;
      if (error) return <p>Ett fel uppstod: {error}</p>;
      if (activities.length === 0) return <p>No activities found.</p>;

      return (
        <div className="grid">
          {activities.map((item) =>
            // Rendera bara om lesson faktiskt finns
            item.lesson ? (
              <div key={item.id}>
                <Card variant="lesson" data={item.lesson} />
              </div>
            ) : null,
          )}
        </div>
      );
    }

    if (activeTab === "schools") {
      if (loading) return <p>Laddar skolor...</p>;
      if (error) return <p>Ett fel uppstod: {error}</p>;
      if (schools.length === 0) return <p>No schools found.</p>;

      return (
        <div className="grid">
          {schools.map((school) => (
            <div key={school.id}>
              <Card variant="school" data={school} />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "rentals") {
      return <p>Rentals kommer snart.</p>;
    }
  };

  const renderMap = () => {
    if (activeTab === "activities") {
      const lessons = activities
        .map((slot) => slot.lesson)
        .filter((lesson): lesson is Lesson => lesson != null);

      return (
        <DiscoveryMap
          variant="activities"
          items={lessons}
          country={countryParam ?? undefined}
        />
      );
    }

    if (activeTab === "schools") {
      // Säkerställ att items alltid är en array, även om schools skulle vara null
      return (
        <DiscoveryMap
          variant="schools"
          items={schools ?? []}
          country={countryParam ?? undefined}
        />
      );
    }

    return (
      <div className="explore__map-placeholder">
        <p>Map coming soon</p>
      </div>
    );
  };

  const resultCount =
    activeTab === "activities"
      ? activities.length
      : activeTab === "schools"
        ? schools.length
        : 0;

  return (
    <section className="explore">
      <ExploreNav activeTab={activeTab} onTabChange={handleTabChange} />
      <h2 className="explore__title">{resultCount} results found</h2>
      <div className="explore__split">
        {/* Toggle-knapp – utanför kartan */}
        <button
          className="explore__map-toggle"
          onClick={() => setMapVisible((prev) => !prev)}
        >
          {mapVisible ? "‹ List view" : "Show map"}
        </button>

        <div
          className={`explore__map ${mapVisible ? "explore__map--visible" : ""}`}
        >
          {renderMap()}
        </div>
        <div className="explore__cards">{renderCards()}</div>
      </div>
    </section>
  );
}
