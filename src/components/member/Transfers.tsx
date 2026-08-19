import { useState } from 'react';
import { ArrowLeftRight, Check, X, User, ChevronRight } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { TxRow } from '@/components/ui/TxRow';
import { Receipt } from '@/components/ui/Receipt';
import { useApp } from '@/lib/appContext';
import { formatUGX } from '@/lib/format';
import { memberTransactions } from '@/lib/mockData';

const transferHistory = memberTransactions.filter(t => t.type === 'transfer');

export function Transfers() {
  const [step, setStep] = useState<'recipient' | 'confirm' | 'amount' | 'pin' | 'success'>('recipient');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [receiptRef, setReceiptRef] = useState('');
  const { showToast } = useApp();

  const fee = 500;
  const numericAmount = Number(amount) || 0;

  const handleTransfer = () => {
    const ref = `TR-${Math.floor(Math.random() * 9000000 + 1000000)}`;
    setReceiptRef(ref);
    setStep('success');
    showToast('success', 'Transfer successful', `${formatUGX(numericAmount)} sent to Sarah Namutebi`);
  };

  const handleDone = () => {
    setStep('recipient');
    setRecipient('');
    setAmount('');
    setPin('');
    setReceiptRef('');
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-xl text-gray-900">Transfer Money</h1>
        <p className="text-sm text-gray-400">Send to another SACCO member instantly</p>
      </div>

      {step === 'recipient' && (
        <Card className="p-6 space-y-5">
          <Input
            label="Recipient member number or phone"
            placeholder="e.g. M-2047 or +256 7XX XXX XXX"
            icon={<User size={18} />}
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-2">Recent recipients</p>
            <div className="space-y-2">
              {[
                { name: 'Sarah Namutebi', number: 'M-2047' },
                { name: 'John Okello', number: 'M-3201' },
                { name: 'David Mukasa', number: 'M-3102' },
              ].map(r => (
                <button key={r.number} onClick={() => setRecipient(r.number)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-xs font-bold">
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.number}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <Button fullWidth size="lg" disabled={!recipient} onClick={() => setStep('confirm')}>
            Continue
          </Button>
        </Card>
      )}

      {step === 'confirm' && (
        <Card className="p-6 space-y-5">
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3">
              <User className="text-primary-600" size={28} />
            </div>
            <p className="text-sm text-gray-400">Sending to</p>
            <p className="font-display font-bold text-lg text-gray-900">Sarah Namutebi</p>
            <p className="text-sm text-gray-400">{recipient}</p>
            <Badge status="active" label="Verified Member" size="md" />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setStep('recipient')}>
              <X size={16} /> Change
            </Button>
            <Button fullWidth onClick={() => setStep('amount')}>
              Confirm
            </Button>
          </div>
        </Card>
      )}

      {step === 'amount' && (
        <Card className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (UGX)</label>
            <Input type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)}
              className="text-2xl font-bold text-center py-4" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[50000, 100000, 250000, 500000].map(quick => (
              <button key={quick} onClick={() => setAmount(String(quick))}
                className="px-3 py-1.5 text-sm bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
                {formatUGX(quick)}
              </button>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-medium">{formatUGX(numericAmount)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Transfer fee</span><span className="font-medium">{formatUGX(fee)}</span></div>
            <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-semibold text-gray-700">Total</span><span className="font-bold text-gray-900">{formatUGX(numericAmount + fee)}</span></div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={() => setStep('confirm')}>Back</Button>
            <Button fullWidth size="lg" disabled={!numericAmount} onClick={() => setStep('pin')}>
              Continue
            </Button>
          </div>
        </Card>
      )}

      {step === 'pin' && (
        <Card className="p-6 space-y-5">
          <div className="text-center py-2">
            <p className="text-sm text-gray-400">Enter your PIN to confirm</p>
            <p className="font-display font-bold text-2xl text-gray-900 mt-1">{formatUGX(numericAmount)}</p>
            <p className="text-sm text-gray-400">to Sarah Namutebi</p>
          </div>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map(i => (
              <input key={i} type="password" maxLength={1} inputMode="numeric"
                value={pin[i] || ''}
                onChange={e => {
                  const newPin = pin.split('');
                  newPin[i] = e.target.value;
                  setPin(newPin.join(''));
                  if (e.target.value && i < 3) {
                    const next = document.getElementById(`pin-${i + 1}`);
                    next?.focus();
                  }
                }}
                id={`pin-${i}`}
                className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none"
              />
            ))}
          </div>
          <Button fullWidth size="lg" disabled={pin.length < 4} onClick={handleTransfer}>
            Confirm Transfer
          </Button>
        </Card>
      )}

      {step === 'success' && (
        <Card className="p-6">
          <Receipt
            type="Transfer"
            amount={numericAmount}
            saccoFee={fee}
            total={numericAmount + fee}
            reference={receiptRef}
            date={new Date().toISOString()}
            status="COMPLETED"
            onDone={handleDone}
          />
        </Card>
      )}

      {/* Transfer history */}
      <SectionCard title="Transfer History">
        {transferHistory.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {transferHistory.map(tx => <TxRow key={tx.id} tx={tx} />)}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-8">No transfers yet</p>
        )}
      </SectionCard>
    </div>
  );
}
