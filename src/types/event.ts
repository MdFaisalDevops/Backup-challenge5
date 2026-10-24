export type EventType = 'wedding' | 'birthday' | 'community';

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  allocated: number;
  spent: number;
  notes?: string;
  status: 'planned' | 'deposit_paid' | 'paid_in_full';
}

export interface TimelineMilestone {
  id: string;
  phase: '6+ Months Before' | '2-3 Months Before' | '1 Month Before' | '1-2 Weeks Before' | 'Day-of Run of Show';
  time?: string; // For day-of hourly agenda
  task: string;
  dueDate: string;
  completed: boolean;
  category: 'venue' | 'catering' | 'logistics' | 'entertainment' | 'permits' | 'decor' | 'invitations';
  critical?: boolean;
}

export interface VendorItem {
  id: string;
  category: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  status: 'researching' | 'contacted' | 'quoted' | 'booked' | 'completed';
  quoteAmount: number;
  notes?: string;
  rating?: number;
}

export interface PersonalizedIdeas {
  themeConcept: string;
  creativeHighlights: string[];
  curatedPlaylistVibe: string[];
  costSavingTips: string[];
  guestExperienceMoments: string[];
  aiPromptForInvitations: string;
}

export interface EventPlan {
  id: string;
  title: string;
  eventType: EventType;
  date: string;
  location: string;
  guestCount: number;
  totalBudget: number;
  currency: string;
  theme: string;
  vibeDescription: string;
  colorPalette: ColorSwatch[];
  budgetBreakdown: BudgetItem[];
  timeline: TimelineMilestone[];
  vendors: VendorItem[];
  personalizedIdeas: PersonalizedIdeas;
  specialRequirements?: string;
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WizardAnswers {
  eventType: EventType;
  title: string;
  guestCount: number;
  totalBudget: number;
  currency: string;
  location: string;
  targetDate: string;
  themeVibe: string;
  topPriority: string;
  specialNotes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestions?: string[];
}
