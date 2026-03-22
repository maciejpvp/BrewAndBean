import { apiClient } from '../lib/apiClient';

export type CartItemInput = {
    productId: string;
    quantity: number;
};

export type CalculateCheckoutProps = {
    userId: string;
    orderId: string;
    cartItems: CartItemInput[];
    couponCode?: string;
};

export type OrderSummaryItem = {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    discountApplied: number;
    subtotal: number;
    appliedRules: string[];
};

export type OrderSummary = {
    userId: string;
    orderId: string;
    lineItems: OrderSummaryItem[];
    subtotalBeforeDiscounts: number;
    itemDiscountTotal: number;
    orderDiscountTotal: number;
    shippingCost: number;
    totalAmount: number;
    appliedOrderRules: string[];
    currency: string;
};

export const calculateCheckout = async (
    props: CalculateCheckoutProps
): Promise<OrderSummary> => {
    const payload: CalculateCheckoutProps = {
        ...props,
        userId: '',
    };
    const { data } = await apiClient.post<OrderSummary>(
        'https://d17q0wnd7fgmqz.cloudfront.net/api/checkout/calculate',
        payload
    );
    return data;
};

export const initCheckout = async (addressId: string) => {
    const { data } = await apiClient.post(
        '/checkout',
        { addressId }
    );
    console.log('initCheckout', data);
    return data;
};

export const fetchForSession = async (orderId: string) => {
    const { data } = await apiClient.get(
        `/checkout/${orderId}`,
    );
    const url = data.sessionUrl;
    return url;
};