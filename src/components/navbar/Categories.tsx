import React, { useState } from 'react';
import CategoriesItem from './CategoriesItem';
import styles from './Categories.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavbarContext } from './NavbarContext';

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
  const location = useLocation();
  const { isScrolled } = useNavbarContext();

  const pathname = location.pathname;

  const getActiveTab = () => {
    return navItems.find((item) => item.path === pathname);
  };

  const [activeTab, setActiveTab] = useState(() => {
    console.log(getActiveTab());
    return getActiveTab();
  });

  const handleClick = (item: { label: string; path: string }) => {
    setActiveTab(item);
    navigate(item.path);
  };

  return (
    <nav 
      className={styles.container}
      style={{
        paddingTop: isScrolled ? 0 : '1rem',
        paddingBottom: isScrolled ? 0 : '1rem',
        transition: 'padding 0.3s ease-in-out'
      }}
    >
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