import type { Answer, AssessmentResult, OutcomeBucket, PillarScores } from './types'
import { SCORE_THRESHOLDS } from '@/config/scoring'

function scoreBar(score: number): string {
  const filled = Math.round((score / 16) * 10)
  return '█'.repeat(filled) + '░'.repeat(10 - filled)
}

export function calculateScores(answers: Answer[]): AssessmentResult {
  const pillarScores: PillarScores = { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0 }

  for (const answer of answers) {
    if (answer.pillar === 1) pillarScores.p1 += answer.score
    else if (answer.pillar === 2) pillarScores.p2 += answer.score
    else if (answer.pillar === 3) pillarScores.p3 += answer.score
    else if (answer.pillar === 4) pillarScores.p4 += answer.score
    else if (answer.pillar === 5) pillarScores.p5 += answer.score
    else if (answer.pillar === 6) pillarScores.p6 += answer.score
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
