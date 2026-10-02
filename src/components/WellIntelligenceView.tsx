import React, { useState } from 'react';
import {
  FileText,
  GitCompare,
  ArrowLeft,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  Compass,
  Layers,
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { OffsetWell, HistoricalEvent, SourceDocument } from '../types/drilling';

interface WellIntelligenceViewProps {
  wellId: string;
  wells: OffsetWell[];
  events: HistoricalEvent[];
  documents: SourceDocument[];
  onSelectWell: (wellId: string) => void;
  onCompareWithActive: (wellId: string) => void;
  onOpenDocument: (docId: string) => void;
  onNavigateToRisk: () => void;
}

export const WellIntelligenceView: React.FC<WellIntelligenceViewProps> = ({
  wellId,
  wells,
  events,
  documents,
  onSelectWell,
  onCompareWithActive,
  onOpenDocument,
  onNavigateToRisk
}) => {
  const currentWell = wells.find(w => w.id === wellId) || wells[1]; // default OIL-097
  const wellEvents = events.filter(e => e.wellId === currentWell.id).sort((a, b) => a.depth - b.depth);
  const wellDocs = documents.filter(d => d.wellId === currentWell.id);

  const [selectedEventId, setSelectedEventId] = useState<string>(
    wellEvents.length > 0 ? wellEvents[0].id : ''
  );

  const activeEvent = wellEvents.find(e => e.id === selectedEventId) || wellEvents[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Well Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                HISTORICAL OFFSET INTELLIGENCE
              </span>
              <span className="text-xs text-slate-400">· {currentWell.field}</span>
            </div>

            <div className="flex items-center gap-3 mt-1.5">
              <h1 className="text-2xl font-extrabold text-white font-mono">{currentWell.name}</h1>
              {currentWell.id !== 'OIL-101' && (
                <span className="text-xs text-sky-400 font-mono bg-sky-950/60 border border-sky-800/80 px-2 py-0.5 rounded">
                  {currentWell.distanceKm.toFixed(2)} km from Active Rig (Bearing: {currentWell.bearingDeg}°)
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 mt-1 max-w-3xl">
              {currentWell.summaryNotes}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Switch Well Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
              <span className="text-slate-400 font-mono text-[10px]">OFFSET WELL:</span>
              <select
                aria-label="Select Offset Reference Well"
                value={currentWell.id}
                onChange={(e) => onSelectWell(e.target.value)}
                className="bg-transparent font-bold text-amber-400 focus:outline-none cursor-pointer"
              >
                {wells.map((w) => (
                  <option key={w.id} value={w.id} className="bg-slate-900 text-slate-100">
                    {w.id} {w.id === 'OIL-101' ? '(Active)' : `(${w.distanceKm.toFixed(1)} km)`}
                  </option>
                ))}
              </select>
            </div>

            {currentWell.id !== 'OIL-101' && (
              <button
                onClick={() => onCompareWithActive(currentWell.id)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <GitCompare className="w-3.5 h-3.5 text-sky-400" />
                <span>Compare vs OIL-101</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Total Depth</div>
            <div className="text-base font-bold font-mono text-white mt-0.5">{currentWell.totalDepth} m</div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Trajectory</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{currentWell.trajectory}</div>
            <div className="text-[10px] text-slate-500 font-mono">Max: {currentWell.maxInclination}°</div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Drilling Dates</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">{currentWell.spudDate}</div>
            <div className="text-[10px] text-slate-500">to {currentWell.completionDate || 'Active'}</div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Total NPT Incurred</div>
            <div className="text-base font-bold font-mono text-amber-400 mt-0.5">{currentWell.totalNptHours} hrs</div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Rig Operator</div>
            <div className="text-xs font-bold text-slate-200 mt-0.5 truncate">{currentWell.rigName}</div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Similarity to OIL-101</div>
            <div className="text-base font-bold font-mono text-sky-400 mt-0.5">
              {currentWell.similarity.overall.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Historical Depth Timeline vs Selected Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Depth Ordered Historical Event Sequence */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">Historical Depth Chronology</h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{wellEvents.length} Recorded Events</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {/* Synthetic standard events along depth */}
            <div className="relative group">
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-900" />
              <div className="text-xs text-slate-400 font-mono">0 – 2,520 m</div>
              <div className="text-xs font-semibold text-slate-300">Surface to 9-5/8" Casing Shoe</div>
              <div className="text-[11px] text-slate-500">Normal drilling through Dihing and Girujan Clays</div>
            </div>

            {wellEvents.map((evt) => {
              const isSelected = activeEvent && activeEvent.id === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`relative p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-md translate-x-1'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-6 top-4 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                      evt.severity === 'Critical'
                        ? 'bg-rose-500 ring-2 ring-rose-500/30'
                        : evt.severity === 'High'
                        ? 'bg-amber-500 ring-2 ring-amber-500/30'
                        : 'bg-sky-500'
                    }`}
                  />

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-white text-sm">
                      {evt.depth} m
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        evt.severity === 'High' || evt.severity === 'Critical'
                          ? 'bg-amber-950 text-amber-300 border-amber-800'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {evt.severity} Severity
                    </span>
                  </div>

                  <div className="font-bold text-slate-100 text-xs mt-1">
                    {evt.eventType}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {evt.formation}
                  </div>

                  {evt.volumeLostBbl && (
                    <div className="text-[10px] font-mono text-amber-400 mt-1">
                      Lost Volume: {evt.volumeLostBbl} bbl · NPT: {evt.nptHours} hrs
                    </div>
                  )}
                </div>
              );
            })}

            <div className="relative group">
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-slate-700 border-2 border-slate-900" />
              <div className="text-xs text-slate-400 font-mono">{currentWell.totalDepth} m</div>
              <div className="text-xs font-semibold text-slate-300">Total Depth Reached</div>
              <div className="text-[11px] text-slate-500">7" Production Liner cemented</div>
            </div>
          </div>
        </div>

        {/* Right: Detailed Event Forensic Card & Document View */}
        <div className="lg:col-span-7 space-y-4">
          {activeEvent ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                      {activeEvent.eventType}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Event ID: {activeEvent.id}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white mt-1">
                    {activeEvent.eventType} at {activeEvent.depth} m MD
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Formation: <strong className="text-sky-300">{activeEvent.formation}</strong> · Date: {activeEvent.detectedDate}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">NPT Impact</div>
                  <div className="text-xl font-mono font-bold text-amber-400">{activeEvent.nptHours} hrs</div>
                  {activeEvent.volumeLostBbl && (
                    <div className="text-[10px] text-slate-400 font-mono">{activeEvent.volumeLostBbl} bbl fluid lost</div>
                  )}
                </div>
              </div>

              {/* 7-Part Structured Investigation Report */}
              <div className="space-y-4 mt-4">
                {/* 1. Probable Cause */}
                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-amber-400 uppercase font-bold mb-1">
                    1. Probable Root Cause Analysis
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeEvent.probableCause}
                  </p>
                </div>

                {/* 2. Action Taken */}
                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-sky-400 uppercase font-bold mb-1">
                    2. Immediate Operational Action Taken &amp; Mitigation
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeEvent.actionTaken}
                  </p>
                </div>

                {/* 3. Operational Outcome */}
                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-1">
                    3. Final Operational Outcome
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeEvent.outcome}
                  </p>
                </div>

                {/* 4. Source Document Reference & Button */}
                <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-0.5">
                      4. Auditable Source Document
                    </div>
                    <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activeEvent.sourceDocName}</span>
                    </div>
                    {activeEvent.sourceDocPage && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Indexed Page: {activeEvent.sourceDocPage}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenDocument(activeEvent.sourceDocId)}
                    className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Source Document</span>
                  </button>
                </div>

                {/* 5. Proactive Relevance to Active Well OIL-101 */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-amber-300">Relevance to Active Well (OIL-101):</strong> OIL-101 is currently at 2,765 m in the exact same Barail Sandstone formation. The historical loss interval at <strong className="text-white">2,840 m</strong> in {currentWell.id} indicates OIL-101 will enter this depleted zone in approximately <strong className="text-amber-300 font-mono">75 meters</strong>.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
              Select an event from the timeline to view technical details.
            </div>
          )}

          {/* Associated Documents for this Well */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Indexed Reports for {currentWell.id} ({wellDocs.length})
              </h4>
            </div>

            <div className="space-y-2">
              {wellDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => onOpenDocument(doc.id)}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800/80 rounded-lg border border-slate-800 flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">{doc.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{doc.docType} · {doc.fileSize}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-sky-400 font-mono">Open OCR →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
