import {
  LayoutDashboard, Users, Landmark, Coins, Receipt, Shield,
  FileBarChart, Settings, Bell,
} from 'lucide-react';

export type AdminPage =
  | 'dashboard'
  | 'members'
  | 'savings'
  | 'loans'
  | 'shares'
  | 'dividends'
  | 'payments'
  | 'fees'
  | 'risk'
  | 'reports'
  | 'audit'
  | 'settings';

interface NavItem {
  id: AdminPage;
  label: string;
  icon: typeof LayoutDashboard;
}

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'members', label: 'Members', icon: Users },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'loans', label: 'Loans', icon: Landmark },
      { id: 'savings', label: 'Savings', icon: Receipt },
      { id: 'shares', label: 'Shares', icon: Coins },
      { id: 'dividends', label: 'Dividends', icon: Receipt },
      { id: 'payments', label: 'Payments', icon: Receipt },
    ],
  },
  {
    title: 'Compliance',
    items: [
      { id: 'fees', label: 'Fees & Charges', icon: Receipt },
      { id: 'risk', label: 'Risk & Fraud', icon: Shield },
      { id: 'reports', label: 'Reports', icon: FileBarChart },
      { id: 'audit', label: 'Audit Log', icon: FileBarChart },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

interface AdminNavProps {
  current: AdminPage;
  onNavigate: (page: AdminPage) => void;
}

export function AdminNav({ current, onNavigate }: AdminNavProps) {
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-gray-100 h-screen sticky top-0">
      <div className="px-5 py-6 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
          <Landmark className="text-white" size={20} />
        </div>
        <div>
          <p className="font-display font-bold text-gray-900 text-sm leading-tight">SACCO</p>
          <p className="text-xs text-gray-400 leading-tight">Admin Portal</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-4">
        {navGroups.map(group => (
          <div key={group.title}>
            <p className="px-3 mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-300">{group.title}</p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const active = current === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="px-3 pb-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">AK</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Alice Nakato</p>
            <p className="text-xs text-gray-400">Manager</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600"><Bell size={16} /></button>
        </div>
      </div>
    </aside>
  );
}
