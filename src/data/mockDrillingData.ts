import {
  OffsetWell,
  RealtimeTelemetry,
  HistoricalEvent,
  FormationInfo,
  RiskAlert,
  SourceDocument,
  DepthLogPoint,
  CopilotMessage
} from '../types/drilling';

export const ACTIVE_WELL_ID = 'OIL-101';

export const FORMATIONS_DATA: FormationInfo[] = [
  {
    name: 'Alluvium',
    age: 'Recent / Quaternary',
    depthStart: 0,
    depthEnd: 350,
    lithology: 'Unconsolidated clay, sand, gravel & river silt',
    color: '#94a3b8',
    wellCount: 14,
    commonProblems: ['Surface hole washout', 'High filter cake thickness'],
    historicalEventFrequency: 0.2,
    mudLossFrequency: 4,
    stuckPipeFrequency: 1,
    kickFrequency: 0,
    cementingIssues: 3,
    avgNptHours: 3.2,
    porosityAvgPct: 32,
    permeabilityAvgMd: 1200,
    porePressureGradientSG: 1.02,
    fractureGradientSG: 1.45,
    drillingRecommendations: ['Maintain high flow rate for hole cleaning', 'Use bentonite spud mud with fiber LCM']
  },
  {
    name: 'Dihing Formation',
    age: 'Pliocene - Pleistocene',
    depthStart: 350,
    depthEnd: 920,
    lithology: 'Poorly consolidated pebble beds, coarse gritty sandstones & thin clay bands',
    color: '#a1a1aa',
    wellCount: 14,
    commonProblems: ['Borehole enlargement', 'Tight hole during wiper trips', 'Vibration in gravel beds'],
    historicalEventFrequency: 0.5,
    mudLossFrequency: 8,
    stuckPipeFrequency: 3,
    kickFrequency: 0,
    cementingIssues: 6,
    avgNptHours: 5.8,
    porosityAvgPct: 28,
    permeabilityAvgMd: 850,
    porePressureGradientSG: 1.03,
    fractureGradientSG: 1.52,
    drillingRecommendations: ['Optimize bit hydraulics to avoid washing out pebbly matrix', 'Monitor torque variation']
  },
  {
    name: 'Girujan Clay Formation',
    age: 'Miocene',
    depthStart: 920,
    depthEnd: 1850,
    lithology: 'Variegated, mottled plastic claystones, mudstones & subordinate siltstones',
    color: '#78716c',
    wellCount: 14,
    commonProblems: ['Reactive shale swelling', 'Bit balling', 'Pack-off', 'High plastic viscosity'],
    historicalEventFrequency: 1.4,
    mudLossFrequency: 12,
    stuckPipeFrequency: 18,
    kickFrequency: 0,
    cementingIssues: 8,
    avgNptHours: 14.2,
    porosityAvgPct: 18,
    permeabilityAvgMd: 15,
    porePressureGradientSG: 1.05,
    fractureGradientSG: 1.62,
    drillingRecommendations: [
      'Maintain strong PHPA polymer encapsulation',
      'Keep low MBT clay content < 25 ppb equivalent',
      'Use high ROP PDC bits with anti-balling coating'
    ]
  },
  {
    name: 'Tipam Sandstone Formation',
    age: 'Miocene',
    depthStart: 1850,
    depthEnd: 2520,
    lithology: 'Massive, medium to coarse grained multi-storied salt-and-pepper sandstones',
    color: '#ca8a04',
    wellCount: 14,
    commonProblems: ['Differential sticking in thick permeable sands', 'Torque fluctuations', 'Thick mud cake'],
    historicalEventFrequency: 1.2,
    mudLossFrequency: 22,
    stuckPipeFrequency: 26,
    kickFrequency: 5,
    cementingIssues: 12,
    avgNptHours: 16.5,
    porosityAvgPct: 24,
    permeabilityAvgMd: 380,
    porePressureGradientSG: 1.06,
    fractureGradientSG: 1.68,
    drillingRecommendations: [
      'Maintain low fluid loss (< 4 ml/30min)',
      'Add calcium carbonate bridging agents (sized 10-50 microns)',
      'Avoid prolonged stationary pipe during connections'
    ]
  },
  {
    name: 'Surma Group',
    age: 'Early to Middle Miocene',
    depthStart: 2520,
    depthEnd: 2720,
    lithology: 'Alternating hard fissile dark grey shales, silty sandstones & carbonaceous streaks',
    color: '#65a30d',
    wellCount: 14,
    commonProblems: ['Mechanical borehole breakout', 'Tight hole on trips'],
    historicalEventFrequency: 0.9,
    mudLossFrequency: 14,
    stuckPipeFrequency: 12,
    kickFrequency: 8,
    cementingIssues: 7,
    avgNptHours: 8.4,
    porosityAvgPct: 15,
    permeabilityAvgMd: 45,
    porePressureGradientSG: 1.10,
    fractureGradientSG: 1.72,
    drillingRecommendations: ['Control trip speed to prevent swab/surge pressure surges', 'Monitor cuttings shape']
  },
  {
    name: 'Barail Sandstone Formation',
    age: 'Oligocene',
    depthStart: 2720,
    depthEnd: 3180,
    lithology: 'Fine to medium grained quartzitic oil & gas sands, interbedded with coaly shales and micro-fractured depleted intervals (2800-2910m)',
    color: '#0284c7',
    wellCount: 14,
    commonProblems: [
      'Severe mud losses in sub-normally pressured/depleted pay zones (2,800 - 2,910 m)',
      'Differential pipe sticking',
      'Torque spikes near coal/chert bands (3,100 - 3,180 m)'
    ],
    historicalEventFrequency: 3.8,
    mudLossFrequency: 46,
    stuckPipeFrequency: 32,
    kickFrequency: 18,
    cementingIssues: 24,
    avgNptHours: 32.6,
    porosityAvgPct: 21,
    permeabilityAvgMd: 240,
    porePressureGradientSG: 1.08, // depleted zone local gradient ~0.98 - 1.04 SG!
    fractureGradientSG: 1.58, // lower fracture gradient in depleted zones!
    drillingRecommendations: [
      'CRITICAL: Monitor pit level and flow-out continuously (high historical loss zone 2,800-2,910m)',
      'Hold 50 bbl engineered LCM pill (nut plug, mica, sized marble) ready in slug pit',
      'Optimize ECD below 1.32 SG — avoid abrupt pump restarts',
      'Maintain maximum pipe rotation while reciprocating'
    ]
  },
  {
    name: 'Kopili Shale Formation',
    age: 'Late Eocene',
    depthStart: 3180,
    depthEnd: 3420,
    lithology: 'Splintery, calcareous dark carbonaceous shales with abnormal geopressure & sloughing',
    color: '#9333ea',
    wellCount: 12,
    commonProblems: ['Overpressured gas kicks', 'Sloughing shale', 'Borehole collapse', 'Hole pack-off'],
    historicalEventFrequency: 2.9,
    mudLossFrequency: 18,
    stuckPipeFrequency: 38,
    kickFrequency: 42,
    cementingIssues: 20,
    avgNptHours: 29.4,
    porosityAvgPct: 9,
    permeabilityAvgMd: 0.8,
    porePressureGradientSG: 1.28,
    fractureGradientSG: 1.84,
    drillingRecommendations: [
      'Increase mud weight to 1.30 - 1.34 SG before entering Kopili top',
      'Perform regular flow checks on connections',
      'Ensure degasser and choke manifold ready'
    ]
  },
  {
    name: 'Jaintia Group (Sylhet Limestone)',
    age: 'Middle Eocene',
    depthStart: 3420,
    depthEnd: 3800,
    lithology: 'Dense, hard bioclastic foraminiferal limestone with vuggy secondary porosity',
    color: '#ea580c',
    wellCount: 8,
    commonProblems: ['Severe vugular lost circulation', 'Slow ROP', 'Vibration/accelerometer failure'],
    historicalEventFrequency: 2.1,
    mudLossFrequency: 35,
    stuckPipeFrequency: 15,
    kickFrequency: 25,
    cementingIssues: 30,
    avgNptHours: 22.0,
    porosityAvgPct: 12,
    permeabilityAvgMd: 80,
    porePressureGradientSG: 1.15,
    fractureGradientSG: 1.78,
    drillingRecommendations: ['Use aggressive roller cone or specialized hybrid cutter bits', 'Keep coarse LCM on standby']
  }
];

export const INITIAL_REALTIME_TELEMETRY: RealtimeTelemetry = {
  timestamp: '2026-10-02 07:35:44 UTC',
  depth: 2765.4,
  targetDepth: 3450.0,
  formation: 'Barail Sandstone Formation',
  status: 'Rotary Drilling - On Bottom (In Progress)',
  rop: 14.2,
  wob: 12.8,
  rpm: 115,
  torque: 8.4,
  spp: 2420,
  flowRate: 620,
  mudWeight: 1.28,
  pitVolume: 182.4,
  ecd: 1.34,
  bitStatus: '8-1/2" PDC 5-Blade Matrix (Depth drilled: 245 m)',
  standpipeStatus: 'Stable (+15 psi variance)',
  mudLossRate: 0.0,
  gasUnits: 14.5
};

export const OFFSET_WELLS: OffsetWell[] = [
  {
    id: 'OIL-101',
    name: 'OIL-101 (Active Well)',
    field: 'Greater Duliajan - Nahorkatiya',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.2912,
    lng: 95.3421,
    distanceKm: 0.0,
    bearingDeg: 0,
    currentDepth: 2765.4,
    totalDepth: 3450.0,
    status: 'Drilling Active',
    spudDate: '2026-08-14',
    rigName: 'OIL RIG-E1400 (Assam Asset)',
    operator: 'Oil India Limited',
    trajectory: 'S-Type Directional',
    maxInclination: 18.4,
    targetFormation: 'Barail Sandstone (Oil Pay)',
    currentFormation: 'Barail Sandstone Formation',
    drillingDurationDays: 48,
    totalNptHours: 8.5,
    majorEventsCount: {
      mudLoss: 0,
      kick: 0,
      stuckPipe: 0,
      cementing: 0,
      other: 1
    },
    similarity: {
      overall: 100,
      location: 100,
      formation: 100,
      depth: 100,
      trajectory: 100,
      mudProgram: 100
    },
    summaryNotes: 'Currently drilling 8-1/2" hole section through Barail Sandstone at 2,765 m. Target reservoir sand at 2,820-2,910 m.'
  },
  {
    id: 'OIL-097',
    name: 'OIL-097 (Offset Reference)',
    field: 'Nahorkatiya South Block',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.3025,
    lng: 95.3562,
    distanceKm: 1.82,
    bearingDeg: 48,
    currentDepth: 3380.0,
    totalDepth: 3380.0,
    status: 'Completed Producer',
    spudDate: '2023-04-10',
    completionDate: '2023-06-28',
    rigName: 'OIL RIG-12',
    operator: 'Oil India Limited',
    trajectory: 'S-Type Directional',
    maxInclination: 19.1,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Barail Sandstone / Kopili',
    drillingDurationDays: 79,
    totalNptHours: 58.0,
    majorEventsCount: {
      mudLoss: 2,
      kick: 0,
      stuckPipe: 1,
      cementing: 1,
      other: 3
    },
    similarity: {
      overall: 93.4,
      location: 96.0,
      formation: 98.0,
      depth: 92.0,
      trajectory: 94.0,
      mudProgram: 87.0
    },
    summaryNotes: 'Highest relevance offset well. Experienced severe mud loss (45 bbl/hr) at 2,840 m in Barail Sandstone depleted reservoir zone. Controlled after pumping 35 bbl mica/nutplug LCM pill.'
  },
  {
    id: 'OIL-098',
    name: 'OIL-098 (Offset Reference)',
    field: 'Nahorkatiya West Block',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.3115,
    lng: 95.3218,
    distanceKm: 3.18,
    bearingDeg: 312,
    currentDepth: 3510.0,
    totalDepth: 3510.0,
    status: 'Completed Producer',
    spudDate: '2022-11-05',
    completionDate: '2023-01-20',
    rigName: 'OIL RIG-9',
    operator: 'Oil India Limited',
    trajectory: 'Vertical',
    maxInclination: 3.2,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Kopili / Sylhet',
    drillingDurationDays: 76,
    totalNptHours: 34.5,
    majorEventsCount: {
      mudLoss: 1,
      kick: 0,
      stuckPipe: 0,
      cementing: 1,
      other: 2
    },
    similarity: {
      overall: 88.5,
      location: 89.0,
      formation: 96.0,
      depth: 90.0,
      trajectory: 79.0,
      mudProgram: 89.0
    },
    summaryNotes: 'Experienced partial mud loss (18 bbl/hr) at 2,890 m in lower Barail Sandstone. Controlled with high-viscosity pill and reducing flow rate from 620 gpm to 540 gpm.'
  },
  {
    id: 'OIL-099',
    name: 'OIL-099 (Offset Reference)',
    field: 'Greater Duliajan East',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.2885,
    lng: 95.3835,
    distanceKm: 4.12,
    bearingDeg: 94,
    currentDepth: 3620.0,
    totalDepth: 3620.0,
    status: 'Completed Producer',
    spudDate: '2021-08-12',
    completionDate: '2021-11-15',
    rigName: 'OIL RIG-15',
    operator: 'Oil India Limited',
    trajectory: 'S-Type Directional',
    maxInclination: 21.5,
    targetFormation: 'Barail / Kopili',
    currentFormation: 'Sylhet Limestone',
    drillingDurationDays: 95,
    totalNptHours: 92.0,
    majorEventsCount: {
      mudLoss: 3,
      kick: 1,
      stuckPipe: 2,
      cementing: 2,
      other: 4
    },
    similarity: {
      overall: 84.2,
      location: 84.0,
      formation: 95.0,
      depth: 86.0,
      trajectory: 90.0,
      mudProgram: 66.0
    },
    summaryNotes: 'High NPT offset well. Suffered total mud loss at 2,875 m (60 bbl/hr), differential sticking at 2,980 m while fishing, and overpressured gas kick at 3,280 m entering Kopili Shale.'
  },
  {
    id: 'OIL-100',
    name: 'OIL-100 (Offset Reference)',
    field: 'Nahorkatiya Main Central',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.2698,
    lng: 95.3398,
    distanceKm: 2.39,
    bearingDeg: 185,
    currentDepth: 3400.0,
    totalDepth: 3400.0,
    status: 'Completed Producer',
    spudDate: '2023-09-01',
    completionDate: '2023-11-18',
    rigName: 'OIL RIG-14',
    operator: 'Oil India Limited',
    trajectory: 'J-Type Directional',
    maxInclination: 16.8,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Barail / Kopili',
    drillingDurationDays: 78,
    totalNptHours: 41.0,
    majorEventsCount: {
      mudLoss: 1,
      kick: 0,
      stuckPipe: 1,
      cementing: 0,
      other: 2
    },
    similarity: {
      overall: 90.1,
      location: 94.0,
      formation: 97.0,
      depth: 93.0,
      trajectory: 86.0,
      mudProgram: 81.0
    },
    summaryNotes: 'Experienced torque spikes and severe vibrations at 3,120 m in Barail hard chert stringers; partial seepage (10 bbl/hr) at 2,835 m mitigated with fine calcium carbonate.'
  },
  {
    id: 'OIL-102',
    name: 'OIL-102 (Offset Reference)',
    field: 'Moran West Extension',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.2512,
    lng: 95.2954,
    distanceKm: 6.48,
    bearingDeg: 231,
    currentDepth: 3290.0,
    totalDepth: 3290.0,
    status: 'Completed Producer',
    spudDate: '2020-03-15',
    completionDate: '2020-05-24',
    rigName: 'OIL RIG-7',
    operator: 'Oil India Limited',
    trajectory: 'Vertical',
    maxInclination: 2.8,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Barail Sandstone',
    drillingDurationDays: 70,
    totalNptHours: 19.5,
    majorEventsCount: {
      mudLoss: 1,
      kick: 0,
      stuckPipe: 0,
      cementing: 0,
      other: 1
    },
    similarity: {
      overall: 78.4,
      location: 75.0,
      formation: 94.0,
      depth: 88.0,
      trajectory: 65.0,
      mudProgram: 70.0
    },
    summaryNotes: 'Drilled with lighter mud weight (1.24 SG) in Barail section. Observed seepage (8 bbl/hr) at 2,830 m, successfully arrested with continuous 15 ppb calcium carbonate bridging additions.'
  },
  {
    id: 'OIL-103',
    name: 'OIL-103 (Deep Exploratory)',
    field: 'Hugrijan Deep Block',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.2345,
    lng: 95.3980,
    distanceKm: 8.21,
    bearingDeg: 142,
    currentDepth: 3750.0,
    totalDepth: 3750.0,
    status: 'Completed Producer',
    spudDate: '2019-10-10',
    completionDate: '2020-01-28',
    rigName: 'OIL RIG-E2000',
    operator: 'Oil India Limited',
    trajectory: 'S-Type Directional',
    maxInclination: 24.2,
    targetFormation: 'Sylhet / Basement',
    currentFormation: 'Sylhet Limestone',
    drillingDurationDays: 110,
    totalNptHours: 114.0,
    majorEventsCount: {
      mudLoss: 4,
      kick: 2,
      stuckPipe: 2,
      cementing: 3,
      other: 5
    },
    similarity: {
      overall: 71.2,
      location: 68.0,
      formation: 85.0,
      depth: 78.0,
      trajectory: 72.0,
      mudProgram: 53.0
    },
    summaryNotes: 'Deep exploratory well. Encountered complex faulting near Barail base and high pressure gas in Kopili interval (1.36 SG equivalent).'
  },
  {
    id: 'OIL-104',
    name: 'OIL-104 (Offset Reference)',
    field: 'Dikom North Block',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.3995,
    lng: 95.3340,
    distanceKm: 12.08,
    bearingDeg: 356,
    currentDepth: 3300.0,
    totalDepth: 3300.0,
    status: 'Completed Producer',
    spudDate: '2022-02-14',
    completionDate: '2022-04-20',
    rigName: 'OIL RIG-11',
    operator: 'Oil India Limited',
    trajectory: 'Vertical',
    maxInclination: 2.1,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Barail Sandstone',
    drillingDurationDays: 65,
    totalNptHours: 24.0,
    majorEventsCount: {
      mudLoss: 2,
      kick: 0,
      stuckPipe: 0,
      cementing: 1,
      other: 1
    },
    similarity: {
      overall: 66.8,
      location: 58.0,
      formation: 89.0,
      depth: 85.0,
      trajectory: 52.0,
      mudProgram: 51.0
    },
    summaryNotes: 'Drilled outside 10 km radius. Encountered mud loss (32 bbl/hr) at 2,860 m, proving regional extent of depleted Barail Sandstone sub-pressured zone.'
  },
  {
    id: 'OIL-105',
    name: 'OIL-105 (Offset Reference)',
    field: 'Moran Central Field',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.2840,
    lng: 95.1950,
    distanceKm: 14.58,
    bearingDeg: 268,
    currentDepth: 3480.0,
    totalDepth: 3480.0,
    status: 'Completed Producer',
    spudDate: '2021-04-18',
    completionDate: '2021-07-02',
    rigName: 'OIL RIG-8',
    operator: 'Oil India Limited',
    trajectory: 'S-Type Directional',
    maxInclination: 17.5,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Kopili Shale',
    drillingDurationDays: 75,
    totalNptHours: 46.0,
    majorEventsCount: {
      mudLoss: 1,
      kick: 1,
      stuckPipe: 2,
      cementing: 1,
      other: 2
    },
    similarity: {
      overall: 62.4,
      location: 52.0,
      formation: 86.0,
      depth: 88.0,
      trajectory: 68.0,
      mudProgram: 18.0
    },
    summaryNotes: 'Severe clay balling in Girujan at 1,420 m. Moderate mud losses (22 bbl/hr) at 2,850 m in Barail.'
  },
  {
    id: 'OIL-106',
    name: 'OIL-106 (Offset Reference)',
    field: 'Tengakhat East',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.4210,
    lng: 95.4650,
    distanceKm: 18.95,
    bearingDeg: 42,
    currentDepth: 3600.0,
    totalDepth: 3600.0,
    status: 'Completed Producer',
    spudDate: '2020-07-22',
    completionDate: '2020-10-12',
    rigName: 'OIL RIG-16',
    operator: 'Oil India Limited',
    trajectory: 'Horizontal',
    maxInclination: 88.2,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Barail Sandstone',
    drillingDurationDays: 82,
    totalNptHours: 64.0,
    majorEventsCount: {
      mudLoss: 2,
      kick: 0,
      stuckPipe: 3,
      cementing: 2,
      other: 3
    },
    similarity: {
      overall: 54.1,
      location: 45.0,
      formation: 82.0,
      depth: 80.0,
      trajectory: 30.0,
      mudProgram: 34.0
    },
    summaryNotes: 'Horizontal drain-hole in Barail. Experienced differential sticking in high-permeability sand body.'
  },
  {
    id: 'OIL-095',
    name: 'OIL-095 (Offset Reference)',
    field: 'Nahorkatiya North Extension',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.3480,
    lng: 95.3120,
    distanceKm: 6.95,
    bearingDeg: 335,
    currentDepth: 3410.0,
    totalDepth: 3410.0,
    status: 'Completed Producer',
    spudDate: '2021-01-10',
    completionDate: '2021-03-24',
    rigName: 'OIL RIG-10',
    operator: 'Oil India Limited',
    trajectory: 'S-Type Directional',
    maxInclination: 17.9,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Kopili Shale',
    drillingDurationDays: 73,
    totalNptHours: 49.5,
    majorEventsCount: {
      mudLoss: 2,
      kick: 1,
      stuckPipe: 1,
      cementing: 1,
      other: 2
    },
    similarity: {
      overall: 79.2,
      location: 74.0,
      formation: 95.0,
      depth: 91.0,
      trajectory: 88.0,
      mudProgram: 48.0
    },
    summaryNotes: 'Encountered 40 bbl/hr mud loss at 2,845 m in Barail Sandstone. Needed two sequential LCM pills (first fine, second coarse mica + walnut hulls).'
  },
  {
    id: 'OIL-096',
    name: 'OIL-096 (Offset Reference)',
    field: 'Duliajan South Block',
    basin: 'Upper Assam Shelf Basin',
    lat: 27.2080,
    lng: 95.3410,
    distanceKm: 9.25,
    bearingDeg: 181,
    currentDepth: 3550.0,
    totalDepth: 3550.0,
    status: 'Completed Producer',
    spudDate: '2022-06-04',
    completionDate: '2022-08-30',
    rigName: 'OIL RIG-12',
    operator: 'Oil India Limited',
    trajectory: 'Vertical',
    maxInclination: 3.5,
    targetFormation: 'Barail Sandstone',
    currentFormation: 'Sylhet Limestone',
    drillingDurationDays: 87,
    totalNptHours: 52.0,
    majorEventsCount: {
      mudLoss: 1,
      kick: 1,
      stuckPipe: 2,
      cementing: 1,
      other: 3
    },
    similarity: {
      overall: 73.8,
      location: 70.0,
      formation: 92.0,
      depth: 89.0,
      trajectory: 60.0,
      mudProgram: 58.0
    },
    summaryNotes: 'Differential sticking at 3,010 m in thick depleted Barail sand during wireline logging run. Required pipe-freeing spotting fluid.'
  }
];

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: 'EVT-097-01',
    wellId: 'OIL-097',
    wellName: 'OIL-097',
    depth: 2840.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Mud Loss',
    severity: 'High',
    detectedDate: '2023-05-18',
    probableCause: 'Encountered micro-fractured depleted hydrocarbon-bearing reservoir sand with sub-hydrostatic pore pressure (0.98 SG equivalent). Mud weight was 1.29 SG (overbalance ~850 psi).',
    actionTaken: 'Drilled ahead with returns down to 15 bbl/hr. Mixed and spotted 35 bbl high-fluid-loss squeeze LCM pill containing 25 ppb medium nut plug, 15 ppb coarse mica, and 10 ppb calcium carbonate. Allowed 3 hours soak without circulation.',
    outcome: 'Total losses sealed; regained full returns at 2,865 m. Standpipe pressure stabilized at 2,350 psi. Drilling resumed at 12 m/hr.',
    nptHours: 14.5,
    volumeLostBbl: 185,
    sourceDocId: 'DOC-WCR-097',
    sourceDocName: 'OIL-097 Well Completion Report, Section 4.3 (pp. 38-42)',
    sourceDocPage: 39,
    distanceFromActiveKm: 1.82,
    similarityToCurrent: 94.5
  },
  {
    id: 'EVT-097-02',
    wellId: 'OIL-097',
    wellName: 'OIL-097',
    depth: 2210.0,
    formation: 'Tipam Sandstone Formation',
    eventType: 'Stuck Pipe',
    severity: 'Medium',
    detectedDate: '2023-05-02',
    probableCause: 'Mechanical pack-off caused by sloughing siltstone lenses while pulling out of hole with BHA.',
    actionTaken: 'Worked drillstring with 45 klbs overpull and jarred downward with hydraulic drilling jar for 42 minutes.',
    outcome: 'String freed successfully. Circulated bottoms-up with high-viscosity polymer sweep.',
    nptHours: 8.0,
    sourceDocId: 'DOC-DDR-097-42',
    sourceDocName: 'OIL-097 Daily Drilling Report #42',
    sourceDocPage: 2,
    distanceFromActiveKm: 1.82,
    similarityToCurrent: 82.0
  },
  {
    id: 'EVT-098-01',
    wellId: 'OIL-098',
    wellName: 'OIL-098',
    depth: 2890.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Lost Circulation',
    severity: 'Medium',
    detectedDate: '2022-12-14',
    probableCause: 'Excessive ECD (1.37 SG) while increasing pump rate to 640 gpm across high permeability depleted sand stringer.',
    actionTaken: 'Reduced pump flow rate to 520 gpm to decrease ECD to 1.30 SG. Pumped 20 bbl fibrous LCM pill with 20 ppb CaCO3.',
    outcome: 'Losses reduced from 18 bbl/hr to zero. Completed drilling section to 3,000 m without further incident.',
    nptHours: 9.5,
    volumeLostBbl: 72,
    sourceDocId: 'DOC-WCR-098',
    sourceDocName: 'OIL-098 Well Completion Report, Chapter 5 (p. 29)',
    sourceDocPage: 29,
    distanceFromActiveKm: 3.18,
    similarityToCurrent: 89.2
  },
  {
    id: 'EVT-099-01',
    wellId: 'OIL-099',
    wellName: 'OIL-099',
    depth: 2875.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Mud Loss',
    severity: 'Critical',
    detectedDate: '2021-09-24',
    probableCause: 'Intersected sub-surface natural fracture swarms associated with Nahorkatiya East fault limb under 1.31 SG mud overbalance.',
    actionTaken: 'Lost complete returns (60 bbl/hr). Pumped three successive LCM pills (first 40 bbl bentonite-diesel oil plug, second coarse walnut/cellophane, third cement plug).',
    outcome: 'Hole plugged and stabilized after 28 hours. Sidetracked 15 m due to packed bottom hole assembly.',
    nptHours: 42.0,
    volumeLostBbl: 420,
    sourceDocId: 'DOC-NPT-099',
    sourceDocName: 'OIL-099 Post-Mortem NPT Incident Investigation Report',
    sourceDocPage: 12,
    distanceFromActiveKm: 4.12,
    similarityToCurrent: 86.8
  },
  {
    id: 'EVT-099-02',
    wellId: 'OIL-099',
    wellName: 'OIL-099',
    depth: 2980.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Differential Sticking',
    severity: 'High',
    detectedDate: '2021-09-29',
    probableCause: 'High mud cake thickness (6/32") and drill collar resting stationary against porous depleted sand face for 45 minutes during electrical survey.',
    actionTaken: 'Pumped 30 bbl oil-based pipe-freeing spotting pill. Allowed 2 hours soaking while applying 60 klbs torque and jarring.',
    outcome: 'String released. Conditioned mud to reduce API fluid loss from 8.2 ml to 3.8 ml.',
    nptHours: 22.0,
    sourceDocId: 'DOC-WCR-099',
    sourceDocName: 'OIL-099 Well Completion Report (pp. 54-58)',
    sourceDocPage: 55,
    distanceFromActiveKm: 4.12,
    similarityToCurrent: 84.1
  },
  {
    id: 'EVT-099-03',
    wellId: 'OIL-099',
    wellName: 'OIL-099',
    depth: 3280.0,
    formation: 'Kopili Shale Formation',
    eventType: 'Kick',
    severity: 'High',
    detectedDate: '2021-10-18',
    probableCause: 'Transitioned abruptly into overpressured micro-fractured gas-bearing calcareous shale lens in upper Kopili without raising mud weight.',
    actionTaken: 'Well shut in on annular blowout preventer (BOP). SIDPP = 420 psi, SICP = 580 psi, pit gain = 24 bbl. Executed Wait & Weight method, increased mud weight from 1.25 SG to 1.34 SG.',
    outcome: 'Gas bubble circulated out through degasser; zero gas at shakers. Well killed successfully.',
    nptHours: 18.5,
    sourceDocId: 'DOC-WCR-099',
    sourceDocName: 'OIL-099 Well Completion Report, Section 6.2 (Well Control)',
    sourceDocPage: 64,
    distanceFromActiveKm: 4.12,
    similarityToCurrent: 80.5
  },
  {
    id: 'EVT-100-01',
    wellId: 'OIL-100',
    wellName: 'OIL-100',
    depth: 2835.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Mud Loss',
    severity: 'Medium',
    detectedDate: '2023-10-12',
    probableCause: 'Partial seepage (10-12 bbl/hr) upon penetrating upper Barail sand bed.',
    actionTaken: 'Added 15 ppb medium calcium carbonate and 5 ppb vegetable fiber to active system.',
    outcome: 'Seepage stopped after 35 minutes of circulation. No NPT recorded.',
    nptHours: 2.0,
    volumeLostBbl: 18,
    sourceDocId: 'DOC-DDR-100-34',
    sourceDocName: 'OIL-100 Daily Drilling Report #34',
    sourceDocPage: 1,
    distanceFromActiveKm: 2.39,
    similarityToCurrent: 91.0
  },
  {
    id: 'EVT-100-02',
    wellId: 'OIL-100',
    wellName: 'OIL-100',
    depth: 3120.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Torque Spike',
    severity: 'Medium',
    detectedDate: '2023-10-22',
    probableCause: 'Alternating hard siliceous chert nodules and coal seams causing stick-slip and torque variations exceeding 14 kft-lb.',
    actionTaken: 'Reduced rotary table speed from 120 RPM to 80 RPM, increased WOB damping, added lubricating beads.',
    outcome: 'Torque normalized to 8.2 kft-lb. Bit pulled at section TD with 1-2 cutter chipped.',
    nptHours: 6.0,
    sourceDocId: 'DOC-WCR-100',
    sourceDocName: 'OIL-100 Well Completion Report (pp. 31-33)',
    sourceDocPage: 32,
    distanceFromActiveKm: 2.39,
    similarityToCurrent: 88.0
  },
  {
    id: 'EVT-102-01',
    wellId: 'OIL-102',
    wellName: 'OIL-102',
    depth: 2830.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Mud Loss',
    severity: 'Low',
    detectedDate: '2020-04-12',
    probableCause: 'Seepage losses (8 bbl/hr) during bit penetration in depleted sand.',
    actionTaken: 'Reduced flow rate by 10% and introduced 10 ppb graphite and mica blend.',
    outcome: 'Losses completely arrested within 1 hour.',
    nptHours: 3.5,
    volumeLostBbl: 24,
    sourceDocId: 'DOC-WCR-102',
    sourceDocName: 'OIL-102 Well Completion Report (p. 22)',
    sourceDocPage: 22,
    distanceFromActiveKm: 6.48,
    similarityToCurrent: 79.5
  },
  {
    id: 'EVT-095-01',
    wellId: 'OIL-095',
    wellName: 'OIL-095',
    depth: 2845.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Mud Loss',
    severity: 'High',
    detectedDate: '2021-02-18',
    probableCause: 'Depleted Barail Sandstone reservoir encountered with 1.30 SG mud weight. Loss rate peaked at 40 bbl/hr.',
    actionTaken: 'Pumped 30 bbl medium LCM pill. Losses persisted at 12 bbl/hr. Followed by 25 bbl coarse pill (walnut shells and mica flakes).',
    outcome: 'Achieved full sealing after second pill. Section reached casing point at 2,980 m.',
    nptHours: 16.0,
    volumeLostBbl: 160,
    sourceDocId: 'DOC-WCR-095',
    sourceDocName: 'OIL-095 Well Completion Report (pp. 41-45)',
    sourceDocPage: 43,
    distanceFromActiveKm: 6.95,
    similarityToCurrent: 81.0
  },
  {
    id: 'EVT-104-01',
    wellId: 'OIL-104',
    wellName: 'OIL-104',
    depth: 2860.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Lost Circulation',
    severity: 'Medium',
    detectedDate: '2022-03-19',
    probableCause: 'Depleted regional Barail sand encountered. 32 bbl/hr loss recorded.',
    actionTaken: 'Spotted 25 bbl LCM pill with sized calcium carbonate.',
    outcome: 'Losses sealed in 4 hours; stabilized pit level.',
    nptHours: 8.5,
    volumeLostBbl: 95,
    sourceDocId: 'DOC-WCR-104',
    sourceDocName: 'OIL-104 Well Completion Report',
    sourceDocPage: 18,
    distanceFromActiveKm: 12.08,
    similarityToCurrent: 71.5
  },
  {
    id: 'EVT-096-01',
    wellId: 'OIL-096',
    wellName: 'OIL-096',
    depth: 3010.0,
    formation: 'Barail Sandstone Formation',
    eventType: 'Differential Sticking',
    severity: 'High',
    detectedDate: '2022-07-15',
    probableCause: 'Stationary wireline logging tool string stuck against porous sand face.',
    actionTaken: 'Spotted pipe-freeing solvent pill and jarred upward.',
    outcome: 'Tool retrieved successfully after 14 hours; no tool abandoned.',
    nptHours: 14.0,
    sourceDocId: 'DOC-WCR-096',
    sourceDocName: 'OIL-096 Well Completion Report',
    sourceDocPage: 35,
    distanceFromActiveKm: 9.25,
    similarityToCurrent: 75.0
  },
  {
    id: 'EVT-103-01',
    wellId: 'OIL-103',
    wellName: 'OIL-103',
    depth: 3310.0,
    formation: 'Kopili Shale Formation',
    eventType: 'Formation Instability',
    severity: 'High',
    detectedDate: '2019-12-04',
    probableCause: 'Brittle overpressured shale sloughing and cavings accumulation causing drillpipe pack-off.',
    actionTaken: 'Circulated high-density weighted polymer pill; back-reamed out of hole.',
    outcome: 'Hole cleaned out; raised mud weight to 1.34 SG before continuing.',
    nptHours: 21.0,
    sourceDocId: 'DOC-WCR-103',
    sourceDocName: 'OIL-103 Well Completion Report',
    sourceDocPage: 48,
    distanceFromActiveKm: 8.21,
    similarityToCurrent: 72.0
  },
  {
    id: 'EVT-105-01',
    wellId: 'OIL-105',
    wellName: 'OIL-105',
    depth: 1420.0,
    formation: 'Girujan Clay Formation',
    eventType: 'Formation Instability',
    severity: 'Medium',
    detectedDate: '2021-05-11',
    probableCause: 'Severe clay hydration and balling around PDC bit nozzles in Girujan swelling clays.',
    actionTaken: 'Tripped for bit change, adjusted PHPA polymer concentration, added glycol shale inhibitor.',
    outcome: 'Subsequent run achieved 18 m/hr ROP without balling.',
    nptHours: 12.0,
    sourceDocId: 'DOC-WCR-105',
    sourceDocName: 'OIL-105 Well Completion Report',
    sourceDocPage: 24,
    distanceFromActiveKm: 14.58,
    similarityToCurrent: 64.0
  }
];

