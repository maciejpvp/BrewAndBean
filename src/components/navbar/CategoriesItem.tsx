import React from 'react';
import { motion } from 'framer-motion';
import styles from './Categories.module.css';

interface Props {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoriesItem: React.FC<Props> = ({ label, isActive, onClick }) => {
  return (
    <div className={styles.itemWrapper} onClick={onClick}>
      <p className={styles.itemText + (isActive ? ' ' + styles.itemTextSelected : '')}>{label}</p>

      {isActive && (
        <motion.div
          layoutId="underline"
          className={styles.underline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
};

export default CategoriesItem;