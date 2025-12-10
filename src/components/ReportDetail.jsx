import React, { useState } from 'react';
import { X, CheckCircle, XCircle, FileText, User, MapPin, Calendar, Camera, MessageSquare } from 'lucide-react';

const ReportDetail = ({ report, onClose, onApprove, onReject }) => {
    const [comment, setComment] = useState('');

    if (!report) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">{report.type}</span>
                            <StatusBadge status={report.status} />
                        </div>
                        <h2 className="text-xl font-bold text-white">{report.title}</h2>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Meta Info */}
                    <div className="grid grid-cols-3 gap-4">
                        <MetaItem icon={User} label="Submitted By" value={report.submittedBy} />
                        <MetaItem icon={MapPin} label="Station" value={report.station} />
                        <MetaItem icon={Calendar} label="Date" value={report.date} />
                    </div>

                    {/* Report Content */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-zinc-400 mb-3">Report Details</h3>
                        <p className="text-zinc-300 text-sm leading-relaxed">
                            Work completed on schedule. All safety protocols followed.
                            Welding operations completed for joints #247-#252.
                            No incidents reported. Weather conditions favorable.
                            Next shift to continue with coating preparation.
                        </p>
                    </div>

                    {/* Attachments */}
                    <div>
                        <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                            <Camera size={14} /> Attachments
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                                <FileText size={24} className="text-zinc-600" />
                            </div>
                            <div className="aspect-square bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                                <Camera size={24} className="text-zinc-600" />
                            </div>
                        </div>
                    </div>

                    {/* PM Comment */}
                    {report.status === 'pending' && (
                        <div>
                            <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                                <MessageSquare size={14} /> Add Review Comment
                            </h3>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Optional comment for approval/rejection..."
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none h-20"
                            />
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {report.status === 'pending' && (
                    <div className="p-6 border-t border-white/5 flex gap-3">
                        <button
                            onClick={() => onReject && onReject(report, comment)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 border border-rose-500/20 rounded-lg font-medium transition-colors"
                        >
                            <XCircle size={18} /> Reject
                        </button>
                        <button
                            onClick={() => onApprove && onApprove(report, comment)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
                        >
                            <CheckCircle size={18} /> Approve
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const MetaItem = ({ icon: Icon, label, value }) => (
    <div className="bg-zinc-900/50 rounded-lg p-3">
        <div className="flex items-center gap-2 text-zinc-500 text-xs mb-1">
            <Icon size={12} />
            {label}
        </div>
        <p className="text-white font-medium text-sm">{value}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'text-amber-500 bg-amber-500/10',
        approved: 'text-emerald-500 bg-emerald-500/10',
        rejected: 'text-rose-500 bg-rose-500/10'
    };
    return <span className={`text-xs px-2 py-0.5 rounded capitalize ${styles[status]}`}>{status}</span>;
};

export default ReportDetail;
