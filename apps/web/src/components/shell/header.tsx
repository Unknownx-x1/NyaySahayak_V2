"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu, ChevronRight, Scale, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Generate breadcrumb title
  const getBreadcrumb = () => {
    if (pathname === "/app") return "Case Dockets";
    if (pathname.includes("/documents")) return "Paper Books & Bounding Box Inspector";
    if (pathname.includes("/graph")) return "Master Case Graph & Timeline";
    if (pathname.includes("/verification")) return "The 6-Check Citation Verification Protocol";
    if (pathname.includes("/courtroom")) return "LangGraph Courtroom Arena (Sparring)";
    if (pathname.includes("/research")) return "Bare Acts & Statutory Corpus";
    return "Litigation Overview";
  };

  return (
    <header className="h-14 border-b border-paper-border bg-paper-surface px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden text-ink-secondary"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center space-x-2 text-xs font-mono text-ink-secondary">
          <Link href="/app" className="hover:text-vermilion-primary flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-vermilion-primary" />
            <span className="hidden sm:inline">CHAMBERS</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-ink-tertiary" />
          <span className="font-semibold text-ink-primary truncate max-w-[220px] sm:max-w-none">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      {/* Right: Quick actions, Search, Notifications */}
      <div className="flex items-center space-x-2.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSearchOpen(true)}
          className="h-8 gap-2 text-xs font-mono text-ink-tertiary px-3 hidden sm:flex"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search records...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-paper-elevated border border-paper-border text-[10px]">
            ⌘K
          </kbd>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setNotifOpen(true)}
          className="h-8 w-8 text-ink-secondary relative"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vermilion-primary" />
        </Button>

        <div className="h-4 w-px bg-paper-border hidden sm:block" />

        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded bg-paper-elevated border border-paper-border text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
          <span className="text-[11px] text-ink-secondary">ACTIVE: SLP 4589/24</span>
        </div>
      </div>

      {/* Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Quick Forensic Search</DialogTitle>
            <DialogDescription>
              Search citations, exhibits, bare acts, and paper-book paragraphs.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 font-sans text-xs">
            <input
              type="text"
              placeholder="Type citation (e.g. '2021 2 SCC 1') or section (e.g. 'Sec 65B')..."
              className="w-full h-10 px-3 rounded border border-paper-border bg-paper-canvas text-sm font-sans focus:outline-none focus:border-vermilion-primary"
              autoFocus
            />
            <div className="p-3 bg-paper-elevated rounded border border-paper-border space-y-1 font-mono text-xs">
              <span className="text-[10px] text-ink-tertiary">SEARCH INDEXES:</span>
              <p className="text-ink-secondary">• Supreme Court Reports (1950–2024)</p>
              <p className="text-ink-secondary">• Active Case Docket (Paper Book Vol 1, Ex. P-1 to P-12)</p>
              <p className="text-ink-secondary">• Bare Acts (IBC 2016, Arbitration Act 1996, BSA 2023)</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Modal */}
      <Dialog open={notifOpen} onOpenChange={setNotifOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chamber Audit Notifications</DialogTitle>
            <DialogDescription>
              Automated alerts regarding citation treatment and exhibit contradictions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-xs font-sans">
            <div className="p-3 rounded bg-vermilion-wash border border-vermilion-border flex items-start space-x-2.5">
              <ShieldAlert className="w-4 h-4 text-vermilion-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-vermilion-primary font-mono text-xs">
                  Contradiction Detected in Annexure R-2
                </p>
                <p className="text-ink-secondary mt-0.5">
                  Postal speed tracking timestamp post-dates Respondent&apos;s claimed termination date by 61 days.
                </p>
                <span className="font-mono text-[10px] text-ink-tertiary block mt-1">10 mins ago • Case SLP 4589/24</span>
              </div>
            </div>

            <div className="p-3 rounded bg-[#EDF7EE] border border-[#C8E6C9] flex items-start space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-700 shrink-0 mt-1.5" />
              <div>
                <p className="font-semibold text-emerald-800 font-mono text-xs">
                  Paper Book Volume 1 Ingested
                </p>
                <p className="text-ink-secondary mt-0.5">
                  480 pages parsed with coordinate bounding boxes. Ready for oral argument sparring.
                </p>
                <span className="font-mono text-[10px] text-ink-tertiary block mt-1">1 hour ago</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
