import React, { useState } from 'react';
import {
  Activity,
  Layers,
  Search,
  Bell,
  Compass,
  Play,
  Pause,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { RealtimeTelemetry, OffsetWell, RiskAlert } from '../types/drilling';

interface HeaderProps {
  telemetry: RealtimeTelemetry;
  isSimulating: boolean;
  onToggleSimulate: () => void;
  wells: OffsetWell[];
  selectedWellId: string;
  onSelectWell: (wellId: string) => void;
  alerts: RiskAlert[];
  onOpenAlerts: () => void;
  onOpenCopilotQuery: (query: string) => void;
  onStartWorkflowTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  telemetry,
  isSimulating,
  onToggleSimulate,
  wells,
  selectedWellId,
  onSelectWell,
  alerts,
  onOpenAlerts,
  onOpenCopilotQuery,
  onStartWorkflowTour
}) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const elevatedAlerts = alerts.filter(a => a.riskLevel === 'Elevated' || a.riskLevel === 'High' || a.riskLevel === 'Critical');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onOpenCopilotQuery(searchQuery.trim());
    setShowSearchModal(false);
    setSearchQuery('');
  };

  const sampleSearchQueries = [
    'What happened around 2850m in nearby wells?',
    'Show mud loss incidents in Barail Sandstone',
    'Which nearby wells had stuck pipe?',
    'What mitigation was used for losses in OIL-097?',
    'Why is 2800–2900m considered a risk zone?'
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0d131f] border-b border-slate-800 text-slate-100 shadow-md">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 gap-4">
          {/* Brand & eRTMAC-NWIS Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-extrabold text-slate-950 text-xs tracking-wider shadow">
                OIL
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm tracking-wide text-white">WellWise Ai</span>
                  <span className="text-[11px] text-amber-400 font-mono font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    Nearby Wells Intelligence
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 leading-none">
                  Oil India Limited · Assam Asset Real-Time Operations
                </div>
              </div>
            </div>

            {/* Synthetic Data Notice */}
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900/80 border border-slate-800 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span>SYNTHETIC DEMO DATA</span>
            </div>
          </div>

          {/* Active Well & Key Telemetry Status Strip */}
          <div className="flex items-center gap-3 overflow-x-auto py-0.5 no-scrollbar text-xs">
            {/* Well Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-2.5 py-1">
              <span className="text-[10px] uppercase font-mono text-slate-400">Well:</span>
              <select
                aria-label="Active Well Selector"
                value={selectedWellId}
                onChange={(e) => onSelectWell(e.target.value)}
                className="bg-transparent font-bold text-amber-400 focus:outline-none cursor-pointer pr-1 text-xs"
              >
                {wells.map((w) => (
                  <option key={w.id} value={w.id} className="bg-slate-900 text-slate-200">
                    {w.id} {w.id === 'OIL-101' ? '(Active Rig)' : `(${w.distanceKm.toFixed(1)} km)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Depth */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-2.5 py-1">
              <span className="text-[10px] uppercase font-mono text-slate-400">Depth:</span>
              <span className="font-mono font-bold text-emerald-400 text-xs">
                {telemetry.depth.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">m</span>
              </span>
              <span className="text-[10px] text-slate-500">/ {telemetry.targetDepth}m</span>
            </div>

            {/* Current Formation */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-2.5 py-1">
              <span className="text-[10px] uppercase font-mono text-slate-400">Formation:</span>
              <span className="font-semibold text-sky-300 truncate max-w-[150px]">
                {telemetry.formation.replace(' Formation', '')}
              </span>
            </div>

            {/* Operational Status with Live Indicator */}
            <div className="hidden xl:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-medium text-slate-300">
                Rotary Drilling (On Bottom)
              </span>
            </div>

            {/* Realtime Simulation Toggle */}
            <button
              onClick={onToggleSimulate}
              title={isSimulating ? "Pause live simulation tick" : "Resume live simulation tick"}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono border transition-colors ${
                isSimulating
                  ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/40'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isSimulating ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-amber-400" />}
              <span>{isSimulating ? 'Stream: Live' : 'Stream: Paused'}</span>
            </button>
          </div>

          {/* Right Action Tools: Search, Alert Pill, Tour, Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 transition-colors"
              title="Search historical drilling records"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline text-[11px]">Search KB</span>
              <kbd className="hidden md:inline text-[9px] font-mono px-1 py-0.2 bg-slate-800 rounded text-slate-400">⌘K</kbd>
            </button>

            {/* Proactive Risk Alert Badge Button */}
            <button
              onClick={onOpenAlerts}
              className={`relative flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors ${
                elevatedAlerts.length > 0
                  ? 'bg-amber-950/60 border-amber-600/60 text-amber-300 hover:bg-amber-900/60'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
              title="View proactive risk alerts"
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${elevatedAlerts.length > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="font-bold text-[11px]">{elevatedAlerts.length} Risk Ahead</span>
              <span className="hidden lg:inline text-[10px] text-amber-400/80">(Loss zone ~35m)</span>
            </button>

            {/* Guided Tour Runner (19-Step Scenario Workflow) */}
            <button
              onClick={onStartWorkflowTour}
              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold rounded shadow transition-all"
              title="Run 19-step guided workflow demo"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Workflow Tour</span>
            </button>
          </div>
        </div>

        {/* Proactive Loss Warning Bar (Sticky Context Alert) */}
        <div className="bg-amber-500/10 border-t border-b border-amber-500/30 px-4 py-1 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="font-semibold text-amber-400 shrink-0">eRTMAC Proactive Risk Horizon:</span>
            <span className="truncate">
              Depleted Barail Sandstone Mud Loss Zone at <strong className="text-white">2,800–2,910 m</strong>. Current bit is <strong className="text-amber-300 font-mono">34.6 m</strong> above historical loss occurrences in OIL-097 &amp; OIL-099.
            </span>
          </div>
          <button
            onClick={onOpenAlerts}
            className="text-[11px] underline text-amber-300 hover:text-white shrink-0 ml-3 font-medium"
          >
            Review Evidence &amp; Pre-mix LCM →
          </button>
        </div>
      </header>

      {/* Global Knowledge Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl bg-[#0e1624] border border-slate-700 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-sm">NWIS Drilling Knowledge Repository Search</h3>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm px-2 py-1 rounded hover:bg-slate-800"
              >
                ✕ Esc
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-slate-800 bg-slate-900/40">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask a technical drilling question or search historical events (e.g., 'What happened around 2850m?')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 pl-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="absolute right-2 top-2 px-3 py-1 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">Suggested Oilfield Queries:</div>
              <div className="space-y-1.5">
                {sampleSearchQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onOpenCopilotQuery(q);
                      setShowSearchModal(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-300 hover:text-amber-300 flex items-center justify-between transition-colors group"
                  >
                    <span>{q}</span>
                    <span className="text-[10px] text-slate-500 group-hover:text-amber-400 font-mono">Ask Copilot →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
