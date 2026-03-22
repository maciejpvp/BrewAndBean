import {
    AppBar, Toolbar, Typography, Box, InputBase, IconButton, Badge,
    Button, Container
} from '@mui/material';
import {
    Search as SearchIcon,
    PersonOutline as UserIcon,
    FavoriteBorder as HeartIcon,
    LocalMallOutlined as CartIcon,
    KeyboardArrowDown as ArrowIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import categoryData from '../data/categories.json';

// Styled Search Input for Luxury Feel
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 0,
    backgroundColor: alpha(theme.palette.common.black, 0.03),
    '&:hover': { backgroundColor: alpha(theme.palette.common.black, 0.05) },
    width: '400px',
    transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: 0,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 2),
        fontSize: '0.9rem',
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    padding: '6px 16px',
    '&:hover': { backgroundColor: 'transparent', color: theme.palette.secondary.main },
}));

/**
 * NavItem wraps a menu trigger and its Mega Menu dropdown.
 * The dropdown is a direct DOM child so CSS :hover can reach it —
 * no JS state, no timers, no event handlers needed.
 */
const NavItem = styled(Box)({
    position: 'relative',
    // Show the dropdown when hovering the wrapper
    '&:hover .mega-dropdown': {
        opacity: 1,
        visibility: 'visible',
        transform: 'translateY(0)',
        pointerEvents: 'auto',
    },
    // Rotate arrow when open
    '&:hover .nav-arrow': {
        transform: 'rotate(180deg)',
    },
});

const MegaDropdown = styled(Box)(({ theme }) => ({
    // Hidden by default – GPU-composited properties only for smooth perf
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
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    boxShadow: '0px 8px 40px rgba(23, 24, 24, 0.05)',
    border: 'none',
    padding: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(4),
    // Prevent the gap between button and dropdown breaking hover
    '&::before': {
        content: '""',
        position: 'absolute',
        top: -8,
        left: 0,
        right: 0,
        height: 8,
    },
}));

export const Navbar = () => {
    const navigate = (slug: string) => {
        window.location.assign(`/products?category=${slug}`);
    };

    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 'none', bgcolor: 'rgba(251, 249, 245, 0.8)', backdropFilter: 'blur(20px)' }}>
            <Container maxWidth="xl">
                {/* Top Tier: Logo, Search, Icons */}
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>

                    {/* Brand Logo */}
                    <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px', color: 'primary.main', cursor: 'pointer' }}>
                        BREW <Box component="span" sx={{ color: 'secondary.main', fontWeight: 300 }}>&</Box> BEAN
                    </Typography>

                    {/* Minimalist Search */}
                    <Search sx={{ display: { xs: 'none', md: 'block' } }}>
                        <SearchIconWrapper><SearchIcon fontSize="small" /></SearchIconWrapper>
                        <StyledInputBase placeholder="Discover your next favorite roast..." />
                    </Search>

                    {/* Action Icons */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="inherit"><UserIcon strokeWidth={1.5} /></IconButton>
                        <IconButton color="inherit"><HeartIcon strokeWidth={1.5} /></IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <CartIcon strokeWidth={1.5} />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>

                {/* Bottom Tier: Category Navigation */}
                <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'center', gap: 2, pb: 1, display: { xs: 'none', md: 'flex' } }}>
                    {categoryData.categories.map((cat) => (
                        <NavItem key={cat.id}>
                            {/* Clicking the top-level category navigates to its broad slug */}
                            <NavButton
                                onClick={() => navigate(cat.slug)}
                                endIcon={
                                    <ArrowIcon
                                        className="nav-arrow"
                                        sx={{ fontSize: 12, transition: 'transform 0.2s ease' }}
                                    />
                                }
                                aria-haspopup="true"
                            >
                                {cat.name}
                            </NavButton>

                            <MegaDropdown className="mega-dropdown" sx={{ minWidth: cat.sections.length * 160 }}>
                                {cat.sections.map((section) => (
                                    <Box key={section.id} sx={{ flex: 1 }}>
                                        <Typography
                                            variant="overline"
                                            sx={{
                                                fontWeight: 700,
                                                color: 'secondary.main',
                                                display: 'block',
                                                mb: 1.5,
                                                letterSpacing: '0.1em'
                                            }}
                                        >
                                            {section.title}
                                        </Typography>
                                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                            {section.items.map((item) => (
                                                <Box
                                                    key={item.id}
                                                    component="li"
                                                    onClick={() => navigate(item.slug)}
                                                    sx={{
                                                        fontSize: '0.85rem',
                                                        py: 0.8,
                                                        color: 'text.secondary',
                                                        cursor: 'pointer',
                                                        transition: 'color 0.15s ease, transform 0.15s ease',
                                                        '&:hover': {
                                                            color: 'primary.main',
                                                            transform: 'translateX(4px)',
                                                        }
                                                    }}
                                                >
                                                    {item.name}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </MegaDropdown>
                        </NavItem>
                    ))}
                    <NavButton sx={{ color: '#d32f2f', fontWeight: 700 }}>OUTLET</NavButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};