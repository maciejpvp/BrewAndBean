import { apiClient } from '../lib/apiClient';
import type { Product } from '../types/product';

interface ProductsByCategoryResponse {
    products: Product[][];
}

interface ProductByIdResponse {
    product: Product;
}

/**
 * Fetch all products belonging to a category slug.
 * The API returns a nested array — we flatten one level.
 */
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    const { data } = await apiClient.get<ProductsByCategoryResponse>(
        `/products/category/${category}`,
    );
    return data.products.flat();
};

/**
 * Fetch a single product by its UUID.
 */
export const fetchProductById = async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<ProductByIdResponse>(`/products/${id}`);
    return data.product;
};
