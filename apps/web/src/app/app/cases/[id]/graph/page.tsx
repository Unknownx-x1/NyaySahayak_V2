"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, AlertTriangle, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  isDisputed: boolean;
  contradictionNotes?: string;
  sourceDoc: string;
  sourcePage: number;
}

const SAMPLE_TIMELINE: TimelineEvent[] = [
  {
    id: "e-1",
    date: "10 January 2021",
    title: "Tender Notification Issued by Respondent",
    description: "Maharashtra Industrial Development Corp invites bids for elevated highway construction.",
    isDisputed: false,
    sourceDoc: "Paper_Book_Vol_1.pdf",
    sourcePage: 48,
  },
  {
    id: "e-2",
    date: "04 February 2021",
    title: "EPC Contract Executed",
    description: "Formal EPC contract signed between Petitioner and Respondent. Contains Clause 24 (Arbitration).",
    isDisputed: false,
    sourceDoc: "Paper_Book_Vol_1.pdf",
    sourcePage: 92,
  },
  {
    id: "e-3",
    date: "10 February 2021",
    title: "Alleged 30-Day Cure Notice by Respondent",
    description: "Respondent claims cure notice was dispatched asserting mobilization advance delay.",
    isDisputed: true,
    contradictionNotes: "CRITICAL CONTRADICTION: Speed post tracking receipt Annexure R-2 proves envelope was booked on 12 April 2021, 61 days AFTER claimed dispatch date.",
    sourceDoc: "Counter_Affidavit.pdf",
    sourcePage: 38,
  },
  {
    id: "e-4",
    date: "14 March 2021",
    title: "Section 21 Arbitration Notice Dispatched",
    description: "Petitioner invokes Section 21 Arbitration Act nominating Sole Arbitrator (Ex. P-4).",
    isDisputed: false,
    sourceDoc: "Paper_Book_Vol_1.pdf",
    sourcePage: 142,
  },
  {
    id: "e-5",
    date: "28 April 2021",
    title: "Impugned Contract Termination Order",
    description: "Respondent unilaterally terminates EPC contract invoking forfeiture of performance bank guarantees.",
    isDisputed: false,
    sourceDoc: "Paper_Book_Vol_1.pdf",
    sourcePage: 184,
  },
];

