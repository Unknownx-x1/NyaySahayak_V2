import { CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Pillars() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 space-y-28">
      {/* Editorial Section Header */}
      <div className="max-w-3xl">
        <span className="font-mono text-xs text-vermilion-primary uppercase tracking-widest font-semibold">
          SYSTEM ARCHITECTURE & CAPABILITIES
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-ink-primary mt-3 leading-snug">
          Four Disciplines of Forensic Appellate Preparation
        </h2>
        <p className="text-sm sm:text-base text-ink-secondary mt-4 font-sans leading-relaxed">
          Each phase of NyaySahayak transforms unstructured court records into verifiable,
          adversarially tested legal intelligence. No generative shortcuts, no phantom judgments.
        </p>
      </div>

      {/* Section 1: Understand the Case */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-paper-elevated border border-paper-border text-ink-primary font-bold">
              01
            </span>
            <span className="font-mono text-xs text-ink-tertiary uppercase">INGESTION & FACT DECONSTRUCTION</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight">
            Understand the Case
          </h3>

          <p className="text-sm text-ink-secondary leading-relaxed font-sans">
            Appellate filings are buried in 500-page scanned paper books containing typed petitions,
            vernacular annexures, and illegible trial depositions. NyaySahayak extracts every document
            page-by-page, running density-aware multilingual OCR for Devanagari (Hindi), Tamil, and English.
          </p>

          <ul className="space-y-2.5 pt-2 text-sm text-ink-secondary font-sans">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Admitted vs. Disputed Facts:</strong> Automatically separates facts conceded in pleadings from contested allegations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Page Bounding Boxes:</strong> Every extracted entity preserves its exact physical coordinates on the original PDF folio.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Party Alignment:</strong> Identifies petitioners, respondents, proforma respondents, and appearing senior counsel.</span>
            </li>
          </ul>
        </div>

        {/* Visual Dossier Card: Section 1 */}
        <div className="lg:col-span-6">
          <Card className="shadow-folio">
            <CardHeader className="bg-paper-elevated/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-secondary">PROVENANCE INSPECTOR • SAMPLE</span>
                <Badge variant="statute">SLP (C) 4589/2024</Badge>
              </div>
              <CardTitle className="text-base font-serif mt-2">
                Special Leave Petition • Annexure P-4 Bounding Box
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="p-3.5 bg-paper-canvas rounded border border-paper-border font-mono text-xs space-y-2">
                <div className="flex justify-between text-ink-tertiary">
                  <span>DOCUMENT: Paper_Book_Vol_1.pdf</span>
                  <span className="text-vermilion-primary font-bold">PAGE 142 • ¶4</span>
                </div>
                <p className="text-ink-primary font-serif text-sm leading-relaxed border-l-2 border-vermilion-primary pl-3 bg-paper-surface p-2 rounded-r">
                  &ldquo;That the Petitioner on 14.03.2021 issued notice under Section 21 of the Arbitration and Conciliation Act, 1996 nominating Sole Arbitrator...&rdquo;
                </p>
                <div className="flex items-center justify-between text-[11px] text-ink-tertiary pt-1">
                  <span>COORDINATES: [72.0, 210.5, 520.0, 275.2]</span>
                  <span className="text-emerald-700 font-semibold">OCR CONFIDENCE: 99.4%</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-ink-tertiary bg-paper-elevated p-2 rounded border border-paper-border/60 text-center">
                DEMONSTRATION SAMPLE • REAL-TIME PROVENANCE SYNCHRONIZATION
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 2: Explore Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Card className="shadow-folio">
            <CardHeader className="bg-paper-elevated/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-secondary">CHRONOLOGICAL CONFLICT MATRIX</span>
                <Badge variant="contested">1 DISPUTED EVENT</Badge>
              </div>
              <CardTitle className="text-base font-serif mt-2">
                Contract Termination Timeline & Cure Notice Audit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="border border-paper-border rounded p-3 bg-paper-surface space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-ink-primary">14 MARCH 2021</span>
                  <Badge variant="verified">ADMITTED</Badge>
                </div>
                <p className="text-xs text-ink-secondary">Sec. 21 Notice dispatched via Speed Post (Postal Receipt ED14299IN).</p>
              </div>

              <div className="border border-vermilion-border rounded p-3 bg-vermilion-wash/30 space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-vermilion-primary">10 FEBRUARY 2021</span>
                  <Badge variant="overruled">CONTRADICTION DETECTED</Badge>
                </div>
                <p className="text-xs text-ink-secondary font-medium">Respondent claims cure notice was dispatched prior to contract termination.</p>
                <p className="text-[11px] font-mono text-vermilion-primary pt-1">
                  CONFLICT: Annexure R-2 tracking timestamp post-dates claimed termination date by 61 days.
                </p>
              </div>

              <div className="border border-paper-border rounded p-3 bg-paper-surface space-y-1">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-ink-primary">22 APRIL 2021</span>
                  <Badge variant="statute">SEC. 65B VALIDATED</Badge>
                </div>
                <p className="text-xs text-ink-secondary">Electronic email record authenticated under Section 65B Indian Evidence Act.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-paper-elevated border border-paper-border text-ink-primary font-bold">
              02
            </span>
            <span className="font-mono text-xs text-ink-tertiary uppercase">TIMELINE & EXHIBIT MAPPING</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight">
            Explore Evidence
          </h3>

          <p className="text-sm text-ink-secondary leading-relaxed font-sans">
            A single contradictory date or missing postal receipt can sink an appeal. NyaySahayak
            compiles all exhibits into an interactive chronological timeline, evaluating evidence
            under the Indian Evidence Act, 1872 and the Bharatiya Sakshya Adhiniyam, 2023.
          </p>

          <ul className="space-y-2.5 pt-2 text-sm text-ink-secondary font-sans">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Automated Contradiction Alerts:</strong> Flags dates where postal dispatch, FIR filings, or court orders conflict.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Section 65B Audit:</strong> Evaluates admissibility certificates for electronic emails, WhatsApp logs, and CDR records.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Exhibit Cataloging:</strong> Automatically indexes and cross-links exhibits marked from Ex. P-1 through Ex. D-30.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Section 3: Research and Verify */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-paper-elevated border border-paper-border text-ink-primary font-bold">
              03
            </span>
            <span className="font-mono text-xs text-ink-tertiary uppercase">CITATION TRACEABILITY & STATUTES</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight">
            Research & Verify
          </h3>

          <p className="text-sm text-ink-secondary leading-relaxed font-sans">
            In appellate litigation, an AI hallucination is professional misconduct. NyaySahayak
            refuses to treat language models as primary sources of legal truth. Every citation is
            run through our automated 6-Check Verification Protocol before counsel relies on it in court.
          </p>

          <ul className="space-y-2.5 pt-2 text-sm text-ink-secondary font-sans">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Official Whitelists Only:</strong> Grounded exclusively in Supreme Court Reports (SCR), High Court registries, and India Code Bare Acts.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Overruled Precedent Detection:</strong> Alerts counsel if an authoritative judgment was subsequently overruled or referred to a larger Constitution Bench.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Verbatim Quote Matching:</strong> Verifies every quoted word against the certified judicial gazette text.</span>
            </li>
          </ul>
        </div>

        {/* Visual Dossier Card: Section 3 */}
        <div className="lg:col-span-6">
          <Card className="shadow-folio">
            <CardHeader className="bg-paper-elevated/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-secondary">THE 6-CHECK VERIFICATION ENGINE</span>
                <Badge variant="verified">AUDIT PASS (4/6)</Badge>
              </div>
              <CardTitle className="text-base font-serif mt-2">
                Precedent Treatment: Vidya Drolia (2021) 2 SCC 1
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded bg-paper-canvas border border-paper-border">
                  <span className="text-[10px] text-ink-tertiary block">1. EXISTENCE</span>
                  <span className="text-emerald-700 font-bold">VERIFIED (SCR/SCC)</span>
                </div>
                <div className="p-2.5 rounded bg-paper-canvas border border-paper-border">
                  <span className="text-[10px] text-ink-tertiary block">2. IDENTITY</span>
                  <span className="text-emerald-700 font-bold">MATCH (3 JUDGES)</span>
                </div>
                <div className="p-2.5 rounded bg-paper-canvas border border-paper-border">
                  <span className="text-[10px] text-ink-tertiary block">3. WHITELIST</span>
                  <span className="text-emerald-700 font-bold">SUPREME COURT</span>
                </div>
                <div className="p-2.5 rounded bg-paper-canvas border border-paper-border">
                  <span className="text-[10px] text-ink-tertiary block">4. QUOTATION</span>
                  <span className="text-emerald-700 font-bold">100% VERBATIM</span>
                </div>
                <div className="p-2.5 rounded bg-amber-50 border border-amber-200">
                  <span className="text-[10px] text-amber-800 block">5. PROPOSITION</span>
                  <span className="text-amber-800 font-bold">DISTINGUISHED</span>
                </div>
                <div className="p-2.5 rounded bg-paper-canvas border border-paper-border">
                  <span className="text-[10px] text-ink-tertiary block">6. PRECEDENT TRACE</span>
                  <span className="text-emerald-700 font-bold">AFFIRMED (2023)</span>
                </div>
              </div>
              <p className="font-sans text-[11px] text-ink-secondary pt-2">
                <strong>Forensic Note:</strong> Vidya Drolia affirmed by 7-Judge Bench in <em>In Re Interplay (2023)</em> regarding stamping and non-arbitrability tests.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 4: Prepare for Court */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Card className="shadow-folio">
            <CardHeader className="bg-paper-elevated/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-secondary">LANGGRAPH COURTROOM ARENA</span>
                <Badge variant="vermilion">ADVERSARIAL SPARRING</Badge>
              </div>
              <CardTitle className="text-base font-serif mt-2">
                Simulated Multi-Agent Oral Hearing • Active Turn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-xs font-sans">
              {/* Opposing Counsel Turn */}
              <div className="p-3 bg-paper-elevated/60 rounded border border-paper-border space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-ink-primary">OPPOSING COUNSEL (RED TEAMER)</span>
                  <span className="text-forensic-overruled font-semibold">PRELIMINARY OBJECTION</span>
                </div>
                <p className="text-ink-secondary">
                  &ldquo;My Lords, a writ under Article 226 is barred when an efficacious alternative remedy exists under Section 34 of the Arbitration Act. Clause 24 covers this termination.&rdquo;
                </p>
              </div>

              {/* Bench Judge Interjection */}
              <div className="p-3 bg-paper-surface rounded border-l-2 border-vermilion-primary border-t border-r border-b border-paper-border space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-ink-primary">HON&apos;BLE PRESIDING JUDGE</span>
                  <span className="text-amber-700 font-semibold">SKEPTICAL QUERY</span>
                </div>
                <p className="text-ink-secondary italic">
                  &ldquo;Counsel, answer the preliminary objection first. Why shouldn&apos;t we dismiss this writ and relegate you to arbitration under Clause 24? Where is the public law element?&rdquo;
                </p>
              </div>

              {/* Coach Strategy Advice */}
              <div className="p-3 bg-[#EDF7EE] rounded border border-[#C8E6C9] space-y-1">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-bold text-emerald-800">COURTROOM COACH (STRATEGIST)</span>
                  <span className="text-emerald-800 font-semibold">RECOMMENDED REBUTTAL</span>
                </div>
                <p className="text-emerald-950 font-medium">
                  Immediately cite <em>Harbanslal Sahnia (2003) 2 SCC 107</em>, Paragraph 7. Direct the Bench to Volume 1, Page 84 to prove manifest arbitrariness without factual inquiry.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-paper-elevated border border-paper-border text-ink-primary font-bold">
              04
            </span>
            <span className="font-mono text-xs text-ink-tertiary uppercase">LANGGRAPH MULTI-AGENT ARENA</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight">
            Prepare for Court
          </h3>

          <p className="text-sm text-ink-secondary leading-relaxed font-sans">
            Generic chatbots provide agreeable, flattering answers. In court, you face hostile
            benches and aggressive opposing counsel looking for procedural fatal flaws.
            NyaySahayak puts you in an adversarial sparring simulation before you step into the courtroom.
          </p>

          <ul className="space-y-2.5 pt-2 text-sm text-ink-secondary font-sans">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Opposing Counsel (Red Teamer):</strong> Attacks evidentiary gaps, raises preliminary maintainability objections, and cites contrary Division Bench decisions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Bench Judge (Inquisitor):</strong> Interrupts arguments, tests statutory bars (IBC Sec. 14, CPC Sec. 9), and demands exact paper-book page citations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Courtroom Coach (Senior Strategist):</strong> Whispers instant tactical counter-rebuttals, spots inadvertent concessions, and quotes exact page numbers.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
