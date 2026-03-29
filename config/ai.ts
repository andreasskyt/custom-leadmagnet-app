import type { AssessmentResult, ContactData } from '@/lib/types'
import { PILLAR_NAMES, SCORE_THRESHOLDS } from './scoring'
import { QUESTIONS } from './questions'
import { SYSTEM_PROMPT } from './prompts'

export const CLAUDE_MODEL = 'claude-opus-4-6'

export { SYSTEM_PROMPT }

export function buildUserMessage(result: AssessmentResult, contact: ContactData): string {
  const bucket = SCORE_THRESHOLDS.find(t => t.bucket === result.outcomeBucket)

  // Sort pillars by score ascending to find primary and secondary bottlenecks
  const pillarEntries = ([1, 2, 3, 4, 5, 6] as const).map(p => ({
    pillar: p,
    score: result.pillarScores[`p${p}` as keyof typeof result.pillarScores],
    name: PILLAR_NAMES[p],
  })).sort((a, b) => a.score - b.score)

  const primaryBottleneck = pillarEntries[0].name
  const secondaryBottleneck = pillarEntries[1].name

  // Build a lookup: questionId → answer label text
  const answerLabelByQId: Record<number, string> = {}
  for (const answer of result.answers) {
    const question = QUESTIONS.find(q => q.id === answer.questionId)
    if (!question) continue
    const option = question.options.find(o => o.score === answer.score)
    answerLabelByQId[answer.questionId] = option?.label ?? String(answer.score)
  }

  // Helper: get answer label and score for question N
  function a(qId: number): string {
    const answer = result.answers.find(ans => ans.questionId === qId)
    if (!answer) return '(not answered)'
    const label = answerLabelByQId[qId] ?? String(answer.score)
    return `${label} (Score: ${answer.score}/4)`
  }

  const { p1, p2, p3, p4, p5, p6 } = result.pillarScores

  return `Here are the audit results for ${contact.name} from ${contact.businessName}.

Team size: ${contact.teamSize || 'Not specified'}
Tools they use: ${contact.tools.join(', ') || 'None specified'}

Outcome bucket: ${bucket?.label ?? result.outcomeBucket}
Primary bottleneck (lowest pillar): ${primaryBottleneck}
Secondary bottleneck: ${secondaryBottleneck}

Pillar scores:
- P1 Onboarding & Delivery: ${p1} / 16
- P2 Visibility & Data: ${p2} / 16
- P3 Client Performance & Reporting: ${p3} / 16
- P4 Automation & Systems: ${p4} / 16
- P5 B2B Growth: ${p5} / 16
- P6 Team & Founder: ${p6} / 16
- Total: ${result.totalScore} / 96

All 12 answers:

P1: Onboarding & Delivery
Q1: How long is your client onboarding process?
Answer: ${a(1)}

Q2: How much of your onboarding process is automated right now?
Answer: ${a(2)}

P2: Visibility & Data
Q3: Where does most of your operational data actually live?
Answer: ${a(3)}

Q4: How confident are you that your tracking & numbers are accurate right now?
Answer: ${a(4)}

P3: Client Performance & Reporting
Q5: How do you track your clients' campaign performance?
Answer: ${a(5)}

Q6: How do you report performance to your clients?
Answer: ${a(6)}

Q7: Is your client billing and invoicing automated?
Answer: ${a(7)}

P4: Automation & Systems
Q8: When something in your operations breaks, how do you find out?
Answer: ${a(8)}

P5: B2B Growth
Q9: How do you track your own sales pipeline?
Answer: ${a(9)}

Q10: How do you analyse your sales calls?
Answer: ${a(10)}

Q11: Could your agency handle doubling revenue tomorrow?
Answer: ${a(11)}

P6: Team & Founder
Q12: If you took two weeks completely off tomorrow, what would happen?
Answer: ${a(12)}

Generate the four sections as specified. Return only the JSON object.`
}
