import { Toolbar } from '@mui/material';
import categoryData from '../../data/categories.json';
import { NavbarCategoryItem } from './NavbarCategoryItem';
import { NavButton } from './navbar.styles';
import { useNavigate } from 'react-router-dom';

export const NavbarCategories = () => {
    const navigate = useNavigate();

    const handleNavigate = (slug: string) => {
        navigate(`/products?category=${slug}`);
    };

    return (<>
        <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'center', gap: 2, pb: 1, display: { xs: 'none', md: 'flex' } }}
        >
            {categoryData.categories.map((cat) => (
                <NavbarCategoryItem key={cat.id} category={cat} onNavigate={handleNavigate} />
            ))}
            <NavButton sx={{ color: '#d32f2f', fontWeight: 700 }}>OUTLET</NavButton>
        </Toolbar>
    </>)
};
