import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSchoolById from "@/hooks/useSchoolByID";
import AboutTab from "../../pages/school/tabs/AboutTab";
import ClassesTab from "../../pages/school/tabs/ClassesTab";
import StarRating from "@/components/rating/StarRating";
import "./SchoolDetailPage.scss";
import Tabs from "@/components/navigation/tabNav/tabs/Tabs";
import { useLocation } from "react-router-dom";
import Back_Btn from "@/components/buttons/Back_Btn";
import Icon from "@/components/Icon";
import InternetIcon from "@/assets/icons/Internet.svg";
import MessageIcon from "@/assets/icons/WhatsApp.svg";
import InstagramIcon from "@/assets/icons/Instagram.svg";

type SchoolTab = "about" | "classes" | "requests";

const TABS = [
  { key: "about" as const, label: "About" },
  { key: "classes" as const, label: "Classes" },
  { key: "requests" as const, label: "Requests" },
];

export default function SchoolDetailPage() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SchoolTab>("about");
  const { school, loading, error } = useSchoolById(schoolId);

  const location = useLocation();
  const returnTo =
    (location.state as { returnTo?: string })?.returnTo ??
    "/explore?tab=schools";

  if (loading) return <div className="school-detail__loading">Loading...</div>;
  if (error || !school)
    return <div className="school-detail__error">School not found.</div>;

  return (
    <section className="school-detail">
      <div className="school-detail__top-bar">
        <Back_Btn onClick={() => navigate(returnTo)} />

        {/* Action buttons */}
        <div className="school-detail__actions">
          <a
            href="#"
            className="school-detail__action-btn"
            aria-label="Website"
          >
            <Icon src={InternetIcon} />
          </a>
          <a
            href="#"
            className="school-detail__action-btn"
            aria-label="Instagram"
          >
            <Icon src={InstagramIcon} />
          </a>
          <a
            href="#"
            className="school-detail__action-btn"
            aria-label="Message"
          >
            <Icon src={MessageIcon} />
          </a>
        </div>
      </div>

      {/* Header */}

      <div className="school-detail__header">
        <div className="school-detail__title-wrap">
          <h1 className="school-detail__title">{school.name}</h1>
          <StarRating
            average={school.averageRating}
            count={school.ratingCount}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="school-detail__tabs">
        <Tabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
      </div>
      {/* Content */}
      <div className="school-detail__content">
        {activeTab === "about" && <AboutTab school={school} />}
        {activeTab === "classes" && <ClassesTab lessons={school.lessons} />}
        {activeTab === "requests" && (
          <p className="school-detail__coming-soon">Requests coming soon.</p>
        )}
      </div>
    </section>
  );
}
