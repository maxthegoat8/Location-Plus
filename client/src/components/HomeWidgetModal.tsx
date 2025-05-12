import React from "react";
import { useLocation } from "wouter";
import { useSafety } from "@/contexts/SafetyContext";

interface HomeWidgetModalProps {
  onClose: () => void;
  onSendHelp: () => void;
}

const HomeWidgetModal: React.FC<HomeWidgetModalProps> = ({ onClose, onSendHelp }) => {
  const [_, setLocation] = useLocation();

  const navigateToChats = () => {
    setLocation("/chats");
    onClose();
  };

  const navigateToSafety = () => {
    setLocation("/location-safety");
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="wa-bg-dark rounded-xl w-5/6 max-w-xs p-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="wa-light-green rounded-full p-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold">Location+</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:wa-bg-bubble-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col space-y-3 mb-2">
          <button 
            onClick={navigateToChats}
            className="wa-bg-bubble-in py-3 px-4 rounded-lg font-semibold text-left flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
              <path d="M8 9h8"></path>
              <path d="M8 13h6"></path>
              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
            </svg>
            Open WhatsApp
          </button>
          
          <button 
            onClick={navigateToSafety}
            className="bg-green-600 py-3 px-4 rounded-lg font-semibold text-left flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-white">
              <path d="M7 12l5 5l10 -10"></path>
              <path d="M2 12l5 5m5 -5l5 -5"></path>
            </svg>
            I'm checking in
          </button>
          
          <button 
            onClick={onSendHelp}
            className="bg-red-600 py-3 px-4 rounded-lg font-semibold text-left flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-white">
              <path d="M10 5h4v4h-4z"></path>
              <path d="M12 9v6"></path>
              <path d="M12 22c5.523 0 10 -4.477 10 -10a10 10 0 0 0 -19.995 -.324l-.005 .324l.004 .28c.148 5.393 4.567 9.72 9.996 9.72z"></path>
            </svg>
            I need help
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeWidgetModal;