import React from 'react';
import { LayoutDashboard, Map, ClipboardList, ShieldCheck, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeParams }) => { // Note: activeParams is not used, controlled by active prop on children or routing
    return (
        <aside className="hidden md:flex flex-col w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 text-zinc-400 min-h-screen fixed left-0 top-0 z-50">
            <div className="p-6 border-b border-white/5">
                <h1 className="text-2xl font-bold tracking-tight text-white">PipeLine One</h1>
                <p className="text-xs text-zinc-500 mt-1">Project: Keystone Ext. 4</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {/* Navigation items are now controlled by App.jsx or Layout wrapper */}
                {/* We keep this file for structural reference but the actual nav logic is in App.jsx currently */}
            </nav>

            <div className="p-4 border-t border-white/5">
                {/* Footer items */}
            </div>
        </aside>
    );
};

export default Sidebar;
