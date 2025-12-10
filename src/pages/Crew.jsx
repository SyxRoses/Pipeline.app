import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, Award, Calendar, MoreVertical, Edit2, Trash2, CheckCircle } from 'lucide-react';

const mockCrew = [
    { id: 1, name: 'John Miller', role: 'Welder', certExpiry: '2025-06-15', phone: '555-0101', email: 'john.m@pipeline.co', status: 'active' },
    { id: 2, name: 'Sarah Chen', role: 'Inspector', certExpiry: '2025-03-22', phone: '555-0102', email: 'sarah.c@pipeline.co', status: 'active' },
    { id: 3, name: 'Mike Johnson', role: 'Superintendent', certExpiry: '2025-09-10', phone: '555-0103', email: 'mike.j@pipeline.co', status: 'active' },
    { id: 4, name: 'Alex Thompson', role: 'Surveyor', certExpiry: '2024-12-30', phone: '555-0104', email: 'alex.t@pipeline.co', status: 'inactive' },
    { id: 5, name: 'Carlos Rodriguez', role: 'Operator', certExpiry: '2025-08-05', phone: '555-0105', email: 'carlos.r@pipeline.co', status: 'active' },
];

const Crew = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCrew = mockCrew.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadge = (role) => {
        const colors = {
            'Welder': 'bg-orange-500/10 text-orange-400',
            'Inspector': 'bg-blue-500/10 text-blue-400',
            'Superintendent': 'bg-purple-500/10 text-purple-400',
            'Surveyor': 'bg-emerald-500/10 text-emerald-400',
            'Operator': 'bg-amber-500/10 text-amber-400'
        };
        return <span className={`text-xs px-2 py-0.5 rounded ${colors[role] || 'bg-zinc-800 text-zinc-400'}`}>{role}</span>;
    };

    const isCertExpiring = (date) => {
        const expiry = new Date(date);
        const now = new Date();
        const daysUntil = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
        return daysUntil < 30;
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Crew Management</h1>
                    <p className="text-zinc-500">{mockCrew.length} team members • {mockCrew.filter(c => c.status === 'active').length} active</p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={16} /> Add Member
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or role..."
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
            </div>

            {/* Crew Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCrew.map(member => (
                    <div key={member.id} className="bg-surface border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-400">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">{member.name}</h3>
                                    {getRoleBadge(member.role)}
                                </div>
                            </div>
                            <button className="text-zinc-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Mail size={14} /> {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Phone size={14} /> {member.phone}
                            </div>
                            <div className={`flex items-center gap-2 ${isCertExpiring(member.certExpiry) ? 'text-amber-500' : 'text-zinc-400'}`}>
                                <Award size={14} />
                                Cert: {member.certExpiry}
                                {isCertExpiring(member.certExpiry) && <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">Expiring</span>}
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                            <span className={`flex items-center gap-1 text-xs ${member.status === 'active' ? 'text-emerald-500' : 'text-zinc-500'}`}>
                                <CheckCircle size={12} /> {member.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                            <div className="flex gap-2">
                                <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors">
                                    <Edit2 size={14} />
                                </button>
                                <button className="p-1.5 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Member Modal (simplified) */}
            {showForm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold text-white">Add Crew Member</h2>
                        </div>
                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Full Name</label>
                                <input type="text" className="input-field" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
                                <select className="input-field">
                                    <option>Welder</option>
                                    <option>Inspector</option>
                                    <option>Superintendent</option>
                                    <option>Surveyor</option>
                                    <option>Operator</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                                <input type="email" className="input-field" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Phone</label>
                                <input type="tel" className="input-field" placeholder="555-0100" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Certification Expiry</label>
                                <input type="date" className="input-field" />
                            </div>
                        </form>
                        <div className="p-6 border-t border-white/5 flex justify-end gap-3">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
                            <button type="button" onClick={() => setShowForm(false)} className="btn-primary">Add Member</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Crew;
