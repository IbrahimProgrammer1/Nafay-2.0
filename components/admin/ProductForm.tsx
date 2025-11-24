'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import Button from '@/components/ui/Button';
import { Save, Plus, Trash } from 'lucide-react';

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: Product) => void;
    isEditing?: boolean;
}

export default function ProductForm({ initialData, onSubmit, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        slug: '',
        price: 0,
        description: '',
        category: '',
        images: [''],
        specs: {},
        tags: [],
        rating: 5,
        reviewCount: 0,
        ...initialData
    });

    const handleChange = <K extends keyof Product>(field: K, value: Product[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...(formData.images || [])];
        newImages[index] = value;
        handleChange('images', newImages);
    };

    const addImageField = () => {
        handleChange('images', [...(formData.images || []), '']);
    };

    const removeImageField = (index: number) => {
        const newImages = (formData.images || []).filter((_, i) => i !== index);
        handleChange('images', newImages);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation could go here
        onSubmit(formData as Product);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/40 space-y-6">
                <h2 className="text-xl font-bold text-foreground">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                                handleChange('name', e.target.value);
                                if (!isEditing) {
                                    handleChange('slug', e.target.value.toLowerCase().replace(/ /g, '-'));
                                }
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleChange('slug', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price (₹)</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange('price', Number(e.target.value))}
                            className="w-full px-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Business">Business</option>
                            <option value="Creator">Creator</option>
                            <option value="Ultrabook">Ultrabook</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/40 space-y-6">
                <h2 className="text-xl font-bold text-foreground">Images</h2>
                <div className="space-y-4">
                    {formData.images?.map((url, index) => (
                        <div key={index} className="flex gap-4">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                placeholder="Image URL (e.g., /images/laptop.jpg)"
                                className="flex-1 px-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                                <Trash className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addImageField}
                        className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
                    >
                        <Plus className="h-4 w-4" />
                        Add Image URL
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    {isEditing ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form>
    );
}