export const RISK_ALERTS: RiskAlert[] = [
  {
    id: 'ALERT-001',
    title: 'Elevated Mud Loss Risk (2,800–2,910 m)',
    category: 'Mud Loss',
    riskLevel: 'Elevated',
    depthStart: 2800.0,
    depthEnd: 2910.0,
    distanceToRiskMeters: 34.6, // current depth is 2765.4m
    formation: 'Barail Sandstone Formation',
    confidencePct: 82,
    explanation: '3 of 7 comparable offset wells (OIL-097 at 2,840m, OIL-098 at 2,890m, OIL-099 at 2,875m) experienced sudden moderate to severe mud losses in this exact stratigraphic interval. The interval contains depleted hydrocarbon reservoir sands with low fracture gradient (1.56 - 1.58 SG) vulnerable to hydraulic fracturing under current ECD (1.34 SG).',
    evidence: {
      statSummary: '3 of 7 comparable offset wells within 5 km suffered mud losses in 2,800–2,910 m interval (total loss volume: 677 bbl, average NPT: 22.0 hrs).',
      historicalWells: [
        {
          wellId: 'OIL-097',
          depth: 2840.0,
          event: 'Severe mud loss (45 bbl/hr) under 1.29 SG mud',
          severity: 'High',
          mitigationUsed: '35 bbl high-fluid-loss squeeze LCM pill (mica + nut plug)',
          outcome: 'Regained full returns after 14.5 hrs NPT',
          sourceDocId: 'DOC-WCR-097'
        },
        {
          wellId: 'OIL-098',
          depth: 2890.0,
          event: 'Partial loss (18 bbl/hr) at 640 gpm flow rate',
          severity: 'Medium',
          mitigationUsed: 'Flow rate reduced to 520 gpm + 20 bbl fibrous LCM pill',
          outcome: 'Losses reduced to zero, 9.5 hrs NPT',
          sourceDocId: 'DOC-WCR-098'
        },
        {
          wellId: 'OIL-099',
          depth: 2875.0,
          event: 'Total mud loss (60 bbl/hr) along fault line',
          severity: 'Critical',
          mitigationUsed: 'Bentonite-diesel plug followed by cement squeeze plug',
          outcome: 'Hole plugged and sidetracked, 42.0 hrs NPT',
          sourceDocId: 'DOC-NPT-099'
        },
        {
          wellId: 'OIL-100',
          depth: 2835.0,
          event: 'Seepage loss (12 bbl/hr)',
          severity: 'Medium',
          mitigationUsed: '15 ppb CaCO3 + 5 ppb fiber pill',
          outcome: 'Seepage stopped in 35 min, 2.0 hrs NPT',
          sourceDocId: 'DOC-DDR-100-34'
        }
      ]
    },
    recommendedMonitoring: [
      'Monitor active pit volume totalizer (PVT) alarm threshold set to ± 5 bbl',
      'Monitor real-time differential flow (Flow-In vs Flow-Out)',
      'Watch ECD trend — keep ECD strictly below 1.34 SG by moderating pump rate',
      'Track standpipe pressure (SPP) dips as early indicator of lost circulation'
    ],
    recommendedMitigation: [
      'Have 50 bbl engineered LCM pill (medium nut plug + coarse mica + sized CaCO3) premixed in slug tank',
      'If losses exceed 15 bbl/hr, pull bit 10 m off bottom, stop rotation, and pump LCM pill immediately',
      'Review mud program with mud engineer to verify low rheology / plastic viscosity'
    ],
    featureWeights: [
      { name: 'Formation & Lithology Match', weightPct: 35, contribution: 'Identical Barail depleted reservoir sand facies' },
      { name: 'Depth Proximity', weightPct: 25, contribution: 'Bit only 34.6 m above historical loss zone top' },
      { name: 'Offset Well Spatial Density', weightPct: 22, contribution: '4 offset wells within 4.2 km with documented losses' },
      { name: 'Current Hydraulic ECD Trend', weightPct: 18, contribution: 'Current ECD 1.34 SG close to depleted fracture limit (1.56 SG)' }
    ]
  },
  {
    id: 'ALERT-002',
    title: 'Potential Differential Sticking Risk (2,950–3,020 m)',
    category: 'Differential Sticking',
    riskLevel: 'Elevated',
    depthStart: 2950.0,
    depthEnd: 3020.0,
    distanceToRiskMeters: 184.6,
    formation: 'Barail Sandstone Formation',
    confidencePct: 68,
    explanation: 'Historical wells OIL-099 and OIL-096 experienced differential pipe sticking in this thick, highly permeable (240 mD) depleted sand interval. Static drillstring contact with thick mud cake and high hydrostatic overbalance increases sticking probability.',
    evidence: {
      statSummary: '2 offset wells experienced differential sticking events resulting in 36 total NPT hours in lower Barail sands.',
      historicalWells: [
        {
          wellId: 'OIL-099',
          depth: 2980.0,
          event: 'Differential sticking during survey',
          severity: 'High',
          mitigationUsed: '30 bbl pipe-freeing spotting pill + 60 klbs overpull',
          outcome: 'String freed in 22 hrs',
          sourceDocId: 'DOC-WCR-099'
        },
        {
          wellId: 'OIL-096',
          depth: 3010.0,
          event: 'Stuck wireline logging string',
          severity: 'High',
          mitigationUsed: 'Solvent soak pill + upward jarring',
          outcome: 'Freed in 14 hrs',
          sourceDocId: 'DOC-WCR-096'
        }
      ]
    },
    recommendedMonitoring: [
      'Maintain maximum pipe rotation (minimum 40 RPM) and continuous reciprocation during connections',
      'Avoid stationary pipe exceeding 3 minutes in open hole',
      'Monitor API fluid loss filter cake thickness (< 2/32" target)'
    ],
    recommendedMitigation: [
      'Condition mud to keep API fluid loss below 3.5 ml/30min',
      'Prepare 30 bbl lubricant / pipe-freeing spotting fluid on rig site'
    ],
    featureWeights: [
      { name: 'Permeability & Sand Thickness', weightPct: 40, contribution: 'Thick continuous sand body with 240 mD permeability' },
      { name: 'Overbalance Pressure', weightPct: 30, contribution: 'High differential pressure between wellbore and reservoir' },
      { name: 'Offset Well Precedent', weightPct: 30, contribution: '2 documented sticking incidents during connection/logging' }
    ]
  },
  {
    id: 'ALERT-003',
    title: 'Potential Torque Spikes / Stick-Slip (3,100–3,180 m)',
    category: 'Torque Spike',
    riskLevel: 'Normal',
    depthStart: 3100.0,
    depthEnd: 3180.0,
    distanceToRiskMeters: 334.6,
    formation: 'Barail Sandstone Formation (Base)',
    confidencePct: 62,
    explanation: 'Interbedded hard siliceous chert nodules and coaly shale stringers recorded in OIL-100 at 3,120 m caused high rotary torque swings and PDC cutter wear.',
    evidence: {
      statSummary: '1 offset well experienced stick-slip and torque swings exceeding 14 kft-lb at 3,120 m.',
      historicalWells: [
        {
          wellId: 'OIL-100',
          depth: 3120.0,
          event: 'Torque spike > 14 kft-lb in hard chert stringer',
          severity: 'Medium',
          mitigationUsed: 'RPM reduced from 120 to 80, lubricant added',
          outcome: 'Torque normalized, 6.0 hrs NPT',
          sourceDocId: 'DOC-WCR-100'
        }
      ]
    },
    recommendedMonitoring: [
      'Monitor surface and downhole torque fluctuation variance',
      'Watch stick-slip indicator on rig console'
    ],
    recommendedMitigation: [
      'Optimize RPM and WOB when entering chert boundary',
      'Add liquid drilling torque reducer / glass beads if torque rises'
    ],
    featureWeights: [
      { name: 'Lithological Interbedding', weightPct: 50, contribution: 'Hard chert nodules embedded in coaly shale' },
      { name: 'Offset Well Data', weightPct: 50, contribution: 'OIL-100 recorded stick-slip at 3,120 m' }
    ]
  },
  {
    id: 'ALERT-004',
    title: 'Overpressure Gas Kick Awareness (3,250–3,320 m)',
    category: 'Kick',
    riskLevel: 'Elevated',
    depthStart: 3250.0,
    depthEnd: 3320.0,
    distanceToRiskMeters: 484.6,
    formation: 'Kopili Shale Formation',
    confidencePct: 74,
    explanation: 'Transition into upper Kopili Shale formation in this sector frequently exhibits abnormal pore pressure kicks (up to 1.34 SG equivalent), as observed in OIL-099 (gas kick with 580 psi SICP) and OIL-103.',
    evidence: {
      statSummary: '2 offset wells recorded well-control shut-ins entering Kopili formation top.',
      historicalWells: [
        {
          wellId: 'OIL-099',
          depth: 3280.0,
          event: 'Gas kick (24 bbl pit gain, SICP 580 psi)',
          severity: 'High',
          mitigationUsed: 'Wait & Weight method; mud weight raised from 1.25 to 1.34 SG',
          outcome: 'Well killed safely, 18.5 hrs NPT',
          sourceDocId: 'DOC-WCR-099'
        }
      ]
    },
    recommendedMonitoring: [
      'Conduct BOP pit drill and check choke line lineup before drilling past 3,200 m',
      'Perform flow check on every connection below 3,220 m',
      'Verify mud gas chromatograph and degasser operational status'
    ],
    recommendedMitigation: [
      'Plan mud weight increase to 1.32 - 1.34 SG prior to crossing Barail-Kopili boundary'
    ],
    featureWeights: [
      { name: 'Geopressure Gradient Shift', weightPct: 45, contribution: 'Pore pressure jumps from 1.08 SG to 1.28-1.34 SG' },
      { name: 'Historical Well Control Events', weightPct: 35, contribution: 'OIL-099 suffered high pressure gas influx at 3,280 m' },
      { name: 'Gas Chromatograph Readings', weightPct: 20, contribution: 'Background gas trends in offset wells' }
    ]
  }
];

