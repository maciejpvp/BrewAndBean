import React from 'react';
import { Box } from '@mui/material';
import type { OrderSummaryItem as OrderSummaryItemType } from '../../api/checkout';
import { getProductImageUrl } from '../../types/product';
import styles from './Checkout.module.css';

interface OrderSummaryItemProps {
  item: OrderSummaryItemType;
}

export const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ item }) => {
  const imageUrl = item.media ? getProductImageUrl(item.media) : null;

  return (
    <Box className={styles.editorialItem}>
      {/* Product Image */}
      <Box className={styles.editorialItemImageContainer}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={item.name} 
            className={styles.editorialItemImage} 
          />
        ) : (
          <Box className={styles.editorialItemImage} style={{ backgroundColor: '#e5e1d8' }} />
        )}
      </Box>

      {/* Product Info */}
      <Box className={styles.editorialItemInfo}>
        <Box className={styles.editorialItemHeader}>
          <h3 className={styles.editorialItemName}>{item.name}</h3>
          <span className={styles.editorialItemPrice}>${item.subtotal?.toFixed(2) ?? '-'}</span>
        </Box>
        
        <p className={styles.editorialItemQty}>Quantity: {item.quantity}</p>
      </Box>
    </Box>
  );
};

