import { describe, it, expect } from 'vitest';
import { generateLocalBespokePlan, getAiChatResponse } from '@/lib/aiPlanner';
import { WizardAnswers } from '@/types/event';

describe('AI Planner & Event Generation Engine', () => {
  it('generates a realistic, balanced Wedding plan from questionnaire answers', () => {
    const answers: WizardAnswers = {
      eventType: 'wedding',
      title: 'Samantha & David Wedding',
      guestCount: 100,
      totalBudget: 30000,
      currency: 'USD',
      location: 'Napa Valley, CA',
      targetDate: '2026-11-20',
      themeVibe: 'Romantic Vineyard Harvest',
      topPriority: 'Catering & Wine Tasting',
    };

    const plan = generateLocalBespokePlan(answers);

    expect(plan.eventType).toBe('wedding');
    expect(plan.totalBudget).toBe(30000);
    expect(plan.guestCount).toBe(100);
    expect(plan.budgetBreakdown.length).toBeGreaterThan(4);

    // Sum of allocations should match or be within 5% of total budget
    const allocatedSum = plan.budgetBreakdown.reduce((sum, item) => sum + item.allocated, 0);
    expect(allocatedSum).toBeGreaterThanOrEqual(28000);
    expect(allocatedSum).toBeLessThanOrEqual(32000);

    // Timeline should have both milestone planning and day-of run-of-show
    const dayOfItems = plan.timeline.filter((t) => t.phase === 'Day-of Run of Show');
    expect(dayOfItems.length).toBeGreaterThanOrEqual(4);
    expect(dayOfItems.some((t) => Boolean(t.time))).toBe(true);

    // Personalized ideas must include theme, playlist, and image generation prompt
    expect(plan.personalizedIdeas.curatedPlaylistVibe.length).toBeGreaterThan(0);
    expect(plan.personalizedIdeas.aiPromptForInvitations).toBeTruthy();
  });

  it('generates a balanced Community Event plan with municipal permit checks', () => {
    const answers: WizardAnswers = {
      eventType: 'community',
      title: 'Highland Park Music & Food Fest',
      guestCount: 400,
      totalBudget: 15000,
      currency: 'USD',
      location: 'City Amphitheater',
      targetDate: '2026-10-15',
      themeVibe: 'Eclectic Neighborhood Arts',
      topPriority: 'Live Music & Local Food Trucks',
    };

    const plan = generateLocalBespokePlan(answers);
    expect(plan.eventType).toBe('community');
    
    // Community events must include permits & safety
    const hasPermits = plan.budgetBreakdown.some((b) => b.category.toLowerCase().includes('permit') || b.name.toLowerCase().includes('permit'));
    expect(hasPermits).toBe(true);
  });

  it('provides helpful AI chat advice for budget optimization with contextual suggestions', async () => {
    const response = await getAiChatResponse('How can I cut $2,000 from my catering budget?');
    expect(response.reply).toContain('beverage');
    expect(response.suggestions.length).toBeGreaterThanOrEqual(2);
  });

  it('provides a professional vendor negotiation script when asked', async () => {
    const response = await getAiChatResponse('Can you help me negotiate with a photographer who quoted too high?');
    expect(response.reply).toContain('Dear');
    expect(response.reply.toLowerCase()).toContain('budget');
  });
});
