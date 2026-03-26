import { Box, Grid, Typography, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductItem, ProductItemSkeleton } from './ProductItem';
import { useProductsByCategory } from '../../hooks/useProductsByCategory';

import type { Product } from '../../types/product';

interface ProductListProps {
    category?: string;
    categoryLabel?: string;
    products?: Product[];
    isLoading?: boolean;
}

const SKELETON_COUNT = 8;

export const ProductList = ({ category = '', categoryLabel, products: propProducts, isLoading: propIsLoading }: ProductListProps) => {
    const navigate = useNavigate();
    const { data: fetchedProducts, isLoading: isFetching, isError: isFetchError, error: fetchError, refetch } = useProductsByCategory(propProducts ? null : category);

    const products = propProducts || fetchedProducts;
    const isLoading = propIsLoading || (!propProducts && isFetching);
    const isError = !propProducts && isFetchError;
    const error = fetchError;

    const handleProductClick = (id: string) => {
        navigate(`/product/${id}`);
    };

    return (
        <Box>
            {/* Section header */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 800,
                        color: 'primary.main',
                        letterSpacing: '-0.02em',
                        textTransform: 'capitalize',
                    }}
                >
                    {categoryLabel ?? category.replace(/-/g, ' ')}
                </Typography>
                {!isLoading && !isError && products && products.length > 0 && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {products.length} {products.length === 1 ? 'product' : 'products'}
                    </Typography>
                )}
            </Box>

            {/* Error state */}
            {isError && (
                <Alert
                    severity="error"
                    action={
                        <Button color="inherit" size="small" onClick={() => refetch()}>
                            Retry
                        </Button>
                    }
                    sx={{ mb: 3, borderRadius: 2 }}
                >
                    {(error as Error)?.message ?? 'Failed to load products.'}
                </Alert>
            )}

            {/* Empty state */}
            {!isLoading && !isError && products?.length === 0 && (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 10,
                        color: 'text.secondary',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        No products found
                    </Typography>
                    <Typography variant="body2">
                        There are no products in this category yet.
                    </Typography>
                </Box>
            )}

            {/* Grid */}
            <Grid container spacing={3}>
                {isLoading
                    ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <ProductItemSkeleton />
                        </Grid>
                    ))
                    : products?.map((product) => (
                        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <ProductItem product={product} onClick={handleProductClick} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};
