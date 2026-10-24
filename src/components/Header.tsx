'use client';

import React from 'react';
import { Sparkles, Printer, Sliders, CalendarHeart, Cake, Users, PlusCircle } from 'lucide-react';
import { EventPlan, EventType } from '@/types/event';

interface HeaderProps {
  currentPlan: EventPlan;
  onSelectSample: (type: EventType) => void;
  onOpenWizard: () => void;
  onToggleA11y: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPlan,
  onSelectSample,
  onOpenWizard,
  onToggleA11y,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="site-header" role="banner">
      <div className="container flex items-center justify-between flex-wrap gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="logo-icon" aria-hidden="true">
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="logo-brand gradient-text">CelebrateAI</span>
              <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>PROMPTWARS VIRTUAL</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              GenAI Event Architect for Weddings, Birthdays & Community
            </p>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center gap-2 no-print" role="region" aria-label="Sample Presets">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Quick Demos:
          </span>
          <button
            onClick={() => onSelectSample('wedding')}
            className={`btn btn-sm ${currentPlan.eventType === 'wedding' ? 'btn-primary' : 'btn-secondary'}`}
            title="Load Coastal Wedding Demo"
            aria-label="Load Coastal Wedding Demo"
          >
            <CalendarHeart size={14} /> Wedding
          </button>
          <button
            onClick={() => onSelectSample('birthday')}
            className={`btn btn-sm ${currentPlan.eventType === 'birthday' ? 'btn-primary' : 'btn-secondary'}`}
            title="Load Cyberpunk 30th Birthday Demo"
            aria-label="Load Cyberpunk Birthday Demo"
          >
            <Cake size={14} /> Birthday
          </button>
          <button
            onClick={() => onSelectSample('community')}
            className={`btn btn-sm ${currentPlan.eventType === 'community' ? 'btn-primary' : 'btn-secondary'}`}
            title="Load Community Unity Festival Demo"
            aria-label="Load Community Festival Demo"
          >
            <Users size={14} /> Community
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={onOpenWizard}
            className="btn btn-primary btn-sm"
            style={{ animation: 'pulseGlow 3s infinite ease-in-out' }}
            aria-label="Plan New Event with AI"
          >
            <PlusCircle size={15} /> Plan with AI
          </button>

          <button
            onClick={handlePrint}
            className="btn btn-secondary btn-sm"
            title="Print or Save as PDF"
            aria-label="Print or Save as PDF Blueprint"
          >
            <Printer size={15} /> Export
          </button>

          <button
            onClick={onToggleA11y}
            className="btn btn-secondary btn-sm"
            title="Accessibility Controls"
            aria-label="Toggle Accessibility Toolbar"
          >
            <Sliders size={15} /> A11y
          </button>
        </div>
      </div>
    </header>
  );
};
