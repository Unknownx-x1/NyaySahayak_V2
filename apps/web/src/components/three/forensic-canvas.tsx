"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { CaseRelationshipScene } from "./case-relationship-scene";
import { Scale, FileText, CheckCircle2, Link2 } from "lucide-react";

// 2D Archival Fallback Diagram for non-WebGL devices or users with reduced motion preferences
function Archival2DFallback() {
  return (
    <div className="w-full h-full min-h-[380px] bg-paper-elevated/60 border border-paper-border rounded p-6 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between border-b border-paper-border pb-3">
        <span className="font-mono text-xs text-ink-secondary uppercase tracking-wider flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-vermilion-primary" />
          <span>Case Provenance Graph (2D Archival View)</span>
        </span>
        <span className="font-mono text-[11px] text-ink-tertiary">STATIC RESOLUTION</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-6">
        <div className="p-4 bg-paper-surface rounded border border-paper-border shadow-subtle flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-ink-tertiary">VOL. 1 • P. 142</span>
            <FileText className="w-4 h-4 text-ink-primary" />
          </div>
          <p className="font-serif text-sm font-semibold text-ink-primary">Exhibit P-4</p>
          <p className="text-xs text-ink-secondary">Speed Post Tracking Proof (Sec. 65B)</p>
          <span className="text-[10px] font-mono text-vermilion-primary">LINKED TO TIMELINE</span>
        </div>

        <div className="p-4 bg-paper-surface rounded border border-vermilion-border shadow-subtle flex flex-col space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-vermilion-primary font-bold">CORE ISSUE #1</span>
            <Link2 className="w-4 h-4 text-vermilion-primary" />
          </div>
          <p className="font-serif text-sm font-semibold text-ink-primary">Statutory Moratorium</p>
          <p className="text-xs text-ink-secondary">IBC Sec. 14 vs. Arbitration Notice</p>
          <span className="text-[10px] font-mono text-amber-700">CONTESTED RATIO</span>
        </div>

        <div className="p-4 bg-paper-surface rounded border border-[#C8E6C9] shadow-subtle flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-700 font-bold">BINDING RATIO</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="font-serif text-sm font-semibold text-ink-primary">Vidya Drolia (2021)</p>
          <p className="text-xs text-ink-secondary">(2021) 2 SCC 1 • Paragraph 79</p>
          <span className="text-[10px] font-mono text-emerald-800">6/6 CHECKS VERIFIED</span>
        </div>
      </div>

      <div className="text-center font-mono text-[11px] text-ink-tertiary border-t border-paper-border pt-3">
        IMMUTABLE ATTRIBUTION • ZERO AI RETENTION • INDIAN COURTS JURISPRUDENCE
      </div>
    </div>
  );
}

function subscribeMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function ForensicCanvasInternal() {
  const reducedMotion = React.useSyncExternalStore(subscribeMotion, getMotionSnapshot, getServerSnapshot);
  const [hasWebGL] = useState<boolean>(() => checkWebGLSupport());


  if (hasWebGL === false) {
    return <Archival2DFallback />;
  }

  return (
    <div className="w-full h-[420px] relative rounded border border-paper-border bg-paper-canvas overflow-hidden shadow-subtle">
      {/* Editorial Overlay Labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="font-mono text-[11px] text-ink-secondary bg-paper-surface/90 px-2 py-1 rounded border border-paper-border">
          EVIDENTIARY TOPOLOGY • 3D SPATIAL ACCORDION
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
        <span className="font-mono text-[10px] text-ink-tertiary bg-paper-surface/80 px-2 py-0.5 rounded border border-paper-border">
          INTERACTIVE • ORBIT / HOVER TO ROTATE
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="cursor-grab active:cursor-grabbing"
      >
        <CaseRelationshipScene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

// Export as client-only dynamic component to prevent SSR hydration mismatches
export const ForensicCanvas = dynamic(() => Promise.resolve(ForensicCanvasInternal), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] bg-paper-elevated/50 border border-paper-border rounded flex items-center justify-center font-mono text-xs text-ink-tertiary">
      Loading Forensic Canvas...
    </div>
  ),
});
