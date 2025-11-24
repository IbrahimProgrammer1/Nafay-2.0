import { Product } from './product';

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
}
