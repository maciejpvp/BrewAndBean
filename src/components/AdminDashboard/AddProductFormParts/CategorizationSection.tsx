import React from 'react';
import styles from '../AddProductForm.module.css';

interface Props {
  categories: string[];
  tagInput: string;
  setTagInput: (val: string) => void;
  addCategory: () => void;
  removeCategory: (index: number) => void;
  handleAddCategoryKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const CategorizationSection: React.FC<Props> = ({
  categories, tagInput, setTagInput, addCategory, removeCategory, handleAddCategoryKeyPress
}) => {
  return (
    <section>
      <h3 className={styles.sectionTitleRight} style={{marginBottom: '1rem'}}>Categorization</h3>
      <div className={styles.tagsBox}>
        {categories.map((cat, index) => (
          <span key={index} className={styles.tag}>
            {cat} 
            <span className="material-symbols-outlined" style={{fontSize: 14, cursor: 'pointer'}} onClick={() => removeCategory(index)}>
              close
            </span>
          </span>
        ))}
      </div>
      <div className={styles.addTagGroup}>
        <input 
          className={styles.addTagInput} 
          placeholder="Add tag..." 
          type="text" 
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddCategoryKeyPress}
        />
        <button type="button" className={styles.addTagBtn} onClick={addCategory}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </section>
  );
};
