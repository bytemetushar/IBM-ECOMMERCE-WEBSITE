import { useState, useEffect } from 'react';
import {
  Package, ShoppingCart, DollarSign, Users, Clock, AlertTriangle,
  PackageX, Sparkles, TrendingUp
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import StatsCard from '../components/StatsCard';
import { admin } from '../adminApi';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await admin.getDashboard();
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5">
              <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl mb-3 animate-pulse" />
              <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
        <div className="text-center">
          <AlertTriangle size={40} className="text-rose-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Failed to load analytics</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">{error}</p>
          <button
            onClick={loadDashboard}
            className="px-5 py-2.5 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors shadow-md"
          >
            Retry Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { stats, recentOrders, ordersByMonth, topSellingProducts } = data || {};

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
          <Sparkles size={14} /> ADMIN ANALYTICS OVERVIEW
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Store Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Products" value={stats?.totalProducts || 0} icon={Package} color="indigo" />
        <StatsCard title="Total Orders" value={stats?.totalOrders || 0} icon={ShoppingCart} color="blue" />
        <StatsCard title="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} icon={DollarSign} color="emerald" trend={12} />
        <StatsCard title="Active Users" value={stats?.totalUsers || 0} icon={Users} color="violet" />
        <StatsCard title="Pending Orders" value={stats?.pendingOrders || 0} icon={Clock} color="amber" />
        <StatsCard title="Low Stock Alert" value={stats?.lowStockProducts || 0} icon={AlertTriangle} color="rose" />
        <StatsCard title="Out of Stock" value={stats?.outOfStockProducts || 0} icon={PackageX} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Monthly Sales Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ordersByMonth || []}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
              <XAxis dataKey="_id" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#salesGradient)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Orders Volume</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersByMonth || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
              <XAxis dataKey="_id" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Top Selling Hardware</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={(topSellingProducts || []).slice(0, 6)}
                dataKey="totalSold"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={4}
              >
                {(topSellingProducts || []).slice(0, 6).map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Recent Store Orders</h3>
            <div className="space-y-2.5">
              {(recentOrders || []).slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {order.user?.FullName || 'Guest Customer'}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ₹{order.totalPrice?.toLocaleString()} • {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                      order.isDelivered
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : order.isPaid
                        ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </div>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <p className="text-xs text-slate-400 text-center py-6">No recent customer orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
