import { Container, Grid, Skeleton } from '@mui/material';

export const ProductPageSkeleton = () => (
    <Container maxWidth="xl" sx={{ py: 5 }}>
        <Skeleton width={260} height={24} sx={{ mb: 3 }} />
        <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Skeleton variant="rectangular" sx={{ borderRadius: 3, aspectRatio: '1 / 1', mb: 2 }} />
                <Skeleton height={20} />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="60%" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Skeleton height={48} sx={{ mb: 1 }} />
                <Skeleton width="40%" height={36} sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={52} sx={{ borderRadius: 2, mb: 3 }} />
                <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
            </Grid>
        </Grid>
    </Container>
);
