import { AppBar, Container } from '@mui/material';
import { Logo } from '../Logo';
import Categories from './Categories';

export const Navbar = () => (
    <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid #f0f0f0', bgcolor: '#fbf9f5' }}
    >
        <Container maxWidth="xl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Logo />
                <Categories />
            </div>
        </Container>
    </AppBar>
);
