import { type ReactNode } from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Coins, HandCoins, Landmark, Receipt } from 'lucide-react';
import type { Transaction } from '@/lib/mockData';
import { formatUGX, formatTime } from '@/lib/format';

interface TxRowProps {
  tx: Transaction;
  onClick?: () => void;
}

const iconForType = (type: Transaction['type']): { icon: ReactNode; bg: string } => {
  const map: Record<string, { icon: ReactNode; bg: string }> = {
    deposit: { icon: <ArrowDownLeft size={18} />, bg: 'bg-success-50 text-success-600' },
    withdrawal: { icon: <ArrowUpRight size={18} />, bg: 'bg-danger-50 text-danger-600' },
    transfer: { icon: <ArrowLeftRight size={18} />, bg: 'bg-info-50 text-info-600' },
    loan_disbursement: { icon: <HandCoins size={18} />, bg: 'bg-primary-50 text-primary-600' },
    loan_repayment: { icon: <Landmark size={18} />, bg: 'bg-primary-50 text-primary-600' },
    share_purchase: { icon: <Coins size={18} />, bg: 'bg-accent-50 text-accent-600' },
    dividend: { icon: <Receipt size={18} />, bg: 'bg-accent-50 text-accent-600' },
    fee: { icon: <Receipt size={18} />, bg: 'bg-gray-100 text-gray-500' },
  };
  return map[type] || map.fee;
};

export function TxRow({ tx, onClick }: TxRowProps) {
  const { icon, bg } = iconForType(tx.type);
  const isCredit = tx.type === 'deposit' || tx.type === 'loan_disbursement' || tx.type === 'dividend';
  const isDebit = tx.type === 'withdrawal' || tx.type === 'transfer' || tx.type === 'loan_repayment' || tx.type === 'fee' || tx.type === 'share_purchase';

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 py-3 ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} -mx-2 px-2 rounded-lg transition-colors`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{tx.title}</p>
        <p className="text-xs text-gray-400">{formatTime(tx.date)} · {tx.reference}</p>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-sm font-semibold ${isCredit ? 'text-success-600' : isDebit ? 'text-gray-900' : 'text-gray-900'}`}>
          {isCredit ? '+' : '-'}{formatUGX(tx.amount)}
        </p>
        <p className={`text-xs ${tx.status === 'completed' ? 'text-success-600' : tx.status === 'pending' ? 'text-amber-600' : 'text-danger-600'}`}>
          {tx.status}
        </p>
      </div>
    </div>
  );
}
