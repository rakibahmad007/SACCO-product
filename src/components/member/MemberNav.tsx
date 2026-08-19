import { useState } from 'react';
import {
  Home, PiggyBank, Target, Landmark, Coins, ArrowLeftRight, Bell, User,
  Vault, Receipt, Shield, MoreHorizontal, X,
} from 'lucide-react';

export type MemberPage =
  | 'dashboard'
  | 'savings'
  | 'goals'
  | 'fixed'
  | 'shares'
  | 'dividends'
  | 'loans'
  | 'guarantors'
  | 'transfers'
  | 'statements'
  | 'notifications'
  | 'profile';

interface NavItem {
  id: MemberPage;
  label: string;
  icon: typeof Home;
}

const primaryNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'savings', label: 'Savings', icon: PiggyBank },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'loans', label: 'Loans', icon: Landmark },
  { id: 'transfers', label: 'Transfer', icon: ArrowLeftRight },
];

const secondaryNavItems: NavItem[] = [
  { id: 'fixed', label: 'Fixed Savings', icon: Vault },
  { id: 'shares', label: 'Shares', icon: Coins },
  { id: 'dividends', label: 'Dividends', icon: Receipt },
  { id: 'guarantors', label: 'Guarantors', icon: Shield },
];

interface MobileNavItem {
  id: MemberPage | 'more';
  label: string;
  icon: typeof Home;
}

const mobileBottomNav: MobileNavItem[] = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'savings', label: 'Savings', icon: PiggyBank },
  { id: 'loans', label: 'Loans', icon: Landmark },
  { id: 'transfers', label: 'Transfer', icon: ArrowLeftRight },
  { id: 'more', label: 'More', icon: MoreHorizontal },
];

interface MemberNavProps {
  current: MemberPage;
  onNavigate: (page: MemberPage) => void;
}

export function MemberNav({ current, onNavigate }: MemberNavProps) {
  const [showMore, setShowMore] = useState(false);

  const allSecondary = [...secondaryNavItems, { id: 'shares' as MemberPage, label: 'Shares', icon: Coins }, { id: 'goals' as MemberPage, label: 'Goals', icon: Target }];

  const handleMoreNavigate = (page: MemberPage) => {
    setShowMore(false);
    onNavigate(page);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-gray-100 h-screen sticky top-0">
        <div className="px-6 py-6 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
            <Landmark className="text-white" size={20} />
          </div>
          <div>
            <p className="font-display font-bold text-gray-900 text-sm leading-tight">SACCO</p>
            <p className="text-xs text-gray-400 leading-tight">Member Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className={active ? 'text-primary-600' : ''} />
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 pb-1 px-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300">More</p>
          </div>
          {secondaryNavItems.map(item => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} className={active ? 'text-primary-600' : ''} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-3">
          <button
            onClick={() => onNavigate('notifications')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${current === 'notifications' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Bell size={20} /> Notifications
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${current === 'profile' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <User size={20} /> Profile
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 px-2 py-1.5 flex items-center justify-around safe-area-bottom">
        {mobileBottomNav.map(item => {
          const Icon = item.icon;
          const active = current === item.id;
          const isMore = item.id === 'more';
          const moreActive = secondaryNavItems.some(s => s.id === current) || current === 'shares' || current === 'goals' || current === 'statements' || current === 'notifications' || current === 'profile';
          return (
            <button
              key={item.id}
              onClick={() => isMore ? setShowMore(true) : onNavigate(item.id as MemberPage)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${(isMore && moreActive) || active ? 'text-primary-600' : 'text-gray-400'}`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile "More" sheet */}
      {showMore && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowMore(false)} />
          <div className="relative w-full bg-white rounded-t-3xl shadow-xl animate-slide-up max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
              <h3 className="font-display font-bold text-lg text-gray-900">More</h3>
              <button onClick={() => setShowMore(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-3 grid grid-cols-3 gap-3">
              {[...secondaryNavItems, { id: 'shares' as MemberPage, label: 'Shares', icon: Coins }, { id: 'goals' as MemberPage, label: 'Goals', icon: Target }].map(item => {
                const Icon = item.icon;
                const active = current === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMoreNavigate(item.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${active ? 'bg-primary-50' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${active ? 'bg-primary-600 text-white' : 'text-gray-500'}`}>
                      <Icon size={22} />
                    </div>
                    <span className={`text-xs font-medium ${active ? 'text-primary-700' : 'text-gray-600'}`}>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => handleMoreNavigate('statements')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${current === 'statements' ? 'bg-primary-50' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${current === 'statements' ? 'bg-primary-600 text-white' : 'text-gray-500'}`}>
                  <Receipt size={22} />
                </div>
                <span className={`text-xs font-medium ${current === 'statements' ? 'text-primary-700' : 'text-gray-600'}`}>Statements</span>
              </button>
              <button
                onClick={() => handleMoreNavigate('notifications')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${current === 'notifications' ? 'bg-primary-50' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${current === 'notifications' ? 'bg-primary-600 text-white' : 'text-gray-500'}`}>
                  <Bell size={22} />
                </div>
                <span className={`text-xs font-medium ${current === 'notifications' ? 'text-primary-700' : 'text-gray-600'}`}>Alerts</span>
              </button>
              <button
                onClick={() => handleMoreNavigate('profile')}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${current === 'profile' ? 'bg-primary-50' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${current === 'profile' ? 'bg-primary-600 text-white' : 'text-gray-500'}`}>
                  <User size={22} />
                </div>
                <span className={`text-xs font-medium ${current === 'profile' ? 'text-primary-700' : 'text-gray-600'}`}>Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
