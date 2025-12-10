
import React, { useState } from 'react';
import { X, Link as LinkIcon, Copy, Check, UserPlus } from 'lucide-react';
import { useTeamHub } from '../../contexts/TeamHubContext';

const ShareChannelModal = ({ isOpen, onClose, channel }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen || !channel) return null;

    const shareLink = `https://pipeline.com/channels/${channel.name}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] border border-[#404040] rounded-xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#404040]">
                    <h2 className="text-lg font-bold text-white">
                        Share #{channel.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Share Link */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Share Link
                            <span className="text-[#737373] font-normal ml-1">
                                ({channel.type === 'public' ? 'anyone with link can join' : 'requires approval'})
                            </span>
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-[#0f0f0f] border border-[#404040] rounded-lg">
                                <LinkIcon size={16} className="text-[#525252] shrink-0" />
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                    className="flex-1 bg-transparent text-sm text-[#a3a3a3] outline-none"
                                />
                            </div>
                            <button
                                onClick={handleCopyLink}
                                className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${copied
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#404040]" />
                        <span className="text-xs text-[#525252]">or</span>
                        <div className="flex-1 h-px bg-[#404040]" />
                    </div>

                    {/* Invite directly */}
                    <div className="text-center py-4">
                        <div className="w-12 h-12 bg-[#262626] rounded-full flex items-center justify-center mx-auto mb-3">
                            <UserPlus size={24} className="text-[#a3a3a3]" />
                        </div>
                        <p className="text-sm text-[#a3a3a3] mb-3">
                            Invite specific people from the Members tab
                        </p>
                        <button
                            onClick={onClose}
                            className="text-sm text-orange-400 hover:text-orange-300 font-medium"
                        >
                            Go to Members →
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end p-4 border-t border-[#404040]">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareChannelModal;
