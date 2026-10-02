import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  HelpCircle,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bot,
  ExternalLink,
  ArrowRight,
  Sliders,
  Sparkles
} from 'lucide-react';
import { RiskAlert, RealtimeTelemetry } from '../types/drilling';

interface RiskAlertsViewProps {
  alerts: RiskAlert[];
  telemetry: RealtimeTelemetry;
  onSelectWell: (wellId: string) => void;
  onOpenDocument: (docId: string) => void;
  onAskCopilot: (query: string) => void;
}

export const RiskAlertsView: React.FC<RiskAlertsViewProps> = ({
  alerts,
  telemetry,
  onSelectWell,
  onOpenDocument,
  onAskCopilot
}) => {
  const [selectedAlertId, setSelectedAlertId] = useState<string>(alerts[0].id);
  const [expandedWhyAlert, setExpandedWhyAlert] = useState<boolean>(true);

  const selectedAlert = alerts.find(a => a.id === selectedAlertId) || alerts[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-extrabold text-white">Proactive Risk &amp; Early-Warning System</h1>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Deterministic, explainable AI model correlating real-time drilling trends against offset well failure archives. Predictions represent <strong className="text-amber-300">historical vulnerability probabilities</strong>, not absolute certainties.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800">
            <span>Current Bit Depth:</span>
            <span className="text-emerald-400 font-bold text-sm">{telemetry.depth.toFixed(1)} m</span>
          </div>
        </div>

        {/* Risk Alerts Filter / Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800">
          {alerts.map((alert) => {
            const isSelected = alert.id === selectedAlert.id;
            const distance = Math.max(0, alert.depthStart - telemetry.depth);
            return (
              <button
                key={alert.id}
                onClick={() => setSelectedAlertId(alert.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.2 rounded border ${
                      alert.riskLevel === 'Elevated' || alert.riskLevel === 'High'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {alert.riskLevel} Risk
                  </span>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    ~{distance.toFixed(1)} m ahead
                  </span>
                </div>

                <div className="font-bold text-xs mt-2 text-white line-clamp-1">
                  {alert.title}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Interval: {alert.depthStart} - {alert.depthEnd} m
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Alert Forensic Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detailed Alert Breakdown & Explainable AI */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    POTENTIAL HAZARD ZONE DETECTED
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs font-mono text-slate-400">Alert #{selectedAlert.id}</span>
                </div>
                <h2 className="text-xl font-extrabold text-white mt-1">
                  {selectedAlert.title}
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Target Depth Interval: <strong className="text-white font-mono">{selectedAlert.depthStart} – {selectedAlert.depthEnd} m MD</strong> ({selectedAlert.formation})
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[10px] font-mono text-slate-400 uppercase">PROXIMITY TO BIT</div>
                <div className="text-2xl font-mono font-extrabold text-amber-400">
                  {Math.max(0, selectedAlert.depthStart - telemetry.depth).toFixed(1)} <span className="text-xs text-slate-400">m</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Current: {telemetry.depth.toFixed(1)} m</div>
              </div>
            </div>

            {/* Geological & Operational Risk Context */}
            <div className="mt-4 p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold mb-1">
                Risk Characterization:
              </div>
              <p>{selectedAlert.explanation}</p>
            </div>

            {/* Explainable AI Panel: "Why this alert?" */}
            <div className="mt-4 bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setExpandedWhyAlert(!expandedWhyAlert)}
                className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-amber-300 hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Explainable AI Engine — Why was this alert triggered?</span>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    Confidence: {selectedAlert.confidencePct}%
                  </span>
                </div>
                {expandedWhyAlert ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expandedWhyAlert && (
                <div className="p-4 pt-0 border-t border-slate-900 space-y-3 text-xs">
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Rather than an unexplainable black-box prediction, this alert is generated by weighted multi-factor correlation between real-time eRTMAC surface drilling parameters and audited offset well events:
                  </p>

                  <div className="space-y-2">
                    {selectedAlert.featureWeights.map((f, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-200">{f.name}</span>
                          <span className="font-mono text-amber-400 font-bold">{f.weightPct}% weight</span>
                        </div>
                        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="bg-amber-500 h-full rounded-full"
                            style={{ width: `${f.weightPct}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-slate-400">{f.contribution}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Historical Precedent Wells Evidence */}
            <div className="mt-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">
                Documented Historical Incidents in this Depth Window:
              </div>
              <div className="space-y-2.5">
                {selectedAlert.evidence.historicalWells.map((hw, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 text-xs transition-colors"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-white font-mono text-sm">{hw.wellId} at {hw.depth} m</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {hw.severity}
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs mt-1.5">
                      <strong>Incident:</strong> {hw.event}
                    </p>

                    <div className="text-slate-400 text-[11px] mt-1">
                      <strong>Mitigation Applied:</strong> {hw.mitigationUsed}
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-900 text-[10px]">
                      <span className="text-emerald-400">Outcome: {hw.outcome}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectWell(hw.wellId)}
                          className="text-sky-400 hover:underline"
                        >
                          View Well →
                        </button>
                        <button
                          onClick={() => onOpenDocument(hw.sourceDocId)}
                          className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <FileText className="w-3 h-3" />
                          <span>View Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Operational Monitoring & Actionable Recommendations */}
        <div className="lg:col-span-4 space-y-4">
          {/* Recommended Operational Monitoring Checklist */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2.5 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recommended Operational Monitoring</span>
            </h3>

            <ul className="space-y-3 text-xs">
              {selectedAlert.recommendedMonitoring.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                  <span className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold border border-emerald-800">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 leading-snug">{rec}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">Preemptive Mitigation Actions:</div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedAlert.recommendedMitigation.map((mit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span className="leading-snug">{mit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Copilot Deep-Dive Action */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <button
                onClick={() => onAskCopilot(`Explain mitigation options and history for ${selectedAlert.title}`)}
                className="w-full py-2 px-3 bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 border border-purple-800/80 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>Ask Copilot for Mitigation Details</span>
              </button>
            </div>
          </div>

          {/* Core Decision Support Notice */}
          <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4 text-[11px] text-slate-400 space-y-1.5">
            <div className="font-mono text-slate-300 font-bold uppercase">DECISION-SUPPORT NOTICE:</div>
            <p>
              NWIS does not make autonomous rig decisions. Final drilling decisions rest exclusively with the Chief Drilling Engineer and Rig Superintendent according to Oil India Limited standard operating procedures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
