'use client';

import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { getProductsByIds } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function RecentlyViewedSection() {
    const { recentlyViewedIds } = useRecentlyViewed();

    // Get the actual product objects from IDs
    const recentlyViewedProducts = getProductsByIds(recentlyViewedIds);

    // Don't render if no products have been viewed
    if (recentlyViewedProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
                        Recently Viewed
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Products you&rsquo;ve recently looked at
                    </p>
                </div>

                {/* Horizontal Scrollable Grid */}
                <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                    <div className="flex gap-6 pb-4">
                        {recentlyViewedProducts.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-[320px]">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
