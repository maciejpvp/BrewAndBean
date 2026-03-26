import React, { type ChangeEvent } from 'react';
import styles from '../ProductForm.module.css';

interface Props {
  price: string;
  stock: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InventoryLogicSection: React.FC<Props> = ({ price, stock, handleInputChange }) => {
  return (
    <section className={styles.inventoryBox}>
      <h3 className={styles.sectionTitleRight}>Inventory Logic</h3>
      <div className={styles.inputGroupLargeGap}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Unit Price (USD)</label>
          <div className={styles.priceWrapper}>
            <span className={styles.priceSymbol}>$</span>
            <input 
              className={`${styles.editorialInput} ${styles.priceInput}`} 
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
          <label className={styles.label}>Available Stock (Grams)</label>
          <input 
            className={styles.editorialInput} 
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
