'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  CalendarHeart,
  Cake,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Palette,
  Bot,
  Zap,
  ArrowRight
} from 'lucide-react';

import { EventPlan, EventType } from '@/types/event';
import { ALL_SAMPLE_EVENTS, SAMPLE_WEDDING } from '@/lib/sampleEvents';
import { Header } from '@/components/Header';
import { AiWizardModal } from '@/components/AiWizardModal';
import { BudgetTracker } from '@/components/BudgetTracker';
import { TimelinePlanner } from '@/components/TimelinePlanner';
import { VendorManager } from '@/components/VendorManager';
import { IdeasMoodboard } from '@/components/IdeasMoodboard';
import { AiChatAssistant } from '@/components/AiChatAssistant';
import { AccessibilityToolbar } from '@/components/AccessibilityToolbar';

// ─── Constants ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'celebrate_ai_current_plan';
const VISITOR_SEEN_KEY = 'celebrate_ai_has_visited';

type ActiveTab = 'budget' | 'timeline' | 'vendors' | 'ideas';

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Badge displaying the event type with the appropriate icon. */
const EventTypeBadge: React.FC<{ eventType: EventType }> = ({ eventType }) => {
  const badgeMap: Record<EventType, { className: string; icon: React.ReactNode; label: string }> = {
    wedding:   { className: 'badge badge-rose',    icon: <CalendarHeart size={12} />, label: 'WEDDING'   },
    birthday:  { className: 'badge badge-amber',   icon: <Cake size={12} />,          label: 'BIRTHDAY'  },
    community: { className: 'badge badge-emerald', icon: <Users size={12} />,         label: 'COMMUNITY' },
  };
  const { className, icon, label } = badgeMap[eventType];
  return (
    <span className={className} style={{ fontSize: '0.78rem' }}>
      {icon} {label}
    </span>
  );
};

/** A single labeled fact tile shown in the hero ribbon. */
const KeyFactItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>{value}</div>
    </div>
  </div>
);

/** A navigation tab button that indicates the active state. */
const TabButton: React.FC<{
  id: ActiveTab;
  activeTab: ActiveTab;
  onClick: (id: ActiveTab) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ id, activeTab, onClick, icon, label }) => (
  <button
    onClick={() => onClick(id)}
    className={`tab-btn ${activeTab === id ? 'active' : ''}`}
    aria-selected={activeTab === id}
    role="tab"
  >
    {icon} {label}
  </button>
);

