import React, { type ChangeEvent } from 'react';
import styles from '../ProductForm.module.css';

interface Props {
  price: string;
  stock: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  dirtyPrice?: boolean;
  dirtyStock?: boolean;
}

export const InventoryLogicSection: React.FC<Props> = ({ 
  price, stock, handleInputChange, dirtyPrice, dirtyStock 
}) => {
  return (
    <section className={styles.inventoryBox}>
      <h3 className={styles.sectionTitleRight}>Inventory Logic</h3>
      <div className={styles.inputGroupLargeGap}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Unit Price (USD)</label>
          <div className={styles.priceWrapper}>
            <span className={styles.priceSymbol}>$</span>
            <input 
              className={`${styles.editorialInput} ${styles.priceInput} ${dirtyPrice ? styles.dirtyField : ''}`} 
              type="number" 
              step="0.01"
              name="price"
              value={price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Available Stock</label>
          <input 
            className={`${styles.editorialInput} ${dirtyStock ? styles.dirtyField : ''}`} 
            type="number" 
            name="stock"
            value={stock}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
    </section>
  );
};
