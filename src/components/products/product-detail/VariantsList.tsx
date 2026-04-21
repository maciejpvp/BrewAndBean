import { Link, useParams } from 'react-router-dom';
import styles from './VariantsList.module.css';
import { getProductImageUrl } from '../../../types/product';
import type { Product } from '../../../types/product';

interface VariantsListProps {
    variants: NonNullable<Product['variants']>;
}

export const VariantsList = ({ variants }: VariantsListProps) => {
    const { id: currentId } = useParams<{ id: string }>();
    if (!variants || variants.length === 0) return null;

    return (
        <div className={styles.variantsContainer}>
            <p className={styles.variantsLabel}>Available Variations</p>
            <div className={styles.variantsGrid}>
                {variants.map(variant => {
                    const imageUrl = getProductImageUrl(variant.media);
                    const isActive = variant.id === currentId;
                    
                    return (
                        <Link 
                            to={`/product/${variant.id}`} 
                            key={variant.id} 
                            className={`${styles.variantCard} ${isActive ? styles.activeVariant : ''}`}
                        >
                            <div className={styles.imageWrapper}>
                                {imageUrl ? (
                                    <img src={imageUrl} alt={variant.name} className={styles.variantImage} />
                                ) : (
                                    <div className={styles.placeholderImage} />
                                )}
                            </div>
                            <span className={styles.variantName}>{variant.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
