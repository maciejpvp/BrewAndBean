import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
    const isLight = mode === 'light';

    const primary = '#26170c';
    const secondary = '#775a19';
    const background = isLight ? '#fcf9f4' : '#1a110a';
    const surfaceContainerLow = isLight ? '#f6f3ee' : '#22160d';
    const surfaceContainerHighest = isLight ? '#e5e2dd' : '#3d2819';
    const surfaceVariant = isLight ? '#e5e2dd' : '#3d2819';
    const outlineVariant = isLight ? '#d2c4bc' : '#574335';

    const textPrimary = isLight ? '#1c1c19' : '#fcf9f4';
    const textSecondary = isLight ? '#4f453f' : '#d2c4bc';
    const textOnPrimary = '#ffffff';

    return createTheme({
        palette: {
            mode,
            primary: {
                main: primary,
                contrastText: textOnPrimary,
            },
            secondary: {
                main: secondary,
                contrastText: '#ffffff',
            },
            background: {
                default: background,
                paper: surfaceContainerLow,
            },
            text: {
                primary: textPrimary,
                secondary: textSecondary,
            },
            divider: outlineVariant,
        },
        typography: {
            fontFamily: '"Manrope", sans-serif',
            h1: {
                fontFamily: '"Noto Serif", serif',
                fontWeight: 400, // Reduced weight for elegant editorial feel
                letterSpacing: '0.05em', // Wide tracking
                color: textPrimary,
            },
            h2: {
                fontFamily: '"Noto Serif", serif',
                fontWeight: 400,
                color: textPrimary,
            },
            h3: {
                fontFamily: '"Noto Serif", serif',
                fontWeight: 400,
                color: textPrimary,
            },
            h4: {
                fontFamily: '"Noto Serif", serif',
                fontWeight: 400,
                color: textPrimary,
            },
            h5: {
                fontFamily: '"Noto Serif", serif',
                fontWeight: 700,
                color: textPrimary,
            },
            h6: {
                fontFamily: '"Noto Serif", serif',
                fontWeight: 700,
                color: textPrimary,
            },
            button: {
                textTransform: 'none',
                fontWeight: 600,
                fontFamily: '"Manrope", sans-serif',
            },
        },
        shape: {
            borderRadius: 6, // 0.375rem corresponding roughly to rounded-md
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        padding: '12px 28px',
                        boxShadow: 'none',
                        textTransform: 'uppercase', // Following the boutique feel
                        letterSpacing: '0.1em',
                        '&:hover': {
                            boxShadow: 'none',
                        },
                    },
                    containedPrimary: {
                        backgroundColor: primary,
                        color: textOnPrimary,
                        '&:hover': {
                            backgroundColor: '#3d2b1f', // Primary container simulation
                        },
                    },
                    containedSecondary: {
                        backgroundColor: secondary,
                        color: '#ffffff',
                        background: `linear-gradient(135deg, ${secondary} 0%, #a68233 100%)`, // Signature CTA gradient
                        '&:hover': {
                            opacity: 0.9,
                        },
                    },
                    outlined: {
                        border: 'none',
                        color: secondary,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#a68233',
                            border: 'none',
                        },
                    },
                    text: {
                        color: secondary,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'none',
                            opacity: 0.8,
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        border: 'none',
                        boxShadow: 'none',
                        backgroundColor: surfaceContainerLow,
                        padding: '1.25rem', // Spacing Scale 5
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: surfaceVariant,
                        borderRadius: '4px', // rounded-sm
                        transition: 'background-color 0.2s',
                        '&.Mui-focused': {
                            backgroundColor: surfaceContainerHighest,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none', // No bottom line or box focus outline per design
                        },
                    },
                    notchedOutline: {
                        border: 'none', // The Minimalist Input: No line or box
                    },
                    input: {
                        padding: '12px 16px',
                    }
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontFamily: '"Manrope", sans-serif',
                        fontSize: '0.875rem',
                        color: textSecondary,
                        '&.Mui-focused': {
                            color: textPrimary,
                        },
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        display: 'none', // The Divider Forfeit: Forbid the use of horizontal rules
                    }
                }
            },
        },
    });
};