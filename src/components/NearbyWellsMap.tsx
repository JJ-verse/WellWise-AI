import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  AlertTriangle,
  GitCompare,
  ArrowRight,
  Info,
  Sliders,
  Filter,
  FileText,
  Clock,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { OffsetWell, HistoricalEvent } from '../types/drilling';

interface NearbyWellsMapProps {
  wells: OffsetWell[];
  activeWellId: string;
  selectedWellId: string;
  onSelectWell: (wellId: string) => void;
  onNavigateToWellIntel: (wellId: string) => void;
  onCompareWells: (wellId: string) => void;
  onOpenDocument: (docId: string) => void;
  events: HistoricalEvent[];
}

export const NearbyWellsMap: React.FC<NearbyWellsMapProps> = ({
  wells,
  activeWellId,
  selectedWellId,
  onSelectWell,
  onNavigateToWellIntel,
  onCompareWells,
  onOpenDocument,
  events
}) => {
  const [radiusKm, setRadiusKm] = useState<number>(5.0);
  const [filterLossOnly, setFilterLossOnly] = useState<boolean>(false);
  const [showFaults, setShowFaults] = useState<boolean>(true);
  const [showContours, setShowContours] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeWell = wells.find(w => w.id === activeWellId) || wells[0];
  const selectedWell = wells.find(w => w.id === selectedWellId) || activeWell;

  // Filter wells by radius and incident filters
  const filteredWells = wells.filter(w => {
    if (w.id === activeWell.id) return true;
    if (w.distanceKm > radiusKm) return false;
    if (filterLossOnly && w.majorEventsCount.mudLoss === 0) return false;
    return true;
  });

  // Calculate coordinates relative to center (OIL-101: 27.2912, 95.3421)
  // In Assam, 1 deg lat ~ 111 km, 1 deg lng ~ 99 km
  const centerLat = activeWell.lat;
  const centerLng = activeWell.lng;

  // Map viewport dimensions
  const mapWidth = 720;
  const mapHeight = 540;
  const centerX = mapWidth / 2;
  const centerY = mapHeight / 2;

  // Scaling factor: pixels per kilometer
  const baseScale = radiusKm <= 2 ? 80 : radiusKm <= 5 ? 40 : radiusKm <= 10 ? 22 : 11;
  const scale = baseScale * zoomLevel;

  const projectCoords = (lat: number, lng: number) => {
    const dLat = lat - centerLat;
    const dLng = lng - centerLng;
    const dyKm = dLat * 111.0;
    const dxKm = dLng * 99.0;
    const x = centerX + dxKm * scale;
    const y = centerY - dyKm * scale; // invert Y for screen coords
    return { x, y };
  };

  const selectedWellEvents = events.filter(e => e.wellId === selectedWell.id);

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <h1 className="text-base font-bold text-white">Geospatial Offset Wells Exploration</h1>
            <span className="text-xs font-mono text-slate-400">· Upper Assam Basin / Nahorkatiya Block</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Active Well <strong className="text-emerald-400 font-mono">OIL-101</strong> at center. Showing offset historical wells within selected radius.
          </p>
        </div>

        {/* Radius Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-[10px] uppercase font-mono text-slate-400 px-2">Radius:</span>
            {[1, 2, 5, 10, 20].map((r) => (
              <button
                key={r}
                onClick={() => setRadiusKm(r)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                  radiusKm === r
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r} km
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <button
            onClick={() => setFilterLossOnly(!filterLossOnly)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              filterLossOnly
                ? 'bg-amber-950/60 border-amber-600/60 text-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Mud Losses Only</span>
          </button>
        </div>
      </div>

      {/* Main Map + Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Viewport Area */}
        <div className="lg:col-span-7 bg-[#070b12] border border-slate-800 rounded-xl relative overflow-hidden flex flex-col shadow-xl">
          {/* Map Layer Toolbar */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setShowFaults(!showFaults)}
              className={`px-2 py-1 rounded text-[11px] ${showFaults ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-500'}`}
            >
              Fault Lines
            </button>
            <button
              onClick={() => setShowContours(!showContours)}
              className={`px-2 py-1 rounded text-[11px] ${showContours ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-500'}`}
            >
              Depth Contours
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-slate-900/90 backdrop-blur border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.2))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1.0)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded text-[10px] font-mono text-center"
              title="Reset"
            >
              1x
            </button>
          </div>

          {/* SVG Map Canvas */}
          <div className="w-full h-[520px] relative overflow-hidden bg-grid-tech flex items-center justify-center">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-full select-none cursor-crosshair"
            >
              <defs>
                {/* Active Well Pulse Glow */}
                <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="lossGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid Lines & UTM Axes */}
              <line x1="0" y1={centerY} x2={mapWidth} y2={centerY} stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
              <line x1={centerX} y1="0" x2={centerX} y2={mapHeight} stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

              {/* Concentric Search Radius Ring */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radiusKm * scale}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.6"
              />
              {/* Radius Label */}
              <text
                x={centerX + radiusKm * scale - 12}
                y={centerY - 8}
                fill="#f59e0b"
                fontSize="10"
                fontFamily="JetBrains Mono"
                opacity="0.8"
              >
                {radiusKm} km radius
              </text>

              {/* Geological Contours (Simulated Structural Depth on Barail Top) */}
              {showContours && (
                <g opacity="0.3" stroke="#0284c7" strokeWidth="1" fill="none">
                  <ellipse cx={centerX + 20} cy={centerY - 10} rx={140 * zoomLevel} ry={80 * zoomLevel} />
                  <ellipse cx={centerX + 15} cy={centerY - 8} rx={220 * zoomLevel} ry={130 * zoomLevel} />
                  <ellipse cx={centerX + 10} cy={centerY - 5} rx={310 * zoomLevel} ry={180 * zoomLevel} />
                  <text x={centerX + 150} y={centerY - 80} fill="#38bdf8" fontSize="9" fontFamily="monospace">
                    -2,750m Barail Contour
                  </text>
                </g>
              )}

              {/* Geological Fault Trends (Nahorkatiya Fault Line Zone) */}
              {showFaults && (
                <g>
                  {/* Major East Boundary Fault */}
                  <path
                    d={`M ${centerX + 80 * zoomLevel} 40 Q ${centerX + 110 * zoomLevel} 260 ${centerX + 150 * zoomLevel} 500`}
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    fill="none"
                    opacity="0.7"
                  />
                  <text
                    x={centerX + 120 * zoomLevel}
                    y="100"
                    fill="#ef4444"
                    fontSize="9"
                    fontFamily="monospace"
                    opacity="0.8"
                  >
                    Nahorkatiya Fault Limb
                  </text>

                  {/* Minor Antithetic Fault */}
                  <path
                    d={`M ${centerX - 160 * zoomLevel} 80 L ${centerX - 60 * zoomLevel} 480`}
                    stroke="#f97316"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    fill="none"
                    opacity="0.5"
                  />
                </g>
              )}

              {/* Wells plotting */}
              {filteredWells.map((w) => {
                const { x, y } = projectCoords(w.lat, w.lng);
                const isActive = w.id === activeWell.id;
                const isSelected = w.id === selectedWell.id;
                const hasLoss = w.majorEventsCount.mudLoss > 0;

                // Check boundary clipping
                if (x < -20 || x > mapWidth + 20 || y < -20 || y > mapHeight + 20) return null;

                return (
                  <g
                    key={w.id}
                    className="cursor-pointer transition-transform"
                    onClick={() => onSelectWell(w.id)}
                  >
                    {/* Distance line from Active Well if selected */}
                    {isSelected && !isActive && (
                      <line
                        x1={centerX}
                        y1={centerY}
                        x2={x}
                        y2={y}
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        opacity="0.8"
                      />
                    )}

                    {/* Active Well Glow Indicator */}
                    {isActive && (
                      <circle cx={x} cy={y} r="22" fill="url(#activeGlow)" />
                    )}

                    {/* Mud Loss Halo Indicator */}
                    {!isActive && hasLoss && (
                      <circle cx={x} cy={y} r="16" fill="url(#lossGlow)" />
                    )}

                    {/* Selected Ring */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={isActive ? 14 : 12}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                    )}

                    {/* Well Marker Center */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isActive ? 8 : 6}
                      fill={isActive ? '#10b981' : hasLoss ? '#f59e0b' : '#64748b'}
                      stroke={isSelected ? '#ffffff' : '#0f172a'}
                      strokeWidth="2"
                    />

                    {/* Well Label */}
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fill={isActive ? '#34d399' : isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="10"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="JetBrains Mono"
                      className="pointer-events-none drop-shadow"
                    >
                      {w.id}
                      {!isActive && ` (${w.distanceKm.toFixed(1)}km)`}
                    </text>

                    {/* Mud loss badge marker */}
                    {!isActive && hasLoss && (
                      <text
                        x={x + 10}
                        y={y + 12}
                        fill="#fbbf24"
                        fontSize="8"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="pointer-events-none"
                      >
                        ⚠️ Loss
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Active Well (OIL-101)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Had Mud Losses
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-500 inline-block" /> Completed Offset
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-red-500 inline-block" /> Fault Line
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Showing {filteredWells.length} of {wells.length} wells
            </div>
          </div>
        </div>

        {/* Selected Well Side Panel (Detailed Intelligence) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white font-mono">{selectedWell.id}</h2>
                  {selectedWell.id === activeWell.id ? (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                      ACTIVE RIG
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-800 text-slate-300 rounded">
                      {selectedWell.distanceKm.toFixed(2)} km {selectedWell.bearingDeg}°
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{selectedWell.field} · {selectedWell.status}</div>
              </div>

              {/* Similarity Score Card */}
              {selectedWell.id !== activeWell.id && (
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Similarity Score</div>
                  <div className="text-lg font-mono font-bold text-sky-400">
                    {selectedWell.similarity.overall.toFixed(1)}%
                  </div>
                </div>
              )}
            </div>

            {/* Transparent Similarity Factor Breakdown */}
            {selectedWell.id !== activeWell.id && (
              <div className="mt-3 p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-2 flex items-center justify-between">
                  <span>Transparent Similarity Drivers</span>
                  <span className="text-[9px] text-slate-500 font-normal">Based on geology &amp; well plan</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Stratigraphic Formation:</span>
                    <span className="text-slate-200">{selectedWell.similarity.formation}% match</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Spatial Proximity:</span>
                    <span className="text-slate-200">{selectedWell.similarity.location}% match</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Well Trajectory (S-Type):</span>
                    <span className="text-slate-200">{selectedWell.similarity.trajectory}% match</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Target Depth &amp; Incline:</span>
                    <span className="text-slate-200">{selectedWell.similarity.depth}% match</span>
                  </div>
                </div>
              </div>
            )}

            {/* Well Details Specs */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block">TOTAL DEPTH</span>
                <span className="font-bold text-white font-mono">{selectedWell.totalDepth} m</span>
              </div>
              <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block">DRILLING DURATION</span>
                <span className="font-bold text-white font-mono">{selectedWell.drillingDurationDays} days</span>
              </div>
              <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block">TOTAL NPT INCURRED</span>
                <span className="font-bold text-amber-400 font-mono">{selectedWell.totalNptHours} hrs</span>
              </div>
              <div className="p-2 bg-slate-950/60 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block">RIG</span>
                <span className="font-bold text-slate-200 truncate block">{selectedWell.rigName}</span>
              </div>
            </div>

            {/* Major Events Count */}
            <div className="mt-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">Historical Event Counts:</div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className={`p-2 rounded border ${selectedWell.majorEventsCount.mudLoss > 0 ? 'bg-amber-950/40 border-amber-800 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                  <div className="text-lg font-bold font-mono">{selectedWell.majorEventsCount.mudLoss}</div>
                  <div className="text-[10px]">Mud Losses</div>
                </div>
                <div className={`p-2 rounded border ${selectedWell.majorEventsCount.kick > 0 ? 'bg-rose-950/40 border-rose-800 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                  <div className="text-lg font-bold font-mono">{selectedWell.majorEventsCount.kick}</div>
                  <div className="text-[10px]">Kicks</div>
                </div>
                <div className={`p-2 rounded border ${selectedWell.majorEventsCount.stuckPipe > 0 ? 'bg-purple-950/40 border-purple-800 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                  <div className="text-lg font-bold font-mono">{selectedWell.majorEventsCount.stuckPipe}</div>
                  <div className="text-[10px]">Stuck Pipe</div>
                </div>
                <div className={`p-2 rounded border ${selectedWell.majorEventsCount.cementing > 0 ? 'bg-sky-950/40 border-sky-800 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                  <div className="text-lg font-bold font-mono">{selectedWell.majorEventsCount.cementing}</div>
                  <div className="text-[10px]">Cementing</div>
                </div>
              </div>
            </div>

            {/* Specific Historical Events in this well */}
            <div className="mt-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5">Documented Historical Incidents:</div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {selectedWellEvents.length > 0 ? (
                  selectedWellEvents.map((evt) => (
                    <div key={evt.id} className="p-2.5 bg-slate-950 rounded border border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{evt.eventType} at {evt.depth} m</span>
                        <span className="text-[10px] text-amber-400 font-mono">{evt.severity}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-1 line-clamp-2">
                        {evt.probableCause}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Action: {evt.actionTaken.substring(0, 45)}...</span>
                        <button
                          onClick={() => onOpenDocument(evt.sourceDocId)}
                          className="text-sky-400 hover:underline flex items-center gap-0.5"
                        >
                          <FileText className="w-3 h-3" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 text-xs italic py-2">
                    No major drilling hazards recorded in repository for this well.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => onNavigateToWellIntel(selectedWell.id)}
              className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <span>View Well Intelligence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {selectedWell.id !== activeWell.id && (
              <button
                onClick={() => onCompareWells(selectedWell.id)}
                className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
                title="Compare with OIL-101"
              >
                <GitCompare className="w-4 h-4 text-sky-400" />
                <span>Compare</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
