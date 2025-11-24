'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils';
import { useWishlist } from '@/contexts/WishlistContext';
import { openWhatsAppInquiry } from '@/lib/whatsapp';
import { useComparison } from '@/contexts/ComparisonContext';
import { trackInquiry, trackWishlist, trackComparison } from '@/lib/analytics';
import { useInquiries } from '@/contexts/InquiryContext';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const discountPrice = product.discountPercentage
        ? calculateDiscountedPrice(product.price, product.discountPercentage)
        : product.price;

    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const { isInComparison, addToComparison, removeFromComparison } = useComparison();
    const inComparison = isInComparison(product.id);

    const { addInquiry } = useInquiries();

    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            await removeFromWishlist(product.id);
            trackWishlist({ id: product.id, name: product.name }, 'remove');
        } else {
            await addToWishlist(product.id);
            trackWishlist({ id: product.id, name: product.name }, 'add');
        }
    };

    const handleComparisonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const toggle = async () => {
            if (e.target.checked) {
                const added = await addToComparison(product.id);
                if (!added) {
                    alert('You can compare maximum 4 products at a time.');
                    e.target.checked = false;
                } else {
                    trackComparison({ id: product.id, name: product.name }, 'add');
                }
            } else {
                await removeFromComparison(product.id);
                trackComparison({ id: product.id, name: product.name }, 'remove');
            }
        };
        void toggle();
    };

    return (
        <Card padding="none" hoverable className={`group h-full flex flex-col overflow-hidden border-transparent bg-transparent shadow-none hover:shadow-none ${inComparison ? 'ring-2 ring-primary' : ''}`}>
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-secondary/10">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {product.discountPercentage && (
                        <Badge variant="destructive" className="rounded-md px-2 py-1 text-[10px] uppercase tracking-wider">
                            -{product.discountPercentage}%
                        </Badge>
                    )}
                    {product.tags.includes('new') && (
                        <Badge variant="secondary" className="rounded-md px-2 py-1 text-[10px] uppercase tracking-wider bg-white/80 backdrop-blur-sm text-foreground">
                            New
                        </Badge>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistClick}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 ${inWishlist ? 'text-destructive' : 'text-foreground/60 hover:text-destructive'
                        } hover:bg-white`}
                >
                    <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>

                <Link href={`/product/${product.slug}`}>
                    <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </Link>

                {/* Quick Inquire Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button
                        className="w-full bg-white/90 backdrop-blur-md text-foreground hover:bg-white hover:text-primary shadow-lg rounded-xl text-xs uppercase tracking-widest h-10"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            trackInquiry({ id: product.id, name: product.name, price: product.price });
                            addInquiry({
                                productId: product.id,
                                productName: product.name,
                                productPrice: product.price
                            });
                            openWhatsAppInquiry(product);
                        }}
                    >
                        Quick Inquire
                    </Button>
                </div>
            </div>

            {/* Content */}
            <CardContent className="flex-1 pt-4 px-1">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                    <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-xs font-medium text-foreground">{product.rating}</span>
                    </div>
                </div>

                <Link href={`/product/${product.slug}`} className="block group-hover:text-primary transition-colors">
                    <h3 className="font-serif text-lg font-medium text-foreground line-clamp-1">{product.name}</h3>
                </Link>

                <div className="mt-2 flex items-baseline gap-2">
                    {product.discountPercentage ? (
                        <>
                            <span className="text-base font-bold text-primary">{formatPrice(discountPrice)}</span>
                            <span className="text-sm text-muted-foreground line-through decoration-destructive/50">
                                {formatPrice(product.price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
                    )}
                </div>

                {/* Comparison Checkbox */}
                <div className="mt-3 pt-3 border-t border-border/30">
                    <label className="flex items-center gap-2 cursor-pointer group/compare">
                        <input
                            type="checkbox"
                            checked={inComparison}
                            onChange={handleComparisonChange}
                            className="w-4 h-4 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-xs text-muted-foreground group-hover/compare:text-foreground transition-colors">
                            Compare
                        </span>
                    </label>
                </div>
            </CardContent>
        </Card>
    );
}
