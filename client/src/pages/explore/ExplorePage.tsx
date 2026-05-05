import useActivitySearch from "@/hooks/useActivitySearch";
import { useLocation } from "react-router-dom";
import "./ExplorePage.scss";
import Card from "@/components/cards/Card";

export default function ExplorePage() {
  const location = useLocation();

  // Hämta sökdatan som skickades med från förra sidan (t.ex. startsidan)
  const activeItem = location.state?.activeItem;
  const selectedDates = location.state?.selectedDates;

  // Använd din nya hook
  const { activities, loading, error } = useActivitySearch({
    activeItem,
    selectedDates,
  });

  if (loading) return <div>Laddar aktiviteter...</div>;
  if (error) return <div>Ett fel uppstod: {error}</div>;

  return (
    <section className="explore">
      <div className="explore__searchbar"></div>
      <div className="explore__bg" />
      <h2 className="explore__title">{activities.length} activies found</h2>
      {activities.length === 0 ? (
        <p>Inga aktiviteter hittades för dina sökkriterier.</p>
      ) : (
        <div className="grid">
          {activities.map((item) => (
            <div key={item.id}>
              <Card lesson={item.lesson} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
