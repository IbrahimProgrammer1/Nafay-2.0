'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, MessageSquare, LogOut, Settings } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { logout, user } = useAdmin();

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products', label: 'Products', icon: Package },
        { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    ];

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-secondary/10 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-border/40 fixed h-full z-10 hidden md:flex flex-col">
                    <div className="p-6 border-b border-border/40">
                        <h1 className="text-2xl font-serif font-bold text-primary">Nafay Admin</h1>
                        <p className="text-xs text-muted-foreground mt-1">Welcome, {user?.hobby} Fan</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-secondary/20 hover:text-foreground'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-border/40">
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-8">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
