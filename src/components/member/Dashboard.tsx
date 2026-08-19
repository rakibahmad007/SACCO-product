import { useState } from 'react';
import {
  Eye, EyeOff, Plus, ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  PiggyBank, Landmark, Coins, Bell, TrendingUp, ChevronRight, Vault, Receipt,
} from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { TxRow } from '@/components/ui/TxRow';
import { formatUGX, formatUGXShort } from '@/lib/format';
import {
  memberTransactions, savingsAccounts, activeLoan, shares, goals,
} from '@/lib/mockData';
import type { MemberPage } from './MemberNav';

interface DashboardProps {
  onNavigate: (page: MemberPage) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const totalSavings = savingsAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalInterest = savingsAccounts.reduce((sum, a) => sum + a.interestAccrued, 0);
  const recentTx = memberTransactions.slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-gray-400">Welcome back</p>
          <h1 className="font-display font-bold text-xl text-gray-900">Joseph Ssebunya</h1>
        </div>
        <button
          onClick={() => onNavigate('notifications')}
          className="relative w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-gray-500 hover:shadow-card-hover transition-shadow"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger-500 rounded-full" />
        </button>
      </div>

      {/* Total balance hero card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 p-6 text-white shadow-lg">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -right-4 -bottom-12 w-24 h-24 rounded-full bg-white/5" />
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <p className="text-primary-100 text-sm font-medium">Total Savings Balance</p>
            <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-primary-100 hover:text-white">
              {balanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <p className="font-display font-bold text-3xl mb-1 tracking-tight">
            {balanceVisible ? formatUGX(totalSavings) : 'UGX ••••••••'}
          </p>
          <div className="flex items-center gap-1.5 text-primary-100 text-sm">
            <TrendingUp size={16} />
            <span>+{formatUGX(totalInterest)} interest earned</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Deposit', icon: ArrowDownLeft, page: 'savings' as MemberPage, color: 'bg-success-50 text-success-600' },
          { label: 'Withdraw', icon: ArrowUpRight, page: 'savings' as MemberPage, color: 'bg-danger-50 text-danger-600' },
          { label: 'Transfer', icon: ArrowLeftRight, page: 'transfers' as MemberPage, color: 'bg-info-50 text-info-600' },
          { label: 'Loans', icon: Landmark, page: 'loans' as MemberPage, color: 'bg-primary-50 text-primary-600' },
        ].map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => onNavigate(action.page)}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color}`}>
                <Icon size={22} />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryCard
          icon={<PiggyBank size={20} />}
          label="Savings"
          value={formatUGXShort(totalSavings)}
          subtext={`${savingsAccounts.length} accounts`}
          color="bg-primary-50 text-primary-600"
          onClick={() => onNavigate('savings')}
        />
        <SummaryCard
          icon={<Landmark size={20} />}
          label="Active Loan"
          value={formatUGXShort(activeLoan.outstanding)}
          subtext={`Next: ${new Date(activeLoan.nextDueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`}
          color="bg-accent-50 text-accent-600"
          onClick={() => onNavigate('loans')}
        />
        <SummaryCard
          icon={<Coins size={20} />}
          label="Shares"
          value={formatUGXShort(shares.currentValue)}
          subtext={`${shares.unitsOwned} units`}
          color="bg-info-50 text-info-600"
          onClick={() => onNavigate('shares')}
        />
        <SummaryCard
          icon={<Vault size={20} />}
          label="Fixed Savings"
          value={formatUGXShort(1500000)}
          subtext="2 deposits · 8% p.a."
          color="bg-success-50 text-success-600"
          onClick={() => onNavigate('fixed')}
        />
      </div>

      {/* Dividends banner */}
      <button onClick={() => onNavigate('dividends')} className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-accent-50 to-amber-50 rounded-2xl hover:from-accent-100 hover:to-amber-100 transition-all">
        <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
          <Receipt className="text-accent-600" size={20} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-900">Next dividend: 15 Oct 2026</p>
          <p className="text-xs text-gray-500">Estimated payout: UGX 34,800 on 150 eligible shares</p>
        </div>
        <ChevronRight size={18} className="text-accent-400" />
      </button>

      {/* Goal progress */}
      {goals.length > 0 && (
        <SectionCard
          title="Goal Savings"
          action={<button onClick={() => onNavigate('goals')} className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-0.5">View all <ChevronRight size={14} /></button>}
        >
          <div className="space-y-4">
            {goals.slice(0, 2).map(goal => {
              const pct = Math.round((goal.saved / goal.target) * 100);
              return (
                <div key={goal.id} onClick={() => onNavigate('goals')} className="cursor-pointer">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium text-gray-900">{goal.name}</p>
                    <p className="text-xs text-gray-400">{pct}%</p>
                  </div>
                  <Progress value={pct} color="accent" size="sm" />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-400">{formatUGXShort(goal.saved)}</p>
                    <p className="text-xs text-gray-400">{formatUGXShort(goal.target)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* Recent transactions */}
      <SectionCard
        title="Recent Transactions"
        action={<button onClick={() => onNavigate('statements')} className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-0.5">See all <ChevronRight size={14} /></button>}
      >
        <div className="divide-y divide-gray-50">
          {recentTx.map(tx => (
            <TxRow key={tx.id} tx={tx} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function SummaryCard({ icon, label, value, subtext, color, onClick }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <Card onClick={onClick} hover className="p-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        {icon}
      </div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className="font-display font-bold text-lg text-gray-900">{value}</p>
      <p className="text-xs text-gray-400">{subtext}</p>
    </Card>
  );
}
