import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  ShieldAlert,
  Compass,
  ArrowRight,
  Clock,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { CopilotMessage } from '../types/drilling';

interface CopilotViewProps {
  messages: CopilotMessage[];
  onSendMessage: (query: string) => void;
  onOpenDocument: (docId: string) => void;
  onSelectWell: (wellId: string) => void;
  onNavigateToRisk: () => void;
  presetQueries: string[];
}

export const CopilotView: React.FC<CopilotViewProps> = ({
  messages,
  onSendMessage,
  onOpenDocument,
  onSelectWell,
  onNavigateToRisk,
  presetQueries
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    onSendMessage(inputQuery.trim());
    setInputQuery('');
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-white shadow">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white">NWIS Copilot</h1>
                <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded">
                  OILFIELD LLM REASONING
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Grounding decision support with audited well completion reports, real-time eRTMAC telemetry, and offset well incidents.
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE CONTEXT</div>
            <div className="text-xs font-mono font-bold text-emerald-400">OIL-101 at 2,765.4 m</div>
          </div>
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 bg-[#090d16] border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender bubble */}
            <div
              className={`max-w-3xl rounded-xl p-4 text-xs ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium ml-12 shadow'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 mr-12 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-black/10 dark:border-slate-800/80">
                <span className="font-bold text-[11px] flex items-center gap-1.5">
                  {msg.sender === 'user' ? (
                    'Drilling Engineer'
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-purple-300">NWIS Copilot (Evidence-Grounded)</span>
                    </>
                  )}
                </span>
                <span className="font-mono text-[10px] opacity-70">{msg.timestamp}</span>
              </div>

              {/* Main Text Content */}
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

              {/* Structured Forensic Response Box */}
              {msg.structuredResponse && (
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                  {/* 1. Answer */}
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-purple-400 uppercase font-bold mb-1">
                      1. Concise Engineering Answer
                    </div>
                    <div className="text-slate-100 font-semibold leading-relaxed">
                      {msg.structuredResponse.answer}
                    </div>
                  </div>

                  {/* 2. Evidence */}
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-amber-400 uppercase font-bold mb-1.5">
                      2. Supporting Historical Evidence ({msg.structuredResponse.evidence.length} Incidents)
                    </div>
                    <div className="space-y-1.5">
                      {msg.structuredResponse.evidence.map((ev, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center justify-between text-[11px]"
                        >
                          <div>
                            <span className="font-bold text-white font-mono">{ev.wellId} at {ev.depth} m:</span>{' '}
                            <span className="text-slate-300">{ev.event}</span>
                            <div className="text-[10px] text-slate-400">{ev.details}</div>
                          </div>
                          <button
                            onClick={() => onSelectWell(ev.wellId)}
                            className="text-sky-400 hover:underline shrink-0 text-[10px] font-mono ml-2"
                          >
                            Inspect Well →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Depth Interval */}
                  <div className="flex items-center justify-between bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800 text-[11px]">
                    <span className="font-mono text-slate-400 uppercase">3. Relevant Depth Window:</span>
                    <span className="font-mono font-bold text-amber-300">{msg.structuredResponse.depthInterval}</span>
                  </div>

                  {/* 4. Recommended Operational Monitoring */}
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-1.5">
                      4. Non-Prescriptive Operational Recommendations
                    </div>
                    <ul className="space-y-1">
                      {msg.structuredResponse.recommendedMonitoring.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 5. Clickable Sources */}
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                    <div className="text-[10px] font-mono text-sky-400 uppercase font-bold mb-1.5">
                      5. Auditable Source Documents
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.structuredResponse.sources.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => onOpenDocument(s.docId)}
                          className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-700 text-[10px] font-mono flex items-center gap-1.5 transition-colors"
                        >
                          <FileText className="w-3 h-3 text-sky-400" />
                          <span>{s.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Preset Query Chips */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>SUGGESTED OILFIELD INQUIRIES:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(q)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-xs transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Query Input Box */}
      <form onSubmit={handleSubmit} className="shrink-0 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask NWIS Copilot about offset well history, stuck pipe mitigation, mud losses..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="px-4 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
