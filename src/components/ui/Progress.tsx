interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'accent' | 'danger';
  showLabel?: boolean;
}

export function Progress({ value, max = 100, size = 'md', color = 'primary', showLabel = false }: ProgressProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' };
  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    accent: 'bg-accent-500',
    danger: 'bg-danger-500',
  };

  return (
    <div className="w-full">
      <div className={`w-full ${heights[size]} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full ${colors[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">{pct}%</span>
        </div>
      )}
    </div>
  );
}
