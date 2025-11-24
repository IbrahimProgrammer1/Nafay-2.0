'use client';

import Hero from '@/components/sections/Hero';
import ProductGrid from '@/components/sections/ProductGrid';
import RecentlyViewedSection from '@/components/sections/RecentlyViewedSection';
import { useProducts } from '@/contexts/ProductContext';
import { categories } from '@/data/categories';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter(product => product.tags.includes('featured'));

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Recently Viewed Products */}
      <RecentlyViewedSection />

      {/* Featured Products */}
      <ProductGrid products={featuredProducts} title="Featured Laptops" />

      {/* Categories Section */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
              Shop by Category
            </h2>
            <Link href="/shop" className="group flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href="/shop"
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-white shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                {/* Placeholder for Category Image */}
                <div className="absolute inset-0 bg-secondary/20 group-hover:scale-105 transition-transform duration-700" />

                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs text-white/90">Shop Now</span>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Brand Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Find Your Perfect Laptop</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Subscribe to receive updates on new laptop models, exclusive deals, and expert buying guides.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <button className="px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-lg">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
