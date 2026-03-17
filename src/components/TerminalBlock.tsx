import { cn } from '@/lib/utils'

interface TerminalBlockProps {
  children: React.ReactNode
  className?: string
  prompt?: string
  dark?: boolean
}

export function TerminalBlock({
  children,
  className,
  prompt = '➜',
  dark = false,
}: TerminalBlockProps) {
  return (
    <div
      className={cn(
        'font-mono text-sm mt-auto pt-5 border-t w-full',
        dark ? 'border-white/20 text-gray-300' : 'border-border text-ink-gray',
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <span className="text-ink-light select-none">{prompt}</span>
          <div className="flex-1 break-all">
            {children}
            <span
              className={cn(
                'inline-block w-[6px] h-[14px] ml-1 align-middle animate-blink',
                dark ? 'bg-white' : 'bg-ink-black',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
