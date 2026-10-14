"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Scale, 
  Send, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  ChevronRight,
  BookOpen,
  TrendingUp,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";

interface SparringMessage {
  id: string;
  sender: "user" | "bench" | "opposing" | "coach";
  title: string;
  role: string;
  timestamp: string;
  text: string;
  citations?: { title: string; pin: string; verified: boolean }[];
  objectionType?: string;
  critiqueScore?: number;
}

const MOCK_ISSUES = [
  {
    id: "iss-1",
    title: "Maintainability under Article 226 vs Alternate Remedy",
    forum: "Delhi High Court (Division Bench)",
    benchPersonality: "Skeptical, strict adherence to Whirlpool Corp precedent",
    opposingProfile: "Senior Advocate, preliminary objection specialist",
    difficulty: "High"
  },
  {
    id: "iss-2",
    title: "Scope of Section 34 Arbitration Challenge (Patent Illegality)",
    forum: "Commercial Appellate Division",
    benchPersonality: "Inquisitorial on Associate Builders vs Ssangyong parameters",
    opposingProfile: "Technical arbitration counsel, strict record reliance",
    difficulty: "Medium"
  },
  {
    id: "iss-3",
    title: "Interim Injunction & Non-Compete In Restraint of Trade (Sec 27)",
    forum: "Original Civil Jurisdiction",
    benchPersonality: "Equity-oriented, balances hardship and irreparable loss",
    opposingProfile: "Aggressive commercial litigator citing Percept D'Mark",
    difficulty: "High"
  }
];

