import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';
import { productKeys } from './useProductsByCategory';

export const useProduct = (id: string | undefined) =>
    useQuery({
        queryKey: [...productKeys.all, 'detail', id ?? ''],
        queryFn: () => fetchProductById(id!),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
