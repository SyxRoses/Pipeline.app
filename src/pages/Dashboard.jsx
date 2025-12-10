import React from 'react';
import { Ruler, Activity, DollarSign, Calendar, Plus, Rocket } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ActivityFeed from '../components/ActivityFeed';
import { mockData } from '../lib/supabaseClient';
import { useProject } from '../contexts/ProjectContext';
import OnboardingWizard from '../components/OnboardingWizard';

const Dashboard = () => {
    const { stats, recent_activity } = mockData;
    const { project, showOnboarding, setShowOnboarding, isLoading } = useProject();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-cyan-500 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in relative pb-10">
            {/* Onboarding Wizard Modal */}
            {showOnboarding && <OnboardingWizard />}

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-white">Project Overview</h1>
                    <p className="text-zinc-500">{project?.name || 'No Project Selected'}</p>
                </div>
                {!project && (
                    <button
                        onClick={() => setShowOnboarding(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        <Rocket size={16} /> Start New Project
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Progress"
                    value="45%"
                    unit="Complete"
                    icon={Activity}
                    color="emerald"
                    trend="up"
                    trendValue="5%"
                />
                <StatsCard
                    title="Cleared Footage"
                    value={(stats.cleared_footage / 5280).toFixed(1)}
                    unit="Miles"
                    icon={Ruler}
                    color="blue"
                    trend="up"
                    trendValue="1.2 mi"
                />
                <StatsCard
                    title="Budget Used"
                    value="35%"
                    unit="$12.5M"
                    icon={DollarSign}
                    color="amber"
                    trend="down"
                    trendValue="2% under"
                />
                <StatsCard
                    title="Safety Streak"
                    value={mockData.projects[0].days_without_incident}
                    unit="Days"
                    icon={Calendar}
                    color="cyan"
                    trend="up"
                    trendValue="+7"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card h-96 flex flex-col justify-center items-center text-zinc-500 border-dashed border-2 border-zinc-800 bg-transparent">
                    <Activity size={48} className="mb-4 text-zinc-700" />
                    <p className="font-medium">Velocity Chart Placeholder</p>
                    <p className="text-sm mt-1">Burn-down data will appear here</p>
                </div>
                <div className="lg:col-span-1">
                    <ActivityFeed items={recent_activity} />
                </div>
            </div>

            {/* FAB */}
            <button className="fixed bottom-20 md:bottom-8 right-6 md:right-8 bg-cyan-600 hover:bg-cyan-500 text-white w-14 h-14 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 border border-cyan-400/20">
                <Plus size={28} />
            </button>
        </div>
    );
};


export default Dashboard;
