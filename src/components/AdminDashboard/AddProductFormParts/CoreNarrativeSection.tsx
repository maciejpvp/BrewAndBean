import React, { type ChangeEvent } from 'react';
import styles from '../AddProductForm.module.css';

interface Props {
  name: string;
  description: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CoreNarrativeSection: React.FC<Props> = ({ name, description, handleInputChange }) => {
  return (
    <section>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>01</span>
        <h3 className={styles.sectionTitle}>Core Narrative</h3>
      </div>
      <div className={styles.inputGroupLargeGap}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Product Title</label>
          <input 
            className={styles.editorialInput} 
            placeholder="e.g. Ethiopian Yirgacheffe G1 Reserve" 
            type="text" 
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Editorial Description</label>
          <textarea 
            className={styles.editorialInputTextarea} 
            placeholder="Describe the sensory experience, roast profile, and origin story..." 
            rows={6}
            name="description"
            value={description}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </section>
  );
};
