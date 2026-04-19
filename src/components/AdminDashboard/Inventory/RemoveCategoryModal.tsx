import { useState } from 'react';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import type { Product } from '../../../types/product';
import { useManageCategory } from '../../../hooks/useManageCategory';
import styles from './AddStockModal.module.css';

interface RemoveCategoryModalProps {
    open: boolean;
    onClose: () => void;
    product?: Product | null;
    categoryToRemove?: string;
    onSuccess?: () => void;
}

export const RemoveCategoryModal = ({ open, onClose, product, categoryToRemove, onSuccess }: RemoveCategoryModalProps) => {
    const [confirmText, setConfirmText] = useState('');
    const manageCategoryMutation = useManageCategory();
    const loading = manageCategoryMutation.isPending;

    const handleSubmit = async () => {
        if (!product || !categoryToRemove || confirmText !== categoryToRemove) return;

        manageCategoryMutation.mutate(
            {
                productId: product.id,
                category: categoryToRemove,
                mode: 'delete',
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                    setConfirmText('');
                },
                onError: () => {
                    console.error("Failed to remove category");
                }
            }
        );
    };

    const handleClose = () => {
        setConfirmText('');
        onClose();
    };

    const isConfirmed = confirmText === categoryToRemove;

    return (
        <Modal
            open={open}
            onClose={handleClose}
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
                            Remove Category
                        </h2>
                        <p className={styles.subtitle}>
                            {product ? `Permanently removing from ${product.name}` : 'No product selected'}
                        </p>
                    </div>

                    <div className={styles.inputSection}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>
                                Type "{categoryToRemove}" to confirm
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                className={styles.input}
                                placeholder="Enter category name"
                                disabled={loading}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.secondaryBtn} onClick={handleClose} disabled={loading}>
                            Cancel
                        </button>
                        <button
                            className={styles.primaryBtn}
                            onClick={handleSubmit}
                            disabled={loading || !product || !isConfirmed}
                            style={{
                                backgroundColor: isConfirmed && !loading ? '#d32f2f' : undefined,
                            }}
                        >
                            {loading ? 'Removing...' : 'Confirm Remove'}
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};
