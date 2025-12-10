
import React, { useState } from 'react';
import { useTeamHub } from '../../contexts/TeamHubContext';
import { X, Bell, Star, MoreHorizontal, FileText, Image as ImageIcon, Link as LinkIcon, User, UserPlus } from 'lucide-react';
import AddMembersModal from './AddMembersModal';

const RightPanel = () => {
    const { activeChannel, setRightPanelOpen, users, channels, getPinnedMessage, currentUser } = useTeamHub();
    const [activeTab, setActiveTab] = useState('about'); // about, members, files
    const [showAddMembersModal, setShowAddMembersModal] = useState(false);

    if (!activeChannel) return null;

    // Get channel members
    const channel = channels.find(c => c.id === activeChannel.id);
    const memberIds = channel?.members || [];
    const members = memberIds.map(id => users.find(u => u.id === id)).filter(Boolean);

    // Get pinned message
    const pinnedMessage = getPinnedMessage(activeChannel.id);

    // Get creator name
    const creator = users.find(u => u.id === channel?.createdBy);
    const creatorName = creator?.name || 'Christopher George';

    return (
        <>
            <div className="w-[350px] shrink-0 border-l border-[#404040] bg-[#1a1a1a] flex flex-col h-full">
                {/* Header */}
                <div className="h-14 border-b border-[#404040] flex items-center justify-between px-4 shrink-0">
                    <h3 className="font-bold text-white text-[15px]">Channel Details</h3>
                    <button onClick={() => setRightPanelOpen(false)} className="text-[#a3a3a3] hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#404040]">
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'about' ? 'text-white border-[#f97316]' : 'text-[#a3a3a3] border-transparent hover:text-white'}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'members' ? 'text-white border-[#f97316]' : 'text-[#a3a3a3] border-transparent hover:text-white'}`}
                    >
                        Members ({members.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('files')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'files' ? 'text-white border-[#f97316]' : 'text-[#a3a3a3] border-transparent hover:text-white'}`}
                    >
                        Files
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">

                    {activeTab === 'about' && (
                        <div className="space-y-6">
                            <section className="bg-[#262626] rounded-lg p-4 border border-[#404040]">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-white text-sm">#{activeChannel.name}</h4>
                                    <button className="text-[#f97316] text-xs hover:underline">Edit</button>
                                </div>
                                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                                    {activeChannel.description || 'Track real-time field crew progress and updates. Post daily targets, completion statuses, and blockers here.'}
                                </p>
                                <div className="mt-4 flex gap-4 text-xs text-[#a3a3a3]">
                                    <div>
                                        <span className="block font-bold text-white mb-0.5">Created</span>
                                        {channel?.createdAt ? new Date(channel.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Oct 18, 2024'}
                                    </div>
                                    <div>
                                        <span className="block font-bold text-white mb-0.5">By</span>
                                        {creatorName}
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="flex items-center justify-between mb-3 text-[#525252] text-xs font-bold uppercase tracking-wider">
                                    Actions
                                </div>
                                <div className="space-y-1">
                                    <button className="w-full flex items-center justify-between p-2 rounded hover:bg-[#262626] text-[#a3a3a3] hover:text-white text-sm">
                                        <span className="flex items-center gap-3"><Bell size={16} /> Notifications</span>
                                        <span className="text-xs">Mentions</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-2 rounded hover:bg-[#262626] text-[#a3a3a3] hover:text-white text-sm">
                                        <span className="flex items-center gap-3"><Star size={16} /> Star Channel</span>
                                        <div className={`w-8 h-4 rounded-full relative ${activeChannel.starred ? 'bg-[#f97316]' : 'bg-[#333]'}`}>
                                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${activeChannel.starred ? 'right-0.5' : 'left-0.5'}`}></div>
                                        </div>
                                    </button>
                                </div>
                            </section>

                            {pinnedMessage && (
                                <section>
                                    <div className="flex items-center justify-between mb-3 text-[#525252] text-xs font-bold uppercase tracking-wider">
                                        Pinned Items
                                    </div>
                                    <div className="bg-[#1f1f1f] rounded border border-[#404040] p-3 text-sm text-[#a3a3a3]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div
                                                className="w-4 h-4 rounded flex items-center justify-center text-[10px] text-white font-bold"
                                                style={{ backgroundColor: currentUser?.avatarBg || '#f97316' }}
                                            >
                                                {currentUser?.initials || 'CG'}
                                            </div>
                                            <span className="text-white font-bold text-xs">{currentUser?.name || 'Christopher George'}</span>
                                        </div>
                                        <p className="line-clamp-2">{pinnedMessage.content.split('\n')[0]}</p>
                                    </div>
                                </section>
                            )}
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="space-y-2">
                            {/* Add Members Button */}
                            <button
                                onClick={() => setShowAddMembersModal(true)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg border border-dashed border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#525252] transition-colors mb-4"
                            >
                                <div className="w-8 h-8 rounded bg-[#262626] flex items-center justify-center">
                                    <UserPlus size={16} />
                                </div>
                                <span className="text-sm font-medium">Invite people</span>
                            </button>

                            {/* Member List */}
                            {members.map(member => (
                                <div key={member.id} className={`flex items-center gap-2 p-2 rounded hover:bg-[#262626] cursor-pointer ${member.status === 'offline' ? 'opacity-50' : ''}`}>
                                    <div className="relative">
                                        <div
                                            className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
                                            style={{ backgroundColor: member.avatarBg }}
                                        >
                                            {member.initials}
                                        </div>
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#1a1a1a] ${member.status === 'online' ? 'bg-emerald-500' :
                                            member.status === 'away' ? 'bg-amber-500' : 'bg-zinc-500'
                                            }`}></div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">
                                            {member.name}
                                            {member.id === 'curr' && <span className="text-[#525252] font-normal ml-1">(you)</span>}
                                        </div>
                                        <div className="text-xs text-[#a3a3a3]">{member.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'files' && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-2 hover:bg-[#262626] rounded group cursor-pointer">
                                <div className="w-10 h-10 bg-[#333] rounded flex items-center justify-center text-[#a3a3a3]">
                                    <ImageIcon size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-white truncate">weld-inspection-photos.jpg</div>
                                    <div className="text-xs text-[#737373]">Willie Thompson • Today</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 hover:bg-[#262626] rounded group cursor-pointer">
                                <div className="w-10 h-10 bg-[#333] rounded flex items-center justify-center text-[#a3a3a3]">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-white truncate">Compliance_Report_v2.pdf</div>
                                    <div className="text-xs text-[#737373]">Charles Davis • Yesterday</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Members Modal */}
            <AddMembersModal
                isOpen={showAddMembersModal}
                onClose={() => setShowAddMembersModal(false)}
                channelId={activeChannel.id}
            />
        </>
    );
};

export default RightPanel;
