import React from 'react';
import { CheckCircle2, AlertCircle, FileText, HardHat } from 'lucide-react';

const ActivityFeed = ({ items }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'issue': return <AlertCircle className="text-rose-500" size={18} />;
            case 'completion': return <CheckCircle2 className="text-emerald-500" size={18} />;
            case 'safety': return <HardHat className="text-orange-500" size={18} />;
            default: return <FileText className="text-blue-500" size={18} />;
        }
    };

    return (
        <div className="card h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Recent Site Activity</h3>
                <button className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors">View All</button>
            </div>

            <div className="relative pl-4 border-l border-zinc-800 space-y-8">
                {items.map((item) => (
                    <div key={item.id} className="relative group">
                        <div className="absolute -left-[25px] top-1 bg-surface border border-zinc-700 rounded-full p-1 shadow-sm group-hover:border-zinc-500 transition-colors">
                            {getIcon(item.type)}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div>
                                <p className="text-sm text-zinc-300">
                                    <span className="font-semibold text-white">{item.user}</span>
                                    <span className="text-zinc-600 mx-1">•</span>
                                    <span className="text-xs font-medium bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full text-zinc-400">{item.role}</span>
                                </p>
                                <p className="text-sm text-zinc-500 mt-1">{item.action}</p>
                            </div>
                            <span className="text-xs text-zinc-600 whitespace-nowrap">{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;
