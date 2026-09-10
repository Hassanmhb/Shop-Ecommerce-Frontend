import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

// Dynamic API Base URL detection using Vite Environment Variables
export const API_BASE =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : 'https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app');

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopping_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // 1. Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/products`);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

      const data = await res.json();
      const productsArray = Array.isArray(data) ? data : data.products || [];
      setProducts(productsArray);
    } catch (err) {
      console.error('Error fetching products from MongoDB:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 2. Add to Cart (UI + MongoDB Sync)
  const addToCart = async (productToAdd) => {
    const pId = productToAdd._id || productToAdd.id;

    // UI Local State Update
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          (item._id === pId || item.id === pId) &&
          item.size === productToAdd.size &&
          item.color === productToAdd.color
      );

      if (existing) {
        return prev.map((item) =>
          (item._id === pId || item.id === pId) &&
          item.size === productToAdd.size &&
          item.color === productToAdd.color
            ? { ...item, quantity: item.quantity + (productToAdd.quantity || 1) }
            : item
        );
      }

      return [...prev, { ...productToAdd, _id: pId, id: pId, quantity: productToAdd.quantity || 1 }];
    });

    // Backend / MongoDB Sync
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${API_BASE}/api/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: pId,
            quantity: productToAdd.quantity || 1,
            size: productToAdd.size || '',
            color: productToAdd.color || '',
          }),
        });
      } catch (err) {
        console.error('Error syncing cart with MongoDB:', err);
      }
    }
  };

  // 3. Update Quantity
  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        const itemId = item._id || item.id;
        if (itemId === id) {
          const newQty = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // 4. Remove From Cart
  const removeFromCart = async (id) => {
    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== id));

    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch(`${API_BASE}/api/cart/remove/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Error deleting cart item from MongoDB:', err);
      }
    }
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
        refetchProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};