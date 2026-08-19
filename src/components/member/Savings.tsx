import { useState } from 'react';
import {
  Plus, ArrowDownLeft, ArrowUpRight, PiggyBank, ChevronRight, Check, X,
} from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { TxRow } from '@/components/ui/TxRow';
import { Receipt } from '@/components/ui/Receipt';
import { useApp } from '@/lib/appContext';
import { formatUGX } from '@/lib/format';
import { savingsAccounts, type SavingsAccount } from '@/lib/mockData';

export function Savings() {
  const [accounts, setAccounts] = useState(savingsAccounts);
  const [selectedAccount, setSelectedAccount] = useState<SavingsAccount | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Main');
  const [flow, setFlow] = useState<'deposit' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('MTN MoMo');
  const [step, setStep] = useState<'amount' | 'method' | 'confirm' | 'success'>('amount');

  const { showToast } = useApp();

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const totalInterest = accounts.reduce((sum, a) => sum + a.interestAccrued, 0);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const newAccount: SavingsAccount = {
      id: 'SA' + (accounts.length + 100).toString().padStart(3, '0'),
      name: newName,
      type: newType as SavingsAccount['type'],
      balance: 0,
      interestAccrued: 0,
      interestRate: 4,
      history: [],
    };
    setAccounts([...accounts, newAccount]);
    setShowCreate(false);
    setNewName('');
    showToast('success', 'Savings account created', `${newName} is ready for deposits.`);
  };

  const fee = flow === 'deposit' ? Math.round(Number(amount) * 0.006) : flow === 'withdraw' ? 2000 : 0;
  const numericAmount = Number(amount) || 0;

  const [receiptRef, setReceiptRef] = useState('');

  const handleConfirm = () => {
    const ref = `${flow === 'deposit' ? 'MM' : 'WD'}-${Math.floor(Math.random() * 9000000 + 1000000)}`;
    setReceiptRef(ref);
    setStep('success');
    showToast('success', flow === 'deposit' ? 'Deposit successful' : 'Withdrawal successful',
      `${formatUGX(numericAmount)} ${flow === 'deposit' ? 'credited to' : 'sent from'} ${selectedAccount?.name}`);
  };

  const handleDone = () => {
    setFlow(null);
    setStep('amount');
    setAmount('');
    setSelectedAccount(null);
    setReceiptRef('');
  };

  if (selectedAccount && flow) {
    return (
      <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
        <button onClick={() => { setFlow(null); setStep('amount'); setSelectedAccount(null); }} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
          <X size={16} /> Cancel
        </button>

        <div className="text-center pt-2">
          <h2 className="font-display font-bold text-xl text-gray-900">
            {flow === 'deposit' ? 'Deposit to' : 'Withdraw from'} {selectedAccount.name}
          </h2>
          <p className="text-sm text-gray-400 mt-1">Current balance: {formatUGX(selectedAccount.balance)}</p>
        </div>

        {step === 'amount' && (
          <Card className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (UGX)</label>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="text-2xl font-bold text-center py-4"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[50000, 100000, 250000, 500000].map(quick => (
                <button key={quick} onClick={() => setAmount(String(quick))}
                  className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
                  {formatUGX(quick)}
                </button>
              ))}
            </div>
            <Button fullWidth size="lg" disabled={!amount || numericAmount <= 0} onClick={() => setStep('method')}>
              Continue
            </Button>
          </Card>
        )}

        {step === 'method' && (
          <Card className="p-6 space-y-5">
            <p className="text-sm font-medium text-gray-700">{flow === 'deposit' ? 'Payment method' : 'Destination'}</p>
            <div className="space-y-2">
              {(flow === 'deposit' ? ['MTN MoMo', 'Airtel Money', 'Bank Transfer', 'Card'] : ['MTN MoMo', 'Airtel Money', 'Bank Transfer']).map(m => (
                <button key={m} onClick={() => setMethod(m)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    method === m ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <span className="text-sm font-medium text-gray-900">{m}</span>
                  {method === m && <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center"><Check size={14} className="text-white" /></div>}
                </button>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-medium">{formatUGX(numericAmount)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Fee</span><span className="font-medium">{formatUGX(fee)}</span></div>
              <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-semibold text-gray-700">Total</span><span className="font-bold text-gray-900">{formatUGX(numericAmount + fee)}</span></div>
            </div>
            <Button fullWidth size="lg" onClick={() => setStep('confirm')}>
              Continue
            </Button>
          </Card>
        )}

        {step === 'confirm' && (
          <Card className="p-6 space-y-5">
            <div className="text-center py-2">
              <p className="text-sm text-gray-400">You are about to {flow === 'deposit' ? 'deposit' : 'withdraw'}</p>
              <p className="font-display font-bold text-3xl text-gray-900 mt-1">{formatUGX(numericAmount)}</p>
              <p className="text-sm text-gray-400 mt-1">{flow === 'deposit' ? 'to' : 'from'} {selectedAccount.name} via {method}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-medium">{formatUGX(numericAmount)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Fee</span><span className="font-medium">{formatUGX(fee)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Method</span><span className="font-medium">{method}</span></div>
              <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-semibold text-gray-700">Total</span><span className="font-bold text-gray-900">{formatUGX(numericAmount + fee)}</span></div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth onClick={() => setStep('method')}>Back</Button>
              <Button fullWidth size="lg" onClick={handleConfirm}>
                Confirm with PIN
              </Button>
            </div>
          </Card>
        )}

        {step === 'success' && (
          <Card className="p-6">
            <Receipt
              type={flow === 'deposit' ? 'Deposit' : 'Withdrawal'}
              amount={numericAmount}
              saccoFee={fee}
              providerFee={flow === 'deposit' && method !== 'Bank Transfer' ? Math.round(fee * 0.3) : undefined}
              total={numericAmount + fee}
              reference={receiptRef}
              date={new Date().toISOString()}
              status="COMPLETED"
              onDone={handleDone}
            />
          </Card>
        )}
      </div>
    );
  }

  if (selectedAccount) {
    return (
      <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
        <button onClick={() => setSelectedAccount(null)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900">
          <ChevronRight size={16} className="rotate-180" /> Back to Savings
        </button>

        <div className="rounded-3xl bg-gradient-to-br from-primary-700 to-primary-500 p-6 text-white">
          <p className="text-primary-100 text-sm">{selectedAccount.name}</p>
          <p className="font-display font-bold text-3xl mt-1">{formatUGX(selectedAccount.balance)}</p>
          <div className="flex gap-4 mt-3 text-sm">
            <div><span className="text-primary-100">Rate: </span><span className="font-medium">{selectedAccount.interestRate}% p.a.</span></div>
            <div><span className="text-primary-100">Interest: </span><span className="font-medium">{formatUGX(selectedAccount.interestAccrued)}</span></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="primary" size="lg" fullWidth onClick={() => setFlow('deposit')}>
            <ArrowDownLeft size={18} /> Deposit
          </Button>
          <Button variant="outline" size="lg" fullWidth onClick={() => setFlow('withdraw')}>
            <ArrowUpRight size={18} /> Withdraw
          </Button>
        </div>

        <SectionCard title="Transaction History">
          {selectedAccount.history.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {selectedAccount.history.map(tx => <TxRow key={tx.id} tx={tx} />)}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">No transactions yet</p>
          )}
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-gray-900">Savings</h1>
          <p className="text-sm text-gray-400">{formatUGX(totalBalance)} total · {formatUGX(totalInterest)} interest</p>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New
        </Button>
      </div>

      <div className="space-y-3">
        {accounts.map(account => (
          <Card key={account.id} onClick={() => setSelectedAccount(account)} hover className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <PiggyBank className="text-primary-600" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{account.name}</p>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
                <p className="text-xs text-gray-400">{account.type} · {account.interestRate}% p.a.</p>
                <p className="font-display font-bold text-lg text-gray-900 mt-0.5">{formatUGX(account.balance)}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="New Savings Account">
        <div className="space-y-4">
          <Input label="Account name" placeholder="e.g. Holiday Fund" value={newName} onChange={e => setNewName(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Account type</label>
            <div className="flex flex-wrap gap-2">
              {['Main', 'School Fees', 'Emergency', 'Business', 'House', 'Car', 'Child'].map(t => (
                <button key={t} onClick={() => setNewType(t)}
                  className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all ${newType === t ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Button fullWidth size="lg" onClick={handleCreate} disabled={!newName.trim()}>
            Create Account
          </Button>
        </div>
      </Modal>
    </div>
  );
}
