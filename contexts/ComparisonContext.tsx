'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useTransition } from 'react';
import {
    fetchComparisonIds,
    addComparisonProduct,
    removeComparisonProduct,
    clearComparisonProducts,
} from '@/lib/supabaseContext';

interface ComparisonContextType {
    comparisonIds: string[];
    loading: boolean;
    error: string | null;
    addToComparison: (productId: string) => Promise<boolean>;
    removeFromComparison: (productId: string) => Promise<void>;
    isInComparison: (productId: string) => boolean;
    clearComparison: () => Promise<void>;
    comparisonCount: number;
    canAddMore: boolean;
    refreshComparison: () => Promise<void>;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_COMPARISON_ITEMS = 4;

export function ComparisonProvider({ children }: { children: ReactNode }) {
    const [comparisonIds, setComparisonIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const loadComparison = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const ids = await fetchComparisonIds();
            setComparisonIds(ids.slice(0, MAX_COMPARISON_ITEMS));
        } catch (err) {
            console.error('Failed to load comparisons from Supabase:', err);
            setError('Unable to load comparison list');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadComparison();
    }, [loadComparison]);

    const refreshComparison = useCallback(async () => {
        await loadComparison();
    }, [loadComparison]);

    const addToComparison = async (productId: string): Promise<boolean> => {
        if (comparisonIds.includes(productId)) {
            return true;
        }

        if (comparisonIds.length >= MAX_COMPARISON_ITEMS) {
            setError('You can compare up to four laptops.');
            return false;
        }

        setComparisonIds((prev) => [...prev, productId]);
        try {
            await addComparisonProduct(productId);
            return true;
        } catch (err) {
            console.error('Failed to add to comparison:', err);
            setComparisonIds((prev) => prev.filter((id) => id !== productId));
            setError('Failed to add product to comparison');
            return false;
        } finally {
            startTransition(() => {
                loadComparison();
            });
        }
    };

    const removeFromComparison = async (productId: string) => {
        const previous = comparisonIds;
        setComparisonIds((prev) => prev.filter((id) => id !== productId));
        try {
            await removeComparisonProduct(productId);
        } catch (err) {
            console.error('Failed to remove from comparison:', err);
            setComparisonIds(previous);
            setError('Failed to remove product from comparison');
        } finally {
            startTransition(() => {
                loadComparison();
            });
        }
    };

    const clearComparison = async () => {
        const previous = comparisonIds;
        setComparisonIds([]);
        try {
            await clearComparisonProducts();
        } catch (err) {
            console.error('Failed to clear comparison:', err);
            setComparisonIds(previous);
            setError('Failed to clear comparison list');
        } finally {
            startTransition(() => {
                loadComparison();
            });
        }
    };

    const isInComparison = (productId: string) => comparisonIds.includes(productId);

    const value: ComparisonContextType = {
        comparisonIds,
        loading,
        error,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
        comparisonCount: comparisonIds.length,
        canAddMore: comparisonIds.length < MAX_COMPARISON_ITEMS,
        refreshComparison,
    };

    return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export function useComparison() {
    const context = useContext(ComparisonContext);
    if (context === undefined) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
}

export const MAX_COMPARISON = MAX_COMPARISON_ITEMS;
