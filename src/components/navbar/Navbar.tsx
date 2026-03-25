import { AppBar, Container, IconButton, useScrollTrigger } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Logo } from '../Logo';
import Categories from './Categories';
import { useThemeStore } from '../../store/useThemeStore';
import { NavbarProvider } from './NavbarContext';

export const Navbar = () => {
    const { mode, toggleTheme } = useThemeStore();

    const trigger = useScrollTrigger({
    disableHysteresis: true, // Reaguje natychmiast po przekroczeniu progu
    threshold: 50,           // Próg w pikselach, po którym zmienia się wygląd
  });

    return (
        <NavbarProvider isScrolled={trigger}>
            <AppBar
                position="fixed"
                color="default"
                elevation={trigger ? 4 : 0}
                sx={{
                    borderBottom: 'none',
                    bgcolor: (theme) => alpha(theme.palette.background.default, trigger ? 0.9 : 0.8),
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease-in-out', 
                    py: trigger ? 0 : 1, 
                }}
            >
                <Container maxWidth="xl">
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: trigger ? '0.5rem 0' : '2rem 0',
                        transition: 'padding 0.3s ease-in-out'
                    }}>
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
        </NavbarProvider>
    );
};
