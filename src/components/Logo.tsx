import { Box, Typography } from "@mui/material"

export const Logo = () => {
    return (
        <Typography
            variant="h5"
            sx={{ fontWeight: 800, letterSpacing: '-0.5px', color: 'primary.main', cursor: 'pointer' }}
        >
            BREW <Box component="span" sx={{ color: 'secondary.main', fontWeight: 300 }}>&</Box> BEAN
        </Typography>
    )
}