import styles from './ProductSpecification.module.css';
import type { Product } from '../../../types/product';

interface ProductSpecificationProps {
    specifications: Product['tech_spec'] | undefined;
}

export const ProductSpecification = ({ specifications }: ProductSpecificationProps) => {
    if (!specifications) return null;

    return (
        <div className={styles.specWrapper}>
            <h2 className={styles.title}>Technical Specifications</h2>
            <dl className={styles.list}>
                {specifications.map((spec, index) => (
                    <div key={index} className={styles.item}>
                        <dt className={styles.label}>{spec.label}</dt>
                        <dd className={styles.value}>{spec.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
