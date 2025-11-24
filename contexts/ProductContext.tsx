'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useTransition } from 'react';
import { Product } from '@/types/product';
import { products as seedProducts } from '@/data/products';
import { supabaseClient } from '@/lib/supabaseClient';
import { createProductAction, deleteProductAction, updateProductAction } from '@/app/actions/productActions';

interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    refreshProducts: () => Promise<void>;
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    getProduct: (slug: string) => Product | undefined;
    lastSyncedAt: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const PRODUCTS_TABLE = 'products';

type SupabaseProductRecord = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    original_price?: number | null;
    discount_percentage?: number | null;
    category: string;
    images?: string[];
    rating?: number | null;
    review_count?: number | null;
    in_stock?: boolean | null;
    sizes?: string[];
    colors?: string[];
    tags?: string[];
    specs?: Record<string, string>;
    processor?: string | null;
    ram?: string | null;
    storage?: string | null;
    display?: string | null;
    gpu?: string | null;
    status?: 'active' | 'hidden' | 'archived';
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
};

function mapProductRecord(record: SupabaseProductRecord): Product {
    return {
        id: record.id,
        slug: record.slug,
        name: record.name,
        description: record.description,
        price: record.price,
        originalPrice: record.original_price ?? record.price,
        discountPercentage: record.discount_percentage ?? undefined,
        category: record.category,
        images: record.images ?? [],
        rating: record.rating ?? 5,
        reviewCount: record.review_count ?? 0,
        inStock: record.in_stock ?? true,
        sizes: record.sizes ?? [],
        colors: record.colors ?? [],
        tags: record.tags ?? [],
        specs: record.specs ?? {},
        processor: record.processor ?? undefined,
        ram: record.ram ?? undefined,
        storage: record.storage ?? undefined,
        display: record.display ?? undefined,
        gpu: record.gpu ?? undefined,
        status: record.status ?? 'active',
        createdAt: record.created_at ?? null,
        updatedAt: record.updated_at ?? null,
        deletedAt: record.deleted_at ?? null,
    };
}

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(seedProducts);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabaseClient
            .from(PRODUCTS_TABLE)
            .select('*')
            .neq('status', 'archived')
            .order('created_at', { ascending: false });

        if (error || !data) {
            console.error('Failed to load products from Supabase', error);
            setError(error?.message ?? 'Unable to load products');
            setProducts(seedProducts);
            setLoading(false);
            return;
        }

        setProducts(data.map(mapProductRecord));
        setLastSyncedAt(new Date().toISOString());
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const refreshProducts = useCallback(async () => {
        await fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (product: Product) => {
        const payload = {
            ...product,
            status: product.status ?? 'active'
        };
        await createProductAction(payload);
        startTransition(() => {
            fetchProducts();
        });
    };

    const updateProduct = async (id: string, updates: Partial<Product>) => {
        await updateProductAction(id, updates);
        startTransition(() => {
            fetchProducts();
        });
    };

    const deleteProduct = async (id: string) => {
        await deleteProductAction(id);
        startTransition(() => {
            fetchProducts();
        });
    };

    const getProduct = (slug: string) => {
        return products.find(p => p.slug === slug);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                refreshProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                getProduct,
                lastSyncedAt,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
