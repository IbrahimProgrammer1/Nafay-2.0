'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function AdminProductsPage() {
    const { products, deleteProduct } = useProducts();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-serif font-bold text-foreground">Products</h1>
                <Link href="/admin/products/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary/10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-secondary/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-foreground">{product.name}</div>
                                                <div className="text-xs text-muted-foreground">{product.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                                        ₹{product.price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/products/${product.id}`}>
                                                <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
