export const formatUGX = (amount: number): string => {
  return 'UGX ' + amount.toLocaleString('en-US');
};

export const formatUGXShort = (amount: number): string => {
  if (amount >= 1_000_000_000) return 'UGX ' + (amount / 1_000_000_000).toFixed(1) + 'B';
  if (amount >= 1_000_000) return 'UGX ' + (amount / 1_000_000).toFixed(1) + 'M';
  if (amount >= 1_000) return 'UGX ' + (amount / 1_000).toFixed(0) + 'K';
  return 'UGX ' + amount.toLocaleString('en-US');
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

export const daysFromNow = (date: Date | string): number => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = d.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const initials = (name: string): string => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};
