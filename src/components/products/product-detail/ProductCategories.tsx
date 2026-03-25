import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface EquipmentCategoriesProps {
    currentTab: number;
    onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
    categories?: { label: string, slug: string }[];
    basePath: string;
}

export const EquipmentCategories = ({ currentTab, onTabChange, categories, basePath }: EquipmentCategoriesProps) => {
    const defaultCategories = [
        { label: "All Equipment", slug: "equipment" },
        { label: "V60", slug: "v60" },
        { label: "AeroPress", slug: "aeropress" },
        { label: "Origami", slug: "origami" },
        { label: "Moka Pot", slug: "moka-pot" },
        { label: "Grinders", slug: "grinders" }
    ];
    const displayCategories = categories || defaultCategories;

    const navigate = useNavigate();

    const handleTabChange = (value: string) => {
        navigate(`/${basePath}?category=${value}`)
    }

    return (
        <Box 
            sx={{ 
                position: 'sticky', 
                top: 55, 
                zIndex: 40,
                bgcolor: 'background.default',
                borderBottom: 1,
                borderColor: 'divider',
                mb: 8,
                pb: 1
            }}
        >
            <Tabs 
                value={currentTab} 
                onChange={onTabChange}
                variant="scrollable"
                scrollButtons="auto"
                textColor="secondary"
                indicatorColor="secondary"
                sx={{
                    minHeight: 48,
                    '& .MuiTab-root': {
                        fontFamily: '"Manrope", sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        minWidth: 'auto',
                        mr: 4,
                        px: 0
                    }
                }}
            >
                {displayCategories.map((cat, index) => (
                    <Tab key={index} label={cat.label} onClick={() => handleTabChange(cat.slug)} />
                ))}
            </Tabs>
        </Box>
    );
};
