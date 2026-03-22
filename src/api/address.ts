import { apiClient } from '../lib/apiClient';
import type { Address, CreateAddressPayload, AddressResponse } from '../types/address';

export const fetchAddresses = async (): Promise<Address[]> => {
    const { data } = await apiClient.get<Address[] | AddressResponse>('/user/address');
    return Array.isArray(data) ? data : (data as AddressResponse).addresses || [];
};

export const createAddress = async (payload: CreateAddressPayload): Promise<Address> => {
    const { data } = await apiClient.post<Address>('/user/address', payload);
    return data;
};
