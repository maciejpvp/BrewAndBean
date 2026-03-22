import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAddresses } from '../../api/address';
import { AddressCard } from './AddressCard';
import { AddAddressModal } from './AddAddressModal';
import { Button, Typography, Box, Skeleton } from '@mui/material';
import { Plus, MapPin } from 'lucide-react';
import styles from './Checkout.module.css';

interface AddressListProps {
    onAddressSelected: (addressId: string | null) => void;
}

export const AddressList: React.FC<AddressListProps> = ({ onAddressSelected }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: addresses, isLoading, isError } = useQuery({
        queryKey: ['addresses'],
        queryFn: fetchAddresses,
    });

    useEffect(() => {
        (async () => {
            console.log("I got here")
            if (addresses && addresses.length > 0) {
                const defaultAddress = addresses.find(a => a.is_default);
                
                if (!selectedId && defaultAddress) {
                    const defaultId = defaultAddress.id || defaultAddress.name || 'default';
                    await setSelectedId(defaultId);
                    onAddressSelected(defaultId);
                }
            } else if (addresses && addresses.length === 0) {
                setIsModalOpen(true);
                setSelectedId(null);
                onAddressSelected(null);
            }
        })()
    }, [addresses, selectedId, onAddressSelected]);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        onAddressSelected(id);
    };

    const handleModalSuccess = (newId: string) => {
        setIsModalOpen(false);
        if (newId) {
            handleSelect(newId);
        } else {
            // we will let the useEffect pick it up if ID isn't returned
            setSelectedId(null); 
        }
    };

    if (isLoading) {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton variant="text" width={200} height={40} style={{ borderRadius: '0.5rem' }} />
                    <Skeleton variant="rectangular" width={140} height={36} style={{ borderRadius: '0.75rem' }} />
                </Box>
                <div className={styles.addressGrid}>
                    <Skeleton variant="rectangular" height={160} style={{ borderRadius: '1rem', width: '100%', backgroundColor: '#f3f4f6' }} />
                    <Skeleton variant="rectangular" height={160} style={{ borderRadius: '1rem', width: '100%', backgroundColor: '#f3f4f6' }} />
                </div>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box className={styles.errorState}>
                <Typography style={{ fontWeight: 500 }}>Error loading addresses. Please try again later.</Typography>
            </Box>
        );
    }

    return (
        <React.Fragment>
            <Box className={styles.listHeader}>
                <Box>
                    <Typography variant="h5" className={styles.listTitle}>
                        Shipping Address
                    </Typography>
                    <Typography variant="body2" className={styles.listSubtitle}>
                        Where should we send your order?
                    </Typography>
                </Box>
                <Button 
                    startIcon={<Plus size={18} />} 
                    variant="outlined"
                    onClick={() => setIsModalOpen(true)}
                    sx={{ 
                        textTransform: 'none', 
                        borderColor: '#e5e7eb', 
                        color: '#1f2937', 
                        fontWeight: 700, 
                        borderRadius: '0.75rem', 
                        padding: '0.625rem 1.25rem',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#f9fafb',
                            borderColor: '#d1d5db'
                        }
                    }}
                >
                    Add New Address
                </Button>
            </Box>
            
            <Box className={styles.addressGrid}>
                {addresses?.map((address, index) => {
                    const uniqueId = address.id || address.name || String(index);
                    return (
                        <AddressCard 
                            key={uniqueId}
                            address={address} 
                            isSelected={selectedId === uniqueId}
                            onSelect={() => handleSelect(uniqueId)}
                        />
                    );
                })}
            </Box>

            {!addresses || addresses.length === 0 ? (
                <Box className={styles.emptyState}>
                    <Box className={styles.emptyStateIconWrapper}>
                        <MapPin size={32} />
                    </Box>
                    <Typography variant="h6" className={styles.emptyStateTitle}>
                        No addresses found
                    </Typography>
                    <Typography variant="body2" className={styles.emptyStateSubtitle}>
                        Add a shipping address to your account to complete your checkout process smoothly.
                    </Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<Plus size={18} />}
                        onClick={() => setIsModalOpen(true)}
                        sx={{ 
                            textTransform: 'none',
                            backgroundColor: '#111827',
                            color: '#ffffff',
                            padding: '0.75rem 2rem',
                            borderRadius: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.025em',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#000000',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        Add Your First Address
                    </Button>
                </Box>
            ) : null}

            <AddAddressModal 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={handleModalSuccess} 
            />
        </React.Fragment>
    );
};
