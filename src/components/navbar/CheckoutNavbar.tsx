import { AppBar, Container, Toolbar, Typography, Box } from '@mui/material';
import { Logo } from '../Logo';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const CheckoutNavbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{ 
                borderBottom: '1px solid #f0f0f0', 
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 1100
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
                    {/* Brand Logo */}
                    <button 
                        onClick={() => navigate('/')} 
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Logo />
                    </button>

                    {/* Secure Checkout Indicator */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <Lock size={18} />
                        <Typography 
                            variant="subtitle2" 
                            sx={{ 
                                fontWeight: 700, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.1em',
                                fontSize: '0.75rem',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            Secure Checkout
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
