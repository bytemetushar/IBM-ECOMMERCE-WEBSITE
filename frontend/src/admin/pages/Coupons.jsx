import { useState } from 'react';
import { Tag, Plus, Edit, Trash2, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from '../components/Modal';

const mockCoupons = [
  { id: 1, code: 'BYTE2026', discount: '15% OFF', type: 'percentage', limit: 500, used: 142, status: 'active' },
  { id: 2, code: 'GPU500', discount: '₹500 OFF', type: 'fixed', limit: 200, used: 98, status: 'active' },
  { id: 3, code: 'FREESHIP', discount: 'Free Delivery', type: 'shipping', limit: 1000, used: 650, status: 'active' },
];

export default function Coupons() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [showModal, setShowModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', limit: 100, status: 'active' });

  const handleCreate = (e) => {
    e.preventDefault();
    setCoupons([...coupons, { id: Date.now(), ...newCoupon, used: 0 }]);
    setShowModal(false);
    setNewCoupon({ code: '', discount: '', limit: 100, status: 'active' });
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
            <Sparkles size={13} /> PROMOTION ENGINE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Coupons & Promo Codes
          </h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-rose-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-rose-600 transition-all shadow-md flex items-center gap-2 text-xs"
        >
          <Plus size={16} /> Create Promo Code
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 font-bold uppercase tracking-wider text-slate-400">
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Usage Limit</th>
              <th className="p-4">Redeemed</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{c.code}</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{c.discount}</td>
                <td className="p-4 text-slate-500">{c.limit} uses</td>
                <td className="p-4 text-slate-500">{c.used} times</td>
                <td className="p-4">
                  <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200">
                    {c.status}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create Promo Coupon" size="sm">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Coupon Code *</label>
            <input
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white uppercase"
              placeholder="e.g. FLASH20"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Discount Text *</label>
            <input
              value={newCoupon.discount}
              onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              placeholder="e.g. 20% OFF"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md">Create Coupon</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
