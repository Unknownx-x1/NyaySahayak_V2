"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  Briefcase,
  FileText,
  Network,
  ShieldCheck,
  Swords,
  BookOpen,
  ChevronDown,
  Building2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Case Dockets",
      href: "/app",
      icon: Briefcase,
      badge: "4 Active",
      exact: true,
    },
    {
      name: "Paper Books & OCR",
      href: "/app/cases/demo-case/documents",
      icon: FileText,
      badge: "Vol. 1",
    },
    {
      name: "Master Case Graph",
      href: "/app/cases/demo-case/graph",
      icon: Network,
      badge: "v1.0",
    },
    {
      name: "6-Check Citations",
      href: "/app/cases/demo-case/verification",
      icon: ShieldCheck,
      badge: "Audited",
    },
    {
      name: "Courtroom Arena",
      href: "/app/cases/demo-case/courtroom",
      icon: Swords,
      badge: "Sparring",
    },
    {
      name: "Bare Acts & SCR",
      href: "/app/research",
      icon: BookOpen,
      badge: "India Code",
    },
  ];

  return (
    <aside
      className={cn(
        "w-64 bg-paper-surface border-r border-paper-border flex flex-col justify-between h-full select-none",
        className
      )}
    >
      {/* Top Chamber Profile */}
      <div>
        <div className="p-4 border-b border-paper-border flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-vermilion-primary flex items-center justify-center text-paper-surface">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-semibold text-sm tracking-tight text-ink-primary block leading-none">
                NYAYSAHAYAK
              </span>
              <span className="font-mono text-[10px] text-ink-tertiary">
                CHAMBERS WORKSPACE
              </span>
            </div>
          </div>
        </div>

        {/* Workspace Switcher Card */}
        <div className="p-3 mx-3 mt-3 rounded bg-paper-elevated/70 border border-paper-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="w-3.5 h-3.5 text-ink-secondary" />
              <span className="text-xs font-semibold text-ink-primary truncate max-w-[140px]">
                Chambers of V. Sharma
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-ink-tertiary" />
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-ink-tertiary">
            <span>SUPREME COURT OF INDIA</span>
            <Badge variant="vermilion" className="text-[9px] px-1 py-0">SENIOR</Badge>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="p-3 space-y-1 mt-3">
          <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-ink-tertiary block mb-2">
            Litigation Intelligence
          </span>
          {navigation.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors font-sans",
                  isActive
                    ? "bg-vermilion-wash text-vermilion-primary font-semibold border-l-2 border-vermilion-primary rounded-l-none"
                    : "text-ink-secondary hover:text-ink-primary hover:bg-paper-elevated/60"
                )}
              >
                <div className="flex items-center space-x-2.5">
                  <item.icon
                    className={cn(
                      "w-4 h-4",
                      isActive ? "text-vermilion-primary" : "text-ink-tertiary"
                    )}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "font-mono text-[10px] px-1.5 py-0.2 rounded border",
                      isActive
                        ? "bg-paper-surface border-vermilion-border text-vermilion-primary"
                        : "bg-paper-elevated border-paper-border text-ink-tertiary"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Footer */}
      <div className="p-3 border-t border-paper-border bg-paper-elevated/30">
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded bg-ink-primary text-paper-surface flex items-center justify-center font-serif text-xs font-bold">
              VS
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-primary leading-none">
                V. K. Sharma
              </p>
              <p className="text-[10px] font-mono text-ink-tertiary mt-0.5">
                D/1420/2008 • AoR
              </p>
            </div>
          </div>
          <Link href="/" title="Sign Out to Landing">
            <LogOut className="w-4 h-4 text-ink-tertiary hover:text-vermilion-primary transition-colors cursor-pointer" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
