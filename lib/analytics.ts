import { sendGAEvent } from '@next/third-parties/google';

type EventName = 'inquiry_whatsapp' | 'add_to_wishlist' | 'add_to_comparison' | 'search' | 'view_item';

type AnalyticsPrimitive = string | number | boolean | null | undefined;

interface AnalyticsEvent {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: AnalyticsPrimitive | AnalyticsPrimitive[] | Record<string, AnalyticsPrimitive>;
}

export const trackEvent = (eventName: EventName, params: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
        sendGAEvent('event', eventName, params);

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${eventName}:`, params);
        }
    }
};

export const trackInquiry = (product: { id: string; name: string; price: number }) => {
    trackEvent('inquiry_whatsapp', {
        action: 'click',
        category: 'conversion',
        label: product.name,
        value: product.price,
        product_id: product.id,
    });
};

export const trackWishlist = (product: { id: string; name: string }, action: 'add' | 'remove') => {
    trackEvent('add_to_wishlist', {
        action: action,
        category: 'engagement',
        label: product.name,
        product_id: product.id,
    });
};

export const trackComparison = (product: { id: string; name: string }, action: 'add' | 'remove') => {
    trackEvent('add_to_comparison', {
        action: action,
        category: 'engagement',
        label: product.name,
        product_id: product.id,
    });
};

export const trackSearch = (query: string) => {
    trackEvent('search', {
        action: 'submit',
        category: 'engagement',
        label: query,
    });
};

export const trackViewItem = (product: { id: string; name: string; price: number; category: string }) => {
    trackEvent('view_item', {
        action: 'view',
        category: 'engagement',
        label: product.name,
        value: product.price,
        product_id: product.id,
        product_category: product.category,
    });
};
