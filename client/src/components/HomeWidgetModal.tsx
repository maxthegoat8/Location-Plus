import React from "react";
import { useLocation } from "wouter";

interface HomeWidgetModalProps {
  onClose: () => void;
  onSendHelp: () => void;
}

const HomeWidgetModal: React.FC<HomeWidgetModalProps> = ({ onClose, onSendHelp }) => {
  const [_, setLocation] = useLocation();

  const handleOpenWhatsApp = () => {
    setLocation("/chats");
    onClose();
  };

  const handleCheckIn = () => {
    setLocation("/safety");
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="wa-bg-dark rounded-xl w-5/6 p-4 max-w-xs">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">WhatsApp Location+</h2>
          <p className="wa-text-secondary text-sm">Choose an option</p>
        </div>
        
        <div className="flex flex-col space-y-3 mb-4">
          <button 
            onClick={handleOpenWhatsApp}
            className="wa-bg-bubble-in py-3 rounded-lg font-semibold flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#25D366]">
              <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
            </svg>
            Open WhatsApp
          </button>
          
          <button 
            onClick={handleCheckIn}
            className="wa-bg-bubble-in py-3 rounded-lg font-semibold flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-400">
              <path d="M12 8v4l3 3"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            I'm checking in
          </button>
          
          <button 
            onClick={onSendHelp}
            className="bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M10 5h4v4h-4z"></path>
              <path d="M12 9v6"></path>
              <path d="M12 22c5.523 0 10 -4.477 10 -10a10 10 0 0 0 -19.995 -.324l-.005 .324l.004 .28c.148 5.393 4.567 9.72 9.996 9.72z"></path>
            </svg>
            I need help
          </button>
        </div>
        
        <div className="text-center">
          <button 
            onClick={onClose}
            className="wa-text-secondary underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeWidgetModal;