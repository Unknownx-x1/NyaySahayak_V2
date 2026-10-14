import * as React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Telemetry Error",
  message = "An unexpected error occurred while communicating with the courtroom intelligence engine.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center border border-forensic-overruled/30 rounded bg-forensic-overruledBg/40 max-w-lg mx-auto",
        className
      )}
    >
      <div className="w-10 h-10 rounded bg-forensic-overruled/10 flex items-center justify-center text-forensic-overruled mb-3">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h3 className="font-serif text-base font-semibold text-ink-primary mb-1">
        {title}
      </h3>
      <p className="text-xs text-ink-secondary mb-5 font-mono">
        {message}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-1.5 text-xs">
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Retry Operation</span>
        </Button>
      )}
    </div>
  );
}
