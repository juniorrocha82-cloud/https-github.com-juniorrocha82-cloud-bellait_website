import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  href?: string
  dark?: boolean
  noHover?: boolean
  imageOverlay?: boolean
  style?: React.CSSProperties
}

export function BentoCard({
  children,
  className,
  href = '#',
  dark = false,
  noHover = false,
  imageOverlay = false,
  style,
}: BentoCardProps) {
  const content = (
    <div
      style={style}
      className={cn(
        'relative group overflow-hidden p-8 flex flex-col justify-between h-full w-full transition-all duration-400 ease-out-expo rounded-none',
        dark
          ? 'bg-ink-black text-white border-none'
          : 'bg-card hover:bg-card-hover text-card-foreground',
        imageOverlay ? 'bg-black text-white' : '',
        !noHover && !dark && !imageOverlay ? 'hover:shadow-sm' : '',
        className,
      )}
    >
      {/* Background layer for image cards to handle scaling */}
      {imageOverlay && (
        <div className="absolute inset-0 z-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      )}

      {/* Content wrapper */}
      <div
        className={cn(
          'relative z-10 flex flex-col h-full w-full',
          imageOverlay && 'justify-between',
        )}
      >
        {children}
      </div>

      {/* Hover Arrow */}
      {!noHover && (
        <div className="absolute top-8 right-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight
            className={cn(
              'w-5 h-5',
              dark || imageOverlay ? 'text-white' : 'text-ink-black',
            )}
          />
        </div>
      )}
    </div>
  )

  if (href && !href.startsWith('http')) {
    return (
      <Link to={href} className={cn('block h-full w-full', className)}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('block h-full w-full', className)}
      >
        {content}
      </a>
    )
  }

  return <div className={cn('h-full w-full', className)}>{content}</div>
}

export function CardMeta({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('text-meta mb-4 block', className)}>{children}</span>
  )
}

export function CardTitle({
  children,
  className,
  large = false,
}: {
  children: React.ReactNode
  className?: string
  large?: boolean
}) {
  return (
    <h3
      className={cn(
        large ? 'text-headline-large' : 'text-headline-standard',
        'mb-4',
        className,
      )}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-sm md:text-base text-muted-foreground font-light leading-relaxed',
        className,
      )}
    >
      {children}
    </p>
  )
}
