import "./ExploreNav.scss";

type ExploreTab = "activities" | "schools" | "rentals";

type ExploreNavProps = {
  activeTab: ExploreTab;
  onTabChange: (tab: ExploreTab) => void;
};

export default function ExploreNav({
  activeTab,
  onTabChange,
}: ExploreNavProps) {
  const tabs: { key: ExploreTab; label: string }[] = [
    { key: "activities", label: "Activities" },
    { key: "schools", label: "Schools" },
    { key: "rentals", label: "Rentals" },
  ];

  return (
    <nav className="explore-nav">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`explore-nav__tab ${activeTab === tab.key ? "explore-nav__tab--active" : ""}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
