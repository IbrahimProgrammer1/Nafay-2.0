import { Category } from '@/types/product';

export const categories: Category[] = [
    {
        id: '1',
        name: 'Gaming Laptops',
        slug: 'gaming',
        description: 'High-performance laptops for immersive gaming',
        productCount: 3
    },
    {
        id: '2',
        name: 'Business Laptops',
        slug: 'business',
        description: 'Professional laptops for productivity',
        productCount: 2
    },
    {
        id: '3',
        name: 'Ultrabooks',
        slug: 'ultrabook',
        description: 'Thin, lightweight, and portable laptops',
        productCount: 3
    },
    {
        id: '4',
        name: 'Creator Laptops',
        slug: 'creator',
        description: 'Powerful laptops for content creation',
        productCount: 2
    },
    {
        id: '5',
        name: 'Budget Laptops',
        slug: 'budget',
        description: 'Affordable laptops for everyday tasks',
        productCount: 2
    }
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((category) => category.slug === slug);
}
