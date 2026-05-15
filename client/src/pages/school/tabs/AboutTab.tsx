import type { School } from "@/types/types";
import "./AboutTab.scss";
import surfSchoolImg from "@/assets/schoolImage.png";
import coach1 from "@/assets/coach1.png";
import coach2 from "@/assets/coach2.png";
import coach3 from "@/assets/coach3.png";
import coach4 from "@/assets/coach4.png";

type AboutTabProps = {
  school: School;
};

const PLACEHOLDER_COACHES = [
  { id: 1, name: "Carlos Santos", sport: "Surf / Windsurf", img: coach2 },
  { id: 2, name: "Maria Dos Santos", sport: "Kitesurf", img: coach3 },
  { id: 3, name: "Erik Lindgren", sport: "Snowboard", img: coach1 },
  { id: 4, name: "Ana Pereira", sport: "Climbing", img: coach4 },
];

export default function AboutTab({ school }: AboutTabProps) {
  return (
    <>
      {/* Hero bild */}
      <img src={surfSchoolImg} alt={school.name} className="about-tab__hero" />
      <div className="about-tab">
        {/* Om skolan */}
        <section className="about-tab__section">
          <h2>About</h2>
          <p>
            Welcome to {school.name}, located in {school.city}, {school.country}
            . We offer world-class extreme sports lessons for all levels — from
            complete beginners to advanced athletes looking to push their
            limits.
          </p>
        </section>

        {/* Instruktörer */}
        <section className="about-tab__section">
          <h2>Coaches</h2>
          <p>
            Our certified instructors are passionate athletes with years of
            experience.
          </p>
          <div className="about-tab__coaches">
            {PLACEHOLDER_COACHES.map((coach) => (
              <div key={coach.id} className="about-tab__coach">
                <img
                  src={coach.img}
                  alt={coach.name}
                  className="about-tab__coach-photo"
                />
                <p className="about-tab__coach-name">{coach.name}</p>
                <p className="about-tab__coach-sport">{coach.sport}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Info */}
        <section className="about-tab__info-card">
          <h2>Info</h2>
          <div className="about-tab__info-row">
            <span className="about-tab__info-label">Address</span>
            <span>
              {school.address}, {school.city}, {school.country}
            </span>
          </div>
          <hr />
          <div className="about-tab__info-row">
            <span className="about-tab__info-label">Contact</span>
            <span>
              contact@{school.name.toLowerCase().replace(/\s/g, "")}.com
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
