import { AlertTriangle, Shield, FileText, Eye } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDateTime } from '@/lib/format';
import { riskAlerts } from '@/lib/mockData';

export function AdminRisk() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Risk, Fraud & Compliance</h1>
        <p className="text-sm text-gray-400">Monitor suspicious activity and compliance status</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center mb-3">
            <AlertTriangle className="text-danger-600" size={20} />
          </div>
          <p className="text-xs text-gray-400">High Risk Alerts</p>
          <p className="font-display font-bold text-xl text-gray-900">1</p>
        </Card>
        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
            <Shield className="text-amber-600" size={20} />
          </div>
          <p className="text-xs text-gray-400">Medium Risk</p>
          <p className="font-display font-bold text-xl text-gray-900">1</p>
        </Card>
        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-info-50 flex items-center justify-center mb-3">
            <Shield className="text-info-600" size={20} />
          </div>
          <p className="text-xs text-gray-400">Open Cases</p>
          <p className="font-display font-bold text-xl text-gray-900">2</p>
        </Card>
        <Card className="p-5">
          <div className="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center mb-3">
            <Shield className="text-success-600" size={20} />
          </div>
          <p className="text-xs text-gray-400">Compliance Rate</p>
          <p className="font-display font-bold text-xl text-gray-900">98.5%</p>
        </Card>
      </div>

      {/* Risk alerts feed */}
      <SectionCard title="Risk Engine Alerts">
        <div className="space-y-3">
          {riskAlerts.map(alert => (
            <div key={alert.id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                alert.severity === 'high' ? 'bg-danger-50 text-danger-600' :
                alert.severity === 'medium' ? 'bg-amber-50 text-amber-600' :
                'bg-gray-50 text-gray-500'
              }`}>
                <AlertTriangle size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{alert.alert}</p>
                <p className="text-xs text-gray-400">{alert.member} · {formatDateTime(alert.time)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Risk Score</p>
                <p className={`text-sm font-bold ${alert.severity === 'high' ? 'text-danger-600' : alert.severity === 'medium' ? 'text-amber-600' : 'text-gray-600'}`}>{alert.score}</p>
              </div>
              <Badge status={alert.severity} />
              <Button size="sm" variant="secondary">Investigate</Button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* AML/KYC screening */}
      <SectionCard title="AML / KYC Screening">
        <div className="space-y-3">
          {[
            { id: 'AML001', name: 'Robert Tumusiime', check: 'Enhanced Due Diligence', status: 'flagged' as const, detail: 'PEP match — requires manual review' },
            { id: 'AML002', name: 'Mary Akello', check: 'Identity Verification', status: 'failed' as const, detail: 'Document mismatch detected' },
            { id: 'AML003', name: 'Samuel Kiggundu', check: 'Sanctions Screening', status: 'completed' as const, detail: 'No matches found' },
          ].map(s => (
            <div key={s.id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <FileText className="text-gray-400" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-400">{s.check} · {s.detail}</p>
              </div>
              <Badge status={s.status === 'completed' ? 'completed' : s.status === 'flagged' ? 'pending' : 'failed'} />
              <Button size="sm" variant="ghost"><Eye size={16} /></Button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Compliance report */}
      <SectionCard title="Compliance Report Generator">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {['Monthly Compliance Report', 'AML Transaction Report', 'KYC Audit Report'].map(r => (
            <div key={r} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors cursor-pointer">
              <FileText size={20} className="text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-900">{r}</p>
              <p className="text-xs text-gray-400 mt-1">Last generated: 15 Aug 2026</p>
              <Button size="sm" variant="secondary" className="mt-3">Generate</Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
