import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import DailyReports from './pages/DailyReports';
import Sidebar from './components/Sidebar';
import Analytics from './pages/Analytics';
import Inspections from './pages/Inspections';
import Crew from './pages/Crew';
import Documents from './pages/Documents';
import TeamHub from './pages/TeamHub'; // New Import
import { SyncProvider } from './contexts/SyncContext';
import { ProjectProvider } from './contexts/ProjectContext';
import NetworkStatus from './components/NetworkStatus';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'map': return <MapView />;
      case 'teamhub': return <TeamHub />; // New Case
      case 'daily': return <DailyReports />;
      case 'analytics': return <Analytics />;
      case 'inspections': return <Inspections />;
      case 'crew': return <Crew />;
      case 'documents': return <Documents />;
      default: return <Dashboard />;
    }
  };

  return (
    <ProjectProvider>
      <SyncProvider>
        <div className="layout-wrapper relative">
          <AsideNav activePage={activePage} onNavigate={setActivePage} />

          <div className="flex-1 flex flex-col min-w-0 ml-0 md:ml-64">
            <Header />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] pb-24 md:pb-8">
              {renderPage()}
            </main>
          </div>

          <MobileNav activePage={activePage} onNavigate={setActivePage} />
          <NetworkStatus />
        </div>
      </SyncProvider>
    </ProjectProvider>
  );
};

// Inline components to avoid re-editing files multiple times for simple wiring
// Real app would pass these as props or use Context
import { LayoutDashboard, Map, ClipboardList, ShieldCheck, Settings, LogOut, Search, Bell, User, Menu, Home, TrendingUp, Users as UsersIcon, FolderOpen as FolderIcon, MessageSquare } from 'lucide-react';

const AsideNav = ({ activePage, onNavigate }) => (
  <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-white/5 text-zinc-400 min-h-screen fixed left-0 top-0 z-50">
    <div className="p-6 border-b border-white/5">
      <h1 className="text-2xl font-bold tracking-tight text-white">PipeLine One</h1>
      <p className="text-xs text-zinc-500 mt-1">Project: Keystone Ext. 4</p>
    </div>

    <nav className="flex-1 p-4 space-y-2">
      <NavItem icon={LayoutDashboard} label="Dashboard" id="dashboard" active={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />
      <NavItem icon={Map} label="Map View" id="map" active={activePage === 'map'} onClick={() => onNavigate('map')} />
      <NavItem icon={UsersIcon} label="Crew" id="crew" active={activePage === 'crew'} onClick={() => onNavigate('crew')} />
      <NavItem icon={MessageSquare} label="Team Hub" id="teamhub" active={activePage === 'teamhub'} onClick={() => onNavigate('teamhub')} />
      <NavItem icon={FolderIcon} label="Documents" id="documents" active={activePage === 'documents'} onClick={() => onNavigate('documents')} />
      <div className="h-px bg-white/5 my-2"></div>
      <NavItem icon={ClipboardList} label="Daily Reports" id="daily" active={activePage === 'daily'} onClick={() => onNavigate('daily')} />
      <NavItem icon={ShieldCheck} label="Inspections" id="inspections" active={activePage === 'inspections'} onClick={() => onNavigate('inspections')} />
      <NavItem icon={TrendingUp} label="Analytics" id="analytics" active={activePage === 'analytics'} onClick={() => onNavigate('analytics')} />
    </nav>

    <div className="p-4 border-t border-white/5">
      <NavItem icon={Settings} label="Settings" id="settings" />
      <button className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-white/5 hover:text-rose-300 rounded-lg transition-colors w-full mt-2">
        <LogOut size={20} />
        <span className="font-medium">Sign Out</span>
      </button>
    </div>
  </aside>
);

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border ${active ? 'bg-cyan-600/10 border-cyan-500/20 text-cyan-500 shadow-glow' : 'border-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-100'}`}
  >
    <Icon size={20} className={active ? "text-cyan-500" : ""} />
    <span className="font-medium">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>}
  </button>
);

const MobileNav = ({ activePage, onNavigate }) => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-white/10 z-50 flex justify-around p-3 shadow-lg pb-safe">
    <MobItem icon={LayoutDashboard} label="Home" active={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />
    <MobItem icon={Map} label="Map" active={activePage === 'map'} onClick={() => onNavigate('map')} />
    <MobItem icon={MessageSquare} label="Team" active={activePage === 'teamhub'} onClick={() => onNavigate('teamhub')} />
    <MobItem icon={Menu} label="Menu" />
  </nav>
);

const MobItem = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-cyan-500' : 'text-zinc-500'}`}>
    <Icon size={24} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

// We need Header here too since we unpack Layout
const Header = () => (
  <header className="bg-background/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 h-16 flex items-center justify-between px-6 md:pl-8 ml-0">
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-semibold text-white hidden md:block">Dashboard</h2>
      <div className="md:hidden font-bold text-white">PipeLine One</div>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input
          type="text"
          placeholder="Search reports, stations..."
          className="pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-700/50 rounded-full text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-64 placeholder:text-zinc-600"
        />
      </div>

      <button className="relative p-2 text-zinc-400 hover:bg-white/5 rounded-full transition-colors">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-background"></span>
      </button>

      <div className="flex items-center gap-3 pl-4 border-l border-white/5">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-zinc-200">Christopher George</p>
          <p className="text-xs text-zinc-500">Project Manager</p>
        </div>
        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
          <User size={24} className="text-zinc-500" />
        </div>
      </div>
    </div>
  </header>
);

export default App;
