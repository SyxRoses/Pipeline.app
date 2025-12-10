import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Briefcase, MapPin, Users, Sparkles } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const OnboardingWizard = () => {
    const { saveProject, setShowOnboarding } = useProject();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        client: '',
        startDate: '',
        endDate: '',
        startStation: '100+00',
        endStation: '200+00',
        crewCount: 5
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleComplete = () => {
        saveProject({
            ...formData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'active'
        });
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white">New Project Setup</h2>
                            <p className="text-cyan-100/80 mt-1">Let's get your pipeline project configured</p>
                        </div>
                        <button onClick={() => setShowOnboarding(false)} className="text-white/60 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mt-6">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors ${s <= step ? 'bg-white' : 'bg-white/30'}`} />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 min-h-[300px]">
                    {step === 1 && (
                        <StepContent
                            icon={Briefcase}
                            title="Project Information"
                            description="Enter the basic details for your pipeline project."
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Project Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Keystone Extension Phase 4"
                                        className="input-field w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Client</label>
                                    <input
                                        name="client"
                                        value={formData.client}
                                        onChange={handleChange}
                                        placeholder="e.g., TransCanada Energy"
                                        className="input-field w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Crew Size</label>
                                    <input
                                        name="crewCount"
                                        type="number"
                                        value={formData.crewCount}
                                        onChange={handleChange}
                                        className="input-field w-full"
                                    />
                                </div>
                            </div>
                        </StepContent>
                    )}

                    {step === 2 && (
                        <StepContent
                            icon={MapPin}
                            title="Pipeline Segment"
                            description="Define the station boundaries for this project."
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Start Station</label>
                                    <input
                                        name="startStation"
                                        value={formData.startStation}
                                        onChange={handleChange}
                                        placeholder="100+00"
                                        className="input-field w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">End Station</label>
                                    <input
                                        name="endStation"
                                        value={formData.endStation}
                                        onChange={handleChange}
                                        placeholder="200+00"
                                        className="input-field w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Start Date</label>
                                    <input
                                        name="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="input-field w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Target Completion</label>
                                    <input
                                        name="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="input-field w-full"
                                    />
                                </div>
                            </div>
                        </StepContent>
                    )}

                    {step === 3 && (
                        <StepContent
                            icon={Users}
                            title="Initial Crew Setup"
                            description="You can add crew members now or skip to add them later."
                        >
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
                                <Users size={48} className="mx-auto text-zinc-600 mb-4" />
                                <p className="text-zinc-400">Crew management will be available after setup.</p>
                                <p className="text-zinc-500 text-sm mt-2">You can add and manage crew members from the Crew page.</p>
                            </div>
                        </StepContent>
                    )}

                    {step === 4 && (
                        <StepContent
                            icon={Sparkles}
                            title="You're All Set!"
                            description="Your project is ready to go."
                        >
                            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Check size={24} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{formData.name || 'New Project'}</h3>
                                        <p className="text-zinc-400 text-sm">{formData.client || 'Client TBD'}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                    <div className="bg-black/20 rounded-lg p-3">
                                        <span className="text-zinc-500">Stations</span>
                                        <p className="text-white font-medium">{formData.startStation} → {formData.endStation}</p>
                                    </div>
                                    <div className="bg-black/20 rounded-lg p-3">
                                        <span className="text-zinc-500">Crew Size</span>
                                        <p className="text-white font-medium">{formData.crewCount} Members</p>
                                    </div>
                                </div>
                            </div>
                        </StepContent>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 flex justify-between">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} /> Back
                    </button>

                    {step < 4 ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
                        >
                            Continue <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
                        >
                            <Check size={20} /> Launch Project
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const StepContent = ({ icon: Icon, title, description, children }) => (
    <div>
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Icon size={20} className="text-cyan-500" />
            </div>
            <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm text-zinc-500">{description}</p>
            </div>
        </div>
        {children}
    </div>
);

export default OnboardingWizard;
