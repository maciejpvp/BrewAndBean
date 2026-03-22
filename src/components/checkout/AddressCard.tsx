import React from 'react';
import type { Address } from '../../types/address';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CheckCircle2, MapPin } from 'lucide-react';
import clsx from 'clsx';
import styles from './Checkout.module.css';

interface AddressCardProps {
    address: Address;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({ address, isSelected, onSelect }) => {
    return (
        <Card
            onClick={() => onSelect(address.id || address.name || 'unknown')}
            className={clsx(
                styles.card,
                isSelected ? styles.cardSelected : styles.cardUnselected
            )}
            elevation={0}
        >
            {/* Background Gradient overlay if selected */}
            <div className={clsx(
                styles.cardGradient,
                isSelected && styles.cardGradientSelected
            )} />

            {isSelected && (
                <Box className={styles.cardCheckIcon}>
                    <CheckCircle2 size={24} style={{ fill: 'currentColor' }} />
                </Box>
            )}
            
            <CardContent className={styles.cardContent}>
                <Box className={styles.cardHeader}>
                    <Box className={clsx(
                        styles.cardIcon,
                        isSelected ? styles.cardIconSelected : styles.cardIconUnselected
                    )}>
                        <MapPin size={20} />
                    </Box>
                    <Typography component="h6" className={clsx(
                        styles.cardTitle,
                        isSelected ? styles.cardTitleSelected : styles.cardTitleUnselected
                    )}>
                        {address.name || 'Saved Address'}
                    </Typography>
                    {address.is_default && (
                        <span className={styles.defaultBadge}>
                            Default
                        </span>
                    )}
                </Box>
                
                <Box className={styles.addressDetails}>
                    <Typography variant="body2" className={clsx(
                        styles.addressText,
                        isSelected ? styles.addressTextSelected : styles.addressTextUnselected
                    )}>
                        {address.street}
                    </Typography>
                    <Typography variant="body2" className={clsx(
                        styles.addressText,
                        isSelected ? styles.addressTextSelected : styles.addressTextUnselected
                    )}>
                        {`${address.city}, ${address.state} ${address.zip_code}`}
                    </Typography>
                    <Typography variant="body2" className={styles.addressCountry}>
                        {address.country}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
