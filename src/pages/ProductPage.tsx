import { ProductMedia } from '../components/products/product-detail/ProductMedia';
import { ProductDescription } from '../components/products/product-detail/ProductDescription';
import { ProductSpecification } from '../components/products/product-detail/ProductSpecification';
import { VariantsList } from '../components/products/product-detail/VariantsList';
import styles from './ProductPage.module.css';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ProductPageSkeleton } from './ProductPageSkeleton';

export const ProductPage = () => {
    const { id } = useParams();
    console.log(id);
    const { data: product, isLoading, error } = useProduct(id);
    if (isLoading) {
        return <ProductPageSkeleton />;
    }
    if (error || !product) {
        return <div>Error: {error?.message || "Product not found"}</div>;
    }
    return (
        <div className={styles.pageContainer}>
            {/* Main Product Section */}
            <div className={styles.heroGrid}>
                <ProductMedia media={product.media} />

                {/* Right Column: Product Details */}
                <div className={styles.detailsCol}>
                    <nav className={styles.breadcrumb}>
                        {product.categories.map((cat, index) => (
                            <span key={cat.slug}>
                                <a className={styles.breadcrumbLink} href={`/category/${cat.slug}`}>{cat.name}</a>
                                {index < product.categories.length - 1 && <span>/</span>}
                            </span>
                        ))}
                    </nav>

                    <h1 className={styles.pageTitle}>
                        {product.name} <br />
                    </h1>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>${product.price.toFixed(2)}</span>
                        {product.attributes?.weight && <span className={styles.weight}>{product.attributes.weight}</span>}
                    </div>

                    {/* Product Attributes Bento */}
                    <div className={styles.bentoGrid}>
                        {product.attributes?.roastLevel && <div className={styles.bentoCard}>
                            <p className={styles.bentoLabel}>Roast Level</p>
                            <div className={styles.roastFlex}>
                                <div className={styles.roastTrack}>
                                    <div className={styles.roastFill} style={{ width: `${product.attributes.roastPercent}%` }}></div>
                                </div>
                                <span className={styles.bentoValue}>{product.attributes.roastLevel}</span>
                            </div>
                        </div>}
                        {product.attributes?.profile && <div className={styles.bentoCard}>
                            <p className={styles.bentoLabel}>Profile</p>
                            <span className={styles.bentoValue}>{product.attributes.profile}</span>
                        </div>}
                    </div>

                    {product.variants && product.variants.length > 0 && (
                        <VariantsList variants={product.variants} />
                    )}

                    <div className={styles.actionStack}>
                        <div className={styles.actionRow}>
                            {/* Minimalist Quantity */}
                            <div className={styles.quantitySelector}>
                                <button className={styles.qtyButton}>
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <input className={styles.qtyInput} type="number" defaultValue="1" />
                                <button className={styles.qtyButton}>
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                            {/* Add to Cart */}
                            <button className={styles.addToCartBtn}>
                                <span>Add to Collection</span>
                                <span className={`material-symbols-outlined ${styles.arrowIcon}`}>arrow_forward</span>
                            </button>
                        </div>
                        <p className={styles.shippingText}>
                            Free express shipping on orders over $75. Estimated delivery: 2-3 business days.
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.storyGrid}>
                <ProductDescription description={product.description} />
                <div className={styles.hiddenSpacer}></div>
                <ProductSpecification specifications={product.tech_spec} />
            </div>

        </div>
    );
};