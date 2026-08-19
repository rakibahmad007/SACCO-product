import { type ReactNode, useEffect } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

export function Toast({ show, onClose, type = 'success', title, message }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const icons = {
    success: <CheckCircle2 className="text-success-600" size={22} />,
    error: <XCircle className="text-danger-600" size={22} />,
    info: <Info className="text-info-600" size={22} />,
    warning: <AlertTriangle className="text-amber-600" size={22} />,
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] animate-slide-up w-full max-w-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{icons[type]}</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900">{title}</p>
          {message && <p className="text-sm text-gray-500 mt-0.5">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export function ToastContext({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
