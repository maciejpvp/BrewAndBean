import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLogo}>Brew&amp;Bean</div>
                <div className={styles.footerLinks}>
                    <Link to="#" className={styles.footerLink}>Shipping Policy</Link>
                    <Link to="#" className={styles.footerLink}>Wholesale</Link>
                    <Link to="#" className={styles.footerLink}>Privacy</Link>
                    <Link to="#" className={styles.footerLink}>Contact</Link>
                </div>
                <div className={styles.footerCopyright}>
                    © 2026 Brew&amp;Bean Roastery. Handcrafted for the Modern Alchemist.
                </div>
            </div>
        </footer>
    );
};