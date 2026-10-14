"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileCheck2, Scale, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ForensicCanvas } from "@/components/three/forensic-canvas";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export function Hero() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <section className="relative pt-12 pb-20 border-b border-paper-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="vermilion">EDITORIAL FORENSIC SYSTEM</Badge>
              <Badge variant="neutral">INDIAN APPELLATE JURISPRUDENCE</Badge>
              <span className="font-mono text-xs text-ink-tertiary">BNS & BSA 2023 COMPLIANT</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink-primary leading-[1.12]">
              Forensic Case Intelligence & Courtroom Preparation.
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed font-sans max-w-2xl">
              Engineered explicitly for Indian Senior Advocates and Chambers. Deconstruct multi-volume
              paper books, track 100% page provenance, audit citations against official court
              registries, and spar against adversarial judicial agents.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link href="/app">
                <Button size="lg" className="gap-2">
                  <span>Enter Chambers Docket</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                className="gap-2 font-mono text-xs"
              >
                <FileCheck2 className="w-4 h-4 text-vermilion-primary" />
                <span>Audit Citation Protocol</span>
              </Button>
            </div>

            <div className="pt-6 border-t border-paper-border/60 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-serif text-2xl font-bold text-ink-primary">100%</p>
                <p className="font-mono text-[11px] text-ink-secondary">Page Provenance</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-ink-primary">6-Stage</p>
                <p className="font-mono text-[11px] text-ink-secondary">Citation Audit</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-ink-primary">3-Agent</p>
                <p className="font-mono text-[11px] text-ink-secondary">Adversarial Bench</p>
              </div>
            </div>
          </div>

          {/* Subordinate 3D Forensic Canvas */}
          <div className="lg:col-span-5 w-full">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="font-mono text-[11px] text-ink-secondary flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-vermilion-primary" />
                <span>MASTER CASE TOPOLOGY</span>
              </span>
              <span className="font-mono text-[10px] text-ink-tertiary">FIGURE 1.0</span>
            </div>

            <ForensicCanvas />
          </div>
        </div>
      </div>

      {/* Demonstration Citation Modal */}
      <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-vermilion-primary" />
              <DialogTitle>The 6-Check Citation Verification Protocol</DialogTitle>
            </div>
            <DialogDescription>
              DEMONSTRATION SAMPLE: How NyaySahayak audits citations before oral argument.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2 text-sm font-sans">
            <div className="p-3 bg-paper-elevated rounded border border-paper-border">
              <span className="font-mono text-xs text-ink-tertiary">AUDITED CITATION:</span>
              <p className="font-serif font-semibold text-ink-primary mt-1">
                Vidya Drolia and Others v. Durga Trading Corporation, (2021) 2 SCC 1
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-paper-surface border border-paper-border">
                <span>1. Existence Check (SCR / SCC Reporter)</span>
                <span className="text-emerald-700 font-bold">PASSED</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-paper-surface border border-paper-border">
                <span>2. Identity Check (Parties & Bench Strength)</span>
                <span className="text-emerald-700 font-bold">3-JUDGE BENCH</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-paper-surface border border-paper-border">
                <span>3. Official Whitelist Check (Supreme Court)</span>
                <span className="text-emerald-700 font-bold">VERIFIED</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-paper-surface border border-paper-border">
                <span>4. Quotation Veracity Check (Paragraph 79)</span>
                <span className="text-emerald-700 font-bold">100% MATCH</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-paper-surface border border-paper-border">
                <span>5. Proposition Grounding Check</span>
                <span className="text-amber-700 font-bold">PARTIAL (DISTINGUISHED)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-paper-surface border border-paper-border">
                <span>6. Precedent Trace (Affirmed In Re Interplay 2023)</span>
                <span className="text-emerald-700 font-bold">GOOD LAW</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDemoModalOpen(false)}>
              Close Demonstration
            </Button>
            <Link href="/app/cases/demo-case/verification">
              <Button size="sm">
                Open Full Verification Lab
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