export const SOURCE_DOCUMENTS: SourceDocument[] = [
  {
    id: 'DOC-WCR-097',
    title: 'OIL-097 Well Completion Report',
    wellId: 'OIL-097',
    wellName: 'OIL-097',
    docType: 'Well Completion Report (WCR)',
    date: '2023-07-15',
    status: 'Verified by Geologist',
    fileSize: '14.2 MB (98 Pages)',
    extractedEventsCount: 5,
    extractedParamsCount: 42,
    summary: 'Comprehensive post-drilling engineering report for OIL-097 drilled in Nahorkatiya South block to total depth 3,380 m. Highlights severe mud losses at 2,840 m in Barail Sandstone and successful LCM pill sealing protocol.',
    keyExcerpts: [
      {
        section: 'Section 4.3: Lost Circulation Incident at 2,840 m MD',
        depth: 2840,
        text: 'At 2,840 m MD while drilling 8-1/2" hole with 1.29 SG polymer mud, instantaneous loss of returns was observed with pit volume dropping by 38 bbl within 25 minutes. Initial loss rate measured 45 bbl/hr. Drilling was halted, bit pulled 15 m off bottom. Formulated and pumped 35 bbl high-fluid-loss squeeze LCM pill containing 25 ppb medium nut plug, 15 ppb coarse mica, and 10 ppb calcium carbonate. Soaked for 3 hours. Full returns regained at 2,865 m.'
      },
      {
        section: 'Section 6.1: Casing and Cementing Record',
        depth: 3020,
        text: 'Set 7" production casing at 3,020 m. Cement slurry mixed to 1.88 SG with light-weight lead slurry across Barail depleted zones to prevent hydraulic breakdown.'
      }
    ],
    extractedEntities: [
      { label: 'Well Name', value: 'OIL-097' },
      { label: 'Asset', value: 'Oil India Limited - Assam Asset' },
      { label: 'Field', value: 'Nahorkatiya South' },
      { label: 'Depleted Interval', value: '2,820 m - 2,910 m' },
      { label: 'Loss Rate', value: '45 bbl/hr' },
      { label: 'LCM Treatment', value: 'Mica (15 ppb) + Nut plug (25 ppb) + CaCO3 (10 ppb)' },
      { label: 'Result', value: 'Full returns restored, 14.5 hrs NPT' }
    ]
  },
  {
    id: 'DOC-DDR-097-42',
    title: 'OIL-097 Daily Drilling Report #42',
    wellId: 'OIL-097',
    wellName: 'OIL-097',
    docType: 'Daily Drilling Report (DDR)',
    date: '2023-05-18',
    status: 'Parsed & Indexed',
    fileSize: '1.4 MB (4 Pages)',
    extractedEventsCount: 2,
    extractedParamsCount: 28,
    summary: '24-hour operational log covering mud loss onset at 2,840 m, mud tank levels, chemical inventory consumption, and BHA parameters during LCM pill squeeze.',
    keyExcerpts: [
      {
        section: 'Daily Operations Log 06:00 - 12:00',
        depth: 2840,
        text: '08:45 hrs: Penetrated into sand top at 2,838 m. ROP jumped from 11 m/hr to 22 m/hr. 09:10 hrs: PVT alarm sounded, loss of 15 bbl in active pit. Flow out paddle dropped to 40%. Stopped pumps and shut down rotary. 10:15 hrs: Began pill preparation in slug pit #2.'
      }
    ],
    extractedEntities: [
      { label: 'DDR Date', value: '18-May-2023' },
      { label: 'Depth Start', value: '2,825 m' },
      { label: 'Depth End', value: '2,848 m' },
      { label: 'Mud Density', value: '1.29 SG' },
      { label: 'Active Pit Loss', value: '38 bbl' },
      { label: 'Mud Engineer', value: 'P. Saikia (OIL)' }
    ]
  },
  {
    id: 'DOC-WCR-098',
    title: 'OIL-098 Well Completion Report',
    wellId: 'OIL-098',
    wellName: 'OIL-098',
    docType: 'Well Completion Report (WCR)',
    date: '2023-02-10',
    status: 'Verified by Geologist',
    fileSize: '11.8 MB (84 Pages)',
    extractedEventsCount: 3,
    extractedParamsCount: 38,
    summary: 'Technical completion document for OIL-098 in Nahorkatiya West block. Details partial lost circulation at 2,890 m and ECD optimization procedure that allowed drilling through Barail sands.',
    keyExcerpts: [
      {
        section: 'Chapter 5: Mud Engineering and Wellbore Stability',
        depth: 2890,
        text: 'At 2,890 m MD, continuous partial losses of 18 bbl/hr were noted when pump rate exceeded 620 gpm (ECD 1.37 SG). Reduced pump rate to 520 gpm (lowering ECD to 1.30 SG) and pumped 20 bbl fibrous LCM pill. Losses dropped to zero immediately, demonstrating ECD sensitivity.'
      }
    ],
    extractedEntities: [
      { label: 'Well Name', value: 'OIL-098' },
      { label: 'Target Formation', value: 'Barail Sandstone' },
      { label: 'Critical ECD', value: '1.30 SG' },
      { label: 'Remedial Action', value: 'Pump rate reduction + 20 bbl fibrous LCM pill' }
    ]
  },
  {
    id: 'DOC-NPT-099',
    title: 'OIL-099 Post-Mortem NPT Incident Investigation Report',
    wellId: 'OIL-099',
    wellName: 'OIL-099',
    docType: 'NPT Post-Mortem Report',
    date: '2021-12-05',
    status: 'Verified by Geologist',
    fileSize: '8.6 MB (52 Pages)',
    extractedEventsCount: 4,
    extractedParamsCount: 34,
    summary: 'Comprehensive root cause failure analysis of the 92 hours of non-productive time incurred on OIL-099, including catastrophic mud loss at 2,875 m, stuck pipe at 2,980 m, and well control kick at 3,280 m.',
    keyExcerpts: [
      {
        section: 'Root Cause Analysis: Severe Losses at 2,875 m',
        depth: 2875,
        text: 'OIL-099 was drilled with high overbalance (1.31 SG vs estimated pore pressure 1.01 SG) in close proximity to the eastern boundary fault. Natural open micro-fractures dilated under hydraulic pressure, taking 420 bbl of drilling fluid. Conventional pills failed until bentonite-diesel gunk plug and cement plug were deployed.'
      }
    ],
    extractedEntities: [
      { label: 'Total NPT Hours', value: '92.0 hrs' },
      { label: 'Lost Fluid Volume', value: '420 bbl' },
      { label: 'Primary Cause', value: 'High mud overbalance near fault zone' },
      { label: 'Recommendation', value: 'Maintain LCM on surface before drilling Barail 2800m' }
    ]
  },
  {
    id: 'DOC-WCR-100',
    title: 'OIL-100 Well Completion Report',
    wellId: 'OIL-100',
    wellName: 'OIL-100',
    docType: 'Well Completion Report (WCR)',
    date: '2023-12-01',
    status: 'Parsed & Indexed',
    fileSize: '13.1 MB (88 Pages)',
    extractedEventsCount: 3,
    extractedParamsCount: 36,
    summary: 'Drilling summary for directional well OIL-100. Records seepage control at 2,835 m using preemptive fine calcium carbonate and mitigation of stick-slip in hard chert stringers at 3,120 m.',
    keyExcerpts: [
      {
        section: 'Section 5.2: Torque Management in Lower Barail',
        depth: 3120,
        text: 'Encountered dense chert nodules at 3,120 m. Surface torque surged from 7.5 kft-lb to over 14 kft-lb with stick-slip severity index reaching 85%. Addressed by lowering rotary table to 80 RPM and introducing bead lubricant.'
      }
    ],
    extractedEntities: [
      { label: 'Well Name', value: 'OIL-100' },
      { label: 'Depth Interval', value: '3,100 - 3,180 m' },
      { label: 'Phenomenon', value: 'Stick-Slip / Torque Spikes' },
      { label: 'Solution', value: 'RPM reduction and lubricating beads' }
    ]
  },
  {
    id: 'DOC-MLR-101',
    title: 'OIL-101 Mud Logging Daily Report (Active Well)',
    wellId: 'OIL-101',
    wellName: 'OIL-101',
    docType: 'Mud Logging Report',
    date: '2026-10-02',
    status: 'Verified by Geologist',
    fileSize: '3.2 MB (12 Pages)',
    extractedEventsCount: 1,
    extractedParamsCount: 45,
    summary: 'Current real-time mud logging record for active well OIL-101 at 2,765 m. Lithology shows fine-to-medium grained quartzose sandstone with minor carbonaceous shale streaks. Background gas 14.5 units.',
    keyExcerpts: [
      {
        section: 'Current Interval 2,750 - 2,765 m',
        depth: 2765,
        text: 'Drilling 8-1/2" hole at 2,765.4 m in Barail Sandstone. Cuttings: 75% sandstone, off-white to light grey, sub-angular, moderately sorted, fair visible porosity; 25% dark grey carbonaceous shale. Background gas 14.5 units with traces of C1-C3 hydrocarbons.'
      }
    ],
    extractedEntities: [
      { label: 'Current Depth', value: '2,765.4 m' },
      { label: 'Formation', value: 'Barail Sandstone Formation' },
      { label: 'Mud Weight In', value: '1.28 SG' },
      { label: 'ECD', value: '1.34 SG' },
      { label: 'Background Gas', value: '14.5 Units' }
    ]
  }
];

