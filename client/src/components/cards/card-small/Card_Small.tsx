import { useNavigate } from "react-router-dom";
import type { Lesson } from "@/types/types";
import { useFavorites } from "@/hooks/useFavorites";
import FavoriteButton from "@/components/favoriteIcon/FavoriteButton";
import { getLessonImage } from "@/utils/lessonImage";
import "./Card_Small.scss";

type Card_SmallProps = {
  lesson: Lesson;
};

export default function Card_Small({ lesson }: Card_SmallProps) {
  const navigate = useNavigate();
  const { isFavorited, toggleFavorite } = useFavorites();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleFavorite(lesson.id, "lesson");
  };

  const pricePerHour = (lesson.price / lesson.durationHours).toFixed(0);

  return (
    <section className="lesson-list__section">
      <div className="lesson-list-item">
        <div className="lesson-list-item__image-wrap">
          <img
            src={getLessonImage(lesson)}
            alt={lesson.sportType}
            className="lesson-list-item__image"
          />
          <button
            className="lesson-list-item__fav"
            onClick={handleFavorite}
            aria-label={
              isFavorited(lesson.id, "lesson")
                ? "Remove favorite"
                : "Add favorite"
            }
          >
            <FavoriteButton favorited={isFavorited(lesson.id, "lesson")} />
          </button>
        </div>

        <div className="lesson-list-item__body">
          <div className="lesson-list-item__title-row">
            <h3>
              {lesson.lessonType} {lesson.sportType} lesson
            </h3>
            <span className="lesson-list-item__price">${lesson.price}</span>
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
