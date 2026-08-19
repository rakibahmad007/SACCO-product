import { useState } from 'react';
import { Coins, Plus, TrendingUp, Check, ArrowRightLeft } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Receipt } from '@/components/ui/Receipt';
import { useApp } from '@/lib/appContext';
import { formatUGX, formatDateTime } from '@/lib/format';
import { shares, shareTransactions, type ShareTransaction } from '@/lib/mockData';

export function Shares() {
  const [showBuy, setShowBuy] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [receiptRef, setReceiptRef] = useState('');
  const { showToast } = useApp();

  const buyQty = Number(quantity) || 0;
  const buyCost = buyQty * shares.pricePerShare;
  const buyFee = Math.round(buyCost * 0.01);

  const handleBuy = () => {
    const ref = `SH-${Math.floor(Math.random() * 9000000 + 1000000)}`;
    setReceiptRef(ref);
    setShowBuy(false);
    setShowReceipt(true);
    showToast('success', 'Shares purchased', `${buyQty} shares acquired for ${formatUGX(buyCost + buyFee)}.`);
  };

  const handleTransfer = () => {
    showToast('success', 'Shares transferred', `${buyQty} shares transferred successfully.`);
    setShowTransfer(false);
    setQuantity('');
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-xl text-gray-900">SACCO Shares</h1>
        <p className="text-sm text-gray-400">Your ownership stake in the cooperative</p>
      </div>

      {/* Shares hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 to-primary-500 p-6 text-white">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Coins size={20} className="text-primary-100" />
            <p className="text-primary-100 text-sm">Your Shareholding</p>
          </div>
          <p className="font-display font-bold text-3xl">{shares.unitsOwned} units</p>
          <p className="text-primary-100 text-sm mt-1">Current value: {formatUGX(shares.currentValue)}</p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/10 rounded-xl px-3 py-2">
              <p className="text-xs text-primary-100">Ownership</p>
              <p className="text-sm font-medium">{shares.ownershipPct}%</p>
            </div>
            <div className="bg-white/10 rounded-xl px-3 py-2">
              <p className="text-xs text-primary-100">Price/share</p>
              <p className="text-sm font-medium">{formatUGX(shares.pricePerShare)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button size="lg" fullWidth onClick={() => setShowBuy(true)}>
          <Plus size={18} /> Buy Shares
        </Button>
        <Button size="lg" variant="outline" fullWidth onClick={() => setShowTransfer(true)}>
          <ArrowRightLeft size={18} /> Transfer
        </Button>
      </div>

      {/* SACCO share info */}
      <SectionCard title="SACCO Share Capital">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400">Authorized</p>
            <p className="font-display font-bold text-sm text-gray-900">{shares.totalAuthorized.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400">Issued</p>
            <p className="font-display font-bold text-sm text-gray-900">{shares.totalIssued.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-400">Available</p>
            <p className="font-display font-bold text-sm text-gray-900">{(shares.totalAuthorized - shares.totalIssued).toLocaleString()}</p>
          </div>
        </div>
      </SectionCard>

      {/* Transaction history */}
      <SectionCard title="Share Transactions">
        <div className="space-y-3">
          {shareTransactions.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 py-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                tx.type === 'purchase' ? 'bg-success-50 text-success-600' :
                tx.type === 'dividend' ? 'bg-accent-50 text-accent-600' :
                'bg-info-50 text-info-600'
              }`}>
                {tx.type === 'purchase' ? <Plus size={18} /> : tx.type === 'dividend' ? <TrendingUp size={18} /> : <ArrowRightLeft size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 capitalize">{tx.type.replace('_', ' ')}</p>
                <p className="text-xs text-gray-400">{formatDateTime(tx.date)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{tx.quantity} units</p>
                <p className="text-xs text-gray-400">{formatUGX(tx.quantity * tx.pricePerShare)}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Share purchase receipt modal */}
      <Modal open={showReceipt} onClose={() => { setShowReceipt(false); setQuantity(''); setReceiptRef(''); }} title="Receipt">
        <Receipt
          type="Share Purchase"
          amount={buyCost}
          saccoFee={buyFee}
          total={buyCost + buyFee}
          reference={receiptRef}
          date={new Date().toISOString()}
          status="COMPLETED"
          onDone={() => { setShowReceipt(false); setQuantity(''); setReceiptRef(''); }}
        />
      </Modal>

      {/* Buy modal */}
      <Modal open={showBuy} onClose={() => setShowBuy(false)} title="Buy Shares">
        <div className="space-y-4">
          <div className="bg-primary-50 rounded-xl p-3">
            <p className="text-xs text-primary-700">Current price per share: <span className="font-bold">{formatUGX(shares.pricePerShare)}</span></p>
          </div>
          <Input label="Number of shares" type="number" placeholder="0" value={quantity} onChange={e => setQuantity(e.target.value)} />
          {buyQty > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Cost</span><span className="font-medium">{formatUGX(buyCost)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Fee (1%)</span><span className="font-medium">{formatUGX(buyFee)}</span></div>
              <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-semibold text-gray-700">Total</span><span className="font-bold text-gray-900">{formatUGX(buyCost + buyFee)}</span></div>
            </div>
          )}
          <Button fullWidth size="lg" disabled={buyQty <= 0} onClick={handleBuy}>
            Confirm Purchase
          </Button>
        </div>
      </Modal>

      {/* Transfer modal */}
      <Modal open={showTransfer} onClose={() => setShowTransfer(false)} title="Transfer Shares">
        <div className="space-y-4">
          <Input label="Recipient member number" placeholder="e.g. M-2047" />
          <Input label="Number of shares" type="number" placeholder="0" value={quantity} onChange={e => setQuantity(e.target.value)} />
          <div className="bg-amber-50 rounded-xl p-3 flex items-start gap-2">
            <Check size={16} className="text-amber-600 mt-0.5" />
            <p className="text-xs text-amber-700">Share transfers require manager approval and may take 1-2 business days.</p>
          </div>
          <Button fullWidth size="lg" disabled={!quantity} onClick={handleTransfer}>
            Initiate Transfer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
