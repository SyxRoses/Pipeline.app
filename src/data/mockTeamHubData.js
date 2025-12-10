
// Demo users for Team Hub
export const mockUsers = [
    {
        id: 'curr',
        name: 'Christopher George',
        email: 'christopher.george@pipelineone.com',
        role: 'Project Manager',
        avatar: null, // Uses initials
        initials: 'CG',
        avatarBg: '#f97316', // Orange
        status: 'online',
        phone: '(504) 555-0101',
        bio: 'Leading the Keystone Extension Phase 4 project'
    },
    {
        id: 'u2',
        name: 'Chris Johnson',
        email: 'chris.johnson@pipelineone.com',
        role: 'Welder',
        avatar: null,
        initials: 'CJ',
        avatarBg: '#3b82f6', // Blue
        status: 'online',
        phone: '(504) 555-0102',
        specialty: 'SMAW, GTAW certified'
    },
    {
        id: 'u3',
        name: 'Chaz Williams',
        email: 'chaz.williams@pipelineone.com',
        role: 'Equipment Operator',
        avatar: null,
        initials: 'CW',
        avatarBg: '#22c55e', // Green
        status: 'away',
        phone: '(504) 555-0103',
        specialty: 'Excavator, Dozer, Sideboom'
    },
    {
        id: 'u4',
        name: 'Josh Martinez',
        email: 'josh.martinez@pipelineone.com',
        role: 'Superintendent',
        avatar: null,
        initials: 'JM',
        avatarBg: '#a855f7', // Purple
        status: 'online',
        phone: '(504) 555-0104',
        bio: '15 years in pipeline construction'
    },
    {
        id: 'u5',
        name: 'Charles Davis',
        email: 'charles.davis@pipelineone.com',
        role: 'Safety Manager',
        avatar: null,
        initials: 'CD',
        avatarBg: '#ef4444', // Red
        status: 'online',
        phone: '(504) 555-0105',
        certifications: 'OSHA 30, First Aid/CPR'
    },
    {
        id: 'u6',
        name: 'Willie Thompson',
        email: 'willie.thompson@pipelineone.com',
        role: 'QC Inspector',
        avatar: null,
        initials: 'WT',
        avatarBg: '#14b8a6', // Teal
        status: 'offline',
        phone: '(504) 555-0106',
        certifications: 'API 1169, NACE Level 2'
    },
    {
        id: 'u7',
        name: 'Romalice Anderson',
        email: 'romalice.anderson@pipelineone.com',
        role: 'Coating Specialist',
        avatar: null,
        initials: 'RA',
        avatarBg: '#eab308', // Yellow
        status: 'online',
        phone: '(504) 555-0107',
        specialty: 'FBE, 3-Layer PE coating systems'
    }
];

// Current user helper
export const currentUser = mockUsers.find(u => u.id === 'curr');

