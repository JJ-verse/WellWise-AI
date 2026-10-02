import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Filter,
  Eye,
  Database
} from 'lucide-react';
import { SourceDocument } from '../types/drilling';

interface DocumentsViewProps {
  documents: SourceDocument[];
  onOpenDocumentModal: (docId: string) => void;
  onSelectWell: (wellId: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  onOpenDocumentModal,
  onSelectWell
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredDocs = documents.filter((doc) => {
    if (selectedType !== 'All' && doc.docType !== selectedType) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.wellName.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.docType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h1 className="text-xl font-extrabold text-white">Document Intelligence &amp; NLP Knowledge Extraction</h1>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Automated ingestion pipeline transforming unstructured historical drilling reports (PDF/TIFF) into structured, queryable knowledge graphs.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            <strong className="text-sky-400">{documents.length}</strong> Audited Reports Indexed
          </div>
        </div>

        {/* AI Extraction Workflow Visualizer Strip */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">
            AI Ingestion &amp; Knowledge Extraction Architecture:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold">1</span>
              <div>
                <div className="font-bold text-white text-[11px]">Legacy PDFs</div>
                <div className="text-[9px] text-slate-400">Scanned WCR/DDR</div>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold">2</span>
              <div>
                <div className="font-bold text-sky-400 text-[11px]">OCR Engine</div>
                <div className="text-[9px] text-slate-400">Layout analysis</div>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold">3</span>
              <div>
                <div className="font-bold text-purple-400 text-[11px]">Domain NLP</div>
                <div className="text-[9px] text-slate-400">Oilfield taxonomy</div>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold">4</span>
              <div>
                <div className="font-bold text-emerald-400 text-[11px]">Entity Extraction</div>
                <div className="text-[9px] text-slate-400">Depths, mud, losses</div>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] font-bold">5</span>
              <div>
                <div className="font-bold text-amber-400 text-[11px]">Event Classifier</div>
                <div className="text-[9px] text-slate-400">Hazard forensics</div>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-amber-500/50 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-mono text-[10px] font-bold">6</span>
              <div>
                <div className="font-bold text-amber-300 text-[11px]">NWIS Knowledge</div>
                <div className="text-[9px] text-slate-300">Live decision support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 pt-4 border-t border-slate-800">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search reports by title, well, or keyword (e.g., 'mud loss 2840m')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 pl-8 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>

          <div className="w-full sm:w-auto">
            <select
              aria-label="Filter Documents by Type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Document Types</option>
              <option value="Well Completion Report (WCR)">Well Completion Report (WCR)</option>
              <option value="Daily Drilling Report (DDR)">Daily Drilling Report (DDR)</option>
              <option value="NPT Post-Mortem Report">NPT Post-Mortem Report</option>
              <option value="Mud Logging Report">Mud Logging Report</option>
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all shadow-md group"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-800 rounded">
                    {doc.docType.split(' ')[0]}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">{doc.wellName}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{doc.status}</span>
                </span>
              </div>

              <h2 className="text-base font-extrabold text-white mt-3 group-hover:text-amber-300 transition-colors">
                {doc.title}
              </h2>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Published: {doc.date} · File Size: {doc.fileSize}
              </div>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                {doc.summary}
              </p>

              {/* Extracted Entities Tag Cloud */}
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                  NLP Extracted Entities ({doc.extractedEntities.length}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {doc.extractedEntities.slice(0, 4).map((ent, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 bg-slate-950 text-slate-300 border border-slate-800 rounded"
                    >
                      <strong className="text-amber-400">{ent.label}:</strong> {ent.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div className="text-[11px] font-mono text-slate-400">
                {doc.extractedEventsCount} events · {doc.extractedParamsCount} params
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectWell(doc.wellId)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white text-xs"
                >
                  View Well
                </button>
                <button
                  onClick={() => onOpenDocumentModal(doc.id)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Document &amp; OCR</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
