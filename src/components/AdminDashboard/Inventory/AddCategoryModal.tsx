import { useRef } from 'react';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import type { Product } from '../../../types/product';
import { useManageCategory } from '../../../hooks/useManageCategory';
import styles from './AddStockModal.module.css';

interface AddCategoryModalProps {
    open: boolean;
    onClose: () => void;
    product?: Product | null;
    onSuccess?: () => void;
}

export const AddCategoryModal = ({ open, onClose, product, onSuccess }: AddCategoryModalProps) => {
    const categoryRef = useRef<HTMLInputElement>(null);
    const manageCategoryMutation = useManageCategory();
    const loading = manageCategoryMutation.isPending;

    const handleSubmit = async () => {
        if (!product || !categoryRef.current) return;
        const newCategory = categoryRef.current.value.trim();
        if (!newCategory) return;

        manageCategoryMutation.mutate(
            {
                productId: product.id,
                category: newCategory,
                mode: 'add',
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                    if (categoryRef.current) {
                        categoryRef.current.value = ''; // Reset input after success if needed
                    }
                },
                onError: () => {
                    console.error("Failed to add category");
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
                            Add Category
                        </h2>
                        <p className={styles.subtitle}>
                            {product ? `Adding category for ${product.name}` : 'No product selected'}
                        </p>
                    </div>

                    <div className={styles.inputSection}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Category Name</label>
                            <input 
                                type="text"
                                ref={categoryRef}
                                className={styles.input}
                                placeholder="e.g. Dark Roast"
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
                            {loading ? 'Adding...' : 'Add Category'}
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};
