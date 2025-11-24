import { Product } from '@/types/product';

// WhatsApp Business Number (Pakistan)
const WHATSAPP_NUMBER = '923462868512';

/**
 * Generates a WhatsApp URL with pre-filled message for product inquiry
 * @param product - The product to inquire about
 * @returns WhatsApp web URL with encoded message
 */
export function getWhatsAppInquiryUrl(product: Product): string {
    const message = `Hi! I'm interested in:\n\n*${product.name}*\nPrice: Rs ${product.price.toLocaleString()}\n\nCould you provide more details about this laptop?`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp inquiry in a new tab
 * @param product - The product to inquire about
 */
export function openWhatsAppInquiry(product: Product): void {
    const url = getWhatsAppInquiryUrl(product);
    window.open(url, '_blank', 'noopener,noreferrer');
}
