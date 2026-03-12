import { styled, alpha } from '@mui/material/styles';
import { Box, InputBase, Button } from '@mui/material';

// ── Search bar ────────────────────────────────────────────────────────────────
export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.black, 0.03),
    '&:hover': { backgroundColor: alpha(theme.palette.common.black, 0.05) },
    width: '400px',
    transition: 'all 0.3s ease',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 2),
        fontSize: '0.9rem',
    },
}));

// ── Category nav ──────────────────────────────────────────────────────────────
export const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    padding: '6px 16px',
    '&:hover': { backgroundColor: 'transparent', color: theme.palette.secondary.main },
}));

/**
 * Wrapper that exposes CSS :hover to both the trigger button and the
 * absolutely-positioned MegaDropdown child (no JS state needed).
 */
export const NavItem = styled(Box)({
    position: 'relative',
    '&:hover .mega-dropdown': {
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(0)',
        pointerEvents: 'auto',
    },
    '&:hover .nav-arrow': {
        transform: 'rotate(180deg)',
    },
});

export const MegaDropdown = styled(Box)(({ theme }) => ({
    // Hidden by default — GPU-composited only for smooth perf
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateY(-8px)',
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease',
    // Positioning
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: theme.zIndex.modal,
    // Appearance
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '1px solid rgba(0,0,0,0.08)',
    padding: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(4),
    // Invisible bridge to prevent hover gap between button and dropdown
    '&::before': {
        content: '""',
        position: 'absolute',
        top: -8,
        left: 0,
        right: 0,
        height: 8,
    },
}));
