import React from "react";
import Link from "next/link";
import { Scale, Shield } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-paper-border bg-paper-surface py-16 text-sm text-ink-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-paper-border/60">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-vermilion-primary flex items-center justify-center text-paper-surface">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-serif font-semibold text-ink-primary tracking-tight">
                NYAYSAHAYAK 2.0
              </span>
            </div>
            <p className="text-xs text-ink-tertiary leading-normal font-sans">
              Verified legal intelligence and courtroom sparring platform for the Indian legal ecosystem.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800">
              <Shield className="w-3.5 h-3.5" />
              <span>DPDP ACT 2023 • ZERO RETENTION</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-primary font-bold">
              Product Capabilities
            </p>
            <ul className="space-y-2 text-xs font-sans">
              <li><Link href="/app" className="hover:text-vermilion-primary">Master Case Docket</Link></li>
              <li><Link href="/app" className="hover:text-vermilion-primary">Paper Book OCR & Ingestion</Link></li>
              <li><Link href="/app" className="hover:text-vermilion-primary">6-Check Citation Protocol</Link></li>
              <li><Link href="/app" className="hover:text-vermilion-primary">LangGraph Courtroom Arena</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-primary font-bold">
              Engineering Specs
            </p>
            <ul className="space-y-2 text-xs font-mono text-ink-secondary">
              <li><a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-vermilion-primary">FastAPI Swagger UI</a></li>
              <li><span className="text-ink-tertiary">PostgreSQL 16 + pgvector</span></li>
              <li><span className="text-ink-tertiary">Celery + Redis Distributed Tasks</span></li>
              <li><span className="text-ink-tertiary">Next.js 15 App Router</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-primary font-bold">
              Legal & Ethical Disclaimers
            </p>
            <p className="text-[11px] text-ink-tertiary leading-relaxed font-sans">
              NyaySahayak 2.0 is an analytical co-counsel designed exclusively for qualified advocates.
              It does not solicit briefs, advertise legal services (Bar Council of India Rules, Part VI, Chapter II),
              nor does it provide legal advice directly to litigants.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-ink-tertiary gap-4">
          <span>&copy; {new Date().getFullYear()} NYAYSAHAYAK 2.0 • ALL SPECIFICATIONS APPROVED</span>
          <span>INDIAN DATA RESIDENCY (AP-SOUTH-1) • ENCRYPTED AT REST (AES-256)</span>
        </div>
      </div>
    </footer>
  );
}
