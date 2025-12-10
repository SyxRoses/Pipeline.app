import Dexie from 'dexie';

export class PipeLineDB extends Dexie {
    constructor() {
        super('PipeLineOneDB');
        this.version(1).stores({
            sync_queue: '++id, entity_type, action, status, timestamp', // Failed/Offline requests
            offline_cache: 'key, timestamp', // Generic key-value store for app data
            reports: '++id, type, status, data, created_at', // Local mirror for offline access
            crew_locations: '++id, user_id, timestamp' // For GPS tracking history
        });
    }
}

export const db = new PipeLineDB();
