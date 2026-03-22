import { createTheme } from '@mui/material/styles';

const coffeeTheme = createTheme({
    palette: {
        primary: {
            main: '#171818', // Deep Charcoal
            light: '#3d3f3f',
            dark: '#000000',
            contrastText: '#fbf9f5',
        },
        secondary: {
            main: '#775a19', // Soft Gold
            light: '#a68233',
            dark: '#4c3507',
            contrastText: '#ffffff',
        },
        background: {
            default: '#fbf9f5', // Warm Cream (Surface)
            paper: '#f3efe6',   // Surface-container-low
        },
        text: {
            primary: '#171818',
            secondary: '#4b5563',
        },
        error: {
            main: '#d32f2f',
        },
    },
    typography: {
        fontFamily: '"Manrope", sans-serif',
        h1: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 800,
            letterSpacing: '0.05em',
            color: '#171818',
        },
        h2: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 700,
            color: '#171818',
        },
        h3: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 700,
            color: '#171818',
        },
        h4: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 700,
            color: '#171818',
        },
        h5: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 700,
            color: '#171818',
        },
        h6: {
            fontFamily: '"Noto Serif", serif',
            fontWeight: 700,
            color: '#171818',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontFamily: '"Manrope", sans-serif',
        },
    },
    shape: {
        borderRadius: 0, // Sharp corners everywhere
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '12px 28px',
                    boxShadow: 'none',
                    borderRadius: 0,
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                containedPrimary: {
                    backgroundColor: '#171818',
                    color: '#fbf9f5',
                    '&:hover': {
                        backgroundColor: '#3d3f3f', // primary-container simulation
                    },
                },
                outlined: {
                    border: '1px solid rgba(23, 24, 24, 0.15)', // Ghost border fallback
                    color: '#171818',
                    '&:hover': {
                        backgroundColor: 'rgba(23, 24, 24, 0.04)',
                        border: '1px solid rgba(23, 24, 24, 0.15)',
                    },
                },
                text: {
                    color: '#171818',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                        textDecorationColor: '#775a19', // Gold underline
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '4px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: 'none',
                    boxShadow: 'none',
                    backgroundColor: '#f3efe6', // surface-container-low
                    borderRadius: 0,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderBottom: '2px solid #171818',
                    },
                },
                notchedOutline: {
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: '1px solid rgba(23, 24, 24, 0.15)',
                    borderRadius: 0,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: '0.875rem',
                    color: '#4b5563',
                    '&.Mui-focused': {
                        color: '#171818',
                    },
                },
            },
        },
    },
});

export default coffeeTheme;