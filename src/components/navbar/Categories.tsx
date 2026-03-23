import React, { useState } from 'react';
import CategoriesItem from './CategoriesItem';
import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';

const navItems = [{
  label: "OUR ROASTS",
  path: "/roasts",
}, {
  label: "EQUIPMENT",
  path: "/equipment",
}, {
  label: "BREW GUIDES",
  path: "/brew-guides",
}, {
  label: "OUR STORY",
  path: "/our-story",
}];

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(navItems[0]);

  const handleClick = (item: { label: string; path: string }) => {
    setActiveTab(item);
    navigate(item.path);
  };

  return (
    <nav className={styles.container}>
      {navItems.map((item) => (
        <CategoriesItem
          key={item.label}
          label={item.label}
          isActive={activeTab === item}
          onClick={() => handleClick(item)}
        />
      ))}
    </nav>
  );
};

export default Categories;