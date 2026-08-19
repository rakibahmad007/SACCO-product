import { useState } from 'react';
import {
  Landmark, Plus, ChevronRight, Check, X, FileText, Shield, Clock,
} from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Receipt } from '@/components/ui/Receipt';
import { useApp } from '@/lib/appContext';
import { formatUGX, formatDate, daysFromNow } from '@/lib/format';
import {
  activeLoan, loanApplications, loanProducts, type Loan,
} from '@/lib/mockData';

const statusLabels: Record<string, string> = {
  submitted: 'Submitted',
  guarantor_approval: 'Guarantor Approval',
  officer_review: 'Officer Review',
  accountant_review: 'Accountant Review',
  manager_approval: 'Manager Approval',
  disbursed: 'Disbursed',
  active: 'Active',
  rejected: 'Rejected',
};

const statusSteps = ['submitted', 'guarantor_approval', 'officer_review', 'accountant_review', 'manager_approval', 'disbursed'];

export function Loans() {
  const [showApply, setShowApply] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [applyStep, setApplyStep] = useState<'product' | 'details' | 'success'>('product');
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('12');
  const [purpose, setPurpose] = useState('');
  const [repayStep, setRepayStep] = useState<'form' | 'success'>('form');
  const [repayAmount, setRepayAmount] = useState('');
  const [repayRef, setRepayRef] = useState('');
  const { showToast } = useApp();

  const handleApply = () => {
    setApplyStep('success');
    showToast('success', 'Loan application submitted', 'Your application is now pending guarantor approval.');
    setTimeout(() => {
      setShowApply(false);
      setApplyStep('product');
      setAmount('');
      setPurpose('');
      setSelectedProduct(null);
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-gray-900">Loans</h1>
          <p className="text-sm text-gray-400">Manage your loan applications and repayments</p>
        </div>
        <Button size="sm" onClick={() => setShowApply(true)}>
          <Plus size={16} /> Apply
        </Button>
      </div>

      {/* Active loan */}
      <SectionCard title="Active Loan">
        <div className="rounded-xl bg-gradient-to-br from-primary-50 to-primary-100/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <Landmark className="text-white" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{activeLoan.product}</p>
                <p className="text-xs text-gray-400">{activeLoan.termMonths} months · {activeLoan.rate}% p.a.</p>
              </div>
            </div>
            <Badge status="active" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs text-gray-400">Outstanding</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(activeLoan.outstanding)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Monthly Payment</p>
              <p className="font-display font-bold text-lg text-gray-900">{formatUGX(activeLoan.monthlyPayment)}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Repaid</span>
              <span className="font-medium text-gray-600">{Math.round(((activeLoan.amount - activeLoan.outstanding) / activeLoan.amount) * 100)}%</span>
            </div>
            <Progress value={((activeLoan.amount - activeLoan.outstanding) / activeLoan.amount) * 100} color="success" size="sm" />
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary-100">
            <div>
              <p className="text-xs text-gray-400">Next due date</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(activeLoan.nextDueDate)}</p>
            </div>
            <Button size="sm" variant="primary" onClick={() => { setRepayStep('form'); setRepayAmount(String(activeLoan.monthlyPayment)); }}>Repay Now</Button>
          </div>
        </div>
      </SectionCard>

      {/* Pending applications */}
      {loanApplications.length > 0 && (
        <SectionCard title="Pending Applications">
          <div className="space-y-3">
            {loanApplications.map(app => {
              const stepIndex = statusSteps.indexOf(app.status);
              const progress = ((stepIndex + 1) / statusSteps.length) * 100;
              return (
                <div key={app.id} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{app.product}</p>
                      <p className="text-xs text-gray-400">{formatUGX(app.amount)} · {app.termMonths} months</p>
                    </div>
                    <Badge status="processing" label={statusLabels[app.status] || app.status} />
                  </div>
                  <div className="mt-3">
                    <Progress value={progress} color="primary" size="sm" />
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                      {statusSteps.map((s, i) => (
                        <span key={s} className={i <= stepIndex ? 'text-primary-600 font-medium' : ''}>
                          {i === stepIndex ? '● ' : ''}{s.split('_')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* Loan products */}
      <SectionCard title="Loan Products">
        <div className="space-y-3">
          {loanProducts.map(product => (
            <div key={product.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center shrink-0">
                <Landmark className="text-accent-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                <p className="text-xs text-gray-400">{product.description}</p>
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="text-gray-500">Up to {formatUGX(product.maxAmount)}</span>
                  <span className="text-gray-500">{product.rate}% p.a.</span>
                  <span className="text-gray-500">Max {product.maxTerm}m</span>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={() => { setShowApply(true); setSelectedProduct(product.name); setApplyStep('details'); }}>
                Apply
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Repayment modal */}
      <Modal open={repayStep === 'form' || repayStep === 'success'} onClose={() => { setRepayStep('form'); setRepayAmount(''); }} title="Loan Repayment">
        {repayStep === 'form' ? (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-3 space-y-1">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Outstanding</span><span className="font-medium">{formatUGX(activeLoan.outstanding)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Monthly payment</span><span className="font-medium">{formatUGX(activeLoan.monthlyPayment)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Next due</span><span className="font-medium">{formatDate(activeLoan.nextDueDate)}</span></div>
            </div>
            <Input label="Repayment amount (UGX)" type="number" placeholder="0" value={repayAmount} onChange={e => setRepayAmount(e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
              <div className="flex gap-2">
                {['Main Savings', 'MTN MoMo', 'Bank Transfer'].map(s => (
                  <button key={s} className="flex-1 py-2.5 text-sm font-medium rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-medium">{formatUGX(Number(repayAmount) || 0)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Fee</span><span className="font-medium">{formatUGX(0)}</span></div>
              <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-semibold text-gray-700">Total</span><span className="font-bold text-gray-900">{formatUGX(Number(repayAmount) || 0)}</span></div>
            </div>
            <Button fullWidth size="lg" disabled={!repayAmount || Number(repayAmount) <= 0} onClick={() => {
              const ref = `LR-${Math.floor(Math.random() * 9000000 + 1000000)}`;
              setRepayRef(ref);
              setRepayStep('success');
              showToast('success', 'Repayment successful', `${formatUGX(Number(repayAmount))} repaid on ${activeLoan.product}`);
            }}>
              Confirm Repayment
            </Button>
          </div>
        ) : (
          <Receipt
            type="Loan Repayment"
            amount={Number(repayAmount) || 0}
            saccoFee={0}
            total={Number(repayAmount) || 0}
            reference={repayRef}
            date={new Date().toISOString()}
            status="COMPLETED"
            onDone={() => { setRepayStep('form'); setRepayAmount(''); setRepayRef(''); }}
          />
        )}
      </Modal>

      {/* Apply modal */}
      <Modal open={showApply} onClose={() => { setShowApply(false); setApplyStep('product'); }} title="Apply for a Loan">
        {applyStep === 'product' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400 mb-3">Select a loan product</p>
            {loanProducts.map(p => (
              <button key={p.name} onClick={() => { setSelectedProduct(p.name); setApplyStep('details'); }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedProduct === p.name ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <p className="font-medium text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-400">{formatUGX(p.maxAmount)} max · {p.rate}% p.a. · {p.maxTerm} months</p>
              </button>
            ))}
          </div>
        )}
        {applyStep === 'details' && (
          <div className="space-y-4">
            <div className="bg-primary-50 rounded-xl p-3 flex items-center gap-2">
              <Shield size={18} className="text-primary-600" />
              <p className="text-xs text-primary-700">You may be eligible for up to {formatUGX(20000000)} based on your savings and shares.</p>
            </div>
            <Input label="Loan amount (UGX)" type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Term (months)</label>
              <div className="flex flex-wrap gap-2">
                {[6, 12, 18, 24, 36].map(t => (
                  <button key={t} onClick={() => setTerm(String(t))}
                    className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all ${term === String(t) ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}>
                    {t} months
                  </button>
                ))}
              </div>
            </div>
            <Input label="Purpose" placeholder="e.g. Business expansion" value={purpose} onChange={e => setPurpose(e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <FileText size={24} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Tap to upload supporting documents</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guarantor</label>
              <Input placeholder="Search member by number or name" icon={<Shield size={18} />} />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setApplyStep('product')}>Back</Button>
              <Button fullWidth size="lg" disabled={!amount || !purpose} onClick={handleApply}>
                Submit Application
              </Button>
            </div>
          </div>
        )}
        {applyStep === 'success' && (
          <div className="text-center py-8 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-success-600" />
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900">Application Submitted</h3>
            <p className="text-sm text-gray-400 mt-1">Your loan application is now pending guarantor approval.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
