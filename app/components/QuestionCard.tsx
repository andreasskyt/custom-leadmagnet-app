'use client'

import { useState, useEffect } from 'react'
import type { Question } from '@/lib/types'
import AnswerOption from './AnswerOption'

const PILLAR_LABELS: Record<number, string> = {
  1: 'Onboarding & Delivery',
  2: 'Visibility & Data',
  3: 'Client Performance & Reporting',
  4: 'Automation & Systems',
  5: 'B2B Growth',
  6: 'Team & Founder',
}

interface QuestionCardProps {
  question: Question
  onAnswer: (score: number) => void
  onBack?: () => void
  defaultScore?: number
}

export default function QuestionCard({ question, onAnswer, onBack, defaultScore }: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(defaultScore ?? null)

  useEffect(() => {
    setSelected(defaultScore ?? null)
  }, [question.id, defaultScore])

  function handleSelect(score: number) {
    if (selected !== null && selected === score) return  // prevent double-click on same option
    setSelected(score)
    setTimeout(() => onAnswer(score), 200)
  }

  return (
    <div className="bg-[#2B3327] rounded-xl border border-white/10 p-8 w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#bbac8b]/60 mb-3">
          {PILLAR_LABELS[question.pillar]}
        </span>
        <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
          {question.text}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <AnswerOption
            key={option.score}
            label={option.label}
            selected={selected === option.score}
            onClick={() => handleSelect(option.score)}
          />
        ))}
      </div>

      {onBack && (
        <div className="mt-6 pt-5 border-t border-white/10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous question
          </button>
        </div>
      )}
    </div>
  )
}
