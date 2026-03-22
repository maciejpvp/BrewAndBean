export interface Address {
    id: string; // The backend usually generates this
    name: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    is_default: boolean;
}

export interface CreateAddressPayload {
    name: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    is_default?: boolean;
}

export interface AddressResponse {
    addresses: Address[];
}
