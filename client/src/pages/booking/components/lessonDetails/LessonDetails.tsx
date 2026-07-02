// BookingDetails.tsx

import type { AvailableTimeSlot, LessonWithSlots } from "@/types/types";
import "./LessonDetails.scss";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import LocationIcon from "@/assets/icons/LocationIcon.svg";
import FavoriteIcon from "@/components/favoriteIcon/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";

type LessonDetailsProps = {
  lesson: LessonWithSlots;
  onBook?: (lessonId: number, day: number, slot: AvailableTimeSlot) => void;
  onClose?: () => void;
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="lesson-info__detail-row">
    <span className="lesson-info__detail-label">{label}</span>
    <span className="lesson-info__detail-value">{value}</span>
  </div>
);

export default function LessonDetails({ lesson }: LessonDetailsProps) {
  const { isFavorited, toggleFavorite } = useFavorites();

  const id = Number(lesson.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id, "lesson");
  };

  const pricePerHour =
    lesson.durationHours > 0
      ? (lesson.priceEuro / lesson.durationHours).toFixed(1)
      : lesson.priceEuro;

  return (
    <div className="lesson-info">
      {/* Skolnamn + länk */}
      <Link
        to={`/schools/${lesson.school?.id}`}
        className="lesson-info__school-link"
      >
        <p className="lesson-info__school-name">{lesson.school?.name}</p>
      </Link>

      {/* Lektions titel + favorit knapp */}
      <div className="lesson-info__title-row">
        <h1 className="lesson-info__title">
          {lesson.lessonType} {lesson.sportType} lesson
        </h1>
        {/*  favorit knapp */}
        <button
          className="lesson-info__fav"
          onClick={handleFavorite}
          aria-label={
            isFavorited(lesson.id, "lesson")
              ? "Ta bort från favoriter"
              : "Lägg till i favoriter"
          }
        >
          <FavoriteIcon favorited={isFavorited(lesson.id, "lesson")} />
        </button>
      </div>

      {/* Plats och pris */}
      <div className="lesson-info__location_price">
        <div className="lesson-info__location">
          <Icon src={LocationIcon} width={25} height={25} />
          <p>{lesson.location}</p>
        </div>
      </div>
      <p className="lesson-info__description">{lesson.description}</p>
      <div className="lesson-info__details">
        <DetailRow label="Duration:" value={`${lesson.durationHours} hours`} />
        <DetailRow label="Price per hour:" value={`${pricePerHour}$`} />
        <DetailRow label="Level" value={lesson.level} />
        <DetailRow
          label="Equipment:"
          value={lesson.equipmentIncluded ? "Included" : "Not included"}
        />
      </div>
      <div className="lesson-info__price-badge">${lesson.priceEuro}</div>
    </div>
  );
}
