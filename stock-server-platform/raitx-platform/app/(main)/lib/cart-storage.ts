/** کلید ذخیرهٔ اطلاعات تماس و جزئیات سفارش سبد خرید — در صفحه تسویه حساب خوانده می‌شود */
export const CART_ORDER_DETAILS_STORAGE_KEY = "cart_order_details_v1";

export type CartContact = { name: string; phone: string };

/** یک آیتم جزئیات سفارش ذخیره‌شده (بر اساس ایندکس آیتم در سبد) */
export type StoredOrderDetailItem = {
  fastOrder?: boolean;
  stepsDescription?: string;
  destinationUrl?: string;
  amount?: string;
  currencyType?: string;
  loginRequired?: string;
  attachmentFileName?: string | null;
};

export type StoredOrderDetailsPayload = {
  savedAt: number;
  expiresAt: number;
  orderDetails?: Record<string, StoredOrderDetailItem>;
  contact?: CartContact;
};

export function getCartOrderDetailsFromStorage(): {
  contact: CartContact | null;
  orderDetails: Record<string, StoredOrderDetailItem> | null;
} {
  if (typeof window === "undefined")
    return { contact: null, orderDetails: null };
  try {
    const raw = localStorage.getItem(CART_ORDER_DETAILS_STORAGE_KEY);
    if (!raw) return { contact: null, orderDetails: null };
    const parsed = JSON.parse(raw) as StoredOrderDetailsPayload;
    if (parsed.expiresAt && parsed.expiresAt < Date.now())
      return { contact: null, orderDetails: null };
    return {
      contact: parsed.contact ?? null,
      orderDetails: parsed.orderDetails ?? null,
    };
  } catch {
    return { contact: null, orderDetails: null };
  }
}
