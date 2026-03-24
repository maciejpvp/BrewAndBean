import React from 'react';
import { motion } from 'framer-motion';
import styles from './Categories.module.css';
import { useTheme } from '@mui/material/styles';

interface Props {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoriesItem: React.FC<Props> = ({ label, isActive, onClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // In light mode, use the CSS module colors. In dark mode, use light text.
  const textColor = isDark ? theme.palette.text.primary : undefined;
  const underlineColor = isDark ? theme.palette.text.primary : undefined;

  return (
    <div className={styles.itemWrapper} onClick={onClick}>
      <p 
        className={styles.itemText + (isActive ? ' ' + styles.itemTextSelected : '')}
        style={textColor ? { color: textColor } : {}}
      >
        {label}
      </p>

      {isActive && (
        <motion.div
          layoutId="underline"
          className={styles.underline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={underlineColor ? { backgroundColor: underlineColor } : {}}
        />
      )}
    </div>
  );
};

export default CategoriesItem;