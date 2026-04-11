import { useRef } from 'react';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import type { Product } from '../../../types/product';
import { useUpdateStock } from '../../../hooks/useUpdateStock';
import styles from './AddStockModal.module.css';

interface AddStockModalProps {
    open: boolean;
    onClose: () => void;
    product?: Product | null;
    onSuccess?: () => void;
}

export const AddStockModal = ({ open, onClose, product, onSuccess }: AddStockModalProps) => {
    const stockRef = useRef<HTMLInputElement>(null);
    const updateStockMutation = useUpdateStock();
    const loading = updateStockMutation.isPending;

    const handleSubmit = async () => {
        if (!product || !stockRef.current) return;
        const newStock = parseInt(stockRef.current.value, 10);
        if (isNaN(newStock)) return;

        updateStockMutation.mutate(
            {
                id: product.id,
                stock: newStock,
                version: product.version,
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                },
                onError: () => {
                    console.error("Failed to update stock");
                }
            }
        );
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                    className: styles.backdrop,
                },
            }}
        >
            <Fade in={open}>
                <Box className={styles.modalContainer}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>
                            Add Stock
                        </h2>
                        <p className={styles.subtitle}>
                            {product ? `Updating reserves for ${product.name}` : 'No product selected'}
                        </p>
                    </div>

                    <div className={styles.inputSection}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>New Reserve Amount</label>
                            <input 
                                type="number" 
                                ref={stockRef}
                                className={styles.input}
                                defaultValue={product?.stock}
                                disabled={loading}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.secondaryBtn} onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button className={styles.primaryBtn} onClick={handleSubmit} disabled={loading || !product}>
                            {loading ? 'Updating...' : 'Confirm Update'}
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};