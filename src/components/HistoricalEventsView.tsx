import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  AlertTriangle,
  FileText,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Clock,
  MapPin
} from 'lucide-react';
import { HistoricalEvent, EventCategory, Severity } from '../types/drilling';

interface HistoricalEventsViewProps {
  events: HistoricalEvent[];
  onSelectWell: (wellId: string) => void;
  onOpenDocument: (docId: string) => void;
  onNavigateToRisk: () => void;
}

export const HistoricalEventsView: React.FC<HistoricalEventsViewProps> = ({
  events,
  onSelectWell,
  onOpenDocument,
  onNavigateToRisk
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedFormation, setSelectedFormation] = useState<string>('All');
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(25);

  const categories: EventCategory[] = [
    'Mud Loss',
    'Kick',
    'Stuck Pipe',
    'Differential Sticking',
    'Lost Circulation',
    'Torque Spike',
    'Overpressure',
    'Well Control Event',
    'Cementing Issue',
    'Fishing',
    'NPT',
    'Casing Issue',
    'Formation Instability'
  ];

  const formationsList = [
    'All',
    'Barail Sandstone Formation',
    'Tipam Sandstone Formation',
    'Girujan Clay Formation',
    'Kopili Shale Formation',
    'Surma Group',
    'Jaintia Group (Sylhet Limestone)'
  ];

  const filteredEvents = events.filter((evt) => {
    // text search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matches =
        evt.wellName.toLowerCase().includes(q) ||
        evt.eventType.toLowerCase().includes(q) ||
        evt.probableCause.toLowerCase().includes(q) ||
        evt.actionTaken.toLowerCase().includes(q) ||
        evt.formation.toLowerCase().includes(q) ||
        evt.outcome.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (selectedCategory !== 'All' && evt.eventType !== selectedCategory) return false;
    if (selectedSeverity !== 'All' && evt.severity !== selectedSeverity) return false;
    if (selectedFormation !== 'All' && evt.formation !== selectedFormation) return false;
    if (evt.distanceFromActiveKm > maxRadiusKm) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-extrabold text-white">Historical Drilling Hazard &amp; Event Repository</h1>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Curated forensic event database extracted via NLP from offset Well Completion Reports, Daily Drilling Reports, and NPT Post-Mortem investigations.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-amber-400">{filteredEvents.length}</strong> of {events.length} incidents
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 pt-4 border-t border-slate-800">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search event, cause, or mitigation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 pl-8 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>

          {/* Event Category Filter */}
          <div>
            <select
              aria-label="Event Category Filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Event Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <select
              aria-label="Severity Filter"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Formation Filter */}
          <div>
            <select
              aria-label="Stratigraphic Formation Filter"
              value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {formationsList.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Radius Filter */}
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs">
            <span className="text-slate-400 font-mono text-[10px] shrink-0">RADIUS:</span>
            <input
              type="range"
              min="2"
              max="25"
              value={maxRadiusKm}
              onChange={(e) => setMaxRadiusKm(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded"
            />
            <span className="font-mono text-amber-400 text-xs shrink-0">{maxRadiusKm}km</span>
          </div>
        </div>
      </div>

      {/* Events List Grid */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all shadow-md"
          >
            {/* Top Bar of Event Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                    evt.severity === 'Critical'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : evt.severity === 'High'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-sky-950 text-sky-300 border-sky-800'
                  }`}
                >
                  {evt.severity} {evt.eventType}
                </span>

                <span className="font-extrabold text-white font-mono text-base">{evt.wellName}</span>
                <span className="text-xs text-slate-400 font-mono">
                  at <strong className="text-emerald-400">{evt.depth} m</strong> MD
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span>{evt.distanceFromActiveKm.toFixed(2)} km from Active Well</span>
                <span>·</span>
                <span className="text-amber-400 font-bold">{evt.nptHours} hrs NPT</span>
              </div>
            </div>

            {/* 7-Part Structured Investigation Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 text-xs">
              {/* Part 1: What Happened & Location */}
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  What Happened &amp; Stratigraphy
                </div>
                <div className="font-semibold text-slate-200">
                  {evt.eventType} in {evt.formation}
                </div>
                <div className="text-slate-400 text-[11px]">
                  Detected on {evt.detectedDate} at depth of {evt.depth} m.
                  {evt.volumeLostBbl && ` Total volume lost: ${evt.volumeLostBbl} bbl.`}
                </div>
              </div>

              {/* Part 2: Possible Root Cause */}
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  Forensic Root Cause
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px]">
                  {evt.probableCause}
                </div>
              </div>

              {/* Part 3: What Was Done & Outcome */}
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                  Action Taken &amp; Result
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  <strong className="text-slate-200">Mitigation:</strong> {evt.actionTaken}
                </div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">
                  <strong className="text-emerald-400">Result:</strong> {evt.outcome}
                </div>
              </div>
            </div>

            {/* Bottom Cross-Links & Source */}
            <div className="flex flex-wrap items-center justify-between pt-3 mt-3 border-t border-slate-800/60 text-xs gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono">AUDITABLE SOURCE:</span>
                <button
                  onClick={() => onOpenDocument(evt.sourceDocId)}
                  className="text-sky-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{evt.sourceDocName}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectWell(evt.wellId)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded transition-colors flex items-center gap-1"
                >
                  <span>Explore {evt.wellName} Intel</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                {evt.eventType === 'Mud Loss' && (
                  <button
                    onClick={onNavigateToRisk}
                    className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-[11px] rounded transition-colors flex items-center gap-1 font-semibold"
                  >
                    <ShieldAlert className="w-3 h-3" />
                    <span>View Correlated Risk Alert</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
            No historical events match the current filter criteria. Try expanding the search radius or clearing category filters.
          </div>
        )}
      </div>
    </div>
  );
};
