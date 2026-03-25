import styles from './ProductDescription.module.css';

export const ProductDescription = ({ description }: { description: string }) => {
    // Split the description string into paragraphs based on newlines
    const paragraphs = description.split('\n').filter((p) => p.trim() !== '');

    return (
        <div className={styles.descriptionWrapper}>
            <h2 className={styles.title}>The Description</h2>
            <div className={styles.textContainer}>
                {paragraphs.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
        </div>
    );
};
