import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useActivitySearch from "@/hooks/useActivitySearch";
import useSchoolSearch from "@/hooks/useSchoolSearch";
import ExploreNav from "@/components/navigation/ExploreNav";
import Card from "@/components/cards/Card";
import "./ExplorePage.scss";

type ExploreTab = "activities" | "schools" | "rentals";

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<ExploreTab>("activities");

  const countryParam = searchParams.get("country");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // Activities – alltid hämtad (initial)
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

  // Schools – lazy, hämtas bara när tabben aktiveras
  const {
    schools,
    loading: schoolsLoading,
    error: schoolsError,
  } = useSchoolSearch({
    country: countryParam,
    enabled: activeTab === "schools",
  });

  // visa aktiviteter
  const renderContent = () => {
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

    // visa skolor
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

  // antal resultat som visas
  const resultCount =
    activeTab === "activities"
      ? activities.length
      : activeTab === "schools"
        ? schools.length
        : 0;

  return (
    <section className="explore">
      <ExploreNav activeTab={activeTab} onTabChange={setActiveTab} />
      <h2 className="explore__title">{resultCount} results found</h2>
      {renderContent()}
    </section>
  );
}
