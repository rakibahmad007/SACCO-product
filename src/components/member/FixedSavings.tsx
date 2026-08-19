import { Lock, Landmark } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { useApp } from '@/lib/appContext';
import { formatUGX, formatDate, daysFromNow } from '@/lib/format';
import { fixedDeposits, fixedTermProducts } from '@/lib/mockData';

export function FixedSavings() {
  const { showToast } = useApp();

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-xl text-gray-900">Fixed-Term Savings</h1>
        <p className="text-sm text-gray-400">Lock in higher interest rates with fixed terms</p>
      </div>

      {/* Active fixed deposits */}
      <SectionCard title="Your Fixed Deposits">
        <div className="space-y-3">
          {fixedDeposits.map(fd => {
            const days = daysFromNow(fd.maturityDate);
            const elapsed = Math.round(((daysFromNow(fd.startDate) * -1) / (daysFromNow(fd.startDate) * -1 + days)) * 100);
            return (
              <Card key={fd.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{formatUGX(fd.amount)}</p>
                    <p className="text-xs text-gray-400">{fd.termYears} year term · {fd.rate}% p.a.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Matures</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(fd.maturityDate)}</p>
                  </div>
                </div>
                <Progress value={Math.max(0, Math.min(100, elapsed))} color="primary" size="sm" />
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-400">{days > 0 ? `${days} days to maturity` : 'Matured'}</p>
                  <p className="text-xs font-medium text-success-600">Value at maturity: {formatUGX(fd.maturityValue)}</p>
                </div>
                {days > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2">
                    <Lock size={14} className="text-amber-500" />
                    <p className="text-xs text-amber-600">Early withdrawal incurs a penalty fee</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </SectionCard>

      {/* Rate table */}
      <SectionCard title="Term & Rate Table">
        <div className="space-y-2">
          {fixedTermProducts.map(p => (
            <div key={p.term} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Landmark className="text-primary-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.term}</p>
                  <p className="text-xs text-gray-400">Min. {formatUGX(p.minAmount)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-lg text-primary-600">{p.rate}%</p>
                <p className="text-xs text-gray-400">per annum</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <Button fullWidth size="lg" onClick={() => showToast('info', 'Coming soon', 'Fixed deposit creation will be available shortly.')}>
        Create Fixed Deposit
      </Button>
    </div>
  );
}
