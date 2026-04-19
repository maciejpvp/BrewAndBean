import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '../api/products';
import { productKeys } from './useProductsByCategory';

export const useInventory = (paginationModel: { page: number; pageSize: number }) => {
    const [pageTokens, setPageTokens] = useState<Record<number, string | undefined>>({});

    const currentToken = paginationModel.page === 0 ? undefined : pageTokens[paginationModel.page];

    const query = useQuery({
        queryKey: [...productKeys.all, 'inventory', paginationModel.page, paginationModel.pageSize],
        queryFn: async () => {
            const data = await fetchProductsByCategory({
                category: "equipment",
                limit: paginationModel.pageSize,
                nextToken: currentToken,
                populateCategories: true,
            });
            if (data.nextToken) {
                setPageTokens((prev) => ({
                    ...prev,
                    [paginationModel.page + 1]: data.nextToken,
                }));
            }
            return data;
        },
        enabled: paginationModel.pageSize > 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return {
        data: query.data ?? { products: [], nextToken: undefined },
        loading: query.isLoading || query.isFetching || (paginationModel.pageSize === 0),
        error: query.error,
        refetch: query.refetch,
    };
};
