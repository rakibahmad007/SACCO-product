import { Check, Download, Share2, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatUGX, formatDateTime } from '@/lib/format';
import { useApp } from '@/lib/appContext';

export interface ReceiptProps {
  type: string;
  amount: number;
  saccoFee: number;
  providerFee?: number;
  total: number;
  reference: string;
  date: string;
  status?: 'COMPLETED' | 'PENDING' | 'FAILED';
  onDone?: () => void;
}

export function Receipt({
  type, amount, saccoFee, providerFee, total, reference, date, status = 'COMPLETED', onDone,
}: ReceiptProps) {
  const { showToast } = useApp();

  return (
    <div className="animate-scale-in">
      <div className="text-center mb-5">
        <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-3">
          <Check size={32} className="text-success-600" />
        </div>
        <h3 className="font-display font-bold text-xl text-gray-900">Transaction Successful</h3>
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden">
        <div className="bg-gray-50 px-5 py-4 text-center border-b border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <Landmark className="text-white" size={14} />
            </div>
            <span className="font-display font-bold text-gray-900 text-sm">DIGITAL SACCO</span>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{type}</p>
        </div>

        <div className="px-5 py-4 space-y-2.5 font-mono text-sm">
          <ReceiptRow label="Amount" value={formatUGX(amount)} />
          <ReceiptRow label="SACCO Fee" value={formatUGX(saccoFee)} />
          {providerFee !== undefined && providerFee > 0 && (
            <ReceiptRow label="Provider Fee" value={formatUGX(providerFee)} />
          )}
          <div className="border-t border-dashed border-gray-200 my-2" />
          <ReceiptRow label="Total Deducted" value={formatUGX(total)} bold />
          <div className="border-t border-dashed border-gray-200 my-2" />
          <ReceiptRow label="Reference" value={reference} />
          <ReceiptRow label="Date" value={formatDateTime(date)} />
          <div className="flex justify-between items-center pt-1">
            <span className="text-gray-400">Status</span>
            <span className={`font-bold ${status === 'COMPLETED' ? 'text-success-600' : status === 'PENDING' ? 'text-amber-600' : 'text-danger-600'}`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <Button variant="outline" size="md" onClick={() => showToast('success', 'Receipt downloaded', 'Your receipt has been saved as PDF.')}>
          <Download size={16} /> PDF
        </Button>
        <Button variant="outline" size="md" onClick={() => showToast('success', 'Receipt shared', 'Receipt link copied to clipboard.')}>
          <Share2 size={16} /> Share
        </Button>
      </div>
      <Button fullWidth size="lg" className="mt-3" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}

function ReceiptRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className={bold ? 'font-bold text-gray-900' : 'text-gray-700'}>{value}</span>
    </div>
  );
}
