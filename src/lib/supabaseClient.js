import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
// NOTE: Replace these with actual environment variables when connecting to real DB
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock Data Service for MVP Visualization
// This allows the UI to work immediately without a backend connection
export const mockData = {
    projects: [
        {
            id: 1,
            name: 'Keystone Extension Phase 4',
            status: 'Active',
            progress: 45,
            budget_used: 12500000,
            total_budget: 35000000,
            days_without_incident: 142,
            location: 'North Dakota',
        }
    ],
    stats: {
        total_footage: 52800, // 10 miles
        cleared_footage: 26400, // 5 miles
        welded_footage: 15000,
        backfilled_footage: 5000,
    },
    recent_activity: [
        { id: 1, user: 'Mike S.', role: 'Superintendent', action: 'submitted Daily Progress', time: '10 mins ago' },
        { id: 2, user: 'Sarah J.', role: 'QC Inspector', action: 'flagged Weld #402', time: '1 hour ago', type: 'issue' },
        { id: 3, user: 'Dave R.', role: 'Safety Manager', action: 'completed Tailgate Mtg', time: '3 hours ago' },
    ],
    segments: [
        { id: '100+00', status: 'Complete', coords: [48.1, -101.1] },
        { id: '110+00', status: 'Active', coords: [48.12, -101.15] },
        { id: '120+00', status: 'Planned', coords: [48.14, -101.2] },
    ]
};
