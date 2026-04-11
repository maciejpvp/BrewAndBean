import React from 'react';
import styles from '../AddProductForm.module.css';
import type { Attribute } from '../AddAddProductForm';

interface Props {
  attributes: Attribute[];
  handleAttributeChange: (index: number, field: 'key' | 'value', value: string) => void;
  addAttributeRow: () => void;
  removeAttributeRow: (index: number) => void;
}

export const SensoryAttributesSection: React.FC<Props> = ({
  attributes, handleAttributeChange, addAttributeRow, removeAttributeRow
}) => {
  return (
    <section>
      <div className={styles.sectionHeaderInteractive}>
        <div className={styles.sectionHeader} style={{marginBottom: 0}}>
          <span className={styles.sectionNumber}>03</span>
          <h3 className={styles.sectionTitle}>Additional Attributes</h3>
        </div>
        <button type="button" className={styles.addBtnInline} onClick={addAttributeRow}>
          <span className="material-symbols-outlined text-sm">add_circle</span> Add Attribute
        </button>
      </div>
      <div className={styles.attributesGrid}>
        {attributes.map((attr, index) => (
          <div className={styles.attributeCard} key={index}>
            <div className={styles.attributeInputWrap}>
              <input 
                className={styles.label} 
                type="text" 
                value={attr.key}
                onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                style={{background: 'transparent', border: 'none', outline: 'none', padding: 0}}
                placeholder="KEY"
              />
              <input 
                className={styles.attributeInput} 
                type="text" 
                value={attr.value}
                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                placeholder="Value"
              />
            </div>
            <button type="button" className={styles.iconButton} onClick={() => removeAttributeRow(index)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
