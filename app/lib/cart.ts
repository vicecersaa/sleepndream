export const CART_STORAGE_KEY = "sleepndream-cart";
export const CART_CHANGED_EVENT = "sleepndream-cart-changed";

export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  quantity: number;
};

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(CART_STORAGE_KEY);
    const items = value ? JSON.parse(value) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const items = readCart();
  const existing = items.find((entry) => entry.id === item.id);

  if (existing) existing.quantity += 1;
  else items.push({ ...item, quantity: 1 });

  writeCart(items);
}
