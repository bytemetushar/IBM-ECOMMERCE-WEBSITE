import { useState } from 'react';
import { Settings as SettingsIcon, Save, Sparkles, Shield, Store, Globe } from 'lucide-react';
import { useToast } from '../components/Toast';

export default function Settings() {
  const addToast = useToast();
  const [storeName, setStoreName] = useState('byteBazaar Hardware');
  const [currency, setCurrency] = useState('INR');
  const [freeShipping, setFreeShipping] = useState(1500);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Store settings saved successfully', 'success');
  };

  const inputClass = 'w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500';

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
          <Sparkles size={13} /> STORE CONFIGURATION
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Admin General Settings
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Store size={16} className="text-indigo-500" /> Store Profile & Policy
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Store Display Name</label>
              <input value={storeName} onChange={(e) => setStoreName(e.target.value)} className={inputClass} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Primary Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass}>
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Free Shipping Threshold (₹)</label>
                <input type="number" value={freeShipping} onChange={(e) => setFreeShipping(Number(e.target.value))} className={inputClass} required />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-rose-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2">
            <Save size={16} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
