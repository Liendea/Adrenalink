import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import "./MyFavorites.scss";

export default function MyFavorites() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  return (
    <div className="my-favorites">
      <div className="my-favorites__header">
        <button
          className="my-favorites__back"
          onClick={() => navigate("/profile")}
        >
          ‹ Back
        </button>
        <h1>My Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <p className="my-favorites__empty">
          You haven't saved any favorites yet.
        </p>
      ) : (
        <div className="my-favorites__list">
          {/* Favorit-ID:n finns i favorites-arrayen – 
              koppla mot aktiviteter/skolor när du har en favorites-backend */}
          <p>You have {favorites.length} saved favorites.</p>
        </div>
      )}
    </div>
  );
}
