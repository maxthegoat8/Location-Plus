import React from "react";
import { Chat } from "@/lib/data";

interface ChatItemProps {
  chat: Chat;
  onClick: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="px-4 py-3 flex border-b border-[#1F2C34] cursor-pointer"
    >
      <div className="relative mr-3">
        {chat.avatar ? (
          <img 
            src={chat.avatar} 
            className="w-12 h-12 object-cover rounded-full" 
            alt={`${chat.name} profile`} 
          />
        ) : chat.isGroup ? (
          <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M14 5l7 7l-7 7"></path>
              <path d="M5 5h11a4 4 0 0 1 0 8h-1"></path>
              <path d="M5 19v-6a4 4 0 0 1 4 -4h1"></path>
            </svg>
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5"></path>
              <path d="M12 12a10 10 0 1 0 10 10h-20"></path>
            </svg>
          </div>
        )}
        {chat.isOnline && <div className="status-dot"></div>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className="font-semibold truncate">{chat.name}</h3>
          <span className="text-xs wa-text-secondary">{chat.time}</span>
        </div>
        <div className="flex items-center">
          {chat.isRead && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-status-blue mr-1 text-xs">
              <path d="M5 12l5 5l10 -10"></path>
              <path d="M5 19l5 5l10 -10"></path>
            </svg>
          )}
          <p className="text-sm wa-text-secondary truncate">
            {chat.lastMessage}
          </p>
        </div>
      </div>
      {chat.unreadCount > 0 && (
        <div className="ml-2 flex items-start">
          <span className="wa-light-green text-[#121B22] text-xs px-1 rounded font-medium">
            {chat.unreadCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
