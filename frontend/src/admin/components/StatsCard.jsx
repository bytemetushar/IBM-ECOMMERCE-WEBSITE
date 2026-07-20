import { TrendingUp, TrendingDown } from 'lucide-react';

const iconColors = {
  indigo: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
  emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  rose: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400',
  violet: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
};

export default function StatsCard({ title, value, icon: Icon, color = 'indigo', trend }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-2xl ${iconColors[color] || iconColors.indigo} flex items-center justify-center shrink-0`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</p>
        {trend !== undefined && (
          <span className={`text-[11px] font-extrabold flex items-center gap-0.5 ${trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
            {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </span>
        )}
      </div>
    </div>
  );
}
