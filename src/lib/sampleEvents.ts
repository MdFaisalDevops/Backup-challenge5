import { EventPlan } from '@/types/event';

export const SAMPLE_WEDDING: EventPlan = {
  id: 'sample-wedding-1',
  title: 'Elena & Julian’s Coastal Botanical Wedding',
  eventType: 'wedding',
  date: '2026-09-18',
  location: 'Monterey Coast & Cliffside Pavilion, CA',
  guestCount: 120,
  totalBudget: 42000,
  currency: 'USD',
  theme: 'Coastal Botanical Elegance',
  vibeDescription: 'An effortless seaside celebration blending coastal sage, ocean breeze, and warm amber candlelight with sustainable local botanicals.',
  colorPalette: [
    { name: 'Seafoam Sage', hex: '#6B8E83' },
    { name: 'Warm Terracotta', hex: '#D97757' },
    { name: 'Champagne Gold', hex: '#E7C898' },
    { name: 'Deep Indigo', hex: '#243447' },
    { name: 'Crisp Linen', hex: '#F9F8F5' },
  ],
  budgetBreakdown: [
    { id: 'b1', category: 'Venue', name: 'Cliffside Oceanfront Pavilion (Ceremony & Reception)', allocated: 11000, spent: 11000, status: 'paid_in_full', notes: 'Includes tables, chiavari chairs, and bridal suite.' },
    { id: 'b2', category: 'Catering & Bar', name: 'Farm-to-Table 3-Course Plated Dinner + Open Craft Bar', allocated: 14500, spent: 7000, status: 'deposit_paid', notes: 'Local Pacific seafood & vegan wild mushroom risotto.' },
    { id: 'b3', category: 'Photography & Film', name: 'Golden Hour 10-Hr Photo + Drone Highlight Video', allocated: 4500, spent: 2000, status: 'deposit_paid', notes: 'Includes engagement session and archival album.' },
    { id: 'b4', category: 'Florals & Decor', name: 'Organic Arch, Driftwood Tablescapes & Fairy Lights', allocated: 4000, spent: 1500, status: 'deposit_paid', notes: 'Repurposing ceremony floral pillars for sweetheart table.' },
    { id: 'b5', category: 'Entertainment', name: 'Acoustic Guitarist (Ceremony) & 5-Piece Soul/Motown Band', allocated: 3800, spent: 1000, status: 'deposit_paid', notes: 'Band handles MCing and wireless mics for toasts.' },
    { id: 'b6', category: 'Attire & Beauty', name: 'Custom Gown, Tuxedo & Bridal Hair/Makeup', allocated: 2400, spent: 2400, status: 'paid_in_full' },
    { id: 'b7', category: 'Stationery & Favors', name: 'Seed Paper Botanical Invitations & Local Honey Jars', allocated: 800, spent: 400, status: 'deposit_paid' },
    { id: 'b8', category: 'Contingency Reserve', name: 'Emergency Weather Tenting & Incidentals', allocated: 1000, spent: 0, status: 'planned', notes: 'Buffer fund for last-minute tips or changes.' },
  ],
  timeline: [
    { id: 't1', phase: '6+ Months Before', task: 'Lock in Seaside Pavilion Venue & Pay Deposit', dueDate: '2026-03-01', completed: true, category: 'venue', critical: true },
    { id: 't2', phase: '6+ Months Before', task: 'Hire Lead Wedding Photographer & Videographer', dueDate: '2026-03-20', completed: true, category: 'entertainment', critical: true },
    { id: 't3', phase: '2-3 Months Before', task: 'Finalize Menu Tasting & Signature Cocktails with Caterer', dueDate: '2026-06-15', completed: true, category: 'catering' },
    { id: 't4', phase: '2-3 Months Before', task: 'Mail Botanical Seed Paper Invitations & Open RSVP Site', dueDate: '2026-07-01', completed: false, category: 'invitations', critical: true },
    { id: 't5', phase: '1 Month Before', task: 'Confirm Final Headcount & Table Seating Chart with Caterer', dueDate: '2026-08-20', completed: false, category: 'catering' },
    { id: 't6', phase: '1-2 Weeks Before', task: 'Finalize Master Day-of Timeline with Band & Vendors', dueDate: '2026-09-05', completed: false, category: 'logistics' },
    { id: 't7', phase: 'Day-of Run of Show', time: '11:00 AM', task: 'Bridal Party Hair & Makeup Begins at Pavilion Suite', dueDate: '2026-09-18', completed: false, category: 'logistics' },
    { id: 't8', phase: 'Day-of Run of Show', time: '02:30 PM', task: 'First Look Photos on the Coastal Bluff', dueDate: '2026-09-18', completed: false, category: 'logistics' },
    { id: 't9', phase: 'Day-of Run of Show', time: '04:00 PM', task: 'Guest Seating & Acoustic Prelude Music', dueDate: '2026-09-18', completed: false, category: 'venue' },
    { id: 't10', phase: 'Day-of Run of Show', time: '04:30 PM', task: 'Ceremony Processional & Exchange of Vows', dueDate: '2026-09-18', completed: false, category: 'venue', critical: true },
    { id: 't11', phase: 'Day-of Run of Show', time: '05:15 PM', task: 'Cocktail Hour & Golden Hour Sunset Portraits', dueDate: '2026-09-18', completed: false, category: 'catering' },
    { id: 't12', phase: 'Day-of Run of Show', time: '06:30 PM', task: 'Grand Entrance, Welcome Toast & Dinner Service', dueDate: '2026-09-18', completed: false, category: 'catering' },
    { id: 't13', phase: 'Day-of Run of Show', time: '08:00 PM', task: 'First Dance & Soul Band Live Dance Floor Opens', dueDate: '2026-09-18', completed: false, category: 'entertainment' },
    { id: 't14', phase: 'Day-of Run of Show', time: '10:30 PM', task: 'Sparkler Farewell on the Veranda', dueDate: '2026-09-18', completed: false, category: 'logistics' },
  ],
  vendors: [
    { id: 'v1', category: 'Venue', name: 'Monterey Cliffside Sanctuary', contactPerson: 'Sarah Jenkins', email: 'events@montereycliffside.com', phone: '+1 (831) 555-0192', status: 'booked', quoteAmount: 11000, rating: 5 },
    { id: 'v2', category: 'Catering', name: 'Artisan Coast Catering Co.', contactPerson: 'Chef Marcus Vance', email: 'marcus@artisancoast.com', phone: '+1 (831) 555-0144', status: 'booked', quoteAmount: 14500, rating: 5 },
    { id: 'v3', category: 'Photography', name: 'Lumina Coastal Stories', contactPerson: 'Chloe Chen', email: 'chloe@luminastories.com', phone: '+1 (415) 555-8821', status: 'booked', quoteAmount: 4500, rating: 5 },
    { id: 'v4', category: 'Floral & Decor', name: 'Wild Sage Botanical Design', contactPerson: 'David Ross', email: 'david@wildsageflowers.com', phone: '+1 (408) 555-3211', status: 'booked', quoteAmount: 4000, rating: 4 },
    { id: 'v5', category: 'Live Music', name: 'The Pacific Soul Collective', contactPerson: 'Jamal Wright', email: 'booking@pacificsoul.com', phone: '+1 (510) 555-7799', status: 'booked', quoteAmount: 3800, rating: 5 },
    { id: 'v6', category: 'Cake & Confection', name: 'Sweet Lavender Bakehouse', contactPerson: 'Maya Lin', email: 'orders@sweetlavender.com', phone: '+1 (831) 555-9011', status: 'quoted', quoteAmount: 750, rating: 4 },
  ],
  personalizedIdeas: {
    themeConcept: 'Ocean Breeze & Organic Botanical Romance',
    creativeHighlights: [
      'Interactive Guest Audio Guestbook inside a vintage 1970s telephone booth',
      'Dual Ceremony-to-Reception floral repurposing to save 20% on arrangements',
      'Custom oyster shucking & local sparkling cider station during sunset cocktail hour',
      'Polaroid station with handwritten memory cards clipped onto driftwood ladders'
    ],
    curatedPlaylistVibe: [
      'Leon Bridges - Beyond',
      'Norah Jones - Come Away With Me',
      'Stevie Wonder - For Once In My Life',
      'Fleetwood Mac - You Make Loving Fun',
      'Ray LaMontagne - You Are The Best Thing'
    ],
    costSavingTips: [
      'Serve signature craft cocktails during cocktail hour rather than a full premium top-shelf bar all night',
      'Repurpose bridal bouquets into cake table and gift table centerpieces',
      'Choose seasonal local botanicals (eucalyptus, olive branch, ranunculus) over imported out-of-season blooms'
    ],
    guestExperienceMoments: [
      'Warm pashminas and throw blankets in woven baskets for breezy coastal evening temperatures',
      'Late-night warm churro and gourmet espresso cart before the sparkler send-off'
    ],
    aiPromptForInvitations: 'Editorial watercolor wedding invitation suite, soft seafoam sage foliage, subtle champagne gold foil calligraphy, coastal ocean cliffside backdrop, textured deckled-edge paper, ultra high resolution'
  },
  specialRequirements: 'Wheelchair ramp access needed for cliffside viewing pavilion.',
  dietaryRestrictions: '12 Gluten-Free, 8 Vegan, 2 Shellfish Allergies.',
  createdAt: '2026-03-01T10:00:00Z',
  updatedAt: '2026-03-15T14:30:00Z'
};

