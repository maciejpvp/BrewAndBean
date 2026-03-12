import { AppBar, Container } from '@mui/material';
import { NavbarTop } from './NavbarTop';
import { NavbarCategories } from './NavbarCategories';

export const Navbar = () => (
    <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid #f0f0f0', bgcolor: '#fff' }}
    >
        <Container maxWidth="xl">
            <NavbarTop />
            <NavbarCategories />
        </Container>
    </AppBar>
);
