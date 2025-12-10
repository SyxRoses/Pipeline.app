import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 h-16 flex items-center justify-between px-6 shadow-sm ml-0 md:ml-64">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-slate-800 hidden md:block">Dashboard</h2>
                <div className="md:hidden font-bold text-slate-900">PipeLine One</div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search reports, stations..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 w-64"
                    />
                </div>

                <button className="relative p-2 text-gray-500 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">Mike Stevenson</p>
                        <p className="text-xs text-slate-500">Project Manager</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                        {/* Placeholder Avatar */}
                        <User size={24} className="text-slate-400" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
