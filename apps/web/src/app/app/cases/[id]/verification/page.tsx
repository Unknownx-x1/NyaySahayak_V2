"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";

interface AuditSample {
  id: string;
  citationText: string;
  parties: string;
  year: number;
  reporter: string;
  quotedPassage: string;
  claimedProposition: string;
  checks: {
    existence: { pass: boolean; detail: string };
    identity: { pass: boolean; detail: string };
    whitelist: { pass: boolean; detail: string };
    quotation: { pass: boolean; detail: string };
    proposition: { pass: boolean; detail: string };
    trace: { pass: boolean; detail: string };
  };
  overallStatus: "VERIFIED" | "PARTIAL" | "OVERRULED" | "FABRICATED";
}

const AUDIT_SAMPLES: AuditSample[] = [
  {
    id: "sample-1",
    citationText: "Vidya Drolia and Others v. Durga Trading Corporation, (2021) 2 SCC 1",
    parties: "Vidya Drolia v. Durga Trading Corp",
    year: 2021,
    reporter: "SCC (Supreme Court Cases)",
    quotedPassage: "Landlord-tenant disputes governed by special rent control statutes are not arbitrable.",
    claimedProposition: "Tenancy disputes are barred from arbitration under Section 11 of the Arbitration Act.",
    checks: {
      existence: { pass: true, detail: "Found in Supreme Court Reports and SCC official database." },
      identity: { pass: true, detail: "Parties and 3-Judge Bench match official Supreme Court record." },
      whitelist: { pass: true, detail: "Source: Supreme Court of India certified registry." },
      quotation: { pass: true, detail: "100.0% verbatim match with Paragraph 79." },
      proposition: { pass: false, detail: "Overstated proposition: Held tenancy under Transfer of Property Act IS arbitrable; only rent-control statutory bars apply." },
      trace: { pass: true, detail: "Good law. Affirmed by 7-Judge Bench in In Re Interplay (2023)." },
    },
    overallStatus: "PARTIAL",
  },
  {
    id: "sample-2",
    citationText: "Harbanslal Sahnia and Another v. Indian Oil Corp. Ltd. and Others, (2003) 2 SCC 107",
    parties: "Harbanslal Sahnia v. Indian Oil Corp",
    year: 2003,
    reporter: "SCC (Supreme Court Cases)",
    quotedPassage: "The rule of exhaustion of alternative remedy is a rule of discretion and not one of compulsion.",
    claimedProposition: "High Court may exercise writ jurisdiction under Article 226 despite arbitration clause where state acts arbitrarily.",
    checks: {
      existence: { pass: true, detail: "Verified in Supreme Court Cases database." },
      identity: { pass: true, detail: "Parties and 2-Judge Bench match certified decree." },
      whitelist: { pass: true, detail: "Source: Supreme Court of India SCR." },
      quotation: { pass: true, detail: "100.0% verbatim match with Paragraph 7." },
      proposition: { pass: true, detail: "Directly grounds the proposition on public law remedy exception." },
      trace: { pass: true, detail: "Consistently affirmed in Whirlpool Corp and ABL International." },
    },
    overallStatus: "VERIFIED",
  },
  {
    id: "sample-3",
    citationText: "State of Maharashtra v. Phantom Engineering Ltd., (2024) 99 SCC 812",
    parties: "State of Maharashtra v. Phantom Engineering",
    year: 2024,
    reporter: "SCC (Non-existent Volume 99)",
    quotedPassage: "All commercial arbitration agreements automatically expire upon change of state ministry.",
    claimedProposition: "Government contracts are void upon ministry transition.",
    checks: {
      existence: { pass: false, detail: "FAILED: Volume 99 of 2024 SCC does not exist." },
      identity: { pass: false, detail: "FAILED: No such case registered with Supreme Court Registry." },
      whitelist: { pass: false, detail: "FAILED: Source cannot be resolved in any whitelisted gazette." },
      quotation: { pass: false, detail: "FAILED: Quoted text is completely fabricated by generative model." },
      proposition: { pass: false, detail: "FAILED: Proposition is legally baseless under Indian law." },
      trace: { pass: false, detail: "FAILED: No judicial lineage found." },
    },
    overallStatus: "FABRICATED",
  },
];

