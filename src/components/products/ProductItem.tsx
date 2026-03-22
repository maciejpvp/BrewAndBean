import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
    Skeleton,
} from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import type { Product } from '../../types/product';
import { getProductId, getProductImageUrl } from '../../types/product';

interface ProductItemProps {
    product: Product;
    onClick?: (id: string) => void;
}

export const ProductItem = ({ product, onClick }: ProductItemProps) => {
    const id = getProductId(product);
    const imageUrl = getProductImageUrl(product.media);
    const isOutOfStock = product.stock === 0;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 0,
                border: 'none',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 24px 60px rgba(23, 24, 24, 0.08)',
                },
            }}
        >
            <CardActionArea
                onClick={() => onClick?.(id)}
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
                {/* Product image */}
                <Box sx={{ position: 'relative', pt: '65%', bgcolor: '#F7F3EE' }}>
                    {imageUrl ? (
                        <CardMedia
                            component="img"
                            image={imageUrl}
                            alt={product.name}
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(61,43,31,0.2)',
                            }}
                        >
                            <ShoppingBagOutlined sx={{ fontSize: 48 }} />
                        </Box>
                    )}

                    {isOutOfStock && (
                        <Chip
                            label="Out of stock"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 16,
                                left: 16,
                                bgcolor: '#171818',
                                color: '#fbf9f5',
                                borderRadius: 0,
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}
                        />
                    )}
                </Box>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1, p: 2.5, pb: '16px !important' }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            lineHeight: 1.3,
                            mb: 0.75,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {product.name}
                    </Typography>

                    {product.description && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: 1.5,
                            }}
                        >
                            {product.description}
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                color: 'primary.main',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            ${product.price.toFixed(2)}
                        </Typography>
                        {product.stock > 0 && product.stock <= 10 && (
                            <Typography variant="caption" sx={{ color: '#BC8A5F', fontWeight: 600 }}>
                                Only {product.stock} left
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

/** Skeleton placeholder with the same card dimensions */
export const ProductItemSkeleton = () => (
    <Card sx={{ borderRadius: 0, border: 'none', bgcolor: 'background.paper', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" sx={{ pt: '65%' }} />
        <CardContent sx={{ p: 2.5 }}>
            <Skeleton variant="text" sx={{ fontSize: '1.1rem', mb: 0.5 }} />
            <Skeleton variant="text" sx={{ fontSize: '0.85rem', width: '80%', mb: 0.5 }} />
            <Skeleton variant="text" sx={{ fontSize: '0.85rem', width: '60%', mb: 2 }} />
            <Skeleton variant="text" sx={{ fontSize: '1.25rem', width: '40%' }} />
        </CardContent>
    </Card>
);
