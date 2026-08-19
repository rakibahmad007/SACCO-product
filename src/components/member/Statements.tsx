import { useState } from 'react';
import { FileText, Download, Filter, Search, X } from 'lucide-react';
import { SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { TxRow } from '@/components/ui/TxRow';
import { useApp } from '@/lib/appContext';
import { formatUGX } from '@/lib/format';
import { memberTransactions, savingsAccounts, type Transaction } from '@/lib/mockData';

export function Statements() {
  const { showToast } = useApp();
  const [account, setAccount] = useState('All Accounts');
  const [format, setFormat] = useState<'PDF' | 'CSV'>('PDF');
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-08-17');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const filtered = memberTransactions.filter(tx => {
    const matchSearch = !search ||
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.reference.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || tx.type === filterType;
    const matchStatus = filterStatus === 'all' || tx.status === filterStatus;
    const min = Number(minAmount) || 0;
    const max = Number(maxAmount) || Infinity;
    const matchAmount = tx.amount >= min && tx.amount <= max;
    return matchSearch && matchType && matchStatus && matchAmount;
  });

  const openingBalance = 5200000;
  const totalIn = filtered.filter(t => t.type === 'deposit' || t.type === 'loan_disbursement' || t.type === 'dividend').reduce((s, t) => s + t.amount, 0);
  const totalOut = filtered.filter(t => t.type === 'withdrawal' || t.type === 'transfer' || t.type === 'loan_repayment' || t.type === 'fee' || t.type === 'share_purchase').reduce((s, t) => s + t.amount, 0);
  const closingBalance = openingBalance + totalIn - totalOut;

  const activeFilters = (filterType !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0) + (minAmount ? 1 : 0) + (maxAmount ? 1 : 0);

  const clearFilters = () => {
    setFilterType('all');
    setFilterStatus('all');
    setMinAmount('');
    setMaxAmount('');
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-xl text-gray-900">Statements</h1>
        <p className="text-sm text-gray-400">Generate account statements</p>
      </div>

      {/* Statement generator */}
      <SectionCard title="Generate Statement">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Account</label>
            <select value={account} onChange={e => setAccount(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none">
              <option>All Accounts</option>
              {savingsAccounts.map(a => <option key={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">From</label>
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">To</label>
              <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Format</label>
            <div className="flex gap-2">
              {(['PDF', 'CSV'] as const).map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${format === f ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <Button fullWidth size="lg" onClick={() => showToast('success', 'Statement generated', `Your ${format} statement is ready to download.`)}>
            <Download size={18} /> Download {format} Statement
          </Button>
        </div>
      </SectionCard>

      {/* Transaction history */}
      <SectionCard
        title="All Transactions"
        action={
          <button onClick={() => setShowFilter(true)} className="text-xs text-gray-400 flex items-center gap-1 relative">
            <Filter size={12} /> Filter
            {activeFilters > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary-600 text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        }
      >
        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Search by title or reference..."
            icon={<Search size={18} />}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Opening balance */}
        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-xl mb-2">
          <span className="text-xs text-gray-400 font-medium">Opening Balance</span>
          <span className="text-sm font-medium text-gray-700">{formatUGX(openingBalance)}</span>
        </div>

        {/* Transactions */}
        {filtered.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filtered.map(tx => <TxRow key={tx.id} tx={tx} />)}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No transactions match your filters</p>
          </div>
        )}

        {/* Closing balance */}
        <div className="flex justify-between items-center py-2 px-3 bg-primary-50 rounded-xl mt-2">
          <span className="text-xs text-primary-700 font-medium">Closing Balance</span>
          <span className="text-sm font-bold text-primary-700">{formatUGX(closingBalance)}</span>
        </div>

        {activeFilters > 0 && (
          <button onClick={clearFilters} className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-3">
            Clear all filters
          </button>
        )}
      </SectionCard>

      {/* Filter modal */}
      <Modal open={showFilter} onClose={() => setShowFilter(false)} title="Filter Transactions">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Transaction type</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'deposit', 'withdrawal', 'transfer', 'loan_repayment', 'share_purchase', 'dividend'].map(t => (
                <button key={t} onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all capitalize ${filterType === t ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}>
                  {t === 'all' ? 'All' : t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'completed', 'pending', 'failed'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all capitalize ${filterStatus === s ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-600'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Min amount" type="number" placeholder="0" value={minAmount} onChange={e => setMinAmount(e.target.value)} />
            <Input label="Max amount" type="number" placeholder="Any" value={maxAmount} onChange={e => setMaxAmount(e.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={clearFilters}>Clear</Button>
            <Button fullWidth size="lg" onClick={() => setShowFilter(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
