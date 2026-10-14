"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { DocketTableSkeleton } from "@/components/ui/loading-state";

interface CaseItem {
  id: string;
  title: string;
  caseNumber: string;
  court: string;
  bench: string;
  matterType: string;
  status: "ACTIVE" | "RESERVED" | "DISPOSED";
  verificationStatus: "VERIFIED" | "PARTIAL" | "CONTESTED";
  lastAction: string;
  pagesCount: number;
}

const INITIAL_CASES: CaseItem[] = [
  {
    id: "demo-case",
    title: "M/s Apex Infrastructure Ltd. v. State of Maharashtra & Anr.",
    caseNumber: "SLP (C) No. 4589 of 2024",
    court: "Supreme Court of India",
    bench: "Court No. 3 (Division Bench)",
    matterType: "Commercial Arbitration",
    status: "ACTIVE",
    verificationStatus: "VERIFIED",
    lastAction: "Sparring round completed • 1 objection active",
    pagesCount: 480,
  },
  {
    id: "case-002",
    title: "Union of India v. Reliance Petrochemicals Corporation",
    caseNumber: "Civil Appeal No. 8821 of 2023",
    court: "Supreme Court of India",
    bench: "Constitution Bench (5 Judges)",
    matterType: "Taxation & Constitutional Bar",
    status: "RESERVED",
    verificationStatus: "PARTIAL",
    lastAction: "Bench queries transcribed • 3/6 checks pass",
    pagesCount: 1250,
  },
  {
    id: "case-003",
    title: "Sharma Builders Consortium v. Delhi Development Authority",
    caseNumber: "W.P. (C) No. 1204 of 2024",
    court: "Delhi High Court",
    bench: "Single Judge (Commercial Division)",
    matterType: "Public Procurement & Wednesbury Arbitrary",
    status: "ACTIVE",
    verificationStatus: "CONTESTED",
    lastAction: "Annexure R-2 postal contradiction flagged",
    pagesCount: 310,
  },
  {
    id: "case-004",
    title: "In Re: Telecom Spectrum Licensing & Statutory Levies",
    caseNumber: "Arbitration Case No. 42 of 2023",
    court: "TDSAT / Arbitral Tribunal",
    bench: "Arbitral Tribunal (3 Arbitrators)",
    matterType: "Regulatory Compliance",
    status: "ACTIVE",
    verificationStatus: "VERIFIED",
    lastAction: "Master Case Graph v1.1 compiled",
    pagesCount: 620,
  },
];

