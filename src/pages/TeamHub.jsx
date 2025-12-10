
import React from 'react';
import { TeamHubProvider, useTeamHub } from '../contexts/TeamHubContext';
import ChannelList from '../components/teamhub/ChannelList';
import ChatArea from '../components/teamhub/ChatArea';
import RightPanel from '../components/teamhub/RightPanel';

const TeamHubLayout = () => {
    const { rightPanelOpen } = useTeamHub();

    return (
        <div className="flex-1 flex h-full overflow-hidden bg-[#0a0a0a] rounded-xl ring-1 ring-white/10 shadow-2xl relative z-0">
            {/* Left Sidebar */}
            <ChannelList />

            {/* Middle Chat Area */}
            <ChatArea />

            {/* Right Panel */}
            {rightPanelOpen && <RightPanel />}
        </div>
    );
};

const TeamHub = () => {
    return (
        <TeamHubProvider>
            <div className="h-[calc(100vh-100px)] w-full">
                <TeamHubLayout />
            </div>
        </TeamHubProvider>
    );
};

export default TeamHub;
