
import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockChannels, mockDMs, mockMessages, mockUsers, pinnedMessages, currentUser, getChannelMembers } from '../data/mockTeamHubData';

const TeamHubContext = createContext();

export const useTeamHub = () => useContext(TeamHubContext);

export const TeamHubProvider = ({ children }) => {
    const [activeChannelId, setActiveChannelId] = useState('c2'); // Default to nola-team
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

    // Get pinned message for a channel
    const getPinnedMessage = (channelId) => {
        return pinnedMessages[channelId] || null;
    };

    // Get members for the active channel
    const getActiveChannelMembers = useCallback(() => {
        if (!activeChannel) return [];
        const channel = channels.find(c => c.id === activeChannelId);
        if (!channel || !channel.members) return [];
        return channel.members.map(id => users.find(u => u.id === id)).filter(Boolean);
    }, [activeChannel, activeChannelId, channels, users]);

    // Send a new message
    const sendMessage = (channelId, content, attachments = [], mentions = []) => {
        const newMessage = {
            id: `new_${Date.now()}`,
            userId: 'curr', // Current user
            content,
            timestamp: new Date().toISOString(),
            attachments,
            mentions,
            reactions: {},
        };

        setMessages(prev => ({
            ...prev,
            [channelId]: [...(prev[channelId] || []), newMessage]
        }));

        return newMessage;
    };

    // Create a new channel
    const createChannel = (name, description, type, memberIds = []) => {
        const newChannel = {
            id: `c_${Date.now()}`,
            name: name.toLowerCase().replace(/\s+/g, '-'),
            type,
            unread: 0,
            category: type === 'public' ? 'Project Channels' : 'Teams',
            description,
            members: ['curr', ...memberIds],
            admins: ['curr'],
            createdBy: 'curr',
            createdAt: new Date().toISOString()
        };

        setChannels(prev => [...prev, newChannel]);

        // Add welcome message
        const welcomeMessage = {
            id: `welcome_${Date.now()}`,
            userId: 'system',
            content: `🎉 @${currentUser.name} created this channel`,
            timestamp: new Date().toISOString(),
            isSystem: true
        };

        setMessages(prev => ({
            ...prev,
            [newChannel.id]: [welcomeMessage]
        }));

        // Navigate to new channel
        setActiveChannelId(newChannel.id);

        return newChannel;
    };

    // Add members to a channel
    const addMembersToChannel = (channelId, userIds) => {
        setChannels(prev => prev.map(channel => {
            if (channel.id === channelId) {
                const newMembers = [...new Set([...channel.members, ...userIds])];
                return { ...channel, members: newMembers };
            }
            return channel;
        }));

        // Add system message
        const addedUsers = userIds.map(id => users.find(u => u.id === id)).filter(Boolean);
        const names = addedUsers.map(u => `@${u.name}`);
        let namesStr = '';
        if (names.length === 1) {
            namesStr = names[0];
        } else if (names.length === 2) {
            namesStr = `${names[0]} and ${names[1]}`;
        } else {
            namesStr = `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
        }

        const systemMessage = {
            id: `sys_${Date.now()}`,
            userId: 'system',
            content: `${currentUser.name} added ${namesStr} to the channel`,
            timestamp: new Date().toISOString(),
            isSystem: true
        };

        setMessages(prev => ({
            ...prev,
            [channelId]: [...(prev[channelId] || []), systemMessage]
        }));

        return addedUsers;
    };

    // Add reaction to a message
    const addReaction = (channelId, messageId, emoji) => {
        setMessages(prev => {
            const channelMessages = prev[channelId] || [];
            return {
                ...prev,
                [channelId]: channelMessages.map(msg => {
                    if (msg.id === messageId) {
                        const reactions = { ...msg.reactions };
                        if (!reactions[emoji]) {
                            reactions[emoji] = ['curr'];
                        } else if (!reactions[emoji].includes('curr')) {
                            reactions[emoji] = [...reactions[emoji], 'curr'];
                        } else {
                            // Toggle off
                            reactions[emoji] = reactions[emoji].filter(id => id !== 'curr');
                            if (reactions[emoji].length === 0) {
                                delete reactions[emoji];
                            }
                        }
                        return { ...msg, reactions };
                    }
                    return msg;
                })
            };
        });
    };

    const value = {
        // State
        activeChannelId,
        setActiveChannelId,
        activeChannel,
        channels,
        dms,
        users,
        currentUser,
        messages: getChannelMessages(activeChannelId),
        rightPanelOpen,
        setRightPanelOpen,
        activeThread,
        setActiveThread,

        // Functions
        sendMessage,
        createChannel,
        setChannels,
        addMembersToChannel,
        addReaction,
        getPinnedMessage,
        getActiveChannelMembers,
        getChannelMessages
    };

    return (
        <TeamHubContext.Provider value={value}>
            {children}
        </TeamHubContext.Provider>
    );
};
