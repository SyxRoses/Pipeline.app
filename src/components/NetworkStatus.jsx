import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useSync } from '../contexts/SyncContext';

const NetworkStatus = () => {
    const { isOnline, isSyncing, pendingCount, processSyncQueue } = useSync();

    if (isOnline && pendingCount === 0 && !isSyncing) return null;

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-[100] px-4 py-2 flex items-center justify-center gap-3 transition-colors ${isOnline ? 'bg-orange-600' : 'bg-zinc-800 border-t border-zinc-700'}`}>
            {!isOnline && (
                <>
                    <WifiOff size={18} className="text-zinc-400" />
                    <span className="text-sm font-medium text-zinc-300">Offline Mode • {pendingCount} changes queued</span>
                </>
            )}

            {isOnline && (
                <>
                    {isSyncing ? (
                        <>
                            <RefreshCw size={18} className="text-white animate-spin" />
                            <span className="text-sm font-medium text-white">Syncing data...</span>
                        </>
                    ) : (
                        <>
                            <Wifi size={18} className="text-white" />
                            <span className="text-sm font-medium text-white">Back Online • {pendingCount} pending</span>
                            <button
                                onClick={processSyncQueue}
                                className="ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs text-white font-semibold transition-colors"
                            >
                                Sync Now
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default NetworkStatus;
