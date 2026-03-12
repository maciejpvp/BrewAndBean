import { Search as SearchIcon } from '@mui/icons-material';
import { Search, SearchIconWrapper, StyledInputBase } from './navbar.styles';

export const NavbarSearch = () => (
    <Search sx={{ display: { xs: 'none', md: 'block' } }}>
        <SearchIconWrapper>
            <SearchIcon fontSize="small" />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Discover your next favorite roast..." />
    </Search>
);
