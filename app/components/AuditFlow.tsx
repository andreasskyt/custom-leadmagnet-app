'use client'

import { useState, useEffect } from 'react'
import type { Answer, ContactData, SessionData, SubmitPayload } from '@/lib/types'
import { QUESTIONS } from '@/config/questions'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import ContactForm from './ContactForm'
import LoadingScreen from './LoadingScreen'
import ThankYouScreen from './ThankYouScreen'
import AlreadyCompletedScreen from './AlreadyCompletedScreen'

type FlowState = 'init' | 'contact' | 'quiz' | 'loading' | 'thankyou' | 'already-completed'

export default function AuditFlow() {
  const [state, setState] = useState<FlowState>('init')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const existingId = params.get('s')

    if (!existingId) {
      const newId = crypto.randomUUID()
      setSessionId(newId)
      window.history.replaceState(null, '', `?s=${newId}`)
      setState('contact')
      return
    }

    setSessionId(existingId)

    fetch(`/api/session/${existingId}`)
      .then(res => {
        if (!res.ok) return null
        return res.json() as Promise<SessionData>
      })
      .then(session => {
        if (!session) {
          setState('contact')
          return
        }

        if (session.completed_at) {
          setState('already-completed')
          return
        }

        // Restore contact data
        setContactData({
          name: session.name,
          email: session.email,
          businessName: session.business_name,
          tools: session.tools ?? [],
        })

        // Rebuild answers from saved map
        const savedMap: Record<string, number> = session.answers ?? {}
        const restored: Answer[] = []
        for (const q of QUESTIONS) {
          const score = savedMap[String(q.id)]
          if (score !== undefined) {
            restored.push({ questionId: q.id, pillar: q.pillar, score })
          }
        }
        setAnswers(restored)
        setCurrentIndex(restored.length < QUESTIONS.length ? restored.length : QUESTIONS.length - 1)
        setState('quiz')
      })
      .catch(() => setState('contact'))
  }, [])

  function buildAnswersMap(currentAnswers: Answer[]): Record<string, number> {
    const map: Record<string, number> = {}
    for (const a of currentAnswers) {
      map[String(a.questionId)] = a.score
    }
    return map
  }

  function saveAnswers(updatedAnswers: Answer[], id: string) {
    fetch(`/api/session/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'answers', answers: buildAnswersMap(updatedAnswers) }),
    }).catch(err => console.warn('Answer save failed (non-fatal):', err))
  }

  function handleAnswer(score: number) {
    const question = QUESTIONS[currentIndex]
    const newAnswer: Answer = { questionId: question.id, pillar: question.pillar, score }
    const newAnswers = [...answers]
    newAnswers[currentIndex] = newAnswer
    setAnswers(newAnswers)
    saveAnswers(newAnswers.filter(Boolean), sessionId)

    if (currentIndex + 1 >= QUESTIONS.length) {
      handleSubmit(newAnswers.filter(Boolean))
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  function handleBack() {
    setCurrentIndex(prev => prev - 1)
  }

  async function handleContactSubmit(data: ContactData) {
    setContactData(data)
    setError(null)

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: sessionId,
          name: data.name,
          email: data.email,
          business_name: data.businessName,
          tools: data.tools,
        }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? `Server error ${res.status}`)
      }

      setState('quiz')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  async function handleSubmit(finalAnswers: Answer[]) {
    if (!contactData) return
    setState('loading')

    const payload: SubmitPayload = {
      answers: finalAnswers,
      contactData,
      sessionId,
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? `Server error ${res.status}`)
      }

      setState('thankyou')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setState('quiz')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-12 pb-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#bbac8b]/70 mb-2">
          SKYT Systems
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Agency Operations Audit
        </h1>
      </div>

      {state === 'init' && null}

      {state === 'contact' && (
        <div className="w-full max-w-2xl">
          <ContactForm
            onSubmit={handleContactSubmit}
            isLoading={false}
            error={error}
          />
        </div>
      )}

      {state === 'quiz' && (
        <div className="w-full max-w-2xl">
          <ProgressBar current={currentIndex} total={QUESTIONS.length} />
          <QuestionCard
            key={QUESTIONS[currentIndex].id}
            question={QUESTIONS[currentIndex]}
            onAnswer={handleAnswer}
            onBack={currentIndex > 0 ? handleBack : undefined}
            defaultScore={answers[currentIndex]?.score}
          />
          {error && (
            <p className="mt-4 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}
        </div>
      )}

      {state === 'loading' && <LoadingScreen />}

      {state === 'thankyou' && (
        <ThankYouScreen name={contactData?.name ?? ''} />
      )}

      {state === 'already-completed' && <AlreadyCompletedScreen />}
    </main>
  )
}
