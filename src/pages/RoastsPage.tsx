import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ProductList } from '../components/products/ProductList';
import { RoastsHero } from '../components/roasts/RoastsHero';
import { EquipmentCategories } from '../components/products/product-detail/ProductCategories';
import { useLocation } from 'react-router-dom';
import { setInitialTab } from '../utils/setInitialTab';

const ROAST_CATEGORIES_MAP = [
    { label: "All Coffee", slug: "coffee" },
    { label: "Vibrant", slug: "vibrant" },
    { label: "Balanced", slug: "balanced" },
    { label: "Intense", slug: "intense" },
    { label: "Decaf", slug: "decaf" }
];

export const RoastsPage = () => {
    const location = useLocation();

    const slugs = ROAST_CATEGORIES_MAP.map((cat) => cat.slug);
    const [currentTab, setCurrentTab] = useState(setInitialTab(location, slugs));

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const currentCategoryLabel = ROAST_CATEGORIES_MAP[currentTab].label;
    const currentCategorySlug = ROAST_CATEGORIES_MAP[currentTab].slug;

    return (
        <Box component="main">
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                <RoastsHero />
                <EquipmentCategories 
                    currentTab={currentTab} 
                    onTabChange={handleTabChange} 
                    categories={ROAST_CATEGORIES_MAP}
                    basePath="roasts"
                />
                
                <Box sx={{ pb: 16 }}>
                    <ProductList 
                        category={currentCategorySlug} 
                        categoryLabel={currentCategoryLabel} 
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default RoastsPage;