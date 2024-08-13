import { useState, ReactNode } from "react";

type Tab = {
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const currentTab = tabs[activeTab];

  return (
    <div>
      <div className="flex justify-center items-center mb-4 space-x-8">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`cursor-pointer px-4 py-2 ${
              index === activeTab ? "font-bold text-black" : "text-gray-500"
            }`}
            style={{
              borderBottom: index === activeTab ? "2px solid black" : "2px solid transparent",
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-300">
        {currentTab ? currentTab.content : <p>No content available</p>}
      </div>
    </div>
  );
};

export default Tabs;
