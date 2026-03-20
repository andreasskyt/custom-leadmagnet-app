'use client'

interface ProgressBarProps {
  current: number  // 0-based index
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  // Start at 5% minimum so bar is never invisible on Q1
  const percent = Math.max(5, Math.round(((current + 1) / total) * 100))

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-white/50 uppercase tracking-widest">
          Question {current + 1} of {total}
        </span>
        <span className="text-xs text-[#bbac8b]/70">{percent}%</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#bbac8b] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
