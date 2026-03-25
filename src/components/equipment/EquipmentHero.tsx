import { Box, Typography } from '@mui/material';

export const EquipmentHero = () => {
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
                    The Instrumentation <br/>of Coffee
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
                    Precision is the bridge between a simple bean and an extraordinary extraction. We curate professional-grade gear for the meticulous home alchemist.
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
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPhzDdv3i9yuEPnnAIWwQjGpebpFDo2IuTZhC75Atep4NLrIY8Xj8IEdMKC8qrSA8Awfjv7KgDgdAM__uOlytXXHMa2i0KeAK7LtZTELFcZdg5UASJtrXojiXi-BlbkRcF8HASztH4wpttdFz09l0dQt-g9I7U1X0gV4t-_F7oV0zWHTfbw19nB5x_XLMg5v0t1eOzDRBRtGZIadoNrXoykLUMO0NV1ihfSxP5hbdXonXvw6Xzo1uEkag-34BX3TekBpDgvLaPKos"
                    alt="Minimalist coffee setup"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(20%)'
                    }}
                />
            </Box>
        </Box>
    );
};
