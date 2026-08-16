import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Local Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const API_BASE = 'http://localhost:8000';

  // Fetch products from JSON endpoint
  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Save cart changes locally
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart Management Methods
  const addToCart = (productToAdd) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productToAdd.id);
      if (existing) {
        return prev.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + (productToAdd.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
    });
  };

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        API_BASE,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalCartCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};