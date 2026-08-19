import { type ReactNode } from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function Placeholder({ title, description, icon }: PlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        {icon || <Construction className="text-gray-400" size={32} />}
      </div>
      <h2 className="font-display font-bold text-xl text-gray-900">{title}</h2>
      <p className="text-sm text-gray-400 mt-1 max-w-sm text-center">
        {description || 'This module is part of the full platform and will be available in a future release.'}
      </p>
    </div>
  );
}
