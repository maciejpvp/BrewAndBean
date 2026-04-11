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

/**
 * Update product stock.
 * @param id Product ID.
 * @param stock New stock quantity.
 * @param version Product version.
 * @returns True if stock was updated successfully, false otherwise.
 */
export const updateProductStock = async ({
    id,
    stock,
    version
}: {
    id: string;
    stock: number;
    version: number;
}): Promise<boolean> => {
    try {
        const response = await apiClient.patch(`/products/update/${id}`, { stock, version });

        const isSuccess: boolean = response.status === 200;

        return isSuccess;
    } catch (error) {
        console.error('Error updating product stock:', error);
        return false;
    }
};