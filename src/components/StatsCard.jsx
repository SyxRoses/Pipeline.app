import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCard = ({ title, value, unit, trend, trendValue, icon: Icon, color = "blue" }) => {
    const colorMap = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        slate: "bg-zinc-800 text-zinc-400 border-zinc-700",
        amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };

    const trendColor =
        trend === 'up' ? "text-emerald-400" :
            trend === 'down' ? "text-rose-400" : "text-zinc-500";

    const TrendIcon =
        trend === 'up' ? TrendingUp :
            trend === 'down' ? TrendingDown : Minus;

    return (
        <div className="card hover:border-zinc-700 transition-colors duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
                        <span className="text-sm font-medium text-zinc-500">{unit}</span>
                    </div>
                </div>
                <div className={`p-2.5 rounded-lg border ${colorMap[color] || colorMap.slate}`}>
                    {Icon && <Icon size={20} />}
                </div>
            </div>

            {trendValue && (
                <div className={`flex items-center gap-1.5 text-xs font-medium ${trendColor} mt-4`}>
                    <TrendIcon size={14} />
                    <span>{trendValue}</span>
                    <span className="text-zinc-600 font-normal ml-1">vs last week</span>
                </div>
            )}
        </div>
    );
};

export default StatsCard;
