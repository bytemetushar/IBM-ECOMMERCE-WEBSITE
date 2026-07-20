import { useState } from 'react';
import { Menu, Sun, Moon, Bell, Search, User, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TopNavbar({ onMenuClick, darkMode, setDarkMode }) {
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white lg:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden sm:block w-64 lg:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, categories..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-xs">
              {user?.FullName?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden md:block text-left text-xs">
              <p className="font-bold text-slate-900 dark:text-white leading-tight">{user?.FullName || 'Administrator'}</p>
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Super Admin</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 text-xs font-bold animate-scale-in">
              <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-slate-900 dark:text-white">{user?.FullName || 'Administrator'}</p>
                <p className="text-slate-400 font-normal">{user?.email || 'admin@bytebazaar.com'}</p>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg text-[10px] uppercase font-bold w-full">
                  <Shield size={12} /> Full Admin Privileges
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
