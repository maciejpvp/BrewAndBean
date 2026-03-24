import { AppBar, Container, IconButton } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { Logo } from '../Logo';
import Categories from './Categories';
import { useThemeStore } from '../../store/useThemeStore';

export const Navbar = () => {
    const { mode, toggleTheme } = useThemeStore();
    const theme = useTheme();

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{ 
                borderBottom: 'none', 
                bgcolor: alpha(theme.palette.background.default, 0.8),
                backdropFilter: 'blur(20px)',
            }}
        >
            <Container maxWidth="xl">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0' }}>
                    <Logo />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <Categories />
                        <IconButton onClick={toggleTheme} color="inherit" aria-label="Toggle theme">
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                                {mode === 'dark' ? 'light_mode' : 'dark_mode'}
                            </span>
                        </IconButton>
                    </div>
                </div>
            </Container>
        </AppBar>
    );
};
