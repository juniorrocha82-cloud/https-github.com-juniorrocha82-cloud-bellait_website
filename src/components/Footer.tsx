import { Link } from 'react-router-dom'

const FooterSection = ({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-meta font-bold text-ink-light">{title}</h4>
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.href}
            className="text-sm text-ink-gray hover:text-ink-black transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-1">
      <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <FooterSection
            title="SITEMAP"
            links={[
              { label: 'Home', href: '/' },
              { label: 'Articles', href: '/articles' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ]}
          />
          <FooterSection
            title="TOPICS"
            links={[
              { label: 'System Architecture', href: '/topic/system' },
              { label: 'Linux Customization', href: '/topic/linux' },
              { label: 'Machine Learning', href: '/topic/ml' },
              { label: 'Ethics', href: '/topic/ethics' },
            ]}
          />
          <FooterSection
            title="SOCIAL"
            links={[
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'Twitter / X', href: 'https://twitter.com' },
              { label: 'Discord', href: 'https://discord.com' },
            ]}
          />
          <div className="flex flex-col gap-4">
            <h4 className="text-meta font-bold text-ink-light">LEGAL</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-ink-gray hover:text-ink-black transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-ink-gray hover:text-ink-black transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
            <div className="mt-auto pt-4 text-xs text-ink-light font-mono">
              © 2023 KERNEL PANIC
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
