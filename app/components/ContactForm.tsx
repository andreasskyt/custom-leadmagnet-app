'use client'

import { useState } from 'react'
import type { ContactData } from '@/lib/types'
import ToolSelector from './ToolSelector'

interface ContactFormProps {
  onSubmit: (data: ContactData) => void
  isLoading: boolean
  error: string | null
}

export default function ContactForm({ onSubmit, isLoading, error }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [tools, setTools] = useState<string[]>([])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !businessName.trim()) return
    onSubmit({ name: name.trim(), email: email.trim(), businessName: businessName.trim(), tools })
  }

  const inputClass = `
    w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
    text-white placeholder-white/30 text-sm
    focus:outline-none focus:border-[#bbac8b]/50 focus:bg-white/8
    transition-colors duration-200
  `

  return (
    <div className="bg-[#2B3327] rounded-xl border border-white/10 p-8 w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#bbac8b]/60 mb-3">
          Let&apos;s get started
        </span>
        <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
          Tell us about your agency before we begin
        </h2>
        <p className="text-white/50 text-sm mt-2">
          Your personalised audit report will be ready in minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Your name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Jane Smith"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Work email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="jane@youragency.com"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Agency name</label>
          <input
            type="text"
            value={businessName}
            onChange={e => setBusinessName(e.target.value)}
            placeholder="Acme Agency"
            required
            className={inputClass}
          />
        </div>

        <ToolSelector selected={tools} onChange={setTools} />

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading || !name.trim() || !email.trim() || !businessName.trim()}
          className="button-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Starting…' : 'Start the Audit →'}
        </button>

        <p className="text-center text-xs text-white/30">
          No spam. Your report is generated instantly. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
