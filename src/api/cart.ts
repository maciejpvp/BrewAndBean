import { apiClient } from '../lib/apiClient';

export interface CartItemProductInfo {
    PK: string;
    SK: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    media: Array<{
        type: string;
        key: string;
        isMain: boolean;
    }>;
    version: number;
    created_at: number;
}

export interface CartItem {
    item: CartItemProductInfo;
    quantity: number;
}

export interface CartResponse {
    cartItems: CartItem[];
}

export const fetchCart = async (): Promise<CartResponse> => {
    const { data } = await apiClient.get<CartResponse>('/cart');
    return data;
};

export const updateCart = async (productId: string, quantity: number): Promise<void> => {
    await apiClient.patch('/cart', { productId, quantity });
};

export const addToCart = async (productId: string, quantity: number): Promise<void> => {
    await apiClient.post('/cart', { productId, quantity });
};
