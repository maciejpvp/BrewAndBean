import { useState } from 'react';
import { useInventory } from '../../../hooks/useInventory';
import { InventoryHeader } from './InventoryHeader';
import { InventoryTable } from './InventoryTable';
import styles from './Inventory.module.css';

export const InventoryPage = () => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 0 });

    const {
        data,
        loading,
    } = useInventory(paginationModel);

    const { products, nextToken } = data;

    return (
        <div className={styles.container}>
            <InventoryHeader />
            <InventoryTable
                items={products}
                loading={loading}
                hasNextPage={!!nextToken}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
            />
        </div>
    );
};

export default InventoryPage;
