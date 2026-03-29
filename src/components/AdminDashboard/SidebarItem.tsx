import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from '../../pages/AdminDashboard.module.css';

interface SidebarItemProps {
    label: string;
    path: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export const SidebarItem = ({ label, path, icon, disabled }: SidebarItemProps) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) => clsx(
                styles.SidebarItem,
                isActive && styles.active,
                disabled && styles.disabled
            )}
            onClick={(e) => disabled && e.preventDefault()}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
        </NavLink>
    );
};