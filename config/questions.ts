import type { Question } from '@/lib/types'

export const QUESTIONS: Question[] = [
  // ── Pillar 1: Onboarding & Delivery ──────────────────────────────────────────
  {
    id: 1,
    pillar: 1,
    text: 'How long does it take to fully onboard a new client, from signed to everything set up for both client and team?',
    options: [
      { label: 'More than a week, it\'s a long manual process', score: 1 },
      { label: 'A few days with significant back-and-forth', score: 2 },
      { label: 'About a day, mostly manual but organised', score: 3 },
      { label: 'Under a few hours, mostly or fully automated', score: 4 },
    ],
  },
  {
    id: 2,
    pillar: 1,
    text: 'How much of your onboarding process is automated right now?',
    options: [
      { label: 'Almost nothing, every step is done manually', score: 1 },
      { label: 'A few triggers fire but most work is still manual', score: 2 },
      { label: 'Core steps are automated but edge cases need manual handling', score: 3 },
      { label: 'Almost entirely automated from signed contract to kick-off', score: 4 },
    ],
  },
  {
    id: 3,
    pillar: 1,
    text: 'How does signing a new client feel right now?',
    options: [
      { label: 'Honestly, a bit like dread — there\'s so much setup', score: 1 },
      { label: 'Exciting but immediately stressful', score: 2 },
      { label: 'Fine, but I know it\'ll eat my week', score: 3 },
      { label: 'Exciting and clean — the system handles it', score: 4 },
    ],
  },
  {
    id: 4,
    pillar: 1,
    text: 'How is your service delivery structured once a client is onboarded?',
    options: [
      { label: 'Depends entirely on me or one senior person being involved', score: 1 },
      { label: 'The team handles it but I\'m still the quality checkpoint', score: 2 },
      { label: 'The team runs most delivery, I step in on complex issues only', score: 3 },
      { label: 'Fully systematised, the team runs it independently', score: 4 },
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
    text: 'If someone asked your actual churn rate right now, how quickly could you answer?',
    options: [
      { label: 'I\'d need hours to piece it together from multiple places', score: 1 },
      { label: 'I have a rough number but it\'s not reliable', score: 2 },
      { label: 'I could pull it in about 30 minutes', score: 3 },
      { label: 'I know it immediately or check a live dashboard', score: 4 },
    ],
  },
  {
    id: 7,
    pillar: 2,
    text: 'How many tools do you currently use to understand how your business is performing?',
    options: [
      { label: '5+ and they don\'t talk to each other', score: 1 },
      { label: '4–5, manually reconciled', score: 2 },
      { label: '3–4, partially connected', score: 3 },
      { label: '1–2, centralised and live', score: 4 },
    ],
  },
  {
    id: 8,
    pillar: 2,
    text: 'How confident are you in the accuracy of your revenue and cash flow numbers at any given moment?',
    options: [
      { label: 'Not confident — I\'d need to reconcile several sources to get a real number', score: 1 },
      { label: 'Somewhat confident but it requires manual checking', score: 2 },
      { label: 'Pretty confident, with occasional discrepancies', score: 3 },
      { label: 'Very confident — it\'s live, accurate and always accessible', score: 4 },
    ],
  },

  // ── Pillar 3: Client Performance Tracking & Reporting ─────────────────────────
  {
    id: 9,
    pillar: 3,
    text: 'How do you handle reporting and communication updates to your clients?',
    options: [
      { label: 'Ad hoc: different process per client, mostly manual emails', score: 1 },
      { label: 'A template exists but someone builds it manually each time', score: 2 },
      { label: 'Consistent process but still requires significant manual effort', score: 3 },
      { label: 'Systematised: clients receive automatic updates and reports', score: 4 },
    ],
  },
  {
    id: 10,
    pillar: 3,
    text: 'How do you track the ad campaign results you deliver for clients: spend, leads, cost per result?',
    options: [
      { label: 'Manually checking ad platforms and copy-pasting into a sheet', score: 1 },
      { label: 'A shared sheet updated periodically by the team or client', score: 2 },
      { label: 'Some dashboards connected to ad platforms, not fully automated', score: 3 },
      { label: 'Live automated dashboards pulling from all platforms in real time', score: 4 },
    ],
  },
  {
    id: 11,
    pillar: 3,
    text: 'How do you track B2C results for your clients: appointments generated, show-up rates, close rates?',
    options: [
      { label: 'We don\'t track it systematically', score: 1 },
      { label: 'Tracked manually in a sheet, updated inconsistently', score: 2 },
      { label: 'Tracked consistently but requires manual input', score: 3 },
      { label: 'Fully tracked and centralised: every appointment, show and close logged automatically', score: 4 },
    ],
  },
  {
    id: 12,
    pillar: 3,
    text: 'How automated is your client billing and invoicing?',
    options: [
      { label: 'Manual: invoices sent by hand, revenue tracked in a spreadsheet', score: 1 },
      { label: 'Partly automated but requires regular manual input', score: 2 },
      { label: 'Mostly automated with some manual reconciliation', score: 3 },
      { label: 'Fully automated: recurring billing, automatic reconciliation, live revenue visibility', score: 4 },
    ],
  },

  // ── Pillar 4: Automation & Systems ────────────────────────────────────────────
  {
    id: 13,
    pillar: 4,
    text: 'How would you describe your current level of automation across your operations?',
    options: [
      { label: 'Almost nothing is automated, most things require manual action', score: 1 },
      { label: 'A few basics: notifications, maybe a simple workflow', score: 2 },
      { label: 'Several things automated but they break or need regular maintenance', score: 3 },
      { label: 'Most recurring work runs automatically and reliably', score: 4 },
    ],
  },
  {
    id: 14,
    pillar: 4,
    text: 'Have you built automations before that broke down or had to be completely rebuilt?',
    options: [
      { label: 'Yes, multiple times — nothing seems to stick', score: 1 },
      { label: 'Yes, once or twice — it worked then stopped working', score: 2 },
      { label: 'Minor issues but mostly holding up', score: 3 },
      { label: 'No, what we\'ve built is stable and maintainable', score: 4 },
    ],
  },
  {
    id: 15,
    pillar: 4,
    text: 'When something in your operations breaks or goes wrong, how does it typically get discovered?',
    options: [
      { label: 'A client complains or something visibly fails', score: 1 },
      { label: 'A team member notices and escalates to me', score: 2 },
      { label: 'We catch it during a manual check or weekly review', score: 3 },
      { label: 'The system flags it automatically before it becomes a problem', score: 4 },
    ],
  },
  {
    id: 16,
    pillar: 4,
    text: 'How would you describe the overall state of your current tech stack?',
    options: [
      { label: 'Fragmented: too many tools, nothing connects properly', score: 1 },
      { label: 'Functional but messy: works but requires constant maintenance', score: 2 },
      { label: 'Mostly solid with a few gaps', score: 3 },
      { label: 'Clean, connected and built for scale', score: 4 },
    ],
  },

  // ── Pillar 5: B2B Growth ──────────────────────────────────────────────────────
  {
    id: 17,
    pillar: 5,
    text: 'How do you track your own agency\'s sales pipeline: lead volume, call bookings, show-up rates, close rates?',
    options: [
      { label: 'We don\'t track it properly, mostly gut feel', score: 1 },
      { label: 'Tracked manually in a sheet or CRM, updated inconsistently', score: 2 },
      { label: 'Tracked in a CRM but requires manual input after each interaction', score: 3 },
      { label: 'Fully tracked: every lead, booking and close is logged and visible automatically', score: 4 },
    ],
  },
  {
    id: 18,
    pillar: 5,
    text: 'How do you analyse your agency\'s own sales calls and team performance?',
    options: [
      { label: 'We don\'t — calls happen and we move on', score: 1 },
      { label: 'Someone listens back occasionally but nothing is systematically tracked', score: 2 },
      { label: 'Calls are reviewed manually and feedback noted inconsistently', score: 3 },
      { label: 'Calls are automatically recorded, logged and analysed: objections, close rates, performance scored', score: 4 },
    ],
  },
  {
    id: 19,
    pillar: 5,
    text: 'How do you currently generate new clients for your agency?',
    options: [
      { label: 'Mostly referrals and word of mouth, nothing systematic', score: 1 },
      { label: 'Some outreach or content but no consistent system', score: 2 },
      { label: 'A defined process but manually managed', score: 3 },
      { label: 'A systematised pipeline: ads, outreach or content feeding into an automated follow-up flow', score: 4 },
    ],
  },
  {
    id: 20,
    pillar: 5,
    text: 'When you think about doubling your revenue, what\'s the first thing that comes to mind?',
    options: [
      { label: 'I\'d need to hire at least 2–3 more people', score: 1 },
      { label: 'It would be extremely stressful with the current team', score: 2 },
      { label: 'We could manage but it would be messy', score: 3 },
      { label: 'Our systems could handle it — I just need to fill the pipeline', score: 4 },
    ],
  },

  // ── Pillar 6: Team & Founder ──────────────────────────────────────────────────
  {
    id: 21,
    pillar: 6,
    text: 'How many people are involved in delivering your service to clients?',
    options: [
      { label: 'Just me', score: 1 },
      { label: '2–3 people including me', score: 2 },
      { label: '4–8 people', score: 3 },
      { label: '9 or more', score: 4 },
    ],
  },
  {
    id: 22,
    pillar: 6,
    text: 'Could your team handle 30% more clients without you hiring anyone new?',
    options: [
      { label: 'Absolutely not — already at capacity', score: 1 },
      { label: 'Maybe 1–2 more but we\'d be stretched', score: 2 },
      { label: 'Probably, but quality would slip', score: 3 },
      { label: 'Yes — the systems would absorb the volume', score: 4 },
    ],
  },
  {
    id: 23,
    pillar: 6,
    text: 'If your best team member left tomorrow, how badly would delivery be impacted?',
    options: [
      { label: 'Catastrophically — significant capacity and knowledge would be lost', score: 1 },
      { label: 'Badly — we\'d scramble for weeks', score: 2 },
      { label: 'It would hurt but we\'d manage', score: 3 },
      { label: 'We\'d feel it short-term but the system would carry us', score: 4 },
    ],
  },
  {
    id: 24,
    pillar: 6,
    text: 'If you took two weeks completely off tomorrow, what would happen?',
    options: [
      { label: 'The business would grind to a halt within days', score: 1 },
      { label: 'Things would pile up badly and clients would notice', score: 2 },
      { label: 'The team would manage but it would be stressful', score: 3 },
      { label: 'Nothing critical would break — the systems would carry it', score: 4 },
    ],
  },
]
