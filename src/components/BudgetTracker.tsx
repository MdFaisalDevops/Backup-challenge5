'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Trash2,
  Download,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { BudgetItem, EventPlan } from '@/types/event';

interface BudgetTrackerProps {
  plan: EventPlan;
  onUpdatePlan: (updated: EventPlan) => void;
}

export const BudgetTracker: React.FC<BudgetTrackerProps> = ({ plan, onUpdatePlan }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState('Decor & Styling');
  const [newName, setNewName] = useState('');
  const [newAllocated, setNewAllocated] = useState(500);
  const [newSpent, setNewSpent] = useState(0);
  const [newNotes, setNewNotes] = useState('');

  // Calculations
  const totalAllocated = plan.budgetBreakdown.reduce((acc, item) => acc + item.allocated, 0);
  const totalSpent = plan.budgetBreakdown.reduce((acc, item) => acc + item.spent, 0);
  const remainingBudget = plan.totalBudget - totalSpent;
  const spentPercentage = Math.min(Math.round((totalSpent / plan.totalBudget) * 100), 100);
  const isOverBudget = totalSpent > plan.totalBudget;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: BudgetItem = {
      id: `custom-b-${Date.now()}`,
      category: newCategory,
      name: newName.trim(),
      allocated: Number(newAllocated) || 0,
      spent: Number(newSpent) || 0,
      notes: newNotes.trim(),
      status: Number(newSpent) >= Number(newAllocated) ? 'paid_in_full' : Number(newSpent) > 0 ? 'deposit_paid' : 'planned',
    };

    const updated = {
      ...plan,
      budgetBreakdown: [...plan.budgetBreakdown, newItem],
      updatedAt: new Date().toISOString(),
    };

    onUpdatePlan(updated);
    setShowAddModal(false);
    setNewName('');
    setNewAllocated(500);
    setNewSpent(0);
    setNewNotes('');
  };

  const handleDeleteItem = (id: string) => {
    const updated = {
      ...plan,
      budgetBreakdown: plan.budgetBreakdown.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    };
    onUpdatePlan(updated);
  };

  const handleStatusChange = (id: string, status: BudgetItem['status']) => {
    const updated = {
      ...plan,
      budgetBreakdown: plan.budgetBreakdown.map((item) => {
        if (item.id === id) {
          const spent = status === 'paid_in_full' ? item.allocated : status === 'deposit_paid' ? Math.round(item.allocated * 0.5) : 0;
          return { ...item, status, spent };
        }
        return item;
      }),
      updatedAt: new Date().toISOString(),
    };
    onUpdatePlan(updated);
  };

  const exportCsv = () => {
    const headers = ['Category', 'Item Name', 'Allocated', 'Spent', 'Status', 'Notes'];
    const rows = plan.budgetBreakdown.map((item) => [
      `"${item.category}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      item.allocated,
      item.spent,
      item.status,
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${plan.title.replace(/\s+/g, '_')}_Budget.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section aria-labelledby="budget-heading" className="flex flex-col gap-6">
      {/* Top Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center justify-between" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span>Target Budget</span>
            <DollarSign size={16} />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem' }}>
            {plan.currency} {plan.totalBudget.toLocaleString()}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Cap for {plan.guestCount} guests ({(plan.totalBudget / plan.guestCount).toFixed(0)} {plan.currency}/guest)
          </p>
        </div>

        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center justify-between" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span>Total Spent / Paid</span>
            <TrendingUp size={16} color="#10b981" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: isOverBudget ? 'var(--accent-rose)' : '#34d399' }}>
            {plan.currency} {totalSpent.toLocaleString()}
          </div>
          <div style={{ marginTop: '0.4rem' }}>
            <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${spentPercentage}%`,
                  background: isOverBudget ? 'var(--accent-rose)' : 'var(--gradient-brand)',
                  transition: 'width var(--trans-base)'
                }}
              />
            </div>
            <div className="flex justify-between" style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
              <span>{spentPercentage}% Utilized</span>
              <span>Allocated: {plan.currency} {totalAllocated.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center justify-between" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span>Remaining Reserve</span>
            {isOverBudget ? <AlertTriangle size={16} color="#f43f5e" /> : <CheckCircle2 size={16} color="#06b6d4" />}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: isOverBudget ? '#fda4af' : '#67e8f9' }}>
            {plan.currency} {remainingBudget.toLocaleString()}
          </div>
          <p style={{ fontSize: '0.78rem', color: isOverBudget ? '#f43f5e' : 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {isOverBudget ? '⚠️ Budget limit exceeded!' : 'On track with contingency'}
          </p>
        </div>
      </div>

      {/* Main Budget Table Card */}
      <div className="glass-card">
        <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h2 id="budget-heading" style={{ fontSize: '1.3rem' }}>
              Allocations & Expense Breakdown
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Track contracts, deposits, and remaining balances in real time.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm"
              aria-label="Add new expense line item"
            >
              <Plus size={15} /> Add Item
            </button>
            <button
              onClick={exportCsv}
              className="btn btn-secondary btn-sm"
              aria-label="Export budget to CSV"
            >
              <Download size={15} /> Export CSV
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Category</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Line Item</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Allocated</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Spent</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plan.budgetBreakdown.map((item) => (
                <tr
                  key={item.id}
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background var(--trans-fast)' }}
                >
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: 600 }}>
                    <span className="badge badge-purple" style={{ textTransform: 'none', fontSize: '0.75rem' }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                    {item.notes && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.notes}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', fontFamily: 'var(--font-mono)' }}>
                    {plan.currency} {item.allocated.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', fontFamily: 'var(--font-mono)', color: item.spent > item.allocated ? 'var(--accent-rose)' : 'inherit' }}>
                    {plan.currency} {item.spent.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <select
                      aria-label={`Status for ${item.name}`}
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as BudgetItem['status'])}
                      className="form-select"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', width: 'auto' }}
                    >
                      <option value="planned">Planned</option>
                      <option value="deposit_paid">Deposit Paid</option>
                      <option value="paid_in_full">Paid in Full</option>
                    </select>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      aria-label={`Delete ${item.name}`}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px', color: '#f87171' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Cost-Saving Recommendations Card */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.85rem' }}>
          <Lightbulb size={20} color="#f59e0b" />
          <h3 style={{ fontSize: '1.1rem' }}>GenAI Cost-Saving Strategies for this Celebration</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          {plan.personalizedIdeas.costSavingTips.map((tip, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: '0.85rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
            >
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                💡 {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="add-item-heading">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <h3 id="add-item-heading" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              Add Budget Line Item
            </h3>
            <form onSubmit={handleAddItem} className="flex flex-col gap-3">
              <div className="form-group">
                <label className="form-label" htmlFor="new-cat">Category</label>
                <input
                  id="new-cat"
                  className="form-input"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="e.g. Venue, Catering, Music, Decor"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-name">Line Item Name</label>
                <input
                  id="new-name"
                  className="form-input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Late-night Snack Truck, Floral Arch"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="new-alloc">Allocated ({plan.currency})</label>
                  <input
                    id="new-alloc"
                    type="number"
                    className="form-input"
                    value={newAllocated}
                    onChange={(e) => setNewAllocated(Number(e.target.value))}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="new-spent">Spent ({plan.currency})</label>
                  <input
                    id="new-spent"
                    type="number"
                    className="form-input"
                    value={newSpent}
                    onChange={(e) => setNewSpent(Number(e.target.value))}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-notes">Notes / Vendor</label>
                <input
                  id="new-notes"
                  className="form-input"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Optional details, contract terms..."
                />
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
