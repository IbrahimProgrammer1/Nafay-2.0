'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useProducts } from '@/contexts/ProductContext';
import { trackSearch } from '@/lib/analytics';
import { Product } from '@/types/product';

interface SearchBarProps {
    onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
    const { products } = useProducts();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length > 0) {
            const filtered = products
                .filter((product) => {
                    const searchTerm = query.toLowerCase();
                    return (
                        product.name.toLowerCase().includes(searchTerm) ||
                        product.category.toLowerCase().includes(searchTerm) ||
                        product.specs?.Brand?.toLowerCase().includes(searchTerm) ||
                        product.processor?.toLowerCase().includes(searchTerm) ||
                        product.description.toLowerCase().includes(searchTerm)
                    );
                })
                .slice(0, 6); // Limit to 6 suggestions

            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [products, query]);

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
    };

    const handleSelect = () => {
        setQuery('');
        setIsOpen(false);
        if (onClose) onClose();
    };

    const handleViewAll = () => {
        trackSearch(query);
        handleSelect();
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for laptops, brands, or specs..."
                    className="w-full pl-12 pr-12 py-3 rounded-full border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary/20 rounded-full transition-colors"
                    >
                        <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-border/40 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                    <div className="p-2">
                        {suggestions.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.slug}`}
                                onClick={handleSelect}
                                className="flex items-center gap-4 p-3 hover:bg-secondary/10 rounded-xl transition-colors group"
                            >
                                {/* Product Image */}
                                <div className="relative w-16 h-16 flex-shrink-0 bg-secondary/20 rounded-lg overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {product.processor} • {product.ram} • {product.storage}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-primary">
                                        ₹{product.price.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {product.category}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* View All Results */}
                    <Link
                        href={`/shop?search=${encodeURIComponent(query)}`}
                        onClick={handleViewAll}
                        className="block p-3 text-center text-sm font-medium text-primary hover:bg-secondary/10 border-t border-border/40 transition-colors"
                    >
                        View all results for &ldquo;{query}&rdquo;
                    </Link>
                </div>
            )}

            {/* No Results */}
            {isOpen && query.trim().length > 0 && suggestions.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-border/40 p-8 text-center z-50">
                    <p className="text-muted-foreground">No laptops found for &ldquo;{query}&rdquo;</p>
                    <Link
                        href="/shop"
                        onClick={handleSelect}
                        className="inline-block mt-2 text-sm text-primary hover:text-primary/80"
                    >
                        Browse all laptops
                    </Link>
                </div>
            )}
        </div>
    );
}
