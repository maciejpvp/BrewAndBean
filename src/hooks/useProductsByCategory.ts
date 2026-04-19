import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '../api/products';

export const productKeys = {
    all: ['products'] as const,
    byCategory: (category: string) => [...productKeys.all, 'category', category] as const,
};

export const useProductsByCategory = (category: string | null) =>
    useQuery({
        queryKey: productKeys.byCategory(category ?? ''),
        queryFn: () => fetchProductsByCategory({ category: category! }),
        enabled: !!category,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
