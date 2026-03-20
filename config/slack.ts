import type { AssessmentResult, ContactData } from '@/lib/types'
import { PILLAR_NAMES, SCORE_THRESHOLDS } from './scoring'

export function buildSlackMessage(
  result: AssessmentResult,
  contact: ContactData,
  notionPageUrl: string
): object {
  const bucket = SCORE_THRESHOLDS.find(t => t.bucket === result.outcomeBucket)
  const lowestPillarName = PILLAR_NAMES[result.lowestPillar]

  return {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎯 New Agency Audit Submission',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Name:*\n${contact.name}` },
          { type: 'mrkdwn', text: `*Email:*\n${contact.email}` },
          { type: 'mrkdwn', text: `*Agency:*\n${contact.businessName}` },
          { type: 'mrkdwn', text: `*Outcome:*\n${bucket?.label ?? result.outcomeBucket}` },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Scores:* P1: ${result.pillarScores.p1} | P2: ${result.pillarScores.p2} | P3: ${result.pillarScores.p3} | P4: ${result.pillarScores.p4} | P5: ${result.pillarScores.p5} | P6: ${result.pillarScores.p6} | *Total: ${result.totalScore}/96*\n*Primary bottleneck:* ${lowestPillarName}`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'View Notion Report', emoji: true },
            url: notionPageUrl,
            style: 'primary',
          },
        ],
      },
    ],
  }
}
