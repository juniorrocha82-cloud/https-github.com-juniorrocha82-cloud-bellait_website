import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-bold text-lg tracking-tight">KERNEL_PANIC</span>
          <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors">
            ARCHITECTURE & SYSTEMS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {['Articles', 'Setups', 'Repo'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-sm font-medium px-4 py-1.5 rounded-full border border-transparent hover:border-border transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </nav>

        <Button
          variant="default"
          className="rounded-full bg-ink-black text-white hover:scale-105 transition-transform duration-300"
        >
          Subscribe
        </Button>
      </div>
    </header>
  )
}
