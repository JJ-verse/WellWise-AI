import React from 'react';
import {
  Workflow,
  Radio,
  FileText,
  Cpu,
  Database,
  BarChart3,
  Bot,
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const PipelineArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2.5">
          <Workflow className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl font-extrabold text-white">eRTMAC-NWIS System Architecture &amp; Data Pipeline</h1>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          High-level operational dataflow coupling Oil India Limited's live real-time rig monitoring system (eRTMAC) with the AI-driven Nearby Wells Intelligence System (NWIS).
        </p>
      </div>

      {/* Layer 1: Data Sources */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-xs">1</span>
            <h2 className="text-sm font-bold text-white">Heterogeneous Operational Data Sources</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Real-Time + Historical Repositories</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs text-center">
          <div className="bg-emerald-950/40 border border-emerald-800/80 p-2.5 rounded-lg">
            <Radio className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <div className="font-bold text-white text-[11px]">eRTMAC Feed</div>
            <div className="text-[9px] text-emerald-400/80 font-mono">WITSML / 1.0s</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <FileText className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <div className="font-bold text-slate-200 text-[11px]">WCR Reports</div>
            <div className="text-[9px] text-slate-400">Well Completion</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <FileText className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <div className="font-bold text-slate-200 text-[11px]">DDR Logs</div>
            <div className="text-[9px] text-slate-400">Daily Drilling</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <FileText className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <div className="font-bold text-slate-200 text-[11px]">Mud Logs</div>
            <div className="text-[9px] text-slate-400">Lithology / Gas</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <FileText className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <div className="font-bold text-slate-200 text-[11px]">Geological Data</div>
            <div className="text-[9px] text-slate-400">Wireline Tops</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <FileText className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <div className="font-bold text-slate-200 text-[11px]">Well Surveys</div>
            <div className="text-[9px] text-slate-400">MWD Trajectories</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <FileText className="w-4 h-4 text-sky-400 mx-auto mb-1" />
            <div className="font-bold text-slate-200 text-[11px]">Casing Records</div>
            <div className="text-[9px] text-slate-400">Cementing Logs</div>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <div className="flex justify-center text-slate-500">
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </div>

      {/* Layer 2: AI Processing & NLP Ingestion Engine */}
      <div className="bg-slate-900/90 border border-purple-900/50 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-950 text-purple-300 border border-purple-800 flex items-center justify-center font-bold text-xs">2</span>
            <h2 className="text-sm font-bold text-white">AI Processing &amp; Knowledge Extraction Layer</h2>
          </div>
          <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
            Domain NLP + OCR
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-sky-400">OCR &amp; Layout Engine</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Extracts tables, charts, and scanned text from legacy scanned PDF completion archives.
            </p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-purple-400">Domain NLP Parser</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Oilfield-specific language model trained on drilling vernacular, mud recipes, and equipment.
            </p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-emerald-400">Entity Extraction (NER)</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Identifies formations, depths, loss rates (bbl/hr), LCM chemicals, and casing sizes.
            </p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-amber-400">Event Classification</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Classifies incidents into 13 standardized categories (Mud Loss, Stuck Pipe, Kick, etc.).
            </p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-indigo-400">Data Normalization</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Harmonizes depth datums (RKB), stratigraphic nomenclature, and fluid units.
            </p>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <div className="flex justify-center text-slate-500">
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </div>

      {/* Layer 3: NWIS Knowledge Repository & Analytics */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-950 text-sky-400 border border-sky-800 flex items-center justify-center font-bold text-xs">3</span>
            <h2 className="text-sm font-bold text-white">NWIS Knowledge Repository &amp; ML Reasoning Engine</h2>
          </div>
          <span className="text-[10px] font-mono text-sky-400">Graph DB &amp; Correlation Matrix</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <Database className="w-4 h-4 text-sky-400 mb-1" />
            <div className="font-bold text-white text-[11px]">Structured Event Knowledge Graph</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Interconnected graph relating Wells ↔ Formations ↔ Depths ↔ Hazard Events ↔ Source Documents.
            </p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <BarChart3 className="w-4 h-4 text-amber-400 mb-1" />
            <div className="font-bold text-white text-[11px]">Depth Correlation &amp; Analytics</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Multi-well synchronization aligning parameters (ROP, Torque, SPP, ECD) across offset trajectories.
            </p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <Sparkles className="w-4 h-4 text-purple-400 mb-1" />
            <div className="font-bold text-white text-[11px]">Explainable Risk Predictor</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Deterministic weighting engine scoring upcoming depth hazard probabilities with full evidence auditability.
            </p>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <div className="flex justify-center text-slate-500">
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </div>

      {/* Layer 4: Control Room UI, Alerts & Copilot */}
      <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-purple-950/30 border border-amber-500/40 rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">4</span>
            <h2 className="text-sm font-bold text-white">Drilling Engineer Decision Support Console</h2>
          </div>
          <span className="text-[10px] font-mono text-amber-400 font-bold">OIL Control Room</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Real-Time eRTMAC Telemetry</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Live monitoring of current depth (2,765m), ROP, Torque, SPP, and active pit volume.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Proactive Risk Horizon Alerts</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Automated early warnings flagging upcoming hazard zones (e.g. 2,800–2,910 m mud loss 35m ahead).
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
            <div className="font-bold text-purple-300 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>NWIS Copilot Assistant</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Natural language Q&amp;A referencing historical incident archives with clickable source citations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
