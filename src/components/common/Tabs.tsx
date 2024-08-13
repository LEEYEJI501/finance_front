import { useState, ReactNode } from 'react';
import Button from './Button'; 

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
      <div className="flex border-b border-gray-300 mb-4">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            onClick={() => setActiveTab(index)}
            size="medium"
            color={index === activeTab ? "blue" : "none"}
            purpose={index === activeTab ? "primary" : "secondary"}
            className={`mr-2 ${index === activeTab ? 'font-bold' : ''}`} 
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="p-4 border border-gray-300 rounded">
        {currentTab ? currentTab.content : <p>No content available</p>}
      </div>
    </div>
  );
};

export default Tabs;
