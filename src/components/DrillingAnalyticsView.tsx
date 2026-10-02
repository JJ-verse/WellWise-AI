import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Clock,
  Layers,
  AlertTriangle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { OffsetWell, HistoricalEvent, FormationInfo } from '../types/drilling';

interface DrillingAnalyticsViewProps {
  wells: OffsetWell[];
  events: HistoricalEvent[];
  formations: FormationInfo[];
  onSelectWell: (wellId: string) => void;
}

export const DrillingAnalyticsView: React.FC<DrillingAnalyticsViewProps> = ({
  wells,
  events,
  formations,
  onSelectWell
}) => {
  // Aggregate stats
  const totalNptHours = wells.reduce((acc, w) => acc + w.totalNptHours, 0);
  const avgNptPerWell = (totalNptHours / wells.length).toFixed(1);
  const totalMudLossEvents = events.filter(e => e.eventType === 'Mud Loss' || e.eventType === 'Lost Circulation').length;
  const totalStuckPipeEvents = events.filter(e => e.eventType === 'Stuck Pipe' || e.eventType === 'Differential Sticking').length;
  const totalKickEvents = events.filter(e => e.eventType === 'Kick' || e.eventType === 'Well Control Event').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-extrabold text-white">Field-Wide Drilling Analytics &amp; Risk Benchmarks</h1>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Statistical patterns across 12 Nahorkatiya / Greater Duliajan wells. Correlating formation depths, NPT distribution, and operational failure modes.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Analyzed: <strong className="text-white">41,200 meters</strong> drilled across Upper Assam
          </div>
        </div>

        {/* High-Level Benchmark Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Total Field NPT Incurred</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">{totalNptHours} hrs</div>
            <div className="text-[10px] text-slate-500">Across 12 offset wells</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Avg NPT per Well</div>
            <div className="text-xl font-bold font-mono text-white mt-1">{avgNptPerWell} hrs</div>
            <div className="text-[10px] text-emerald-400">Target: &lt; 40 hrs</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Lost Circulation Incidents</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">{totalMudLossEvents}</div>
            <div className="text-[10px] text-slate-400">72% in Barail Sandstone</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Stuck Pipe Incidents</div>
            <div className="text-xl font-bold font-mono text-purple-400 mt-1">{totalStuckPipeEvents}</div>
            <div className="text-[10px] text-slate-400">Differential &amp; Mechanical</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Matrices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: NPT Breakdown by Event Category */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h2 className="text-sm font-bold text-white">NPT Distribution by Failure Mode (Hours)</h2>
            <span className="text-[10px] font-mono text-slate-400">Total: {totalNptHours}h</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Mud Losses */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-200">Lost Circulation / Mud Loss</span>
                <span className="font-mono text-amber-400 font-bold">198 hrs (37%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '37%' }} />
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Primary culprit: Depleted Barail pay sands (2,800-2,910m)</div>
            </div>

            {/* Stuck Pipe */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-200">Differential &amp; Mechanical Sticking</span>
                <span className="font-mono text-purple-400 font-bold">142 hrs (26%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '26%' }} />
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Thick mud cake &amp; prolonged stationary logging</div>
            </div>

            {/* Well Control / Kicks */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-200">Well Control Kicks (Gas Influx)</span>
                <span className="font-mono text-rose-400 font-bold">85 hrs (16%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '16%' }} />
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Entering overpressured Kopili Shale top (3,280m)</div>
            </div>

            {/* Cementing Remediation */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-200">Cementing Squeezes &amp; Channeling</span>
                <span className="font-mono text-sky-400 font-bold">64 hrs (12%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '12%' }} />
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">7" liner shoe squeeze jobs</div>
            </div>

            {/* Rig Equipment Breakdown */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-200">BHA / Top Drive / Pump Repairs</span>
                <span className="font-mono text-slate-400 font-bold">48 hrs (9%)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-600 h-full rounded-full" style={{ width: '9%' }} />
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Mud pump liner changeouts &amp; swivel packing</div>
            </div>
          </div>
        </div>

        {/* Right: Days vs Depth Drilling Curves */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h2 className="text-sm font-bold text-white">Days vs Depth Benchmark Curves</h2>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">OIL-101 Ahead of Plan</span>
          </div>

          <div className="h-64 relative bg-slate-950 rounded-lg border border-slate-800 p-2 flex items-center justify-center">
            <svg className="w-full h-full">
              {/* Grid lines */}
              <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

              {/* Planned Curve */}
              <polyline
                fill="none"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                points="10,10 80,60 160,110 240,150 320,190 400,230"
              />

              {/* Offset Average (with NPT flat spots) */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                points="10,10 70,55 120,90 120,140 180,180 230,195 280,230"
              />

              {/* Active Well OIL-101 (Cur: 2,765m at Day 48) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                points="10,10 65,50 140,100 210,145 285,185"
              />

              {/* Active Marker */}
              <circle cx="285" cy="185" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block" /> Active OIL-101 (Day 48, 2,765m)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-amber-400 inline-block" /> Offset Average (Historical)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-500 border-b border-dashed inline-block" /> AFE Planned Target
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Formation Risk Matrix Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-bold text-white mb-3">
          Stratigraphic Formation Vulnerability Matrix
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px]">
                <th className="pb-2">FORMATION</th>
                <th className="pb-2">DEPTH RANGE</th>
                <th className="pb-2">LITHOLOGY SUMMARY</th>
                <th className="pb-2 text-center">LOSS FREQ</th>
                <th className="pb-2 text-center">STICKING FREQ</th>
                <th className="pb-2 text-center">KICK FREQ</th>
                <th className="pb-2 text-center">AVG NPT</th>
                <th className="pb-2 text-right">RISK STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {formations.map((f) => (
                <tr key={f.name} className="hover:bg-slate-800/40">
                  <td className="py-2.5 font-bold text-white font-sans">{f.name}</td>
                  <td className="py-2.5 text-slate-300">{f.depthStart} - {f.depthEnd} m</td>
                  <td className="py-2.5 text-slate-400 font-sans truncate max-w-xs">{f.lithology}</td>
                  <td className="py-2.5 text-center">
                    <span className={f.mudLossFrequency > 25 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                      {f.mudLossFrequency}%
                    </span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={f.stuckPipeFrequency > 25 ? 'text-purple-400 font-bold' : 'text-slate-400'}>
                      {f.stuckPipeFrequency}%
                    </span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={f.kickFrequency > 20 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                      {f.kickFrequency}%
                    </span>
                  </td>
                  <td className="py-2.5 text-center text-slate-300">{f.avgNptHours}h</td>
                  <td className="py-2.5 text-right font-sans">
                    {f.name.includes('Barail') ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        CRITICAL PAY HAZARD
                      </span>
                    ) : f.name.includes('Kopili') ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        OVERPRESSURE RISK
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] text-slate-400 bg-slate-800">
                        NOMINAL
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
