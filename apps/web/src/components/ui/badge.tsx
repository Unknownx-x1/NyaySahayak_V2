import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "verified" | "partial" | "contested" | "overruled" | "statute" | "neutral" | "vermilion";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono text-[11px] font-medium px-2 py-0.5 rounded-sm border uppercase tracking-wider select-none";

  const variants = {
    verified: "bg-[#EDF7EE] text-[#1B5E20] border-[#C8E6C9]",
    partial: "bg-[#FFF9E6] text-[#8C6200] border-[#FFE082]",
    contested: "bg-[#FFF0E0] text-[#B25900] border-[#FFCC80]",
    overruled: "bg-[#FDECEA] text-[#B71C1C] border-[#FFCDD2]",
    statute: "bg-paper-elevated text-ink-primary border-paper-border font-sans lowercase font-semibold",
    neutral: "bg-paper-surface text-ink-secondary border-paper-border",
    vermilion: "bg-vermilion-wash text-vermilion-primary border-vermilion-border",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
