import { useState, type FormEvent } from 'react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Divider,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    EmailOutlined,
    LockOutlined,
    Coffee,
} from '@mui/icons-material';
import { authLogin, getAuthenticatedUserProfile } from '../services/authService';
import { useUserStore } from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((s) => s.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await authLogin(email, password);
            const profile = await getAuthenticatedUserProfile();
            if (profile) {
                setUser(profile);
            }
            navigate('/');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #231709 0%, #3D2B1F 40%, #6F4E37 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,163,115,0.18) 0%, transparent 70%)',
                    pointerEvents: 'none',
                },
            }}
        >
            {/* Decorative blobs */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 420,
                    height: 420,
                    borderRadius: '50%',
                    background: 'rgba(212,163,115,0.07)',
                    top: -120,
                    left: -120,
                    filter: 'blur(2px)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(212,163,115,0.07)',
                    bottom: -80,
                    right: -80,
                    filter: 'blur(2px)',
                }}
            />

            <Card
                sx={{
                    width: '100%',
                    maxWidth: 440,
                    mx: 2,
                    borderRadius: 4,
                    border: '1px solid rgba(212,163,115,0.2)',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(24px)',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                }}
            >
                <CardContent sx={{ p: 5 }}>
                    {/* Logo area */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #D4A373, #BC8A5F)',
                                mb: 2,
                                boxShadow: '0 8px 24px rgba(212,163,115,0.4)',
                            }}
                        >
                            <Coffee sx={{ color: '#231709', fontSize: 32 }} />
                        </Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 800,
                                color: '#F5F5F1',
                                letterSpacing: '-0.02em',
                                mb: 0.5,
                            }}
                        >
                            Brew & Bean
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(245,245,241,0.5)' }}>
                            Sign in to your account
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(212,163,115,0.15)', mb: 4 }} />

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 2,
                                background: 'rgba(211,47,47,0.12)',
                                border: '1px solid rgba(211,47,47,0.3)',
                                color: '#ffb3b3',
                                '& .MuiAlert-icon': { color: '#ef5350' },
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            id="login-email"
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            sx={darkFieldStyle}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlined
                                                sx={{ color: 'rgba(212,163,115,0.7)', fontSize: 20 }}
                                            />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <TextField
                            id="login-password"
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            sx={{ ...darkFieldStyle, mt: 2.5 }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlined
                                                sx={{ color: 'rgba(212,163,115,0.7)', fontSize: 20 }}
                                            />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                id="toggle-password-visibility"
                                                onClick={() => setShowPassword((v) => !v)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: 'rgba(245,245,241,0.4)' }}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff fontSize="small" />
                                                ) : (
                                                    <Visibility fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        <Box sx={{ textAlign: 'right', mt: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#D4A373',
                                    cursor: 'pointer',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                Forgot password?
                            </Typography>
                        </Box>

                        <Button
                            id="login-submit"
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading || !email || !password}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                borderRadius: 2.5,
                                background: 'linear-gradient(135deg, #D4A373 0%, #BC8A5F 100%)',
                                color: '#231709',
                                fontWeight: 700,
                                fontSize: '1rem',
                                letterSpacing: '0.01em',
                                boxShadow: '0 8px 24px rgba(212,163,115,0.3)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #FAEDCD 0%, #D4A373 100%)',
                                    boxShadow: '0 12px 32px rgba(212,163,115,0.45)',
                                    transform: 'translateY(-1px)',
                                },
                                '&:active': { transform: 'translateY(0)' },
                                '&.Mui-disabled': {
                                    background: 'rgba(212,163,115,0.2)',
                                    color: 'rgba(245,245,241,0.3)',
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={22} sx={{ color: 'rgba(245,245,241,0.5)' }} />
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

const darkFieldStyle = {
    '& .MuiInputBase-root': {
        color: '#F5F5F1',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 2,
        transition: 'background 0.2s',
        '&:hover': { background: 'rgba(255,255,255,0.08)' },
        '&.Mui-focused': { background: 'rgba(255,255,255,0.08)' },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(212,163,115,0.2)',
    },
    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(212,163,115,0.5)',
    },
    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#D4A373',
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(245,245,241,0.5)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#D4A373',
    },
};
