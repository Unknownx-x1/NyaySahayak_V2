"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChunkItem {
  id: string;
  page: number;
  paragraph: number;
  text: string;
  bbox: { x0: number; y0: number; x1: number; y1: number };
  ocrApplied: boolean;
  confidence: number;
  entityType?: "FACT" | "EXHIBIT" | "STATUTE" | "CITATION";
}

const SAMPLE_CHUNKS: ChunkItem[] = [
  {
    id: "chk-1",
    page: 142,
    paragraph: 2,
    text: "2. The Respondent Corporation on 10.01.2021 invited competitive tenders for the construction of elevated corridor Package IV under EPC model.",
    bbox: { x0: 45, y0: 80, x1: 520, y1: 130 },
    ocrApplied: false,
    confidence: 1.0,
    entityType: "FACT",
  },
  {
    id: "chk-2",
    page: 142,
    paragraph: 4,
    text: "4. That the Petitioner on 14.03.2021 issued notice under Section 21 of the Arbitration and Conciliation Act, 1996 nominating Justice (Retd.) R. V. Raveendran as Sole Arbitrator, which was duly received via Speed Post Tracking ED14299IN (Annexure P-4).",
    bbox: { x0: 45, y0: 145, x1: 520, y1: 220 },
    ocrApplied: false,
    confidence: 0.99,
    entityType: "EXHIBIT",
  },
  {
    id: "chk-3",
    page: 142,
    paragraph: 7,
    text: "7. The impugned termination order dated 28.04.2021 was passed without affording 30-day statutory cure notice as mandated by Clause 18.2 of the General Conditions of Contract, violating Wednesbury principles.",
    bbox: { x0: 45, y0: 235, x1: 520, y1: 310 },
    ocrApplied: false,
    confidence: 0.98,
    entityType: "STATUTE",
  },
];

