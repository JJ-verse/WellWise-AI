import React, { useState } from 'react';
import {
  Activity,
  Compass,
  Layers,
  ArrowDown,
  Gauge,
  Clock,
  Radio,
  FileText,
  Sliders,
  Play,
  Pause,
  AlertCircle
} from 'lucide-react';
import { RealtimeTelemetry, OffsetWell, DepthLogPoint } from '../types/drilling';

interface ActiveWellViewProps {
  telemetry: RealtimeTelemetry;
  activeWell: OffsetWell;
  depthLogs: DepthLogPoint[];
  isSimulating: boolean;
  onToggleSimulate: () => void;
  onNavigateToRisk: () => void;
}

type TimeRange = '1h' | '6h' | '24h' | 'full';

export const ActiveWellView: React.FC<ActiveWellViewProps> = ({
  telemetry,
  activeWell,
  depthLogs,
  isSimulating,
  onToggleSimulate,
  onNavigateToRisk
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [hoveredPoint, setHoveredPoint] = useState<DepthLogPoint | null>(null);

  // Filter or slice logs based on range
  const visibleLogs = React.useMemo(() => {
    if (timeRange === '1h') return depthLogs.filter(d => d.depth >= 2740 && d.depth <= 2770);
    if (timeRange === '6h') return depthLogs.filter(d => d.depth >= 2680 && d.depth <= 2770);
    if (timeRange === '24h') return depthLogs.filter(d => d.depth >= 2550 && d.depth <= 2770);
    return depthLogs.filter(d => d.depth <= 2770);
  }, [depthLogs, timeRange]);

  const minDepth = visibleLogs.length > 0 ? visibleLogs[0].depth : 2500;
  const maxDepth = visibleLogs.length > 0 ? visibleLogs[visibleLogs.length - 1].depth : 2770;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider">
                ACTIVE ROTARY DRILLING IN PROGRESS
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400 font-mono">Rig: {activeWell.rigName}</span>
            </div>

            <div className="flex items-baseline gap-3 mt-1.5">
              <h1 className="text-2xl font-extrabold text-white font-mono">{activeWell.name}</h1>
              <span className="text-xs text-slate-400">Field: {activeWell.field}</span>
            </div>

            <p className="text-xs text-slate-300 mt-1">
              Upper Assam Shelf Basin · Coordinates: <strong className="font-mono text-slate-200">27.2912° N, 95.3421° E</strong> · Spud: 14-Aug-2026 (48 Operating Days)
            </p>
          </div>

          {/* Timeframe Filter Buttons & Live Stream Status */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['1h', '6h', '24h', 'full'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors ${
                    timeRange === range
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {range === '1h' ? 'Last 1h' : range === '6h' ? 'Last 6h' : range === '24h' ? 'Last 24h' : 'Full Well'}
                </button>
              ))}
            </div>

            <button
              onClick={onToggleSimulate}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border flex items-center gap-1.5 transition-colors ${
                isSimulating
                  ? 'bg-emerald-950 border-emerald-800 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isSimulating ? 'Stream Live' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Well Technical Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Current Depth</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
              {telemetry.depth.toFixed(1)} <span className="text-xs text-slate-400">m</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">MD (TVD: 2,710.2 m)</div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Target Depth (TD)</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {telemetry.targetDepth} <span className="text-xs text-slate-400">m</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Remaining: {(telemetry.targetDepth - telemetry.depth).toFixed(1)} m</div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Current Formation</div>
            <div className="text-sm font-bold text-sky-300 mt-1 truncate">Barail Sandstone</div>
            <div className="text-[10px] text-slate-500 font-mono">Top: 2,720 m</div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Trajectory Type</div>
            <div className="text-sm font-bold text-slate-200 mt-1">{activeWell.trajectory}</div>
            <div className="text-[10px] text-slate-500 font-mono">Max Inc: {activeWell.maxInclination}°</div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Hole / Bit Size</div>
            <div className="text-sm font-bold text-slate-200 mt-1">8-1/2" Section</div>
            <div className="text-[10px] text-slate-500 font-mono">PDC 5-Blade Matrix</div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Last Casing Shoe</div>
            <div className="text-sm font-bold text-slate-200 mt-1">9-5/8" at 2,520 m</div>
            <div className="text-[10px] text-slate-500 font-mono">FIT: 1.72 SG Eq.</div>
          </div>
        </div>
      </div>

      {/* Proactive Risk Warning Banner */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs text-slate-200">
            <strong className="text-amber-400">Proactive Risk Ahead (34.6 m):</strong> Approaching depleted Barail Sandstone pay interval at <strong className="text-white">2,800–2,910 m</strong>. Offset well OIL-097 lost 45 bbl/hr at 2,840 m; OIL-099 suffered catastrophic loss at 2,875 m.
          </div>
        </div>
        <button
          onClick={onNavigateToRisk}
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded shrink-0 transition-colors shadow"
        >
          View Offset Evidence →
        </button>
      </div>

      {/* Multi-Track Real-Time Drilling Log Visualizer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white">eRTMAC Multi-Track Drilling Parameter Logs vs Depth</h2>
            <p className="text-xs text-slate-400">
              Synchronized real-time log curves showing continuous drilling parameter trends
            </p>
          </div>
          {hoveredPoint && (
            <div className="text-xs font-mono bg-slate-950 px-3 py-1 rounded border border-slate-800 text-slate-300">
              Depth: <span className="text-emerald-400 font-bold">{hoveredPoint.depth} m</span> | ROP: <span className="text-emerald-300">{hoveredPoint.rop} m/h</span> | Torque: <span className="text-amber-300">{hoveredPoint.torque} kft-lb</span> | SPP: <span className="text-sky-300">{hoveredPoint.spp} psi</span> | ECD: <span className="text-purple-300">{hoveredPoint.ecd} SG</span>
            </div>
          )}
        </div>

        {/* Multi-Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Track 1: ROP vs Depth */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-emerald-400 font-semibold">Track 1: ROP (m/hr)</span>
              <span className="text-[10px] text-slate-400 font-mono">0 - 35 m/hr</span>
            </div>
            <div className="h-64 relative border-l border-b border-slate-800 pt-2">
              <svg className="w-full h-full overflow-visible">
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  points={visibleLogs
                    .map((p, idx) => {
                      const y = (idx / (visibleLogs.length - 1)) * 240;
                      const x = (p.rop / 35) * 100 + '%';
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>{minDepth} m</span>
              <span className="text-emerald-400">Cur: {telemetry.rop.toFixed(1)} m/h</span>
              <span>{maxDepth} m</span>
            </div>
          </div>

          {/* Track 2: Torque & WOB */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-amber-400 font-semibold">Track 2: Torque (kft-lb)</span>
              <span className="text-[10px] text-slate-400 font-mono">0 - 20 kft-lb</span>
            </div>
            <div className="h-64 relative border-l border-b border-slate-800 pt-2">
              <svg className="w-full h-full overflow-visible">
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  points={visibleLogs
                    .map((p, idx) => {
                      const y = (idx / (visibleLogs.length - 1)) * 240;
                      const x = (p.torque / 20) * 100 + '%';
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>{minDepth} m</span>
              <span className="text-amber-400">Cur: {telemetry.torque.toFixed(1)} kft-lb</span>
              <span>{maxDepth} m</span>
            </div>
          </div>

          {/* Track 3: Standpipe Pressure (SPP) */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-sky-400 font-semibold">Track 3: SPP (psi)</span>
              <span className="text-[10px] text-slate-400 font-mono">1,800 - 3,000 psi</span>
            </div>
            <div className="h-64 relative border-l border-b border-slate-800 pt-2">
              <svg className="w-full h-full overflow-visible">
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  points={visibleLogs
                    .map((p, idx) => {
                      const y = (idx / (visibleLogs.length - 1)) * 240;
                      const norm = Math.max(0, Math.min(1, (p.spp - 1800) / 1200));
                      const x = norm * 100 + '%';
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>{minDepth} m</span>
              <span className="text-sky-400">Cur: {telemetry.spp} psi</span>
              <span>{maxDepth} m</span>
            </div>
          </div>

          {/* Track 4: ECD & Mud Weight */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-purple-400 font-semibold">Track 4: ECD vs MW (SG)</span>
              <span className="text-[10px] text-slate-400 font-mono">1.10 - 1.50 SG</span>
            </div>
            <div className="h-64 relative border-l border-b border-slate-800 pt-2">
              <svg className="w-full h-full overflow-visible">
                {/* ECD line */}
                <polyline
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2"
                  points={visibleLogs
                    .map((p, idx) => {
                      const y = (idx / (visibleLogs.length - 1)) * 240;
                      const norm = Math.max(0, Math.min(1, (p.ecd - 1.1) / 0.4));
                      const x = norm * 100 + '%';
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {/* MW line */}
                <polyline
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  points={visibleLogs
                    .map((p, idx) => {
                      const y = (idx / (visibleLogs.length - 1)) * 240;
                      const norm = Math.max(0, Math.min(1, (p.mudWeight - 1.1) / 0.4));
                      const x = norm * 100 + '%';
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
              </svg>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>{minDepth} m</span>
              <span className="text-purple-400">ECD: {telemetry.ecd.toFixed(2)} SG</span>
              <span>{maxDepth} m</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> ROP
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-amber-400 inline-block" /> Torque
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-sky-400 inline-block" /> Standpipe Pressure
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-purple-400 inline-block" /> ECD
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-slate-400 border-b border-dashed inline-block" /> Static Mud Weight
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Sampling: 1.0 sec telemetry stream (eRTMAC WITSML v1.4)
          </div>
        </div>
      </div>
    </div>
  );
};
