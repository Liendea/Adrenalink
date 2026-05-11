import Tabs from "@/components/navigation/Tabs";

type ExploreTab = "activities" | "schools" | "rentals";

type ExploreNavProps = {
  activeTab: ExploreTab;
  onTabChange: (tab: ExploreTab) => void;
};

const TABS = [
  { key: "activities" as const, label: "Activities" },
  { key: "schools" as const, label: "Schools" },
  { key: "rentals" as const, label: "Rentals" },
];

export default function ExploreNav({
  activeTab,
  onTabChange,
}: ExploreNavProps) {
  return <Tabs tabs={TABS} activeTab={activeTab} onTabChange={onTabChange} />;
}
