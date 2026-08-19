import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  hint?: string;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, hint, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full ${icon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-10' : 'pr-4'} py-3 text-sm bg-white border rounded-xl transition-all duration-150 outline-none placeholder:text-gray-400 ${
              error
                ? 'border-danger-400 focus:border-danger-500 focus:ring-2 focus:ring-danger-100'
                : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
        {hint && !error && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
        {error && <p className="mt-1 text-xs text-danger-600">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
