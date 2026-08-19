import { useState } from 'react';
import { Plus, Receipt, Check, X, AlertCircle } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useApp } from '@/lib/appContext';
import { formatUGX } from '@/lib/format';
import { feeRules } from '@/lib/mockData';

export function AdminFees() {
  const [showCreate, setShowCreate] = useState(false);
  const [feeType, setFeeType] = useState('transaction');
  const [structure, setStructure] = useState('fixed');
  const { showToast } = useApp();

  const totalRevenue = 4520000;
  const providerCost = 890000;
  const netRevenue = totalRevenue - providerCost;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Fees & Charges</h1>
          <p className="text-sm text-gray-400">Manage fee rules and revenue</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New Fee Rule
        </Button>
      </div>

      {/* Revenue summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-gray-400">Total Fee Revenue</p>
          <p className="font-display font-bold text-2xl text-gray-900 mt-1">{formatUGX(totalRevenue)}</p>
          <p className="text-xs text-success-600 mt-1">+12% from last month</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-400">Provider Costs</p>
          <p className="font-display font-bold text-2xl text-gray-900 mt-1">{formatUGX(providerCost)}</p>
          <p className="text-xs text-gray-400 mt-1">MTN, Airtel, Bank fees</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-400">Net Revenue</p>
          <p className="font-display font-bold text-2xl text-success-600 mt-1">{formatUGX(netRevenue)}</p>
          <p className="text-xs text-gray-400 mt-1">After provider costs</p>
        </Card>
      </div>

      {/* Fee rules table */}
      <SectionCard title="Fee Rules">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Structure</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {feeRules.map(rule => (
                <tr key={rule.id} className="hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900">{rule.name}</td>
                  <td className="py-3"><Badge status="active" label={rule.type} /></td>
                  <td className="py-3 text-gray-500">{rule.structure}</td>
                  <td className="py-3 text-gray-700">{rule.amount ? formatUGX(rule.amount) : '—'}</td>
                  <td className="py-3"><Badge status={rule.status} /></td>
                  <td className="py-3"><Button size="sm" variant="ghost">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Create fee modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Fee Rule">
        <div className="space-y-4">
          <Input label="Fee name" placeholder="e.g. International Transfer Fee" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Fee type</label>
            <div className="flex gap-2">
              {['transaction', 'loan', 'account'].map(t => (
                <button key={t} onClick={() => setFeeType(t)}
                  className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all capitalize ${feeType === t ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Structure</label>
            <div className="flex gap-2">
              {['fixed', 'percentage', 'tiered'].map(s => (
                <button key={s} onClick={() => setStructure(s)}
                  className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all capitalize ${structure === s ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          {structure === 'fixed' && <Input label="Amount (UGX)" type="number" placeholder="0" />}
          {structure === 'percentage' && <Input label="Percentage (%)" type="number" placeholder="0" />}
          <div className="bg-amber-50 rounded-xl p-3 flex items-start gap-2">
            <AlertCircle size={16} className="text-amber-600 mt-0.5" />
            <p className="text-xs text-amber-700">New fee rules require approval from the Manager before activation.</p>
          </div>
          <Button fullWidth size="lg" onClick={() => { setShowCreate(false); showToast('success', 'Fee rule created', 'Pending manager approval.'); }}>
            Submit for Approval
          </Button>
        </div>
      </Modal>
    </div>
  );
}
