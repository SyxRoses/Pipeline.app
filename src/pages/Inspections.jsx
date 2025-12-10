import React, { useState } from 'react';
import { ClipboardCheck, Search, Filter, Plus, CheckCircle, XCircle, AlertTriangle, ChevronRight, Camera, Flame, Shield, Droplets, FileText } from 'lucide-react';
import PhotoUploadWithMarkup from '../components/PhotoUploadWithMarkup';

const mockInspections = [
    { id: 1, type: 'Weld', reference: 'W-293', station: '110+00', status: 'pass', date: '2024-12-09', inspector: 'Alex T.' },
    { id: 2, type: 'Coating', reference: 'C-142', station: '108+00', status: 'fail', date: '2024-12-09', inspector: 'Sarah C.' },
    { id: 3, type: 'X-Ray', reference: 'XR-087', station: '112+00', status: 'pending', date: '2024-12-08', inspector: 'John M.' },
    { id: 4, type: 'Weld', reference: 'W-294', station: '115+00', status: 'pass', date: '2024-12-08', inspector: 'Mike J.' },
];

const Inspections = () => {
    const [view, setView] = useState('list'); // 'list' or 'new'
    const [inspectionType, setInspectionType] = useState('weld');
    const [checklistItems, setChecklistItems] = useState({});

    const handleChecklistChange = (item, value) => {
        setChecklistItems({ ...checklistItems, [item]: value });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pass':
                return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs"><CheckCircle size={12} /> Pass</span>;
            case 'fail':
                return <span className="flex items-center gap-1 text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full text-xs"><XCircle size={12} /> Fail</span>;
            case 'pending':
                return <span className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full text-xs"><AlertTriangle size={12} /> Pending</span>;
            default:
                return null;
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Weld': return <Flame size={14} className="text-orange-500" />;
            case 'Coating': return <Droplets size={14} className="text-blue-500" />;
            case 'X-Ray': return <FileText size={14} className="text-purple-500" />;
            default: return <ClipboardCheck size={14} />;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Inspections</h1>
                    <p className="text-zinc-500">Quality control and compliance tracking.</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setView('list')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${view === 'list' ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                    >
                        View All
                    </button>
                    <button
                        onClick={() => setView('new')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${view === 'new' ? 'bg-orange-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                    >
                        <Plus size={16} /> New Inspection
                    </button>
                </div>
            </div>

            {/* List View */}
            {view === 'list' && (
                <div className="space-y-4">
                    {/* Search */}
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search inspections..."
                                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:bg-zinc-700">
                            <Filter size={16} /> Filter
                        </button>
                    </div>

                    {/* Inspection List */}
                    <div className="space-y-2">
                        {mockInspections.map(insp => (
                            <div key={insp.id} className="bg-zinc-900/50 hover:bg-zinc-800/70 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 cursor-pointer transition-all group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            {getTypeIcon(insp.type)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-white font-medium">{insp.type} Inspection</h4>
                                                {getStatusBadge(insp.status)}
                                            </div>
                                            <p className="text-xs text-zinc-500 mt-1">{insp.reference} • Station {insp.station} • {insp.date}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-zinc-600 group-hover:text-orange-500 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* New Inspection Form */}
            {view === 'new' && (
                <div className="card">
                    {/* Type Selector */}
                    <div className="flex gap-2 mb-6">
                        {[
                            { key: 'weld', label: 'Weld', icon: Flame },
                            { key: 'coating', label: 'Coating', icon: Droplets },
                            { key: 'xray', label: 'X-Ray', icon: FileText }
                        ].map(t => (
                            <button
                                key={t.key}
                                onClick={() => setInspectionType(t.key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${inspectionType === t.key ? 'bg-orange-600/10 border-orange-500/30 text-orange-500' : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'}`}
                            >
                                <t.icon size={16} /> {t.label}
                            </button>
                        ))}
                    </div>

                    <form className="space-y-6">
                        <div className="flex items-center gap-2 text-lg font-semibold text-white border-b border-zinc-800 pb-3">
                            <ClipboardCheck className="text-orange-500" />
                            <h2>{inspectionType === 'weld' ? 'Weld' : inspectionType === 'coating' ? 'Coating' : 'X-Ray'} Inspection Form</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Reference ID</label>
                                <input type="text" className="input-field" placeholder={inspectionType === 'weld' ? 'W-XXX' : inspectionType === 'coating' ? 'C-XXX' : 'XR-XXX'} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Station</label>
                                <input type="text" className="input-field" placeholder="100+00" />
                            </div>
                        </div>

                        {/* Checklist */}
                        <div>
                            <h3 className="text-sm font-medium text-zinc-400 mb-3">Inspection Checklist</h3>
                            <div className="space-y-2">
                                {(inspectionType === 'weld'
                                    ? ['Root Pass Complete', 'Hot Pass Complete', 'Fill Passes Complete', 'Cap Pass Complete', 'No Visible Defects']
                                    : inspectionType === 'coating'
                                        ? ['Surface Prep Complete', 'Primer Applied', 'Wrap Applied', 'Holiday Test Pass', 'No Visible Damage']
                                        : ['Image Quality Acceptable', 'Penetrometer Visible', 'No Cracks Detected', 'No Porosity Detected', 'Film Density OK']
                                ).map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                                        <span className="text-sm text-zinc-300">{item}</span>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => handleChecklistChange(item, 'pass')}
                                                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${checklistItems[item] === 'pass' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-emerald-600/20 hover:text-emerald-400'}`}
                                            >
                                                Pass
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleChecklistChange(item, 'fail')}
                                                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${checklistItems[item] === 'fail' ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-rose-600/20 hover:text-rose-400'}`}
                                            >
                                                Fail
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Photo Upload */}
                        <PhotoUploadWithMarkup
                            label="Inspection Photo / X-Ray Image"
                            onImageChange={(file) => console.log('Inspection photo:', file)}
                        />

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Notes</label>
                            <textarea className="input-field h-24" placeholder="Additional observations..."></textarea>
                        </div>

                        <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                            <button type="button" onClick={() => setView('list')} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
                            <button type="button" className="btn-primary">Submit Inspection</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Inspections;
