import { Box, Typography } from '@mui/material';
import {
    LocalShippingOutlined,
    CardGiftcardOutlined,
    RocketLaunchOutlined,
} from '@mui/icons-material';

const badges = [
    {
        icon: <LocalShippingOutlined />,
        title: 'Free Shipping',
        subtitle: 'On all orders over $50',
    },
    {
        icon: <CardGiftcardOutlined />,
        title: 'Gift-Ready Packaging',
        subtitle: 'Beautiful wrapping on request',
    },
    {
        icon: <RocketLaunchOutlined />,
        title: 'Ships Within 24 Hours',
        subtitle: 'Order today, on its way tomorrow',
    },
];

export const ProductTrustBadges = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            border: '1px solid',
            borderColor: 'rgba(61,43,31,0.1)',
            borderRadius: 3,
            overflow: 'hidden',
        }}
    >
        {badges.map(({ icon, title, subtitle }, i) => (
            <Box
                key={title}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 2.5,
                    py: 2,
                    borderTop: i > 0 ? '1px solid rgba(61,43,31,0.08)' : 'none',
                    bgcolor: 'background.paper',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        bgcolor: '#F7F3EE',
                        color: '#D4A373',
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" fontWeight={700} color="primary.main">
                        {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
        ))}
    </Box>
);
