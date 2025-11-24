import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, Star, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 pb-32 md:pt-24 md:pb-48">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in">

                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-muted-foreground bg-secondary/30 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        Latest Laptop Models 2025
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                        Find Your Perfect <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                            Laptop
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Discover premium laptops for gaming, business, creative work, and everyday use. From ultraportable to high-performance workstations.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                        <Link href="/shop">
                            <Button size="lg" className="w-full sm:w-auto group">
                                Shop All Laptops
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/warranty">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                15-Day Warranty
                            </Button>
                        </Link>
                    </div>

                    {/* Stats / Social Proof */}
                    <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl border-t border-border/50 mt-12">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex items-center text-primary">
                                <TrendingUp className="h-5 w-5 mr-2" />
                                <span className="text-2xl font-bold">52+</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Laptop Models</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex items-center text-primary">
                                <Star className="h-5 w-5 mr-2 fill-primary" />
                                <span className="text-2xl font-bold">4.8/5</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Customer Rating</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex items-center text-primary">
                                <ShieldCheck className="h-5 w-5 mr-2" />
                                <span className="text-2xl font-bold">15-Day</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Warranty Included</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
