import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  storeName: string;
  unit: string;
  image_url?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: number, qty: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clear: () => {},
  subtotal: 0
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from local storage on first render
    AsyncStorage.getItem("cart").then(saved => {
      if (saved) setItems(JSON.parse(saved));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const exists = prev.find(p => p.productId === item.productId);
      if (exists) {
        return prev.map(p =>
          p.productId === item.productId ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (productId: number, qty: number) => {
    setItems(prev =>
      prev
        .map(p => (p.productId === productId ? { ...p, quantity: Math.max(qty, 1) } : p))
        .filter(p => p.quantity > 0)
    );
  };

  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(p => p.productId !== productId));
  };

  const clear = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
