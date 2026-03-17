import { useState } from 'react'
import {
  BentoCard,
  CardMeta,
  CardTitle,
  CardDescription,
} from '@/components/BentoCard'
import { TerminalBlock } from '@/components/TerminalBlock'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'

export default function Index() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[4px] auto-rows-min">
      {/* Manifesto Card (Span-2) */}
      <div
        className="col-span-1 md:col-span-2 animate-fade-in-up-stagger"
        style={{ animationDelay: '0ms' }}
      >
        <BentoCard href="/manifesto">
          <div>
            <CardMeta>MANIFESTO</CardMeta>
            <CardTitle large>COMPUTING AS CRAFT.</CardTitle>
          </div>
          <CardDescription className="max-w-md">
            Exploring the intersection of generative intelligence, low-level
            systems engineering, and the aesthetics of code.
          </CardDescription>
        </BentoCard>
      </div>

      {/* Featured Setup Card (Span-2) */}
      <div
        className="col-span-1 md:col-span-2 min-h-[300px] animate-fade-in-up-stagger"
        style={{ animationDelay: '100ms' }}
      >
        <BentoCard
          href="/setups/minimal-desk"
          imageOverlay
          noHover
          className="p-0"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="https://img.usecurling.com/p/800/600?q=minimalist%20desk%20setup&color=black"
              alt="Minimal Desk Setup"
              className="w-full h-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="relative z-10 p-8 flex flex-col justify-end h-full">
            <h3 className="text-2xl font-light text-white drop-shadow-md">
              The Monolith Workspace
            </h3>
            <p className="text-white/80 text-sm mt-2">
              Productivity through reduction.
            </p>
          </div>
        </BentoCard>
      </div>

      {/* Transformer Latency Card */}
      <div
        className="col-span-1 animate-fade-in-up-stagger"
        style={{ animationDelay: '150ms' }}
      >
        <BentoCard href="/articles/transformer-latency">
          <CardMeta>BENCHMARK</CardMeta>
          <CardTitle>Transformer Latency</CardTitle>
          <TerminalBlock>
            python3 infer.py
            <br />
            <span className="text-green-600">&gt;&gt; 42ms / token</span>
          </TerminalBlock>
        </BentoCard>
      </div>

      {/* Ricing Arch Linux Card (Dark) */}
      <div
        className="col-span-1 animate-fade-in-up-stagger"
        style={{ animationDelay: '200ms' }}
      >
        <BentoCard href="/setups/arch-linux" dark>
          <CardMeta className="text-gray-400">SYSTEM</CardMeta>
          <CardTitle className="text-white">Ricing Arch Linux</CardTitle>
          <TerminalBlock dark>
            sudo pacman -Syu
            <br />
            :: Synchronizing...
          </TerminalBlock>
        </BentoCard>
      </div>

      {/* Repo Activity Card */}
      <div
        className="col-span-1 animate-fade-in-up-stagger"
        style={{ animationDelay: '250ms' }}
      >
        <BentoCard href="/repo">
          <CardMeta>ACTIVITY</CardMeta>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-6xl font-thin tracking-tighter">142+</span>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Commits this week
          </p>
        </BentoCard>
      </div>

      {/* Rust vs C++ Card */}
      <div
        className="col-span-1 animate-fade-in-up-stagger"
        style={{ animationDelay: '300ms' }}
      >
        <BentoCard href="/articles/rust-cpp">
          <CardMeta>OPINION</CardMeta>
          <CardTitle>Rust vs C++</CardTitle>
          <CardDescription className="text-xs mt-2">
            Memory safety without garbage collection. Why we migrated the core
            engine.
          </CardDescription>
        </BentoCard>
      </div>

      {/* Source Code Card (Span-2) */}
      <div
        className="col-span-1 md:col-span-2 animate-fade-in-up-stagger"
        style={{ animationDelay: '350ms' }}
      >
        <BentoCard href="/source" className="p-0 overflow-hidden group">
          <div className="absolute inset-0 bg-card transition-colors duration-300">
            <img
              src="https://img.usecurling.com/p/800/400?q=computer%20code&color=black"
              alt="Source Code"
              className="w-full h-full object-cover opacity-80 grayscale contrast-125 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>
          <div className="relative z-10 p-8 h-full flex flex-col justify-between pointer-events-none">
            <CardMeta className="bg-white/80 backdrop-blur w-fit px-2 py-1">
              SOURCE
            </CardMeta>
          </div>
        </BentoCard>
      </div>

      {/* Philosophy Card (Row-2, Dark) */}
      <div
        className="col-span-1 row-span-2 animate-fade-in-up-stagger"
        style={{ animationDelay: '400ms' }}
      >
        <BentoCard href="/philosophy" dark className="justify-between">
          <div>
            <CardMeta className="text-gray-400">PHILOSOPHY</CardMeta>
            <CardTitle className="text-white mt-4 leading-tight">
              THE GHOST IN THE SHELL
            </CardTitle>
          </div>
          <div className="mt-8 opacity-50">
            {/* Abstract technical SVG diagram */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-auto stroke-white fill-none stroke-[0.5]"
            >
              <circle cx="50" cy="50" r="40" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="50" y1="10" x2="50" y2="90" />
              <circle cx="50" cy="50" r="20" />
              <rect x="35" y="35" width="30" height="30" />
            </svg>
          </div>
        </BentoCard>
      </div>

      {/* Vim Motions Card (Span-2) */}
      <div
        className="col-span-1 md:col-span-2 animate-fade-in-up-stagger"
        style={{ animationDelay: '450ms' }}
      >
        <BentoCard href="/articles/vim-motions">
          <CardMeta>TUTORIAL</CardMeta>
          <CardTitle>Mastering Vim Motions</CardTitle>
          <TerminalBlock>
            " vimrc configuration
            <br />
            nnoremap &lt;C-j&gt; &lt;C-w&gt;j
            <br />
            nnoremap &lt;C-k&gt; &lt;C-w&gt;k
          </TerminalBlock>
        </BentoCard>
      </div>

      {/* Newsletter Card */}
      <div
        className="col-span-1 animate-fade-in-up-stagger"
        style={{ animationDelay: '500ms' }}
      >
        <BentoCard noHover className="justify-end">
          <div className="mb-4">
            <CardMeta>NEWSLETTER</CardMeta>
            <p className="text-sm font-light mt-2">
              Stay updated on system architecture.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="relative mt-auto">
            <div className="flex items-center border-b border-ink-black pb-1">
              <Input
                type="email"
                placeholder="email@example.com"
                className="border-none shadow-none focus-visible:ring-0 px-0 h-auto rounded-none bg-transparent placeholder:text-muted-foreground/50 font-mono text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitted}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="h-6 w-6 hover:bg-transparent"
                disabled={submitted}
              >
                {submitted ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </div>
            {submitted && (
              <p className="text-[10px] text-green-600 mt-1 absolute -bottom-5 left-0">
                Subscribed successfully.
              </p>
            )}
          </form>
        </BentoCard>
      </div>
    </div>
  )
}
