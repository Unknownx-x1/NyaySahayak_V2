import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded border border-paper-border bg-paper-surface px-3 py-1 text-sm text-ink-primary shadow-subtle placeholder:text-ink-tertiary transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vermilion-primary focus-visible:border-vermilion-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-9",
            error && "border-forensic-overruled focus-visible:ring-forensic-overruled",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-forensic-overruled font-mono">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded border border-paper-border bg-paper-surface px-3 py-2 text-sm text-ink-primary shadow-subtle placeholder:text-ink-tertiary transition-colors",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vermilion-primary focus-visible:border-vermilion-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-forensic-overruled focus-visible:ring-forensic-overruled",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-forensic-overruled font-mono">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
