export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    category: string;
    images: string[];
    rating: number;
    reviewCount: number;
    inStock: boolean;
    sizes?: string[];
    colors?: string[];
    tags: string[];
    specs?: Record<string, string>;
    // Laptop-specific fields
    processor?: string;
    ram?: string;
    storage?: string;
    display?: string;
    gpu?: string;
    status?: 'active' | 'hidden' | 'archived';
    createdAt?: string | null;
    updatedAt?: string | null;
    deletedAt?: string | null;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    productCount: number;
}

export interface FilterOptions {
    categories: string[];
    priceRange: [number, number];
    sizes?: string[];
    colors?: string[];
    inStock?: boolean;
}
