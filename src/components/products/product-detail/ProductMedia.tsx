import styles from './ProductMedia.module.css';
import type { ProductMedia as ProductMediaModel } from '../../../types/product';
import { getProductImageUrl } from '../../../types/product';

interface ProductMediaProps {
    media: ProductMediaModel[];
}

export const ProductMedia = ({ media }: ProductMediaProps) => {
    const imageUrl = getProductImageUrl(media);
    const mainMedia = media.find((m) => m.isMain) ?? media[0];

    return (
        <div className={styles.mediaContainer}>
            <div className={styles.imageWrapper}>
                {imageUrl && (
                    <img 
                        alt={mainMedia?.key ?? 'Product image'} 
                        className={styles.productImage} 
                        src={imageUrl} 
                    />
                )}
            </div>
        </div>
    );
};
