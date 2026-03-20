'use client'

const STEPS = [
  'Scoring your audit results…',
  'Analysing your operational pillars…',
  'Building the custom Notion report…',
  'Sending your results…',
]

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-[#2B3327] rounded-xl border border-white/10 p-10 w-full max-w-md text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-2 border-t-[#bbac8b] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-2">
          Building your report
        </h2>
        <p className="text-white/50 text-sm mb-8">
          This usually takes 15–30 seconds
        </p>

        <div className="flex flex-col gap-2 text-left">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/40">
              <div className="w-1.5 h-1.5 rounded-full bg-[#bbac8b]/40 shrink-0"></div>
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
