"use client";

import { useState, createContext, useEffect } from "react";

const CartContext = createContext({
  cart: null,
  setCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Basic validation
        if (Array.isArray(parsedCart) || parsedCart === null) {
          setCart(parsedCart);
        } else {
          throw new Error("Invalid cart format");
        }
      }
    } catch (error) {
      localStorage.removeItem("cart");
      setCart(null);
    }
  }, []);

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
