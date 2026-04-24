import { apiClient } from '../lib/apiClient';
import type { Product } from '../types/product';

interface ProductsByCategoryResponse {
    products: Product[][];
    nextToken?: string;
}

interface ProductByIdResponse {
    product: Product;
}

type FetchProductsByCategoryParams = {
    category: string;
    limit?: number;
    nextToken?: string;
    populateCategories?: boolean;
}

type FetchProductsByCategoryResponse = {
    products: Product[];
    nextToken?: string;
}

/**
 * Fetch all products belonging to a category slug.
 * The API returns a nested array — we flatten one level.
 * @param category Category slug.
 * @param limit Limit.
 * @param nextToken Next token.
 * @param populateCategories Populate categories.
 * @returns Products belonging to a category slug.
 */
export const fetchProductsByCategory = async (params: FetchProductsByCategoryParams): Promise<FetchProductsByCategoryResponse> => {
    const {
        category,
        limit = 10,
        nextToken,
        populateCategories,
    } = params;

    const { data } = await apiClient.get<ProductsByCategoryResponse>(
        `/products/category/${category}`,
        {
            params: {
                limit,
                nextToken,
                populateCategories: populateCategories ? 'true' : undefined,
            },
        }
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

export const updateProduct = async ({
    id,
    data,
    version
}: {
    id: string;
    data: Partial<Product>;
    version: number;
}): Promise<boolean> => {
    try {
        const body = {
            data,
            version
        }
        const response = await apiClient.patch(`/products/update/${id}`, body);

        const isSuccess: boolean = response.status === 200;

        return isSuccess;
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
};

type ManageProductCategoriesParams = {
    productId: string;
    category: string;
    mode: string;
}
/**
 * Manage product categories.
 * @param productId Product ID.
 * @param category Category.
 * @param mode Mode (add/remove).
 * @returns True if product categories were managed successfully, false otherwise.
 */
export const manageProductCategories = async (params: ManageProductCategoriesParams): Promise<boolean> => {
    const {
        productId,
        category,
        mode,
    } = params;
    try {
        const response = await apiClient.post(`/products/${productId}/categories`, {
            category,
            mode,
        });

        const isSuccess: boolean = response.status === 200;

        return isSuccess;
    } catch (error) {
        console.error('Error managing product categories:', error);
        return false;
    }
}
