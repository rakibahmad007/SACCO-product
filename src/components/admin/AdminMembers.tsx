import { useState } from 'react';
import { Search, Filter, ChevronRight, Eye, Shield, FileText, Smartphone, Bell } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { formatUGX, formatDate } from '@/lib/format';
import { adminMembers, kycReviewQueue, type AdminMember } from '@/lib/mockData';

export function AdminMembers() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [kycFilter, setKycFilter] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const [kycCase, setKycCase] = useState<typeof kycReviewQueue[0] | null>(null);
  const [kycAction, setKycAction] = useState<'approve' | 'reject' | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const filtered = adminMembers.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.memberNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    const matchKyc = kycFilter === 'all' || m.kycStatus === kycFilter;
    return matchSearch && matchStatus && matchKyc;
  });

  const handleKycAction = () => {
    setKycCase(null);
    setKycAction(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Member Management</h1>
        <p className="text-sm text-gray-400">{adminMembers.length} total members · {adminMembers.filter(m => m.kycStatus === 'pending').length} pending KYC</p>
      </div>

      {/* KYC Review Queue */}
      <SectionCard title="KYC Review Queue" action={<Badge status="pending" label={`${kycReviewQueue.length} pending`} />}>
        <div className="space-y-2">
          {kycReviewQueue.map(kyc => (
            <div key={kyc.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Shield className="text-amber-600" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{kyc.memberName}</p>
                <p className="text-xs text-gray-400">{kyc.memberNumber} · {kyc.docType} · Submitted {formatDate(kyc.submittedDate)}</p>
              </div>
              <Badge status={kyc.riskLevel} label={`${kyc.riskLevel} risk`} />
              <Button size="sm" variant="secondary" onClick={() => setKycCase(kyc)}>Review</Button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Members table */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Input placeholder="Search by name or member number..." icon={<Search size={18} />} value={search} onChange={e => setSearch(e.target.value)} className="flex-1" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <select value={kycFilter} onChange={e => setKycFilter(e.target.value)}
            className="px-3 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
            <option value="all">All KYC</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Member</th>
                <th className="pb-2 font-medium">Contact</th>
                <th className="pb-2 font-medium">Joined</th>
                <th className="pb-2 font-medium">Savings</th>
                <th className="pb-2 font-medium">Shares</th>
                <th className="pb-2 font-medium">KYC</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(member => (
                <tr key={member.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedMember(member)}>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 text-xs font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.memberNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500 text-xs">{member.phone}</td>
                  <td className="py-3 text-gray-400 text-xs">{formatDate(member.joinedDate)}</td>
                  <td className="py-3 text-gray-700">{formatUGX(member.totalSavings)}</td>
                  <td className="py-3 text-gray-700">{member.totalShares > 0 ? formatUGX(member.totalShares) : '—'}</td>
                  <td className="py-3"><Badge status={member.kycStatus} /></td>
                  <td className="py-3"><Badge status={member.status} /></td>
                  <td className="py-3"><ChevronRight size={16} className="text-gray-300" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Member detail modal */}
      <Modal open={!!selectedMember} onClose={() => setSelectedMember(null)} title="Member Details" size="lg">
        {selectedMember && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-2xl">
                {selectedMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-gray-900">{selectedMember.name}</h3>
                <p className="text-sm text-gray-400">{selectedMember.memberNumber}</p>
                <div className="flex gap-2 mt-1">
                  <Badge status={selectedMember.kycStatus} />
                  <Badge status={selectedMember.status} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Total Savings</p>
                <p className="font-display font-bold text-lg text-gray-900">{formatUGX(selectedMember.totalSavings)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Total Shares</p>
                <p className="font-display font-bold text-lg text-gray-900">{selectedMember.totalShares > 0 ? formatUGX(selectedMember.totalShares) : '—'}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-gray-300">Contact</p>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Smartphone size={16} className="text-gray-400" /> {selectedMember.phone}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><FileText size={16} className="text-gray-400" /> {selectedMember.email}</div>
              <div className="flex items-center gap-2 text-sm text-gray-700"><Bell size={16} className="text-gray-400" /> Joined {formatDate(selectedMember.joinedDate)}</div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" fullWidth>View Transactions</Button>
              <Button variant="outline" fullWidth>View Support History</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* KYC review modal */}
      <Modal open={!!kycCase} onClose={() => { setKycCase(null); setKycAction(null); }} title="KYC Case Review" size="lg">
        {kycCase && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Shield className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{kycCase.memberName}</p>
                <p className="text-sm text-gray-400">{kycCase.memberNumber} · {kycCase.docType}</p>
              </div>
              <Badge status={kycCase.riskLevel} label={`${kycCase.riskLevel} risk`} />
            </div>

            {/* Document viewer mock */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50">
              <FileText size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Document preview: {kycCase.docType}</p>
              <p className="text-xs text-gray-300 mt-1">Submitted on {formatDate(kycCase.submittedDate)}</p>
            </div>

            {/* Selfie mock */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50">
              <Eye size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Selfie & Liveness Check</p>
              <p className="text-xs text-success-600 mt-1">Liveness verified</p>
            </div>

            {kycAction === null ? (
              <div className="flex gap-3">
                <Button variant="danger" fullWidth size="lg" onClick={() => setKycAction('reject')}>
                  Reject
                </Button>
                <Button variant="success" fullWidth size="lg" onClick={() => setKycAction('approve')}>
                  Approve
                </Button>
              </div>
            ) : kycAction === 'reject' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for rejection</label>
                  <textarea
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    placeholder="e.g. Document image is blurry..."
                    className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" fullWidth onClick={() => setKycAction(null)}>Back</Button>
                  <Button variant="danger" fullWidth size="lg" disabled={!rejectReason} onClick={handleKycAction}>
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-success-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-success-700">You are about to approve KYC for {kycCase.memberName}. This will grant full member access.</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" fullWidth onClick={() => setKycAction(null)}>Back</Button>
                  <Button variant="success" fullWidth size="lg" onClick={handleKycAction}>
                    Confirm Approval
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
