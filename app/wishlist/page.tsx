'use client';

import Link from 'next/link';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useProducts } from '@/contexts/ProductContext';
import ProductCard from '@/components/product/ProductCard';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
    const { wishlistIds, clearWishlist } = useWishlist();
    const { products } = useProducts();
    const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

    if (wishlistIds.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center">
                                <Heart className="h-12 w-12 text-muted-foreground" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                            Your Wishlist is Empty
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Start adding products to your wishlist by clicking the heart icon on products you love.
                        </p>
                        <Link href="/shop">
                            <Button size="lg" className="shadow-xl shadow-primary/20">
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Browse Laptops
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                            My Wishlist
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {wishlistIds.length} {wishlistIds.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                    {wishlistIds.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                void clearWishlist();
                            }}
                            className="gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Clear All
                        </Button>
                    )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {wishlistProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-16 text-center">
                    <Link href="/shop">
                        <Button variant="outline" size="lg" className="gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
