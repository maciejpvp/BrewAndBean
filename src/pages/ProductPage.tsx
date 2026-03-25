import { ProductMedia } from '../components/products/product-detail/ProductMedia';
import { ProductDescription } from '../components/products/product-detail/ProductDescription';
import { ProductSpecification } from '../components/products/product-detail/ProductSpecification';
import styles from './ProductPage.module.css';
import type { Product } from '../types/product';

const MOCK_PRODUCT: Product = {
  id: "p1",
  name: "Ethiopian Yirgacheffe",
  subtitle: "Micro Batch",
  description: "Hidden within the high-altitude Gedeo Zone, our Yirgacheffe Micro Batch represents the pinnacle of Ethiopian coffee heritage. This particular lot was harvested from heirloom varieties grown at 2,100 meters, where the cool nights slow the maturation of the cherry, resulting in an extraordinary density of flavor.\n\nWe have applied an exacting light roast profile to preserve the delicate, tea-like body and the signature jasmine aromatics. Each cup unfolds with layers of sweet lemon curd and a sophisticated bergamot finish—a profile we call \"Liquid Gold.\"",
  price: 34.00,
  stock: 12,
  media: [
    {
      type: "image",
      key: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsrVtosEsVjOkbct4yzlnOWX2lRbF0kefSKZ4EmL8tg90l3Tc3hrHoUPqmvg0D_FNBZtS6iTITI8peSABxOu1obYFYGkvBtg31D3kO7tqOWniBLvDZlxsoJkteaoJqzDzWYk3sjUEssOhExqfihXByrnkoVAORgWpscjm52xK0GG0Vz0sD9ONhdF_AzvwmJH2MZCQQtj2dHTzCWsAEtBmZsuVsoprHSuC-52y_C8z_aDWoXJWReGUMyRfTgmWW3yh47D4ePa_8Agw",
      isMain: true
    }
  ],
  categories: [
    { name: "Shop", slug: "shop" },
    { name: "Single Origin", slug: "single-origin" }
  ],
  tech_spec: [
    { label: "Origin", value: "Yirgacheffe, Gedeo, Ethiopia" },
    { label: "Altitude", value: "1,900 – 2,150 MASL" },
    { label: "Process", value: "Washed, Sun-Dried on Raised Beds" },
    { label: "Varietal", value: "Heirloom (JARC selections)" },
    { label: "Tasting Notes", value: "Jasmine, Bergamot, Meyer Lemon" }
  ],
  attributes: {
    roastLevel: "Dark",
    roastPercent: 85,
    profile: "Dark Chocolate & Caramel",
    weight: "250g Whole Bean"
  },
  version: 1,
  created_at: 1711364000000 // Fixed timestamp for consistency
};

export const ProductPage = () => {
    const product = MOCK_PRODUCT;
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
                        <span className={styles.pageSubtitle}>— {product.subtitle}</span>
                    </h1>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>${product.price.toFixed(2)}</span>
                        <span className={styles.weight}>{product.attributes.weight}</span>
                    </div>

                    {/* Product Attributes Bento */}
                    <div className={styles.bentoGrid}>
                        {product.attributes.roastLevel && <div className={styles.bentoCard}>
                            <p className={styles.bentoLabel}>Roast Level</p>
                            <div className={styles.roastFlex}>
                                <div className={styles.roastTrack}>
                                    <div className={styles.roastFill} style={{ width: `${product.attributes.roastPercent}%` }}></div>
                                </div>
                                <span className={styles.bentoValue}>{product.attributes.roastLevel}</span>
                            </div>
                        </div>}
                        {product.attributes.profile && <div className={styles.bentoCard}>
                            <p className={styles.bentoLabel}>Profile</p>
                            <span className={styles.bentoValue}>{product.attributes.profile}</span>
                        </div>}
                    </div>

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