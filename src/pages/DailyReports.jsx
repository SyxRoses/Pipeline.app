import React, { useState } from 'react';
import { Clipboard, Shield, HardHat, History, PlusCircle, FileText, Clock, CheckCircle } from 'lucide-react';
import PhotoUploadWithMarkup from '../components/PhotoUploadWithMarkup';
import ReportList from '../components/ReportList';
import ReportDetail from '../components/ReportDetail';

const DailyReports = () => {
    const [view, setView] = useState('new'); // 'new' or 'history'
    const [activeTab, setActiveTab] = useState('construction');
    const [historyFilter, setHistoryFilter] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);

    const handleApprove = (report, comment) => {
        console.log('Approved:', report.id, comment);
        setSelectedReport(null);
        // In real app: Update in database
    };

    const handleReject = (report, comment) => {
        console.log('Rejected:', report.id, comment);
        setSelectedReport(null);
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Daily Digital Packet</h1>
                    <p className="text-zinc-500">Submit and manage field reports.</p>
                </div>

                {/* View Toggle */}
                <div className="bg-surface p-1 rounded-lg border border-zinc-700 inline-flex shadow-inner">
                    <button
                        onClick={() => setView('new')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${view === 'new' ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    >
                        <PlusCircle size={16} /> New Report
                    </button>
                    <button
                        onClick={() => setView('history')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${view === 'history' ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                    >
                        <History size={16} /> History
                    </button>
                </div>
            </div>

            {/* Report History View */}
            {view === 'history' && (
                <div className="space-y-4">
                    {/* Filter Tabs */}
                    <div className="flex gap-2">
                        {[
                            { key: 'all', label: 'All Reports', icon: FileText },
                            { key: 'pending', label: 'Pending', icon: Clock },
                            { key: 'approved', label: 'Approved', icon: CheckCircle }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setHistoryFilter(tab.key)}
                                className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-colors ${historyFilter === tab.key ? 'bg-cyan-600/10 border-cyan-500/30 text-cyan-500' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}
                            >
                                <tab.icon size={14} /> {tab.label}
                            </button>
                        ))}
                    </div>

                    <ReportList filter={historyFilter} onSelectReport={setSelectedReport} />
                </div>
            )}

            {/* New Report Form View */}
            {view === 'new' && (
                <>
                    {/* Report Type Tabs */}
                    <div className="bg-surface p-1 rounded-lg border border-zinc-700 inline-flex shadow-inner">
                        <button
                            onClick={() => setActiveTab('construction')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'construction' ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                        >
                            Construction
                        </button>
                        <button
                            onClick={() => setActiveTab('inspection')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'inspection' ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                        >
                            Inspection
                        </button>
                        <button
                            onClick={() => setActiveTab('safety')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'safety' ? 'bg-cyan-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                        >
                            Safety
                        </button>
                    </div>

                    <div className="card">
                        {activeTab === 'construction' && (
                            <form className="space-y-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-white border-b border-zinc-800 pb-3">
                                    <HardHat className="text-cyan-500" />
                                    <h2>Superintendent Report</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Activity Type</label>
                                        <select className="input-field">
                                            <option>choose...</option>
                                            <option>Clearing & Grading</option>
                                            <option>Ditching / Trenching</option>
                                            <option>Stringing</option>
                                            <option>Lowering-in</option>
                                            <option>Backfilling</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Crew Size</label>
                                        <input type="number" className="input-field" placeholder="Number of workers" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Start Station</label>
                                        <input type="text" className="input-field" placeholder="100+00" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">End Station</label>
                                        <input type="text" className="input-field" placeholder="110+00" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Total Footage (ft)</label>
                                        <input type="number" className="input-field bg-zinc-900 border-zinc-800 font-semibold" placeholder="Calculated footage..." />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Comments / Notes</label>
                                        <textarea className="input-field h-24" placeholder="Describe any delays or issues..."></textarea>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                                    <button type="button" className="btn-primary">Submit Report</button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'inspection' && (
                            <form className="space-y-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-white border-b border-zinc-800 pb-3">
                                    <Clipboard className="text-cyan-500" />
                                    <h2>Weld Inspection Log</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Weld Number</label>
                                        <input type="text" className="input-field" placeholder="e.g. W-293" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Heat Number</label>
                                        <input type="text" className="input-field" placeholder="Pipe Heat #" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Visual Inspection</label>
                                        <div className="flex gap-4 mt-2">
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="visual" className="text-cyan-500 focus:ring-cyan-500 bg-zinc-800 border-zinc-600" />
                                                <span className="text-sm font-medium text-emerald-500">Pass</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input type="radio" name="visual" className="text-cyan-500 focus:ring-cyan-500 bg-zinc-800 border-zinc-600" />
                                                <span className="text-sm font-medium text-rose-500">Fail</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <PhotoUploadWithMarkup
                                            label="Visual Inspection X-Ray / Photo"
                                            onImageChange={(file) => console.log('Weld photo updated:', file)}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                                    <button type="button" className="btn-primary">Submit Inspection</button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'safety' && (
                            <form className="space-y-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-white border-b border-zinc-800 pb-3">
                                    <Shield className="text-cyan-500" />
                                    <h2>Safety & HSE Checklist</h2>
                                </div>

                                <div className="space-y-4">
                                    {['Tailgate Meeting Conducted', 'PPE Checked', 'Excavation Log Completed', 'Weather Conditions Verified'].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                                            <span className="text-sm font-medium text-zinc-300">{item}</span>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-1">
                                                    <input type="radio" name={`check-${idx}`} className="text-cyan-500 focus:ring-cyan-500 bg-zinc-800 border-zinc-600" />
                                                    <span className="text-xs text-zinc-400">Yes</span>
                                                </label>
                                                <label className="flex items-center gap-1">
                                                    <input type="radio" name={`check-${idx}`} className="text-cyan-500 focus:ring-cyan-500 bg-zinc-800 border-zinc-600" />
                                                    <span className="text-xs text-zinc-400">No</span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}

                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-1">Near Miss / Incident Report</label>
                                        <textarea className="input-field h-24" placeholder="Leave blank if none. Describe if any..."></textarea>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 flex justify-end">
                                    <button type="button" className="btn-primary">Submit Safety Check</button>
                                </div>
                            </form>
                        )}
                    </div>
                </>
            )}

            {/* Report Detail Modal */}
            {selectedReport && (
                <ReportDetail
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default DailyReports;
