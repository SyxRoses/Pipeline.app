
import React, { useState } from 'react';
import { X, Hash, Lock, Search, Check } from 'lucide-react';
import { useTeamHub } from '../../contexts/TeamHubContext';

const CreateChannelModal = ({ isOpen, onClose }) => {
    const { users, createChannel, currentUser } = useTeamHub();
    const [channelName, setChannelName] = useState('');
    const [description, setDescription] = useState('');
    const [channelType, setChannelType] = useState('private');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    // Filter out current user from member selection
    const availableUsers = users.filter(u => u.id !== 'curr' && u.id !== 'system');
    const filteredUsers = availableUsers.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const validateChannelName = (name) => {
        const normalized = name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
        return normalized;
    };

    const handleNameChange = (e) => {
        const raw = e.target.value;
        const validated = validateChannelName(raw);
        setChannelName(validated);
        setError('');
    };

    const toggleMember = (userId) => {
        setSelectedMembers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleCreate = () => {
        // Validation
        if (channelName.length < 2) {
            setError('Channel name must be at least 2 characters');
            return;
        }
        if (channelName.length > 50) {
            setError('Channel name must be 50 characters or less');
            return;
        }
        if (channelType === 'private' && selectedMembers.length === 0) {
            setError('Private channels must have at least 1 member');
            return;
        }

        createChannel(channelName, description, channelType, selectedMembers);

        // Reset and close
        setChannelName('');
        setDescription('');
        setChannelType('private');
        setSelectedMembers([]);
        setError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#404040]">
                    <h2 className="text-lg font-bold text-white">Create New Channel</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Channel Name */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Channel Name</label>
                        <div className="relative">
                            <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252]" />
                            <input
                                type="text"
                                value={channelName}
                                onChange={handleNameChange}
                                placeholder="e.g., nola-team, equipment-maintenance"
                                className="w-full pl-9 pr-4 py-2.5 bg-[#0f0f0f] border border-[#404040] rounded-lg text-white placeholder-[#525252] focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <p className="text-xs text-[#737373] mt-1">Lowercase letters, numbers, and hyphens only</p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Description (optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value.slice(0, 250))}
                            placeholder="Brief description of the channel's purpose"
                            rows={2}
                            className="w-full px-4 py-2.5 bg-[#0f0f0f] border border-[#404040] rounded-lg text-white placeholder-[#525252] focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none"
                        />
                        <p className="text-xs text-[#737373] mt-1">{description.length}/250 characters</p>
                    </div>

                    {/* Channel Type */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">Channel Type</label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 p-3 bg-[#0f0f0f] border border-[#404040] rounded-lg cursor-pointer hover:border-[#525252] transition-colors">
                                <input
                                    type="radio"
                                    name="channelType"
                                    value="public"
                                    checked={channelType === 'public'}
                                    onChange={(e) => setChannelType(e.target.value)}
                                    className="w-4 h-4 text-orange-500 bg-[#0f0f0f] border-[#525252] focus:ring-orange-500"
                                />
                                <Hash size={16} className="text-[#a3a3a3]" />
                                <div>
                                    <div className="text-sm text-white">Public</div>
                                    <div className="text-xs text-[#737373]">Anyone in the workspace can join</div>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 p-3 bg-[#0f0f0f] border border-[#404040] rounded-lg cursor-pointer hover:border-[#525252] transition-colors">
                                <input
                                    type="radio"
                                    name="channelType"
                                    value="private"
                                    checked={channelType === 'private'}
                                    onChange={(e) => setChannelType(e.target.value)}
                                    className="w-4 h-4 text-orange-500 bg-[#0f0f0f] border-[#525252] focus:ring-orange-500"
                                />
                                <Lock size={16} className="text-[#a3a3a3]" />
                                <div>
                                    <div className="text-sm text-white">Private</div>
                                    <div className="text-xs text-[#737373]">Invite only</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Member Selection (for private channels) */}
                    {channelType === 'private' && (
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Add Members</label>
                            <div className="relative mb-2">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name or role"
                                    className="w-full pl-9 pr-4 py-2 bg-[#0f0f0f] border border-[#404040] rounded-lg text-white placeholder-[#525252] focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                />
                            </div>

                            {/* Selected Members Chips */}
                            {selectedMembers.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {selectedMembers.map(id => {
                                        const user = users.find(u => u.id === id);
                                        return (
                                            <span
                                                key={id}
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full"
                                            >
                                                {user?.name}
                                                <button
                                                    onClick={() => toggleMember(id)}
                                                    className="hover:text-orange-200"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                            )}

                            {/* User List */}
                            <div className="max-h-40 overflow-y-auto space-y-1 custom-scrollbar">
                                {filteredUsers.map(user => (
                                    <button
                                        key={user.id}
                                        onClick={() => toggleMember(user.id)}
                                        className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${selectedMembers.includes(user.id)
                                            ? 'bg-orange-500/10 border border-orange-500/30'
                                            : 'bg-[#0f0f0f] border border-transparent hover:border-[#404040]'
                                            }`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
                                            style={{ backgroundColor: user.avatarBg }}
                                        >
                                            {user.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm text-white truncate">{user.name}</div>
                                            <div className="text-xs text-[#737373] truncate">{user.role}</div>
                                        </div>
                                        {selectedMembers.includes(user.id) && (
                                            <Check size={16} className="text-orange-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-4 border-t border-[#404040]">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                    >
                        Create Channel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChannelModal;
