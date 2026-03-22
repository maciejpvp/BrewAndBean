import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import styles from './Checkout.module.css';

interface CouponFormProps {
  couponInput: string;
  setCouponInput: (value: string) => void;
  onApplyCoupon: () => void;
  isLoading: boolean;
}

export const CouponForm: React.FC<CouponFormProps> = ({
  couponInput,
  setCouponInput,
  onApplyCoupon,
  isLoading,
}) => {
  return (
    <Box className={styles.couponContainer}>
      <TextField
        size="small"
        placeholder="Coupon Code"
        value={couponInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCouponInput(e.target.value)}
        className={styles.couponInput}
        disabled={isLoading}
      />
      <Button
        variant="outlined"
        onClick={onApplyCoupon}
        className={styles.couponButton}
        disabled={isLoading}
        sx={{ borderColor: '#e5e7eb', color: '#111827' }}
      >
        Apply
      </Button>
    </Box>
  );
};
