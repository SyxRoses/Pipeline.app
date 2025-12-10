
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockChannels, mockDMs, mockMessages, mockUsers } from '../data/mockTeamHubData';

const TeamHubContext = createContext();

export const useTeamHub = () => useContext(TeamHubContext);

export const TeamHubProvider = ({ children }) => {
    const [activeChannelId, setActiveChannelId] = useState('c3'); // Default to field-updates
    const [channels, setChannels] = useState(mockChannels);
    const [dms, setDms] = useState(mockDMs);
    const [messages, setMessages] = useState(mockMessages);
    const [users] = useState(mockUsers);
    const [rightPanelOpen, setRightPanelOpen] = useState(true);
    const [activeThread, setActiveThread] = useState(null);

    const activeChannel =
        channels.find(c => c.id === activeChannelId) ||
        dms.find(d => d.id === activeChannelId);

    const getChannelMessages = (channelId) => {
        return messages[channelId] || [];
    };

    const sendMessage = (channelId, content, attachments = []) => {
        const newMessage = {
            id: `new_${Date.now()}`,
            userId: 'curr', // Current user
            content,
            timestamp: new Date().toISOString(),
            attachments,
            reactions: {},
        };

        setMessages(prev => ({
            ...prev,
            [channelId]: [...(prev[channelId] || []), newMessage]
        }));
    };

    // Simulate incoming messages
    useEffect(() => {
        const timer = setInterval(() => {
            if (Math.random() > 0.7) {
                const randomMsg = {
                    id: `sim_${Date.now()}`,
                    userId: 'u2',
                    content: 'Simulation: Field update received.',
                    timestamp: new Date().toISOString(),
                    reactions: {}
                };
                // Only add to 'field-updates' for now to keep it simple
                setMessages(prev => ({
                    ...prev,
                    'c3': [...(prev['c3'] || []), randomMsg]
                }));
            }
        }, 45000); // Every 45 seconds

        return () => clearInterval(timer);
    }, []);

    const value = {
        activeChannelId,
        setActiveChannelId,
        activeChannel,
        channels,
        dms,
        users,
        messages: getChannelMessages(activeChannelId),
        sendMessage,
        rightPanelOpen,
        setRightPanelOpen,
        activeThread,
        setActiveThread
    };

    return (
        <TeamHubContext.Provider value={value}>
            {children}
        </TeamHubContext.Provider>
    );
};