// Generate synchronized depth log data (0 to 3,450 meters)
export const GENERATE_DEPTH_LOGS = (): DepthLogPoint[] => {
  const points: DepthLogPoint[] = [];
  const startDepth = 2500;
  const endDepth = 3300;
  const step = 10; // every 10m

  for (let d = startDepth; d <= endDepth; d += step) {
    let form = 'Surma Group';
    let lith = 'Shale / Silt';
    if (d >= 2720 && d < 3180) {
      form = 'Barail Sandstone';
      lith = d >= 2800 && d <= 2910 ? 'Depleted Sand (Loss Zone)' : 'Quartz Sandstone';
    } else if (d >= 3180) {
      form = 'Kopili Shale';
      lith = 'Overpressured Calcareous Shale';
    }

    // Base values with realistic noise and anomaly around 2840m
    const isLossZone = d >= 2820 && d <= 2910;
    const isChertZone = d >= 3100 && d <= 3160;

    const rop = isLossZone ? 22 + Math.sin(d / 15) * 4 : isChertZone ? 5 + Math.random() * 2 : 12 + Math.sin(d / 30) * 3;
    const torque = isChertZone ? 13.5 + Math.random() * 2.5 : isLossZone ? 9.8 + Math.random() * 1.5 : 7.8 + Math.sin(d / 40) * 0.8;
    const wob = isChertZone ? 16 + Math.random() * 2 : 12.5 + Math.sin(d / 20) * 1.2;
    const rpm = isChertZone ? 85 : 115;
    const spp = isLossZone ? 2180 + Math.random() * 40 : 2420 + Math.sin(d / 50) * 60;
    const mudWeight = d > 3200 ? 1.34 : 1.28;
    const ecd = mudWeight + 0.05 + (isLossZone ? -0.02 : 0.01);

    points.push({
      depth: d,
      rop: Number(rop.toFixed(1)),
      torque: Number(torque.toFixed(1)),
      wob: Number(wob.toFixed(1)),
      rpm: Math.round(rpm),
      spp: Math.round(spp),
      mudWeight: Number(mudWeight.toFixed(2)),
      ecd: Number(ecd.toFixed(2)),
      formation: form,
      lithologyCode: lith
    });
  }

  return points;
};

export const INITIAL_COPILOT_MESSAGES: CopilotMessage[] = [
  {
    id: 'MSG-001',
    sender: 'copilot',
    timestamp: '07:30 UTC',
    content: 'Welcome to NWIS Copilot for active well OIL-101. Currently drilling at 2,765.4 m in Barail Sandstone. Notice that you are 34.6 m above a major historical mud loss zone (2,800–2,910 m) identified across offset wells OIL-097, OIL-098, and OIL-099. How can I assist your drilling plan today?'
  }
];

export const PRESET_COPILOT_QUERIES = [
  'What happened around 2850m in nearby wells?',
  'Which wells are most comparable to the active well?',
  'Show all mud loss incidents in Barail Sandstone',
  'What mitigation was used for losses in OIL-097?',
  'Why is 2800–2900m considered a risk zone?',
  'What happened before stuck pipe incidents in this field?'
];
