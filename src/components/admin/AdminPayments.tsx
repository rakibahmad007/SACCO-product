import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight, Check, X, AlertCircle } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/lib/appContext';
import { formatUGX, formatTime } from '@/lib/format';
import { adminDepositsFeed, adminWithdrawalsQueue } from '@/lib/mockData';

export function AdminPayments() {
  const [tab, setTab] = useState<'deposits' | 'withdrawals' | 'transfers' | 'failed'>('deposits');
  const { showToast } = useApp();

  const handleApprove = (id: string) => {
    showToast('success', 'Withdrawal approved', `Withdrawal ${id} has been approved for processing.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Payments & Transactions</h1>
        <p className="text-sm text-gray-400">Monitor deposits, withdrawals, and transfers</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center">
              <ArrowDownLeft className="text-success-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Today's Deposits</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(12450000)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center">
              <ArrowUpRight className="text-danger-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Withdrawals</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(2800000)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info-50 flex items-center justify-center">
              <ArrowLeftRight className="text-info-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Today's Transfers</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(3100000)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['deposits', 'withdrawals', 'transfers', 'failed'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize ${tab === t ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Deposits */}
      {tab === 'deposits' && (
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
                    <td className="py-2.5 text-success-600 font-medium">{formatUGX(dep.amount)}</td>
                    <td className="py-2.5 text-gray-500">{dep.method}</td>
                    <td className="py-2.5 text-gray-400">{formatTime(dep.time)}</td>
                    <td className="py-2.5"><Badge status={dep.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* Withdrawals */}
      {tab === 'withdrawals' && (
        <SectionCard title="Withdrawals Pending Approval">
          <div className="space-y-3">
            {adminWithdrawalsQueue.map(wd => (
              <div key={wd.id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="text-danger-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{wd.member}</p>
                  <p className="text-xs text-gray-400">{wd.method} · {formatTime(wd.time)}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatUGX(wd.amount)}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="danger" onClick={() => showToast('info', 'Withdrawal rejected', `${wd.id} has been rejected.`)}>
                    <X size={14} />
                  </Button>
                  <Button size="sm" variant="success" onClick={() => handleApprove(wd.id)}>
                    <Check size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Transfers */}
      {tab === 'transfers' && (
        <SectionCard title="Transfers Monitor">
          <div className="text-center py-12">
            <ArrowLeftRight size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No transfers in the last hour</p>
          </div>
        </SectionCard>
      )}

      {/* Failed */}
      {tab === 'failed' && (
        <SectionCard title="Failed / Reversed Transactions">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-danger-100 bg-danger-50">
              <div className="w-10 h-10 rounded-xl bg-danger-100 flex items-center justify-center shrink-0">
                <AlertCircle className="text-danger-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Transfer to John Okello — Failed</p>
                <p className="text-xs text-gray-400">Ref: TR-9920288 · Insufficient funds in recipient account</p>
              </div>
              <p className="text-sm font-medium text-danger-600">{formatUGX(75000)}</p>
              <Badge status="failed" />
            </div>
          </div>
        </SectionCard>
      )}

      {/* Provider reconciliation */}
      <SectionCard title="Payment Provider Reconciliation">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { provider: 'MTN MoMo', matched: 142, unmatched: 3, status: 'completed' as const },
            { provider: 'Airtel Money', matched: 87, unmatched: 1, status: 'completed' as const },
            { provider: 'Bank Transfer', matched: 24, unmatched: 5, status: 'processing' as const },
          ].map(p => (
            <div key={p.provider} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{p.provider}</p>
                <Badge status={p.status} />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400">Matched</p>
                  <p className="text-sm font-medium text-success-600">{p.matched}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400">Unmatched</p>
                  <p className="text-sm font-medium text-amber-600">{p.unmatched}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
