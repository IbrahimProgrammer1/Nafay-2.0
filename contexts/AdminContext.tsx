'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
    email: string;
    hobby: string;
}

interface AdminContextType {
    isAuthenticated: boolean;
    user: AdminUser | null;
    login: (email: string, password: string, hobby: string) => boolean;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'nafay_admin_auth';

export function AdminProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<AdminUser | null>(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser(parsed.user);
                }
            } catch (e) {
                localStorage.removeItem(ADMIN_STORAGE_KEY);
            }
        }
    }, []);

    const login = (email: string, password: string, hobby: string) => {
        // Hardcoded credentials as per requirements
        if (email === 'admin@panel.com' && password === 'qwertyuiop123' && hobby.toLowerCase() === 'cricket') {
            const userData = { email, hobby };
            setIsAuthenticated(true);
            setUser(userData);
            localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({ isAuthenticated: true, user: userData }));
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);
        router.push('/admin/login');
    };

    return (
        <AdminContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
}