// Channels
export const mockChannels = [
    {
        id: 'c1',
        name: 'general',
        type: 'public',
        unread: 0,
        category: 'Project Channels',
        description: 'Company-wide announcements and general discussion',
        members: ['curr', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
        createdBy: 'curr',
        createdAt: '2024-10-18T08:00:00.000Z'
    },
    {
        id: 'c2',
        name: 'nola-team',
        type: 'private',
        unread: 0,
        category: 'Project Channels',
        starred: true,
        description: 'NOLA crew coordination and daily updates for Louisiana pipeline segment',
        members: ['curr', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
        admins: ['curr', 'u4'], // Christopher and Josh are admins
        createdBy: 'curr',
        createdAt: '2024-12-10T08:00:00.000Z'
    },
    {
        id: 'c3',
        name: 'safety-alerts',
        type: 'public',
        unread: 0,
        category: 'Project Channels',
        starred: true,
        description: 'Urgent safety notifications and incidents',
        members: ['curr', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
        createdBy: 'u5',
        createdAt: '2024-10-20T09:00:00.000Z'
    },
    {
        id: 'c4',
        name: 'welding-team',
        type: 'private',
        unread: 0,
        category: 'Teams',
        description: 'Welding crew coordination and schedule',
        members: ['u2', 'curr', 'u4', 'u6'],
        admins: ['u2'],
        createdBy: 'u2',
        createdAt: '2024-11-01T08:00:00.000Z'
    },
    {
        id: 'c5',
        name: 'equipment-ops',
        type: 'private',
        unread: 0,
        category: 'Teams',
        description: 'Equipment operations and maintenance',
        members: ['u3', 'u4', 'curr'],
        admins: ['u3'],
        createdBy: 'u3',
        createdAt: '2024-11-05T08:00:00.000Z'
    }
];

// Direct Messages
export const mockDMs = [
    { id: 'dm1', name: 'Josh Martinez', type: 'dm', unread: 1, userId: 'u4', status: 'online' },
    { id: 'dm2', name: 'Chris Johnson', type: 'dm', unread: 0, userId: 'u2', status: 'online' },
];

// Pinned message for nola-team
export const pinnedMessages = {
    'c2': {
        id: 'pinned1',
        userId: 'curr',
        pinnedAt: '2024-12-10T08:00:00.000Z',
        content: `🎯 **NOLA Team Daily Targets**

• Station Range: 145+00 to 150+00
• Daily Footage Goal: 2,000 feet
• Safety First: Zero incidents, 142-day streak
• Report all issues immediately in this channel

📞 Emergency Contact: (504) 555-0911`
    }
};

// Helper to create timestamps for demo messages
const today = new Date();
const todayStr = today.toISOString().split('T')[0];

// Demo messages for #nola-team channel
export const mockMessages = {
    'c2': [ // nola-team
        {
            id: 'm1',
            userId: 'curr',
            content: 'Good morning team! Today we\'re focusing on Station 145+00 to 147+00. @Josh Martinez can you coordinate the morning safety briefing?',
            timestamp: `${todayStr}T08:05:00.000Z`,
            mentions: ['u4'],
            reactions: { '👍': ['u2', 'u3', 'u6'] }
        },
        {
            id: 'm2',
            userId: 'u4',
            content: 'Copy that @Christopher George. Tailgate meeting starts at 8:30 AM. Topics: Confined space entry, heat stress, and proper PPE for welding ops.',
            timestamp: `${todayStr}T08:12:00.000Z`,
            mentions: ['curr'],
            reactions: { '✅': ['curr', 'u5'] }
        },
        {
            id: 'm3',
            userId: 'u2',
            content: 'Welding machine is set up at 145+00. We have 8 joints to complete today. Equipment check complete, all systems go.',
            timestamp: `${todayStr}T08:25:00.000Z`,
            reactions: { '🔥': ['u4', 'u3'] }
        },
        {
            id: 'm4',
            userId: 'u3',
            content: 'Moving pipe to 147+00. Traffic control in place on Highway 51. ETA to have pipe strung by 11:00 AM.',
            timestamp: `${todayStr}T09:15:00.000Z`,
            reactions: { '👍': ['curr', 'u4'] }
        },
        {
            id: 'm5',
            userId: 'u6',
            content: 'Completed visual inspection on welds W-1445 through W-1448. All pass. X-ray scheduled for this afternoon. See photos attached.',
            timestamp: `${todayStr}T10:30:00.000Z`,
            attachments: [
                { type: 'image', name: 'weld-inspection-photos.jpg', url: 'https://placehold.co/600x400/1f2937/ffffff/png?text=Weld+Inspection+Photos' }
            ],
            reactions: { '🔍': ['u4'], '✅': ['curr', 'u5'] }
        },
        {
            id: 'm6',
            userId: 'u5',
            content: '@channel Reminder: Heat index expected to reach 95°F this afternoon. Mandatory water breaks every 30 minutes. Shade tent is set up at Station 146+00.',
            timestamp: `${todayStr}T11:00:00.000Z`,
            mentions: ['channel'],
            reactions: { '💧': ['curr', 'u2', 'u3', 'u4', 'u6', 'u7'] }
        },
        {
            id: 'm7',
            userId: 'u7',
            content: 'Coating inspection complete on yesterday\'s welds. DFT readings all within spec (12-16 mils). No holidays detected. Ready for backfill.',
            timestamp: `${todayStr}T11:45:00.000Z`,
            reactions: { '✅': ['curr', 'u4', 'u6'] }
        },
        {
            id: 'm8',
            userId: 'u4',
            content: 'Lunch break. Crew reconvenes at 12:30 PM. Great progress this morning, team! We\'re ahead of schedule.',
            timestamp: `${todayStr}T12:05:00.000Z`,
            reactions: { '🍔': ['u2', 'u3'], '💪': ['curr'] }
        }
    ],
    'c1': [ // general
        {
            id: 'm10',
            userId: 'curr',
            content: 'Welcome to the PipeLine One Team Hub! Use this channel for company-wide announcements.',
            timestamp: '2024-10-18T08:00:00.000Z',
            reactions: { '🎉': ['u2', 'u3', 'u4', 'u5', 'u6', 'u7'] }
        }
    ],
    'c3': [ // safety-alerts
        {
            id: 'm20',
            userId: 'u5',
            content: '⚠️ **Safety Alert**: All crews please review the updated confined space entry procedures before working at HDD crossings. Updated SOP attached.',
            timestamp: '2024-12-09T09:00:00.000Z',
            attachments: [
                { type: 'file', name: 'Confined_Space_Entry_SOP_v3.pdf', url: '#' }
            ],
            reactions: { '👀': ['curr', 'u2', 'u4'] }
        }
    ],
    'c4': [ // welding-team
        {
            id: 'm30',
            userId: 'u2',
            content: 'Updated welding schedule for this week is posted. We\'re prioritizing the mainline tie-ins at Station 150+00.',
            timestamp: '2024-12-09T14:00:00.000Z',
            reactions: { '👍': ['curr', 'u4'] }
        }
    ],
    'c5': [ // equipment-ops
        {
            id: 'm40',
            userId: 'u3',
            content: 'Sideboom #3 scheduled for maintenance tomorrow. Please use Sideboom #1 for pipe handling.',
            timestamp: '2024-12-09T16:00:00.000Z',
            reactions: { '👍': ['u4', 'curr'] }
        }
    ]
};

// Helper function to get user by ID
export const getUserById = (userId) => mockUsers.find(u => u.id === userId);

// Helper to get channel members as user objects
export const getChannelMembers = (channelId) => {
    const channel = mockChannels.find(c => c.id === channelId);
    if (!channel) return [];
    return channel.members.map(id => getUserById(id)).filter(Boolean);
};
