
import React, { useState, useEffect, useRef } from 'react';
import { Users, Radio } from 'lucide-react';

const MentionDropdown = ({
    users,
    query,
    onSelect,
    position,
    isOpen
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dropdownRef = useRef(null);

    // Filter users based on query
    const filteredUsers = users.filter(u =>
        u.id !== 'system' &&
        (query === '' || u.name.toLowerCase().includes(query.toLowerCase()))
    );

    // Special mentions
    const specialMentions = [
        { id: 'channel', name: '@channel', description: 'Notify all members', icon: Users },
        { id: 'here', name: '@here', description: 'Notify active members', icon: Radio }
    ].filter(m => query === '' || m.name.toLowerCase().includes(`@${query}`.toLowerCase()));

    const allItems = [...filteredUsers, ...specialMentions];

    // Reset selection on query change
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % allItems.length);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (allItems[selectedIndex]) {
                        onSelect(allItems[selectedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onSelect(null);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, selectedIndex, allItems, onSelect]);

    // Scroll selected item into view
    useEffect(() => {
        if (dropdownRef.current) {
            const selected = dropdownRef.current.querySelector('[data-selected="true"]');
            if (selected) {
                selected.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);

    if (!isOpen || allItems.length === 0) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute bottom-full mb-2 left-0 w-72 max-h-64 overflow-y-auto bg-[#1f1f1f] border border-[#404040] rounded-lg shadow-xl z-50 custom-scrollbar"
            style={position}
        >
            {/* User list */}
            {filteredUsers.length > 0 && (
                <div className="py-1">
                    {filteredUsers.map((user, index) => (
                        <button
                            key={user.id}
                            data-selected={selectedIndex === index}
                            onClick={() => onSelect(user)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${selectedIndex === index
                                ? 'bg-orange-500/20'
                                : 'hover:bg-[#262626]'
                                }`}
                        >
                            <div
                                className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                                style={{ backgroundColor: user.avatarBg }}
                            >
                                {user.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">{user.name}</div>
                                <div className="text-xs text-[#737373] truncate">{user.role}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Special mentions */}
            {specialMentions.length > 0 && (
                <>
                    {filteredUsers.length > 0 && <div className="border-t border-[#404040]" />}
                    <div className="py-1">
                        <div className="px-3 py-1 text-[10px] font-medium text-[#525252] uppercase tracking-wider">
                            Special
                        </div>
                        {specialMentions.map((mention, idx) => {
                            const index = filteredUsers.length + idx;
                            const Icon = mention.icon;
                            return (
                                <button
                                    key={mention.id}
                                    data-selected={selectedIndex === index}
                                    onClick={() => onSelect(mention)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${selectedIndex === index
                                        ? 'bg-orange-500/20'
                                        : 'hover:bg-[#262626]'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded bg-[#333] flex items-center justify-center text-[#a3a3a3] shrink-0">
                                        <Icon size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white">{mention.name}</div>
                                        <div className="text-xs text-[#737373]">{mention.description}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default MentionDropdown;
