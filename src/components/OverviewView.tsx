import React from 'react';
import {
  Activity,
  AlertTriangle,
  Compass,
  ArrowRight,
  ShieldAlert,
  Layers,
  FileText,
  MapPin,
  Bot,
  Gauge,
  Droplet,
  Flame,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { RealtimeTelemetry, OffsetWell, RiskAlert, HistoricalEvent, FormationInfo } from '../types/drilling';
import { NavigationTab } from './Sidebar';

interface OverviewViewProps {
  telemetry: RealtimeTelemetry;
  activeWell: OffsetWell;
  offsetWells: OffsetWell[];
  alerts: RiskAlert[];
  events: HistoricalEvent[];
  formations: FormationInfo[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectWellAndNavigate: (wellId: string) => void;
  onSelectEventAndNavigate: (eventId: string) => void;
  onAskCopilot: (query: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  telemetry,
  activeWell,
  offsetWells,
  alerts,
  events,
  formations,
  onNavigate,
  onSelectWellAndNavigate,
  onSelectEventAndNavigate,
  onAskCopilot
}) => {
  const nearbyWellsWithin5km = offsetWells.filter(w => w.id !== activeWell.id && w.distanceKm <= 5.0);
  const primaryAlert = alerts[0]; // 2800-2910m Mud Loss
  const distanceToLossZone = Math.max(0, 2800.0 - telemetry.depth);

  return (
    <div className="space-y-6">
      {/* Top Banner: Core Architecture Value Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-[#101726] to-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
              DECISION-SUPPORT ACTIVE
            </span>
            <span className="text-xs text-slate-400">· Real-time eRTMAC Stream Coupled with NWIS Historical Intelligence</span>
          </div>
          <h1 className="text-xl font-extrabold text-white mt-1">
            Drilling Operations Command Center — {activeWell.name}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            eRTMAC is monitoring real-time telemetry at <strong className="text-emerald-400 font-mono">{telemetry.depth.toFixed(1)} m</strong>. NWIS has analyzed 12 offset wells in the Nahorkatiya block and identified 1 elevated historical hazard zone 34.6 m ahead.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('nearby-map')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Nearby Wells (5 km)</span>
          </button>
          <button
            onClick={() => onNavigate('risks')}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Inspect Risk Ahead</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Card 1: Active Well */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Active Well</div>
          <div className="text-base font-bold text-white mt-1 font-mono truncate">{activeWell.id}</div>
          <div className="text-[11px] text-emerald-400 font-medium">On-Bottom ROP</div>
        </div>

        {/* Card 2: Current Depth */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Current Depth</div>
          <div className="text-base font-bold text-emerald-400 mt-1 font-mono">
            {telemetry.depth.toFixed(1)} <span className="text-[10px] text-slate-400">m</span>
          </div>
          <div className="text-[11px] text-slate-400">TD: {telemetry.targetDepth} m</div>
        </div>

        {/* Card 3: Formation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Current Formation</div>
          <div className="text-xs font-bold text-sky-300 mt-1 truncate">Barail Sandstone</div>
          <div className="text-[11px] text-slate-400">Pay Zone Target</div>
        </div>

        {/* Card 4: Wells Within 5km */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Wells in 5km</div>
          <div className="text-base font-bold text-white mt-1 font-mono">{nearbyWellsWithin5km.length}</div>
          <div className="text-[11px] text-slate-400">12 total field wells</div>
        </div>

        {/* Card 5: Historical Events */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Historical Events</div>
          <div className="text-base font-bold text-amber-400 mt-1 font-mono">{events.length}</div>
          <div className="text-[11px] text-slate-400">8 in Barail sands</div>
        </div>

        {/* Card 6: Active Risk Alerts */}
        <div className="bg-slate-900/80 border border-amber-900/50 rounded-lg p-3">
          <div className="text-[10px] font-mono text-amber-400 uppercase">Active Alerts</div>
          <div className="text-base font-bold text-amber-400 mt-1 font-mono">{alerts.length}</div>
          <div className="text-[11px] text-amber-300 font-semibold">1 Elevated Risk</div>
        </div>

        {/* Card 7: Proximity to Risk */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Risk Zone Gap</div>
          <div className="text-base font-bold text-amber-300 mt-1 font-mono">
            {distanceToLossZone.toFixed(1)} <span className="text-[10px] text-slate-400">m</span>
          </div>
          <div className="text-[11px] text-slate-400">Entry at 2,800 m</div>
        </div>

        {/* Card 8: Top Similar Well */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Closest Match</div>
          <div className="text-xs font-bold text-white mt-1 font-mono">OIL-097</div>
          <div className="text-[11px] text-sky-400 font-mono">93.4% Similarity</div>
        </div>
      </div>

      {/* Proactive Risk Horizon Graphic (Upcoming Risk Zones) */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold text-white">Upcoming Depth Risk Horizon</h2>
            <span className="text-xs text-slate-400">· Proactive Offset Early Warning</span>
          </div>
          <div className="text-xs text-slate-400">
            Current Bit Position: <strong className="text-emerald-400 font-mono">2,765.4 m</strong>
          </div>
        </div>

        {/* Visual Depth Bar */}
        <div className="relative h-10 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center">
          {/* Drilled Zone */}
          <div style={{ width: '32%' }} className="h-full bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-400 border-r border-emerald-500/50">
            Drilled: 0 - 2,765 m
          </div>

          {/* Safe Window */}
          <div style={{ width: '8%' }} className="h-full bg-emerald-950/40 flex items-center justify-center text-[10px] font-mono text-emerald-400">
            34.6m safe
          </div>

          {/* Mud Loss Hazard Zone (2,800 - 2,910 m) */}
          <div style={{ width: '24%' }} className="h-full bg-amber-950/60 border-l border-r border-amber-500/80 flex items-center justify-center text-[11px] font-bold text-amber-300 relative group cursor-pointer" onClick={() => onNavigate('risks')}>
            <span className="truncate px-1">⚠️ 2,800–2,910m Mud Loss Zone (OIL-097 / OIL-099)</span>
          </div>

          {/* Differential Sticking Zone (2,950 - 3,020 m) */}
          <div style={{ width: '16%' }} className="h-full bg-purple-950/50 border-r border-purple-500/60 flex items-center justify-center text-[10px] font-medium text-purple-300">
            2,950–3,020m Diff. Sticking
          </div>

          {/* Kopili Overpressure Kick Zone (3,250 - 3,320 m) */}
          <div style={{ width: '20%' }} className="h-full bg-rose-950/50 flex items-center justify-center text-[10px] font-medium text-rose-300">
            3,250m+ Kopili Kick Alert
          </div>

          {/* Drill Bit Marker */}
          <div style={{ left: '32%' }} className="absolute -top-1 bottom-0 w-0.5 bg-emerald-400 z-10 flex flex-col items-center">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50 -mt-1" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
          <span>2,700 m (Surma Base)</span>
          <span className="text-emerald-400 font-bold">▲ Bit: 2,765.4 m</span>
          <span className="text-amber-400 font-bold">⚠️ Hazard Top: 2,800 m</span>
          <span>3,000 m (Barail Core)</span>
          <span>3,250 m (Kopili Top)</span>
          <span>3,450 m (Target TD)</span>
        </div>
      </div>

      {/* Main Grid: Real-Time Telemetry (eRTMAC) vs Historical Offset Risk (NWIS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real-Time Drilling Status (eRTMAC feed) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">eRTMAC Live Telemetry Stream</h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                  REAL-TIME SIMULATED
                </span>
              </div>
              <button
                onClick={() => onNavigate('active-well')}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
              >
                <span>Full Active Well View</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Parameter Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* ROP */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Rate of Penetration (ROP)</div>
                <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                  {telemetry.rop.toFixed(1)} <span className="text-xs text-slate-400 font-normal">m/hr</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Average: 12.8 m/hr</div>
              </div>

              {/* WOB */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Weight on Bit (WOB)</div>
                <div className="text-xl font-mono font-bold text-slate-100 mt-1">
                  {telemetry.wob.toFixed(1)} <span className="text-xs text-slate-400 font-normal">klbs</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Recommended: 10-15 klbs</div>
              </div>

              {/* RPM */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Rotary Speed (RPM)</div>
                <div className="text-xl font-mono font-bold text-slate-100 mt-1">
                  {telemetry.rpm} <span className="text-xs text-slate-400 font-normal">rpm</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Downhole motor: 180 rpm</div>
              </div>

              {/* Torque */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Surface Torque</div>
                <div className="text-xl font-mono font-bold text-amber-400 mt-1">
                  {telemetry.torque.toFixed(1)} <span className="text-xs text-slate-400 font-normal">kft-lb</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Nominal: 7-9 kft-lb</div>
              </div>

              {/* Standpipe Pressure */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Standpipe Pressure</div>
                <div className="text-xl font-mono font-bold text-sky-400 mt-1">
                  {telemetry.spp} <span className="text-xs text-slate-400 font-normal">psi</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Pump #1 &amp; #2 combined</div>
              </div>

              {/* Flow Rate */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Flow Rate In</div>
                <div className="text-xl font-mono font-bold text-sky-300 mt-1">
                  {telemetry.flowRate} <span className="text-xs text-slate-400 font-normal">gpm</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Flow out paddle: 100%</div>
              </div>

              {/* Mud Weight */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Mud Weight (MW)</div>
                <div className="text-xl font-mono font-bold text-slate-100 mt-1">
                  {telemetry.mudWeight.toFixed(2)} <span className="text-xs text-slate-400 font-normal">SG</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Polymer water-based</div>
              </div>

              {/* Equivalent Circulating Density (ECD) */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-amber-400 uppercase">ECD at Bit</div>
                <div className="text-xl font-mono font-bold text-amber-400 mt-1">
                  {telemetry.ecd.toFixed(2)} <span className="text-xs text-slate-400 font-normal">SG</span>
                </div>
                <div className="text-[10px] text-amber-400/80 mt-0.5">Watch depleted limit (1.56 SG)</div>
              </div>

              {/* Active Pit Volume */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Pit Volume</div>
                <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                  {telemetry.pitVolume.toFixed(1)} <span className="text-xs text-slate-400 font-normal">bbl</span>
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-0.5">Stable (0.0 bbl/hr loss)</div>
              </div>
            </div>

            {/* Bottom Status bar for Rig Equipment */}
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-mono">
              <div>Bit: <span className="text-slate-200">8-1/2" PDC Matrix 5-Blade</span></div>
              <div>BHA: <span className="text-slate-200">RSS + MWD/LWD + Jar</span></div>
              <div>Gas: <span className="text-emerald-400 font-bold">{telemetry.gasUnits} units</span></div>
            </div>
          </div>

          {/* Quick Cross-Well Correlation Table */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-white">Nearest Offset Wells (Within 5 km)</h3>
              <button
                onClick={() => onNavigate('comparison')}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
              >
                <span>Full Comparison Tool</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px]">
                    <th className="pb-2">WELL ID</th>
                    <th className="pb-2">DISTANCE</th>
                    <th className="pb-2">TD</th>
                    <th className="pb-2">TRAJECTORY</th>
                    <th className="pb-2">SIMILARITY</th>
                    <th className="pb-2">CRITICAL EVENTS IN BARAIL</th>
                    <th className="pb-2 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {nearbyWellsWithin5km.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 font-bold text-white font-mono">{w.id}</td>
                      <td className="py-2.5 text-slate-300 font-mono">{w.distanceKm.toFixed(2)} km</td>
                      <td className="py-2.5 text-slate-300 font-mono">{w.totalDepth} m</td>
                      <td className="py-2.5 text-slate-400">{w.trajectory}</td>
                      <td className="py-2.5">
                        <span className="font-mono text-sky-400 font-bold">{w.similarity.overall.toFixed(1)}%</span>
                      </td>
                      <td className="py-2.5">
                        {w.id === 'OIL-097' && (
                          <span className="text-amber-400 font-semibold text-[11px]">
                            Severe Mud Loss at 2,840 m (45 bbl/hr)
                          </span>
                        )}
                        {w.id === 'OIL-098' && (
                          <span className="text-amber-400 font-semibold text-[11px]">
                            Partial Loss at 2,890 m (18 bbl/hr)
                          </span>
                        )}
                        {w.id === 'OIL-099' && (
                          <span className="text-rose-400 font-semibold text-[11px]">
                            Catastrophic Loss at 2,875 m (60 bbl/hr)
                          </span>
                        )}
                        {w.id === 'OIL-100' && (
                          <span className="text-slate-300 text-[11px]">
                            Seepage at 2,835 m; Torque spike at 3,120 m
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => onSelectWellAndNavigate(w.id)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] rounded transition-colors"
                        >
                          Intel →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: NWIS Explainable Risk Summary & Evidence */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Risk Alert Card */}
          <div className="bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/40 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold text-sm text-amber-300">Upcoming Risk Zone Detected</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                Confidence: {primaryAlert.confidencePct}%
              </span>
            </div>

            <div className="mt-3">
              <div className="text-base font-extrabold text-white">
                {primaryAlert.title}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                <span>Interval: <strong className="text-slate-200">2,800 – 2,910 m</strong></span>
                <span>·</span>
                <span>Distance: <strong className="text-amber-400">34.6 m ahead</strong></span>
              </div>

              {/* Explainable AI Reason */}
              <div className="mt-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">
                  Why this alert? (Evidence-Based AI)
                </div>
                <p>
                  “<strong className="text-white">3 of 7 comparable offset wells</strong> within 5 km experienced severe to moderate lost circulation between <strong className="text-white">2,820–2,910 m</strong>. The interval corresponds to depleted reservoir sandstone with reduced fracture resistance (1.56 SG) under current hydraulic ECD (1.34 SG).”
                </p>
              </div>

              {/* Offset Evidence Items */}
              <div className="mt-3 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Supporting Historical Evidence:</div>

                {primaryAlert.evidence.historicalWells.slice(0, 3).map((hw, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 rounded-lg text-xs cursor-pointer transition-colors"
                    onClick={() => onSelectWellAndNavigate(hw.wellId)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white font-mono">{hw.wellId} at {hw.depth} m</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {hw.severity}
                      </span>
                    </div>
                    <div className="text-slate-300 mt-1 text-[11px]">{hw.event}</div>
                    <div className="text-slate-400 text-[10px] mt-0.5">
                      <strong>Mitigation:</strong> {hw.mitigationUsed}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Proactive Monitoring */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">Recommended Operational Monitoring:</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Set Active Pit Volume Alarm to tight ±5 bbl tolerance</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Have 50 bbl engineered LCM pill (mica + nut plug) premixed in slug tank</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Limit ECD below 1.34 SG by reducing pump rate if losses commence</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => onNavigate('risks')}
                  className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors text-center shadow"
                >
                  Inspect Full Risk Analysis
                </button>
                <button
                  onClick={() => onAskCopilot('Why is 2800–2900m considered a risk zone?')}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-800/40 font-semibold text-xs rounded flex items-center gap-1.5 transition-colors"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask Copilot</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Formation Context Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-sm text-white">Current Stratigraphic Unit</h3>
              </div>
              <button
                onClick={() => onNavigate('formation')}
                className="text-xs text-sky-400 hover:text-sky-300 font-medium"
              >
                All Formations →
              </button>
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-white">Barail Sandstone Formation</strong> (2,720 – 3,180 m)
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Main oil-bearing sandstone in Upper Assam Basin. Highly prone to severe mud loss in sub-normally pressured pay zones (2,800 - 2,910 m) due to depletion from historical production.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800/60 text-center text-xs">
              <div className="bg-slate-950 p-1.5 rounded">
                <div className="text-[9px] font-mono text-slate-400">HISTORICAL LOSS RATE</div>
                <div className="font-bold text-amber-400 font-mono">46% of wells</div>
              </div>
              <div className="bg-slate-950 p-1.5 rounded">
                <div className="text-[9px] font-mono text-slate-400">DIFF. STICKING</div>
                <div className="font-bold text-purple-400 font-mono">32% of wells</div>
              </div>
              <div className="bg-slate-950 p-1.5 rounded">
                <div className="text-[9px] font-mono text-slate-400">AVG NPT IMPACT</div>
                <div className="font-bold text-slate-200 font-mono">32.6 hrs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
