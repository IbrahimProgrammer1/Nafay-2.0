import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, padding = 'md', hoverable = false, children, ...props }, ref) => {
        const paddings = {
            none: 'p-0',
            sm: 'p-4',
            md: 'p-6 sm:p-8',
            lg: 'p-8 sm:p-10',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm',
                    paddings[padding],
                    hoverable && 'transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex flex-col space-y-2', className)}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn('text-2xl font-serif font-bold leading-none tracking-tight text-foreground', className)}
            {...props}
        />
    )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn('text-sm text-muted-foreground leading-relaxed', className)}
            {...props}
        />
    )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('pt-0', className)} {...props} />
    )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center pt-0', className)}
            {...props}
        />
    )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