export default function DocumentInspectorPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "demo-case";
  const [activeChunkId, setActiveChunkId] = useState<string>("chk-2");
  const [currentPage, setCurrentPage] = useState<number>(142);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const activeChunk = SAMPLE_CHUNKS.find((c) => c.id === activeChunkId) || SAMPLE_CHUNKS[1];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-paper-border pb-4">
        <div className="flex items-center space-x-3">
          <Link href={`/app/cases/${caseId}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-vermilion-primary">
                PAPER BOOK INSPECTOR
              </span>
              <Badge variant="statute">VOLUME 1 OF 3</Badge>
            </div>
            <h1 className="font-serif text-lg font-semibold text-ink-primary">
              Paper_Book_Vol_1_Special_Leave_Petition.pdf
            </h1>
          </div>
        </div>

        {/* Page & Zoom Controls */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <div className="flex items-center bg-paper-surface border border-paper-border rounded px-2 py-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-1 hover:text-vermilion-primary"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2">Page {currentPage} of 480</span>
            <button
              onClick={() => setCurrentPage(Math.min(480, currentPage + 1))}
              className="p-1 hover:text-vermilion-primary"
              aria-label="Next page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center bg-paper-surface border border-paper-border rounded px-2 py-1 gap-1">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
              className="p-1 hover:text-vermilion-primary"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
              className="p-1 hover:text-vermilion-primary"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Synchronized Split-Screen View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
        {/* Left: Rendered PDF Folio Simulation */}
        <div className="lg:col-span-7 rounded border border-paper-border bg-paper-canvas p-6 overflow-auto flex justify-center shadow-inner relative select-none">
          {/* Simulated Physical Page Sheet */}
          <div
            style={{ width: `${(595 * zoomLevel) / 100}px`, minHeight: `${(842 * zoomLevel) / 100}px` }}
            className="bg-paper-surface border border-paper-border shadow-elevation p-10 relative text-ink-primary font-serif leading-relaxed text-sm"
          >
            {/* Top Page Folio Header */}
            <div className="border-b border-paper-border pb-3 mb-6 flex justify-between font-mono text-[10px] text-ink-tertiary">
              <span>IN THE SUPREME COURT OF INDIA</span>
              <span>SPECIAL LEAVE PETITION • PAGE {currentPage}</span>
            </div>

            {/* Simulated Page Content with Interactive Bounding Box Highlight */}
            <div className="space-y-4 text-xs sm:text-sm">
              <p className="text-justify text-ink-secondary">
                1. That the Petitioner is a public limited engineering and construction company incorporated under the Companies Act, 1956 having its registered office at Mumbai.
              </p>

              <div
                onClick={() => setActiveChunkId("chk-1")}
                className={`p-2 rounded transition-all cursor-pointer ${
                  activeChunkId === "chk-1"
                    ? "bg-vermilion-wash/60 ring-2 ring-vermilion-primary"
                    : "hover:bg-paper-elevated"
                }`}
              >
                <p className="text-justify text-ink-primary">
                  2. The Respondent Corporation on 10.01.2021 invited competitive tenders for the construction of elevated corridor Package IV under EPC model.
                </p>
              </div>

              <p className="text-justify text-ink-secondary">
                3. The Petitioner was declared the successful L-1 bidder and contract agreement was formally executed on 04.02.2021 with mobilization advance guaranteed.
              </p>

              {/* Crucial Highlighted Bounding Box */}
              <div
                onClick={() => setActiveChunkId("chk-2")}
                className={`p-2.5 rounded transition-all cursor-pointer relative ${
                  activeChunkId === "chk-2"
                    ? "bg-vermilion-wash ring-2 ring-vermilion-primary shadow-subtle"
                    : "hover:bg-paper-elevated"
                }`}
              >
                <span className="absolute -top-2.5 right-2 bg-vermilion-primary text-paper-surface font-mono text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase">
                  BOUNDING BOX [¶4]
                </span>
                <p className="text-justify text-ink-primary font-medium">
                  4. That the Petitioner on 14.03.2021 issued notice under Section 21 of the Arbitration and Conciliation Act, 1996 nominating Justice (Retd.) R. V. Raveendran as Sole Arbitrator, which was duly received via Speed Post Tracking ED14299IN (Annexure P-4).
                </p>
              </div>

              <p className="text-justify text-ink-secondary">
                5. The Respondent failed to reply to the Section 21 notice within the stipulated 30-day period under Section 11(6) of the Act.
              </p>

              <div
                onClick={() => setActiveChunkId("chk-3")}
                className={`p-2 rounded transition-all cursor-pointer ${
                  activeChunkId === "chk-3"
                    ? "bg-vermilion-wash/60 ring-2 ring-vermilion-primary"
                    : "hover:bg-paper-elevated"
                }`}
              >
                <p className="text-justify text-ink-primary">
                  7. The impugned termination order dated 28.04.2021 was passed without affording 30-day statutory cure notice as mandated by Clause 18.2 of the General Conditions of Contract, violating Wednesbury principles.
                </p>
              </div>
            </div>

            {/* Bottom Page Folio Footer */}
            <div className="absolute bottom-6 left-10 right-10 border-t border-paper-border pt-3 flex justify-between font-mono text-[10px] text-ink-tertiary">
              <span>COUNSEL FOR PETITIONER</span>
              <span>142</span>
            </div>
          </div>
        </div>

        {/* Right: Forensic Extracted Intelligence Chunks */}
        <div className="lg:col-span-5 rounded border border-paper-border bg-paper-surface p-5 flex flex-col justify-between overflow-hidden">
          <div className="space-y-4 overflow-y-auto pr-1">
            <div className="flex items-center justify-between border-b border-paper-border pb-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-secondary font-semibold block">
                  Extracted Chunks on Page {currentPage}
                </span>
                <span className="text-[11px] font-mono text-ink-tertiary">
                  3 entities identified • Click chunk to frame bounding box
                </span>
              </div>
              <Badge variant="verified">100% OCR PASS</Badge>
            </div>

            {SAMPLE_CHUNKS.map((chunk) => {
              const isSelected = chunk.id === activeChunkId;
              return (
                <div
                  key={chunk.id}
                  onClick={() => setActiveChunkId(chunk.id)}
                  className={`p-3.5 rounded border transition-all cursor-pointer font-sans text-xs space-y-2 ${
                    isSelected
                      ? "border-vermilion-border bg-vermilion-wash/30 shadow-subtle ring-1 ring-vermilion-primary"
                      : "border-paper-border bg-paper-surface hover:bg-paper-elevated/40"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isSelected ? "text-vermilion-primary" : "text-ink-tertiary"
                        }`}
                      />
                      <span className="font-semibold text-ink-primary">Paragraph {chunk.paragraph}</span>
                    </div>
                    {chunk.entityType === "EXHIBIT" && <Badge variant="vermilion">EXHIBIT P-4</Badge>}
                    {chunk.entityType === "STATUTE" && <Badge variant="statute">STATUTORY ISSUE</Badge>}
                    {chunk.entityType === "FACT" && <Badge variant="neutral">ADMITTED FACT</Badge>}
                  </div>

                  <p className="text-ink-primary font-serif leading-relaxed">
                    {chunk.text}
                  </p>

                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-tertiary pt-1 border-t border-paper-border/60">
                    <span>BBOX: [{chunk.bbox.x0}, {chunk.bbox.y0}, {chunk.bbox.x1}, {chunk.bbox.y1}]</span>
                    <span className="text-emerald-700 font-semibold">
                      CONFIDENCE: {(chunk.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Active Chunk Status Banner */}
          <div className="p-3 bg-paper-elevated rounded border border-paper-border font-mono text-xs flex items-center justify-between mt-4">
            <span className="text-ink-secondary">ACTIVE SELECTION:</span>
            <span className="text-vermilion-primary font-bold">PAGE 142 • ¶{activeChunk.paragraph}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

