import React from "react";
import Link from "next/link";
import { Scale, ArrowRight } from "lucide-react";
import { Hero } from "@/components/landing/hero";
import { Pillars } from "@/components/landing/pillars";
import { LandingFooter } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper-canvas text-ink-primary flex flex-col justify-between selection:bg-vermilion-wash selection:text-vermilion-primary">
      {/* Editorial Navigation Bar */}
      <header className="border-b border-paper-border bg-paper-surface/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-vermilion-primary flex items-center justify-center text-paper-surface shadow-subtle">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-semibold text-lg tracking-tight text-ink-primary">
                NYAYSAHAYAK
              </span>
              <span className="ml-2 font-mono text-[10px] px-1.5 py-0.5 rounded bg-paper-elevated border border-paper-border text-ink-secondary">
                2.0
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-ink-secondary hover:text-ink-primary hidden sm:inline-block"
            >
              API CONTRACTS
            </a>

            <div className="h-4 w-px bg-paper-border hidden sm:block" />

            <Link href="/app">
              <Button size="sm" className="gap-1.5 font-sans text-xs">
                <span>Enter Docket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Landing Page Content */}
      <main className="flex-1">
        <Hero />
        <Pillars />
      </main>

      {/* Editorial Footer */}
      <LandingFooter />
    </div>
  );
}
