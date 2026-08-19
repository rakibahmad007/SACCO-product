import { useState } from 'react';
import { Shield, Check, X, AlertCircle } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/lib/appContext';
import { formatUGX, formatDate } from '@/lib/format';
import { guarantorRequests as initialRequests, type GuarantorRequest } from '@/lib/mockData';

export function Guarantors() {
  const [requests, setRequests] = useState(initialRequests);
  const [actionRequest, setActionRequest] = useState<GuarantorRequest | null>(null);
  const [action, setAction] = useState<'accept' | 'decline' | null>(null);
  const [pin, setPin] = useState('');
  const { showToast } = useApp();

  const handleAction = () => {
    if (action === 'accept') {
      showToast('success', 'Guarantor request accepted', `You have guaranteed ${actionRequest?.applicantName}.`);
    } else {
      showToast('info', 'Guarantor request declined', `You declined ${actionRequest?.applicantName}'s request.`);
    }
    setRequests(requests.map(r => r.id === actionRequest?.id ? { ...r, status: action === 'accept' ? 'accepted' : 'declined' } : r));
    setActionRequest(null);
    setAction(null);
    setPin('');
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-xl text-gray-900">Guarantor Requests</h1>
        <p className="text-sm text-gray-400">Loan guarantee requests from other members</p>
      </div>

      {/* Exposure summary */}
      <Card className="p-4 bg-amber-50 border border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <AlertCircle className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-900">Total Guarantor Exposure</p>
            <p className="text-xs text-amber-700">
              {formatUGX(requests.filter(r => r.status === 'accepted' || r.status === 'pending').reduce((s, r) => s + r.exposure, 0))}
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {requests.map(req => (
          <Card key={req.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <Shield className="text-primary-600" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{req.applicantName}</p>
                  <Badge status={req.status} />
                </div>
                <p className="text-xs text-gray-400">{req.applicantNumber} · {formatDate(req.date)}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Loan amount</p>
                    <p className="text-sm font-medium text-gray-900">{formatUGX(req.amount)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-400">Your exposure</p>
                    <p className="text-sm font-medium text-gray-900">{formatUGX(req.exposure)}</p>
                  </div>
                </div>
                {req.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="danger" fullWidth onClick={() => { setActionRequest(req); setAction('decline'); }}>
                      <X size={16} /> Decline
                    </Button>
                    <Button size="sm" fullWidth onClick={() => { setActionRequest(req); setAction('accept'); }}>
                      <Check size={16} /> Accept
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* PIN confirm modal */}
      <Modal open={!!actionRequest} onClose={() => { setActionRequest(null); setPin(''); }} title={action === 'accept' ? 'Accept Guarantor Request' : 'Decline Guarantor Request'}>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Applicant</span><span className="font-medium">{actionRequest?.applicantName}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Loan amount</span><span className="font-medium">{formatUGX(actionRequest?.amount || 0)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Your exposure</span><span className="font-medium">{formatUGX(actionRequest?.exposure || 0)}</span></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter PIN to confirm</label>
            <input type="password" maxLength={4} inputMode="numeric" value={pin} onChange={e => setPin(e.target.value)}
              placeholder="••••"
              className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
          </div>
          <Button fullWidth size="lg" disabled={pin.length < 4} onClick={handleAction}
            variant={action === 'accept' ? 'primary' : 'danger'}>
            {action === 'accept' ? 'Accept Request' : 'Decline Request'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
