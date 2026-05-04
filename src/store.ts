import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './data';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Address = {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  pincode: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  address: Address;
  paymentMethod: "UPI" | "Card" | "COD";
  status: "Processing" | "Delivered" | "Cancelled";
  total: number;
  createdAt: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  savedAddresses: Address[];
  wishlist: string[]; // product IDs
  orders: Order[];
};

// CART STORE
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,
      addItem: (product) => {
        set((state) => {
          const existing = state.items.find(i => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter(i => i.product.id !== productId) }));
      },
      updateQty: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map(i => i.product.id === productId ? { ...i, quantity } : i)
        }));
      },
      clearCart: () => set({ items: [], appliedPromo: null }),
      applyPromo: (code: string) => {
        if (code === 'SWEET20') {
          set({ appliedPromo: code });
          return true;
        }
        return false;
      },
      removePromo: () => set({ appliedPromo: null }),
    }),
    { name: 'cart-storage' }
  )
);

export const useCartTotals = () => {
  const { items, appliedPromo } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 500 ? 0 : 40;
  const discount = appliedPromo === 'SWEET20' ? Math.floor(subtotal * 0.2) : 0;
  const total = subtotal + deliveryFee - discount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, deliveryFee, discount, total, itemCount };
};

// WISHLIST STORE
interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter(i => i !== id) : [...state.ids, id]
        }));
      },
      isWishlisted: (id) => get().ids.includes(id)
    }),
    { name: 'wishlist-storage' }
  )
);

// AUTH STORE
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  saveAddress: (address: Address) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: (email, name) => {
        set({
          user: {
            id: Date.now().toString(),
            name: name || email.split('@')[0],
            email,
            savedAddresses: [],
            wishlist: [],
            orders: []
          },
          isLoggedIn: true
        });
      },
      signup: (email, name) => get().login(email, name),
      logout: () => set({ user: null, isLoggedIn: false }),
      saveAddress: (address) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              savedAddresses: [...state.user.savedAddresses, address]
            }
          };
        });
      }
    }),
    { name: 'auth-storage' }
  )
);

// ORDER STORE
interface OrderState {
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      placeOrder: (orderData) => {
        set((state) => ({
          orders: [
            {
              ...orderData,
              id: 'ORD' + Math.floor(Math.random() * 1000000),
              createdAt: Date.now(),
              status: 'Processing'
            },
            ...state.orders
          ]
        }));
      }
    }),
    { name: 'order-storage' }
  )
);

// FILTER STORE
interface FilterState {
  category: string;
  maxPrice: number;
  flavours: string[];
  types: string[];
  setCategory: (c: string) => void;
  setMaxPrice: (p: number) => void;
  toggleFlavour: (f: string) => void;
  toggleType: (t: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: 'All',
  maxPrice: 1500,
  flavours: [],
  types: [],
  setCategory: (category) => set({ category }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  toggleFlavour: (flavour) => set((state) => ({
    flavours: state.flavours.includes(flavour)
      ? state.flavours.filter(f => f !== flavour)
      : [...state.flavours, flavour]
  })),
  toggleType: (type) => set((state) => ({
    types: state.types.includes(type)
      ? state.types.filter(t => t !== type)
      : [...state.types, type]
  })),
  resetFilters: () => set({ category: 'All', maxPrice: 1500, flavours: [], types: [] })
}));
