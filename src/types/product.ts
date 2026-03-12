export interface ProductMedia {
    type: string;
    key: string;
    isMain: boolean;
}

export interface Product {
    PK: string;            // e.g. "PRODUCT#<uuid>"
    SK: string;            // e.g. "METADATA"
    name: string;
    description: string;
    price: number;
    stock: number;
    media: ProductMedia[];
    categories: {name: string, slug: string}[];
    version: number;
    created_at: number;
}

// Convenience getter for the product's UUID
export const getProductId = (product: Product): string =>
    product.PK.replace('PRODUCT#', '');

// Build the CDN image URL from a media key
export const getProductImageUrl = (
    media: ProductMedia[],
    baseUrl = 'https://d17q0wnd7fgmqz.cloudfront.net/cdn/',
): string | null => {
    const main = media.find((m) => m.isMain) ?? media[0];
    return main ? `${baseUrl}${main.key}` : null;
};
