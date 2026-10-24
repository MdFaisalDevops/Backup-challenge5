import { describe, it, expect } from 'vitest';
import { generateLocalBespokePlan } from '@/lib/aiPlanner';
import { WizardAnswers } from '@/types/event';

describe('AI Questionnaire & Blueprint Generation Integration', () => {
  it('correctly compiles answers from all 5 wizard steps into a comprehensive blueprint', () => {
    const answers: WizardAnswers = {
      eventType: 'birthday',
      title: 'Liam 21st Rooftop Neon Party',
      guestCount: 75,
      totalBudget: 12000,
      currency: 'USD',
      location: 'Downtown Sky Lounge',
      targetDate: '2026-11-15',
      themeVibe: 'Synthwave 80s Neon Arcade',
      topPriority: 'High-Energy Live Music & DJ',
      specialNotes: 'Require non-alcoholic mocktails and gluten-free cupcakes',
    };

    const plan = generateLocalBespokePlan(answers);

    // Assert top-level plan properties
    expect(plan.id).toBeTruthy();
    expect(plan.title).toBe('Liam 21st Rooftop Neon Party');
    expect(plan.eventType).toBe('birthday');
    expect(plan.guestCount).toBe(75);
    expect(plan.totalBudget).toBe(12000);
    expect(plan.currency).toBe('USD');
    expect(plan.location).toBe('Downtown Sky Lounge');

    // Assert budget allocations
    expect(plan.budgetBreakdown.length).toBeGreaterThanOrEqual(5);
    const sumAllocated = plan.budgetBreakdown.reduce((sum, item) => sum + item.allocated, 0);
    expect(sumAllocated).toBeGreaterThan(10000);
    expect(sumAllocated).toBeLessThanOrEqual(13000);

    // Assert timeline milestones
    expect(plan.timeline.length).toBeGreaterThanOrEqual(6);
    expect(plan.timeline.some((t) => t.phase === 'Day-of Run of Show')).toBe(true);
    expect(plan.timeline.some((t) => t.critical)).toBe(true);

    // Assert vendor suggestions
    expect(plan.vendors.length).toBeGreaterThanOrEqual(3);
    expect(plan.vendors.some((v) => v.category === 'Venue')).toBe(true);

    // Assert personalized creative ideas
    expect(plan.personalizedIdeas.themeConcept).toContain('Synthwave 80s Neon Arcade');
    expect(plan.personalizedIdeas.creativeHighlights.length).toBeGreaterThan(0);
    expect(plan.personalizedIdeas.costSavingTips.length).toBeGreaterThan(0);
    expect(plan.personalizedIdeas.aiPromptForInvitations).toContain('Synthwave 80s Neon Arcade');

    // Assert special notes passed through
    expect(plan.specialRequirements).toContain('gluten-free');
  });

  it('handles minimum and edge case guest counts and budgets safely', () => {
    const edgeAnswers: WizardAnswers = {
      eventType: 'wedding',
      title: 'Micro Wedding',
      guestCount: 10,
      totalBudget: 2500,
      currency: 'EUR',
      location: 'Botanical Conservatory',
      targetDate: '2026-12-01',
      themeVibe: 'Cozy Intimate Winter Romance',
      topPriority: 'Unforgettable Catering & Bar',
    };

    const plan = generateLocalBespokePlan(edgeAnswers);
    expect(plan.totalBudget).toBe(2500);
    expect(plan.currency).toBe('EUR');
    expect(plan.budgetBreakdown.every((b) => b.allocated > 0)).toBe(true);
  });
});
