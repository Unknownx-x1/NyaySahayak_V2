import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "paper";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vermilion-primary disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.99]";

    const variants = {
      primary:
        "bg-vermilion-primary text-paper-surface hover:bg-vermilion-hover shadow-subtle border border-vermilion-primary/20",
      secondary:
        "bg-ink-primary text-paper-surface hover:bg-ink-secondary shadow-subtle border border-ink-primary/20",
      outline:
        "border border-paper-border bg-paper-surface text-ink-primary hover:bg-paper-elevated shadow-subtle",
      paper:
        "bg-paper-elevated text-ink-primary hover:bg-paper-border/60 border border-paper-border",
      ghost:
        "text-ink-secondary hover:text-ink-primary hover:bg-paper-elevated/70",
      danger:
        "bg-forensic-overruled text-paper-surface hover:bg-red-800 shadow-subtle",
    };

    const sizes = {
      sm: "h-7 px-2.5 text-xs rounded-sm gap-1.5",
      md: "h-9 px-3.5 text-sm rounded gap-2",
      lg: "h-11 px-5 text-base rounded-md gap-2.5",
      icon: "h-9 w-9 p-0 rounded flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