export default function CaseDocketsPage() {
  const [cases, setCases] = useState<CaseItem[]>(INITIAL_CASES);
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newCourt, setNewCourt] = useState("Supreme Court of India");
  const [isLoadingView, setIsLoadingView] = useState(false);

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "ALL") return true;
    if (filter === "SUPREME_COURT") return c.court.includes("Supreme Court");
    if (filter === "HIGH_COURT") return c.court.includes("High Court");
    return true;
  });

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCase: CaseItem = {
      id: `case-${Date.now()}`,
      title: newTitle,
      caseNumber: newNumber || "Unnumbered Docket",
      court: newCourt,
      bench: "Principal Bench",
      matterType: "Civil Appeal",
      status: "ACTIVE",
      verificationStatus: "PARTIAL",
      lastAction: "Docket created • Pending paper book upload",
      pagesCount: 0,
    };

    setCases([newCase, ...cases]);
    setNewTitle("");
    setNewNumber("");
    setCreateModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Chamber Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-vermilion-primary uppercase tracking-wider font-semibold">
              CHAMBERS OF V. K. SHARMA
            </span>
            <Badge variant="statute">AoR DOCKET</Badge>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight mt-1">
            Active Litigation Dockets
          </h1>
          <p className="text-xs text-ink-secondary mt-1 font-sans">
            Forensic tracking, page provenance, and adversarial sparring across 4 appellate chambers matters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsLoadingView(true);
              setTimeout(() => setIsLoadingView(false), 800);
            }}
            className="text-xs font-mono"
          >
            {isLoadingView ? "Refreshing..." : "Simulate Reload"}
          </Button>

          <Button
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Case Docket</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1 border border-paper-border rounded p-1 bg-paper-surface w-fit text-xs font-sans">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1 rounded transition-colors ${
              filter === "ALL"
                ? "bg-ink-primary text-paper-surface font-medium"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            All Matters ({cases.length})
          </button>
          <button
            onClick={() => setFilter("SUPREME_COURT")}
            className={`px-3 py-1 rounded transition-colors ${
              filter === "SUPREME_COURT"
                ? "bg-ink-primary text-paper-surface font-medium"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            Supreme Court
          </button>
          <button
            onClick={() => setFilter("HIGH_COURT")}
            className={`px-3 py-1 rounded transition-colors ${
              filter === "HIGH_COURT"
                ? "bg-ink-primary text-paper-surface font-medium"
                : "text-ink-secondary hover:text-ink-primary"
            }`}
          >
            High Courts
          </button>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Filter title or case number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-xs"
          />
        </div>
      </div>

      {/* Main Table or Loading/Empty State */}
      {isLoadingView ? (
        <DocketTableSkeleton rows={4} />
      ) : filteredCases.length === 0 ? (
        <EmptyState
          title="No Matching Case Dockets"
          description="No litigation records matched your filter criteria. Create a new docket to begin document analysis."
          actionLabel="Create New Case Docket"
          onAction={() => setCreateModalOpen(true)}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[38%]">Matter / Case Title</TableHead>
              <TableHead className="w-[20%]">Court & Bench</TableHead>
              <TableHead className="w-[14%]">Citation Audit</TableHead>
              <TableHead className="w-[18%]">Latest Forensic Milestone</TableHead>
              <TableHead className="w-[10%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((item) => (
              <TableRow key={item.id} className="cursor-pointer group">
                <TableCell>
                  <Link href={`/app/cases/${item.id}`} className="block space-y-1">
                    <p className="font-serif font-semibold text-ink-primary group-hover:text-vermilion-primary transition-colors leading-snug">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-ink-tertiary">
                      <span>{item.caseNumber}</span>
                      <span>•</span>
                      <span>{item.matterType}</span>
                    </div>
                  </Link>
                </TableCell>

                <TableCell>
                  <p className="text-xs text-ink-primary font-medium">{item.court}</p>
                  <p className="text-[11px] text-ink-secondary font-mono truncate">{item.bench}</p>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {item.verificationStatus === "VERIFIED" && (
                      <Badge variant="verified">6/6 VERIFIED</Badge>
                    )}
                    {item.verificationStatus === "PARTIAL" && (
                      <Badge variant="partial">3/6 PARTIAL</Badge>
                    )}
                    {item.verificationStatus === "CONTESTED" && (
                      <Badge variant="contested">CONTESTED</Badge>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <p className="text-xs text-ink-secondary truncate font-sans">{item.lastAction}</p>
                  <span className="font-mono text-[10px] text-ink-tertiary">
                    {item.pagesCount > 0 ? `${item.pagesCount} pages indexed` : "Pending upload"}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <Link href={`/app/cases/${item.id}`}>
                    <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs font-mono gap-1">
                      <span>Open</span>
                      <ArrowUpRight className="w-3 h-3 text-ink-tertiary group-hover:text-vermilion-primary" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* New Case Docket Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleCreateCase}>
            <DialogHeader>
              <DialogTitle>Open New Litigation Docket</DialogTitle>
              <DialogDescription>
                Initialize an isolated case record in this chamber workspace.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-ink-primary font-mono text-xs">Case Title / Parties</label>
                <Input
                  required
                  placeholder="e.g. M/s XYZ Infra Ltd. v. State of Karnataka"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-ink-primary font-mono text-xs">Case Number / CNR</label>
                <Input
                  placeholder="e.g. SLP (C) No. 9982 of 2024"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-ink-primary font-mono text-xs">Court Jurisdiction</label>
                <select
                  value={newCourt}
                  onChange={(e) => setNewCourt(e.target.value)}
                  className="w-full h-9 rounded border border-paper-border bg-paper-surface px-3 text-xs text-ink-primary focus:outline-none focus:ring-1 focus:ring-vermilion-primary"
                >
                  <option value="Supreme Court of India">Supreme Court of India</option>
                  <option value="Delhi High Court">Delhi High Court</option>
                  <option value="Bombay High Court">Bombay High Court</option>
                  <option value="NCLT / NCLAT">NCLT / NCLAT</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Create Docket
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
