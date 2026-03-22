import React from 'react';
import { Box, Typography, CircularProgress, Skeleton } from '@mui/material';
import { Lock, BadgeCheck } from 'lucide-react';
import { fetchForSession, initCheckout, type OrderSummary as OrderSummaryType } from '../../api/checkout';
import { OrderSummaryItem } from './OrderSummaryItem';
import { CouponForm } from './CouponForm';
import styles from './Checkout.module.css';

interface OrderSummaryProps {
  orderSummary?: OrderSummaryType;
  isLoading: boolean;
  isError: boolean;
  couponInput: string;
  setCouponInput: (value: string) => void;
  onApplyCoupon: () => void;
  selectedAddressId: string | null;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderSummary,
  isLoading,
  isError,
  couponInput,
  setCouponInput,
  onApplyCoupon,
  selectedAddressId,
}) => {
  const handleCheckout = async () => {
    const data = await initCheckout(selectedAddressId!);
    setInterval(() => handleUrl(data.orderId), 5000);
  }

  const handleUrl = async (id: string) => {
    const url = await fetchForSession(id);
    window.location.href = url;
  }

  return (
    <Box className={styles.summaryContainer}>
      <h2 className={styles.editorialHeader}>Order Summary</h2>

      {isLoading && (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 0 }} />
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 0 }} />
        </Box>
      )}

      {isError && (
        <Typography variant="body2" style={{ color: '#dc2626', marginBottom: '1.5rem', fontFamily: 'Manrope' }}>
          Failed to calculate order summary. Please try again.
        </Typography>
      )}

      {!isLoading && !isError && (
        <Box style={{ marginBottom: '2rem' }}>
          {/* Line items */}
          {orderSummary?.lineItems?.map((item, idx) => (
            <OrderSummaryItem key={idx} item={item} />
          ))}

          {/* Costs Section */}
          <Box className={styles.editorialCosts}>
            <Box className={styles.editorialCostRow}>
              <span className={styles.editorialCostLabel}>Subtotal</span>
              <span className={styles.editorialCostValue}>
                {orderSummary ? `$${orderSummary.subtotalBeforeDiscounts?.toFixed(2)}` : '—'}
              </span>
            </Box>

            <Box className={styles.editorialCostRow}>
              <span className={styles.editorialCostLabel}>Shipping</span>
              <span className={styles.editorialCostValue}>
                {orderSummary?.shippingCost ? `$${orderSummary.shippingCost.toFixed(2)}` : 'Free'}
              </span>
            </Box>

            {/* Total Row */}
            <Box className={styles.editorialTotalRow}>
              <span>Total</span>
              <span className={styles.editorialTotalValue}>
                {orderSummary ? `$${orderSummary.totalAmount?.toFixed(2)}` : '—'}
              </span>
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <CouponForm
          couponInput={couponInput}
          setCouponInput={setCouponInput}
          onApplyCoupon={onApplyCoupon}
          isLoading={isLoading}
        />
      </Box>

      <button
        className={styles.editorialCheckoutButton}
        disabled={!selectedAddressId || isLoading}
        onClick={handleCheckout}
      >
        {isLoading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          <>
            <Lock size={14} fill="currentColor" />
            <span style={{ whiteSpace: 'nowrap' }}>Secure Checkout</span>
          </>
        )}
      </button>

      <div className={styles.editorialFooter}>
        <BadgeCheck size={14} />
        PCI Compliance Guaranteed
      </div>
    </Box>
  );
};

