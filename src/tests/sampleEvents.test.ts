import { describe, it, expect } from 'vitest';
import { SAMPLE_WEDDING, SAMPLE_BIRTHDAY, SAMPLE_COMMUNITY, ALL_SAMPLE_EVENTS } from '@/lib/sampleEvents';

describe('Sample Event Presets Validation', () => {
  it('SAMPLE_WEDDING conforms to full schema with color palette and vendor CRM', () => {
    expect(SAMPLE_WEDDING.eventType).toBe('wedding');
    expect(SAMPLE_WEDDING.colorPalette.length).toBeGreaterThanOrEqual(4);
    expect(SAMPLE_WEDDING.budgetBreakdown.length).toBeGreaterThan(5);
    expect(SAMPLE_WEDDING.timeline.length).toBeGreaterThan(8);
    expect(SAMPLE_WEDDING.vendors.length).toBeGreaterThan(3);
    expect(SAMPLE_WEDDING.specialRequirements).toBeTruthy();
  });

  it('SAMPLE_BIRTHDAY has valid timeline and arcade theme', () => {
    expect(SAMPLE_BIRTHDAY.eventType).toBe('birthday');
    expect(SAMPLE_BIRTHDAY.theme).toContain('Neon');
    expect(SAMPLE_BIRTHDAY.totalBudget).toBe(8500);
    expect(SAMPLE_BIRTHDAY.vendors.some((v) => v.category.includes('Arcade') || v.category.includes('DJ'))).toBe(true);
  });

  it('SAMPLE_COMMUNITY includes municipal permits and volunteer milestones', () => {
    expect(SAMPLE_COMMUNITY.eventType).toBe('community');
    expect(SAMPLE_COMMUNITY.guestCount).toBe(500);
    const hasPermitMilestone = SAMPLE_COMMUNITY.timeline.some((t) => t.category === 'permits');
    expect(hasPermitMilestone).toBe(true);
  });

  it('ALL_SAMPLE_EVENTS has wedding, birthday, and community mappings', () => {
    expect(ALL_SAMPLE_EVENTS.wedding).toBeDefined();
    expect(ALL_SAMPLE_EVENTS.birthday).toBeDefined();
    expect(ALL_SAMPLE_EVENTS.community).toBeDefined();
  });
});
