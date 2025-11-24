'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useTransition } from 'react';
import {
    fetchWishlistIds,
    addWishlistProduct,
    removeWishlistProduct,
    clearWishlistProducts,
} from '@/lib/supabaseContext';

interface WishlistContextType {
    wishlistIds: string[];
    loading: boolean;
    error: string | null;
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => Promise<void>;
    wishlistCount: number;
    refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const loadWishlist = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const ids = await fetchWishlistIds();
            setWishlistIds(ids);
        } catch (err) {
            console.error('Failed to load wishlist from Supabase:', err);
            setError('Unable to load wishlist');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWishlist();
    }, [loadWishlist]);

    const refreshWishlist = useCallback(async () => {
        await loadWishlist();
    }, [loadWishlist]);

    const addToWishlist = async (productId: string) => {
        if (wishlistIds.includes(productId)) {
            return;
        }
        setWishlistIds((prev) => [...prev, productId]);
        try {
            await addWishlistProduct(productId);
        } catch (err) {
            console.error('Failed to add to wishlist:', err);
            setWishlistIds((prev) => prev.filter((id) => id !== productId));
            setError('Failed to add product to wishlist');
        } finally {
            startTransition(() => {
                loadWishlist();
            });
        }
    };

    const removeFromWishlist = async (productId: string) => {
        const previous = wishlistIds;
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        try {
            await removeWishlistProduct(productId);
        } catch (err) {
            console.error('Failed to remove from wishlist:', err);
            setWishlistIds(previous);
            setError('Failed to remove product from wishlist');
        } finally {
            startTransition(() => {
                loadWishlist();
            });
        }
    };

    const clearWishlist = async () => {
        const previous = wishlistIds;
        setWishlistIds([]);
        try {
            await clearWishlistProducts();
        } catch (err) {
            console.error('Failed to clear wishlist:', err);
            setWishlistIds(previous);
            setError('Failed to clear wishlist');
        } finally {
            startTransition(() => {
                loadWishlist();
            });
        }
    };

    const isInWishlist = (productId: string) => wishlistIds.includes(productId);

    const value: WishlistContextType = {
        wishlistIds,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlistIds.length,
        refreshWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
