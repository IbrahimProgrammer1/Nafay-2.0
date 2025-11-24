'use client';

import { useProducts } from '@/contexts/ProductContext';
import { useInquiries } from '@/contexts/InquiryContext';
import { Package, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminDashboard() {
    const { products } = useProducts();
    const { inquiries } = useInquiries();

    // Calculate stats
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + p.price, 0);
    const totalInquiries = inquiries.length;
    const recentInquiries = inquiries.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard Overview</h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/40">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Package className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Active
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">{totalProducts}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/40">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <MessageSquare className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            +12%
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Inquiries</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">{totalInquiries}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/40">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-50 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Inventory Value</p>
                    <h3 className="text-3xl font-bold text-foreground mt-1">
                        ₹{totalValue.toLocaleString()}
                    </h3>
                </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
                <div className="p-6 border-b border-border/40">
                    <h2 className="text-lg font-bold text-foreground">Recent Inquiries</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary/10">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {recentInquiries.length > 0 ? (
                                recentInquiries.map((inquiry) => (
                                    <tr key={inquiry.id} className="hover:bg-secondary/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                                            {inquiry.productName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                            ₹{inquiry.productPrice.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                            {new Date(inquiry.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                        No inquiries yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
