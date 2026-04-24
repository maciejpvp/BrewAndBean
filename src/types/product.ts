export interface ProductMedia {
    type: string;
    key: string;
    isMain: boolean;
}

export interface Product {
    id: string;
    name: string;
    subtitle?: string;
    description: string;
    price: number;
    stock: number;
    media: ProductMedia[];
    categories: { name: string, slug: string }[];
    tech_spec?: { label: string, value: string }[];
    group?: string;
    attributes?: {
        roastLevel?: string;
        roastPercent?: number;
        profile?: string;
        weight?: string;
    };
    version: number;
    created_at: number;
    variants?: {
        id: string;
        name: string;
        media: ProductMedia[];
    }[];
}

// Build the CDN image URL from a media key
export const getProductImageUrl = (
    media: ProductMedia[],
    baseUrl = 'https://d17q0wnd7fgmqz.cloudfront.net/cdn/',
): string | null => {
    const main = media.find((m) => m.isMain) ?? media[0];
    if (!main) return null;
    if (main.key.startsWith('http://') || main.key.startsWith('https://')) {
        return main.key;
    }
    return `${baseUrl}${main.key}`;
};
