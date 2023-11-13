import './Tab.css'
import React, { useState } from 'react'

interface TabProps {
  tabs: string[];
  children?: any
}

const Tab: React.FC<TabProps> = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // If children is a single element, wrap it in an array
  if (!Array.isArray(children)) {
    children = [children];
  }

  const tabHeaders = tabs.map((tab, index) => (
    <li
      key={index}
      className={index === activeTab ? 'active' : ''}
      onClick={() => handleTabClick(index)}
    >
      {tab}
    </li>
    ))

  return (
    <div className="tab-container">
      <ul className="tab-list">
        { tabHeaders }
      </ul>
      <div
        key={activeTab}
        className='tab-content'
      >
        { children[activeTab] }
      </div>
    </div>
  );
};

export default Tab
