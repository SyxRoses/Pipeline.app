import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../lib/db';
import { supabase } from '../lib/supabaseClient';

const SyncContext = createContext();

export const useSync = () => useContext(SyncContext);

export const SyncProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isSyncing, setIsSyncing] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            processSyncQueue();
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial check of queue size
        updatePendingCount();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const updatePendingCount = async () => {
        const count = await db.sync_queue.where('status').equals('pending').count();
        setPendingCount(count);
    };

    const addToSyncQueue = async (entityType, action, payload) => {
        try {
            await db.sync_queue.add({
                entity_type: entityType,
                action,
                payload,
                status: 'pending',
                timestamp: Date.now()
            });
            await updatePendingCount();

            // If we are actually online (pseudo-connection), try to sync immediately
            if (isOnline) {
                processSyncQueue();
            }
        } catch (error) {
            console.error("Failed to add to sync queue:", error);
        }
    };

    const processSyncQueue = async () => {
        if (isSyncing || !navigator.onLine) return;

        const pendingItems = await db.sync_queue.where('status').equals('pending').toArray();
        if (pendingItems.length === 0) return;

        setIsSyncing(true);

        try {
            for (const item of pendingItems) {
                // Processing logic based on action type
                // This is a simplified handler - in a real app, this would be a switch statement dispatching to services
                console.log(`Processing sync item ${item.id}: ${item.action} on ${item.entity_type}`);

                // SIMULATED SYNC: In real implementation, this calls Supabase
                // const { error } = await supabase.from(item.entity_type).insert(item.payload);

                // For MVP/Demo: Just mark as completed after a delay
                await new Promise(resolve => setTimeout(resolve, 500));

                await db.sync_queue.update(item.id, { status: 'completed', synced_at: Date.now() });
            }
            await updatePendingCount();
        } catch (err) {
            console.error("Sync processing failed:", err);
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <SyncContext.Provider value={{ isOnline, isSyncing, pendingCount, addToSyncQueue, processSyncQueue }}>
            {children}
        </SyncContext.Provider>
    );
};