export default function MasterCaseGraphPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "demo-case";
  const [selectedEventId, setSelectedEventId] = useState<string>("e-3");

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
                MASTER CASE GRAPH v1.0
              </span>
              <Badge variant="contested">1 TIMELINE CONTRADICTION</Badge>
            </div>
            <h1 className="font-serif text-xl font-semibold text-ink-primary">
              Evidentiary Chronology &amp; Issue Framing
            </h1>
          </div>
        </div>

        <Link href={`/app/cases/${caseId}/courtroom`}>
          <Button size="sm" className="gap-1.5 font-mono text-xs">
            <span>Spar on Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList>
          <TabsTrigger value="timeline">Chronological Timeline (5 Events)</TabsTrigger>
          <TabsTrigger value="evidence">Exhibit Integrity Map (Sec. 65B)</TabsTrigger>
          <TabsTrigger value="issues">Framed Legal Issues (4 Issues)</TabsTrigger>
        </TabsList>

        {/* Tab 1: Timeline with Contradiction Flag */}
        <TabsContent value="timeline" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Timeline Stream */}
            <div className="lg:col-span-7 space-y-3">
              {SAMPLE_TIMELINE.map((event) => {
                const isSelected = event.id === selectedEventId;
                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`p-4 rounded border transition-all cursor-pointer space-y-2 ${
                      event.isDisputed
                        ? "border-vermilion-border bg-vermilion-wash/40 ring-1 ring-vermilion-primary"
                        : isSelected
                        ? "border-paper-border bg-paper-surface shadow-subtle ring-1 ring-ink-primary"
                        : "border-paper-border bg-paper-surface hover:bg-paper-elevated/40"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-ink-primary flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-ink-tertiary" />
                        {event.date}
                      </span>
                      {event.isDisputed ? (
                        <Badge variant="overruled">CONTRADICTION FLAGGED</Badge>
                      ) : (
                        <Badge variant="verified">VERIFIED BY RECORD</Badge>
                      )}
                    </div>

                    <h4 className="font-serif text-sm font-semibold text-ink-primary">
                      {event.title}
                    </h4>

                    <p className="text-xs text-ink-secondary font-sans leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between font-mono text-[11px] text-ink-tertiary pt-2 border-t border-paper-border/60">
                      <span>DOC: {event.sourceDoc}</span>
                      <span className="text-vermilion-primary font-bold">PAGE {event.sourcePage}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contradiction Forensic Dossier Sidebar */}
            <div className="lg:col-span-5">
              <Card className="sticky top-20 border-vermilion-border/80 shadow-folio">
                <CardHeader className="bg-vermilion-wash/30">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-vermilion-primary" />
                    <CardTitle className="text-sm font-serif">
                      Forensic Contradiction Audit
                    </CardTitle>
                  </div>
                  <CardDescription>
                    Automated cross-examination point for oral argument.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-4 text-xs font-sans">
                  <div className="p-3 bg-paper-canvas rounded border border-paper-border space-y-2">
                    <span className="font-mono text-[10px] text-ink-tertiary uppercase block">
                      PETITIONER CROSS-EXAMINATION ASSET
                    </span>
                    <p className="font-serif font-semibold text-ink-primary text-sm leading-snug">
                      Fraudulent Date of Cure Notice Dispatch
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                      Respondent pleaded that a 30-day cure notice was served on 10 February 2021.
                      However, Indian Postal tracking receipt (Annexure R-2, Page 38) bears dispatch barcode ED14299IN
                      dated <strong>12 April 2021</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-[#EDF7EE] rounded border border-[#C8E6C9] font-mono text-[11px] text-emerald-900 space-y-1">
                    <span className="font-bold block">STRATEGIC COACH RECOMMENDATION:</span>
                    <p>
                      Present this contradiction during oral argument when Opposing Counsel argues lack of cure.
                      Quote Volume 1, Page 38.
                    </p>
                  </div>

                  <Link href={`/app/cases/${caseId}/courtroom`} className="block pt-2">
                    <Button size="sm" className="w-full text-xs font-mono">
                      Spar Against Opposing Counsel on this Point
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Evidence Integrity */}
        <TabsContent value="evidence" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-serif">Exhibit Admissibility &amp; Section 65B Audit</CardTitle>
              <CardDescription>
                Compliance audit under Indian Evidence Act, 1872 / Bharatiya Sakshya Adhiniyam, 2023.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-center justify-between p-3 rounded bg-paper-canvas border border-paper-border">
                  <div>
                    <span className="font-mono font-bold text-ink-primary">EXHIBIT P-1: Contract Agreement (04.02.2021)</span>
                    <p className="text-ink-secondary text-[11px] mt-0.5">Primary Documentary Record • Duly stamped &amp; registered</p>
                  </div>
                  <Badge variant="verified">ADMISSIBLE</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded bg-paper-canvas border border-paper-border">
                  <div>
                    <span className="font-mono font-bold text-ink-primary">EXHIBIT P-4: Section 21 Postal Notice (14.03.2021)</span>
                    <p className="text-ink-secondary text-[11px] mt-0.5">Speed Post Barcode Tracking Certificate attached</p>
                  </div>
                  <Badge variant="verified">ADMISSIBLE</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded bg-amber-50/60 border border-amber-200">
                  <div>
                    <span className="font-mono font-bold text-amber-900">EXHIBIT R-3: WhatsApp Communication Log</span>
                    <p className="text-amber-800 text-[11px] mt-0.5">Electronic Record • Mandatory Section 65B Certificate is MISSING</p>
                  </div>
                  <Badge variant="contested">DEFECTIVE SEC. 65B</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Legal Issues */}
        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-serif">Framed Appellate Legal Issues</CardTitle>
              <CardDescription>Core jurisdictional and statutory controversies for the Bench.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 font-sans text-xs">
              <div className="p-3.5 rounded bg-paper-canvas border border-paper-border space-y-1">
                <span className="font-mono text-[10px] text-vermilion-primary font-bold">ISSUE 1 • PRELIMINARY BAR</span>
                <p className="font-serif text-sm font-semibold text-ink-primary">
                  Whether a Writ Petition under Article 226 of the Constitution is maintainable against unilateral termination of an EPC contract when an alternative arbitration clause exists.
                </p>
                <p className="text-ink-secondary text-[11px] font-mono pt-1">
                  GOVERNING PRECEDENT: Harbanslal Sahnia (2003) 2 SCC 107 • ABL International (2004) 3 SCC 553
                </p>
              </div>

              <div className="p-3.5 rounded bg-paper-canvas border border-paper-border space-y-1">
                <span className="font-mono text-[10px] text-ink-tertiary font-bold">ISSUE 2 • STATUTORY ARBITRABILITY</span>
                <p className="font-serif text-sm font-semibold text-ink-primary">
                  Whether the dispute is non-arbitrable by virtue of alleged statutory insolvency proceedings under Section 14 of the IBC, 2016.
                </p>
                <p className="text-ink-secondary text-[11px] font-mono pt-1">
                  GOVERNING PRECEDENT: Vidya Drolia (2021) 2 SCC 1 • In Re Interplay (7-Judge Bench, 2023)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
