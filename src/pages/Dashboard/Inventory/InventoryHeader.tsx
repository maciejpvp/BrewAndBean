import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import styles from './Inventory.module.css';

export const InventoryHeader = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <h1 className={styles.pageTitle}>Inventory</h1>
            <button 
                className={styles.primaryButton}
                onClick={() => navigate('/dashboard/inventory/new')}
            >
                <AddIcon /> Add New Product
            </button>
        </div>
    );
};
