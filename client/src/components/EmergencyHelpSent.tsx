import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface EmergencyHelpSentProps {
  contactCount: number;
  onClose: () => void;
}

const EmergencyHelpSent: React.FC<EmergencyHelpSentProps> = ({ contactCount, onClose }) => {
  const [_, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setLocation("/chats");
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [setLocation, onClose]);
  
  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-30">
      <div className="wa-bg-dark rounded-xl w-5/6 p-5 max-w-xs text-center">
        <div className="bg-red-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-6.364 6.364l-6.364 -6.364a9 9 0 0 1 12.728 -12.728z"></path>
            <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          </svg>
        </div>
        
        <h2 className="text-xl font-bold mb-2">Emergency Alert Sent</h2>
        <p className="mb-4">
          Your location and emergency request have been sent to {contactCount} trusted contact{contactCount !== 1 ? 's' : ''}.
        </p>
        
        <div className="wa-bg-bubble-in py-3 px-4 rounded-lg text-left mb-4">
          <p className="font-bold">Message sent:</p>
          <p>"I need help, attached is my location"</p>
        </div>
        
        <p className="text-sm text-gray-400 mb-6">
          Redirecting to chats in {countdown} seconds...
        </p>
        
        <button 
          onClick={() => {
            setLocation("/chats");
            onClose();
          }}
          className="wa-bg-green w-full py-3 rounded-lg font-semibold"
        >
          View Chats Now
        </button>
      </div>
    </div>
  );
};

export default EmergencyHelpSent;