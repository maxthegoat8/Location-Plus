import React, { useCallback } from "react";
import { useLocation } from "wouter";

interface BottomNavigationProps {
  activeTab: "updates" | "calls" | "communities" | "chats" | "settings";
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  const [_, setLocation] = useLocation();

  const navigateToChats = useCallback(() => {
    setLocation("/chats");
  }, [setLocation]);

  return (
    <div className="flex justify-around py-3 border-t border-[#1F2C34]">
      <button className={`flex flex-col items-center ${activeTab === "updates" ? "wa-green" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 11v8l3 -3"></path>
          <path d="M12 19l-3 -3"></path>
          <circle cx="12" cy="7" r="3"></circle>
          <path d="M17 16v-4"></path>
          <path d="M7 16v-4"></path>
        </svg>
        <span className="text-xs mt-1">Updates</span>
      </button>
      <button className={`flex flex-col items-center ${activeTab === "calls" ? "wa-green" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
        </svg>
        <span className="text-xs mt-1">Calls</span>
      </button>
      <button className={`flex flex-col items-center ${activeTab === "communities" ? "wa-green" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="1"></circle>
          <path d="M7 20a4 4 0 0 0 5 0a4 4 0 0 0 5 0"></path>
          <circle cx="17" cy="5" r="1"></circle>
          <path d="M5 8v5"></path>
          <path d="M19 8v5"></path>
          <path d="M5 13h14"></path>
        </svg>
        <span className="text-xs mt-1">Communities</span>
      </button>
      <button 
        onClick={navigateToChats}
        className={`flex flex-col items-center ${activeTab === "chats" ? "wa-green" : ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 9h8"></path>
          <path d="M8 13h6"></path>
          <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
        </svg>
        <span className="text-xs mt-1">Chats</span>
      </button>
      <button className={`flex flex-col items-center ${activeTab === "settings" ? "wa-green" : ""}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        </svg>
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
