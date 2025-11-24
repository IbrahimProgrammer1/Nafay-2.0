'use client';

import { useRouter } from 'next/navigation';
import { useProducts } from '@/contexts/ProductContext';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/types/product';
import { useState } from 'react';

export default function AddProductPage() {
    const { addProduct } = useProducts();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: Product) => {
        try {
            setIsSubmitting(true);
            setError(null);

            // Remove id field entirely - Supabase will generate it
            const { id, ...dataWithoutId } = data;

            // Ensure required fields are set
            const productData = {
                ...dataWithoutId,
                inStock: data.inStock ?? true,
                rating: data.rating ?? 5,
                reviewCount: data.reviewCount ?? 0,
                tags: data.tags ?? [],
                images: data.images?.filter(img => img.trim() !== '') ?? [],
                specs: data.specs ?? {},
                status: 'active' as const,
            };

            await addProduct(productData as Product);
            router.push('/admin/products');
        } catch (err) {
            console.error('Failed to create product:', err);
            setError(err instanceof Error ? err.message : 'Failed to create product');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-foreground">Add New Product</h1>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {isSubmitting && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                    Creating product... Please wait.
                </div>
            )}

            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
}
