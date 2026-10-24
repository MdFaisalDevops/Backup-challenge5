'use client';

import React, { useState } from 'react';
import {
  Users,
  Mail,
  Phone,
  Star,
  Plus,
  Trash2,
  Sparkles,
  Copy,
  Check,
  Building,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { VendorItem, EventPlan } from '@/types/event';

interface VendorManagerProps {
  plan: EventPlan;
  onUpdatePlan: (updated: EventPlan) => void;
}

export const VendorManager: React.FC<VendorManagerProps> = ({ plan, onUpdatePlan }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [negotiationVendor, setNegotiationVendor] = useState<VendorItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Photography');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quoteAmount, setQuoteAmount] = useState(2500);
  const [notes, setNotes] = useState('');

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newVendor: VendorItem = {
      id: `v-${Date.now()}`,
      category,
      name: name.trim(),
      contactPerson: contactPerson.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      status: 'researching',
      quoteAmount: Number(quoteAmount) || 0,
      notes: notes.trim() || undefined,
      rating: 5,
    };

    const updated = {
      ...plan,
      vendors: [...plan.vendors, newVendor],
      updatedAt: new Date().toISOString(),
    };

    onUpdatePlan(updated);
    setShowAddModal(false);
    setName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setQuoteAmount(2000);
    setNotes('');
  };

  const handleStatusChange = (id: string, status: VendorItem['status']) => {
    const updated = {
      ...plan,
      vendors: plan.vendors.map((v) => (v.id === id ? { ...v, status } : v)),
      updatedAt: new Date().toISOString(),
    };
    onUpdatePlan(updated);
  };

  const handleDeleteVendor = (id: string) => {
    const updated = {
      ...plan,
      vendors: plan.vendors.filter((v) => v.id !== id),
      updatedAt: new Date().toISOString(),
    };
    onUpdatePlan(updated);
  };

  // Generate polite AI negotiation inquiry
  const generateNegotiationEmail = (v: VendorItem) => {
    return `Subject: Inquiry & Partnership regarding ${plan.title} on ${plan.date}

Dear ${v.contactPerson || v.name} Team,

I hope you are having a wonderful week! We are in the final stages of curating our vendor team for ${plan.title}, scheduled for ${plan.date} at ${plan.location} with approximately ${plan.guestCount} guests.

We love your portfolio and exceptional reputation in ${v.category}. We reviewed your quote of ${plan.currency} ${v.quoteAmount.toLocaleString()}. 

Our allocated target budget for this category is approximately ${plan.currency} ${Math.round(v.quoteAmount * 0.88).toLocaleString()}. If we are prepared to lock in a contract and deposit this week, would you have any flexibility to tailor your package or offer a package discount to align with our target?

We would be absolutely thrilled to collaborate with you to make this celebration unforgettable!

Warm regards,
Event Coordination Team
${plan.title}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const bookedCount = plan.vendors.filter((v) => v.status === 'booked' || v.status === 'completed').length;

  return (
    <section aria-labelledby="vendor-heading" className="flex flex-col gap-6">
      {/* Overview Card */}
      <div className="glass-card flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 id="vendor-heading" style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building className="gradient-text" size={24} /> Vendor Directory & Procurement CRM
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Track contracts, compare quotes, and generate polite GenAI negotiation messages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {bookedCount} / {plan.vendors.length} Confirmed
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Procurement Pipeline
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-sm"
            aria-label="Add new vendor"
          >
            <Plus size={15} /> Add Vendor
          </button>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        {plan.vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="glass-card flex flex-col justify-between"
            style={{
              padding: '1.25rem',
              borderTop:
                vendor.status === 'booked' || vendor.status === 'completed'
                  ? '3px solid #10b981'
                  : vendor.status === 'quoted'
                  ? '3px solid #f59e0b'
                  : '3px solid var(--accent-purple)',
            }}
          >
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                  {vendor.category}
                </span>

                <select
                  aria-label={`Status for ${vendor.name}`}
                  value={vendor.status}
                  onChange={(e) => handleStatusChange(vendor.id, e.target.value as VendorItem['status'])}
                  className="form-select"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem', width: 'auto' }}
                >
                  <option value="researching">Researching</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="booked">Booked</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {vendor.name}
              </h3>

              {vendor.contactPerson && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Contact: <span style={{ color: 'var(--text-secondary)' }}>{vendor.contactPerson}</span>
                </p>
              )}

              <div className="flex flex-col gap-1" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.5rem 0' }}>
                {vendor.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={13} color="var(--accent-cyan)" /> {vendor.email}
                  </div>
                )}
                {vendor.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={13} color="var(--accent-purple)" /> {vendor.phone}
                  </div>
                )}
                <div className="flex items-center gap-2" style={{ fontWeight: 600, color: '#34d399', marginTop: '0.25rem' }}>
                  <DollarSign size={14} /> Quote: {plan.currency} {vendor.quoteAmount.toLocaleString()}
                </div>
              </div>

              {vendor.notes && (
                <div style={{ fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem' }}>
                  {vendor.notes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between" style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setNegotiationVendor(vendor)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.8rem', gap: '0.35rem' }}
                aria-label={`Draft AI negotiation email for ${vendor.name}`}
              >
                <Sparkles size={13} color="var(--accent-purple)" /> Draft AI Email
              </button>

              <button
                onClick={() => handleDeleteVendor(vendor.id)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '6px 10px', color: '#f87171' }}
                aria-label={`Delete ${vendor.name}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Negotiation Email Modal */}
      {negotiationVendor && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="email-draft-heading">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="gradient-text" />
                <h3 id="email-draft-heading" style={{ fontSize: '1.15rem' }}>
                  AI Negotiation & Outreach Draft for {negotiationVendor.name}
                </h3>
              </div>
              <button
                onClick={() => setNegotiationVendor(null)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 8px', borderRadius: '50%' }}
              >
                ✕
              </button>
            </div>

            <textarea
              readOnly
              rows={12}
              className="form-textarea"
              style={{ fontFamily: 'inherit', fontSize: '0.85rem', lineHeight: '1.6' }}
              value={generateNegotiationEmail(negotiationVendor)}
            />

            <div className="flex items-center justify-between" style={{ marginTop: '1rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Polite, professional negotiation calibrated for vendor retention.
              </span>
              <button
                onClick={() => copyToClipboard(generateNegotiationEmail(negotiationVendor))}
                className="btn btn-primary btn-sm"
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                {copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Text'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="add-vendor-heading">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <h3 id="add-vendor-heading" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              Add New Vendor to Directory
            </h3>
            <form onSubmit={handleAddVendor} className="flex flex-col gap-3">
              <div className="form-group">
                <label className="form-label" htmlFor="vendor-name">Business / Vendor Name</label>
                <input
                  id="vendor-name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lumina Film Studio, Bella Pastry"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="vendor-category">Category</label>
                  <select
                    id="vendor-category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Venue">Venue</option>
                    <option value="Catering">Catering / Bar</option>
                    <option value="Photography">Photography / Video</option>
                    <option value="Floral & Decor">Floral & Decor</option>
                    <option value="Entertainment">Entertainment / DJ</option>
                    <option value="Bakery">Cake & Bakery</option>
                    <option value="Logistics">Rentals / Logistics</option>
                    <option value="Permits">Permits / Municipal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vendor-quote">Quote ({plan.currency})</label>
                  <input
                    id="vendor-quote"
                    type="number"
                    className="form-input"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(Number(e.target.value))}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="vendor-contact">Contact Person</label>
                <input
                  id="vendor-contact"
                  className="form-input"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Amanda Smith"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="vendor-email">Email</label>
                  <input
                    id="vendor-email"
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@studio.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="vendor-phone">Phone</label>
                  <input
                    id="vendor-phone"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="vendor-notes">Notes / Inclusions</label>
                <input
                  id="vendor-notes"
                  className="form-input"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Requires 50% deposit, brings own speakers"
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
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
