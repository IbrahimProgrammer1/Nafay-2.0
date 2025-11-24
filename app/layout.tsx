import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { InquiryProvider } from "@/contexts/InquiryContext";
import ComparisonBar from "@/components/comparison/ComparisonBar";
import { GoogleAnalytics } from '@next/third-parties/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nafay - Premium Laptop Store",
  description: "Discover premium laptops for gaming, business, creative work, and everyday use. From ultraportable to high-performance workstations with 15-day warranty.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased text-base md:text-lg`}>
        <AdminProvider>
          <ProductProvider>
            <InquiryProvider>
              <WishlistProvider>
                <ComparisonProvider>
                  <RecentlyViewedProvider>
                    <Navbar />
                    <main>{children}</main>
                    <ComparisonBar />
                    <Footer />
                  </RecentlyViewedProvider>
                </ComparisonProvider>
              </WishlistProvider>
            </InquiryProvider>
          </ProductProvider>
        </AdminProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
