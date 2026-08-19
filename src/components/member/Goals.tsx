import { useState } from 'react';
import { Plus, Target, Check, TrendingUp, Calendar } from 'lucide-react';
import { Card, SectionCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';
import { useApp } from '@/lib/appContext';
import { formatUGX, formatDate, daysFromNow } from '@/lib/format';
import { goals as initialGoals, type Goal } from '@/lib/mockData';

export function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState('');
  const [contribution, setContribution] = useState('');
  const { showToast } = useApp();

  const handleCreate = () => {
    const newGoal: Goal = {
      id: 'G' + (goals.length + 100).toString().padStart(3, '0'),
      name, target: Number(target), saved: 0, targetDate: date,
      contributionAmount: Number(contribution), frequency: 'Monthly',
    };
    setGoals([...goals, newGoal]);
    setShowCreate(false);
    setName(''); setTarget(''); setDate(''); setContribution('');
    showToast('success', 'Goal created', `${name} goal is now active.`);
  };

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  return (
    <div className="max-w-2xl mx-auto pb-24 lg:pb-8 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-gray-900">Goal Savings</h1>
          <p className="text-sm text-gray-400">{formatUGX(totalSaved)} of {formatUGX(totalTarget)}</p>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New Goal
        </Button>
      </div>

      <div className="space-y-3">
        {goals.map(goal => {
          const pct = Math.round((goal.saved / goal.target) * 100);
          const days = daysFromNow(goal.targetDate);
          return (
            <Card key={goal.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent-50 flex items-center justify-center">
                    <Target className="text-accent-600" size={22} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{goal.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(goal.targetDate)} · {days > 0 ? `${days} days left` : 'Overdue'}
                    </p>
                  </div>
                </div>
                <p className="font-display font-bold text-lg text-gray-900">{pct}%</p>
              </div>
              <Progress value={pct} color="accent" size="md" />
              <div className="flex justify-between mt-2">
                <div>
                  <p className="text-xs text-gray-400">Saved</p>
                  <p className="text-sm font-medium text-gray-900">{formatUGX(goal.saved)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Target</p>
                  <p className="text-sm font-medium text-gray-900">{formatUGX(goal.target)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                <TrendingUp size={14} className="text-gray-400" />
                <p className="text-xs text-gray-400">{formatUGX(goal.contributionAmount)} {goal.frequency}</p>
                <div className="flex-1" />
                <Button size="sm" variant="secondary">Contribute</Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Savings Goal">
        <div className="space-y-4">
          <Input label="Goal name" placeholder="e.g. New Car" value={name} onChange={e => setName(e.target.value)} />
          <Input label="Target amount (UGX)" type="number" placeholder="0" value={target} onChange={e => setTarget(e.target.value)} />
          <Input label="Target date" type="date" value={date} onChange={e => setDate(e.target.value)} />
          <Input label="Monthly contribution (UGX)" type="number" placeholder="0" value={contribution} onChange={e => setContribution(e.target.value)} />
          <Button fullWidth size="lg" onClick={handleCreate} disabled={!name || !target || !date}>
            Create Goal
          </Button>
        </div>
      </Modal>
    </div>
  );
}