export const SAMPLE_BIRTHDAY: EventPlan = {
  id: 'sample-birthday-1',
  title: 'Leo’s 30th Cyber-Retro Neon Arcade Rooftop',
  eventType: 'birthday',
  date: '2026-11-14',
  location: 'Skyline Glass Penthouse & Rooftop Lounge, Austin, TX',
  guestCount: 65,
  totalBudget: 8500,
  currency: 'USD',
  theme: 'Synthwave Neon 80s & Cyberpunk Lounge',
  vibeDescription: 'A pulsating, high-energy milestone bash with retro arcade cabinets, custom glow cocktail alchemy, synthwave grooves, and futuristic photo ops.',
  colorPalette: [
    { name: 'Cyber Neon Pink', hex: '#FF007F' },
    { name: 'Electric Cyan', hex: '#00F0FF' },
    { name: 'Ultra Violet', hex: '#7928CA' },
    { name: 'Dark Void Black', hex: '#0D0E15' },
    { name: 'Laser Lime', hex: '#39FF14' },
  ],
  budgetBreakdown: [
    { id: 'bb1', category: 'Venue', name: 'Skyline Rooftop Glass Lounge (6 Hours)', allocated: 2800, spent: 2800, status: 'paid_in_full', notes: 'Panoramic downtown views with integrated LED lighting system.' },
    { id: 'bb2', category: 'Catering & Cocktails', name: 'Gourmet Slider Sliders, Bao Buns & Color-Shifting Cocktails', allocated: 2600, spent: 1000, status: 'deposit_paid', notes: 'Signature butterfly pea flower gin cocktail changes from blue to violet.' },
    { id: 'bb3', category: 'Entertainment & Arcade', name: 'DJ Synthesizer Set + 4 Vintage Arcade Cabinets Rental', allocated: 1500, spent: 500, status: 'deposit_paid', notes: 'Street Fighter II, Pac-Man, Time Crisis, and Mario Kart 64 station.' },
    { id: 'bb4', category: 'Decor & Neon Art', name: 'Custom "LEO 30.0" Neon Sign & Cyber Laser Ceiling Grid', allocated: 800, spent: 800, status: 'paid_in_full', notes: 'Leo keeps the custom neon sign as room decor afterward!' },
    { id: 'bb5', category: 'Photography & 360 Booth', name: '360 Slow-Mo Video Glitch Booth & Roaming Flash Pro', allocated: 550, spent: 200, status: 'deposit_paid' },
    { id: 'bb6', category: 'Contingency & Cake', name: 'Geometric Pixel Drip Cake & Extra Glow Props', allocated: 250, spent: 200, status: 'deposit_paid' },
  ],
  timeline: [
    { id: 'tb1', phase: '2-3 Months Before', task: 'Book Austin Rooftop Penthouse & Review Sound Ordinances', dueDate: '2026-09-01', completed: true, category: 'venue', critical: true },
    { id: 'tb2', phase: '1 Month Before', task: 'Order Custom LED Neon Sign & Reserve Retro Arcade Cabinets', dueDate: '2026-10-10', completed: true, category: 'decor' },
    { id: 'tb3', phase: '1-2 Weeks Before', task: 'Send Digital Cyber-Pass Invitations & Track RSVPs', dueDate: '2026-10-28', completed: false, category: 'invitations', critical: true },
    { id: 'tb4', phase: 'Day-of Run of Show', time: '05:00 PM', task: 'Arcade Machines & Sound System Load-In & Testing', dueDate: '2026-11-14', completed: false, category: 'logistics' },
    { id: 'tb5', phase: 'Day-of Run of Show', time: '07:30 PM', task: 'Doors Open, Welcome Glow Cocktails & Chill Synthwave', dueDate: '2026-11-14', completed: false, category: 'catering' },
    { id: 'tb6', phase: 'Day-of Run of Show', time: '09:00 PM', task: 'Retro High Score Arcade Tournament & Live DJ Beat Drop', dueDate: '2026-11-14', completed: false, category: 'entertainment', critical: true },
    { id: 'tb7', phase: 'Day-of Run of Show', time: '10:30 PM', task: 'Pixel Cake Cutting & Champagne Toast with Skyline View', dueDate: '2026-11-14', completed: false, category: 'catering' },
    { id: 'tb8', phase: 'Day-of Run of Show', time: '01:00 AM', task: 'Last Call & VIP Rooftop Wrap-Up', dueDate: '2026-11-14', completed: false, category: 'venue' },
  ],
  vendors: [
    { id: 'vb1', category: 'Venue', name: 'Skyline Penthouse ATX', contactPerson: 'Jordan Reed', email: 'events@skylineatx.com', phone: '+1 (512) 555-3301', status: 'booked', quoteAmount: 2800, rating: 5 },
    { id: 'vb2', category: 'Arcade & Games', name: 'RetroPixel Arcade Rentals', contactPerson: 'Samir Patel', email: 'rentals@retropixel.io', phone: '+1 (512) 555-8492', status: 'booked', quoteAmount: 850, rating: 5 },
    { id: 'vb3', category: 'DJ & Sound', name: 'DJ NeonKidd Live', contactPerson: 'Alex Vance', email: 'alex@neonkidd.com', phone: '+1 (512) 555-7112', status: 'booked', quoteAmount: 650, rating: 5 },
    { id: 'vb4', category: 'Catering & Bar', name: 'Bao & Beats Pop-Up Catering', contactPerson: 'Mei Zhang', email: 'eat@baobeats.com', phone: '+1 (512) 555-4420', status: 'quoted', quoteAmount: 2600, rating: 4 },
  ],
  personalizedIdeas: {
    themeConcept: 'Level 30: Cyber Retro Arcade & Skyline Synthesis',
    creativeHighlights: [
      'Personalized VIP "Arcade Coin Tokens" custom stamped with "LEO 30" given to guests at the door',
      'Color-reactive cocktail garnish: dried butterfly pea flowers with syringe of citrus elixir',
      'Glitch-art photo backdrop with retro CRT televisions displaying loop videos of the birthday host',
      'Tournament leaderboard projected onto rooftop wall with prize for highest Mario Kart score'
    ],
    curatedPlaylistVibe: [
      'The Midnight - Sunset',
      'Kavinsky - Nightcall',
      'Daft Punk - Doin’ It Right',
      'Gunship - Tech Noir',
      'Justice - D.A.N.C.E.'
    ],
    costSavingTips: [
      'Order heavy passed appetizers and grazing stations instead of a seated dinner to keep guests moving and save 35% on staff',
      'Digital interactive ticket invite with dynamic QR codes saves $400 in printing and postage'
    ],
    guestExperienceMoments: [
      'Illuminated LED wristbands that sync colors to the DJ music drops',
      'Late night hot bao buns and matcha donuts served in futuristic takeaway boxes'
    ],
    aiPromptForInvitations: 'Cyberpunk neon birthday invitation, glowing isometric arcade machines, magenta and electric cyan lasers, futuristic skyline reflection, sleek typography Level 30 Unlocked'
  },
  createdAt: '2026-09-01T12:00:00Z',
  updatedAt: '2026-10-15T09:00:00Z'
};

