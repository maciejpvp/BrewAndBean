import React, { type ChangeEvent } from 'react';
import styles from '../ProductForm.module.css';

interface Props {
  selectedFiles: File[];
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  disabled?: boolean;
}

export const VisualAssetsSection: React.FC<Props> = ({
  selectedFiles, handleFileChange, removeFile, disabled
}) => {
  return (
    <section>
      <h3 className={styles.sectionTitleRight} style={{marginBottom: '1rem'}}>Visual Assets</h3>
      <div className={styles.assetsGrid}>
        {selectedFiles.map((file, index) => (
          <div className={styles.assetBox} key={index}>
            <img className={styles.assetImage} src={URL.createObjectURL(file)} alt="preview" />
            {!disabled && (
              <div className={styles.assetOverlay}>
                <span className="material-symbols-outlined text-white cursor-pointer" onClick={() => removeFile(index)}>
                  delete
                </span>
              </div>
            )}
          </div>
        ))}
        {!disabled && (
          <label className={styles.assetAddBox}>
            <span className={`material-symbols-outlined ${styles.assetAddBoxIcon}`}>add_photo_alternate</span>
            <span className={styles.assetAddText}>Add Image</span>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileChange} 
              className={styles.hiddenFileInput}
            />
          </label>
        )}
      </div>
      <p className={styles.assetGuideText}>
        Recommended: 1:1 Aspect Ratio, minimum 1200px. High resolution editorial photography preferred.
      </p>
    </section>
  );
};
