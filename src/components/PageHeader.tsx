interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
