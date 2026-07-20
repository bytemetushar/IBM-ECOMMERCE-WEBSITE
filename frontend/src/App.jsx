import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './admin/components/Toast';

// Public Components & Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPromptModal from './components/LoginPromptModal';

// Public Storefront Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';

// Admin Portal Components & Pages
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/pages/Dashboard';
import Products from './admin/pages/Products';
import ProductForm from './admin/pages/ProductForm';
import Categories from './admin/pages/Categories';
import AdminOrders from './admin/pages/Orders';
import Users from './admin/pages/Users';
import Coupons from './admin/pages/Coupons';
import Reviews from './admin/pages/Reviews';
import Analytics from './admin/pages/Analytics';
import Settings from './admin/pages/Settings';

function CustomerLayout() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <LoginPromptModal />
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('byteBazaar_theme') === 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('byteBazaar_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Admin Auth & Dashboard Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={<AdminLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
              >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                <Route path="categories" element={<Categories />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<Users />} />
                <Route path="coupons" element={<Coupons />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Customer Storefront Routes */}
              <Route element={<CustomerLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
