import image from "@/assets/image.png";
import type { Lesson, School } from "@/types/types";
import Icon from "@/components/Icon";
import Location from "@/assets/icons/Location.svg";
import Clock from "@/assets/icons/Clock.svg";
import CreditCard from "@/assets/icons/CreditCard.svg";
import FavoriteButton from "../buttons/FavoriteButton";

import "./Card.scss";
import { Link } from "react-router-dom";
import StarRating from "../rating/StarRating";
import { useFavorites } from "@/hooks/useFavorites";

type CardProps =
  | { variant: "lesson"; data: Lesson }
  | { variant: "school"; data: School };

export default function Card(props: CardProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const id = props.data.id;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  const href =
    props.variant === "lesson"
      ? `/booking/${props.data.id}`
      : `/schools/${props.data.id}`;

  return (
    <Link to={href} className="card">
      <div className="card__image-wrap">
        <img
          src={image}
          alt={props.variant === "lesson" ? "Lesson image" : "School image"}
          className="card__image"
          loading="lazy"
        />

        <button
          className="card__fav"
          onClick={handleFavorite}
          aria-label={
            isFavorited(id) ? "Ta bort från favoriter" : "Lägg till i favoriter"
          }
        >
          <FavoriteButton favorited={isFavorited(id)} />
        </button>
      </div>

      <div className="card__body">
        {props.variant === "lesson" && <LessonCardBody lesson={props.data} />}
        {props.variant === "school" && <SchoolCardBody school={props.data} />}
      </div>
    </Link>
  );
}

// ─── Lesson body ─────────────────────────────────────────────────────────────

type LessonCardBodyProps = {
  lesson: Lesson;
};

const LessonCardBody = ({ lesson }: LessonCardBodyProps) => {
  const pricePerHour = lesson.priceEuro / lesson.durationHours;

  return (
    <div className="card__content">
      <div className="card__title-row">
        <h2>
          {lesson.lessonType} {lesson.sportType} lesson
        </h2>
      </div>
      <div className="card__description">
        <p>{lesson.description}</p>
      </div>
      <div className="card__meta desc">
        <span>Level:</span> <span>{lesson.level}</span>
      </div>
      <div className="card__meta desc">
        <span>Equipment:</span>{" "}
        <span>{lesson.equipmentIncluded ? "Included" : "Not included"}</span>
      </div>
      <hr className="divider" />
      <div className="card__meta">
        <Icon src={Location} width={20} height={20} />
        <span>Location:</span> <span>{lesson.location}</span>
      </div>
      <div className="card__meta">
        <Icon src={Clock} width={20} height={20} />
        <span>Duration:</span> <span>{lesson.durationHours}h</span>
      </div>
      <div className="card__meta">
        <Icon src={CreditCard} width={20} height={20} />
        <span>Price per hour:</span> <span>{pricePerHour.toFixed(2)}€</span>
      </div>
      <span className="card__badge">
        <p>{lesson.priceEuro}€</p>
      </span>
    </div>
  );
};

// ─── School body ──────────────────────────────────────────────────────────────

type SchoolCardBodyProps = {
  school: School;
};

const SchoolCardBody = ({ school }: SchoolCardBodyProps) => {
  return (
    <>
      <div className="card__title-row">
        <h2>{school.name}</h2>
      </div>
      <div className="card__description">
        <p className="card__school-location">
          {school.city}, {school.country}
        </p>
        <p className="card__school-description">
          Add description Lorem Ipsum jfofäowe oqnefoöengowegw oneobgbäwogn
          jefej eibfejo efbfeb{" "}
        </p>
      </div>
      <div className="card__meta">
        <Icon src={Location} width={20} height={20} />
        <span>Address:</span> <span>{school.address}</span>
      </div>
      <hr className="divider" />

      <StarRating average={school.averageRating} count={school.ratingCount} />
    </>
  );
};
