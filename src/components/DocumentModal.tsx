import React from 'react';
import {
  FileText,
  X,
  CheckCircle2,
  ExternalLink,
  Download,
  Search,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SourceDocument } from '../types/drilling';

interface DocumentModalProps {
  document: SourceDocument | null;
  onClose: () => void;
  onSelectWell: (wellId: string) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  document,
  onClose,
  onSelectWell
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#0c121e] border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base">{document.title}</h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{document.status}</span>
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Well: <strong className="text-amber-400">{document.wellName}</strong> · Published: {document.date} · {document.docType} · {document.fileSize}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Executive Summary */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-200">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
              Document Summary &amp; Scope:
            </div>
            <p className="leading-relaxed">{document.summary}</p>
          </div>

          {/* AI Extracted Forensic Entities */}
          <div>
            <div className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-2.5">
              NLP Extracted Technical Entities ({document.extractedEntities.length}):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {document.extractedEntities.map((ent, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-xs"
                >
                  <span className="text-[10px] font-mono text-slate-400 block">{ent.label}</span>
                  <span className="font-bold text-slate-100 font-mono mt-0.5 block truncate">{ent.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High-Fidelity Extracted Report Excerpts */}
          <div>
            <div className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-2.5">
              Auditable Document Excerpts &amp; Operations Log:
            </div>

            <div className="space-y-3">
              {document.keyExcerpts.map((exc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <span className="font-bold text-amber-300 font-mono">{exc.section}</span>
                    {exc.depth && (
                      <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        Depth: {exc.depth} m
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed font-mono text-[11px] bg-slate-900/60 p-3 rounded border border-slate-800/60">
                    "{exc.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400 text-[11px]">
            Oil India Limited Archives · Georeferenced &amp; Digitized in NWIS Knowledge Repository
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onSelectWell(document.wellId);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Explore {document.wellName} Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
