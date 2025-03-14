// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, options = {}) => {
    const existingItem = cartItems.find((item) => item.id === product.id && item.variant?.id === options.variant?.id);

    if (existingItem) {
      // Если товар уже в корзине, увеличиваем количество
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id && item.variant?.id === options.variant?.id
            ? { ...item, quantity: item.quantity + (options.quantity || 1) }
            : item
        )
      );
    } else {
      // Если товара нет в корзине, добавляем его
      setCartItems([...cartItems, { ...product, ...options, quantity: options.quantity || 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};