import { apiClient } from '../lib/apiClient';
import type { Product } from '../types/product';

interface ProductsByCategoryResponse {
    products: Product[][];
    nextToken?: string;
}

interface ProductByIdResponse {
    product: Product;
}

/**
 * Fetch all products belonging to a category slug.
 * The API returns a nested array — we flatten one level.
 */
export const fetchProductsByCategory = async (category: string, limit?: number, nextToken?: string): Promise<{ products: Product[], nextToken?: string }> => {
    const { data } = await apiClient.get<ProductsByCategoryResponse>(
        `/products/category/${category}?limit=${limit ?? 10}${nextToken ? `&nextToken=${nextToken}` : ''}`,
    );
    return {
        products: data.products.flat(),
        nextToken: data.nextToken,
    };
};

/**
 * Fetch a single product by its UUID.
 */
export const fetchProductById = async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<ProductByIdResponse>(`/products/${id}`);
    return data.product;
};
