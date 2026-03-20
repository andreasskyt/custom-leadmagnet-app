import type { OutcomeBucket } from '@/lib/types'

export interface ThresholdEntry {
  min: number
  max: number
  bucket: OutcomeBucket
  label: string
  description: string
}

export const SCORE_THRESHOLDS: ThresholdEntry[] = [
  {
    min: 4,
    max: 6,
    bucket: 'the-bottleneck',
    label: 'The Bottleneck',
    description: 'Everything runs through you. The agency cannot function or grow without your direct involvement in every decision.',
  },
  {
    min: 7,
    max: 10,
    bucket: 'the-firefighter',
    label: 'The Firefighter',
    description: 'You have some systems but spend most of your time reacting to problems instead of building proactively.',
  },
  {
    min: 11,
    max: 13,
    bucket: 'the-builder',
    label: 'The Builder',
    description: 'Solid foundations are in place, but gaps in key areas are capping your growth and creating unnecessary stress.',
  },
  {
    min: 14,
    max: 16,
    bucket: 'the-operator',
    label: 'The Operator',
    description: 'Your agency runs on documented systems. You lead strategically and have real capacity for growth.',
  },
]

export const PILLAR_NAMES: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'Onboarding & Delivery',
  2: 'Visibility & Data',
  3: 'Client Performance Tracking & Reporting',
  4: 'Automation & Systems',
  5: 'B2B Growth',
  6: 'Team & Founder',
}
