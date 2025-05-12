import React, { useEffect } from "react";
import { useLocation } from "wouter";

interface EmergencyHelpSentProps {
  contactCount: number;
  onClose: () => void;
}

const EmergencyHelpSent: React.FC<EmergencyHelpSentProps> = ({ contactCount, onClose }) => {
  const [_, setLocation] = useLocation();

  // Automatically navigate to chats after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      setLocation("/chats");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose, setLocation]);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="wa-bg-dark rounded-xl w-5/6 p-5 max-w-xs text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 12l5 5l10 -10"></path>
              <path d="M2 12l5 5m5 -5l5 -5"></path>
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-2">Emergency Request Sent</h2>
        <p className="mb-6 text-sm wa-text-secondary">
          {contactCount === 1 
            ? "Your trusted contact has been notified with your current location." 
            : `Your ${contactCount} trusted contacts have been notified with your current location.`
          }
        </p>
        
        <p className="text-xs wa-text-secondary">
          Redirecting to chats in a moment...
        </p>
      </div>
    </div>
  );
};

export default EmergencyHelpSent;