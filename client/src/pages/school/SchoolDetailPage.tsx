import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSchoolById from "@/hooks/useSchoolByID";
import AboutTab from "./tabs/AboutTab";
import ClassesTab from "./tabs/ClassesTab";
import StarRating from "@/components/rating/StarRating";
import "./SchoolDetailPage.scss";
import Icon from "@/components/Icon";
import chevronLeft from "@/assets/icons/ChevronLeft.svg";
import Tabs from "@/components/navigation/Tabs";

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

  if (loading) return <div className="school-detail__loading">Loading...</div>;
  if (error || !school)
    return <div className="school-detail__error">School not found.</div>;

  return (
    <div className="school-detail">
      <button className="school-detail__back" onClick={() => navigate(-1)}>
        <Icon src={chevronLeft} />
        Back
      </button>
      {/* Header */}

      <div className="school-detail__header">
        <div className="school-detail__actions">
          <a
            href="#"
            className="school-detail__action-btn"
            aria-label="Website"
          >
            🌐
          </a>
          <a
            href="#"
            className="school-detail__action-btn"
            aria-label="Instagram"
          >
            📷
          </a>
          <a
            href="#"
            className="school-detail__action-btn"
            aria-label="Message"
          >
            💬
          </a>
        </div>
        <div className="school-detail__title-wrap">
          <h1 className="school-detail__title">{school.name}</h1>
          <StarRating
            average={school.averageRating}
            count={school.ratingCount}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Content */}
      <div className="school-detail__content">
        {activeTab === "about" && <AboutTab school={school} />}
        {activeTab === "classes" && <ClassesTab lessons={school.lessons} />}
        {activeTab === "requests" && (
          <p className="school-detail__coming-soon">Requests coming soon.</p>
        )}
      </div>
    </div>
  );
}
