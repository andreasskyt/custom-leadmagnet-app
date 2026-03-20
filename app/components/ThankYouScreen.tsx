'use client'

import { BOOKING_LINK } from '@/config/booking'

interface ThankYouScreenProps {
  name: string
}

export default function ThankYouScreen({ name }: ThankYouScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-[#2B3327] rounded-xl border border-white/10 p-10 w-full max-w-lg text-center">
        {/* Check icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#bbac8b]/10 border border-[#bbac8b]/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#bbac8b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Your report is on its way{name ? `, ${name.split(' ')[0]}` : ''}
        </h2>

        <p className="text-white/60 text-sm mb-8 leading-relaxed">
          Check your inbox — we&apos;ve sent your personalised Agency Operations Audit report with your scores, AI-generated insights, and your #1 quick win.
        </p>

        <div className="bg-white/5 rounded-xl border border-white/10 p-5 mb-8 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#bbac8b]/60 mb-2">
            What&apos;s in your report
          </p>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-[#bbac8b] mt-0.5">→</span>
              Your pillar scores across all 6 operational areas
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#bbac8b] mt-0.5">→</span>
              AI-identified primary and secondary bottlenecks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#bbac8b] mt-0.5">→</span>
              A concrete quick win you can implement in 14 days
            </li>
          </ul>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/50 text-sm mb-4">
            Want to go deeper? Book a free 30-minute Systems Audit call.
          </p>
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary inline-block"
          >
            Book Your Free Strategy Call →
          </a>
          <p className="text-xs text-white/30 mt-3">Free · No obligation · Tailored action plan included</p>
        </div>
      </div>
    </div>
  )
}