export const SAMPLE_COMMUNITY: EventPlan = {
  id: 'sample-community-1',
  title: 'Green Valley Harvest & Unity Community Festival',
  eventType: 'community',
  date: '2026-10-10',
  location: 'Riverside Community Memorial Park & Amphitheater',
  guestCount: 500,
  totalBudget: 18500,
  currency: 'USD',
  theme: 'Harvest & Unity Community Festival',
  vibeDescription: 'An inclusive, family-friendly outdoor cultural fair celebrating local artisans, healthy food access, live grassroots music, and youth community workshops.',
  colorPalette: [
    { name: 'Forest Evergreen', hex: '#2D5A27' },
    { name: 'Warm Marigold', hex: '#EAA221' },
    { name: 'Earthy Rust', hex: '#A84218' },
    { name: 'Sky River Blue', hex: '#4A90E2' },
    { name: 'Warm Cream', hex: '#FAF6EE' },
  ],
  budgetBreakdown: [
    { id: 'bc1', category: 'City Permits & Insurance', name: 'Park Special Event Permit, Health Dept Inspection & Liability Insurance', allocated: 2200, spent: 2200, status: 'paid_in_full', notes: 'Required by city council for gathering over 250 attendees.' },
    { id: 'bc2', category: 'Logistics & Infrastructure', name: 'Large Shade Tents, 150 Benches, Generators & ADA Accessible Portable Restrooms', allocated: 4800, spent: 2000, status: 'deposit_paid' },
    { id: 'bc3', category: 'Stage & Audio/Visual', name: 'Solar-Powered Mobile Stage & Professional Sound Technician', allocated: 3200, spent: 1000, status: 'deposit_paid' },
    { id: 'bc4', category: 'Food & Local Vendor Grants', name: 'Community Shared Kitchen Vouchers & Free Youth Snack Bar', allocated: 3500, spent: 1000, status: 'deposit_paid' },
    { id: 'bc5', category: 'Safety & Waste Management', name: 'EMS First Aid Station, Zero-Waste Compost/Recycle Marshals & Security', allocated: 2400, spent: 2400, status: 'paid_in_full' },
    { id: 'bc6', category: 'Community Marketing & Outreach', name: 'Bilingual Flyers, Yard Signs, Social Boost & Volunteer T-Shirts', allocated: 1200, spent: 1200, status: 'paid_in_full' },
    { id: 'bc7', category: 'Contingency Reserve', name: 'Weather Emergency Tarps & Backup Generators', allocated: 1200, spent: 0, status: 'planned' },
  ],
  timeline: [
    { id: 'tc1', phase: '6+ Months Before', task: 'Submit City Park Permit Application & Traffic Impact Assessment', dueDate: '2026-04-15', completed: true, category: 'permits', critical: true },
    { id: 'tc2', phase: '2-3 Months Before', task: 'Issue Artisan & Food Truck Call for Vendors (40 booths target)', dueDate: '2026-07-20', completed: true, category: 'logistics' },
    { id: 'tc3', phase: '1 Month Before', task: 'Confirm Volunteer Roster (65 Volunteers for shifts)', dueDate: '2026-09-10', completed: false, category: 'logistics', critical: true },
    { id: 'tc4', phase: '1-2 Weeks Before', task: 'City Walk-Through with Fire Marshal & Parks Supervisor', dueDate: '2026-10-01', completed: false, category: 'permits', critical: true },
    { id: 'tc5', phase: 'Day-of Run of Show', time: '06:00 AM', task: 'Park Gates Open for Stage Setup & Electrical Inspection', dueDate: '2026-10-10', completed: false, category: 'logistics' },
    { id: 'tc6', phase: 'Day-of Run of Show', time: '08:00 AM', task: 'Food Trucks & Craft Artisan Booth Load-In and Health Checks', dueDate: '2026-10-10', completed: false, category: 'catering' },
    { id: 'tc7', phase: 'Day-of Run of Show', time: '10:00 AM', task: 'Festival Kick-Off: Mayor Welcome Speech & Children’s Parade', dueDate: '2026-10-10', completed: false, category: 'entertainment', critical: true },
    { id: 'tc8', phase: 'Day-of Run of Show', time: '12:00 PM', task: 'Main Stage Live Folk & Salsa Bands, Free Community Lunch Hours', dueDate: '2026-10-10', completed: false, category: 'catering' },
    { id: 'tc9', phase: 'Day-of Run of Show', time: '03:30 PM', task: 'Community Mural Painting Unveiling & Local Youth Awards', dueDate: '2026-10-10', completed: false, category: 'decor' },
    { id: 'tc10', phase: 'Day-of Run of Show', time: '06:00 PM', task: 'Festival Conclusion & Zero-Waste Park Cleanup Sweep', dueDate: '2026-10-10', completed: false, category: 'logistics' },
  ],
  vendors: [
    { id: 'vc1', category: 'City & Parks Dept', name: 'Green Valley Municipal Parks', contactPerson: 'Officer Dan Miller', email: 'permits@greenvalley.gov', phone: '+1 (555) 012-4411', status: 'booked', quoteAmount: 2200, rating: 5 },
    { id: 'vc2', category: 'Sound & Stage', name: 'EcoSound Solar Stage Productions', contactPerson: 'Tanya Green', email: 'tanya@ecosound.org', phone: '+1 (555) 019-2233', status: 'booked', quoteAmount: 3200, rating: 5 },
    { id: 'vc3', category: 'Restrooms & Tents', name: 'Alliance Event Rentals', contactPerson: 'Carlos Mendez', email: 'carlos@alliancerents.com', phone: '+1 (555) 018-9900', status: 'booked', quoteAmount: 4800, rating: 4 },
    { id: 'vc4', category: 'Zero Waste Ops', name: 'Circular Earth Waste Diversion', contactPerson: 'Leila Faris', email: 'hello@circularearth.org', phone: '+1 (555) 017-8822', status: 'booked', quoteAmount: 1400, rating: 5 },
  ],
  personalizedIdeas: {
    themeConcept: 'Harvest Roots & Vibrant Community Unity',
    creativeHighlights: [
      'Interactive Giant Community Canvas where hundreds of residents paint a collaborative legacy mural',
      'Bilingual storytelling tent with elder voices from diverse cultural backgrounds',
      'Seed swap and urban gardening starter kit giveaway station sponsored by local nursery',
      'Youth Makers Market where teen entrepreneurs sell handmade crafts with zero booth fees'
    ],
    curatedPlaylistVibe: [
      'Playing For Change - Stand By Me',
      'Buena Vista Social Club - Chan Chan',
      'Michael Franti & Spearhead - Say Hey (I Love You)',
      'Bob Marley - One Love',
      'Kishi Bashi - Honeybody'
    ],
    costSavingTips: [
      'Partner with local businesses for in-kind equipment sponsorships (forklifts, shade canopies, water refill stations)',
      'Recruit high school and university volunteer service clubs for staging and zero-waste marshaling'
    ],
    guestExperienceMoments: [
      'Free hydration stations with fruit-infused cold water stations throughout the park',
      'Dedicated Quiet/Sensory-Friendly lounge tent for neurodiverse attendees and parents with toddlers'
    ],
    aiPromptForInvitations: 'Vibrant autumn community harvest festival banner, sunny public park with colorful artisan tents, diverse families smiling, golden marigold flowers and lush green trees, friendly modern illustration style'
  },
  specialRequirements: 'Full ADA compliance: wide ramp walkways over grass, accessible portable restrooms, sensory break tent.',
  dietaryRestrictions: 'Halal, Kosher, and Allergen-labeled food truck menus required.',
  createdAt: '2026-04-10T08:00:00Z',
  updatedAt: '2026-06-01T11:00:00Z'
};

export const ALL_SAMPLE_EVENTS: Record<string, EventPlan> = {
  wedding: SAMPLE_WEDDING,
  birthday: SAMPLE_BIRTHDAY,
  community: SAMPLE_COMMUNITY,
};