export default function CourtroomSparringPage() {
  const params = useParams();
  const caseId = (params?.id as string) || "DOCKET-2024-8812";

  const [selectedIssueId, setSelectedIssueId] = React.useState("iss-1");
  const [inputText, setInputText] = React.useState("");
  const [selectedExhibit, setSelectedExhibit] = React.useState("Exhibit P-4 (Page 42)");
  const [isAudioMode, setIsAudioMode] = React.useState(false);
  const [transcriptNotice, setTranscriptNotice] = React.useState<string | null>(null);

  const [messages, setMessages] = React.useState<SparringMessage[]>([
    {
      id: "msg-1",
      sender: "bench",
      title: "Hon'ble Justice P. B. Sengupta",
      role: "Presiding Judge",
      timestamp: "10:32 AM",
      text: "Counsel, before you touch upon the merits of the tender cancellation, address us on maintainability. The respondent has placed the arbitration clause at Page 118 of the contract book. Why should the extraordinary writ jurisdiction under Article 226 be invoked when an efficacious alternate remedy exists?",
      citations: [
        { title: "Whirlpool Corporation v. Registrar of Trade Marks (1998) 8 SCC 1", pin: "Para 15", verified: true }
      ]
    },
    {
      id: "msg-2",
      sender: "opposing",
      title: "Senior Advocate Mr. R. Khurana",
      role: "Opposing Counsel (Respondent No. 1)",
      timestamp: "10:33 AM",
      objectionType: "Preliminary Objection",
      text: "We vehemently object to the petition. The petitioner had previously invoked dispute resolution meetings under Clause 28.2 without raising any constitutional plea. This writ petition is purely an afterthought to circumvent pre-deposit mandates.",
      citations: [
        { title: "State of U.P. v. Bridge & Roof Co. (1996) 6 SCC 22", pin: "Para 21", verified: true }
      ]
    },
    {
      id: "msg-3",
      sender: "coach",
      title: "Courtroom Coach (Chamber Intelligence)",
      role: "Strategic Whisperer",
      timestamp: "10:33 AM",
      critiqueScore: 84,
      text: "Judicial hostility detected on alternative remedy. Rebut directly under the Whirlpool exception: show that Respondent No. 1's cancellation violated natural justice (audi alteram partem) because no show cause notice was issued before blacklisting. Refer to Exhibit P-4 at Page 42.",
      citations: [
        { title: "M.P. Power Management v. Sky Power (2023) 2 SCC 703", pin: "Para 54", verified: true }
      ]
    }
  ]);

  const currentIssue = MOCK_ISSUES.find((i) => i.id === selectedIssueId) || MOCK_ISSUES[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: SparringMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      title: "Counsel for Petitioner (You)",
      role: "Advocate on Record",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputText,
      citations: [
        { title: "M.P. Power Management (2023) 2 SCC 703", pin: "Para 54", verified: true }
      ]
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate adversarial counter response after 600ms
    setTimeout(() => {
      const benchReply: SparringMessage = {
        id: `bench-${Date.now()}`,
        sender: "bench",
        title: "Hon'ble Justice P. B. Sengupta",
        role: "Presiding Judge",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: "Counsel, even conceding that natural justice was compromised, what is the grave prejudice caused when your client failed to furnish the bank guarantee extension within the 30-day statutory grace period noted at Exhibit R-2?",
        citations: [
          { title: "Radhakrishna Agarwal v. State of Bihar (1977) 3 SCC 457", pin: "Para 10", verified: true }
        ]
      };

      const coachFeedback: SparringMessage = {
        id: `coach-${Date.now()}`,
        sender: "coach",
        title: "Courtroom Coach",
        role: "Strategic Whisperer",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        critiqueScore: 91,
        text: "Strong recovery on the natural justice point. Now address the bank guarantee grace period: cite Exhibit P-9 (Letter dated 14 Feb 2024) where the bank confirmed technical outage on SFMS. This negates wilful default.",
        citations: [
          { title: "Exhibit P-9, Record Page 68", pin: "Para 3", verified: true }
        ]
      };

      setMessages((prev) => [...prev, benchReply, coachFeedback]);
    }, 600);
  };

  const handleResetSession = () => {
    if (confirm("Reset current sparring session back to opening exchange?")) {
      setMessages(messages.slice(0, 3));
    }
  };

  const handleExportTranscript = () => {
    setTranscriptNotice("Sparring session transcript compiled with verified citation pins. Ready for chamber review.");
    setTimeout(() => setTranscriptNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1.5">
            <Link href="/app" className="hover:text-foreground">Docket Index</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/app/cases/${caseId}`} className="hover:text-foreground">{caseId}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Courtroom Sparring Arena</span>
          </div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Scale className="h-7 w-7 text-vermilion" />
            Simulated Courtroom Sparring
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
            Adversarial simulation testing oral arguments against judicial skepticism, senior opposing counsel objections, and live chamber coaching.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="font-mono text-xs"
            onClick={() => setIsAudioMode(!isAudioMode)}
          >
            {isAudioMode ? <Volume2 className="h-3.5 w-3.5 mr-1 text-vermilion" /> : <VolumeX className="h-3.5 w-3.5 mr-1 text-muted-foreground" />}
            {isAudioMode ? "Audio Synthesis Active" : "Silent Text Mode"}
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="font-mono text-xs"
            onClick={handleExportTranscript}
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Export Transcript
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            className="font-mono text-xs text-danger hover:text-danger"
            onClick={handleResetSession}
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {transcriptNotice && (
        <div className="bg-paper-warm border border-primary/20 p-3 rounded-none flex items-center gap-2 text-xs font-mono text-primary animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-vermilion" />
          <span>{transcriptNotice}</span>
        </div>
      )}

      {/* Mandatory Regulatory Disclaimer */}
      <div className="p-3 bg-muted/40 border-l-2 border-vermilion text-xs text-muted-foreground flex items-start gap-2.5">
        <Info className="h-4 w-4 text-vermilion shrink-0 mt-0.5" />
        <div>
          <strong className="text-foreground font-medium">Chamber Practice Disclaimer: </strong>
          This arena is an adversarial preparation tool for enrolled advocates. Simulation agents rely strictly on indexed case record documents and verified SC/HC authorities. It does not replace independent forensic analysis or tender legal advice.
        </div>
      </div>

      {/* Issue Selector Header Bar */}
      <div className="bg-card border border-border p-4 rounded-none space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-vermilion" />
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Active Legal Issue in Dispute</span>
          </div>
          <Badge variant="neutral" className="font-mono text-[10px]">
            Difficulty: {currentIssue.difficulty}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {MOCK_ISSUES.map((issue) => {
            const isSelected = issue.id === selectedIssueId;
            return (
              <button
                key={issue.id}
                onClick={() => setSelectedIssueId(issue.id)}
                className={`text-left p-3 border transition-colors text-xs ${
                  isSelected
                    ? "border-vermilion bg-paper-warm text-foreground font-medium shadow-sm"
                    : "border-border bg-background hover:bg-muted/40 text-muted-foreground"
                }`}
              >
                <div className="font-serif font-bold text-sm text-foreground line-clamp-1 mb-1">
                  {issue.title}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground line-clamp-1">
                  {issue.forum}
                </div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs border-t border-border/60">
          <div>
            <span className="font-mono text-muted-foreground">Bench Profile: </span>
            <span className="font-serif italic text-foreground">{currentIssue.benchPersonality}</span>
          </div>
          <div>
            <span className="font-mono text-muted-foreground">Opposing Persona: </span>
            <span className="font-serif italic text-foreground">{currentIssue.opposingProfile}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Dialogue & Sparring Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Columns: Sparring Transcript & Live Argue Box */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Scrollable Dialogue Area */}
          <div className="bg-card border border-border p-4 min-h-[460px] max-h-[600px] overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const isBench = msg.sender === "bench";
              const isOpposing = msg.sender === "opposing";

              return (
                <div
                  key={msg.id}
                  className={`p-4 border transition-all ${
                    isUser
                      ? "border-primary/40 bg-paper-warm ml-6 md:ml-12"
                      : isBench
                      ? "border-border bg-card mr-6 md:mr-12"
                      : isOpposing
                      ? "border-vermilion/40 bg-vermilion/5 mr-6 md:mr-12"
                      : "border-emerald-700/30 bg-emerald-50/50 dark:bg-emerald-950/20 mx-2"
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        isUser ? "bg-primary" : isBench ? "bg-amber-600" : isOpposing ? "bg-vermilion" : "bg-emerald-600"
                      }`} />
                      <span className="font-serif font-bold text-sm text-foreground">{msg.title}</span>
                      <span className="text-xs font-mono text-muted-foreground">({msg.role})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {msg.objectionType && (
                        <Badge variant="overruled" className="text-[10px] uppercase font-mono">
                          {msg.objectionType}
                        </Badge>
                      )}
                      {msg.critiqueScore && (
                        <Badge variant="verified" className="text-[10px] font-mono">
                          Preparedness Score: {msg.critiqueScore}%
                        </Badge>
                      )}
                      <span className="text-[10px] font-mono text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap font-sans">
                    {msg.text}
                  </p>

                  {/* Linked Authorities / Pin Citations */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap gap-2">
                      <span className="text-[11px] font-mono text-muted-foreground self-center">Referenced Authority:</span>
                      {msg.citations.map((cite, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono bg-background border border-border text-foreground hover:border-vermilion cursor-pointer"
                        >
                          <BookOpen className="h-3 w-3 text-vermilion" />
                          <span>{cite.title}</span>
                          <span className="text-muted-foreground">({cite.pin})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Input Form */}
          <form onSubmit={handleSendMessage} className="bg-card border border-border p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Your Turn: Oral Submission as Counsel</span>
              <div className="flex items-center gap-2">
                <span>Tender Record Exhibit:</span>
                <select 
                  value={selectedExhibit}
                  onChange={(e) => setSelectedExhibit(e.target.value)}
                  className="bg-background border border-border px-2 py-1 text-xs font-mono text-foreground focus:outline-none focus:border-vermilion"
                >
                  <option value="Exhibit P-4 (Page 42)">Exhibit P-4 (Show Cause Deficiency, Page 42)</option>
                  <option value="Exhibit P-9 (Page 68)">Exhibit P-9 (Bank SFMS Outage Certificate, Page 68)</option>
                  <option value="Annexure A-1 (Page 12)">Annexure A-1 (Original Tender Notification, Page 12)</option>
                  <option value="Clause 28.2 (Contract Book)">Clause 28.2 (Dispute Escalation, Page 118)</option>
                </select>
              </div>
            </div>

            <Textarea
              placeholder="State your proposition, distinguish the adverse precedent, or tender the record exhibit. Press Enter or click 'Submit Oral Argument'..."
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="resize-none font-sans text-sm focus:border-vermilion"
            />

            <div className="flex items-center justify-between pt-1">
              <div className="text-xs text-muted-foreground font-mono">
                Tip: Quote exact paragraph numbers or tender verified record pins for maximum judicial persuasion score.
              </div>
              <Button type="submit" variant="primary" size="md" disabled={!inputText.trim()} className="font-mono text-xs">
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Submit Oral Argument
              </Button>
            </div>
          </form>

        </div>

        {/* Right 4 Columns: Forensic Scoring & Chamber Repertoire */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Chamber Scorecard */}
          <Card className="rounded-none border-border">
            <CardHeader className="pb-3 border-b border-border bg-paper-warm/50">
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-base font-bold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-vermilion" />
                  Forensic Performance
                </CardTitle>
                <Badge variant="verified" className="font-mono text-[10px]">
                  Passing Grade: 88%
                </Badge>
              </div>
              <CardDescription className="text-xs font-mono">
                Real-time metrics on judicial persuasion & objection handling
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-muted-foreground">Factual Grounding (Record Pages):</span>
                  <span className="font-bold text-foreground">94%</span>
                </div>
                <div className="w-full bg-muted h-1.5 overflow-hidden">
                  <div className="bg-emerald-600 h-1.5" style={{ width: "94%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-muted-foreground">Citation Integrity (Non-Overruled):</span>
                  <span className="font-bold text-foreground">100%</span>
                </div>
                <div className="w-full bg-muted h-1.5 overflow-hidden">
                  <div className="bg-primary h-1.5" style={{ width: "100%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono mb-1">
                  <span className="text-muted-foreground">Composure under Judicial Inquiry:</span>
                  <span className="font-bold text-foreground">78%</span>
                </div>
                <div className="w-full bg-muted h-1.5 overflow-hidden">
                  <div className="bg-amber-600 h-1.5" style={{ width: "78%" }} />
                </div>
              </div>

              <div className="pt-2 border-t border-border/60 text-muted-foreground text-[11px] leading-relaxed">
                <strong className="text-foreground">Tactical Alert: </strong>
                The Bench is testing your adherence to the 3-judge bench ruling in <em>Whirlpool</em>. Emphasize that alternate dispute resolution cannot cure an unconstitutional blacklisting order.
              </div>
            </CardContent>
          </Card>

          {/* Quick Authority Counter-Arsenal */}
          <Card className="rounded-none border-border">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="font-serif text-base font-bold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Quick Authority Arsenal
              </CardTitle>
              <CardDescription className="text-xs font-mono">
                Click to copy citation proposition to argument box
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-3 divide-y divide-border/60">
              <div 
                className="py-2.5 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setInputText((prev) => prev ? `${prev} My Lords, as settled in Whirlpool Corp (1998) 8 SCC 1, alternative remedy does not operate as a bar where the writ petition has been filed for enforcement of fundamental rights or where there has been a violation of natural justice.` : "My Lords, as settled in Whirlpool Corp (1998) 8 SCC 1, alternative remedy does not operate as a bar where the writ petition has been filed for enforcement of fundamental rights or where there has been a violation of natural justice.")}
              >
                <div className="font-serif font-bold text-xs text-foreground">Whirlpool Corp v. Registrar of Trade Marks</div>
                <div className="font-mono text-[11px] text-vermilion">(1998) 8 SCC 1 • Para 15</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Exceptions to alternate remedy bar: natural justice, lack of jurisdiction.</div>
              </div>

              <div 
                className="py-2.5 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setInputText((prev) => prev ? `${prev} As held in Harbanslal Sahnia (2003) 2 SCC 107, contingency of arbitrary cancellation of dealership justified writ intervention despite arbitration clause.` : "As held in Harbanslal Sahnia (2003) 2 SCC 107, contingency of arbitrary cancellation of dealership justified writ intervention despite arbitration clause.")}
              >
                <div className="font-serif font-bold text-xs text-foreground">Harbanslal Sahnia v. Indian Oil Corp</div>
                <div className="font-mono text-[11px] text-vermilion">(2003) 2 SCC 107 • Para 7</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Reiteration of Whirlpool in commercial contract termination context.</div>
              </div>

              <div 
                className="py-2.5 cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setInputText((prev) => prev ? `${prev} Furthermore, M.P. Power Management (2023) 2 SCC 703 confirms that State instrumentality contract cancellation remains amenable to judicial review.` : "Furthermore, M.P. Power Management (2023) 2 SCC 703 confirms that State instrumentality contract cancellation remains amenable to judicial review.")}
              >
                <div className="font-serif font-bold text-xs text-foreground">M.P. Power Management v. Sky Power</div>
                <div className="font-mono text-[11px] text-vermilion">(2023) 2 SCC 703 • Para 54</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Arbitrary state action under contractual guise violates Article 14.</div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
