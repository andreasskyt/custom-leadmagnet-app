export interface QuestionOption {
  label: string
  score: 1 | 2 | 3 | 4
}

export interface Question {
  id: number
  pillar: 1 | 2 | 3 | 4 | 5 | 6
  text: string
  options: QuestionOption[]
}

export interface Answer {
  questionId: number
  pillar: 1 | 2 | 3 | 4 | 5 | 6
  score: number
}

export interface PillarScores {
  p1: number
  p2: number
  p3: number
  p4: number
  p5: number
  p6: number
}

export type OutcomeBucket =
  | 'the-bottleneck'
  | 'the-firefighter'
  | 'the-builder'
  | 'the-operator'

export interface AssessmentResult {
  answers: Answer[]
  pillarScores: PillarScores
  totalScore: number
  lowestPillarScore: number
  lowestPillar: 1 | 2 | 3 | 4 | 5 | 6
  outcomeBucket: OutcomeBucket
}

export interface ContactData {
  name: string
  email: string
  businessName: string
  tools: string[]
  teamSize?: string
}

export interface ClaudeResponse {
  AI_KNOW_YOUR_WORLD: string
  AI_BOTTLENECK_1: string
  AI_BOTTLENECK_2: string
  AI_QUICK_WIN: string
}

export interface SubmitPayload {
  answers: Answer[]
  contactData: ContactData
  sessionId?: string
}

export interface SessionData {
  id: string
  name: string
  email: string
  business_name: string
  tools: string[]
  answers: Record<string, number> | null
  completed_at: string | null
  notion_page_url: string | null
  created_at: string
}
