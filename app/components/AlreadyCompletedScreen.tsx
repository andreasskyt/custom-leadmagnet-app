'use client'

export default function AlreadyCompletedScreen() {
  return (
    <div className="w-full max-w-2xl text-center">
      <div className="bg-[#2B3327] rounded-xl border border-white/10 p-12">
        <div className="text-4xl mb-6">✉️</div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Your report is already on its way
        </h2>
        <p className="text-white/50 text-sm leading-relaxed">
          You&apos;ve already completed this audit. Check your inbox for your personalised Agency Operations Report — it was sent when you finished.
        </p>
      </div>
    </div>
  )
}
