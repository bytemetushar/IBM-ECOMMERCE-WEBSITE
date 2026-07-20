import { useState } from 'react';
import { Star, CheckCircle, EyeOff, Trash2, Sparkles } from 'lucide-react';

const mockReviews = [
  { id: 1, user: 'Alex Rivers', product: 'ROG Strix RTX 4090 OC', rating: 5, comment: 'Phenomenal gaming performance! Runs cool and ultra-quiet under heavy load.', status: 'approved' },
  { id: 2, user: 'Devin Vance', product: 'Cyberware OLED 4K Monitor', rating: 5, comment: 'Best monitor I have ever owned. Color accuracy for video editing is insane.', status: 'approved' },
  { id: 3, user: 'Marcus Chen', product: 'StudioPro Wireless ANC', rating: 4, comment: 'Great noise cancellation, battery life easily lasts 3 days of heavy work.', status: 'pending' },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(mockReviews);

  const toggleStatus = (id) => {
    setReviews(reviews.map((r) => r.id === id ? { ...r, status: r.status === 'approved' ? 'hidden' : 'approved' } : r));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
          <Sparkles size={13} /> FEEDBACK MODERATION
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Customer Product Reviews
        </h1>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs flex items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white">{rev.user}</span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">{rev.product}</span>
                <div className="flex items-center text-amber-400">
                  <Star size={13} className="fill-amber-400" />
                  <span className="text-xs font-bold ml-1">{rev.rating}.0</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleStatus(rev.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  rev.status === 'approved'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {rev.status === 'approved' ? 'Approved' : 'Hidden'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
