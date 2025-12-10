
import React, { useState } from 'react';
import { useTeamHub } from '../../contexts/TeamHubContext';
import { X, Bell, Star, MoreHorizontal, FileText, Image as ImageIcon, Link as LinkIcon, User } from 'lucide-react';

const RightPanel = () => {
    const { activeChannel, setRightPanelOpen } = useTeamHub();
    const [activeTab, setActiveTab] = useState('about'); // about, members, files

    if (!activeChannel) return null;

    return (
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
                    Members
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
                                Track real-time field crew progress and updates. Post daily targets, completion statuses, and blockers here.
                            </p>
                            <div className="mt-4 flex gap-4 text-xs text-[#a3a3a3]">
                                <div>
                                    <span className="block font-bold text-white mb-0.5">Created</span>
                                    Oct 18, 2024
                                </div>
                                <div>
                                    <span className="block font-bold text-white mb-0.5">By</span>
                                    Mike Stevenson
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
                                    <div className="w-8 h-4 bg-[#f97316] rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
                                </button>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-3 text-[#525252] text-xs font-bold uppercase tracking-wider">
                                Pinned Items
                            </div>
                            <div className="bg-[#1f1f1f] rounded border border-[#404040] p-3 text-sm text-[#a3a3a3]">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-4 rounded bg-emerald-600 flex items-center justify-center text-[10px] text-white font-bold">MS</div>
                                    <span className="text-white font-bold text-xs">Mike Stevenson</span>
                                </div>
                                <p className="line-clamp-2">Please ensure all daily reports are submitted by 4 PM local time.</p>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'members' && (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-[#262626] cursor-pointer">
                            <div className="relative">
                                <img src="https://i.pravatar.cc/150?u=u1" className="w-8 h-8 rounded bg-[#333]" alt="" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1a1a1a]"></div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Mike Stevenson</div>
                                <div className="text-xs text-[#a3a3a3]">Project Manager</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-[#262626] cursor-pointer">
                            <div className="relative">
                                <img src="https://i.pravatar.cc/150?u=u2" className="w-8 h-8 rounded bg-[#333]" alt="" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1a1a1a]"></div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">John Smith</div>
                                <div className="text-xs text-[#a3a3a3]">Superintendent</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-[#262626] cursor-pointer opacity-50">
                            <div className="relative">
                                <img src="https://i.pravatar.cc/150?u=u3" className="w-8 h-8 rounded bg-[#333]" alt="" />
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-zinc-500 border-2 border-[#1a1a1a]"></div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Sarah Chen</div>
                                <div className="text-xs text-[#a3a3a3]">QC Inspector</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'files' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-2 hover:bg-[#262626] rounded group cursor-pointer">
                            <div className="w-10 h-10 bg-[#333] rounded flex items-center justify-center text-[#a3a3a3]">
                                <ImageIcon size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white truncate">weld-1456-xray.jpg</div>
                                <div className="text-xs text-[#737373]">Sarah Chen • 2h ago</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 hover:bg-[#262626] rounded group cursor-pointer">
                            <div className="w-10 h-10 bg-[#333] rounded flex items-center justify-center text-[#a3a3a3]">
                                <FileText size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white truncate">Compliance_Report_v2.pdf</div>
                                <div className="text-xs text-[#737373]">Tom Wilson • Yesterday</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RightPanel;
