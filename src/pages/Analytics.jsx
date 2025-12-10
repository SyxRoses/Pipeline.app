import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, DollarSign, CloudRain, AlertTriangle, TrendingUp } from 'lucide-react';
import { fetchAnalyticsData } from '../services/mockMLService';

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData().then(response => {
            setData(response);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-cyan-500 animate-pulse">Loading ML Models...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white">Predictive Analytics</h2>
                    <p className="text-zinc-400">Powered by Prophet (Time-series) & XGBoost (Cost)</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">Model v1.2 Active</span>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KpiCard
                    title="Projected Completion"
                    value={data.kpi.completionDate}
                    subtext={`${data.kpi.daysRemaining} Days Remaining`}
                    icon={Calendar}
                    color="text-emerald-500"
                />
                <KpiCard
                    title="Est. Final Cost"
                    value={`$${(data.kpi.estimatedCost / 1000000).toFixed(1)}M`}
                    subtext={`+${data.kpi.costVariance}% over budget`}
                    icon={DollarSign}
                    color="text-rose-500"
                />
                <KpiCard
                    title="Weather Risk"
                    value={data.kpi.weatherRisk}
                    subtext="Heavy rain forecast Wk 8"
                    icon={CloudRain}
                    color="text-amber-500"
                />
                <KpiCard
                    title="Model Confidence"
                    value="85%"
                    subtext="Based on 45 days data"
                    icon={TrendingUp}
                    color="text-blue-500"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Progress Forecast */}
                <div className="lg:col-span-2 bg-card border border-white/5 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">Construction Progress Forecast (Prophet)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.progressChart}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#71717a" unit="%" />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="actual" stroke="#ea580c" strokeWidth={3} name="Actual Progress" dot={false} />
                                <Line type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="AI Prediction" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Cost Variance */}
                <div className="lg:col-span-1 bg-card border border-white/5 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">Cost Variance Analysis</h3>
                    <div className="h-64 flex flex-col justify-center items-center relative">
                        {/* Simulated Gauge or Simple Visual */}
                        <div className="relative w-48 h-48 rounded-full border-8 border-zinc-800 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-8 border-rose-500 border-t-transparent border-l-transparent rotate-45"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">${(data.kpi.costVariance * 50000000 / 100).toLocaleString()}</div>
                                <div className="text-sm text-zinc-500">Projected Overrun</div>
                            </div>
                        </div>
                        <div className="mt-6 w-full space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Budget</span>
                                <span className="text-white">$50.0M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Forecast</span>
                                <span className="text-rose-400">$52.4M</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KpiCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="bg-card border border-white/5 p-6 rounded-xl hover:bg-surfaceHighlight transition-colors group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg bg-zinc-900 ${color} bg-opacity-10`}>
                <Icon size={24} className={color} />
            </div>
            {/* Trend arrow could go here */}
        </div>
        <div>
            <p className="text-zinc-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left">{value}</h3>
            <p className="text-xs text-zinc-500 mt-1">{subtext}</p>
        </div>
    </div>
);

export default Analytics;
