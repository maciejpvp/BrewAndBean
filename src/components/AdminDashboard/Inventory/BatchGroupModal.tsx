import { useRef } from 'react';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
import { useManageGroup } from '../../../hooks/useManageGroup';
import styles from './AddStockModal.module.css';

interface BatchGroupModalProps {
    open: boolean;
    onClose: () => void;
    selectedIds: string[];
    onSuccess?: () => void;
}

export const BatchGroupModal = ({ open, onClose, selectedIds, onSuccess }: BatchGroupModalProps) => {
    const groupRef = useRef<HTMLInputElement>(null);
    const manageGroupMutation = useManageGroup();
    const loading = manageGroupMutation.isPending;

    const handleSubmit = async () => {
        if (selectedIds.length === 0 || !groupRef.current) return;
        const newGroup = groupRef.current.value.trim();
        if (!newGroup) return;

        manageGroupMutation.mutate(
            {
                productIds: selectedIds,
                group: newGroup,
                mode: 'add',
            },
            {
                onSuccess: () => {
                    onSuccess?.();
                    onClose();
                    if (groupRef.current) {
                        groupRef.current.value = '';
                    }
                },
                onError: () => {
                    console.error("Failed to add group");
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
                            Add to Group
                        </h2>
                        <p className={styles.subtitle}>
                            {`Creating group for ${selectedIds.length} selected items`}
                        </p>
                    </div>

                    <div className={styles.inputSection}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Group Name</label>
                            <input
                                type="text"
                                ref={groupRef}
                                className={styles.input}
                                placeholder="e.g. Winter Collection"
                                disabled={loading}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.secondaryBtn} onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button className={styles.primaryBtn} onClick={handleSubmit} disabled={loading || selectedIds.length === 0}>
                            {loading ? 'Adding...' : 'Add Group'}
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};
