'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Lock, Mail, Trophy, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hobby, setHobby] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useAdmin();
    const router = useRouter();

    // Redirect if already authenticated - moved to useEffect
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/admin');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = login(email, password, hobby);

        if (success) {
            router.push('/admin');
        } else {
            setError('Invalid credentials. Please check your email, password, and hobby.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-border/40 overflow-hidden">
                {/* Header */}
                <div className="bg-primary p-8 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-white">Admin Access</h1>
                    <p className="text-primary-foreground/80 text-sm mt-2">
                        Enter your credentials to access the dashboard
                    </p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                                    placeholder="admin@panel.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                                    placeholder="••••••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="hobby" className="text-sm font-medium text-foreground">Favorite Hobby</label>
                            <div className="relative">
                                <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="hobby"
                                    type="text"
                                    value={hobby}
                                    onChange={(e) => setHobby(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                                    placeholder="e.g. Cricket"
                                    required
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Security Question</p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Login to Dashboard'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
