'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, MessageCircle, Heart, Trash2, GitCompare } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useProducts } from '@/contexts/ProductContext';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { openWhatsAppInquiry } from '@/lib/whatsapp';

export default function ComparePage() {
    const { comparisonIds, removeFromComparison, clearComparison } = useComparison();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { products } = useProducts();
    const comparisonProducts = products.filter((product) => comparisonIds.includes(product.id));

    // Empty state
    if (comparisonIds.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center">
                                <GitCompare className="h-12 w-12 text-muted-foreground" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                            No Products to Compare
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Select products from the shop page using the compare checkbox to see them side-by-side.
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
                            Compare Products
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {comparisonIds.length} {comparisonIds.length === 1 ? 'product' : 'products'} selected
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => {
                            void clearComparison();
                        }}
                        className="gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Clear All
                    </Button>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            {/* Product Images & Names */}
                            <tr className="border-b border-border">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground w-48">
                                    Product
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4 min-w-[250px]">
                                        <div className="space-y-4">
                                            <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary/10">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="250px"
                                                />
                                                <button
                                                    onClick={() => {
                                                        void removeFromComparison(product.id);
                                                    }}
                                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <Link href={`/product/${product.slug}`} className="block">
                                                <h3 className="font-serif text-lg font-bold text-foreground hover:text-primary transition-colors">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Price */}
                            <tr className="border-b border-border bg-secondary/5">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Price
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-bold text-primary">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.discountPercentage && (
                                                <span className="text-sm text-destructive font-medium">
                                                    {product.discountPercentage}% OFF
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Category */}
                            <tr className="border-b border-border">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Category
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4 text-foreground">
                                        {product.category}
                                    </td>
                                ))}
                            </tr>

                            {/* Processor */}
                            <tr className="border-b border-border bg-secondary/5">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Processor
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4 text-foreground">
                                        {product.processor || '-'}
                                    </td>
                                ))}
                            </tr>

                            {/* RAM */}
                            <tr className="border-b border-border">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    RAM
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4 text-foreground font-medium">
                                        {product.ram || '-'}
                                    </td>
                                ))}
                            </tr>

                            {/* Storage */}
                            <tr className="border-b border-border bg-secondary/5">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Storage
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4 text-foreground font-medium">
                                        {product.storage || '-'}
                                    </td>
                                ))}
                            </tr>

                            {/* Graphics */}
                            <tr className="border-b border-border">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Graphics
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4 text-foreground">
                                        {product.gpu || '-'}
                                    </td>
                                ))}
                            </tr>

                            {/* Display */}
                            <tr className="border-b border-border bg-secondary/5">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Display
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4 text-foreground">
                                        {product.display || '-'}
                                    </td>
                                ))}
                            </tr>

                            {/* Rating */}
                            <tr className="border-b border-border">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Rating
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-bold text-foreground">{product.rating}</span>
                                            <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Stock Status */}
                            <tr className="border-b border-border bg-secondary/5">
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Availability
                                </td>
                                {comparisonProducts.map((product) => (
                                    <td key={product.id} className="p-4">
                                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-destructive'}`}>
                                            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-600' : 'bg-destructive'}`}></span>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Actions */}
                            <tr>
                                <td className="p-4 font-bold text-sm uppercase tracking-wider text-muted-foreground">
                                    Actions
                                </td>
                                {comparisonProducts.map((product) => {
                                    const inWishlist = isInWishlist(product.id);
                                    return (
                                        <td key={product.id} className="p-4">
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    className="w-full gap-2"
                                                    onClick={() => openWhatsAppInquiry(product)}
                                                >
                                                    <MessageCircle className="h-4 w-4" />
                                                    Inquire
                                                </Button>
                                                <Button
                                                    variant={inWishlist ? "primary" : "outline"}
                                                    className="w-full gap-2"
                                                    onClick={() => {
                                                        if (inWishlist) {
                                                            void removeFromWishlist(product.id);
                                                        } else {
                                                            void addToWishlist(product.id);
                                                        }
                                                    }}
                                                >
                                                    <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
                                                    {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                                </Button>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
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
