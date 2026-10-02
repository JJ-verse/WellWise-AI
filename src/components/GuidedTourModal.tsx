import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Compass,
  Play
} from 'lucide-react';
import { NavigationTab } from './Sidebar';

export interface TourStep {
  stepNumber: number;
  title: string;
  description: string;
  targetTab: NavigationTab;
  wellId?: string;
  docId?: string;
  copilotQuery?: string;
  calloutAction: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    title: '1. Open NWIS Decision Support',
    description: 'Welcome to the Nearby Wells Intelligence System for Oil India Limited drilling operations.',
    targetTab: 'overview',
    calloutAction: 'Viewing the Command Center overview.'
  },
  {
    stepNumber: 2,
    title: '2. Select Active Well OIL-101',
    description: 'Active rotary drilling rig OIL-101 is selected in the Nahorkatiya asset.',
    targetTab: 'overview',
    wellId: 'OIL-101',
    calloutAction: 'OIL-101 set as active well context.'
  },
  {
    stepNumber: 3,
    title: '3. Dashboard Shows Current Drilling Conditions',
    description: 'eRTMAC stream shows current depth at 2,765.4 m in Barail Sandstone with live ROP, Torque, and ECD.',
    targetTab: 'active-well',
    wellId: 'OIL-101',
    calloutAction: 'Observing real-time parameters vs depth.'
  },
  {
    stepNumber: 4,
    title: '4. Open Nearby Wells Geospatial Map',
    description: 'Switching to the interactive GIS oilfield map centered on active well OIL-101.',
    targetTab: 'nearby-map',
    calloutAction: 'Navigating to geospatial offset exploration.'
  },
  {
    stepNumber: 5,
    title: '5. Select 5 km Search Radius',
    description: 'Filtering offset wells within a 5 km radius in the Upper Assam Shelf Basin.',
    targetTab: 'nearby-map',
    calloutAction: 'Concentric 5 km radius highlighted on GIS canvas.'
  },
  {
    stepNumber: 6,
    title: '6. Map Displays Offset Wells',
    description: 'Identified 4 key offset wells within 5 km: OIL-097, OIL-098, OIL-099, and OIL-100.',
    targetTab: 'nearby-map',
    calloutAction: 'Viewing offset wells and fault lines.'
  },
  {
    stepNumber: 7,
    title: '7. Select Offset Well OIL-097',
    description: 'Selecting OIL-097 (1.82 km NE, 93.4% geological similarity score).',
    targetTab: 'nearby-map',
    wellId: 'OIL-097',
    calloutAction: 'Side panel reveals OIL-097 forensics.'
  },
  {
    stepNumber: 8,
    title: '8. Open Well Intelligence for OIL-097',
    description: 'Inspecting chronological depth timeline and drilling history for OIL-097.',
    targetTab: 'comparison', // or well intel
    wellId: 'OIL-097',
    calloutAction: 'Exploring forensic depth chronology.'
  },
  {
    stepNumber: 9,
    title: '9. Observe Severe Mud Loss at 2,840 m',
    description: 'OIL-097 suffered 45 bbl/hr mud loss at 2,840 m in depleted Barail Sandstone, cured with 35 bbl mica/nutplug LCM pill.',
    targetTab: 'events',
    wellId: 'OIL-097',
    calloutAction: 'Reviewing 2,840 m mud loss incident card.'
  },
  {
    stepNumber: 10,
    title: '10. Compare OIL-097 with Active Well OIL-101',
    description: 'Correlating mud programs, trajectories, and parameters side-by-side in the comparator.',
    targetTab: 'comparison',
    calloutAction: 'Comparing engineering parameters and ECD.'
  },
  {
    stepNumber: 11,
    title: '11. Open Formation Intelligence',
    description: 'Inspecting Barail Sandstone stratigraphic characteristics and lithological vulnerability.',
    targetTab: 'formation',
    calloutAction: 'Inspecting Barail Sandstone hazard matrix.'
  },
  {
    stepNumber: 12,
    title: '12. System Highlights 2,800–2,910 m Risk Zone',
    description: 'Historical data reveals a 46% mud-loss rate in the 2,800–2,910 m depleted reservoir sand interval.',
    targetTab: 'formation',
    calloutAction: 'Depleted pay hazard interval highlighted.'
  },
  {
    stepNumber: 13,
    title: '13. Open Risk & Proactive Alerts',
    description: 'Accessing the proactive early-warning engine for approaching hazards.',
    targetTab: 'risks',
    calloutAction: 'Viewing early warning alert dashboard.'
  },
  {
    stepNumber: 14,
    title: '14. Upcoming Mud-Loss Risk Alert (34.6 m ahead)',
    description: 'System alerts that current bit at 2,765 m is only 35 m away from the historical loss window.',
    targetTab: 'risks',
    calloutAction: 'Reviewing proximity gap and confidence score.'
  },
  {
    stepNumber: 15,
    title: '15. Open Explainable AI Evidence',
    description: 'Expanding "Why this alert?" to view deterministic feature weights and contributing factors.',
    targetTab: 'risks',
    calloutAction: 'Auditing feature weights and explainability.'
  },
  {
    stepNumber: 16,
    title: '16. Examine Supporting Historical Wells',
    description: 'Evidence shows documented losses in OIL-097 (2,840m), OIL-098 (2,890m), and OIL-099 (2,875m).',
    targetTab: 'risks',
    calloutAction: 'Verifying offset well incident precedents.'
  },
  {
    stepNumber: 17,
    title: '17. Ask NWIS Copilot: "What happened around 2850m?"',
    description: 'Querying the conversational assistant regarding historical offset events around 2,850 m.',
    targetTab: 'copilot',
    copilotQuery: 'What happened around 2850m in nearby wells?',
    calloutAction: 'Dispatching query to domain Copilot.'
  },
  {
    stepNumber: 18,
    title: '18. Copilot Returns Evidence-Based Answer',
    description: 'Copilot provides a structured response with concise answer, evidence, depth interval, and recommendations.',
    targetTab: 'copilot',
    copilotQuery: 'What happened around 2850m in nearby wells?',
    calloutAction: 'Inspecting structured answer & recommendations.'
  },
  {
    stepNumber: 19,
    title: '19. Open Underlying Source Document (WCR)',
    description: 'Clicking through to view the audited Well Completion Report (WCR) with highlighted OCR excerpts.',
    targetTab: 'documents',
    docId: 'DOC-WCR-097',
    calloutAction: 'Viewing audited completion report.'
  }
];

interface GuidedTourModalProps {
  currentStepIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onJumpToStep: (index: number) => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  currentStepIndex,
  isOpen,
  onClose,
  onNextStep,
  onPrevStep,
  onJumpToStep
}) => {
  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-lg w-full bg-[#0d1422] border-2 border-amber-500 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-3 text-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <h3 className="font-extrabold text-xs uppercase tracking-wide">
            19-Step Scenario Workflow Demo
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold bg-slate-950/20 px-2 py-0.5 rounded">
            Step {currentStep.stepNumber} of 19
          </span>
          <button
            onClick={onClose}
            className="text-slate-950 hover:text-white p-1 rounded transition-colors"
            title="Close Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h4 className="font-extrabold text-sm text-white">
            {currentStep.title}
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Action Taken in UI */}
        <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] text-amber-300 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{currentStep.calloutAction}</span>
        </div>

        {/* Step progress bar */}
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
        <button
          onClick={onPrevStep}
          disabled={isFirst}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-semibold rounded-lg flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          onClick={isLast ? onClose : onNextStep}
          className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 transition-all shadow"
        >
          <span>{isLast ? 'Complete Demo' : 'Next Step'}</span>
          {!isLast && <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
