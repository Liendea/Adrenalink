import image from "@/assets/image.png";
import type { Lesson } from "@/types/types";
import Icon from "@/components/Icon";
import Location from "@/assets/icons/Location.svg";
import Clock from "@/assets/icons/Clock.svg";
import CreditCard from "@/assets/icons/CreditCard.svg";
import FavoriteButton from "../buttons/FavoriteButton";
import { useState } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

type CardProps = {
  lesson: Lesson;
};

export default function Card({ lesson }: CardProps) {
  const [favorited, setFavorited] = useState<boolean>(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorited((prev) => !prev);
  };
  return (
    <Link to={`/booking/${lesson.id}`} className="card">
      <div className="card__image-wrap">
        <img
          src={image}
          alt="lägg till alt text"
          className="card__image"
          loading="lazy"
        />
        <img src={image} width={400} height={220} alt="bild text" />{" "}
        <div
          className="card__fav"
          onClick={toggleFavorite}
          aria-label={
            favorited ? "Ta bort från favoriter" : "Lägg till i favoriter"
          }
        >
          <FavoriteButton favorited={favorited} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="card__body">
        {/* Title row */}
        <div className="card__title-row">
          <h2>Surf Lesson Private</h2>
          <span className="card__badge">
            <p>{lesson.priceEuro}€</p>
          </span>
        </div>
        {/* Descriptions*/}
        <div className="card__description">
          <p>
            {lesson.description}
            Lorem ipsum dolor sit amet consectetur. Imperdiet lorem eget nec
            magna ut.
          </p>
        </div>
        <div className="card__meta desc">
          <span>Level:</span> <span>{lesson.level}</span>
        </div>

        <div className="card__meta desc">
          <span>Eqiptment:</span>{" "}
          <span>{lesson.equipmentIncluded ? "included" : "Not included"}</span>
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
          <span>Price per hour:</span>{" "}
          <span>{`${lesson.priceEuro}/${lesson.durationHours}`}</span>
        </div>
      </div>
    </Link>
  );
}
