import React from 'react'

interface PageHeaderProps {
  title: string
  description: string
  imageQuery: string
}

export function PageHeader({
  title,
  description,
  imageQuery,
}: PageHeaderProps) {
  return (
    <section className="relative h-[400px] flex items-center justify-center bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
      <img
        src={`https://img.usecurling.com/p/1600/600?q=${encodeURIComponent(imageQuery)}&color=blue`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
      />
      <div className="relative z-20 text-center px-4 mt-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto drop-shadow-md font-medium">
          {description}
        </p>
      </div>
    </section>
  )
}
