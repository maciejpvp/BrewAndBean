import { createTheme } from '@mui/material/styles';

const coffeeTheme = createTheme({
    palette: {
        primary: {
            main: '#3D2B1F', // Deep Espresso
            light: '#6F4E37', // Roasted Bean
            dark: '#231709',
            contrastText: '#F5F5F1',
        },
        secondary: {
            main: '#D4A373', // Rich Latte / Fawn
            light: '#FAEDCD', // Cream / Milk foam
            dark: '#BC8A5F',
        },
        background: {
            default: '#FDFCF8', // Paper-white with a hint of warmth
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2C1B10',
            secondary: '#5F574F',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#3D2B1F',
        },
        h2: {
            fontWeight: 700,
            color: '#3D2B1F',
        },
        button: {
            textTransform: 'none', // Modern look (avoid all-caps)
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12, // Softer, modern corners
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 12px rgba(61, 43, 31, 0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #E6E6E1',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.02)',
                },
            },
        },
    },
});

export default coffeeTheme;