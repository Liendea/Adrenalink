import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useActivitySearch from "@/hooks/useActivitySearch";
import useSchoolSearch from "@/hooks/useSchoolSearch";
import ExploreNav from "@/components/navigation/ExploreNav";
import Card from "@/components/cards/Card";
import DiscoveryMap from "@/components/map/DiscoveryMap";
import "./ExplorePage.scss";

type ExploreTab = "activities" | "schools" | "rentals";

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ExploreTab>("activities");
  const [mapVisible, setMapVisible] = useState(false);

  const rawCountry = searchParams.get("country");
  const countryParam = rawCountry === "Where?" ? null : rawCountry;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
  } = useActivitySearch({
    activeItem: countryParam
      ? { label: countryParam, type: "destination" }
      : null,
    selectedDates: { startDate, endDate },
  });

  const {
    schools,
    loading: schoolsLoading,
    error: schoolsError,
  } = useSchoolSearch({
    country: countryParam,
    enabled: activeTab === "schools",
  });

  const renderCards = () => {
    if (activeTab === "activities") {
      if (activitiesLoading) return <p>Laddar aktiviteter...</p>;
      if (activitiesError) return <p>Ett fel uppstod: {activitiesError}</p>;
      if (activities.length === 0) return <p>No activities found.</p>;

      return (
        <div className="grid">
          {activities.map((item) => (
            <div key={item.id}>
              <Card variant="lesson" data={item.lesson} />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "schools") {
      if (schoolsLoading) return <p>Laddar skolor...</p>;
      if (schoolsError) return <p>Ett fel uppstod: {schoolsError}</p>;
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
      // Deduplicera – samma lektion kan förekomma flera gånger via olika slots
      const lessonsMap = new Map(
        activities.map((slot) => [slot.lesson.id, slot.lesson]),
      );
      const lessons = Array.from(lessonsMap.values());
      return <DiscoveryMap variant="activities" items={lessons} />;
    }
    if (activeTab === "schools") {
      return <DiscoveryMap variant="schools" items={schools} />;
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
   
      <button
        className="explore__map-toggle"
        onClick={() => setMapVisible(true)}
      >
        Show map
      </button>
      <ExploreNav activeTab={activeTab} onTabChange={setActiveTab} />
      <h2 className="explore__title">{resultCount} results found</h2>
      <div className="explore__split">
        <div
          className={`explore__map ${mapVisible ? "explore__map--visible" : ""}`}
        >
          {mapVisible && (
            <button
              className="explore__map-close"
              onClick={() => setMapVisible(false)}
            >
              ‹ List view
            </button>
          )}
          {renderMap()}
        </div>
        <div className="explore__cards">{renderCards()}</div>
      </div>
    </section>
  );
}
