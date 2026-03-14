import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCart, updateCart, addToCart } from '../api/cart';
import type { CartResponse, CartItemProductInfo } from '../api/cart';
import { useUserStore } from '../store/useUserStore';
import type { Product } from '../types/product';

export const cartKeys = {
    all: ['cart'] as const,
    detail: () => [...cartKeys.all, 'detail'] as const,
};

export const useCart = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);

    return useQuery({
        queryKey: cartKeys.detail(),
        queryFn: fetchCart,
        enabled: isLoggedIn, // Only fetch if the user is logged in
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
            updateCart(productId, quantity),
        onMutate: async ({ productId, quantity }) => {
            await queryClient.cancelQueries({ queryKey: cartKeys.detail() });
            const previousCart = queryClient.getQueryData<CartResponse>(cartKeys.detail());

            queryClient.setQueryData<CartResponse>(cartKeys.detail(), (old) => {
                if (!old) return old;
                
                if (quantity === 0) {
                    return {
                        ...old,
                        cartItems: old.cartItems.filter((i) => i.item.PK.replace('PRODUCT#', '') !== productId && i.item.PK !== productId)
                    };
                }

                return {
                    ...old,
                    cartItems: old.cartItems.map((i) =>
                        i.item.PK.replace('PRODUCT#', '') === productId || i.item.PK === productId
                            ? { ...i, quantity }
                            : i
                    ),
                };
            });

            return { previousCart };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(cartKeys.detail(), context.previousCart);
            }
        },
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number; product?: Product }) =>
            addToCart(productId, quantity),
        onMutate: async () => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: cartKeys.detail() });
        },
        onSuccess: (_, { productId, quantity, product }) => {
            queryClient.setQueryData<CartResponse>(cartKeys.detail(), (old) => {
                const currentCart = old || { cartItems: [] };

                const existingItem = currentCart.cartItems.find(
                    (i) => i.item.PK.replace('PRODUCT#', '') === productId || i.item.PK === productId
                );

                if (existingItem) {
                    return {
                        ...currentCart,
                        cartItems: currentCart.cartItems.map((i) =>
                            i.item.PK.replace('PRODUCT#', '') === productId || i.item.PK === productId
                                ? { ...i, quantity: i.quantity + quantity }
                                : i
                        ),
                    };
                } else if (product) {
                    return {
                        ...currentCart,
                        cartItems: [
                            ...currentCart.cartItems,
                            { item: product as unknown as CartItemProductInfo, quantity },
                        ],
                    };
                }
                return currentCart;
            });
        },
    });
};
