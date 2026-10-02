import React from 'react';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  GitCompare,
  History,
  Layers,
  AlertTriangle,
  BarChart3,
  FileText,
  Bot,
  Workflow,
  HelpCircle,
  Radio,
  ExternalLink
} from 'lucide-react';

export type NavigationTab =
  | 'overview'
  | 'active-well'
  | 'nearby-map'
  | 'comparison'
  | 'events'
  | 'formation'
  | 'risks'
  | 'analytics'
  | 'documents'
  | 'copilot'
  | 'pipeline';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  elevatedAlertsCount: number;
  totalDocumentsCount: number;
  totalEventsCount: number;
  onStartWorkflowTour: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  elevatedAlertsCount,
  totalDocumentsCount,
  totalEventsCount,
  onStartWorkflowTour
}) => {
  const navItems = [
    {
      id: 'overview' as NavigationTab,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null,
      desc: 'Command Center & Status'
    },
    {
      id: 'active-well' as NavigationTab,
      label: 'Active Well',
      icon: Radio,
      badge: 'OIL-101',
      badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-800',
      desc: 'Real-time telemetry & curves'
    },
    {
      id: 'nearby-map' as NavigationTab,
      label: 'Nearby Wells Map',
      icon: MapPin,
      badge: '5 km',
      badgeColor: 'bg-sky-950 text-sky-400 border-sky-800',
      desc: 'GIS geospatial offsets'
    },
    {
      id: 'comparison' as NavigationTab,
      label: 'Well Comparison',
      icon: GitCompare,
      badge: 'Multi-well',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      desc: 'Correlate parameters vs offset'
    },
    {
      id: 'events' as NavigationTab,
      label: 'Historical Events',
      icon: History,
      badge: `${totalEventsCount}`,
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      desc: 'Mud losses, kicks, stuck pipe'
    },
    {
      id: 'formation' as NavigationTab,
      label: 'Formation Intel',
      icon: Layers,
      badge: 'Barail',
      badgeColor: 'bg-amber-950 text-amber-400 border-amber-800',
      desc: 'Stratigraphy & hazard zones'
    },
    {
      id: 'risks' as NavigationTab,
      label: 'Risk & Alerts',
      icon: AlertTriangle,
      badge: elevatedAlertsCount > 0 ? `${elevatedAlertsCount} Alert` : null,
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse',
      desc: 'Proactive early warnings'
    },
    {
      id: 'analytics' as NavigationTab,
      label: 'Drilling Analytics',
      icon: BarChart3,
      badge: null,
      desc: 'ROP, NPT & benchmarking'
    },
    {
      id: 'documents' as NavigationTab,
      label: 'Documents & KB',
      icon: FileText,
      badge: `${totalDocumentsCount}`,
      badgeColor: 'bg-slate-800 text-slate-400 border-slate-700',
      desc: 'WCR, DDR, Mud logs OCR'
    },
    {
      id: 'copilot' as NavigationTab,
      label: 'AI Copilot',
      icon: Bot,
      badge: 'Active',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      desc: 'Evidence-based Q&A'
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0e16] border-r border-slate-800 flex flex-col shrink-0 select-none">
      {/* Asset Context */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-900/30">
        <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Operational Asset</div>
        <div className="font-semibold text-xs text-slate-200 mt-0.5 flex items-center justify-between">
          <span>Upper Assam Basin / Nahorkatiya</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-all group ${
                isActive
                  ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border text-right shrink-0 ${
                    item.badgeColor || 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-2 border-t border-slate-800/60 my-2">
          <button
            onClick={() => onTabChange('pipeline')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-all group ${
              activeTab === 'pipeline'
                ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              <Workflow
                className={`w-4 h-4 shrink-0 transition-colors ${
                  activeTab === 'pipeline' ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                }`}
              />
              <span className="truncate">Data Pipeline</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Arch</span>
          </button>
        </div>
      </nav>

      {/* Guided Walkthrough Banner */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-800">
        <button
          onClick={onStartWorkflowTour}
          className="w-full py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded text-left transition-colors group"
        >
          <div className="flex items-center justify-between text-amber-400 text-xs font-semibold">
            <span>Scenario Tour</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
            Run complete 19-step demo flow (OIL-101 → Map → Mud Loss → Risk → Copilot)
          </p>
        </button>

        {/* eRTMAC vs NWIS Core Concept Reminder */}
        <div className="mt-3 p-2 bg-slate-950/60 rounded border border-slate-800/80 text-[10px] text-slate-400 space-y-1">
          <div className="font-mono text-slate-300 font-medium">CORE VALUE PROPOSITION:</div>
          <div><strong className="text-emerald-400">eRTMAC:</strong> What is happening now.</div>
          <div><strong className="text-amber-400">NWIS:</strong> What happened historically in nearby wells + risks ahead.</div>
        </div>
      </div>
    </aside>
  );
};
