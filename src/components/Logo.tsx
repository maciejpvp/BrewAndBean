import { Box, Typography } from "@mui/material";

export const Logo = () => {
    return (
        <Box 
            component="span" 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                whiteSpace: 'nowrap', 
                flexShrink: 0         
            }}
        >
            <Typography
                variant="h5"
                sx={{ 
                    fontWeight: 800, 
                    letterSpacing: '-0.5px', 
                    color: (theme) => theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main', 
                    cursor: 'pointer',
                    display: 'inherit', 
                    alignItems: 'center'
                }}
            >
                BREW 
                <Box 
                    component="span" 
                    sx={{ 
                        color: (theme) => theme.palette.mode === 'dark' ? 'text.primary' : 'secondary.main', 
                        fontWeight: 300, 
                        mx: 0.5 
                    }}
                >
                    &
                </Box> 
                BEAN
            </Typography>
        </Box>
    );
};