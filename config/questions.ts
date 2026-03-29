import type { Question } from '@/lib/types'

export const QUESTIONS: Question[] = [
  // ── Pillar 1: Onboarding & Delivery ──────────────────────────────────────────
  {
    id: 1,
    pillar: 1,
    text: 'How long does it take to fully onboard a new client, from signed to everything set up for both client and team?',
    options: [
      { label: 'More than a week — it\'s a long manual process', score: 1 },
      { label: 'A few days with a lot of back-and-forth', score: 2 },
      { label: 'About a day, mostly manual but organised', score: 3 },
      { label: 'Under a few hours, mostly or fully automated', score: 4 },
    ],
  },
  {
    id: 2,
    pillar: 1,
    text: 'How much of your onboarding process is automated right now?',
    options: [
      { label: 'Not at all — every step is done manually', score: 1 },
      { label: 'Partially — some things are automated but it\'s mostly manual', score: 2 },
      { label: 'Fully automated from signed contract to kick-off', score: 4 },
    ],
  },
  {
    id: 3,
    pillar: 1,
    text: 'How does signing a new client feel right now?',
    options: [
      { label: 'Honestly, a bit like dread — there\'s so much setup', score: 1 },
      { label: 'Fine, but I know it\'ll eat my week', score: 2 },
      { label: 'Exciting and easy — I know the system handles it', score: 4 },
    ],
  },
  {
    id: 4,
    pillar: 1,
    text: 'Who delivers your service to clients?',
    options: [
      { label: 'I AM the service delivery — I\'m the whole team, lol', score: 1 },
      { label: 'I have a team but I\'m still the main quality checkpoint', score: 2 },
      { label: 'The team handles it manually without me', score: 3 },
      { label: 'We have full systems in place — the team and systems run it without me', score: 4 },
    ],
  },

  // ── Pillar 2: Visibility & Data ───────────────────────────────────────────────
  {
    id: 5,
    pillar: 2,
    text: 'Where does most of your operational data actually live?',
    options: [
      { label: 'Across multiple Google Sheets, each built for a different purpose', score: 1 },
      { label: 'Mainly spreadsheets with some tools loosely connected', score: 2 },
      { label: 'In a CRM or project tool, partially integrated', score: 3 },
      { label: 'In a centralised system where everything connects automatically', score: 4 },
    ],
  },
  {
    id: 6,
    pillar: 2,
    text: 'How well is your business data structured?',
    options: [
      { label: 'It\'s not — it lives in my head and random notes', score: 1 },
      { label: 'Spread across Google Sheets and disconnected tools', score: 2 },
      { label: 'Partially centralised — some things are connected', score: 3 },
      { label: 'Clean and centralised — everything\'s in one place and live', score: 4 },
    ],
  },
  {
    id: 7,
    pillar: 2,
    text: 'How confident are you that your revenue numbers are real and accurate right now?',
    options: [
      { label: 'No fucking clue — I\'d have to pull it from a bunch of different places', score: 1 },
      { label: 'I can get there manually — takes some digging', score: 2 },
      { label: 'I just check the dashboard — it\'s live and accurate', score: 4 },
    ],
  },

  // ── Pillar 3: Client Performance Tracking & Reporting ─────────────────────────
  {
    id: 8,
    pillar: 3,
    text: 'How do you track the ad campaign results you deliver for clients: spend, leads, cost per result?',
    options: [
      { label: 'Manually — I check the platforms and copy-paste into a sheet', score: 1 },
      { label: 'A shared sheet updated by the team or client', score: 2 },
      { label: 'An automated internal dashboard', score: 3 },
      { label: 'I don\'t anymore — clients have their own portal and log in whenever they want', score: 4 },
    ],
  },
  {
    id: 9,
    pillar: 3,
    text: 'How do you report performance to your clients?',
    options: [
      { label: 'No real process — it\'s different for every client', score: 1 },
      { label: 'I have a template but someone still has to build it manually each time', score: 2 },
      { label: 'We have a consistent process but it\'s still manual work', score: 3 },
      { label: 'Fully automated — clients get their updates and no one has to lift a finger', score: 4 },
    ],
  },
  {
    id: 10,
    pillar: 3,
    text: 'How automated is your client billing and invoicing?',
    options: [
      { label: 'Manually — I send invoices myself and track revenue in a spreadsheet', score: 1 },
      { label: 'Partly automated but someone still has to touch it regularly', score: 2 },
      { label: 'Fully automated — billing runs itself and I always know exactly where revenue stands', score: 4 },
    ],
  },

  // ── Pillar 4: Automation & Systems ────────────────────────────────────────────
  {
    id: 11,
    pillar: 4,
    text: 'When something in your operations breaks, how do you find out?',
    options: [
      { label: 'A client complains or something visibly fails', score: 1 },
      { label: 'A team member notices and escalates to me', score: 2 },
      { label: 'We catch it during a manual check or weekly review', score: 3 },
      { label: 'We get an automatic alert — it\'s flagged before it ever reaches a client', score: 4 },
    ],
  },

  // ── Pillar 5: B2B Growth ──────────────────────────────────────────────────────
  {
    id: 12,
    pillar: 5,
    text: 'How do you track your own sales pipeline?',
    options: [
      { label: 'I don\'t, even though I know I should...', score: 1 },
      { label: 'Google Sheets, manually', score: 2 },
      { label: 'GHL or another proper CRM, manually or partially automated', score: 3 },
      { label: 'Fully tracked and automated — I see everything live', score: 4 },
    ],
  },
  {
    id: 13,
    pillar: 5,
    text: "How do you analyse your agency's sales calls and team performance?",
    options: [
      { label: "We don't — calls happen and we move on", score: 1 },
      { label: 'We occasionally listen back or review but nothing is tracked consistently', score: 2 },
      { label: 'Calls are automatically recorded, analysed and scored — I know our close rate and objections without lifting a finger', score: 4 },
    ],
  },
  {
    id: 14,
    pillar: 5,
    text: 'Could your agency handle doubling revenue tomorrow?',
    options: [
      { label: "No — I'd need to hire more people first", score: 1 },
      { label: 'Maybe, but it would be messy and stressful', score: 2 },
      { label: 'Yes — we have systems that would absorb the added volume', score: 4 },
    ],
  },

  // ── Pillar 6: Team & Founder ──────────────────────────────────────────────────
  {
    id: 15,
    pillar: 6,
    text: 'If you took two weeks completely off tomorrow, what would happen?',
    options: [
      { label: 'The business would grind to a halt within days', score: 1 },
      { label: 'The team would manage but it would be stressful', score: 2 },
      { label: "I'd have a lovely vacation — the system would do all the work for me", score: 4 },
    ],
  },
]
