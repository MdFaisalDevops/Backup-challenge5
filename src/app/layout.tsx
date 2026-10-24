import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'CelebrateAI | GenAI Event Planning Architect for Weddings, Birthdays & Festivals',
  description: 'AI-powered planning assistant that helps you organize weddings, milestone birthdays, and community events with dynamic budgets, timelines, vendor CRM, and personalized creative ideas.',
  keywords: [
    'AI event planner',
    'wedding planner AI',
    'birthday planner AI',
    'community event planner',
    'event budget calculator',
    'run of show timeline',
    'vendor checklist',
    'PromptWars'
  ],
  authors: [{ name: 'CelebrateAI Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="atmospheric-bg" aria-hidden="true" />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
