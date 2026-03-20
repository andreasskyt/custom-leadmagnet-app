'use client'

interface AnswerOptionProps {
  label: string
  selected: boolean
  onClick: () => void
}

export default function AnswerOption({ label, selected, onClick }: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
        ${selected
          ? 'bg-[#bbac8b]/20 border-[#bbac8b] text-[#bbac8b]'
          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      <span className="text-sm md:text-base font-medium leading-snug">{label}</span>
    </button>
  )
}
