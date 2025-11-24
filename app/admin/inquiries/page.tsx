'use client';

import { useInquiries } from '@/contexts/InquiryContext';
import { MessageSquare, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function AdminInquiriesPage() {
    const { inquiries, clearInquiries } = useInquiries();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredInquiries = inquiries.filter(inquiry =>
        inquiry.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-serif font-bold text-foreground">Inquiries</h1>
                {inquiries.length > 0 && (
                    <Button variant="outline" onClick={() => {
                        if (confirm('Are you sure you want to clear all inquiries?')) {
                            clearInquiries();
                        }
                    }} className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                        <Trash2 className="h-4 w-4" />
                        Clear Log
                    </Button>
                )}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search inquiries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* Inquiries List */}
            <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
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
                            {filteredInquiries.length > 0 ? (
                                filteredInquiries.map((inquiry) => (
                                    <tr key={inquiry.id} className="hover:bg-secondary/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-50 rounded-lg">
                                                    <MessageSquare className="h-4 w-4 text-green-600" />
                                                </div>
                                                <span className="font-medium text-foreground">{inquiry.productName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                            ₹{inquiry.productPrice.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                            {new Date(inquiry.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                                WhatsApp Opened
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                        No inquiries found.
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
