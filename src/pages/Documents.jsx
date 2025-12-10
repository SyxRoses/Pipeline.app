import React, { useState, useCallback } from 'react';
import { FolderOpen, Upload, FileText, File, Image, Search, Filter, Grid, List, Download, Trash2, Eye, Plus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const mockDocuments = [
    { id: 1, name: 'Engineering Drawings v2.3.pdf', type: 'pdf', category: 'Engineering', size: '4.2 MB', date: '2024-12-08' },
    { id: 2, name: 'Environmental Permit.pdf', type: 'pdf', category: 'Permits', size: '1.8 MB', date: '2024-12-05' },
    { id: 3, name: 'Safety_Protocol_2024.pdf', type: 'pdf', category: 'Safety', size: '2.1 MB', date: '2024-12-01' },
    { id: 4, name: 'Site_Survey_Map.png', type: 'image', category: 'Maps', size: '8.5 MB', date: '2024-11-28' },
    { id: 5, name: 'Contractor_Agreement.pdf', type: 'pdf', category: 'Contracts', size: '3.4 MB', date: '2024-11-20' },
    { id: 6, name: 'Weld_Procedure_Spec.pdf', type: 'pdf', category: 'Procedures', size: '1.2 MB', date: '2024-11-15' },
];

const categories = ['All', 'Engineering', 'Permits', 'Safety', 'Maps', 'Contracts', 'Procedures'];

const Documents = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUpload, setShowUpload] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        console.log('Files uploaded:', acceptedFiles);
        setShowUpload(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const filteredDocs = mockDocuments.filter(doc => {
        const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return <FileText size={24} className="text-rose-400" />;
            case 'image': return <Image size={24} className="text-blue-400" />;
            default: return <File size={24} className="text-zinc-400" />;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Document Management</h1>
                    <p className="text-zinc-500">{mockDocuments.length} documents • {categories.length - 1} categories</p>
                </div>

                <button
                    onClick={() => setShowUpload(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    <Upload size={16} /> Upload Document
                </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search documents..."
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                </div>

                <div className="flex gap-2">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* View Toggle */}
                    <div className="flex bg-zinc-800 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-zinc-400'}`}
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-600 text-white' : 'text-zinc-400'}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Document Grid */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredDocs.map(doc => (
                        <div key={doc.id} className="bg-surface border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group cursor-pointer">
                            <div className="aspect-square bg-zinc-900 rounded-lg flex items-center justify-center mb-3">
                                {getFileIcon(doc.type)}
                            </div>
                            <h4 className="text-white text-sm font-medium truncate">{doc.name}</h4>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-zinc-500">{doc.size}</span>
                                <span className="text-xs text-zinc-600">{doc.date}</span>
                            </div>
                            <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-zinc-800 rounded text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white">
                                    <Eye size={12} /> View
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-zinc-800 rounded text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white">
                                    <Download size={12} /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-surface border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-zinc-900/50">
                            <tr className="text-left text-xs text-zinc-500">
                                <th className="p-4">Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Size</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocs.map(doc => (
                                <tr key={doc.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                                    <td className="p-4 flex items-center gap-3">
                                        {getFileIcon(doc.type)}
                                        <span className="text-white text-sm">{doc.name}</span>
                                    </td>
                                    <td className="p-4 text-zinc-400 text-sm">{doc.category}</td>
                                    <td className="p-4 text-zinc-500 text-sm">{doc.size}</td>
                                    <td className="p-4 text-zinc-500 text-sm">{doc.date}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded"><Eye size={14} /></button>
                                            <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded"><Download size={14} /></button>
                                            <button className="p-1.5 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Upload Modal */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Upload Document</h2>
                            <button onClick={() => setShowUpload(false)} className="text-zinc-500 hover:text-white">×</button>
                        </div>
                        <div className="p-6">
                            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-cyan-500 bg-cyan-500/5' : 'border-zinc-700 hover:border-zinc-600'}`}>
                                <input {...getInputProps()} />
                                <Upload size={48} className="mx-auto text-zinc-600 mb-4" />
                                <p className="text-zinc-400 font-medium">Drag & drop files here</p>
                                <p className="text-zinc-600 text-sm mt-1">or click to browse</p>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Category</label>
                                <select className="input-field">
                                    {categories.filter(c => c !== 'All').map(cat => (
                                        <option key={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="p-6 border-t border-white/5 flex justify-end gap-3">
                            <button onClick={() => setShowUpload(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
                            <button className="btn-primary">Upload</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
