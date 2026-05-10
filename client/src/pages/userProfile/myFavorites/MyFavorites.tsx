import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import Card from "@/components/cards/Card";
import "./MyFavorites.scss";
import Icon from "@/components/Icon";
import chevronLeft from "@/assets/icons/ChevronLeft.svg";

export default function MyFavorites() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const lessonFavorites = favorites.filter((f) => f.lessonId !== null);
  const schoolFavorites = favorites.filter((f) => f.schoolId !== null);

  return (
    <div className="my-favorites">
      <div className="my-favorites__header">
        <button
          className="my-favorites__back"
          onClick={() => navigate("/profile")}
        >
          <Icon src={chevronLeft} /> Back
        </button>
        <h1>My Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <p className="my-favorites__empty">
          You haven't saved any favorites yet.
        </p>
      ) : (
        <>
          {lessonFavorites.length > 0 && (
            <section className="my-favorites__section">
              <h2>Lessons</h2>
              <div className="grid">
                {lessonFavorites.map((f) => (
                  <Card key={f.id} variant="lesson" data={f.lesson} />
                ))}
              </div>
            </section>
          )}

          {schoolFavorites.length > 0 && (
            <section className="my-favorites__section">
              <h2>Schools</h2>
              <div className="grid">
                {schoolFavorites.map((f) => (
                  <Card key={f.id} variant="school" data={f.school} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
