import { Receipt, Download, ChevronRight } from 'lucide-react';
import { SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatUGX, formatDate } from '@/lib/format';
import { dividendInfo } from '@/lib/mockData';

export function Dividends() {
  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-xl text-gray-900">Dividends</h1>
        <p className="text-sm text-gray-400">Your share of SACCO profits</p>
      </div>

      {/* Current quarter */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-500 to-accent-600 p-6 text-white">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="relative">
          <p className="text-accent-100 text-sm">{dividendInfo.currentQuarter} Dividend</p>
          <p className="font-display font-bold text-3xl mt-1">{formatUGX(dividendInfo.estimatedAmount)}</p>
          <p className="text-accent-100 text-sm mt-1">Estimated payout on {dividendInfo.eligibleShares} eligible shares</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5">
            <Badge status="pending" label="Pending Declaration" />
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <SectionCard title="Eligibility">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-600">Eligible shares</span>
            <span className="font-medium text-gray-900">{dividendInfo.eligibleShares} units</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-600">Record date</span>
            <span className="font-medium text-gray-900">30 Sep 2026</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-sm text-gray-600">Payment date</span>
            <span className="font-medium text-gray-900">15 Oct 2026</span>
          </div>
        </div>
      </SectionCard>

      {/* History */}
      <SectionCard title="Dividend History">
        <div className="space-y-3">
          {dividendInfo.history.map(div => (
            <div key={div.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center shrink-0">
                <Receipt className="text-accent-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{div.period} Dividend</p>
                <p className="text-xs text-gray-400">{formatDate(div.date)} · {div.shares} shares</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-success-600">+{formatUGX(div.amount)}</p>
                <Badge status="completed" label="Paid" />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
