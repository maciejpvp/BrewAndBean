import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import type { OrderSummaryItem as OrderSummaryItemType } from '../../api/checkout';
import styles from './Checkout.module.css';

interface OrderSummaryItemProps {
  item: OrderSummaryItemType;
}

export const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ item }) => {
  return (
    <Box className={styles.summaryRow}>
      <Typography variant="body2">
        {item.name} × {item.quantity}
      </Typography>
      <Tooltip 
        title={item.discountApplied > 0 ? `Applied: ${item.appliedRules.join(', ').replace(/_/g, ' ')}` : ""}
        placement="top"
        arrow
      >
        <Box style={{ display: 'flex', alignItems: 'center', cursor: item.discountApplied > 0 ? 'help' : 'default' }}>
          {item.discountApplied > 0 && (
            <Typography className={styles.itemBasePrice}>
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </Typography>
          )}
          &nbsp;
          <Typography variant="body2" className={styles.summaryRowValue}>
            ${item.subtotal?.toFixed(2) ?? '-'}
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
};
