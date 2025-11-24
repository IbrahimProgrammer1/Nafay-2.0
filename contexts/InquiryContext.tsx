'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Inquiry {
    id: string;
    productId: string;
    productName: string;
    productPrice: number;
    timestamp: string;
}

interface InquiryContextType {
    inquiries: Inquiry[];
    addInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp'>) => void;
    clearInquiries: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

const INQUIRY_STORAGE_KEY = 'nafay_inquiries';

export function InquiryProvider({ children }: { children: ReactNode }) {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(INQUIRY_STORAGE_KEY);
        if (stored) {
            try {
                setInquiries(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse stored inquiries', e);
            }
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
        }
    }, [inquiries, isInitialized]);

    const addInquiry = (data: Omit<Inquiry, 'id' | 'timestamp'>) => {
        const newInquiry: Inquiry = {
            ...data,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
        };
        setInquiries(prev => [newInquiry, ...prev]);
    };

    const clearInquiries = () => {
        setInquiries([]);
        localStorage.removeItem(INQUIRY_STORAGE_KEY);
    };

    return (
        <InquiryContext.Provider value={{ inquiries, addInquiry, clearInquiries }}>
            {children}
        </InquiryContext.Provider>
    );
}

export function useInquiries() {
    const context = useContext(InquiryContext);
    if (context === undefined) {
        throw new Error('useInquiries must be used within an InquiryProvider');
    }
    return context;
}
