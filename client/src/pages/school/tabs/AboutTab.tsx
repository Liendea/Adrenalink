import type { School } from "@/types/types";
import "./AboutTab.scss";
import surfSchoolImg from "@/assets/image.png";

type AboutTabProps = {
  school: School;
};

const PLACEHOLDER_COACHES = [
  { id: 1, name: "Carlos Santos", sport: "Surf / Windsurf" },
  { id: 2, name: "Maria Dos Santos", sport: "Kitesurf" },
  { id: 3, name: "Erik Lindgren", sport: "Snowboard" },
  { id: 4, name: "Ana Pereira", sport: "Climbing" },
];

export default function AboutTab({ school }: AboutTabProps) {
  return (
    <div className="about-tab">
      {/* Hero bild */}
      <img src={surfSchoolImg} alt={school.name} className="about-tab__hero" />

      {/* Om skolan */}
      <section className="about-tab__section">
        <h2>About</h2>
        <p>
          Welcome to {school.name}, located in {school.city}, {school.country}.
          We offer world-class extreme sports lessons for all levels — from
          complete beginners to advanced athletes looking to push their limits.
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
              <div className="about-tab__coach-avatar">
                <span>{coach.name[0]}</span>
              </div>
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
  );
}
