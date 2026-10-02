import React, { useState } from 'react';
import {
  GitCompare,
  Check,
  Plus,
  X,
  AlertTriangle,
  ArrowRight,
  Layers,
  FileText,
  Sliders
} from 'lucide-react';
import { OffsetWell, HistoricalEvent } from '../types/drilling';

interface WellComparisonViewProps {
  wells: OffsetWell[];
  events: HistoricalEvent[];
  initialSelectedWellIds?: string[];
  onNavigateToWellIntel: (wellId: string) => void;
  onOpenDocument: (docId: string) => void;
}

export const WellComparisonView: React.FC<WellComparisonViewProps> = ({
  wells,
  events,
  initialSelectedWellIds = ['OIL-101', 'OIL-097', 'OIL-098'],
  onNavigateToWellIntel,
  onOpenDocument
}) => {
  const [selectedWellIds, setSelectedWellIds] = useState<string[]>(initialSelectedWellIds);

  const toggleWell = (wellId: string) => {
    if (selectedWellIds.includes(wellId)) {
      if (selectedWellIds.length <= 2) return; // Keep at least 2
      setSelectedWellIds(selectedWellIds.filter(id => id !== wellId));
    } else {
      if (selectedWellIds.length >= 5) return; // Max 5
      setSelectedWellIds([...selectedWellIds, wellId]);
    }
  };

  const comparedWells = wells.filter(w => selectedWellIds.includes(w.id));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-sky-400" />
              <h1 className="text-xl font-extrabold text-white">Multi-Well Offset Correlation &amp; Comparison</h1>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Side-by-side engineering comparison between active well <strong className="text-emerald-400 font-mono">OIL-101</strong> and historical offset reference wells.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Comparing <strong className="text-white font-mono">{comparedWells.length}</strong> of 5 maximum wells
          </div>
        </div>

        {/* Well Toggle Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800">
          <span className="text-[10px] font-mono uppercase text-slate-400 mr-1">Select Wells (2-5):</span>
          {wells.slice(0, 8).map((w) => {
            const isSelected = selectedWellIds.includes(w.id);
            return (
              <button
                key={w.id}
                onClick={() => toggleWell(w.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-950 border-sky-600 text-sky-300 font-bold shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-sky-400" />}
                <span>{w.id}</span>
                {w.id === 'OIL-101' && <span className="text-[9px] text-emerald-400 font-bold">(Active)</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="p-3 w-48 sticky left-0 bg-slate-950 z-10 border-r border-slate-800">
                  ENGINEERING METRIC
                </th>
                {comparedWells.map((w) => (
                  <th key={w.id} className="p-3 min-w-[200px] border-r border-slate-800 last:border-r-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-sm">{w.id}</span>
                      {w.id === 'OIL-101' ? (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
                          ACTIVE
                        </span>
                      ) : (
                        <button
                          onClick={() => toggleWell(w.id)}
                          className="text-slate-500 hover:text-slate-300"
                          title="Remove well"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5 font-sans">
                      {w.distanceKm === 0 ? 'Surface 0 km' : `${w.distanceKm.toFixed(2)} km offset`}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {/* Row 1: Status & Field */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Status / Field
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0 text-slate-200">
                    <div>{w.status}</div>
                    <div className="text-[10px] text-slate-400">{w.field}</div>
                  </td>
                ))}
              </tr>

              {/* Row 2: Depths */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Current Depth / TD
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0 font-mono">
                    <span className="font-bold text-white">{w.currentDepth} m</span>
                    <span className="text-slate-500"> / TD: {w.totalDepth} m</span>
                  </td>
                ))}
              </tr>

              {/* Row 3: Trajectory */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Trajectory &amp; Inclination
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0 text-slate-200">
                    <div>{w.trajectory}</div>
                    <div className="text-[10px] font-mono text-slate-400">Max Inc: {w.maxInclination}°</div>
                  </td>
                ))}
              </tr>

              {/* Row 4: Similarity to OIL-101 */}
              <tr className="hover:bg-slate-800/30 bg-sky-950/10">
                <td className="p-3 font-semibold text-sky-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Similarity Score (vs OIL-101)
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0">
                    <div className="font-bold font-mono text-sky-400 text-sm">
                      {w.similarity.overall.toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Fm: {w.similarity.formation}% · Loc: {w.similarity.location}%
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 5: Barail Pay Zone Behavior */}
              <tr className="hover:bg-slate-800/30 bg-amber-950/20">
                <td className="p-3 font-semibold text-amber-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Barail Sandstone Behavior (2,800–2,910 m)
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0">
                    {w.id === 'OIL-101' && (
                      <span className="text-amber-400 font-bold text-xs">
                        ⚠️ Approaching zone (34.6 m ahead)
                      </span>
                    )}
                    {w.id === 'OIL-097' && (
                      <div>
                        <div className="text-amber-400 font-bold">Severe Mud Loss at 2,840 m</div>
                        <div className="text-[10px] text-slate-300">45 bbl/hr loss · 35 bbl LCM pill cured</div>
                      </div>
                    )}
                    {w.id === 'OIL-098' && (
                      <div>
                        <div className="text-amber-400 font-bold">Partial Loss at 2,890 m</div>
                        <div className="text-[10px] text-slate-300">18 bbl/hr loss · reduced pump rate to 520 gpm</div>
                      </div>
                    )}
                    {w.id === 'OIL-099' && (
                      <div>
                        <div className="text-rose-400 font-bold">Total Mud Loss at 2,875 m</div>
                        <div className="text-[10px] text-slate-300">60 bbl/hr loss · bentonite/cement plug required</div>
                      </div>
                    )}
                    {w.id === 'OIL-100' && (
                      <div>
                        <div className="text-slate-300 font-semibold">12 bbl/hr seepage at 2,835 m</div>
                        <div className="text-[10px] text-slate-400">15 ppb CaCO3 stopped loss in 35 min</div>
                      </div>
                    )}
                    {w.id === 'OIL-102' && (
                      <div>
                        <div className="text-emerald-400 font-semibold">Nominal with 1.24 SG mud</div>
                        <div className="text-[10px] text-slate-400">Continuous fine marble bridging</div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row 6: Mud Program & ECD */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Mud Weight / ECD in Section
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0 font-mono text-slate-200">
                    {w.id === 'OIL-101' && '1.28 SG (ECD 1.34 SG)'}
                    {w.id === 'OIL-097' && '1.29 SG (ECD 1.35 SG)'}
                    {w.id === 'OIL-098' && '1.27 SG (ECD 1.37 SG initially)'}
                    {w.id === 'OIL-099' && '1.31 SG (ECD 1.39 SG — High)'}
                    {w.id === 'OIL-100' && '1.26 SG (ECD 1.32 SG)'}
                    {w.id === 'OIL-102' && '1.24 SG (ECD 1.29 SG — Optimized)'}
                  </td>
                ))}
              </tr>

              {/* Row 7: NPT Breakdown */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Total NPT Incurred
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0 font-mono">
                    <span className="font-bold text-amber-400">{w.totalNptHours} hrs</span>
                    <div className="text-[10px] text-slate-400 font-sans">
                      Losses: {w.majorEventsCount.mudLoss} · Sticking: {w.majorEventsCount.stuckPipe}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 8: Rig & Operator */}
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-semibold text-slate-300 sticky left-0 bg-slate-900/95 z-10 border-r border-slate-800">
                  Rig &amp; Spud Date
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0 text-slate-300">
                    <div className="font-medium text-white">{w.rigName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{w.spudDate}</div>
                  </td>
                ))}
              </tr>

              {/* Row 9: Actions */}
              <tr className="bg-slate-950">
                <td className="p-3 font-semibold text-slate-300 sticky left-0 bg-slate-950 z-10 border-r border-slate-800">
                  Direct Actions
                </td>
                {comparedWells.map(w => (
                  <td key={w.id} className="p-3 border-r border-slate-800 last:border-r-0">
                    <button
                      onClick={() => onNavigateToWellIntel(w.id)}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                    >
                      <span>Well Intel</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
