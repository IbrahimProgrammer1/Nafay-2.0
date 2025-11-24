import Link from 'next/link';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background pt-8 pb-4 sm:pt-12 sm:pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-serif font-bold text-primary">Nafay</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Your trusted destination for premium laptops. From gaming powerhouses to ultraportable workstations.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/20 rounded-full" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/20 rounded-full" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/20 rounded-full" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary/20 rounded-full" aria-label="GitHub">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">Shop</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">All Laptops</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Best Sellers</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Deals</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">Customer Service</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">Shopping Cart</Link></li>
                            <li><Link href="/warranty" className="text-muted-foreground hover:text-primary transition-colors">15-Day Warranty</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Laptop Support</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Why Choose Nafay</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Nafay Laptops. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/shop" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/shop" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link href="/shop" className="hover:text-foreground transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
