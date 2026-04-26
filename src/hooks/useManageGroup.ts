import { useMutation, useQueryClient } from '@tanstack/react-query';
import { manageProductGroup } from '../api/products';
import { productKeys } from './useProductsByCategory';
import type { Product } from '../types/product';

interface ManageGroupVariables {
    productIds: string[];
    group: string;
    mode: 'add' | 'delete';
}

export const useManageGroup = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: ManageGroupVariables) => {
            const success = await manageProductGroup(params);
            if (!success) {
                throw new Error('Failed to manage product group');
            }
            return params;
        },
        onSuccess: ({ productIds, group, mode }) => {
            queryClient.setQueriesData(
                { queryKey: productKeys.all },
                (oldData: { products?: Product[] } | Product[] | undefined) => {
                    if (!oldData) return oldData;

                    const updateProductGroup = (p: Product) => {
                        if (!productIds.includes(p.id)) return p;
                        return { ...p, group: mode === 'add' ? group : null };
                    };

                    if ('products' in oldData && Array.isArray(oldData.products)) {
                        return {
                            ...oldData,
                            products: oldData.products.map(updateProductGroup),
                        };
                    }

                    if (Array.isArray(oldData)) {
                        return oldData.map(updateProductGroup);
                    }

                    return oldData;
                }
            );
        },
    });
};
