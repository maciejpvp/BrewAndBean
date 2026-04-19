import { useMutation, useQueryClient } from '@tanstack/react-query';
import { manageProductCategories } from '../api/products';
import { productKeys } from './useProductsByCategory';
import type { Product } from '../types/product';

interface ManageCategoryVariables {
    productId: string;
    category: string;
    mode: 'add' | 'delete';
}

export const useManageCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, category, mode }: ManageCategoryVariables) => {
            const success = await manageProductCategories({ productId, category, mode });
            if (!success) {
                throw new Error('Failed to manage category');
            }
            return { productId, category, mode };
        },
        onSuccess: ({ productId, category, mode }) => {
            queryClient.setQueriesData(
                { queryKey: productKeys.all },
                (oldData: { products?: Product[] } | Product[] | undefined) => {
                    if (!oldData) return oldData;

                    const updateProductCategories = (p: Product) => {
                        if (p.id !== productId) return p;

                        let newCategories = p.categories ? [...p.categories] : [];
                        const normalizedCategory = category.trim().toLowerCase();
                        if (mode === 'add') {
                            if (!newCategories.find(c => c.name.toLowerCase() === normalizedCategory)) {
                                newCategories.push({ name: category.trim(), slug: category.trim().toLowerCase().replace(/\s+/g, '-') });
                            }
                        } else if (mode === 'delete') {
                            newCategories = newCategories.filter(c => c.name.toLowerCase() !== normalizedCategory);
                        }

                        return { ...p, categories: newCategories };
                    };

                    if ('products' in oldData && Array.isArray(oldData.products)) {
                        return {
                            ...oldData,
                            products: oldData.products.map(updateProductCategories),
                        };
                    }

                    if (Array.isArray(oldData)) {
                        return oldData.map(updateProductCategories);
                    }

                    return oldData;
                }
            );
        },
    });
};
