import { useState } from 'react';
import {
  User, Phone, Mail, MapPin, Calendar, Shield, Fingerprint, Key,
  HelpCircle, ChevronRight, LogOut, Bell, Smartphone, Eye, EyeOff,
} from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/lib/appContext';
import { formatDate } from '@/lib/format';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const { showToast, setPortal } = useApp();
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      {/* Profile header */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-2xl">
            JS
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-lg text-gray-900">Joseph Ssebunya</h2>
            <p className="text-sm text-gray-400">Member M-2900</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge status="approved" label="KYC Verified" />
              <Badge status="active" label="Active" />
            </div>
          </div>
          <Button size="sm" variant="outline">Edit</Button>
        </div>
      </Card>

      {/* Personal info */}
      <SectionCard title="Personal Information">
        <div className="space-y-3">
          {[
            { icon: Calendar, label: 'Date of Birth', value: '15 Mar 1988' },
            { icon: Phone, label: 'Phone', value: '+256 772 800 290' },
            { icon: Mail, label: 'Email', value: 'j.ssebunya@email.com' },
            { icon: MapPin, label: 'Address', value: 'Plot 12, Kololo, Kampala' },
            { icon: User, label: 'Next of Kin', value: 'Sarah Namutebi (Spouse)' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Security settings */}
      <SectionCard title="Security">
        <div className="space-y-1">
          {[
            { icon: Key, label: 'Change PIN', action: () => showToast('info', 'Coming soon', 'PIN change will be available in the next update.') },
            { icon: Fingerprint, label: 'Biometric Login', toggle: true, enabled: true },
            { icon: Smartphone, label: 'Trusted Devices', value: '2 devices', action: () => showToast('info', 'Device management', '2 trusted devices: iPhone 14, MacBook Pro') },
            { icon: Shield, label: 'Multi-Factor Auth', toggle: true, enabled: false },
            { icon: Eye, label: 'Hide Balance', toggle: true, enabled: !balanceVisible, action: () => setBalanceVisible(!balanceVisible) },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button key={i} onClick={item.action}
                className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gray-400" />
                </div>
                <span className="flex-1 text-left text-sm font-medium text-gray-900">{item.label}</span>
                {item.value && <span className="text-xs text-gray-400">{item.value}</span>}
                {item.toggle ? (
                  <div className={`w-10 h-6 rounded-full transition-colors ${item.enabled ? 'bg-primary-500' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm mt-0.5 transition-transform ${item.enabled ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'}`} />
                  </div>
                ) : (
                  <ChevronRight size={18} className="text-gray-300" />
                )}
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* Support */}
      <SectionCard title="Support">
        <div className="space-y-1">
          <button onClick={() => showToast('info', 'Help Center', 'FAQ and contact form coming soon.')}
            className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <HelpCircle size={18} className="text-gray-400" />
            </div>
            <span className="flex-1 text-left text-sm font-medium text-gray-900">Help Center & FAQ</span>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
          <button onClick={() => showToast('info', 'Support Ticket', 'Create a support ticket from the help center.')}
            className="w-full flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              <Bell size={18} className="text-gray-400" />
            </div>
            <span className="flex-1 text-left text-sm font-medium text-gray-900">My Support Tickets</span>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        </div>
      </SectionCard>

      {/* Admin portal switch */}
      <Button variant="outline" fullWidth size="lg" onClick={() => { setPortal('admin'); }}>
        Switch to Admin Portal
      </Button>

      <Button variant="ghost" fullWidth size="lg" onClick={onLogout}>
        <LogOut size={18} /> Sign Out
      </Button>

      <p className="text-center text-xs text-gray-300">Digital SACCO Platform v1.0 · Member since {formatDate('2023-11-30')}</p>
    </div>
  );
}
