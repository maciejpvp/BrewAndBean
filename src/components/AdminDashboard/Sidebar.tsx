import styles from '../../pages/AdminDashboard.module.css'
import { getUser } from '../../utils/getUser';
import { useTheme } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { SidebarItem } from './SidebarItem';

const SIDEBAR_ITEMS = [
    {
        label: 'Inventory',
        path: '/dashboard/inventory',
        icon: <InventoryIcon />,
    },
    {
        label: 'Orders',
        path: '/dashboard/orders',
        icon: <ShoppingCartIcon />,
        disabled: true,
    },
    {
        label: 'Users',
        path: '/dashboard/users',
        icon: <PeopleIcon />,
        disabled: true,
    },
];

export const Sidebar = () => {
    const user = getUser();
    const theme = useTheme();

    return (
        <div className={styles.Sidebar} style={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0
        }}>
            <div style={{ padding: '1rem 0', marginBottom: '1rem' }}>
                <h1 style={{ 
                    fontSize: '1.25rem', 
                    margin: 0,
                    opacity: 0.9,
                    letterSpacing: '0.05em'
                }}>
                    {user.firstName} {user.lastName}
                </h1>
                <p style={{ 
                    fontSize: '0.75rem', 
                    margin: '0.25rem 0 0', 
                    opacity: 0.6,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    Administrator
                </p>
            </div>

            <div className={styles.SidebarItems}>
                {SIDEBAR_ITEMS.map((item) => (
                    <SidebarItem key={item.path} {...item} />
                ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <button 
                    className={styles.SidebarItem} 
                    style={{ 
                        background: 'transparent', 
                        border: 'none', 
                        width: '100%', 
                        textAlign: 'left',
                        cursor: 'pointer'
                    }}
                    onClick={() => console.log('Logout clicked')}
                >
                    <span className={styles.icon}><LogoutIcon /></span>
                    <span className={styles.label}>Logout</span>
                </button>
            </div>
        </div>
    );
};