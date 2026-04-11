import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductStock } from '../api/products';
import { productKeys } from './useProductsByCategory';
import type { Product } from '../types/product';

interface UpdateStockVariables {
    id: string;
    stock: number;
    version: number;
}

export const useUpdateStock = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, stock, version }: UpdateStockVariables) => {
            const success = await updateProductStock({ id, stock, version });
            if (!success) {
                throw new Error('Failed to update stock');
            }
            return { id, stock, version };
        },
        onSuccess: ({ id, stock, version }) => {
            queryClient.setQueriesData(
                { queryKey: productKeys.all },
                (oldData: { products?: Product[] } | Product[] | undefined) => {
                    if (!oldData) return oldData;

                    if ('products' in oldData && Array.isArray(oldData.products)) {
                        return {
                            ...oldData,
                            products: oldData.products.map((product: Product) => 
                                product.id === id 
                                    ? { ...product, stock, version: version + 1 }
                                    : product
                            ),
                        };
                    }

                    if (Array.isArray(oldData)) {
                        return oldData.map((product: Product) => 
                            product.id === id 
                                ? { ...product, stock, version: version + 1 }
                                : product
                        );
                    }

                    return oldData;
                }
            );
        },
    });
};
