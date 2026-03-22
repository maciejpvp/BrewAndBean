import React, { useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddress } from '../../api/address';
import { X } from 'lucide-react';
import styles from './Checkout.module.css';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip_code: z.string().regex(/^\d{2}-\d{3}$/, 'Zip code must be in XX-XXX format'),
    country: z.string().min(1, 'Country is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface AddAddressModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (newAddressId: string) => void;
}

export const AddAddressModal: React.FC<AddAddressModalProps> = ({ open, onClose, onSuccess }) => {
    const queryClient = useQueryClient();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            street: '',
            city: '',
            state: '',
            zip_code: '',
            country: 'Poland',
        }
    });

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const mutation = useMutation({
        mutationFn: createAddress,
        onSuccess: (newItem) => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            // Since newItem might lack ID if the backend doesn't return it yet, 
            // but normally a POST returns the created item.
            const newId = newItem.id || ''; 
            onSuccess(newId);
        }
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate(data);
    };

    return (
        <Modal open={open} onClose={(!mutation.isPending) ? onClose : () => {}} aria-labelledby="add-address-modal" className={styles.modalContainer}>
            <Box className={styles.modalBox}>
                
                {/* Decorative background blur */}
                <div className={styles.modalBgDecor}></div>

                <Box className={styles.modalHeader}>
                    <Box>
                        <Typography id="add-address-modal" variant="h5" className={styles.modalTitle}>
                            Add New Address
                        </Typography>
                        <Typography variant="body2" className={styles.modalSubtitle}>
                            Please fill in your shipping details
                        </Typography>
                    </Box>
                    <button onClick={onClose} disabled={mutation.isPending} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.formGrid}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Address Name (e.g. Home, Office)"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                disabled={mutation.isPending}
                                variant="outlined"
                            />
                        )}
                    />
                    
                    <Controller
                        name="street"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street Address"
                                fullWidth
                                error={!!errors.street}
                                helperText={errors.street?.message}
                                disabled={mutation.isPending}
                                variant="outlined"
                            />
                        )}
                    />

                    <div className={styles.formRow}>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="City"
                                    fullWidth
                                    error={!!errors.city}
                                    helperText={errors.city?.message}
                                    disabled={mutation.isPending}
                                />
                            )}
                        />
                        
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="State/Region"
                                    fullWidth
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={mutation.isPending}
                                />
                            )}
                        />
                    </div>

                    <div className={styles.formRow}>
                        <Controller
                            name="zip_code"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Zip Code (XX-XXX)"
                                    fullWidth
                                    error={!!errors.zip_code}
                                    helperText={errors.zip_code?.message}
                                    disabled={mutation.isPending}
                                />
                            )}
                        />
                        
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Country"
                                    fullWidth
                                    error={!!errors.country}
                                    helperText={errors.country?.message}
                                    disabled={mutation.isPending}
                                />
                            )}
                        />
                    </div>

                    <Box className={styles.formActions}>
                        <Button
                            variant="text"
                            onClick={onClose}
                            disabled={mutation.isPending}
                            sx={{ 
                                textTransform: 'none',
                                color: '#6b7280',
                                fontWeight: 700,
                                padding: '0.625rem 1.5rem',
                                borderRadius: '0.75rem',
                                '&:hover': { backgroundColor: '#f3f4f6' }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={mutation.isPending}
                            sx={{ 
                                textTransform: 'none',
                                backgroundColor: '#111827',
                                color: '#ffffff',
                                fontWeight: 700,
                                padding: '0.625rem 2rem',
                                borderRadius: '0.75rem',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                '&:hover': { 
                                    backgroundColor: '#000000',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    transform: 'translateY(-2px)'
                                },
                                '&:disabled': {
                                    backgroundColor: '#e5e7eb',
                                    color: '#9ca3af'
                                }
                            }}
                        >
                            {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Save Address'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};
