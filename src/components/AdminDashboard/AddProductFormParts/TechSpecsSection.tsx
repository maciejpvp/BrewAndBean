import React from 'react';
import styles from '../AddProductForm.module.css';
import type { TechSpec } from '../AddAddProductForm';

interface Props {
  techSpecs: TechSpec[];
  handleTechSpecChange: (index: number, field: 'label' | 'value', value: string) => void;
  addTechSpecRow: () => void;
  removeTechSpecRow: (index: number) => void;
}

export const TechSpecsSection: React.FC<Props> = ({
  techSpecs, handleTechSpecChange, addTechSpecRow, removeTechSpecRow
}) => {
  return (
    <section>
      <div className={styles.sectionHeaderInteractive}>
        <div className={styles.sectionHeader} style={{marginBottom: 0}}>
          <span className={styles.sectionNumber}>02</span>
          <h3 className={styles.sectionTitle}>Technical Specifications</h3>
        </div>
        <button type="button" className={styles.addBtnInline} onClick={addTechSpecRow}>
          <span className="material-symbols-outlined text-sm">add_circle</span> Add Row
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Parameter Label</th>
              <th>Value / Specification</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {techSpecs.map((spec, index) => (
              <tr key={index}>
                <td>
                  <input 
                    className={`${styles.gridInput} ${styles.fontMedium}`} 
                    type="text" 
                    value={spec.label}
                    onChange={(e) => handleTechSpecChange(index, 'label', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    className={styles.gridInput} 
                    type="text" 
                    value={spec.value}
                    onChange={(e) => handleTechSpecChange(index, 'value', e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" className={styles.iconButton} onClick={() => removeTechSpecRow(index)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
