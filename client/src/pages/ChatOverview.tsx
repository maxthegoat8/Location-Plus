import { useCallback } from "react";
import { useLocation } from "wouter";
import StatusBar from "@/components/StatusBar";
import BottomNavigation from "@/components/BottomNavigation";
import ChatItem from "@/components/ChatItem";
import { chats } from "@/lib/data";

const ChatOverview = () => {
  const [_, setLocation] = useLocation();

  const navigateToLocation = useCallback(() => {
    setLocation("/location-safety");
  }, [setLocation]);

  const navigateToChat = useCallback((id: string) => {
    setLocation(`/chat/${id}`);
  }, [setLocation]);

  return (
    <div className="phone-container wa-bg-dark text-white rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 flex flex-col h-full">
        <StatusBar />
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chats</h1>
          <div className="flex space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 8h.01"></path>
              <rect x="4" y="4" width="16" height="16" rx="3"></rect>
              <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
              <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-green">
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 mb-2">
          <div className="wa-bg-bubble-in rounded-lg flex items-center px-4 py-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-text-secondary mr-2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.3 -4.3"></path>
            </svg>
            <input type="text" placeholder="Search" className="bg-transparent text-white w-full outline-none" />
          </div>
        </div>
        
        {/* Filters */}
        <div className="px-4 flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          <button className="wa-bg-green text-white px-4 py-1 rounded-full text-sm">All</button>
          <button 
            onClick={navigateToLocation}
            className="wa-bg-bubble-in text-white px-4 py-1 rounded-full text-sm flex items-center"
          >
            <span>Location +</span>
          </button>
          <button className="wa-bg-bubble-in text-white px-4 py-1 rounded-full text-sm">Unread 99+</button>
          <button className="wa-bg-bubble-in text-white px-4 py-1 rounded-full text-sm">Favorites</button>
          <button className="wa-bg-bubble-in text-white px-4 py-1 rounded-full text-sm">Groups 59</button>
        </div>
        
        {/* Archived */}
        <div className="px-4 py-3 flex items-center border-b border-[#1F2C34]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-text-secondary mr-4">
            <rect x="3" y="4" width="18" height="16" rx="2"></rect>
            <path d="M5 8h1"></path>
            <path d="M18 8h1"></path>
            <path d="M16 4v4"></path>
            <path d="M8 4v4"></path>
            <path d="M4 13h16"></path>
          </svg>
          <span>Archived</span>
        </div>
        
        {/* Chat List */}
        <div className="overflow-y-auto flex-1">
          {chats.map((chat) => (
            <ChatItem 
              key={chat.id}
              chat={chat}
              onClick={() => navigateToChat(chat.id)}
            />
          ))}
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation activeTab="chats" />
      </div>
    </div>
  );
};

export default ChatOverview;
