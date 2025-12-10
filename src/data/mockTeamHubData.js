
export const mockUsers = [
    { id: 'u1', name: 'Mike Stevenson', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?u=u1', status: 'online' },
    { id: 'u2', name: 'John Smith', role: 'Superintendent', avatar: 'https://i.pravatar.cc/150?u=u2', status: 'online' },
    { id: 'u3', name: 'Sarah Chen', role: 'QC Inspector', avatar: 'https://i.pravatar.cc/150?u=u3', status: 'away' },
    { id: 'u4', name: 'Tom Wilson', role: 'Safety Manager', avatar: 'https://i.pravatar.cc/150?u=u4', status: 'offline' },
    { id: 'u5', name: 'Dave Roberts', role: 'Foreman', avatar: 'https://i.pravatar.cc/150?u=u5', status: 'offline' },
    { id: 'curr', name: 'Me', role: 'Project Manager', avatar: null, status: 'online' }, // Current user
];

export const mockChannels = [
    { id: 'c1', name: 'general', type: 'public', unread: 0, category: 'Project Channels' },
    { id: 'c2', name: 'daily-standup', type: 'public', unread: 3, category: 'Project Channels' },
    { id: 'c3', name: 'field-updates', type: 'public', unread: 12, category: 'Project Channels', starred: true },
    { id: 'c4', name: 'safety-alerts', type: 'public', unread: 0, category: 'Project Channels', starred: true },
    { id: 'c5', name: 'random', type: 'public', unread: 0, category: 'Project Channels' },
    { id: 'c6', name: 'welding-team', type: 'public', unread: 5, category: 'Teams' },
    { id: 'c7', name: 'inspection-results', type: 'public', unread: 0, category: 'Teams' },
];

export const mockDMs = [
    { id: 'dm1', name: 'John Smith', type: 'dm', unread: 1, userId: 'u2', status: 'online' },
    { id: 'dm2', name: 'Sarah Chen', type: 'dm', unread: 0, userId: 'u3', status: 'away' },
];

export const mockMessages = {
    'c3': [ // field-updates
        {
            id: 'm1',
            userId: 'u2',
            content: 'Just wrapped up welding at Station 145+00. 12 joints completed today.\nMoving equipment to 147+00 tomorrow morning.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            reactions: { '👍': 3, '✅': 2 },
        },
        {
            id: 'm2',
            userId: 'u3',
            content: 'Found minor porosity on Weld #W-1456. See attached X-ray.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(),
            attachments: [
                { type: 'image', name: 'weld-1456-xray.jpg', url: 'https://placehold.co/600x400/000000/FFFFFF/png?text=X-Ray+Scan' }
            ],
            reactions: { '🔍': 5, '⚠️': 2 },
        },
        {
            id: 'm3',
            userId: 'u1',
            content: 'Can you provide the repair procedure?',
            timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            threadCount: 3,
        },
        {
            id: 'm4',
            userId: 'u4',
            content: '@Mike Stevenson Need your approval on the confined space entry plan for the HDD crossing at Station 165+00.',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            mentions: ['u1'], // Mentioning current user
        }
    ],
    'c1': [ // general
        {
            id: 'm10',
            userId: 'u5',
            content: 'Welcome to the new PipeLine One Team Hub!',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            reactions: { '🎉': 10 },
        }
    ]
};
