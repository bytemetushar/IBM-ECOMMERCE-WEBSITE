import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const ctx = useContext(ToastContext);
  return ctx || (() => {});
};

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'bg-emerald-600 border-emerald-500 shadow-emerald-500/20',
  error: 'bg-rose-600 border-rose-500 shadow-rose-500/20',
  warning: 'bg-amber-600 border-amber-500 shadow-amber-500/20',
  info: 'bg-indigo-600 border-indigo-500 shadow-indigo-500/20',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5">
        {toasts.map(({ id, message, type }) => {
          const Icon = icons[type] || icons.info;
          return (
            <div
              key={id}
              className={`${colors[type] || colors.info} border text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 min-w-[300px] max-w-md animate-fade-in-up`}
            >
              <Icon size={18} className="shrink-0" />
              <p className="text-xs font-bold flex-1">{message}</p>
              <button
                onClick={() => removeToast(id)}
                className="text-white/70 hover:text-white p-0.5 rounded-lg hover:bg-white/10"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
