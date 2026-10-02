import React, { useState } from 'react';
import {
  Layers,
  AlertTriangle,
  Droplet,
  Compass,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { FormationInfo, HistoricalEvent } from '../types/drilling';

interface FormationIntelligenceViewProps {
  formations: FormationInfo[];
  events: HistoricalEvent[];
  activeFormationName: string;
  onSelectWell: (wellId: string) => void;
  onNavigateToRisk: () => void;
  onOpenDocument: (docId: string) => void;
}

export const FormationIntelligenceView: React.FC<FormationIntelligenceViewProps> = ({
  formations,
  events,
  activeFormationName = 'Barail Sandstone Formation',
  onSelectWell,
  onNavigateToRisk,
  onOpenDocument
}) => {
  const [selectedFormationName, setSelectedFormationName] = useState<string>(activeFormationName);

  const selectedFormation =
    formations.find(f => f.name === selectedFormationName) || formations[5]; // Barail Sandstone

  const formationEvents = events.filter(e => e.formation.includes(selectedFormation.name.split(' ')[0]));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-400" />
              <h1 className="text-xl font-extrabold text-white">Stratigraphic Formation Intelligence</h1>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Geological formation hazard profiling and historical drilling vulnerability indexing across the Upper Assam Shelf Basin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Current Active Formation:</span>
            <span className="px-2.5 py-1 text-xs font-mono font-bold bg-sky-950 text-sky-300 border border-sky-800 rounded">
              Barail Sandstone (2,720 – 3,180 m)
            </span>
          </div>
        </div>

        {/* Stratigraphic Sequence Column Selector */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">
            Stratigraphic Column (Click formation to inspect):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {formations.map((f) => {
              const isSelected = selectedFormation.name === f.name;
              const isCurrentActive = f.name === 'Barail Sandstone Formation';
              return (
                <button
                  key={f.name}
                  onClick={() => setSelectedFormationName(f.name)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 text-white font-bold ring-1 ring-amber-500 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">{f.depthStart} - {f.depthEnd}m</span>
                    {isCurrentActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-xs font-bold mt-1 truncate">{f.name.replace(' Formation', '')}</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                    {f.mudLossFrequency}% Loss Rate
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Formation Detailed Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detailed Formation Hazard Matrix & Rock Physics */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedFormation.color }}
                  />
                  <h2 className="text-lg font-extrabold text-white">{selectedFormation.name}</h2>
                  <span className="text-xs text-slate-400 font-mono">({selectedFormation.age})</span>
                </div>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Depth Interval: <strong className="text-white">{selectedFormation.depthStart} – {selectedFormation.depthEnd} m</strong> (Thickness: {selectedFormation.depthEnd - selectedFormation.depthStart} m)
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">OFFSET WELLS DRILLED</div>
                <div className="text-lg font-mono font-bold text-sky-400">{selectedFormation.wellCount} Wells</div>
              </div>
            </div>

            {/* Critical Hazard Alert for Barail Depleted Sand (2,800-2,910m) */}
            {selectedFormation.name.includes('Barail') && (
              <div className="mt-4 p-3.5 bg-amber-500/15 border border-amber-500/40 rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-200">
                  <div className="font-bold text-amber-300 text-sm">
                    CRITICAL DEPLETED RESERVOIR ZONE (2,800 – 2,910 m)
                  </div>
                  <p className="mt-1 leading-relaxed">
                    Historical production from Barail Sandstone reservoir sands has caused sub-normal pore pressure drawdown (pore pressure gradient depleted to 0.98 - 1.04 SG equivalent). Under standard 1.28 - 1.34 SG drilling mud weight, hydrostatic overbalance exceeds 850 psi, causing frequent fracture propagation and sudden catastrophic losses.
                  </p>
                  <button
                    onClick={onNavigateToRisk}
                    className="mt-2 text-xs font-bold text-amber-300 hover:text-white underline flex items-center gap-1"
                  >
                    <span>View Proactive Mud Loss Risk Alert (34.6 m ahead) →</span>
                  </button>
                </div>
              </div>
            )}

            {/* Geological Lithology Description */}
            <div className="mt-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">Lithological Composition:</div>
              <p className="text-xs text-slate-200 bg-slate-950/70 p-3 rounded-lg border border-slate-800 leading-relaxed">
                {selectedFormation.lithology}
              </p>
            </div>

            {/* Formation Hazard Frequency Grid */}
            <div className="mt-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">Historical Incident Frequencies (% of Wells Drilled):</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center font-mono">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-sans">Mud Loss Incident</div>
                  <div className="text-xl font-bold text-amber-400 mt-1">{selectedFormation.mudLossFrequency}%</div>
                  <div className="text-[10px] text-slate-500 font-sans">Highest in field</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-sans">Stuck Pipe / Diff.</div>
                  <div className="text-xl font-bold text-purple-400 mt-1">{selectedFormation.stuckPipeFrequency}%</div>
                  <div className="text-[10px] text-slate-500 font-sans">Porous sands</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-sans">Kick Frequency</div>
                  <div className="text-xl font-bold text-rose-400 mt-1">{selectedFormation.kickFrequency}%</div>
                  <div className="text-[10px] text-slate-500 font-sans">Gas pockets</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-sans">Average NPT Hours</div>
                  <div className="text-xl font-bold text-white mt-1">{selectedFormation.avgNptHours}h</div>
                  <div className="text-[10px] text-slate-500 font-sans">per well section</div>
                </div>
              </div>
            </div>

            {/* Pore Pressure & Fracture Gradients */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">Pore Pressure &amp; Fracture Gradients:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Pore Pressure Grad.</span>
                  <span className="font-bold text-slate-200 font-mono">{selectedFormation.porePressureGradientSG} SG</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Fracture Gradient</span>
                  <span className="font-bold text-slate-200 font-mono">{selectedFormation.fractureGradientSG} SG</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Avg. Porosity</span>
                  <span className="font-bold text-slate-200 font-mono">{selectedFormation.porosityAvgPct}%</span>
                </div>
                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Avg. Permeability</span>
                  <span className="font-bold text-slate-200 font-mono">{selectedFormation.permeabilityAvgMd} mD</span>
                </div>
              </div>
            </div>

            {/* Operational Drilling Recommendations */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">Engineered Drilling Best Practices:</div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedFormation.drillingRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Documented Historical Incidents in this Formation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h3 className="font-bold text-sm text-white">
                Incidents in {selectedFormation.name.replace(' Formation', '')} ({formationEvents.length})
              </h3>
              <span className="text-xs text-slate-400 font-mono">Forensic NLP Extracted</span>
            </div>

            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {formationEvents.length > 0 ? (
                formationEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between font-bold text-white">
                      <span className="text-amber-300 font-mono">{evt.wellName} — {evt.eventType}</span>
                      <span className="text-emerald-400 font-mono">{evt.depth} m</span>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {evt.probableCause}
                    </p>

                    <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/80">
                      <strong className="text-slate-200">Mitigation:</strong> {evt.actionTaken}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                      <span>NPT: {evt.nptHours}h · {evt.detectedDate}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectWell(evt.wellId)}
                          className="text-sky-400 hover:underline"
                        >
                          View Well →
                        </button>
                        <button
                          onClick={() => onOpenDocument(evt.sourceDocId)}
                          className="text-amber-400 hover:underline flex items-center gap-0.5"
                        >
                          <FileText className="w-3 h-3" />
                          <span>WCR</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 text-xs italic py-8 text-center">
                  No major catastrophic events recorded for this formation in offset wells.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
