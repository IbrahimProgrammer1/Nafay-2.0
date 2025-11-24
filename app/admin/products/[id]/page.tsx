'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProducts } from '@/contexts/ProductContext';
import ProductForm from '@/components/admin/ProductForm';
import { Product } from '@/types/product';

export default function EditProductPage() {
    const params = useParams<{ id: string }>();
    const { products, updateProduct } = useProducts();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (params?.id) {
            const found = products.find(p => p.id === params.id);
            if (found) {
                setProduct(found);
            } else {
                router.push('/admin/products');
            }
        }
    }, [params, products, router]);

    const handleSubmit = (data: Product) => {
        if (product) {
            updateProduct(product.id, data);
            router.push('/admin/products');
        }
    };

    if (!product) return null;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-foreground">Edit Product</h1>
            <ProductForm initialData={product} onSubmit={handleSubmit} isEditing />
        </div>
    );
}
