import styles from '../../pages/AdminDashboard.module.css'
import { Logo } from '../Logo';

export const Sidebar = () => {
    return (
        <div className={styles.Sidebar}>
            <Logo />
            <p className={styles.adminDashboardTitle}>Admin Dashboard</p>
        </div>
    );
};