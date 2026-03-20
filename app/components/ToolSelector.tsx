'use client'

import { TOOL_OPTIONS } from '@/config/tools'

interface ToolSelectorProps {
  selected: string[]
  onChange: (tools: string[]) => void
}

export default function ToolSelector({ selected, onChange }: ToolSelectorProps) {
  function toggle(tool: string) {
    if (selected.includes(tool)) {
      onChange(selected.filter(t => t !== tool))
    } else {
      onChange([...selected, tool])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-2">
        Tools you currently use <span className="text-white/40">(select all that apply)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {TOOL_OPTIONS.map(tool => {
          const isSelected = selected.includes(tool)
          return (
            <button
              key={tool}
              type="button"
              onClick={() => toggle(tool)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${isSelected
                  ? 'bg-[#bbac8b]/20 border-[#bbac8b] text-[#bbac8b]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              {tool}
            </button>
          )
        })}
      </div>
    </div>
  )
}