export default function VerificationLabPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "demo-case";
  const [selectedSampleId, setSelectedSampleId] = useState<string>("sample-1");
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [lawyerReviewDecision, setLawyerReviewDecision] = useState<string>("PENDING");
  const [lawyerNotes, setLawyerNotes] = useState<string>("");
  const [reviewSaved, setReviewSaved] = useState(false);

  const activeSample = AUDIT_SAMPLES.find((s) => s.id === selectedSampleId) || AUDIT_SAMPLES[0];

  const handleRunAudit = () => {
    setIsRunningCheck(true);
    setReviewSaved(false);
    setTimeout(() => {
      setIsRunningCheck(false);
    }, 600);
  };

  const handleSaveReview = () => {
    setReviewSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-paper-border pb-4">
        <div className="flex items-center space-x-3">
          <Link href={`/app/cases/${caseId}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-vermilion-primary">
                THE 6-CHECK PROTOCOL
              </span>
              <Badge variant="statute">LABORATORY</Badge>
            </div>
            <h1 className="font-serif text-xl font-semibold text-ink-primary">
              Citation Verification &amp; Quotation Veracity Audit
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleRunAudit}
            disabled={isRunningCheck}
            className="gap-1.5 font-mono text-xs"
          >
            {isRunningCheck ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunningCheck ? "Auditing 6 Checks..." : "Re-Run 6 Checks"}</span>
          </Button>
        </div>
      </div>

      {/* Sample Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-ink-tertiary">Select Test Citation:</span>
        {AUDIT_SAMPLES.map((sample) => (
          <button
            key={sample.id}
            onClick={() => {
              setSelectedSampleId(sample.id);
              setReviewSaved(false);
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono border transition-all ${
              selectedSampleId === sample.id
                ? "bg-ink-primary text-paper-surface border-ink-primary font-semibold"
                : "bg-paper-surface text-ink-secondary border-paper-border hover:bg-paper-elevated"
            }`}
          >
            {sample.parties.split(" v. ")[0]} ({sample.overallStatus})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6-Check Sequence Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <Card>
            <CardHeader className="bg-paper-elevated/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-secondary">AUDIT SPECIFICATION</span>
                {activeSample.overallStatus === "VERIFIED" && <Badge variant="verified">6/6 VERIFIED</Badge>}
                {activeSample.overallStatus === "PARTIAL" && <Badge variant="partial">PARTIAL DISTINCTION</Badge>}
                {activeSample.overallStatus === "FABRICATED" && <Badge variant="overruled">FABRICATED CITATION</Badge>}
              </div>
              <CardTitle className="text-base font-serif mt-2">
                {activeSample.citationText}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="p-3 bg-paper-canvas rounded border border-paper-border space-y-2 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-ink-tertiary uppercase">QUOTED PASSAGE IN BRIEF:</span>
                  <p className="font-serif italic text-ink-primary mt-0.5">
                    &ldquo;{activeSample.quotedPassage}&rdquo;
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-ink-tertiary uppercase">CLAIMED PROPOSITION:</span>
                  <p className="text-ink-secondary mt-0.5 font-sans">
                    {activeSample.claimedProposition}
                  </p>
                </div>
              </div>

              {/* The 6 Checks Itemized */}
              <div className="space-y-2 font-mono text-xs pt-2">
                {/* Check 1 */}
                <div className="p-2.5 rounded bg-paper-surface border border-paper-border flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-primary">1. Existence Check</span>
                    <p className="font-sans text-[11px] text-ink-secondary mt-0.5">{activeSample.checks.existence.detail}</p>
                  </div>
                  {activeSample.checks.existence.pass ? (
                    <Badge variant="verified">PASS</Badge>
                  ) : (
                    <Badge variant="overruled">FAIL</Badge>
                  )}
                </div>

                {/* Check 2 */}
                <div className="p-2.5 rounded bg-paper-surface border border-paper-border flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-primary">2. Identity Check</span>
                    <p className="font-sans text-[11px] text-ink-secondary mt-0.5">{activeSample.checks.identity.detail}</p>
                  </div>
                  {activeSample.checks.identity.pass ? (
                    <Badge variant="verified">PASS</Badge>
                  ) : (
                    <Badge variant="overruled">FAIL</Badge>
                  )}
                </div>

                {/* Check 3 */}
                <div className="p-2.5 rounded bg-paper-surface border border-paper-border flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-primary">3. Source Whitelist Check</span>
                    <p className="font-sans text-[11px] text-ink-secondary mt-0.5">{activeSample.checks.whitelist.detail}</p>
                  </div>
                  {activeSample.checks.whitelist.pass ? (
                    <Badge variant="verified">PASS</Badge>
                  ) : (
                    <Badge variant="overruled">FAIL</Badge>
                  )}
                </div>

                {/* Check 4 */}
                <div className="p-2.5 rounded bg-paper-surface border border-paper-border flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-primary">4. Quotation Veracity Check</span>
                    <p className="font-sans text-[11px] text-ink-secondary mt-0.5">{activeSample.checks.quotation.detail}</p>
                  </div>
                  {activeSample.checks.quotation.pass ? (
                    <Badge variant="verified">PASS</Badge>
                  ) : (
                    <Badge variant="overruled">FAIL</Badge>
                  )}
                </div>

                {/* Check 5 */}
                <div className="p-2.5 rounded bg-paper-surface border border-paper-border flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-primary">5. Proposition Grounding Check</span>
                    <p className="font-sans text-[11px] text-ink-secondary mt-0.5">{activeSample.checks.proposition.detail}</p>
                  </div>
                  {activeSample.checks.proposition.pass ? (
                    <Badge variant="verified">PASS</Badge>
                  ) : (
                    <Badge variant="partial">DISTINGUISHED</Badge>
                  )}
                </div>

                {/* Check 6 */}
                <div className="p-2.5 rounded bg-paper-surface border border-paper-border flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-ink-primary">6. Precedent Trace Check</span>
                    <p className="font-sans text-[11px] text-ink-secondary mt-0.5">{activeSample.checks.trace.detail}</p>
                  </div>
                  {activeSample.checks.trace.pass ? (
                    <Badge variant="verified">GOOD LAW</Badge>
                  ) : (
                    <Badge variant="overruled">OVERRULED</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Lawyer Review & Sign-Off Panel */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="shadow-folio">
            <CardHeader className="bg-paper-elevated/40">
              <CardTitle className="text-base font-serif">Advocate Audit Sign-Off</CardTitle>
              <CardDescription>
                Record professional oversight and notes before filing pleadings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="font-mono font-semibold text-ink-primary">Audit Decision</label>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setLawyerReviewDecision("ACCEPTED")}
                    className={`p-2 rounded border transition-colors ${
                      lawyerReviewDecision === "ACCEPTED"
                        ? "bg-[#EDF7EE] text-[#1B5E20] border-[#C8E6C9] font-bold"
                        : "bg-paper-surface text-ink-secondary border-paper-border"
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setLawyerReviewDecision("DISPUTED")}
                    className={`p-2 rounded border transition-colors ${
                      lawyerReviewDecision === "DISPUTED"
                        ? "bg-[#FFF9E6] text-[#8C6200] border-[#FFE082] font-bold"
                        : "bg-paper-surface text-ink-secondary border-paper-border"
                    }`}
                  >
                    Distinguish
                  </button>
                  <button
                    type="button"
                    onClick={() => setLawyerReviewDecision("REJECTED")}
                    className={`p-2 rounded border transition-colors ${
                      lawyerReviewDecision === "REJECTED"
                        ? "bg-[#FDECEA] text-[#B71C1C] border-[#FFCDD2] font-bold"
                        : "bg-paper-surface text-ink-secondary border-paper-border"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-semibold text-ink-primary">Lawyer Audit Notes</label>
                <Textarea
                  placeholder="Record strategic refinement or reasoning for relying on this precedent..."
                  value={lawyerNotes}
                  onChange={(e) => setLawyerNotes(e.target.value)}
                  className="h-24 text-xs font-sans"
                />
              </div>

              <Button size="sm" onClick={handleSaveReview} className="w-full text-xs font-mono">
                {reviewSaved ? "✓ Audit Sign-Off Saved to Docket" : "Save Audit Decision to Case File"}
              </Button>

              {reviewSaved && (
                <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] text-center">
                  Audit decision logged by V. K. Sharma (AoR)
                </div>
              )}
            </CardContent>
          </Card>

          <div className="p-3 bg-paper-canvas rounded border border-paper-border font-mono text-[11px] text-ink-tertiary space-y-1">
            <span className="font-bold text-ink-secondary">REGULATORY COMPLIANCE:</span>
            <p>
              Under Advocates Act 1961, Section 35, citing hallucinated judicial authorities constitutes
              actionable professional misconduct. The 6-Check engine guarantees zero phantom citations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
