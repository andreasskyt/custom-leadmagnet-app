import type { Answer, AssessmentResult, OutcomeBucket, PillarScores } from './types'
import { SCORE_THRESHOLDS } from '@/config/scoring'
import { QUESTIONS } from '@/config/questions'

// Compute max possible score per pillar (numQuestions × 4)
const maxPerPillar: Record<number, number> = {}
for (const q of QUESTIONS) {
  maxPerPillar[q.pillar] = (maxPerPillar[q.pillar] ?? 0) + 4
}

// Normalize a raw pillar score to the 0–16 scale regardless of question count
function normalizePillarScore(rawScore: number, pillar: number): number {
  const max = maxPerPillar[pillar] ?? 16
  return Math.round((rawScore / max) * 16)
}

function scoreBar(score: number): string {
  const filled = Math.round((score / 16) * 10)
  return '█'.repeat(filled) + '░'.repeat(10 - filled)
}

export function calculateScores(answers: Answer[]): AssessmentResult {
  const rawPillarScores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }

  for (const answer of answers) {
    rawPillarScores[answer.pillar] += answer.score
  }

  const pillarScores: PillarScores = {
    p1: normalizePillarScore(rawPillarScores[1], 1),
    p2: normalizePillarScore(rawPillarScores[2], 2),
    p3: normalizePillarScore(rawPillarScores[3], 3),
    p4: normalizePillarScore(rawPillarScores[4], 4),
    p5: normalizePillarScore(rawPillarScores[5], 5),
    p6: normalizePillarScore(rawPillarScores[6], 6),
  }

  const totalScore =
    pillarScores.p1 + pillarScores.p2 + pillarScores.p3 +
    pillarScores.p4 + pillarScores.p5 + pillarScores.p6

  const pillarEntries: Array<{ pillar: 1 | 2 | 3 | 4 | 5 | 6; score: number }> = [
    { pillar: 1, score: pillarScores.p1 },
    { pillar: 2, score: pillarScores.p2 },
    { pillar: 3, score: pillarScores.p3 },
    { pillar: 4, score: pillarScores.p4 },
    { pillar: 5, score: pillarScores.p5 },
    { pillar: 6, score: pillarScores.p6 },
  ]

  const lowest = pillarEntries.reduce((a, b) => (a.score <= b.score ? a : b))
  const lowestPillarScore = lowest.score
  const lowestPillar = lowest.pillar

  const threshold = SCORE_THRESHOLDS.find(
    t => lowestPillarScore >= t.min && lowestPillarScore <= t.max
  )
  const outcomeBucket: OutcomeBucket = threshold?.bucket ?? 'the-bottleneck'

  return {
    answers,
    pillarScores,
    totalScore,
    lowestPillarScore,
    lowestPillar,
    outcomeBucket,
  }
}

export function buildScoreBars(pillarScores: PillarScores, totalScore?: number): Record<string, string> {
  const bars: Record<string, string> = {
    P1_BAR: scoreBar(pillarScores.p1),
    P2_BAR: scoreBar(pillarScores.p2),
    P3_BAR: scoreBar(pillarScores.p3),
    P4_BAR: scoreBar(pillarScores.p4),
    P5_BAR: scoreBar(pillarScores.p5),
    P6_BAR: scoreBar(pillarScores.p6),
  }
  if (totalScore !== undefined) {
    const filled = Math.round((totalScore / 96) * 10)
    bars.TOTAL_BAR = '█'.repeat(filled) + '░'.repeat(10 - filled)
  }
  return bars
}
