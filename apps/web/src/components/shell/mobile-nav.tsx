"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-primary/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-50 flex flex-col w-72 max-w-[80vw] h-full bg-paper-surface shadow-elevation animate-in slide-in-from-left duration-200">
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-ink-secondary"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <Sidebar onNavigate={onClose} className="w-full border-r-0" />
      </div>
    </div>
  );
}
