import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/api/users/me');
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('byteBazaar_user', JSON.stringify(data.user));
      } else {
        setUser(null);
        localStorage.removeItem('byteBazaar_user');
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to load from local storage first for immediate UI
    const storedUser = localStorage.getItem('byteBazaar_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Then verify with server
    fetchProfile();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await fetch(API_BASE_URL + '/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('byteBazaar_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      setError('An error occurred during login');
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const register = async (FullName, email, password, contact) => {
    setError(null);
    try {
      const res = await fetch(API_BASE_URL + '/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ FullName, email, password, contact })
      });
      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('byteBazaar_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      setError('An error occurred during registration');
      return { success: false, message: 'An error occurred during registration' };
    }
  };

  const logout = async () => {
    try {
      await fetch(API_BASE_URL + '/api/users/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    localStorage.removeItem('byteBazaar_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error, showLoginPopup, setShowLoginPopup }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
