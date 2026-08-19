import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-card ${hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer' : ''} transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

interface SectionCardProps extends CardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function SectionCard({ title, action, children, className = '', onClick, hover }: SectionCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-card ${hover ? 'hover:shadow-card-hover cursor-pointer' : ''} transition-all duration-200 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="font-display font-bold text-gray-900 text-base">{title}</h3>
          {action}
        </div>
      )}
      <div className={title ? 'px-5 pb-5' : ''}>{children}</div>
    </div>
  );
}
