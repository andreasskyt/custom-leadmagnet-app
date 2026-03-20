# SKYT Systems — Agency Operations Audit

A 20-question typeform-style audit that scores agency operations across 4 pillars, generates an AI-powered report via Claude, creates a Notion page, and sends notifications via Slack and email.

## Setup

1. Copy `.env.example` to `.env` and fill in all keys:
   - `ANTHROPIC_API_KEY` — Claude API key
   - `NOTION_API_KEY` — Notion integration token
   - `SLACK_WEBHOOK_URL` — Slack incoming webhook
   - `SMTP_HOST/PORT/USER/PASS/FROM` — outbound email (SMTP)
   - `NEXT_PUBLIC_APP_URL` — public URL (e.g. https://audit.skytsystems.com)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Notion:
   - Create a Notion database with the required properties (see `config/notion.ts`)
   - Create 4 template pages (one per outcome bucket) and add their IDs to `config/notion.ts`
   - Add placeholders (`{{NAME}}`, `{{AGENCY}}`, etc.) to template pages

4. Run locally:
   ```bash
   npm run dev
   ```

## Deployment (Hetzner, port 3001)

```bash
npm run build
pm2 start ecosystem.config.js
```

Copy `nginx.conf.example` to your nginx sites-enabled and update SSL paths. Run `certbot` for SSL.

## Scoring

- **Pillar 1**: Lead Generation & Client Acquisition (Q1–5)
- **Pillar 2**: Service Delivery & Fulfillment (Q6–10)
- **Pillar 3**: Team & Internal Operations (Q11–15)
- **Pillar 4**: Finance & Business Growth (Q16–20)

Outcome determined by **lowest** pillar score:
- 5–8 → **The Bottleneck** (everything runs through you)
- 9–13 → **The Firefighter** (reactive, not proactive)
- 14–17 → **The Builder** (systems exist but incomplete)
- 18–20 → **The Operator** (fully systematised agency)

## Notion Placeholders

Add these as plain text in your Notion template pages:
`{{NAME}}`, `{{AGENCY}}`, `{{DATE}}`, `{{P1}}`, `{{P2}}`, `{{P3}}`, `{{P4}}`, `{{TOTAL}}`,
`{{P1_BAR}}`, `{{P2_BAR}}`, `{{P3_BAR}}`, `{{P4_BAR}}`, `{{BOOKING_LINK}}`,
`{{AI_KNOW_YOUR_WORLD}}`, `{{AI_BOTTLENECK_1}}`, `{{AI_BOTTLENECK_2}}`, `{{AI_QUICK_WIN}}`
