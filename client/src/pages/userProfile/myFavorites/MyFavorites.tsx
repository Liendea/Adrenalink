import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import Card from "@/components/cards/Card";
import "./MyFavorites.scss";

import Back_Btn from "@/components/buttons/Back_Btn";

export default function MyFavorites() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const lessonFavorites = favorites.filter((f) => f.lessonId !== null);
  const schoolFavorites = favorites.filter((f) => f.schoolId !== null);

  return (
    <div className="my-favorites">
      <div className="my-favorites__header">
        <Back_Btn onClick={() => navigate("/profile")} />

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
                {lessonFavorites.map(
                  (f) =>
                    // kollar att f.lesson inte är undefined/null
                    f.lesson && (
                      <Card key={f.id} variant="lesson" data={f.lesson} />
                    ),
                )}
              </div>
            </section>
          )}

          {schoolFavorites.length > 0 && (
            <section className="my-favorites__section">
              <h2>Schools</h2>
              <div className="grid">
                {schoolFavorites.map(
                  (f) =>
                    // kollar att f.school inte är undefined/null
                    f.school && (
                      <Card key={f.id} variant="school" data={f.school} />
                    ),
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
