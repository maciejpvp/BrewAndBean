import styles from './ProductPage.module.css';
import skeletonStyles from './ProductPageSkeleton.module.css';

export const ProductPageSkeleton = () => {
    // Reusable shimmer base component
    const ShimmerBlock = ({ className }: { className?: string }) => (
        <div className={`${skeletonStyles.shimmerBlock} ${className || ''}`}>
            <div className={skeletonStyles.shimmerEffect} />
        </div>
    );

    return (
        <div className={styles.pageContainer}>
            <div className={styles.heroGrid}>
                {/* Left Column (Image) */}
                <ShimmerBlock className={skeletonStyles.imageSkeleton} />

                {/* Right Column (Product Info) */}
                <div className={styles.detailsCol}>
                    {/* Breadcrumbs */}
                    <ShimmerBlock className={skeletonStyles.breadcrumbSkeleton} />

                    {/* Product Title */}
                    <ShimmerBlock className={skeletonStyles.titleSkeleton} />

                    {/* Price */}
                    <ShimmerBlock className={skeletonStyles.priceSkeleton} />

                    {/* Dynamic Variants (2-3 placeholders) */}
                    <div className={skeletonStyles.variantsContainer}>
                        <div className={skeletonStyles.variantsGrid}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={skeletonStyles.variantCard}>
                                    <ShimmerBlock className={skeletonStyles.variantImageSkeleton} />
                                    <ShimmerBlock className={skeletonStyles.variantNameSkeleton} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Static UI Elements (No Skeletons) */}
                    <div className={styles.actionStack}>
                        <div className={styles.actionRow}>
                            {/* Minimalist Quantity (Disabled state) */}
                            <div className={`${styles.quantitySelector} ${skeletonStyles.disabledAction}`}>
                                <button className={styles.qtyButton} disabled>
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <input className={styles.qtyInput} type="number" defaultValue="1" disabled />
                                <button className={styles.qtyButton} disabled>
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                            
                            {/* Add to Collection (Disabled state) */}
                            <button className={`${styles.addToCartBtn} ${skeletonStyles.disabledAction}`} disabled>
                                <span>Add to Collection</span>
                                <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                            </button>
                        </div>
                        <p className={`${styles.shippingText} ${skeletonStyles.disabledAction}`}>
                            Free express shipping on orders over $75. Estimated delivery: 2-3 business days.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
