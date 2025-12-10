import React from 'react';
import { FileText, Clock, CheckCircle, XCircle, ChevronRight, User, MapPin } from 'lucide-react';

const mockReports = [
    { id: 1, title: 'Daily Inspection - Station 110+00', type: 'Inspection', submittedBy: 'John Miller', date: '2024-12-09', status: 'pending', station: '110+00' },
    { id: 2, title: 'Welding Progress Report', type: 'Progress', submittedBy: 'Sarah Chen', date: '2024-12-09', status: 'approved', station: '105+00' },
    { id: 3, title: 'Safety Incident Report', type: 'Safety', submittedBy: 'Mike Johnson', date: '2024-12-08', status: 'rejected', station: '112+00' },
    { id: 4, title: 'X-Ray Analysis - Weld #247', type: 'Inspection', submittedBy: 'Alex Thompson', date: '2024-12-08', status: 'pending', station: '108+00' },
    { id: 5, title: 'Daily Crew Activity Log', type: 'Progress', submittedBy: 'Carlos Rodriguez', date: '2024-12-07', status: 'approved', station: '115+00' },
];

const ReportList = ({ filter = 'all', onSelectReport }) => {
    const filteredReports = filter === 'all'
        ? mockReports
        : mockReports.filter(r => r.status === filter);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full text-xs"><Clock size={12} /> Pending</span>;
            case 'approved':
                return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs"><CheckCircle size={12} /> Approved</span>;
            case 'rejected':
                return <span className="flex items-center gap-1 text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full text-xs"><XCircle size={12} /> Rejected</span>;
            default:
                return null;
        }
    };

    const getTypeBadge = (type) => {
        const colors = {
            'Inspection': 'text-blue-400 bg-blue-500/10',
            'Progress': 'text-emerald-400 bg-emerald-500/10',
            'Safety': 'text-rose-400 bg-rose-500/10'
        };
        return <span className={`text-xs px-2 py-0.5 rounded ${colors[type] || 'bg-zinc-800'}`}>{type}</span>;
    };

    if (filteredReports.length === 0) {
        return (
            <div className="text-center py-12 text-zinc-500">
                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                <p>No reports found</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {filteredReports.map(report => (
                <div
                    key={report.id}
                    onClick={() => onSelectReport && onSelectReport(report)}
                    className="bg-zinc-900/50 hover:bg-zinc-800/70 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 cursor-pointer transition-all group"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                {getTypeBadge(report.type)}
                                {getStatusBadge(report.status)}
                            </div>
                            <h4 className="text-white font-medium group-hover:text-orange-400 transition-colors">{report.title}</h4>
                            <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                                <span className="flex items-center gap-1"><User size={12} /> {report.submittedBy}</span>
                                <span className="flex items-center gap-1"><MapPin size={12} /> {report.station}</span>
                                <span>{report.date}</span>
                            </div>
                        </div>
                        <ChevronRight size={20} className="text-zinc-600 group-hover:text-orange-500 transition-colors" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReportList;
