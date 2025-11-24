import Link from 'next/link';
import { Shield, CheckCircle, Clock, PackageCheck, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export const metadata = {
    title: '15-Day Warranty Policy | Nafay',
    description: 'Learn about our comprehensive 15-day checking warranty for all products.',
};

export default function WarrantyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-secondary/30 py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                                Warranty Policy
                            </h1>
                            <p className="text-lg text-muted-foreground mt-2">
                                Your satisfaction is our priority
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* 15-Day Warranty Highlight */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 mb-12">
                        <div className="flex items-start gap-6">
                            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                                    15-Day Checking Warranty
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We stand behind the quality of every product we sell. All items purchased from Nafay come with a comprehensive <span className="font-bold text-primary">15-day checking warranty</span>, giving you peace of mind with every purchase.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What's Covered */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
                            What&rsquo;s Covered
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm">
                                <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                                    <PackageCheck className="h-5 w-5 text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Product Defects</h4>
                                <p className="text-sm text-muted-foreground">
                                    Manufacturing defects, material flaws, or functional issues discovered within 15 days of delivery.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm">
                                <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Quality Assurance</h4>
                                <p className="text-sm text-muted-foreground">
                                    Products that don&rsquo;t meet our advertised specifications or quality standards.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm">
                                <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                                    <Shield className="h-5 w-5 text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Damage in Transit</h4>
                                <p className="text-sm text-muted-foreground">
                                    Items damaged during shipping, provided packaging shows clear signs of mishandling.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-border/50 shadow-sm">
                                <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <h4 className="font-bold text-foreground mb-2">Incorrect Items</h4>
                                <p className="text-sm text-muted-foreground">
                                    Wrong product received or items missing from your order.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
                            How to Claim Your Warranty
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-6">
                                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                                    1
                                </div>
                                <div className="pt-2">
                                    <h4 className="font-bold text-foreground mb-2">Contact Our Support Team</h4>
                                    <p className="text-muted-foreground">
                                        Reach out to us within 15 days of receiving your product via email at <a href="mailto:support@nafay.com" className="text-primary underline">support@nafay.com</a> or call us at 1-800-NAFAY-SHOP.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                                    2
                                </div>
                                <div className="pt-2">
                                    <h4 className="font-bold text-foreground mb-2">Provide Details</h4>
                                    <p className="text-muted-foreground">
                                        Share your order number, photos of the product and any defects, and a brief description of the issue.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                                    3
                                </div>
                                <div className="pt-2">
                                    <h4 className="font-bold text-foreground mb-2">Get Your Resolution</h4>
                                    <p className="text-muted-foreground">
                                        We&rsquo;ll review your claim within 24-48 hours and provide a replacement, repair, or full refund based on your preference and product availability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-secondary/10 rounded-2xl p-8 mb-12">
                        <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                            Important Information
                        </h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>Products must be returned in original packaging with all accessories and documentation.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>Warranty does not cover damage from misuse, accidents, or normal wear and tear.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>The 15-day period starts from the date of delivery confirmation.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span>Return shipping for warranty claims is covered by Nafay.</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                            Have Questions?
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Our customer support team is here to help. Contact us for any warranty-related inquiries.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop">
                                <Button size="lg">
                                    Continue Shopping
                                </Button>
                            </Link>
                            <a href="mailto:support@nafay.com">
                                <Button variant="outline" size="lg">
                                    Contact Support
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
