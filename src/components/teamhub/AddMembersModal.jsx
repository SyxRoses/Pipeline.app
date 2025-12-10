
import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { useTeamHub } from '../../contexts/TeamHubContext';

const AddMembersModal = ({ isOpen, onClose, channelId }) => {
    const { users, channels, addMembersToChannel } = useTeamHub();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    if (!isOpen) return null;

    const channel = channels.find(c => c.id === channelId);
    if (!channel) return null;

    // Get users not already in the channel
    const availableUsers = users.filter(u =>
        u.id !== 'curr' &&
        u.id !== 'system' &&
        !channel.members?.includes(u.id)
    );

    const filteredUsers = availableUsers.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const toggleUser = (userId) => {
        setSelectedUsers(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleAdd = () => {
        if (selectedUsers.length > 0) {
            addMembersToChannel(channelId, selectedUsers);
            setSelectedUsers([]);
            setSearchQuery('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#404040]">
                    <h2 className="text-lg font-bold text-white">
                        Add Members to #{channel.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Search */}
                    <div className="relative mb-4">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, role, or email"
                            className="w-full pl-9 pr-4 py-2.5 bg-[#0f0f0f] border border-[#404040] rounded-lg text-white placeholder-[#525252] focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    {/* Available Users */}
                    <div className="mb-2 text-xs font-medium text-[#737373] uppercase tracking-wider">
                        Available Users
                    </div>

                    {availableUsers.length === 0 ? (
                        <div className="text-center py-8 text-[#737373]">
                            All users are already in this channel
                        </div>
                    ) : (
                        <div className="max-h-64 overflow-y-auto space-y-1 custom-scrollbar">
                            {filteredUsers.map(user => (
                                <button
                                    key={user.id}
                                    onClick={() => toggleUser(user.id)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${selectedUsers.includes(user.id)
                                        ? 'bg-orange-500/10 border border-orange-500/30'
                                        : 'bg-[#0f0f0f] border border-transparent hover:border-[#404040]'
                                        }`}
                                >
                                    <div className="relative">
                                        <div
                                            className="w-10 h-10 rounded flex items-center justify-center text-white text-sm font-bold"
                                            style={{ backgroundColor: user.avatarBg }}
                                        >
                                            {user.initials}
                                        </div>
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1a1a] ${user.status === 'online' ? 'bg-emerald-500' :
                                            user.status === 'away' ? 'bg-amber-500' : 'bg-zinc-500'
                                            }`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white truncate">{user.name}</div>
                                        <div className="text-xs text-[#737373] truncate">{user.role}</div>
                                    </div>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedUsers.includes(user.id)
                                        ? 'bg-orange-500 border-orange-500'
                                        : 'border-[#525252]'
                                        }`}>
                                        {selectedUsers.includes(user.id) && <Check size={12} className="text-white" />}
                                    </div>
                                </button>
                            ))}

                            {filteredUsers.length === 0 && (
                                <div className="text-center py-4 text-[#737373]">
                                    No users found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
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
                        onClick={handleAdd}
                        disabled={selectedUsers.length === 0}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedUsers.length > 0
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-[#333] text-[#525252] cursor-not-allowed'
                            }`}
                    >
                        Add Selected ({selectedUsers.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMembersModal;
