import { useNavigate } from "react-router-dom";
import type { Lesson } from "@/types/types";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/buttons/FavoriteButton";
import surfImg from "@/assets/image.png";
import kiteImg from "@/assets/kite-surf.png";
import climbImg from "@/assets/climbing.png";
import snowboardImg from "@/assets/snowboard.png";
import "./Card_Small.scss";

type Card_SmallProps = {
  lesson: Lesson;
};

const sportImageMap: Record<string, string> = {
  surf: surfImg,
  kitesurf: kiteImg,
  climbing: climbImg,
  snowboard: snowboardImg,
  windsurf: surfImg,
  wakeboard: surfImg,
};

export default function Card_Small({ lesson }: Card_SmallProps) {
  const navigate = useNavigate();
  const { isFavorited, toggleFavorite } = useFavorites();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(lesson.id, "lesson");
  };

  const pricePerHour = (lesson.priceEuro / lesson.durationHours).toFixed(0);

  return (
    <section className="lesson-list__section">
      <div className="lesson-list-item">
        <div className="lesson-list-item__image-wrap">
          <img
            src={sportImageMap[lesson.sportType] ?? surfImg}
            alt={lesson.sportType}
            className="lesson-list-item__image"
          />
          <button
            className="lesson-list-item__fav"
            onClick={handleFavorite}
            aria-label={
              isFavorited(lesson.id) ? "Remove favorite" : "Add favorite"
            }
          >
            <FavoriteButton favorited={isFavorited(lesson.id)} />
          </button>
        </div>

        <div className="lesson-list-item__body">
          <div className="lesson-list-item__title-row">
            <h3>
              {lesson.lessonType} {lesson.sportType} lesson
            </h3>
            <span className="lesson-list-item__price">${lesson.priceEuro}</span>
          </div>
          <p className="lesson-list-item__description">{lesson.description}</p>
          <div className="lesson-list-item__meta">
            <span>📍 {lesson.location}</span>
            <span>💳 ${pricePerHour}/h</span>
            <span>⏱ {lesson.durationHours}h</span>
          </div>
        </div>
        <button
          className="lesson-list-item__book"
          onClick={() => navigate(`/booking/${lesson.id}`)}
        >
          BOOK
        </button>
      </div>
    </section>
  );
}
