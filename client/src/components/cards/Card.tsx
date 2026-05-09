import type { Lesson, School } from "@/types/types";
import Icon from "@/components/Icon";
import Location from "@/assets/icons/Location.svg";
import Clock from "@/assets/icons/Clock.svg";
import CreditCard from "@/assets/icons/CreditCard.svg";
import FavoriteButton from "../buttons/FavoriteButton";
import house from "@/assets/icons/house_outlined.svg";
import "./Card.scss";
import { Link } from "react-router-dom";
import StarRating from "../rating/StarRating";
import { useFavorites } from "@/hooks/useFavorites";
import climbImg from "@/assets/climbing.png";
import snowboardImg from "@/assets/snowboard.png";
import kiteImg from "@/assets/kite-surf.png";
import surfImg from "@/assets/image.png";
import windImg from "@/assets/wind-surf.png";
import wakeImg from "@/assets/wakeboard.png";
import snowSchoolImg from "@/assets/snowboard-school.png";
import kiteSchoolImg from "@/assets/kite-school.png";
import climbSchoolImg from "@/assets/climb-school.png";
import surfSchoolImg from "@/assets/surf-school.png";

type CardProps =
  | { variant: "lesson"; data: Lesson }
  | { variant: "school"; data: School };

const sportImageMap: Record<string, string> = {
  surf: surfImg,
  kitesurf: kiteImg,
  climbing: climbImg,
  snowboard: snowboardImg,
  windsurf: windImg,
  wakeboard: wakeImg, // byt ut mot rätt bild när du har en
};

const schoolImageMap: Record<string, string> = {
  surfSchool: surfSchoolImg,
  kiteSchool: kiteSchoolImg,
  climbSchool: climbSchoolImg,
  snowboardSchool: snowSchoolImg,
  wakeboardSchool: wakeImg,
};

const getSchoolImage = (schoolName: string): string => {
  const name = schoolName.toLowerCase();

  if (name.includes("surf")) return schoolImageMap.surfSchool;
  if (name.includes("kite")) return schoolImageMap.kiteSchool;
  if (name.includes("climb")) return schoolImageMap.climbSchool;
  if (name.includes("snow") || name.includes("ski"))
    return schoolImageMap.snowboardSchool;
  if (name.includes("wake")) return schoolImageMap.wakeboardSchool;

  return surfImg; // default
};

export default function Card(props: CardProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const id = props.data.id;
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id, props.variant === "lesson" ? "lesson" : "school");
  };

  //vid klick navigera till kort Id
  const href =
    props.variant === "lesson"
      ? `/booking/${props.data.id}`
      : `/schools/${props.data.id}`;

  const getCardImage = () => {
    if (props.variant === "lesson") {
      return sportImageMap[props.data.sportType] ?? surfImg;
    }
    if (props.variant === "school") {
      return getSchoolImage(props.data.name);
    }
    return surfImg;
  };

  return (
    <Link to={href} className="card">
      <div className="card__image-wrap">
        <img
          src={getCardImage()}
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
        <span className="card__badge">
          <p>{lesson.priceEuro}€</p>
        </span>
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
      {lesson.school?.name && (
        <div className="card__meta">
          <Icon src={house} width={20} height={20} />
          <span>School:</span> <span>{lesson.school.name}</span>
        </div>
      )}
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
