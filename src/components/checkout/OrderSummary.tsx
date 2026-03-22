import React from 'react';
import { Box, Typography, Divider, CircularProgress, Skeleton, Button } from '@mui/material';
import { Lock } from 'lucide-react';
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
  console.log('handleCheckout', selectedAddressId);
  const data = await initCheckout(selectedAddressId!);
  console.log('orderId', data.orderId);
  setInterval(() => handleUrl(data.orderId), 5000);
}

const handleUrl = async (id: string) => {
  const url = await fetchForSession(id);
  window.location.href = url;
}

  return (
    <Box className={styles.summaryContainer}>
      <Typography variant="h5" className={styles.summaryTitle}>
        Order Summary
      </Typography>

      {isLoading && (
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="40%" height={28} />
          <Skeleton variant="text" width="50%" height={28} />
        </Box>
      )}

      {isError && (
        <Typography variant="body2" style={{ color: '#dc2626', marginBottom: '1.5rem' }}>
          Failed to calculate order summary. Please try again.
        </Typography>
      )}

      {!isLoading && !isError && (
        <Box style={{ marginBottom: '1.5rem' }}>
          {/* Line items */}
          {orderSummary?.lineItems?.map((item, idx) => (
            <OrderSummaryItem key={idx} item={item} />
          ))}

          <Box className={styles.summaryRow} style={{ marginTop: '0.75rem' }}>
            <Typography>Subtotal</Typography>
            <Typography className={styles.summaryRowValue}>
              {orderSummary ? `$${orderSummary.subtotalBeforeDiscounts?.toFixed(2)}` : '—'}
            </Typography>
          </Box>

          {/* Order level discounts */}
          {orderSummary?.appliedOrderRules?.map((rule, idx) => (
            <Box key={idx} className={styles.discountRow} style={{ paddingLeft: 0, marginBottom: '0.75rem' }}>
              <Typography className={styles.discountLabel}>{rule.replace(/_/g, ' ')}</Typography>
              <Typography className={styles.discountValue}>
                {idx === 0 ? `-$${orderSummary.orderDiscountTotal.toFixed(2)}` : ''}
              </Typography>
            </Box>
          ))}

          {/* Fallback if total discount exists but no rules listed */}
          {orderSummary && (orderSummary.orderDiscountTotal > 0 && (!orderSummary.appliedOrderRules || orderSummary.appliedOrderRules.length === 0)) && (
            <Box className={styles.summaryRow}>
              <Typography style={{ color: '#16a34a' }}>Discount</Typography>
              <Typography style={{ color: '#16a34a', fontWeight: 600 }}>
                -${orderSummary.orderDiscountTotal.toFixed(2)}
              </Typography>
            </Box>
          )}

          <Box className={styles.summaryRow}>
            <Typography>Shipping</Typography>
            <Typography className={styles.summaryRowValue}>
              {orderSummary?.shippingCost ? `$${orderSummary.shippingCost.toFixed(2)}` : 'Free'}
            </Typography>
          </Box>
        </Box>
      )}

      <CouponForm
        couponInput={couponInput}
        setCouponInput={setCouponInput}
        onApplyCoupon={onApplyCoupon}
        isLoading={isLoading}
      />

      <Divider className={styles.divider} />
      
      <Box className={styles.totalRow}>
        <Typography className={styles.totalLabel}>Total</Typography>
        <Typography className={styles.totalValue}>
          {isLoading
            ? <CircularProgress size={20} />
            : orderSummary
              ? `$${orderSummary.totalAmount?.toFixed(2)}`
              : '—'
          }
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        disabled={!selectedAddressId || isLoading}
        startIcon={<Lock size={18} />}
        onClick={handleCheckout}
        sx={{
          background: "linear-gradient(to right, #111827, #1f2937)",
          color: "white",
          fontWeight: 700,
          padding: '1rem',
          borderRadius: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontSize: '0.875rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: "linear-gradient(to right, #000000, #111827)",
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transform: 'translateY(-2px)'
          },
          "&.Mui-disabled": {
            background: "linear-gradient(to right, #f3f4f6, #f9fafb)",
            color: "#9ca3af",
            boxShadow: 'none',
            transform: 'none'
          }
        }}
      >
        Secure Checkout
      </Button>

      <Typography variant="caption" className={styles.secureMessage}>
        <Lock size={14} style={{ opacity: 0.7 }} /> Encrypted & Secure
      </Typography>
    </Box>
  );
};
