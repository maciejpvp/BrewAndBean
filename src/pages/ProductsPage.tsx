import { Box, Container, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../components/products/ProductList';

export const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    if (!category) {
        return (
            <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">
                    Select a category from the menu to browse products.
                </Typography>
            </Container>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Container maxWidth="xl" sx={{ py: 5 }}>
                <ProductList category={category} />
            </Container>
        </Box>
    );
};
