import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../config';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, setShowLoginPopup } = useAuth();
  
  // Flag to prevent immediate sync on mount
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchCartFromServer = async () => {
    try {
      const res = await api('/api/cart');
      const data = await res.json();
      if (data.success && data.cart) {
        // Map backend structure { product, quantity } to frontend structure
        const mappedCart = data.cart.map(item => ({
          ...item.product, // Spread product details (name, price, image)
          quantity: item.quantity
        }));
        setCartItems(mappedCart);
      }
    } catch (error) {
      console.error('Failed to fetch cart from server');
    }
  };

  const syncCartToServer = async (items) => {
    if (!user) return;
    try {
      const formattedItems = items.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));
      
      await api('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: formattedItems })
      });
    } catch (error) {
      console.error('Failed to sync cart to server');
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartFromServer().then(() => setIsLoaded(true));
    } else {
      const storedCart = localStorage.getItem('byteBazaar_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      setIsLoaded(true);
    }
  }, [user]);

  // Sync to backend OR local storage on changes
  useEffect(() => {
    if (!isLoaded) return;
    
    if (user) {
      syncCartToServer(cartItems);
    } else {
      localStorage.setItem('byteBazaar_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user, isLoaded]);

  const addToCart = (product, quantity = 1) => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
    setCartItems(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item =>
      item._id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = async () => {
    setCartItems([]);
    if (user) {
      try {
        await api('/api/cart/clear', { method: 'DELETE' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};
