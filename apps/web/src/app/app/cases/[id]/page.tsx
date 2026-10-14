"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  Network,
  ShieldCheck,
  Swords,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CaseOverviewPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "demo-case";

  return (
    <div className="space-y-8">
      {/* Case Dossier Title & Metadata Bar */}
      <div className="border-b border-paper-border pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="statute">SLP (C) 4589/2024</Badge>
          <Badge variant="verified">6/6 CITATIONS VERIFIED</Badge>
          <Badge variant="contested">1 EVIDENTIARY CONTRADICTION</Badge>
          <span className="font-mono text-xs text-ink-tertiary">CNR: SCIN010045892024</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary leading-tight">
          M/s Apex Infrastructure Ltd. v. State of Maharashtra &amp; Anr.
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-ink-secondary">
          <span>COURT: Supreme Court of India</span>
          <span>BENCH: Court No. 3 (Division Bench)</span>
          <span>LEAD COUNSEL: V. K. Sharma, Senior Advocate</span>
          <span>STAGE: Oral Arguments (Maintainability)</span>
        </div>
      </div>

      {/* Sub-Navigation Quick Links */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-paper-border/60 text-xs font-mono">
        <Link href={`/app/cases/${caseId}`} className="text-vermilion-primary font-bold border-b-2 border-vermilion-primary pb-1">
          Dossier Overview
        </Link>
        <Link href={`/app/cases/${caseId}/documents`} className="text-ink-secondary hover:text-ink-primary pb-1">
          Paper Books (480 pgs)
        </Link>
        <Link href={`/app/cases/${caseId}/graph`} className="text-ink-secondary hover:text-ink-primary pb-1">
          Master Case Graph v1.0
        </Link>
        <Link href={`/app/cases/${caseId}/verification`} className="text-ink-secondary hover:text-ink-primary pb-1">
          6-Check Verification Lab
        </Link>
        <Link href={`/app/cases/${caseId}/courtroom`} className="text-ink-secondary hover:text-ink-primary pb-1">
          Courtroom Sparring Arena
        </Link>
      </div>

      {/* Forensic Intelligence Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded bg-paper-surface border border-paper-border shadow-subtle">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase">PAPER BOOK VOLUMES</span>
          <p className="font-serif text-2xl font-bold text-ink-primary mt-1">480 Pages</p>
          <p className="text-xs text-ink-secondary mt-0.5">Vol. 1 indexed with bounding boxes</p>
        </div>

        <div className="p-4 rounded bg-paper-surface border border-paper-border shadow-subtle">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase">FACT MATRIX</span>
          <p className="font-serif text-2xl font-bold text-ink-primary mt-1">18 Admitted / 3 Disputed</p>
          <p className="text-xs text-ink-secondary mt-0.5">1 postal contradiction flagged</p>
        </div>

        <div className="p-4 rounded bg-paper-surface border border-paper-border shadow-subtle">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase">CITATION VERIFICATION</span>
          <p className="font-serif text-2xl font-bold text-emerald-800 mt-1">4/6 Audited Good Law</p>
          <p className="text-xs text-ink-secondary mt-0.5">Vidya Drolia affirmed (2023)</p>
        </div>

        <div className="p-4 rounded bg-paper-surface border border-paper-border shadow-subtle">
          <span className="font-mono text-[10px] text-ink-tertiary uppercase">COURTROOM SPARRING</span>
          <p className="font-serif text-2xl font-bold text-vermilion-primary mt-1">Ready to Spar</p>
          <p className="text-xs text-ink-secondary mt-0.5">Opposing Counsel primed on Art. 226</p>
        </div>
      </div>

      {/* Forensic Modules Entry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Paper Book Provenance */}
        <Card className="shadow-subtle hover:shadow-folio transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-ink-tertiary">MODULE 01 • PROVENANCE</span>
              <FileText className="w-4 h-4 text-ink-secondary" />
            </div>
            <CardTitle className="mt-1">Paper Book OCR &amp; Bounding Box Inspector</CardTitle>
            <CardDescription>
              Inspect original PDF pages alongside extracted text chunks with bounding-box highlights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-paper-elevated rounded border border-paper-border text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span>VOL. 1: SLP_Paper_Book.pdf</span>
                <span className="text-emerald-700 font-bold">100% PROVENANCE</span>
              </div>
              <p className="text-ink-secondary">480 pages • English &amp; Devanagari OCR • 12 Exhibits</p>
            </div>
            <Link href={`/app/cases/${caseId}/documents`} className="block">
              <Button variant="outline" size="sm" className="w-full gap-2 text-xs font-mono">
                <span>Launch Document Inspector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Module 2: The 6-Check Citation Protocol */}
        <Card className="shadow-subtle hover:shadow-folio transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-ink-tertiary">MODULE 02 • AUDIT</span>
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <CardTitle className="mt-1">The 6-Check Citation Verification Lab</CardTitle>
            <CardDescription>
              Run algorithmic verification against official Supreme Court and High Court gazette records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-paper-elevated rounded border border-paper-border text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span>AUDITED RATIO: Vidya Drolia (2021)</span>
                <Badge variant="verified">GOOD LAW</Badge>
              </div>
              <p className="text-ink-secondary">6-Check sequence executed • Lawyer review sign-off pending</p>
            </div>
            <Link href={`/app/cases/${caseId}/verification`} className="block">
              <Button variant="outline" size="sm" className="w-full gap-2 text-xs font-mono">
                <span>Open Citation Testing Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Module 3: Master Case Graph & Timeline */}
        <Card className="shadow-subtle hover:shadow-folio transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-ink-tertiary">MODULE 03 • SYNTHESIS</span>
              <Network className="w-4 h-4 text-ink-secondary" />
            </div>
            <CardTitle className="mt-1">Master Case Graph &amp; Timeline Engine</CardTitle>
            <CardDescription>
              Explore cross-linked parties, admitted facts, disputed milestones, and legal issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-vermilion-wash rounded border border-vermilion-border text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-vermilion-primary font-bold">1 TIMELINE CONTRADICTION</span>
                <AlertTriangle className="w-3.5 h-3.5 text-vermilion-primary" />
              </div>
              <p className="text-ink-secondary">Annexure R-2 tracking postal receipt conflicts with termination order.</p>
            </div>
            <Link href={`/app/cases/${caseId}/graph`} className="block">
              <Button variant="outline" size="sm" className="w-full gap-2 text-xs font-mono">
                <span>Inspect Master Case Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Module 4: Courtroom Arena */}
        <Card className="shadow-subtle hover:shadow-folio transition-shadow border-vermilion-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-vermilion-primary font-bold">MODULE 04 • SPARRING</span>
              <Swords className="w-4 h-4 text-vermilion-primary" />
            </div>
            <CardTitle className="mt-1">LangGraph Courtroom Arena</CardTitle>
            <CardDescription>
              Oral sparring against an adversarial Opposing Counsel and an Inquisitorial Bench Judge.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-paper-elevated rounded border border-paper-border text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span>ACTIVE ISSUE: Maintainability under Art. 226</span>
                <span className="text-amber-700 font-bold">HIGH SCRUTINY</span>
              </div>
              <p className="text-ink-secondary">3 agents compiled • Senior Strategist Coach active</p>
            </div>
            <Link href={`/app/cases/${caseId}/courtroom`} className="block">
              <Button size="sm" className="w-full gap-2 text-xs font-mono">
                <span>Enter Courtroom Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
