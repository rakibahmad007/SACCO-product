type Status = 'pending' | 'approved' | 'completed' | 'rejected' | 'failed' | 'processing' | 'active' | 'inactive' | 'suspended' | 'low' | 'medium' | 'high';

interface BadgeProps {
  status: Status | string;
  label?: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  failed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  inactive: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
  suspended: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  processing: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  low: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  high: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export function Badge({ status, label, size = 'sm' }: BadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;
  const display = label || status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`inline-flex items-center gap-1.5 ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'} font-semibold rounded-full ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {display}
    </span>
  );
}