export default function Home() {
  const [currentPlan, setCurrentPlan] = useState<EventPlan>(SAMPLE_WEDDING);
  const [activeTab, setActiveTab] = useState<ActiveTab>('budget');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);

  // Restore from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<EventPlan>;
        if (parsed?.id) {
          setCurrentPlan(parsed as EventPlan);
        }
      }

      // Show the welcome prompt only for first-time visitors
      const hasVisited = localStorage.getItem(VISITOR_SEEN_KEY);
      if (!hasVisited) {
        setShowWelcomePrompt(true);
        localStorage.setItem(VISITOR_SEEN_KEY, 'true');
      }
    } catch (e) {
      console.warn('LocalStorage retrieval error:', e);
    }
  }, []);

  /** Persists an updated plan both in React state and LocalStorage. */
  const handleUpdatePlan = useCallback((updated: EventPlan) => {
    setCurrentPlan(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, []);

  const handleSelectSample = useCallback((type: EventType) => {
    const sample = ALL_SAMPLE_EVENTS[type] ?? SAMPLE_WEDDING;
    handleUpdatePlan(sample);
  }, [handleUpdatePlan]);

  const handlePlanGenerated = useCallback((newPlan: EventPlan) => {
    handleUpdatePlan(newPlan);
    setShowWelcomePrompt(false);
    setActiveTab('budget');
  }, [handleUpdatePlan]);

  const handleOpenWizard = useCallback(() => setIsWizardOpen(true), []);
  const handleCloseWizard = useCallback(() => setIsWizardOpen(false), []);
  const handleCloseA11y = useCallback(() => setIsA11yOpen(false), []);
  const handleToggleA11y = useCallback(() => setIsA11yOpen((prev) => !prev), []);
  const handleDismissWelcome = useCallback(() => setShowWelcomePrompt(false), []);

  /** Formats a number as a currency string using the plan's currency code. */
  const formatCurrency = useCallback((amount: number, curr = currentPlan.currency) => (
    `${curr} ${amount.toLocaleString()}`
  ), [currentPlan.currency]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Header
        currentPlan={currentPlan}
        onSelectSample={handleSelectSample}
        onOpenWizard={handleOpenWizard}
        onToggleA11y={handleToggleA11y}
      />

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar
        isOpen={isA11yOpen}
        onClose={handleCloseA11y}
      />

      {/* AI Wizard Modal */}
      <AiWizardModal
        isOpen={isWizardOpen}
        onClose={handleCloseWizard}
        onPlanGenerated={handlePlanGenerated}
      />

      {/* First-Time Visitor AI Greeting & Consultation Banner */}
      {showWelcomePrompt && (
        <section
          role="region"
          aria-label="Welcome AI Concierge Banner"
          className="container no-print"
          style={{ marginTop: '1.5rem' }}
        >
          <div
            className="glass-card flex items-center justify-between flex-wrap gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
                  flexShrink: 0,
                }}
              >
                <Bot size={22} color="#fff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>
                  Welcome to CelebrateAI! Let&apos;s plan your celebration.
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Our GenAI Architect asks a few quick questions to generate your custom budget, checklist &amp; run of show in seconds.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenWizard}
                className="btn btn-primary"
                style={{ fontSize: '0.92rem' }}
              >
                <Sparkles size={16} /> Start 60s AI Questionnaire <ArrowRight size={16} />
              </button>
              <button
                onClick={handleDismissWelcome}
                className="btn btn-secondary btn-sm"
                aria-label="Dismiss banner"
              >
                Explore Demo
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main id="main-content" className="container flex-1" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Event Hero Card */}
        <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="flex items-start justify-between flex-wrap gap-4" style={{ marginBottom: '1.25rem' }}>
            <div>
              <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '0.5rem' }}>
                <EventTypeBadge eventType={currentPlan.eventType} />
                <span className="badge badge-purple" style={{ fontSize: '0.78rem' }}>
                  {currentPlan.theme}
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--text-primary)' }}>
                {currentPlan.title}
              </h1>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '780px', marginTop: '0.4rem', lineHeight: '1.6' }}>
                {currentPlan.vibeDescription}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 no-print">
              <button
                onClick={handleOpenWizard}
                className="btn btn-outline btn-sm"
                aria-label="Re-synthesize this plan with AI"
              >
                <Zap size={14} color="var(--accent-purple)" /> Modify with AI
              </button>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Auto-saved to LocalStorage
              </span>
            </div>
          </div>

          {/* Key Facts Ribbon */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <KeyFactItem icon={<Calendar size={18} color="var(--accent-purple)" />} label="Target Date" value={currentPlan.date} />
            <KeyFactItem icon={<MapPin size={18} color="var(--accent-cyan)" />} label="Location / Venue" value={currentPlan.location} />
            <KeyFactItem icon={<Users size={18} color="#34d399" />} label="Guest Scale" value={`${currentPlan.guestCount} Attendees`} />
            <KeyFactItem icon={<DollarSign size={18} color="#f59e0b" />} label="Total Budget" value={formatCurrency(currentPlan.totalBudget)} />
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <nav className="tabs-container no-print" aria-label="Dashboard Feature Sections">
          <TabButton id="budget"   activeTab={activeTab} onClick={setActiveTab} icon={<DollarSign size={16} />} label="Budget & Expenses" />
          <TabButton id="timeline" activeTab={activeTab} onClick={setActiveTab} icon={<Clock size={16} />}     label="Timeline & Milestones" />
          <TabButton id="vendors"  activeTab={activeTab} onClick={setActiveTab} icon={<Users size={16} />}     label={`Vendor CRM (${currentPlan.vendors.length})`} />
          <TabButton id="ideas"    activeTab={activeTab} onClick={setActiveTab} icon={<Palette size={16} />}   label="GenAI Ideas & Moodboard" />
        </nav>

        {/* Tab Content Display */}
        {activeTab === 'budget' && (
          <BudgetTracker plan={currentPlan} onUpdatePlan={handleUpdatePlan} />
        )}

        {activeTab === 'timeline' && (
          <TimelinePlanner plan={currentPlan} onUpdatePlan={handleUpdatePlan} />
        )}

        {activeTab === 'vendors' && (
          <VendorManager plan={currentPlan} onUpdatePlan={handleUpdatePlan} />
        )}

        {activeTab === 'ideas' && (
          <IdeasMoodboard plan={currentPlan} />
        )}
      </main>

      {/* Floating Interactive AI Co-planner Chat */}
      <AiChatAssistant plan={currentPlan} />

      {/* Footer */}
      <footer
        className="no-print"
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '2rem 0',
          marginTop: 'auto',
          background: 'rgba(10, 11, 18, 0.9)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
        }}
      >
        <div className="container flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="logo-brand gradient-text" style={{ fontSize: '1rem' }}>CelebrateAI</span>
            <span>— PromptWars Virtual GenAI Event Architect</span>
          </div>

          <div className="flex items-center gap-4">
            <span>WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span>Serverless &amp; Vercel Ready</span>
            <span>•</span>
            <span>Safe AI Guardrails</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
