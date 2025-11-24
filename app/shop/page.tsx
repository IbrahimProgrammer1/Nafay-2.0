'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { useProducts } from '@/contexts/ProductContext';
import { categories } from '@/data/categories';
import { Filter, X } from 'lucide-react';

export default function ShopPage() {
    const { products } = useProducts();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
    const [sortBy, setSortBy] = useState<string>('featured');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Get search query from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search');
        if (search) {
            setSearchQuery(search);
        }
    }, []);

    // Filter products
    const filteredProducts = products.filter((product) => {
        // Search filter
        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.specs?.Brand?.toLowerCase().includes(query) ||
                product.processor?.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query);

            if (!matchesSearch) return false;
        }

        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }

        // Price filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
            return false;
        }

        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 150000]);
    };

    const FiltersSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`bg-white rounded-2xl shadow-sm border border-border/40 p-6 ${isMobile ? '' : 'sticky top-24'}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                </h2>
                {isMobile && (
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Clear Filters */}
            {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 150000) && (
                <button
                    onClick={clearFilters}
                    className="w-full mb-4 text-sm text-primary hover:text-primary/80 transition-colors text-left"
                >
                    Clear all filters
                </button>
            )}

            {/* Categories */}
            <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">
                    Categories
                </h3>
                <div className="space-y-3">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.name)}
                                onChange={() => toggleCategory(category.name)}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                {category.name}
                            </span>
                            <span className="ml-auto text-xs text-muted-foreground">
                                ({products.filter(p => p.category === category.name).length})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">
                    Price Range
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="w-full px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                placeholder="Min"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full px-3 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                placeholder="Max"
                            />
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="150000"
                        step="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Brands */}
            <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">
                    Brands
                </h3>
                <div className="space-y-3">
                    {['HP', 'DELL', 'LENOVO', 'Asus'].map((brand) => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                {brand}
                            </span>
                            <span className="ml-auto text-xs text-muted-foreground">
                                ({products.filter(p => p.specs?.Brand === brand).length})
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-secondary/10 border-b border-border/40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Laptops'}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        {searchQuery
                            ? `Found ${filteredProducts.length} laptop${filteredProducts.length !== 1 ? 's' : ''} matching your search`
                            : 'Browse our complete collection of premium laptops from leading brands'
                        }
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <FiltersSidebar />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Showing <span className="font-semibold text-foreground">{sortedProducts.length}</span> of{' '}
                                    <span className="font-semibold text-foreground">{products.length}</span> laptops
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 hover:bg-secondary/20 transition-colors"
                                >
                                    <Filter className="h-4 w-4" />
                                    Filters
                                </button>

                                {/* Sort Dropdown */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 rounded-full border border-border/40 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {selectedCategories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedCategories.map((category) => (
                                    <span
                                        key={category}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                                    >
                                        {category}
                                        <button
                                            onClick={() => toggleCategory(category)}
                                            className="hover:bg-primary/20 rounded-full p-0.5"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Products Grid */}
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground text-lg mb-4">
                                    No laptops found matching your filters
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowMobileFilters(false)}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background p-6 overflow-y-auto">
                        <FiltersSidebar isMobile />
                    </div>
                </div>
            )}
        </div>
    );
}
