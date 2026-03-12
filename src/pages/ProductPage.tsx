import { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Chip,
    Divider,
    IconButton,
    Breadcrumbs,
    Link as MuiLink,
} from '@mui/material';
import {
    ArrowBackIosNew,
    ShoppingBagOutlined,
    AddShoppingCart,
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { getProductImageUrl } from '../types/product';

// Extracted Sub-components
import { ProductPageSkeleton } from '../components/products/product-detail/ProductPageSkeleton';
import { QuantitySelector } from '../components/products/product-detail/QuantitySelector';
import { ProductTrustBadges } from '../components/products/product-detail/ProductTrustBadges';

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: product, isLoading, isError, error } = useProduct(id);
    const [quantity, setQuantity] = useState(1);

    if (isLoading) return <ProductPageSkeleton />;

    if (isError || !product) {
        return (
            <Container maxWidth="xl" sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    {(error as Error)?.message ?? 'Product not found.'}
                </Typography>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                    Go back
                </Button>
            </Container>
        );
    }

    const imageUrl = getProductImageUrl(product.media);
    const isOutOfStock = product.stock === 0;
    const isLowStock = product.stock > 0 && product.stock <= 10;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Container maxWidth="xl" sx={{ py: 5 }}>

                {/* Breadcrumb */}
                <Breadcrumbs sx={{ mb: 3, fontSize: '0.875rem' }}>
                    <MuiLink component={Link} to="/" underline="hover" color="text.secondary">
                        Home
                    </MuiLink>
                    <MuiLink component={Link} to={`/products?category=${product.categories.at(0)?.slug}`} underline="hover" color="text.secondary">
                        {product.categories.at(0)?.name}
                    </MuiLink>
                    <Typography variant="body2" color="text.primary" fontWeight={600}>
                        {product.name}
                    </Typography>
                </Breadcrumbs>

                <Grid container spacing={{ xs: 4, md: 8 }}>

                    {/* ── Left: Image + Description ──────────────────── */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* Image */}
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 4,
                                overflow: 'hidden',
                                bgcolor: '#F7F3EE',
                                aspectRatio: '1 / 1',
                                boxShadow: '0 8px 40px rgba(61,43,31,0.1)',
                                mb: 3,
                            }}
                        >
                            {imageUrl ? (
                                <Box
                                    component="img"
                                    src={imageUrl}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'rgba(61,43,31,0.15)',
                                    }}
                                >
                                    <ShoppingBagOutlined sx={{ fontSize: 96 }} />
                                </Box>
                            )}

                            {isOutOfStock && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        bgcolor: 'rgba(35,23,9,0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Chip
                                        label="Out of Stock"
                                        sx={{
                                            bgcolor: 'rgba(35,23,9,0.8)',
                                            color: '#F5F5F1',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            height: 40,
                                            px: 1,
                                            backdropFilter: 'blur(8px)',
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>

                        {/* Description below image */}
                        {product.description && (
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'primary.main',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        mb: 1,
                                        fontSize: '0.7rem',
                                    }}
                                >
                                    About this product
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', lineHeight: 1.8 }}
                                >
                                    {product.description}
                                </Typography>
                            </Box>
                        )}
                    </Grid>

                    {/* ── Right: Details ─────────────────────────────── */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            {/* Back */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <IconButton
                                    size="small"
                                    onClick={() => navigate(-1)}
                                    sx={{ mr: 1, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                >
                                    <ArrowBackIosNew fontSize="small" />
                                </IconButton>
                                <Typography variant="body2" color="text.secondary">Back</Typography>
                            </Box>

                            {/* Name */}
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    color: 'primary.main',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.2,
                                    mb: 1.5,
                                }}
                            >
                                {product.name}
                            </Typography>

                            {/* Price + stock badge */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: 800, color: '#6F4E37', letterSpacing: '-0.01em' }}
                                >
                                    ${product.price.toFixed(2)}
                                </Typography>

                                {isLowStock && (
                                    <Chip
                                        label={`Only ${product.stock} left`}
                                        size="small"
                                        sx={{
                                            bgcolor: '#FFF3E0',
                                            color: '#BC8A5F',
                                            fontWeight: 700,
                                            border: '1px solid #D4A373',
                                        }}
                                    />
                                )}
                                {isOutOfStock && (
                                    <Chip
                                        label="Out of stock"
                                        size="small"
                                        sx={{
                                            bgcolor: '#FAFAFA',
                                            color: 'text.secondary',
                                            fontWeight: 600,
                                            border: '1px solid #E0E0E0',
                                        }}
                                    />
                                )}
                            </Box>

                            <Divider sx={{ mb: 3, borderColor: 'rgba(61,43,31,0.1)' }} />

                            {/* Quantity + Add to Cart */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                                <QuantitySelector
                                    value={quantity}
                                    max={product.stock}
                                    onChange={setQuantity}
                                />
                                <Button
                                    variant="contained"
                                    disabled={isOutOfStock}
                                    startIcon={<AddShoppingCart />}
                                    sx={{
                                        flexGrow: 1,
                                        height: 48,
                                        borderRadius: 2.5,
                                        background: isOutOfStock
                                            ? undefined
                                            : 'linear-gradient(135deg, #3D2B1F 0%, #6F4E37 100%)',
                                        fontWeight: 700,
                                        letterSpacing: '0.01em',
                                        boxShadow: '0 6px 20px rgba(61,43,31,0.2)',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            boxShadow: '0 10px 28px rgba(61,43,31,0.3)',
                                            transform: 'translateY(-1px)',
                                        },
                                        '&:active': { transform: 'translateY(0)' },
                                    }}
                                >
                                    {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                            </Box>

                            {/* Trust badges */}
                            <ProductTrustBadges />

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
