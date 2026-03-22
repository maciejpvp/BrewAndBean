import React, { useState } from 'react';
import { AddressList } from '../components/checkout/AddressList';
import { Box, Typography } from '@mui/material';
import styles from '../components/checkout/Checkout.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchCart } from '../api/cart';
import { calculateCheckout } from '../api/checkout';
import { OrderSummary } from '../components/checkout/OrderSummary';

export const CheckoutPage: React.FC = () => {
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | undefined>(undefined);

    // Fetch cart items
    const { data: cartData } = useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart,
    });

    // Map cart items to CartItemInput format
    const cartItems = (cartData?.cartItems ?? []).map(item => ({
        productId: item.item.PK.replace('PRODUCT#', ''),
        quantity: item.quantity,
    }));

    // Fetch order summary — only runs once we have cart items
    const {
        data: orderSummary,
        isLoading: isSummaryLoading,
        isError: isSummaryError,
    } = useQuery({
        queryKey: ['orderSummary', cartItems, appliedCoupon],
        queryFn: () =>
            calculateCheckout({
                userId: '',
                orderId: '',
                cartItems,
                couponCode: appliedCoupon,
            }),
        enabled: cartItems.length > 0,
    });

    const handleApplyCoupon = () => {
        setAppliedCoupon(couponInput || undefined);
    };

    return (
        <Box className={styles.pageContainer}>
            <Box className={styles.contentWrapper}>
                
                {/* Header */}
                <Box className={styles.header}>
                    <Typography variant="h3" className={styles.headerTitle}>
                        Checkout
                    </Typography>
                    <Typography variant="subtitle1" className={styles.headerSubtitle}>
                        Complete your order securely
                    </Typography>
                </Box>

                <Box className={styles.grid}>
                    
                    {/* Left Column: Address Selection */}
                    <Box className={styles.leftColumn}>
                        <Box className={styles.addressContainer}>
                            <AddressList onAddressSelected={setSelectedAddressId} />
                        </Box>
                    </Box>

                    {/* Right Column: Order Summary */}
                    <Box className={styles.rightColumn}>
                        <OrderSummary
                            orderSummary={orderSummary}
                            isLoading={isSummaryLoading}
                            isError={isSummaryError}
                            couponInput={couponInput}
                            setCouponInput={setCouponInput}
                            onApplyCoupon={handleApplyCoupon}
                            selectedAddressId={selectedAddressId}
                        />
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    );
};
