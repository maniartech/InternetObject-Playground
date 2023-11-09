import React, { useState }          from 'react'
import                                   './Tab.css'

interface TabProps {
  tabs: string[];
  children?: any
}

const Tab: React.FC<TabProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-container">
      <ul className="tab-list">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {children && children[activeTab]}
      </div>
    </div>
  );
};

export default Tab
