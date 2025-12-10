import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu, Home, Map as MapIcon, ClipboardList, ShieldCheck } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 flex justify-around p-3 shadow-lg pb-safe">
                <a href="#" className="flex flex-col items-center gap-1 text-cyan-600">
                    <Home size={24} />
                    <span className="text-[10px] font-medium">Home</span>
                </a>
                <a href="#" className="flex flex-col items-center gap-1 text-slate-400">
                    <MapIcon size={24} />
                    <span className="text-[10px] font-medium">Map</span>
                </a>
                <a href="#" className="flex flex-col items-center gap-1 text-slate-400">
                    <ClipboardList size={24} />
                    <span className="text-[10px] font-medium">Daily</span>
                </a>
                <a href="#" className="flex flex-col items-center gap-1 text-slate-400">
                    <ShieldCheck size={24} />
                    <span className="text-[10px] font-medium">Inspect</span>
                </a>
                <a href="#" className="flex flex-col items-center gap-1 text-slate-400">
                    <Menu size={24} />
                    <span className="text-[10px] font-medium">Menu</span>
                </a>
            </nav>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-20 md:pb-0">
                <Header />
                <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
