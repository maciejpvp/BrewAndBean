import { Box, IconButton, Badge } from '@mui/material';
import {
    PersonOutline as UserIcon,
    FavoriteBorder as HeartIcon,
    LocalMallOutlined as CartIcon,
} from '@mui/icons-material';

export const NavbarIcons = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton color="inherit"><UserIcon strokeWidth={1.5} /></IconButton>
        <IconButton color="inherit"><HeartIcon strokeWidth={1.5} /></IconButton>
        <IconButton color="inherit">
            <Badge badgeContent={2} color="secondary">
                <CartIcon strokeWidth={1.5} />
            </Badge>
        </IconButton>
    </Box>
);
