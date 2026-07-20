import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ListOrdered, ShoppingCart, Users,
  Tag, Star, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, X, Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: ListOrdered },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/coupons', label: 'Coupons', icon: Tag },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200">
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-tight text-white">byteBazaar</span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest -mt-0.5">Admin SaaS</span>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg mx-auto">
            <Sparkles size={18} className="text-white" />
          </div>
        )}
        <button
          onClick={onMobileClose || onToggle}
          className="text-slate-400 hover:text-white lg:hidden p-1 rounded-lg hover:bg-slate-800"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onMobileClose}
            className={linkClass}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 w-full"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col border-r border-slate-800/80 transition-all duration-300 relative z-30 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        <button
          onClick={onToggle}
          className="absolute -right-3 top-14 bg-slate-900 border border-slate-700 rounded-full p-1 text-slate-400 hover:text-white z-40 hidden lg:block shadow-md"
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-slate-950 border-r border-slate-800">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
