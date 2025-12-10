import React from 'react';
import { X, Users, Clock, MapPin, TrendingUp, CheckCircle } from 'lucide-react';

const SegmentDetailPanel = ({ segment, onClose, onAssignCrew }) => {
    if (!segment) return null;

    const progressColor = segment.progress >= 80 ? 'emerald' : segment.progress >= 50 ? 'amber' : 'rose';

    return (
        <div className="absolute top-4 right-4 w-80 bg-surface/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl z-[1001] overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-cyan-500/10 p-4 border-b border-white/5">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <MapPin size={16} className="text-cyan-500" />
                            {segment.name}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1">{segment.startStation} → {segment.endStation}</p>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* Progress */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">Progress</span>
                        <span className={`font-bold text-${progressColor}-500`}>{segment.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-${progressColor}-500 transition-all duration-500`}
                            style={{ width: `${segment.progress}%` }}
                        />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <StatBox icon={Users} label="Crew" value={segment.crew || 'Unassigned'} />
                    <StatBox icon={Clock} label="Days Left" value={segment.daysRemaining || '—'} />
                    <StatBox icon={TrendingUp} label="Activity" value={segment.activity || 'Clearing'} />
                    <StatBox icon={CheckCircle} label="Status" value={segment.status || 'Active'} />
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-white/5 flex gap-2">
                    <button
                        onClick={() => onAssignCrew && onAssignCrew(segment)}
                        className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        Assign Crew
                    </button>
                    <button className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors">
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ icon: Icon, label, value }) => (
    <div className="bg-zinc-900/50 rounded-lg p-3">
        <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
            <Icon size={12} />
            {label}
        </div>
        <p className="text-white font-medium text-sm">{value}</p>
    </div>
);

export default SegmentDetailPanel;
