import type { AssessmentResult, ContactData } from '@/lib/types'
import { SCORE_THRESHOLDS } from './scoring'

export const EMAIL_SUBJECT = 'Your SKYT Systems Agency Audit Results Are Ready'

export function buildEmailHtml(
  result: AssessmentResult,
  contact: ContactData,
  notionPageUrl: string
): string {
  const bucket = SCORE_THRESHOLDS.find(t => t.bucket === result.outcomeBucket)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Agency Audit Results</title>
  <style>
    body { margin: 0; padding: 0; background-color: #1a1e1a; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background-color: #2b3327; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); padding: 40px; }
    h1 { color: #bbac8b; font-size: 24px; margin: 0 0 8px; }
    h2 { color: #ffffff; font-size: 20px; margin: 24px 0 8px; }
    p { color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.6; margin: 0 0 16px; }
    .outcome-badge { display: inline-block; background-color: #475d43; color: #bbac8b; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-bottom: 24px; }
    .score-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .score-label { color: rgba(255,255,255,0.7); font-size: 14px; }
    .score-value { color: #bbac8b; font-size: 14px; font-weight: 600; }
    .cta-button { display: block; background-color: #bbac8b; color: #2d5a27; text-align: center; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 700; text-decoration: none; margin: 32px 0 0; }
    .footer { color: rgba(255,255,255,0.4); font-size: 12px; text-align: center; margin-top: 32px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <h1>Hi ${contact.name},</h1>
      <p>Your Agency Operations Audit is complete. Here's what we found:</p>

      <div class="outcome-badge">${bucket?.label ?? result.outcomeBucket}</div>

      <p>${bucket?.description ?? ''}</p>

      <h2>Your Pillar Scores</h2>
      <div class="score-row"><span class="score-label">Onboarding & Delivery</span><span class="score-value">&nbsp;${result.pillarScores.p1}/16</span></div>
      <div class="score-row"><span class="score-label">Visibility & Data</span><span class="score-value">&nbsp;${result.pillarScores.p2}/16</span></div>
      <div class="score-row"><span class="score-label">Client Performance & Reporting</span><span class="score-value">&nbsp;${result.pillarScores.p3}/16</span></div>
      <div class="score-row"><span class="score-label">Automation & Systems</span><span class="score-value">&nbsp;${result.pillarScores.p4}/16</span></div>
      <div class="score-row"><span class="score-label">B2B Growth</span><span class="score-value">&nbsp;${result.pillarScores.p5}/16</span></div>
      <div class="score-row"><span class="score-label">Team & Founder</span><span class="score-value">&nbsp;${result.pillarScores.p6}/16</span></div>
      <div class="score-row"><span class="score-label" style="font-weight:600;color:#fff">Total Score</span><span class="score-value">&nbsp;${result.totalScore}/96</span></div>

      <p style="margin-top:24px">Your full custom agency operations report — including a tailored systems roadmap, your specific bottlenecks, and a quick win — is ready in Notion.</p>

      <a href="${notionPageUrl}" class="cta-button">View Your Full Report →</a>
    </div>
    <p class="footer">SKYT Systems · audit.skytsystems.com<br/>You're receiving this because you completed our Agency Operations Audit.</p>
  </div>
</body>
</html>`
}
