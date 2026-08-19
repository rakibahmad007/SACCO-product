import { useState } from 'react';
import { Bell, ArrowDownLeft, Landmark, Shield, Receipt } from 'lucide-react';
import { SectionCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDateTime } from '@/lib/format';
import { notifications as initialNotifications, type Notification } from '@/lib/mockData';

const categoryConfig = {
  transactions: { icon: ArrowDownLeft, color: 'bg-info-50 text-info-600' },
  loans: { icon: Landmark, color: 'bg-primary-50 text-primary-600' },
  security: { icon: Shield, color: 'bg-danger-50 text-danger-600' },
  dividends: { icon: Receipt, color: 'bg-accent-50 text-accent-600' },
};

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | Notification['category']>('all');

  const filtered = filter === 'all' ? notifications : notifications.filter(n => n.category === filter);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-400">{unreadCount} unread</p>
        </div>
        <button onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          className="text-xs font-medium text-primary-600 hover:text-primary-700">
          Mark all read
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {(['all', 'transactions', 'loans', 'security', 'dividends'] as const).map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all capitalize ${filter === cat ? 'bg-primary-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(notif => {
          const config = categoryConfig[notif.category];
          const Icon = config.icon;
          return (
            <div key={notif.id} onClick={() => markRead(notif.id)}
              className={`flex items-start gap-3 p-4 bg-white rounded-2xl shadow-card cursor-pointer transition-all hover:shadow-card-hover ${!notif.read ? 'border-l-4 border-primary-500' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${!notif.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-600'}`}>{notif.title}</p>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />}
                </div>
                <p className="text-sm text-gray-400 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-300 mt-1">{formatDateTime(notif.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
