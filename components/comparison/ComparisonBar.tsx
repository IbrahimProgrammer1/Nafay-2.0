'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import { getProductsByIds } from '@/data/products';
import Button from '@/components/ui/Button';

export default function ComparisonBar() {
    const { comparisonIds, removeFromComparison, clearComparison, comparisonCount } = useComparison();
    const comparisonProducts = getProductsByIds(comparisonIds);

    // Don't show bar if no products
    if (comparisonCount === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t-2 border-primary shadow-2xl shadow-primary/20 animate-in slide-in-from-bottom duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Left: Product Count */}
                    <div className="flex-shrink-0">
                        <p className="text-sm font-bold text-foreground">
                            Compare Products
                            <span className="ml-2 text-primary">({comparisonCount}/4)</span>
                        </p>
                    </div>

                    {/* Middle: Product Thumbnails */}
                    <div className="flex-1 flex items-center gap-3 overflow-x-auto max-w-2xl">
                        {comparisonProducts.map((product) => (
                            <div
                                key={product.id}
                                className="relative flex-shrink-0 group"
                            >
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-border bg-secondary/10">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="64px"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        void removeFromComparison(product.id);
                                    }}
                                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                    aria-label={`Remove ${product.name}`}
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] bg-background px-1 rounded whitespace-nowrap max-w-16 truncate">
                                    {product.name}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                void clearComparison();
                            }}
                            className="text-xs"
                        >
                            Clear All
                        </Button>
                        <Link href="/compare">
                            <Button size="sm" className="gap-2">
                                Compare Now
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
