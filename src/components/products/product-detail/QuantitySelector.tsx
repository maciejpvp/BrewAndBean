import { Box, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

interface QuantitySelectorProps {
    value: number;
    max: number;
    onChange: (v: number) => void;
}

export const QuantitySelector = ({ value, max, onChange }: QuantitySelectorProps) => (
    <Box
        sx={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1.5px solid',
            borderColor: 'rgba(61,43,31,0.2)',
            borderRadius: 2.5,
            overflow: 'hidden',
            height: 48,
        }}
    >
        <IconButton
            size="small"
            onClick={() => onChange(Math.max(1, value - 1))}
            disabled={value <= 1}
            sx={{ borderRadius: 0, px: 1.5, '&:hover': { bgcolor: 'rgba(61,43,31,0.06)' } }}
        >
            <Remove fontSize="small" />
        </IconButton>
        <Typography
            sx={{
                minWidth: 36,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                userSelect: 'none',
                color: 'primary.main',
            }}
        >
            {value}
        </Typography>
        <IconButton
            size="small"
            onClick={() => onChange(Math.min(max, value + 1))}
            disabled={value >= max}
            sx={{ borderRadius: 0, px: 1.5, '&:hover': { bgcolor: 'rgba(61,43,31,0.06)' } }}
        >
            <Add fontSize="small" />
        </IconButton>
    </Box>
);
