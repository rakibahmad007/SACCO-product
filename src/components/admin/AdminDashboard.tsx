import {
  Users, UserCheck, Clock, PiggyBank, Coins, Landmark, AlertTriangle,
  ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Bell, TrendingUp, ChevronRight,
} from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatUGX, formatUGXShort, formatTime } from '@/lib/format';
import {
  adminStats, adminLoanApplications, adminDepositsFeed, riskAlerts,
} from '@/lib/mockData';
import type { AdminPage } from './AdminNav';

interface AdminDashboardProps {
  onNavigate: (page: AdminPage) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const stats = [
    { label: 'Total Members', value: adminStats.totalMembers.toLocaleString(), icon: Users, color: 'bg-primary-50 text-primary-600', sub: `${adminStats.activeMembers} active` },
    { label: 'Pending KYC', value: String(adminStats.pendingKYC), icon: Clock, color: 'bg-amber-50 text-amber-600', sub: 'Awaiting review' },
    { label: 'Total Savings', value: formatUGXShort(adminStats.totalSavings), icon: PiggyBank, color: 'bg-success-50 text-success-600', sub: 'Across all accounts' },
    { label: 'Shares Issued', value: formatUGXShort(adminStats.totalShares), icon: Coins, color: 'bg-info-50 text-info-600', sub: '200K of 400K' },
    { label: 'Loans Outstanding', value: formatUGXShort(adminStats.loansOutstanding), icon: Landmark, color: 'bg-accent-50 text-accent-600', sub: `${formatUGXShort(adminStats.loansInArrears)} in arrears` },
    { label: 'Fee Revenue', value: formatUGXShort(adminStats.feeRevenue), icon: TrendingUp, color: 'bg-primary-50 text-primary-600', sub: 'This month' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Operational Overview</h1>
          <p className="text-sm text-gray-400">Sunday, 17 August 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-xl">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="text-sm font-medium text-amber-700">{adminStats.suspiciousAlerts} alerts</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-xl">
            <Bell size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-700">{adminStats.pendingApprovals} pending</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                <Icon size={20} />
              </div>
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
              <p className="font-display font-bold text-xl text-gray-900 mt-0.5">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* Today's activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
              <ArrowDownLeft className="text-success-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Today's Deposits</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(adminStats.todayDeposits)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center">
              <ArrowUpRight className="text-danger-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Today's Withdrawals</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(adminStats.todayWithdrawals)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-info-50 flex items-center justify-center">
              <ArrowLeftRight className="text-info-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Today's Transfers</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(adminStats.todayTransfers)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending loan applications */}
        <SectionCard
          title="Pending Loan Approvals"
          action={<button onClick={() => onNavigate('loans')} className="text-xs font-medium text-primary-600 flex items-center gap-0.5">View all <ChevronRight size={14} /></button>}
        >
          <div className="space-y-3">
            {adminLoanApplications.slice(0, 4).map(app => (
              <div key={app.id} onClick={() => onNavigate('loans')} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 text-primary-600 text-xs font-bold">
                  {app.applicantName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{app.applicantName}</p>
                  <p className="text-xs text-gray-400">{app.product} · {formatUGX(app.amount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Risk: {app.riskScore}</p>
                  <Badge status={app.riskScore >= 80 ? 'high' : app.riskScore >= 60 ? 'medium' : 'low'} label={app.status.replace(/_/g, ' ')} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Risk alerts */}
        <SectionCard
          title="Risk & Fraud Alerts"
          action={<button onClick={() => onNavigate('risk')} className="text-xs font-medium text-primary-600 flex items-center gap-0.5">View all <ChevronRight size={14} /></button>}
        >
          <div className="space-y-3">
            {riskAlerts.map(alert => (
              <div key={alert.id} onClick={() => onNavigate('risk')} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  alert.severity === 'high' ? 'bg-danger-50 text-danger-600' :
                  alert.severity === 'medium' ? 'bg-amber-50 text-amber-600' :
                  'bg-gray-50 text-gray-500'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{alert.alert}</p>
                  <p className="text-xs text-gray-400">{alert.member} · {formatTime(alert.time)}</p>
                </div>
                <Badge status={alert.severity} label={`Score: ${alert.score}`} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Live deposits feed */}
      <SectionCard title="Live Deposits Feed">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Member</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Method</th>
                <th className="pb-2 font-medium">Time</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {adminDepositsFeed.map(dep => (
                <tr key={dep.id} className="hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-900">{dep.member}</td>
                  <td className="py-2.5 text-gray-700">{formatUGX(dep.amount)}</td>
                  <td className="py-2.5 text-gray-500">{dep.method}</td>
                  <td className="py-2.5 text-gray-400">{formatTime(dep.time)}</td>
                  <td className="py-2.5"><Badge status={dep.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
