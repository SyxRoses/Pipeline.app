
import React, { useState } from 'react';
import { Paperclip, Send, Smile, Type, Code, Link, Bold, Italic } from 'lucide-react';
import { useTeamHub } from '../../contexts/TeamHubContext';

const MessageComposer = ({ channelId }) => {
    const [content, setContent] = useState('');
    const { sendMessage } = useTeamHub();

    const handleSend = () => {
        if (!content.trim()) return;
        sendMessage(channelId, content);
        setContent('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 border-t border-[#404040] bg-[#0f0f0f] sticky bottom-0 z-20">
            <div className="bg-[#262626] border border-[#404040] rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#404040] focus-within:border-[#525252] transition-colors">
                {/* Toolbar */}
                <div className="flex items-center gap-1.5 p-1.5 border-b border-[#404040] bg-[#1f1f1f]">
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Bold size={14} /></button>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Italic size={14} /></button>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Type size={14} /></button>
                    <span className="w-px h-4 bg-[#404040] mx-1"></span>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Link size={14} /></button>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Code size={14} /></button>
                </div>

                {/* Text Area */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message #${channelId}`}
                    className="w-full bg-transparent text-white p-3 min-h-[44px] max-h-[200px] outline-none text-[15px] resize-none placeholder-[#525252]"
                    rows={1}
                />

                {/* Bottom Actions */}
                <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded-full transition-colors relative">
                            <PlusIcon />
                        </button>
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Smile size={18} /></button>
                            <button className="p-1.5 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Paperclip size={18} /></button>
                        </div>
                    </div>
                    <button
                        onClick={handleSend}
                        className={`p-2 rounded transition-all flex items-center gap-2 ${content.trim()
                                ? 'bg-[#f97316] text-white hover:bg-[#ea580c]'
                                : 'bg-[#333] text-[#525252] cursor-not-allowed'
                            }`}
                        disabled={!content.trim()}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
            <div className="text-[11px] text-[#525252] mt-2 text-right">
                <strong>Shift + Enter</strong> for new line
            </div>
        </div>
    );
};

// Custom Plus Icon for the circle button
const PlusIcon = () => (
    <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    </div>
);

export default MessageComposer;
