/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from 'react';

interface NavbarContextType {
  isScrolled: boolean;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider: React.FC<{ isScrolled: boolean; children: React.ReactNode }> = ({ isScrolled, children }) => {
  return (
    <NavbarContext.Provider value={{ isScrolled }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbarContext must be used within a NavbarProvider');
  }
  return context;
};
