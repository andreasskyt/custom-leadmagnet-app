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

All 24 answers:

P1: Onboarding & Delivery
Q1: How long does it take to fully onboard a new client, from signed to everything set up?
Answer: ${a(1)}

Q2: How much of your onboarding process is automated right now?
Answer: ${a(2)}

Q3: How does signing a new client feel right now?
Answer: ${a(3)}

Q4: How is your service delivery structured once a client is onboarded?
Answer: ${a(4)}

P2: Visibility & Data
Q5: Where does most of your operational data actually live?
Answer: ${a(5)}

Q6: If someone asked your actual churn rate right now, how quickly could you answer?
Answer: ${a(6)}

Q7: How many tools do you currently use to understand how your business is performing?
Answer: ${a(7)}

Q8: How confident are you in the accuracy of your revenue and cash flow numbers at any given moment?
Answer: ${a(8)}

P3: Client Performance & Reporting
Q9: How do you handle reporting and communication updates to your clients?
Answer: ${a(9)}

Q10: How do you track the ad campaign results you deliver for clients?
Answer: ${a(10)}

Q11: How do you track downstream B2C results for your clients: appointments, show-up rates, close rates?
Answer: ${a(11)}

Q12: How automated is your client billing and invoicing?
Answer: ${a(12)}

P4: Automation & Systems
Q13: How would you describe your current level of automation across your operations?
Answer: ${a(13)}

Q14: Have you built automations before that broke down or had to be completely rebuilt?
Answer: ${a(14)}

Q15: When something in your operations breaks or goes wrong, how does it typically get discovered?
Answer: ${a(15)}

Q16: How would you describe the overall state of your current tech stack?
Answer: ${a(16)}

P5: B2B Growth
Q17: How do you track your own agency's sales pipeline: lead volume, bookings, show-up rates, close rates?
Answer: ${a(17)}

Q18: How do you analyse your agency's own sales calls and team performance?
Answer: ${a(18)}

Q19: How do you currently generate new clients for your agency?
Answer: ${a(19)}

Q20: When you think about doubling your revenue, what is the first thing that comes to mind?
Answer: ${a(20)}

P6: Team & Founder
Q21: How many people are involved in delivering your service to clients?
Answer: ${a(21)}

Q22: Could your team handle 30% more clients without you hiring anyone new?
Answer: ${a(22)}

Q23: If your best team member left tomorrow, how badly would delivery be impacted?
Answer: ${a(23)}

Q24: If you took two weeks completely off tomorrow, what would happen?
Answer: ${a(24)}

Generate the four sections as specified. Return only the JSON object.`
}
