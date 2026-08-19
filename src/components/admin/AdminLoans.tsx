import { useState } from 'react';
import {
  Landmark, Check, X, FileText, Shield, AlertCircle, ChevronRight,
} from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Progress } from '@/components/ui/Progress';
import { useApp } from '@/lib/appContext';
import { formatUGX, formatDate } from '@/lib/format';
import {
  adminLoanApplications, approvalChain, type AdminLoanApplication,
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

export function AdminLoans() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<AdminLoanApplication | null>(null);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);
  const { showToast } = useApp();

  const filtered = statusFilter === 'all'
    ? adminLoanApplications
    : adminLoanApplications.filter(a => a.status === statusFilter);

  const handleApprove = () => {
    showToast('success', 'Loan approved', `Application from ${selectedApp?.applicantName} has been approved.`);
    setApprovalAction(null);
    setSelectedApp(null);
  };

  const handleReject = () => {
    showToast('info', 'Loan rejected', `Application from ${selectedApp?.applicantName} has been rejected.`);
    setApprovalAction(null);
    setSelectedApp(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Loans Administration</h1>
        <p className="text-sm text-gray-400">{adminLoanApplications.length} applications · Maker-checker approval workflow</p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['all', 'guarantor_approval', 'officer_review', 'accountant_review', 'manager_approval', 'disbursed'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all capitalize ${statusFilter === s ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
            {s === 'all' ? 'All' : statusLabels[s]}
          </button>
        ))}
      </div>

      {/* Applications list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(app => (
          <Card key={app.id} onClick={() => setSelectedApp(app)} hover className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 text-sm font-bold">
                  {app.applicantName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{app.applicantName}</p>
                  <p className="text-xs text-gray-400">{app.memberNumber} · {formatDate(app.appliedDate)}</p>
                </div>
              </div>
              <Badge status="processing" label={statusLabels[app.status]} />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-400">Amount</p>
                <p className="text-sm font-medium text-gray-900">{formatUGX(app.amount)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-400">Product</p>
                <p className="text-sm font-medium text-gray-900">{app.product}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-400">Risk Score</p>
                <p className={`text-sm font-medium ${app.riskScore >= 80 ? 'text-danger-600' : app.riskScore >= 60 ? 'text-amber-600' : 'text-success-600'}`}>{app.riskScore}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
              <p className="text-xs text-gray-400">{app.guarantors.length} guarantor(s) · {app.guarantors.filter(g => g.status === 'accepted').length} accepted</p>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </Card>
        ))}
      </div>

      {/* Loan application detail modal */}
      <Modal open={!!selectedApp} onClose={() => { setSelectedApp(null); setApprovalAction(null); }} title="Loan Application" size="lg">
        {selectedApp && (
          <div className="space-y-5">
            {/* Applicant info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 text-sm font-bold">
                {selectedApp.applicantName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{selectedApp.applicantName}</p>
                <p className="text-sm text-gray-400">{selectedApp.memberNumber}</p>
              </div>
              <Badge status={selectedApp.riskScore >= 80 ? 'high' : selectedApp.riskScore >= 60 ? 'medium' : 'low'} label={`Risk: ${selectedApp.riskScore}`} />
            </div>

            {/* Loan details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Amount</p>
                <p className="font-display font-bold text-lg text-gray-900">{formatUGX(selectedApp.amount)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Product</p>
                <p className="font-medium text-gray-900">{selectedApp.product}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Term</p>
                <p className="font-medium text-gray-900">{selectedApp.termMonths} months</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Applied</p>
                <p className="font-medium text-gray-900">{formatDate(selectedApp.appliedDate)}</p>
              </div>
            </div>

            {/* Purpose */}
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Purpose</p>
              <p className="text-sm text-gray-700">{selectedApp.purpose}</p>
            </div>

            {/* Guarantors */}
            <div>
              <p className="text-xs font-bold uppercase text-gray-300 mb-2">Guarantors</p>
              <div className="space-y-2">
                {selectedApp.guarantors.map((g, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 text-xs font-bold">
                      {g.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="flex-1 text-sm text-gray-700">{g.name}</span>
                    <Badge status={g.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Maker-checker chain */}
            <div>
              <p className="text-xs font-bold uppercase text-gray-300 mb-3">Approval Chain</p>
              <div className="space-y-3">
                {approvalChain.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      step.status === 'completed' ? 'bg-success-100 text-success-600' :
                      step.status === 'current' ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-300' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {step.status === 'completed' ? <Check size={16} /> : step.status === 'current' ? <Shield size={16} /> : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{step.role}</p>
                      <p className="text-xs text-gray-400">{step.name}{step.date ? ` · ${formatDate(step.date)}` : ''}</p>
                    </div>
                    <Badge status={step.status === 'completed' ? 'completed' : step.status === 'current' ? 'processing' : 'pending'} />
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            {approvalAction === null ? (
              <div className="flex gap-3">
                <Button variant="danger" fullWidth size="lg" onClick={() => setApprovalAction('reject')}>
                  <X size={18} /> Reject
                </Button>
                <Button variant="success" fullWidth size="lg" onClick={() => setApprovalAction('approve')}>
                  <Check size={18} /> Approve
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`rounded-xl p-4 ${approvalAction === 'approve' ? 'bg-success-50' : 'bg-danger-50'}`}>
                  <p className={`text-sm ${approvalAction === 'approve' ? 'text-success-700' : 'text-danger-700'}`}>
                    {approvalAction === 'approve'
                      ? `You are approving a ${formatUGX(selectedApp.amount)} loan for ${selectedApp.applicantName}. This will advance to the next approval step.`
                      : `You are rejecting the loan application from ${selectedApp.applicantName}. Please provide a reason.`}
                  </p>
                </div>
                {approvalAction === 'reject' && (
                  <textarea
                    placeholder="Reason for rejection..."
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none"
                    rows={3}
                  />
                )}
                <div className="flex gap-3">
                  <Button variant="outline" fullWidth onClick={() => setApprovalAction(null)}>Back</Button>
                  <Button variant={approvalAction === 'approve' ? 'success' : 'danger'} fullWidth size="lg"
                    onClick={approvalAction === 'approve' ? handleApprove : handleReject}>
                    Confirm {approvalAction === 'approve' ? 'Approval' : 'Rejection'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
