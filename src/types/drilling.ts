export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type RiskLevel = 'Normal' | 'Elevated' | 'High' | 'Critical';

export type EventCategory =
  | 'Mud Loss'
  | 'Kick'
  | 'Stuck Pipe'
  | 'Differential Sticking'
  | 'Lost Circulation'
  | 'Torque Spike'
  | 'Overpressure'
  | 'Well Control Event'
  | 'Cementing Issue'
  | 'Fishing'
  | 'NPT'
  | 'Casing Issue'
  | 'Formation Instability';

export interface FormationInterval {
  name: string;
  topDepth: number;
  bottomDepth: number;
  lithology: string;
  color: string;
  description: string;
}

export interface SimilarityBreakdown {
  overall: number; // 0-100
  location: number; // 0-100
  formation: number; // 0-100
  depth: number; // 0-100
  trajectory: number; // 0-100
  mudProgram: number; // 0-100
}

export interface OffsetWell {
  id: string;
  name: string;
  field: string;
  basin: string;
  lat: number;
  lng: number;
  distanceKm: number; // from active well OIL-101
  bearingDeg: number;
  currentDepth: number;
  totalDepth: number;
  status: 'Drilling Active' | 'Completed Producer' | 'Suspended' | 'P&A' | 'Workover';
  spudDate: string;
  completionDate?: string;
  rigName: string;
  operator: string;
  trajectory: 'Vertical' | 'S-Type Directional' | 'J-Type Directional' | 'Horizontal';
  maxInclination: number;
  targetFormation: string;
  currentFormation: string;
  drillingDurationDays: number;
  totalNptHours: number;
  majorEventsCount: {
    mudLoss: number;
    kick: number;
    stuckPipe: number;
    cementing: number;
    other: number;
  };
  similarity: SimilarityBreakdown;
  summaryNotes: string;
}

export interface RealtimeTelemetry {
  timestamp: string;
  depth: number; // meters (e.g. 2765.4)
  targetDepth: number; // 3450 m
  formation: string;
  status: string;
  rop: number; // m/hr
  wob: number; // klbs
  rpm: number; // rpm
  torque: number; // kft-lb
  spp: number; // psi
  flowRate: number; // gpm
  mudWeight: number; // SG
  pitVolume: number; // bbl or m3
  ecd: number; // SG
  bitStatus: string;
  standpipeStatus: string;
  mudLossRate: number; // bbl/hr (0 in nominal)
  gasUnits: number; // units
}

export interface HistoricalEvent {
  id: string;
  wellId: string;
  wellName: string;
  depth: number; // meters
  formation: string;
  eventType: EventCategory;
  severity: Severity;
  detectedDate: string;
  probableCause: string;
  actionTaken: string;
  outcome: string;
  nptHours: number;
  volumeLostBbl?: number;
  sourceDocId: string;
  sourceDocName: string;
  sourceDocPage?: number;
  distanceFromActiveKm: number;
  similarityToCurrent: number;
}

export interface FormationInfo {
  name: string;
  age: string;
  depthStart: number;
  depthEnd: number;
  lithology: string;
  color: string;
  wellCount: number;
  commonProblems: string[];
  historicalEventFrequency: number; // per 1000m
  mudLossFrequency: number; // percentage
  stuckPipeFrequency: number;
  kickFrequency: number;
  cementingIssues: number;
  avgNptHours: number;
  porosityAvgPct: number;
  permeabilityAvgMd: number;
  porePressureGradientSG: number;
  fractureGradientSG: number;
  drillingRecommendations: string[];
}

export interface RiskAlert {
  id: string;
  title: string;
  category: EventCategory;
  riskLevel: RiskLevel;
  depthStart: number;
  depthEnd: number;
  distanceToRiskMeters: number; // meters ahead from current bit
  formation: string;
  confidencePct: number;
  explanation: string;
  evidence: {
    statSummary: string;
    historicalWells: {
      wellId: string;
      depth: number;
      event: string;
      severity: Severity;
      mitigationUsed: string;
      outcome: string;
      sourceDocId: string;
    }[];
  };
  recommendedMonitoring: string[];
  recommendedMitigation: string[];
  featureWeights: {
    name: string;
    weightPct: number;
    contribution: string;
  }[];
}

export interface SourceDocument {
  id: string;
  title: string;
  wellId: string;
  wellName: string;
  docType:
    | 'Well Completion Report (WCR)'
    | 'Daily Drilling Report (DDR)'
    | 'Mud Logging Report'
    | 'Cementing Report'
    | 'Geological Report'
    | 'Casing Program'
    | 'NPT Post-Mortem Report';
  date: string;
  status: 'Parsed & Indexed' | 'OCR Ingested' | 'Verified by Geologist';
  fileSize: string;
  extractedEventsCount: number;
  extractedParamsCount: number;
  summary: string;
  keyExcerpts: {
    section: string;
    text: string;
    depth?: number;
  }[];
  extractedEntities: {
    label: string;
    value: string;
  }[];
}

export interface DepthLogPoint {
  depth: number;
  rop: number;
  torque: number;
  wob: number;
  rpm: number;
  spp: number;
  mudWeight: number;
  ecd: number;
  formation: string;
  lithologyCode: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  timestamp: string;
  content: string;
  structuredResponse?: {
    answer: string;
    evidence: {
      wellId: string;
      wellName: string;
      depth: number;
      event: string;
      details: string;
    }[];
    depthInterval: string;
    recommendedMonitoring: string[];
    sources: {
      docId: string;
      title: string;
      wellId: string;
      page?: number;
    }[];
  };
}
