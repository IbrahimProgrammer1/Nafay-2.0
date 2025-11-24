'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Star, Truck, Shield, ArrowLeft, Heart, Share2, Cpu, HardDrive, Gauge, MessageCircle } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { Product } from '@/types/product';
import { openWhatsAppInquiry } from '@/lib/whatsapp';
import { trackInquiry, trackWishlist, trackViewItem } from '@/lib/analytics';
import { useInquiries } from '@/contexts/InquiryContext';

export default function ProductPage() {
    const params = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { getProduct } = useProducts();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const { addRecentlyViewed } = useRecentlyViewed();
    const { addInquiry } = useInquiries();

    useEffect(() => {
        if (params?.slug) {
            const foundProduct = getProduct(params.slug);
            if (foundProduct) {
                setProduct(foundProduct);
                // Add to recently viewed when product is loaded
                addRecentlyViewed(foundProduct.id);
                // Track view item event
                trackViewItem({
                    id: foundProduct.id,
                    name: foundProduct.name,
                    price: foundProduct.price,
                    category: foundProduct.category
                });
            }
        }
    }, [params, addRecentlyViewed]);

    if (!product) {
        return null;
    }

    const inWishlist = isInWishlist(product.id);

    const handleWishlistClick = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
            trackWishlist({ id: product.id, name: product.name }, 'remove');
        } else {
            addToWishlist(product.id);
            trackWishlist({ id: product.id, name: product.name }, 'add');
        }
    };

    const discountPrice = product.discountPercentage
        ? calculateDiscountedPrice(product.price, product.discountPercentage)
        : product.price;

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Shop
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/10 border border-border/50">
                            {/* Badges */}
                            <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
                                {product.discountPercentage && (
                                    <Badge variant="destructive" className="px-3 py-1.5 text-xs uppercase tracking-wider">
                                        -{product.discountPercentage}%
                                    </Badge>
                                )}
                                {product.tags.includes('new') && (
                                    <Badge variant="secondary" className="px-3 py-1.5 text-xs uppercase tracking-wider bg-white/80 backdrop-blur-sm">
                                        New Arrival
                                    </Badge>
                                )}
                            </div>

                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <div key={index} className="relative aspect-square overflow-hidden rounded-xl bg-secondary/10 cursor-pointer border-2 border-transparent hover:border-primary transition-all">
                                    <Image
                                        src={image}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 25vw, 10vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="text-sm font-medium text-primary uppercase tracking-widest">{product.category}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-primary text-primary" />
                                <span className="font-bold text-lg">{product.rating}</span>
                                <span className="text-muted-foreground ml-1">({product.reviewCount} reviews)</span>
                            </div>
                            <div className="h-6 w-px bg-border"></div>
                            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-green-600"></span>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            {product.discountPercentage ? (
                                <>
                                    <span className="text-4xl font-bold text-primary">{formatPrice(discountPrice)}</span>
                                    <span className="text-xl text-muted-foreground line-through decoration-destructive/30">
                                        {formatPrice(product.price)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
                            )}
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Technical Specifications */}
                        {(product.ram || product.storage || product.gpu) && (
                            <div className="mb-10 p-6 rounded-2xl bg-secondary/10 border border-border/50">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                                    Technical Specifications
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.ram && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Cpu className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">RAM</p>
                                                <p className="text-sm font-bold text-foreground">{product.ram}</p>
                                            </div>
                                        </div>
                                    )}
                                    {product.storage && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <HardDrive className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Storage</p>
                                                <p className="text-sm font-bold text-foreground">{product.storage}</p>
                                            </div>
                                        </div>
                                    )}
                                    {product.gpu && (
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Gauge className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide">Graphics</p>
                                                <p className="text-sm font-bold text-foreground">{product.gpu}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Selectors */}
                        <div className="space-y-8 mb-10 border-t border-b border-border/50 py-8">
                            {/* Color Selector */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="space-y-4">
                                    <span className="text-sm font-bold uppercase tracking-wider text-foreground">Select Color</span>
                                    <div className="flex gap-3">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                className="h-10 w-10 rounded-full border border-border shadow-sm hover:scale-110 transition-transform focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                                style={{ backgroundColor: color.toLowerCase() }}
                                                aria-label={`Select ${color}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selector */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold uppercase tracking-wider text-foreground">Select Size</span>
                                        <button className="text-xs text-muted-foreground underline hover:text-primary">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                className="h-12 min-w-[3rem] px-4 rounded-lg border border-border bg-background hover:border-primary hover:text-primary transition-all font-medium"
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button
                                size="lg"
                                className="flex-1 h-14 text-lg shadow-xl shadow-primary/20 gap-2"
                                onClick={() => {
                                    openWhatsAppInquiry(product);
                                    trackInquiry({ id: product.id, name: product.name, price: product.price });
                                    addInquiry({
                                        productId: product.id,
                                        productName: product.name,
                                        productPrice: product.price
                                    });
                                }}
                            >
                                <MessageCircle className="h-5 w-5" />
                                Inquire on WhatsApp
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className={`h-14 w-14 p-0 rounded-full ${inWishlist ? 'border-destructive bg-destructive/10' : ''}`}
                                onClick={handleWishlistClick}
                            >
                                <Heart className={`h-6 w-6 ${inWishlist ? 'fill-destructive text-destructive' : ''}`} />
                            </Button>
                            <Button variant="ghost" size="lg" className="h-14 w-14 p-0 rounded-full">
                                <Share2 className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/10">
                                <Truck className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h4 className="font-bold text-sm mb-1">Free Shipping</h4>
                                    <p className="text-xs text-muted-foreground">On all orders over $100</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/10">
                                <Shield className="h-6 w-6 text-primary mt-1" />
                                <div>
                                    <h4 className="font-bold text-sm mb-1">2 Year Warranty</h4>
                                    <p className="text-xs text-muted-foreground">Full coverage protection</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
