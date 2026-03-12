import { Toolbar } from '@mui/material';
import { NavbarSearch } from './NavbarSearch';
import { NavbarIcons } from './NavbarIcons';
import { Logo } from '../Logo';
import { useNavigate } from 'react-router-dom';

export const NavbarTop = () => {
    const navigate = useNavigate();
    return (
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Brand Logo */}
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <Logo />
            </button>

            <NavbarSearch />
            <NavbarIcons />
        </Toolbar>
    );
}