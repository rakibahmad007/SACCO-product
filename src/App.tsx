import { useState } from 'react';
import { AppProvider, useApp } from '@/lib/appContext';
import { Toast } from '@/components/ui/Toast';

// Member portal
import { MemberNav, type MemberPage } from '@/components/member/MemberNav';
import { Login } from '@/components/member/Login';
import { Dashboard } from '@/components/member/Dashboard';
import { Savings } from '@/components/member/Savings';
import { Goals } from '@/components/member/Goals';
import { FixedSavings } from '@/components/member/FixedSavings';
import { Loans } from '@/components/member/Loans';
import { Transfers } from '@/components/member/Transfers';
import { Shares } from '@/components/member/Shares';
import { Dividends } from '@/components/member/Dividends';
import { Guarantors } from '@/components/member/Guarantors';
import { Statements } from '@/components/member/Statements';
import { Notifications } from '@/components/member/Notifications';
import { Profile } from '@/components/member/Profile';

// Admin portal
import { AdminNav, type AdminPage } from '@/components/admin/AdminNav';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminMembers } from '@/components/admin/AdminMembers';
import { AdminLoans } from '@/components/admin/AdminLoans';
import { AdminPayments } from '@/components/admin/AdminPayments';
import { AdminFees } from '@/components/admin/AdminFees';
import { AdminRisk } from '@/components/admin/AdminRisk';

// Shared
import { Placeholder } from '@/components/ui/Placeholder';
import { Landmark, ArrowLeftRight, FileBarChart, Settings, Coins, Receipt, Shield } from 'lucide-react';

function MemberPortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<MemberPage>('dashboard');

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />;
      case 'savings': return <Savings />;
      case 'goals': return <Goals />;
      case 'fixed': return <FixedSavings />;
      case 'loans': return <Loans />;
      case 'transfers': return <Transfers />;
      case 'shares': return <Shares />;
      case 'dividends': return <Dividends />;
      case 'guarantors': return <Guarantors />;
      case 'statements': return <Statements />;
      case 'notifications': return <Notifications />;
      case 'profile': return <Profile onLogout={() => setLoggedIn(false)} />;
      default: return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MemberNav current={page} onNavigate={setPage} />
      <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 overflow-x-hidden">
        {renderPage()}
      </main>
    </div>
  );
}

function AdminPortal() {
  const { setPortal } = useApp();
  const [page, setPage] = useState<AdminPage>('dashboard');

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <AdminDashboard onNavigate={setPage} />;
      case 'members': return <AdminMembers />;
      case 'loans': return <AdminLoans />;
      case 'payments': return <AdminPayments />;
      case 'fees': return <AdminFees />;
      case 'risk': return <AdminRisk />;
      case 'savings': return <Placeholder title="Savings Oversight" description="View all savings accounts across the SACCO and make manual adjustments." icon={<Receipt size={32} className="text-gray-400" />} />;
      case 'shares': return <Placeholder title="Shares Administration" description="Manage the share ledger, authorized shares, and member shareholding." icon={<Coins size={32} className="text-gray-400" />} />;
      case 'dividends': return <Placeholder title="Dividends Administration" description="Set up dividend periods, calculate eligibility, and run payment cycles." icon={<Receipt size={32} className="text-gray-400" />} />;
      case 'reports': return <Placeholder title="Reporting" description="Generate and export reports across membership, savings, loans, and compliance." icon={<FileBarChart size={32} className="text-gray-400" />} />;
      case 'audit': return <Placeholder title="Audit Log" description="Searchable log of all user actions with before/after state tracking." icon={<Shield size={32} className="text-gray-400" />} />;
      case 'settings': return <Placeholder title="Administration & Settings" description="Manage roles, permissions, staff accounts, and system configuration." icon={<Settings size={32} className="text-gray-400" />} />;
      default: return <AdminDashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav current={page} onNavigate={setPage} />
      <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setPortal('member')}
              className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeftRight size={14} /> Switch to Member Portal
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function AppContent() {
  const { portal, toast, hideToast } = useApp();

  return (
    <>
      {portal === 'member' ? <MemberPortal /> : <AdminPortal />}
      <Toast show={toast.show} onClose={hideToast} type={toast.type} title={toast.title} message={toast.message} />
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
