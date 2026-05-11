import "./Tabs.scss";

type Tab<T extends string> = {
  key: T;
  label: string;
};

type TabsProps<T extends string> = {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
};

export default function Tabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: TabsProps<T>) {
  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tabs__tab ${activeTab === tab.key ? "tabs__tab--active" : ""}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
