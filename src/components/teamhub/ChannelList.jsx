
import React from 'react';
import { useTeamHub } from '../../contexts/TeamHubContext';
import { Hash, Lock, ChevronDown, Plus, Circle } from 'lucide-react';

const ChannelList = () => {
    const { channels, dms, activeChannelId, setActiveChannelId, users } = useTeamHub();

    const projectChannels = channels.filter(c => c.category === 'Project Channels');
    const teamChannels = channels.filter(c => c.category === 'Teams');

    const ChannelItem = ({ channel }) => (
        <button
            onClick={() => setActiveChannelId(channel.id)}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors group mb-0.5 ${activeChannelId === channel.id
                    ? 'bg-[#2d2d2d] text-white border-l-2 border-cyan-500 pl-[10px]'
                    : 'text-[#a3a3a3] hover:bg-[#262626] hover:text-white border-l-2 border-transparent pl-[10px]'
                }`}
        >
            <div className="flex items-center gap-2 truncate">
                {channel.type === 'public' ? <Hash size={14} className="shrink-0" /> : <Lock size={14} className="shrink-0" />}
                <span className="truncate">{channel.name}</span>
            </div>
            {channel.unread > 0 && (
                <span className="bg-cyan-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center">
                    {channel.unread}
                </span>
            )}
        </button>
    );

    const DMItem = ({ dm }) => {
        const user = users.find(u => u.id === dm.userId);
        return (
            <button
                onClick={() => setActiveChannelId(dm.id)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors group mb-0.5 ${activeChannelId === dm.id
                        ? 'bg-[#2d2d2d] text-white'
                        : 'text-[#a3a3a3] hover:bg-[#262626] hover:text-white'
                    }`}
            >
                <div className="relative">
                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${dm.name}`} alt="" className="w-5 h-5 rounded rounded-md" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#1a1a1a] ${dm.status === 'online' ? 'bg-emerald-500' :
                            dm.status === 'away' ? 'bg-amber-500' : 'bg-zinc-500'
                        }`}></div>
                </div>
                <span className="truncate">{dm.name}</span>
            </button>
        );
    }

    return (
        <div className="w-[260px] flex-shrink-0 bg-[#1a1a1a] flex flex-col h-full border-r border-[#404040]">
            {/* Header */}
            <div className="h-14 border-b border-[#404040] flex items-center justify-between px-4 sticky top-0 bg-[#1a1a1a] z-10 shrink-0">
                <div>
                    <h2 className="font-bold text-white text-[15px]">PipeLine One</h2>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[11px] text-[#a3a3a3]">Keystone Ext. 4</span>
                    </div>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#262626] text-white">
                    <ChevronDown size={16} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6 custom-scrollbar">

                {/* Project Channels */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer text-[#a3a3a3] hover:text-white">
                        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
                            <ChevronDown size={12} />
                            Project Channels
                        </div>
                        <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        {projectChannels.map(c => <ChannelItem key={c.id} channel={c} />)}
                    </div>
                </div>

                {/* Team Channels */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer text-[#a3a3a3] hover:text-white">
                        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
                            <ChevronDown size={12} />
                            Teams
                        </div>
                        <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        {teamChannels.map(c => <ChannelItem key={c.id} channel={c} />)}
                    </div>
                </div>

                {/* Direct Messages */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer text-[#a3a3a3] hover:text-white">
                        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
                            <ChevronDown size={12} />
                            Direct Messages
                        </div>
                        <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        {dms.map(dm => <DMItem key={dm.id} dm={dm} />)}
                    </div>
                </div>
            </div>

            {/* User Profile Bar */}
            <div className="p-3 bg-[#171717] border-t border-[#404040] flex items-center gap-3">
                <div className="relative">
                    <div className="w-9 h-9 rounded bg-emerald-600 flex items-center justify-center text-white font-bold">MS</div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#171717]"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">Mike Stevenson</div>
                    <div className="text-[11px] text-[#a3a3a3] truncate">Project Manager</div>
                </div>
            </div>
        </div>
    );
};

export default ChannelList;
