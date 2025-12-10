
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Send, Smile, Type, Code, Link, Bold, Italic, AtSign } from 'lucide-react';
import { useTeamHub } from '../../contexts/TeamHubContext';
import MentionDropdown from './MentionDropdown';

const MessageComposer = ({ channelId }) => {
    const [content, setContent] = useState('');
    const [mentions, setMentions] = useState([]);
    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);
    const { sendMessage, users, activeChannel } = useTeamHub();

    const handleSend = () => {
        if (!content.trim()) return;
        sendMessage(channelId, content, [], mentions);
        setContent('');
        setMentions([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !showMentions) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const cursor = e.target.selectionStart;
        setContent(value);
        setCursorPosition(cursor);

        // Check for @ trigger
        const textBeforeCursor = value.substring(0, cursor);
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');

        if (lastAtIndex !== -1) {
            const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
            // Only show if @ is at start of word (preceded by space or start of string)
            const charBeforeAt = lastAtIndex > 0 ? value[lastAtIndex - 1] : ' ';
            if (charBeforeAt === ' ' || charBeforeAt === '\n' || lastAtIndex === 0) {
                // Check if there's no space in the query (still typing the mention)
                if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
                    setShowMentions(true);
                    setMentionQuery(textAfterAt);
                    return;
                }
            }
        }
        setShowMentions(false);
        setMentionQuery('');
    };

    const handleMentionSelect = (item) => {
        if (!item) {
            setShowMentions(false);
            setMentionQuery('');
            return;
        }

        const textBeforeCursor = content.substring(0, cursorPosition);
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');
        const textAfterCursor = content.substring(cursorPosition);

        let mentionText = '';
        if (item.id === 'channel' || item.id === 'here') {
            mentionText = `@${item.id}`;
            setMentions(prev => [...prev, item.id]);
        } else {
            mentionText = `@${item.name}`;
            setMentions(prev => [...prev, item.id]);
        }

        const newContent = content.substring(0, lastAtIndex) + mentionText + ' ' + textAfterCursor.trimStart();
        setContent(newContent);
        setShowMentions(false);
        setMentionQuery('');

        // Focus textarea
        setTimeout(() => {
            if (textareaRef.current) {
                const newPosition = lastAtIndex + mentionText.length + 1;
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newPosition, newPosition);
            }
        }, 0);
    };

    // Insert @ at current position
    const handleAtClick = () => {
        if (textareaRef.current) {
            const cursor = textareaRef.current.selectionStart;
            const before = content.substring(0, cursor);
            const after = content.substring(cursor);
            const needsSpace = before.length > 0 && before[before.length - 1] !== ' ' && before[before.length - 1] !== '\n';
            const newContent = before + (needsSpace ? ' @' : '@') + after;
            setContent(newContent);
            setCursorPosition(cursor + (needsSpace ? 2 : 1));
            setShowMentions(true);
            setMentionQuery('');
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 0);
        }
    };

    // Render content with highlighted mentions
    const renderContentWithMentions = () => {
        let displayContent = content;
        // This is just for visual reference - actual highlighting happens in ChatArea
        return displayContent;
    };

    return (
        <div className="p-4 border-t border-[#404040] bg-[#0f0f0f] sticky bottom-0 z-20">
            <div className="bg-[#262626] border border-[#404040] rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#404040] focus-within:border-[#525252] transition-colors relative">
                {/* Toolbar */}
                <div className="flex items-center gap-1.5 p-1.5 border-b border-[#404040] bg-[#1f1f1f]">
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Bold size={14} /></button>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Italic size={14} /></button>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Type size={14} /></button>
                    <span className="w-px h-4 bg-[#404040] mx-1"></span>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Link size={14} /></button>
                    <button className="p-1 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"><Code size={14} /></button>
                </div>

                {/* Mention Dropdown */}
                <MentionDropdown
                    users={users}
                    query={mentionQuery}
                    onSelect={handleMentionSelect}
                    isOpen={showMentions}
                />

                {/* Text Area */}
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message #${activeChannel?.name || channelId}`}
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
                            <button
                                onClick={handleAtClick}
                                className="p-1.5 text-[#a3a3a3] hover:text-white hover:bg-[#333] rounded"
                                title="Mention someone"
                            >
                                <AtSign size={18} />
                            </button>
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
                <strong>Shift + Enter</strong> for new line • <strong>@</strong> to mention
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
