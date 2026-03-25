import { Box, Typography } from '@mui/material';

export const RoastsHero = () => {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 16 },
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: 8
            }}
        >
            <Box sx={{ maxWidth: 'md', flex: 1 }}>
                <Typography 
                    variant="h1" 
                    color="primary"
                    sx={{
                        fontSize: { xs: '3rem', md: '4.5rem' },
                        fontWeight: 300,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        fontFamily: '"Noto Serif", serif'
                    }}
                >
                    The Alchemy <br/>of Roasting
                </Typography>
                <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                        mt: 4, 
                        fontSize: '1.125rem',
                        maxWidth: 'sm',
                        lineHeight: 1.6,
                        opacity: 0.8 
                    }}
                >
                    From the highlands to your cup, explore our carefully curated selection of single origins, vibrant blends, and rich espressos, roasted with precision for the perfect extraction.
                </Typography>
            </Box>
            <Box 
                sx={{ 
                    width: { xs: '100%', md: '33%' }, 
                    aspectRatio: '4/5', 
                    bgcolor: 'background.paper', 
                    position: 'relative',
                    overflow: 'hidden' 
                }}
            >
                <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800"
                    alt="Artisanal roasted coffee beans"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(15%) contrast(1.1)'
                    }}
                />
            </Box>
        </Box>
    );
};
