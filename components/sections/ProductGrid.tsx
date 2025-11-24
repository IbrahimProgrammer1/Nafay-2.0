import { Product } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';

interface ProductGridProps {
    products: Product[];
    title?: string;
    columns?: 2 | 3 | 4;
}

export default function ProductGrid({ products, title, columns = 4 }: ProductGridProps) {
    const gridCols = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
                            {title}
                        </h2>
                        <div className="h-px flex-1 bg-border/60 ml-8 hidden sm:block"></div>
                    </div>
                )}

                <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4 sm:gap-6 md:gap-8`}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
