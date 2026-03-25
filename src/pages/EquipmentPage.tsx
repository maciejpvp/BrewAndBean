import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { ProductList } from '../components/products/ProductList';
import { MOCK_DATA } from '../components/equipment/equipmentData';
import { EquipmentHero } from '../components/equipment/EquipmentHero';
import { EquipmentCategories } from '../components/products/product-detail/ProductCategories';

const CATEGORIES = [
    { label: "All Equipment", slug: "equipment" },
    { label: "V60", slug: "v60" },
    { label: "AeroPress", slug: "aeropress" },
    { label: "Origami", slug: "origami" },
    { label: "Moka Pot", slug: "moka-pot" },
    { label: "Grinders", slug: "grinders" }
];

export const EquipmentPage = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box component="main">
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                <EquipmentHero />
                <EquipmentCategories currentTab={currentTab} onTabChange={handleTabChange} categories={CATEGORIES} />
                
                <Box sx={{ pb: 16 }}>
                    <ProductList products={MOCK_DATA} categoryLabel={CATEGORIES[currentTab].label} />
                </Box>

            </Container>
        </Box>
    );
};

export default EquipmentPage;