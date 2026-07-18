export const WHATSAPP_NUMBER = '971504993644'
export const PHONE_DISPLAY = '+971 50 499 3644'
export const PHONE_HREF = 'tel:+971504993644'
export const DEFAULT_ORDER_MESSAGE = "Hi Lucky Bean, I'd like to place an order"

export function buildWhatsAppUrl(message: string) {
  // encodeURIComponent leaves ' unescaped; escape it too so the URL matches
  // what every call site produced by hand before this was centralized.
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message).replace(/'/g, '%27')}`
}
