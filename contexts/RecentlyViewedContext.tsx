'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useTransition } from 'react';
import {
    fetchRecentlyViewedIds,
    upsertRecentlyViewedProduct,
    clearRecentlyViewedProducts,
} from '@/lib/supabaseContext';

interface RecentlyViewedContextType {
    recentlyViewedIds: string[];
    loading: boolean;
    error: string | null;
    addRecentlyViewed: (productId: string) => Promise<void>;
    clearRecentlyViewed: () => Promise<void>;
    refreshRecentlyViewed: () => Promise<void>;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENTLY_VIEWED = 10;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
    const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const loadRecentlyViewed = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const ids = await fetchRecentlyViewedIds(MAX_RECENTLY_VIEWED);
            setRecentlyViewedIds(ids);
        } catch (err) {
            console.error('Failed to load recently viewed items:', err);
            setError('Unable to load recently viewed items');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRecentlyViewed();
    }, [loadRecentlyViewed]);

    const refreshRecentlyViewed = useCallback(async () => {
        await loadRecentlyViewed();
    }, [loadRecentlyViewed]);

    const addRecentlyViewed = async (productId: string) => {
        setRecentlyViewedIds((prev) => {
            const filtered = prev.filter((id) => id !== productId);
            const updated = [productId, ...filtered];
            return updated.slice(0, MAX_RECENTLY_VIEWED);
        });

        try {
            await upsertRecentlyViewedProduct(productId);
        } catch (err) {
            console.error('Failed to upsert recently viewed item:', err);
            setError('Failed to record recently viewed item');
        } finally {
            startTransition(() => {
                loadRecentlyViewed();
            });
        }
    };

    const clearRecentlyViewed = async () => {
        setRecentlyViewedIds([]);
        try {
            await clearRecentlyViewedProducts();
        } catch (err) {
            console.error('Failed to clear recently viewed list:', err);
            setError('Failed to clear recently viewed items');
        } finally {
            startTransition(() => {
                loadRecentlyViewed();
            });
        }
    };

    const value: RecentlyViewedContextType = {
        recentlyViewedIds,
        loading,
        error,
        addRecentlyViewed,
        clearRecentlyViewed,
        refreshRecentlyViewed,
    };

    return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
    const context = useContext(RecentlyViewedContext);
    if (context === undefined) {
        throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
    }
    return context;
}
