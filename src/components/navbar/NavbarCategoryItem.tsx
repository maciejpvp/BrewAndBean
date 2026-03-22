import { Box, Typography } from '@mui/material';
import { KeyboardArrowDown as ArrowIcon } from '@mui/icons-material';
import { NavItem, NavButton, MegaDropdown } from './navbar.styles';

interface Item {
    id: string;
    name: string;
    slug: string;
}

interface Section {
    id: string;
    title: string;
    items: Item[];
}

interface Category {
    id: string;
    name: string;
    slug: string;
    sections: Section[];
}

interface NavbarCategoryItemProps {
    category: Category;
    onNavigate: (slug: string) => void;
}

export const NavbarCategoryItem = ({ category, onNavigate }: NavbarCategoryItemProps) => (
    <NavItem>
        {/* Top-level button → broad category slug */}
        <NavButton
            onClick={() => onNavigate(category.slug)}
            endIcon={
                <ArrowIcon
                    className="nav-arrow"
                    sx={{ fontSize: 12, transition: 'transform 0.2s ease' }}
                />
            }
            aria-haspopup="true"
        >
            {category.name}
        </NavButton>

        {/* Mega dropdown — shown via CSS :hover on NavItem */}
        <MegaDropdown className="mega-dropdown" sx={{ bgcolor: 'inherit', minWidth: category.sections.length * 160 }}>
            {category.sections.map((section) => (
                <Box key={section.id} sx={{ flex: 1 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            fontWeight: 700,
                            color: 'secondary.main',
                            display: 'block',
                            mb: 1.5,
                            letterSpacing: '0.1em',
                        }}
                    >
                        {section.title}
                    </Typography>

                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {section.items.map((item) => (
                            <Box
                                key={item.id}
                                component="li"
                                onClick={() => onNavigate(item.slug)}
                                sx={{
                                    fontSize: '0.85rem',
                                    py: 0.8,
                                    color: 'text.secondary',
                                    cursor: 'pointer',
                                    transition: 'color 0.15s ease, transform 0.15s ease',
                                    '&:hover': {
                                        color: 'primary.main',
                                        transform: 'translateX(4px)',
                                    },
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
);
