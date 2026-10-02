/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { OverviewView } from './components/OverviewView';
import { ActiveWellView } from './components/ActiveWellView';
import { NearbyWellsMap } from './components/NearbyWellsMap';
import { WellComparisonView } from './components/WellComparisonView';
import { HistoricalEventsView } from './components/HistoricalEventsView';
import { FormationIntelligenceView } from './components/FormationIntelligenceView';
import { RiskAlertsView } from './components/RiskAlertsView';
import { DrillingAnalyticsView } from './components/DrillingAnalyticsView';
import { DocumentsView } from './components/DocumentsView';
import { CopilotView } from './components/CopilotView';
import { PipelineArchitectureView } from './components/PipelineArchitectureView';
import { DepthCorrelationView } from './components/DepthCorrelationView';
import { DocumentModal } from './components/DocumentModal';
import { GuidedTourModal, TOUR_STEPS } from './components/GuidedTourModal';
import {
  OFFSET_WELLS,
  HISTORICAL_EVENTS,
  FORMATIONS_DATA,
  RISK_ALERTS,
  SOURCE_DOCUMENTS,
  INITIAL_REALTIME_TELEMETRY,
  GENERATE_DEPTH_LOGS,
  INITIAL_COPILOT_MESSAGES,
  PRESET_COPILOT_QUERIES
} from './data/mockDrillingData';
import { CopilotMessage, SourceDocument } from './types/drilling';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [selectedWellId, setSelectedWellId] = useState<string>('OIL-101');
  const [telemetry, setTelemetry] = useState(INITIAL_REALTIME_TELEMETRY);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [depthLogs, setDepthLogs] = useState(() => GENERATE_DEPTH_LOGS());
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // 19-Step Guided Tour State
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState<number>(0);

  // Active well & selected well lookup
  const activeWell = OFFSET_WELLS.find(w => w.id === 'OIL-101') || OFFSET_WELLS[0];
  const selectedWell = OFFSET_WELLS.find(w => w.id === selectedWellId) || activeWell;
  const selectedDocument = SOURCE_DOCUMENTS.find(d => d.id === selectedDocId) || null;

  // Real-time simulated telemetry stream
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        // Slowly advance depth by 0.05m
        const newDepth = prev.depth + 0.02;
        // Minor natural sensor variations
        const wobNoise = (Math.random() - 0.5) * 0.4;
        const ropNoise = (Math.random() - 0.5) * 0.6;
        const sppNoise = Math.round((Math.random() - 0.5) * 15);
        const torqueNoise = (Math.random() - 0.5) * 0.2;

        return {
          ...prev,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          depth: Number(newDepth.toFixed(2)),
          rop: Number(Math.max(5, prev.rop + ropNoise).toFixed(1)),
          wob: Number(Math.max(8, prev.wob + wobNoise).toFixed(1)),
          torque: Number(Math.max(4, prev.torque + torqueNoise).toFixed(1)),
          spp: Math.max(2000, prev.spp + sppNoise),
          ecd: Number((prev.mudWeight + 0.06 + (Math.random() - 0.5) * 0.01).toFixed(2))
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Intelligent Copilot query responder
  const handleSendCopilotMessage = useCallback((query: string) => {
    const userMsgId = `MSG-USER-${Date.now()}`;
    const userMessage: CopilotMessage = {
      id: userMsgId,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      content: query
    };

    setCopilotMessages(prev => [...prev, userMessage]);

    // Generate domain-expert structured response based on query keywords
    setTimeout(() => {
      const q = query.toLowerCase();
      let response: CopilotMessage['structuredResponse'];
      let genericContent = '';

      if (q.includes('2850') || q.includes('2800') || q.includes('2900') || q.includes('mud loss')) {
        genericContent = `Historical analysis across offset wells indicates that the interval between 2,800 m and 2,910 m in the Barail Sandstone formation is a proven high-risk depleted pay zone. Three nearby wells (OIL-097, OIL-098, and OIL-099) experienced moderate to severe lost circulation here. The local fracture gradient is depleted to approximately 1.56 SG equivalent, making the zone sensitive to hydraulic ECD spikes exceeding 1.34 SG.`;
        response = {
          answer: `Multiple offset wells within 5 km encountered sudden lost circulation between 2,820 m and 2,890 m MD due to reservoir depletion and low fracture gradients.`,
          evidence: [
            {
              wellId: 'OIL-097',
              wellName: 'OIL-097',
              depth: 2840,
              event: 'Severe Mud Loss (45 bbl/hr)',
              details: 'Losses commenced at 2,840 m. Required 35 bbl mica/nutplug LCM squeeze pill (14.5h NPT).'
            },
            {
              wellId: 'OIL-098',
              wellName: 'OIL-098',
              depth: 2890,
              event: 'Partial Lost Circulation (18 bbl/hr)',
              details: 'Controlled by reducing pump rate to 520 gpm and spotting 20 bbl fibrous pill.'
            },
            {
              wellId: 'OIL-099',
              wellName: 'OIL-099',
              depth: 2875,
              event: 'Total Mud Loss (60 bbl/hr)',
              details: 'Encountered fault fracture swarm. Lost 420 bbl fluid; required cement squeeze & sidetrack.'
            }
          ],
          depthInterval: '2,800 m – 2,910 m MD (Depleted Barail Sandstone pay zone)',
          recommendedMonitoring: [
            'Tighten Active Pit Volume Totalizer (PVT) alarm to ± 5 bbl tolerance',
            'Hold 50 bbl engineered LCM pill (medium nut plug + coarse mica + sized CaCO3) ready in slug pit',
            'Cap equivalent circulating density (ECD) below 1.34 SG by limiting flow rate to 580 gpm',
            'Perform flow check immediately if sudden ROP break (> 20 m/hr) is observed'
          ],
          sources: [
            { docId: 'DOC-WCR-097', title: 'OIL-097 Well Completion Report, Section 4.3 (p. 39)', wellId: 'OIL-097', page: 39 },
            { docId: 'DOC-WCR-098', title: 'OIL-098 Well Completion Report, Chapter 5 (p. 29)', wellId: 'OIL-098', page: 29 },
            { docId: 'DOC-NPT-099', title: 'OIL-099 Post-Mortem NPT Report (p. 12)', wellId: 'OIL-099', page: 12 }
          ]
        };
      } else if (q.includes('comparable') || q.includes('similar')) {
        genericContent = `Based on multi-criteria engineering correlation (stratigraphic formation, spatial proximity, trajectory inclination, and mud program), OIL-097 is the most comparable reference well to active rig OIL-101 with a 93.4% similarity index, followed by OIL-100 (90.1%) and OIL-098 (88.5%).`;
        response = {
          answer: `OIL-097 (1.82 km NE) is the highest-fidelity analogue well for OIL-101, sharing identical S-type directional geometry and Barail Sandstone reservoir targets.`,
          evidence: [
            {
              wellId: 'OIL-097',
              wellName: 'OIL-097',
              depth: 3380,
              event: '93.4% Overall Similarity',
              details: 'Distance: 1.82 km · Max Inclination: 19.1° · Target: Barail Sandstone'
            },
            {
              wellId: 'OIL-100',
              wellName: 'OIL-100',
              depth: 3400,
              event: '90.1% Overall Similarity',
              details: 'Distance: 2.39 km · Max Inclination: 16.8° · Target: Barail Sandstone'
            }
          ],
          depthInterval: '2,720 m – 3,180 m (Barail section)',
          recommendedMonitoring: [
            'Correlate real-time ROP and torque against OIL-097 log profiles',
            'Adopt OIL-097 mud weight schedule (1.28 - 1.29 SG)'
          ],
          sources: [
            { docId: 'DOC-WCR-097', title: 'OIL-097 Well Completion Report', wellId: 'OIL-097' },
            { docId: 'DOC-WCR-100', title: 'OIL-100 Well Completion Report', wellId: 'OIL-100' }
          ]
        };
      } else if (q.includes('stuck pipe') || q.includes('sticking')) {
        genericContent = `Stuck pipe incidents in this block predominantly occur in the thick permeable sands of the Barail formation (differential sticking) or during wiper trips across swelling Girujan clays. In OIL-099 at 2,980 m, differential sticking occurred when the string remained stationary for 45 minutes during electrical logging under 850 psi hydrostatic overbalance.`;
        response = {
          answer: `Differential sticking is the primary mechanism in Barail porous sands (2,950–3,020 m), driven by thick filter cake and excessive overbalance.`,
          evidence: [
            {
              wellId: 'OIL-099',
              wellName: 'OIL-099',
              depth: 2980,
              event: 'Differential Sticking (22h NPT)',
              details: 'Collar stuck against permeable depleted sand. Freed after 30 bbl solvent soak & 60 klbs overpull.'
            },
            {
              wellId: 'OIL-096',
              wellName: 'OIL-096',
              depth: 3010,
              event: 'Stuck Wireline Tool String',
              details: 'Logging tool stuck against mud cake. Jarred free in 14 hours.'
            }
          ],
          depthInterval: '2,950 m – 3,020 m MD',
          recommendedMonitoring: [
            'Never allow drillstring to remain stationary for > 3 minutes in open hole',
            'Maintain continuous rotation (min 40 RPM) and reciprocation during connections',
            'Keep mud API fluid loss strictly below 3.5 ml/30min to minimize cake thickness'
          ],
          sources: [
            { docId: 'DOC-NPT-099', title: 'OIL-099 NPT Post-Mortem Report', wellId: 'OIL-099' },
            { docId: 'DOC-WCR-097', title: 'OIL-097 Well Completion Report', wellId: 'OIL-097' }
          ]
        };
      } else {
        genericContent = `Forensic analysis from NWIS knowledge graph shows that active well OIL-101 (currently at 2,765.4 m) is progressing on-bottom in Barail Sandstone. Approaching offset hazard data from OIL-097 and OIL-099 indicates primary operational vigilance should focus on the upcoming depleted sand interval (2,800–2,910 m) where mud loss probability is elevated.`;
        response = {
          answer: `Active drilling status is nominal, but offset data requires pre-mix of LCM pills ahead of penetrating 2,800 m.`,
          evidence: [
            {
              wellId: 'OIL-097',
              wellName: 'OIL-097',
              depth: 2840,
              event: 'Severe Mud Loss',
              details: 'Depleted Barail reservoir sand loss at 2,840 m.'
            }
          ],
          depthInterval: '2,765 m – 2,910 m MD',
          recommendedMonitoring: [
            'Monitor real-time differential flow and pit volumes',
            'Verify mud density remains at 1.28 SG'
          ],
          sources: [
            { docId: 'DOC-WCR-097', title: 'OIL-097 Completion Report', wellId: 'OIL-097' },
            { docId: 'DOC-MLR-101', title: 'OIL-101 Mud Logging Report', wellId: 'OIL-101' }
          ]
        };
      }

      const copilotMsg: CopilotMessage = {
        id: `MSG-COPILOT-${Date.now()}`,
        sender: 'copilot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' UTC',
        content: genericContent,
        structuredResponse: response
      };

      setCopilotMessages(prev => [...prev, copilotMsg]);
    }, 400);
  }, []);

  // Guided Workflow Tour Step Transition Handler
  const handleTourStepJump = useCallback((index: number) => {
    setCurrentTourStepIndex(index);
    const step = TOUR_STEPS[index];
    if (!step) return;

    setActiveTab(step.targetTab);

    if (step.wellId) {
      setSelectedWellId(step.wellId);
    }

    if (step.docId) {
      setSelectedDocId(step.docId);
    }

    if (step.copilotQuery && step.targetTab === 'copilot') {
      handleSendCopilotMessage(step.copilotQuery);
    }
  }, [handleSendCopilotMessage]);

  const handleNextTourStep = () => {
    if (currentTourStepIndex < TOUR_STEPS.length - 1) {
      handleTourStepJump(currentTourStepIndex + 1);
    } else {
      setIsTourOpen(false);
    }
  };

  const handlePrevTourStep = () => {
    if (currentTourStepIndex > 0) {
      handleTourStepJump(currentTourStepIndex - 1);
    }
  };

  const startWorkflowTour = () => {
    setCurrentTourStepIndex(0);
    setIsTourOpen(true);
    handleTourStepJump(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100">
      {/* Global Top Bar */}
      <Header
        telemetry={telemetry}
        isSimulating={isSimulating}
        onToggleSimulate={() => setIsSimulating(!isSimulating)}
        wells={OFFSET_WELLS}
        selectedWellId={selectedWellId}
        onSelectWell={(id) => setSelectedWellId(id)}
        alerts={RISK_ALERTS}
        onOpenAlerts={() => setActiveTab('risks')}
        onOpenCopilotQuery={(query) => {
          setActiveTab('copilot');
          handleSendCopilotMessage(query);
        }}
        onStartWorkflowTour={startWorkflowTour}
      />

      {/* Main Layout: Persistent Sidebar + Main Viewport */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          elevatedAlertsCount={RISK_ALERTS.filter(a => a.riskLevel === 'Elevated' || a.riskLevel === 'High').length}
          totalDocumentsCount={SOURCE_DOCUMENTS.length}
          totalEventsCount={HISTORICAL_EVENTS.length}
          onStartWorkflowTour={startWorkflowTour}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#0b0f17]">
          {/* Breadcrumb strip */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-4 pb-2 border-b border-slate-800/80">
            <span>eRTMAC-NWIS</span>
            <span>/</span>
            <span className="text-slate-300">Nahorkatiya Asset</span>
            <span>/</span>
            <span className="text-amber-400 font-bold capitalize">
              {activeTab === 'nearby-map'
                ? 'Nearby Wells Map'
                : activeTab === 'active-well'
                ? 'Active Well Parameters'
                : activeTab === 'comparison'
                ? 'Multi-Well Comparison'
                : activeTab === 'formation'
                ? 'Formation Intelligence'
                : activeTab === 'risks'
                ? 'Risk & Early Warnings'
                : activeTab === 'documents'
                ? 'Document Intelligence'
                : activeTab === 'copilot'
                ? 'AI Copilot'
                : activeTab === 'pipeline'
                ? 'Data Pipeline Architecture'
                : 'Overview'}
            </span>
          </div>

          {/* Active View Renderer */}
          {activeTab === 'overview' && (
            <OverviewView
              telemetry={telemetry}
              activeWell={activeWell}
              offsetWells={OFFSET_WELLS}
              alerts={RISK_ALERTS}
              events={HISTORICAL_EVENTS}
              formations={FORMATIONS_DATA}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectWellAndNavigate={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('comparison');
              }}
              onSelectEventAndNavigate={(eventId) => {
                setActiveTab('events');
              }}
              onAskCopilot={(query) => {
                setActiveTab('copilot');
                handleSendCopilotMessage(query);
              }}
            />
          )}

          {activeTab === 'active-well' && (
            <ActiveWellView
              telemetry={telemetry}
              activeWell={activeWell}
              depthLogs={depthLogs}
              isSimulating={isSimulating}
              onToggleSimulate={() => setIsSimulating(!isSimulating)}
              onNavigateToRisk={() => setActiveTab('risks')}
            />
          )}

          {activeTab === 'nearby-map' && (
            <NearbyWellsMap
              wells={OFFSET_WELLS}
              activeWellId="OIL-101"
              selectedWellId={selectedWellId}
              onSelectWell={(wellId) => setSelectedWellId(wellId)}
              onNavigateToWellIntel={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('comparison');
              }}
              onCompareWells={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('comparison');
              }}
              onOpenDocument={(docId) => setSelectedDocId(docId)}
              events={HISTORICAL_EVENTS}
            />
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-8">
              <WellComparisonView
                wells={OFFSET_WELLS}
                events={HISTORICAL_EVENTS}
                initialSelectedWellIds={['OIL-101', selectedWellId !== 'OIL-101' ? selectedWellId : 'OIL-097', 'OIL-098']}
                onNavigateToWellIntel={(wellId) => setSelectedWellId(wellId)}
                onOpenDocument={(docId) => setSelectedDocId(docId)}
              />

              <div className="border-t border-slate-800 pt-6">
                <DepthCorrelationView
                  depthLogs={depthLogs}
                  wells={OFFSET_WELLS}
                  events={HISTORICAL_EVENTS}
                  activeDepth={telemetry.depth}
                  onSelectWell={(wellId) => setSelectedWellId(wellId)}
                  onOpenDocument={(docId) => setSelectedDocId(docId)}
                />
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <HistoricalEventsView
              events={HISTORICAL_EVENTS}
              onSelectWell={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('nearby-map');
              }}
              onOpenDocument={(docId) => setSelectedDocId(docId)}
              onNavigateToRisk={() => setActiveTab('risks')}
            />
          )}

          {activeTab === 'formation' && (
            <FormationIntelligenceView
              formations={FORMATIONS_DATA}
              events={HISTORICAL_EVENTS}
              activeFormationName="Barail Sandstone Formation"
              onSelectWell={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('nearby-map');
              }}
              onNavigateToRisk={() => setActiveTab('risks')}
              onOpenDocument={(docId) => setSelectedDocId(docId)}
            />
          )}

          {activeTab === 'risks' && (
            <RiskAlertsView
              alerts={RISK_ALERTS}
              telemetry={telemetry}
              onSelectWell={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('comparison');
              }}
              onOpenDocument={(docId) => setSelectedDocId(docId)}
              onAskCopilot={(query) => {
                setActiveTab('copilot');
                handleSendCopilotMessage(query);
              }}
            />
          )}

          {activeTab === 'analytics' && (
            <DrillingAnalyticsView
              wells={OFFSET_WELLS}
              events={HISTORICAL_EVENTS}
              formations={FORMATIONS_DATA}
              onSelectWell={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('comparison');
              }}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsView
              documents={SOURCE_DOCUMENTS}
              onOpenDocumentModal={(docId) => setSelectedDocId(docId)}
              onSelectWell={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('nearby-map');
              }}
            />
          )}

          {activeTab === 'copilot' && (
            <CopilotView
              messages={copilotMessages}
              onSendMessage={handleSendCopilotMessage}
              onOpenDocument={(docId) => setSelectedDocId(docId)}
              onSelectWell={(wellId) => {
                setSelectedWellId(wellId);
                setActiveTab('comparison');
              }}
              onNavigateToRisk={() => setActiveTab('risks')}
              presetQueries={PRESET_COPILOT_QUERIES}
            />
          )}

          {activeTab === 'pipeline' && (
            <PipelineArchitectureView />
          )}
        </main>
      </div>

      {/* Audited Source Document Inspection Modal */}
      <DocumentModal
        document={selectedDocument}
        onClose={() => setSelectedDocId(null)}
        onSelectWell={(wellId) => {
          setSelectedWellId(wellId);
          setActiveTab('nearby-map');
        }}
      />

      {/* 19-Step Scenario Workflow Demo Stepper */}
      <GuidedTourModal
        currentStepIndex={currentTourStepIndex}
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNextStep={handleNextTourStep}
        onPrevStep={handlePrevTourStep}
        onJumpToStep={handleTourStepJump}
      />
    </div>
  );
}
