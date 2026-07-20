import { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingCart, ArrowUpRight, Sparkles } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const analyticsData = [
  { month: 'Jan', revenue: 45000, orders: 120, conversion: '3.2%' },
  { month: 'Feb', revenue: 52000, orders: 145, conversion: '3.5%' },
  { month: 'Mar', revenue: 61000, orders: 170, conversion: '3.8%' },
  { month: 'Apr', revenue: 58000, orders: 160, conversion: '3.6%' },
  { month: 'May', revenue: 75000, orders: 210, conversion: '4.1%' },
  { month: 'Jun', revenue: 89000, orders: 250, conversion: '4.5%' },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
          <Sparkles size={13} /> PERFORMANCE INSIGHTS
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Store Analytics & Revenue
        </h1>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">₹3,80,000</p>
          <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
            <ArrowUpRight size={14} /> +18.4% vs last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">4.2%</p>
          <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
            <ArrowUpRight size={14} /> +0.6% vs target
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Order Value</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <ShoppingCart size={18} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">₹14,500</p>
          <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
            <ArrowUpRight size={14} /> +5.2% average
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Visitors</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">92,400</p>
          <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
            <ArrowUpRight size={14} /> +24% growth
          </p>
        </div>
      </div>

      {/* Revenue Area Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4">Half-Year Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={analyticsData}>
            <defs>
              <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#analyticsGradient)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
