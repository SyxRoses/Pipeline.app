
import React, { useEffect, useRef } from 'react';
import { useTeamHub } from '../../contexts/TeamHubContext';
import { Hash, Search, Info, Pin, MoreHorizontal, Smile, Reply, Check, CornerDownRight } from 'lucide-react';
import MessageComposer from './MessageComposer';

const ChatArea = () => {
    const { activeChannel, messages, setRightPanelOpen, rightPanelOpen, users } = useTeamHub();
    const scrollRef = useRef(null);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, activeChannel]);

    if (!activeChannel) return <div className="flex-1 bg-[#0f0f0f] flex items-center justify-center text-[#525252]">Select a channel</div>;

    const getUser = (userId) => users.find(u => u.id === userId) || { name: 'Unknown', avatar: null, role: '' };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0f0f0f] relative min-w-0">
            {/* Channel Header */}
            <div className="h-14 border-b border-[#404040] flex items-center justify-between px-4 bg-[#0f0f0f] z-10 shrink-0">
                <div className="flex items-center gap-2 overflow-hidden">
                    <Hash size={20} className="text-[#a3a3a3]" />
                    <div>
                        <div className="font-bold text-white text-[15px] leading-tight cursor-pointer hover:underline">
                            {activeChannel.name}
                        </div>
                        <div className="text-[12px] text-[#a3a3a3] flex items-center gap-2 truncate">
                            {activeChannel.starred && <Pin size={10} />}
                            <span className="truncate">Track real-time field crew progress and updates</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-[#a3a3a3]">
                    <div className="hidden md:flex -space-x-2">
                        {/* Face pile */}
                        <div className="w-6 h-6 rounded bg-zinc-700 border border-[#0f0f0f]"></div>
                        <div className="w-6 h-6 rounded bg-zinc-600 border border-[#0f0f0f]"></div>
                        <div className="w-6 h-6 rounded bg-zinc-500 border border-[#0f0f0f] flex items-center justify-center text-[9px] text-white">45</div>
                    </div>
                    <button className="hover:text-white"><Search size={18} /></button>
                    <button
                        className={`hover:text-white ${rightPanelOpen ? 'text-white' : ''}`}
                        onClick={() => setRightPanelOpen(!rightPanelOpen)}
                    >
                        <Info size={18} />
                    </button>
                </div>
            </div>

            {/* Messages List */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-[#262626] rounded-2xl mx-auto flex items-center justify-center mb-4 text-[#a3a3a3]">
                            <Hash size={32} />
                        </div>
                        <h3 className="text-white font-bold mb-1">Welcome to #{activeChannel.name}!</h3>
                        <p className="text-[#a3a3a3] text-sm">This is the start of the <span className="text-[#f97316]">#{activeChannel.name}</span> channel.</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => {
                        const isContinuation = idx > 0 && messages[idx - 1].userId === msg.userId && new Date(msg.timestamp) - new Date(messages[idx - 1].timestamp) < 60000 * 5;
                        const user = getUser(msg.userId);

                        return (
                            <div key={msg.id} className={`group flex gap-4 ${isContinuation ? 'mt-1' : 'mt-6'}`}>
                                {/* Avatar */}
                                <div className="w-10 shrink-0">
                                    {!isContinuation && (
                                        <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="" className="w-10 h-10 rounded-md object-cover bg-[#262626]" />
                                    )}
                                    {isContinuation && <div className="w-10 text-[10px] text-[#525252] text-right pr-1 opacity-0 group-hover:opacity-100 hover:opacity-100">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 max-w-3xl">
                                    {!isContinuation && (
                                        <div className="flex items-baseline gap-2 mb-0.5">
                                            <span className="font-bold text-white text-[15px] cursor-pointer hover:underline">{user.name}</span>
                                            {user.role && <span className="text-[11px] text-[#737373] bg-[#262626] px-1.5 py-0.5 rounded text-xs">{user.role}</span>}
                                            <span className="text-xs text-[#737373] ml-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                                        </div>
                                    )}

                                    <div className="text-[#e5e5e5] text-[15px] whitespace-pre-wrap leading-relaxed">
                                        {msg.content}
                                    </div>

                                    {/* Attachments */}
                                    {msg.attachments && msg.attachments.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {msg.attachments.map((att, i) => (
                                                <div key={i} className="border border-[#404040] rounded-lg overflow-hidden bg-[#1f1f1f] max-w-sm">
                                                    <img src={att.url} alt={att.name} className="max-h-60 w-auto object-cover" />
                                                    <div className="p-2 text-xs text-[#a3a3a3] truncate">{att.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Reactions */}
                                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                                        <div className="flex gap-1.5 mt-2">
                                            {Object.entries(msg.reactions).map(([emoji, count]) => (
                                                <button key={emoji} className="flex items-center gap-1.5 bg-[#262626] border border-transparent hover:border-[#404040] rounded-full px-2 py-0.5 text-xs text-[#a3a3a3]">
                                                    <span>{emoji}</span>
                                                    <span className="font-medium text-[#f97316]">{count}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Thread Indicator */}
                                    {msg.threadCount > 0 && (
                                        <div className="flex items-center gap-2 mt-2 cursor-pointer group/thread">
                                            <div className="flex -space-x-1.5">
                                                <img src="https://i.pravatar.cc/150?u=u1" className="w-5 h-5 rounded border border-[#0f0f0f]" alt="" />
                                                <img src="https://i.pravatar.cc/150?u=u2" className="w-5 h-5 rounded border border-[#0f0f0f]" alt="" />
                                            </div>
                                            <span className="text-[#a3a3a3] text-sm group-hover/thread:text-white font-medium">{msg.threadCount} replies</span>
                                            <span className="text-[#525252] text-xs group-hover/thread:text-[#a3a3a3]">Last reply today at 1:45 PM</span>
                                        </div>
                                    )}

                                </div>

                                {/* Hover Actions */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 right-4 bg-[#1f1f1f] border border-[#404040] rounded-lg shadow-lg flex items-center p-0.5">
                                    <button className="p-1.5 hover:bg-[#333] rounded text-[#a3a3a3] hover:text-white relative tooltip" title="Add Reaction"><Smile size={16} /></button>
                                    <button className="p-1.5 hover:bg-[#333] rounded text-[#a3a3a3] hover:text-white" title="Reply in Thread"><Reply size={16} /></button>
                                    <button className="p-1.5 hover:bg-[#333] rounded text-[#a3a3a3] hover:text-white" title="Share"><CornerDownRight size={16} /></button>
                                    <button className="p-1.5 hover:bg-[#333] rounded text-[#a3a3a3] hover:text-white" title="More"><MoreHorizontal size={16} /></button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Composer */}
            <MessageComposer channelId={activeChannel.id} />
        </div>
    );
};

export default ChatArea;
