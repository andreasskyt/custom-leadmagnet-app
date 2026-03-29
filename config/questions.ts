import type { Question } from '@/lib/types'

export const QUESTIONS: Question[] = [
  // ── Pillar 1: Onboarding & Delivery ──────────────────────────────────────────
  {
    id: 1,
    pillar: 1,
    text: 'How long is your client onboarding process?',
    options: [
      { label: 'About a day, mostly manual but organised', score: 3 },
      { label: 'More than a week — it\'s a long manual process', score: 1 },
      { label: 'Under a few hours, mostly or fully automated', score: 4 },
      { label: 'A few days with a lot of back-and-forth', score: 2 },
    ],
  },
  {
    id: 2,
    pillar: 1,
    text: 'How much of your onboarding process is automated right now?',
    options: [
      { label: 'Fully automated from signed contract to kick-off', score: 4 },
      { label: 'Not at all — every step is done manually', score: 1 },
      { label: 'Partially — some things are automated but it\'s mostly manual', score: 2 },
    ],
  },

  // ── Pillar 2: Visibility & Data ───────────────────────────────────────────────
  {
    id: 3,
    pillar: 2,
    text: 'Where does most of your operational data actually live?',
    options: [
      { label: 'Mainly spreadsheets with some tools loosely connected', score: 2 },
      { label: 'In a centralised system where everything connects automatically', score: 4 },
      { label: 'Across multiple Google Sheets, each built for a different purpose', score: 1 },
      { label: 'In a CRM or project tool, partially integrated', score: 3 },
    ],
  },
  {
    id: 4,
    pillar: 2,
    text: 'How confident are you that your tracking & numbers are accurate right now?',
    options: [
      { label: 'I just check the dashboard — it\'s live and accurate', score: 4 },
      { label: 'I can get there manually — takes some digging', score: 2 },
      { label: 'No fucking clue — I\'d have to pull it from a bunch of different places', score: 1 },
    ],
  },

  // ── Pillar 3: Client Performance Tracking & Reporting ─────────────────────────
  {
    id: 5,
    pillar: 3,
    text: 'How do you track your clients\' campaign performance?',
    options: [
      { label: 'A shared sheet updated by the team or client', score: 2 },
      { label: 'Fully automated — no one has to lift a finger', score: 4 },
      { label: 'Manually — I check the platforms and copy-paste into a sheet', score: 1 },
    ],
  },
  {
    id: 6,
    pillar: 3,
    text: 'How do you report performance to your clients?',
    options: [
      { label: 'We have a consistent process but it\'s still manual work', score: 3 },
      { label: 'No real process — it\'s different for every client', score: 1 },
      { label: 'Clients have their own portal and log in whenever they want', score: 4 },
      { label: 'I have a template but someone still has to build it manually each time', score: 2 },
    ],
  },
  {
    id: 7,
    pillar: 3,
    text: 'Is your client billing and invoicing automated?',
    options: [
      { label: 'No — I send invoices myself', score: 1 },
      { label: 'Yes — fully automated', score: 4 },
      { label: 'Partly automated — a team member still touches it', score: 2 },
    ],
  },

  // ── Pillar 4: Automation & Systems ────────────────────────────────────────────
  {
    id: 8,
    pillar: 4,
    text: 'When something in your operations breaks, how do you find out?',
    options: [
      { label: 'We get an automatic alert — flagged before it reaches a client', score: 4 },
      { label: 'A team member notices and tells me', score: 2 },
      { label: 'We catch it during a manual check or weekly review', score: 3 },
      { label: 'A client complains', score: 1 },
    ],
  },

  // ── Pillar 5: B2B Growth ──────────────────────────────────────────────────────
  {
    id: 9,
    pillar: 5,
    text: 'How do you track your own sales pipeline?',
    options: [
      { label: 'GHL or another proper CRM, manually or partially automated', score: 3 },
      { label: 'I don\'t, even though I know I should...', score: 1 },
      { label: 'Fully tracked and automated — I see everything live', score: 4 },
      { label: 'Google Sheets, manually', score: 2 },
    ],
  },
  {
    id: 10,
    pillar: 5,
    text: 'How do you analyse your sales calls?',
    options: [
      { label: 'Calls are automatically recorded and analysed', score: 4 },
      { label: 'We don\'t — calls happen and we move on', score: 1 },
      { label: 'We occasionally listen back but nothing is tracked consistently', score: 2 },
    ],
  },
  {
    id: 11,
    pillar: 5,
    text: 'Could your agency handle doubling revenue tomorrow?',
    options: [
      { label: 'Maybe, but it would be messy and stressful', score: 2 },
      { label: 'Yes — we have systems that would absorb the added volume', score: 4 },
      { label: 'No — I\'d need to hire more people first', score: 1 },
    ],
  },

  // ── Pillar 6: Team & Founder ──────────────────────────────────────────────────
  {
    id: 12,
    pillar: 6,
    text: 'If you took two weeks completely off tomorrow, what would happen?',
    options: [
      { label: 'I\'d have a lovely vacation — the system handles it', score: 4 },
      { label: 'The business would grind to a halt within days', score: 1 },
      { label: 'The team would manage but it would be stressful', score: 2 },
    ],
  },
]
