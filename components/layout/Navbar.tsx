'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Heart, GitCompare } from 'lucide-react';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/ui/SearchBar';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { trackSearch } from '@/lib/analytics';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { wishlistCount } = useWishlist();
    const { comparisonCount } = useComparison();

    const handleSearchClose = () => {
        setShowSearch(false);
    };

    // Note: SearchBar component handles the actual search submission. 
    // We might need to pass a callback to SearchBar if we want to track the query here,
    // or update SearchBar to track it directly. 
    // For now, let's assume SearchBar will be updated or we track opening search.
    // Actually, let's update SearchBar later. For now, just importing it.

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-3 -ml-2 hover:bg-secondary/20 rounded-full transition-colors text-foreground/80"
                        aria-label="Menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Logo */}
                    <div className="flex-1 md:flex-none flex justify-center md:justify-start">
                        <Link href="/" className="flex items-center">
                            <span className="text-3xl font-serif font-bold tracking-tight text-primary">Nafay</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 mx-8">
                        <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors tracking-wide">
                            ALL LAPTOPS
                        </Link>
                        <Link href="/warranty" className="text-sm font-medium hover:text-primary transition-colors tracking-wide">
                            WARRANTY
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Search Icon */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-3 hover:bg-secondary/20 rounded-full transition-colors text-foreground/80"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Wishlist Button */}
                        <Link href="/wishlist">
                            <Button variant="ghost" className="relative p-3 hover:bg-secondary/20 rounded-full">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Wishlist</span>
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Comparison Button */}
                        <Link href="/compare">
                            <Button variant="ghost" className="relative p-3 hover:bg-secondary/20 rounded-full">
                                <GitCompare className="h-5 w-5" />
                                <span className="sr-only">Compare</span>
                                {comparisonCount > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                                        {comparisonCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Search Bar Overlay - Desktop */}
                {showSearch && (
                    <div className="hidden md:block py-4 animate-fade-in">
                        <SearchBar onClose={() => setShowSearch(false)} />
                    </div>
                )}
            </nav>
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-6">
                    <Link href="/" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link href="/shop" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>All Laptops</Link>
                    <Link href="/warranty" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Warranty</Link>
                    <button className="p-3" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X className="h-6 w-6" /></button>
                </div>
            )}

            {/* Mobile Search Overlay */}
            {showSearch && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowSearch(false)}>
                    <div className="bg-background p-4 animate-slide-down" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">Search Laptops</h2>
                            <button
                                onClick={() => setShowSearch(false)}
                                className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <SearchBar onClose={() => setShowSearch(false)} />
                    </div>
                </div>
            )}
        </header>
    );
}
