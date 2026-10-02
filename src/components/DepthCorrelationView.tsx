import React, { useState } from 'react';
import {
  Layers,
  Activity,
  AlertTriangle,
  FileText,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';
import { DepthLogPoint, OffsetWell, HistoricalEvent } from '../types/drilling';

interface DepthCorrelationViewProps {
  depthLogs: DepthLogPoint[];
  wells: OffsetWell[];
  events: HistoricalEvent[];
  activeDepth: number;
  onSelectWell: (wellId: string) => void;
  onOpenDocument: (docId: string) => void;
}

export const DepthCorrelationView: React.FC<DepthCorrelationViewProps> = ({
  depthLogs,
  wells,
  events,
  activeDepth = 2765.4,
  onSelectWell,
  onOpenDocument
}) => {
  const [selectedOffsetWellId, setSelectedOffsetWellId] = useState<string>('OIL-097');

  // Logs cover 2,500m to 3,300m
  const startDepth = 2500;
  const endDepth = 3300;
  const totalSpan = endDepth - startDepth;

  const offsetWell = wells.find(w => w.id === selectedOffsetWellId) || wells[1];
  const offsetEvents = events.filter(e => e.wellId === offsetWell.id && e.depth >= startDepth && e.depth <= endDepth);

  // Position on Y axis (0 to 600px)
  const getYPos = (d: number) => {
    return ((d - startDepth) / totalSpan) * 600;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-extrabold text-white">Active Well vs Offset Depth Correlation Logs</h1>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Synchronized industry-standard vertical depth log tracks. Correlating active bit trajectory with offset well parameters and pinpointing the <strong className="text-amber-300">2,800–2,910 m Historical Mud-Loss Hazard Interval</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">CORRELATION OFFSET:</span>
            <select
              aria-label="Correlation Offset Well"
              value={selectedOffsetWellId}
              onChange={(e) => setSelectedOffsetWellId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-amber-400 focus:outline-none"
            >
              {wells.filter(w => w.id !== 'OIL-101').map(w => (
                <option key={w.id} value={w.id} className="bg-slate-900 text-slate-200">
                  {w.id} ({w.distanceKm.toFixed(1)} km - {w.similarity.overall.toFixed(0)}% sim)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Depth Multi-Track Visualizer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 overflow-x-auto shadow-xl">
        <div className="min-w-[950px]">
          {/* Header Row for Tracks */}
          <div className="grid grid-cols-12 gap-2 text-center text-xs font-mono font-bold pb-3 border-b border-slate-800 text-slate-300">
            <div className="col-span-1 bg-slate-950 py-1.5 rounded border border-slate-800 text-slate-400">
              DEPTH (m)
            </div>
            <div className="col-span-2 bg-slate-950 py-1.5 rounded border border-slate-800 text-sky-400">
              STRATIGRAPHY
            </div>
            <div className="col-span-2 bg-slate-950 py-1.5 rounded border border-slate-800 text-emerald-400">
              TRACK 1: ROP (m/h)<br />
              <span className="text-[10px] text-slate-500 font-normal">Active vs {offsetWell.id}</span>
            </div>
            <div className="col-span-2 bg-slate-950 py-1.5 rounded border border-slate-800 text-amber-400">
              TRACK 2: TORQUE (kft-lb)<br />
              <span className="text-[10px] text-slate-500 font-normal">Active vs {offsetWell.id}</span>
            </div>
            <div className="col-span-2 bg-slate-950 py-1.5 rounded border border-slate-800 text-purple-400">
              TRACK 3: ECD vs MW (SG)<br />
              <span className="text-[10px] text-slate-500 font-normal">Hydrostatic Overbalance</span>
            </div>
            <div className="col-span-3 bg-slate-950 py-1.5 rounded border border-slate-800 text-rose-400">
              TRACK 4: HISTORICAL OFFSET INCIDENTS<br />
              <span className="text-[10px] text-slate-500 font-normal">Documented Forensics at Depth</span>
            </div>
          </div>

          {/* Interactive Depth Track Canvas */}
          <div className="relative h-[600px] grid grid-cols-12 gap-2 mt-2 select-none border-b border-slate-800">
            {/* Shaded Hazard Zone Overlay (2,800 to 2,910m) */}
            <div
              style={{
                top: `${getYPos(2800)}px`,
                height: `${getYPos(2910) - getYPos(2800)}px`
              }}
              className="absolute left-0 right-0 bg-amber-500/10 border-t-2 border-b-2 border-amber-500/50 z-10 pointer-events-none flex items-center justify-end pr-4"
            >
              <div className="bg-amber-950/80 border border-amber-500/80 text-amber-300 font-mono text-[10px] px-2 py-0.5 rounded shadow">
                ⚠️ HISTORICAL ELEVATED MUD-LOSS ZONE (2,800–2,910 m) · 3 of 7 Offset Wells Lost Circulation
              </div>
            </div>

            {/* Active Bit Position Indicator */}
            <div
              style={{ top: `${getYPos(activeDepth)}px` }}
              className="absolute left-0 right-0 border-t-2 border-emerald-400 z-20 flex items-center justify-between pointer-events-none"
            >
              <div className="bg-emerald-500 text-slate-950 font-bold font-mono text-[10px] px-2 py-0.5 rounded -mt-2.5 shadow">
                ▲ ACTIVE BIT: {activeDepth.toFixed(1)} m (OIL-101)
              </div>
              <div className="bg-emerald-950/90 text-emerald-300 border border-emerald-800 font-mono text-[10px] px-2 py-0.5 rounded -mt-2.5 shadow">
                Gap to hazard: 34.6 m
              </div>
            </div>

            {/* Column 1: Depth Axis (Increasing Downwards) */}
            <div className="col-span-1 bg-slate-950/60 border-r border-slate-800 flex flex-col justify-between py-2 text-[10px] font-mono text-slate-400 text-center">
              {[2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300].map((d) => (
                <div key={d} className="relative">
                  <span className="bg-slate-900 px-1 rounded">{d} m</span>
                  <div className="w-2 h-px bg-slate-700 absolute right-0 top-2" />
                </div>
              ))}
            </div>

            {/* Column 2: Lithology & Stratigraphy Column */}
            <div className="col-span-2 relative border-r border-slate-800 overflow-hidden text-xs font-mono">
              {/* Surma Group (2500 - 2720) */}
              <div
                style={{ top: getYPos(2500), height: getYPos(2720) - getYPos(2500) }}
                className="absolute left-0 right-0 bg-lime-950/30 border-b border-lime-800/40 p-2 text-lime-400 flex flex-col justify-center"
              >
                <span className="font-bold text-[11px]">Surma Group</span>
                <span className="text-[9px] text-slate-400 font-sans">Shale &amp; Siltstone</span>
              </div>

              {/* Barail Sandstone (2720 - 3180) */}
              <div
                style={{ top: getYPos(2720), height: getYPos(3180) - getYPos(2720) }}
                className="absolute left-0 right-0 bg-sky-950/30 border-b border-sky-800/40 p-2 text-sky-300 flex flex-col justify-center"
              >
                <span className="font-bold text-[11px]">Barail Sandstone</span>
                <span className="text-[9px] text-slate-400 font-sans">Porous Sand &amp; Coal stringers</span>
              </div>

              {/* Kopili Shale (3180 - 3300) */}
              <div
                style={{ top: getYPos(3180), height: getYPos(3300) - getYPos(3180) }}
                className="absolute left-0 right-0 bg-purple-950/30 p-2 text-purple-300 flex flex-col justify-center"
              >
                <span className="font-bold text-[11px]">Kopili Shale</span>
                <span className="text-[9px] text-slate-400 font-sans">Overpressured Gas Shales</span>
              </div>
            </div>

            {/* Column 3: Track 1 ROP Curve (Active vs Offset) */}
            <div className="col-span-2 relative border-r border-slate-800 bg-slate-950/40">
              <svg className="w-full h-full">
                {/* Active ROP curve (up to 2765m) */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  points={depthLogs
                    .filter(p => p.depth <= activeDepth)
                    .map(p => {
                      const y = getYPos(p.depth);
                      const x = (p.rop / 35) * 100 + '%';
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {/* Offset Well ROP curve (full depth) */}
                <polyline
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  points={depthLogs.map(p => {
                    const y = getYPos(p.depth);
                    // simulated offset rop variation
                    const ropOffset = p.depth >= 2820 && p.depth <= 2860 ? 24.5 : p.rop * 0.9;
                    const x = (ropOffset / 35) * 100 + '%';
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>
            </div>

            {/* Column 4: Track 2 Torque Curve */}
            <div className="col-span-2 relative border-r border-slate-800 bg-slate-950/40">
              <svg className="w-full h-full">
                {/* Active Torque */}
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  points={depthLogs
                    .filter(p => p.depth <= activeDepth)
                    .map(p => {
                      const y = getYPos(p.depth);
                      const x = (p.torque / 20) * 100 + '%';
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {/* Offset Torque */}
                <polyline
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  points={depthLogs.map(p => {
                    const y = getYPos(p.depth);
                    const tOffset = p.depth >= 3100 && p.depth <= 3160 ? 15.2 : p.torque * 1.05;
                    const x = (tOffset / 20) * 100 + '%';
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>
            </div>

            {/* Column 5: Track 3 ECD & Fracture Gradient */}
            <div className="col-span-2 relative border-r border-slate-800 bg-slate-950/40">
              <svg className="w-full h-full">
                {/* Estimated Fracture gradient line (depleted zone dip!) */}
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  points={[
                    `75%,${getYPos(2500)}`,
                    `72%,${getYPos(2720)}`,
                    `52%,${getYPos(2800)}`, // drops in depleted zone!
                    `52%,${getYPos(2910)}`,
                    `78%,${getYPos(3180)}`,
                    `85%,${getYPos(3300)}`
                  ].join(' ')}
                />
                {/* ECD curve */}
                <polyline
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2.5"
                  points={depthLogs.map(p => {
                    const y = getYPos(p.depth);
                    // 1.1 to 1.6 SG normalized to 0-100%
                    const x = ((p.ecd - 1.1) / 0.5) * 100 + '%';
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>
            </div>

            {/* Column 6: Track 4 Documented Historical Incidents at Depth */}
            <div className="col-span-3 relative bg-slate-950/50 p-2">
              {/* Plot historical incidents directly at their depths */}
              {/* Event 1: OIL-097 Mud loss at 2840m */}
              <div
                style={{ top: `${getYPos(2840) - 20}px` }}
                className="absolute left-2 right-2 p-2 bg-amber-950/90 border border-amber-500 rounded text-xs shadow-lg cursor-pointer hover:bg-amber-900/90 transition-colors z-20"
                onClick={() => onSelectWell('OIL-097')}
              >
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>OIL-097 at 2,840 m</span>
                  <span className="text-[10px] font-mono text-amber-400">45 bbl/hr Loss</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Depleted reservoir sand fracture. Cured with 35 bbl mica/nutplug pill (14.5h NPT).
                </div>
              </div>

              {/* Event 2: OIL-099 Mud loss at 2875m */}
              <div
                style={{ top: `${getYPos(2875) + 25}px` }}
                className="absolute left-2 right-2 p-2 bg-rose-950/90 border border-rose-500 rounded text-xs shadow-lg cursor-pointer hover:bg-rose-900/90 transition-colors z-20"
                onClick={() => onSelectWell('OIL-099')}
              >
                <div className="flex items-center justify-between font-bold text-rose-300">
                  <span>OIL-099 at 2,875 m</span>
                  <span className="text-[10px] font-mono text-rose-400">60 bbl/hr Loss</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Intersected natural fault fracture. Required cement plug &amp; sidetrack.
                </div>
              </div>

              {/* Event 3: OIL-099 Differential Sticking at 2980m */}
              <div
                style={{ top: `${getYPos(2980) - 10}px` }}
                className="absolute left-2 right-2 p-2 bg-purple-950/90 border border-purple-500 rounded text-xs shadow-lg cursor-pointer hover:bg-purple-900/90 transition-colors z-20"
                onClick={() => onSelectWell('OIL-099')}
              >
                <div className="flex items-center justify-between font-bold text-purple-300">
                  <span>OIL-099 at 2,980 m</span>
                  <span className="text-[10px] font-mono text-purple-400">Diff. Sticking</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Pipe stuck against permeable sand face during survey. 30 bbl solvent freed pipe.
                </div>
              </div>

              {/* Event 4: OIL-100 Torque spike at 3120m */}
              <div
                style={{ top: `${getYPos(3120) - 10}px` }}
                className="absolute left-2 right-2 p-2 bg-slate-900 border border-slate-700 rounded text-xs shadow-lg cursor-pointer hover:bg-slate-800 transition-colors z-20"
                onClick={() => onSelectWell('OIL-100')}
              >
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span>OIL-100 at 3,120 m</span>
                  <span className="text-[10px] font-mono text-amber-400">Torque Spikes</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Dense chert stringers causing stick-slip. Lowered RPM to 80.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Log Legend */}
          <div className="mt-3 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block" /> Active Well (OIL-101)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-400 border-b border-dashed inline-block" /> Offset Reference ({offsetWell.id})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-rose-500 border-b border-dashed inline-block" /> Depleted Fracture Gradient Limit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-purple-400 inline-block" /> ECD Curve
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Depth scaling: 100m per interval · Datum: RKB (Rotary Kelly Bushing)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
