"use client"

import React from "react"

import { ShoppingBag, ArrowRight, Sparkles, Heart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

function CartIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-muted md:h-52 md:w-52">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40 md:h-20 md:w-20" strokeWidth={1} />
        <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-primary-foreground md:h-12 md:w-12">
          <span className="text-lg font-semibold md:text-xl">0</span>
        </div>
      </div>
    </div>
  )
}

function SuggestionCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground group-hover:bg-background">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  )
}

export function EmptyCart() {
  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-lg flex-col items-center justify-center px-4 py-16">
      {/* Illustration */}
      <CartIllustration />

      {/* Copy */}
      <div className="mt-8 text-center">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Your cart is empty
        </h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
          Looks like you haven't added anything yet. Browse our collection and
          find something you love.
        </p>
      </div>

      {/* Primary CTA */}
      <Button size="lg" className="mt-8 gap-2 px-8" asChild>
        <Link href="/products">
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>

      <Separator className="my-10 w-full" />

      {/* Suggestion Cards */}
      <div className="flex w-full flex-col gap-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Explore
        </p>
        <SuggestionCard
          icon={<Sparkles className="h-5 w-5" />}
          title="New Arrivals"
          description="Check out the latest additions to our store."
          href="/"
        />
        <SuggestionCard
          icon={<Heart className="h-5 w-5" />}
          title="Bestsellers"
          description="See what other customers are loving right now."
          href="/"
        />
        <SuggestionCard
          icon={<Clock className="h-5 w-5" />}
          title="Recently Viewed"
          description="Pick up where you left off."
          href="/"
        />
      </div>
    </div>
  )
}
