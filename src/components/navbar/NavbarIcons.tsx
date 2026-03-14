import { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Badge, Popover, Typography, Button, Divider } from '@mui/material';
import {
    PersonOutline as UserIcon,
    FavoriteBorder as HeartIcon,
    LocalMallOutlined as CartIcon,
    Add,
    Remove,
    DeleteOutline,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useCart, useUpdateCart } from '../../hooks/useCart';
import { getProductImageUrl } from '../../types/product';

export const NavbarIcons = () => {
    const navigate = useNavigate();
    const { data: cartResponse } = useCart();
    
    // Clear optimistic quantities when the mutation succeeds to let server data take over
    const { mutate: performUpdate } = useUpdateCart();
    const updateCart = (productId: string, quantity: number) => {
        performUpdate({ productId, quantity }, {
            onSuccess: () => {
                setOptimisticQuantities(prev => {
                    const next = { ...prev };
                    delete next[productId];
                    return next;
                });
            }
        });
    };

    const cartItems = cartResponse?.cartItems || [];

    const [optimisticQuantities, setOptimisticQuantities] = useState<Record<string, number>>({});
    const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    useEffect(() => {
        const timers = debounceTimers.current;
        return () => {
            Object.values(timers).forEach(clearTimeout);
        };
    }, []);

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        setOptimisticQuantities(prev => ({ ...prev, [productId]: newQuantity }));

        if (debounceTimers.current[productId]) {
            clearTimeout(debounceTimers.current[productId]);
        }

        debounceTimers.current[productId] = setTimeout(() => {
            updateCart(productId, newQuantity);
        }, 300);
    };

    const handleDelete = (productId: string) => {
        if (debounceTimers.current[productId]) {
            clearTimeout(debounceTimers.current[productId]);
        }
        setOptimisticQuantities(prev => ({ ...prev, [productId]: 0 }));
        updateCart(productId, 0);
    };

    const displayItems = cartItems.map(cartItem => {
        const productId = cartItem.item.PK.replace('PRODUCT#', '');
        return {
            ...cartItem,
            quantity: optimisticQuantities[productId] !== undefined ? optimisticQuantities[productId] : cartItem.quantity
        };
    }).filter(item => item.quantity > 0);

    const cartCount = displayItems.reduce((acc, current) => acc + current.quantity, 0);
    const cartTotal = displayItems.reduce((acc, current) => acc + (current.item.price * current.quantity), 0);
    console.log(cartItems);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckout = () => {
        handleClose();
        navigate('/checkout');
    };

    const open = Boolean(anchorEl);
    const id = open ? 'cart-popover' : undefined;

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit"><UserIcon strokeWidth={1.5} /></IconButton>
            <IconButton color="inherit"><HeartIcon strokeWidth={1.5} /></IconButton>
            
            <IconButton color="inherit" onClick={handleCartClick} aria-describedby={id}>
                <Badge badgeContent={cartCount} color="secondary">
                    <CartIcon strokeWidth={1.5} />
                </Badge>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1.5,
                            width: 340,
                            maxHeight: 480,
                            borderRadius: 3,
                            boxShadow: '0 12px 48px rgba(61,43,31,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                        }
                    }
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.1rem' }}>
                        Your Cart
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </Typography>
                </Box>
                <Divider />

                {/* Body */}
                <Box sx={{ p: 2, overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {displayItems.length === 0 ? (
                        <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
                            <CartIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                            <Typography variant="body2">Your cart is empty.</Typography>
                        </Box>
                    ) : (
                        displayItems.map(({ item, quantity }, index) => {
                            // Cast the cart internal array to ProductMedia[] for the helper
                            const imageUrl = getProductImageUrl(item.media);
                            const productId = item.PK.replace('PRODUCT#', '');
                            
                            return (
                                <Box key={`${item.PK}-${index}`} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    {/* Mini Image - Link to Product */}
                                    <Box
                                        component={Link}
                                        to={`/products/${productId}`}
                                        onClick={handleClose}
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: 2,
                                            bgcolor: '#F7F3EE',
                                            flexShrink: 0,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            display: 'block',
                                            '&:hover': { opacity: 0.85 }
                                        }}
                                    >
                                        {imageUrl ? (
                                            <Box
                                                component="img"
                                                src={imageUrl}
                                                alt={item.name}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(61,43,31,0.15)' }}>
                                                <CartIcon fontSize="small" />
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Info */}
                                    <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography 
                                            component={Link}
                                            to={`/products/${productId}`}
                                            onClick={handleClose}
                                            variant="body2" 
                                            sx={{ 
                                                fontWeight: 700, p: 0, m: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                color: 'inherit', textDecoration: 'none',
                                                '&:hover': { color: 'primary.main', textDecoration: 'underline' }
                                            }}
                                        >
                                            {item.name}
                                        </Typography>

                                        {/* Quantity Controls */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(61,43,31,0.15)', borderRadius: 1.5, overflow: 'hidden' }}>
                                                <IconButton 
                                                    size="small" 
                                                    sx={{ borderRadius: 0, p: 0.5, '&:hover': { bgcolor: 'rgba(61,43,31,0.06)' } }}
                                                    onClick={() => handleUpdateQuantity(productId, Math.max(1, quantity - 1))}
                                                >
                                                    <Remove fontSize="small" sx={{ fontSize: '1rem' }} />
                                                </IconButton>
                                                <Typography variant="caption" sx={{ minWidth: 20, textAlign: 'center', fontWeight: 600 }}>
                                                    {quantity}
                                                </Typography>
                                                <IconButton 
                                                    size="small" 
                                                    sx={{ borderRadius: 0, p: 0.5, '&:hover': { bgcolor: 'rgba(61,43,31,0.06)' } }}
                                                    onClick={() => handleUpdateQuantity(productId, quantity + 1)}
                                                >
                                                    <Add fontSize="small" sx={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Box>
                                            
                                            {/* Delete Button */}
                                            <IconButton 
                                                size="small" 
                                                color="error"
                                                onClick={() => handleDelete(productId)}
                                                sx={{ p: 0.5, opacity: 0.6, '&:hover': { opacity: 1, bgcolor: 'error.lighter' } }}
                                            >
                                                <DeleteOutline fontSize="small" sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    {/* Price */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 60 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#6F4E37' }}>
                                            ${(item.price * quantity).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })
                    )}
                </Box>

                {/* Footer */}
                {displayItems.length > 0 && (
                    <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: '1px solid rgba(61,43,31,0.08)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>Total</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 800, color: 'primary.main' }}>
                                ${cartTotal.toFixed(2)}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleCheckout}
                            sx={{
                                py: 1.25,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #3D2B1F 0%, #6F4E37 100%)',
                                fontWeight: 700,
                                boxShadow: '0 4px 14px rgba(61,43,31,0.25)',
                                '&:hover': {
                                    boxShadow: '0 6px 20px rgba(61,43,31,0.35)',
                                    transform: 'translateY(-1px)',
                                },
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                )}
            </Popover>
        </Box>
    );
};
