import { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  if (!open) return null;

  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative w-full ${sizeClass} bg-white rounded-t-3xl sm:rounded-2xl shadow-xl animate-slide-up max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl z-10">
            <h3 className="font-display font-bold text-lg text-gray-900">{title}</h3>
            <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
