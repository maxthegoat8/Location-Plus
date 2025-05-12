import React from "react";
import { useLocation } from "wouter";
import { useSafety } from "@/contexts/SafetyContext";
import { sendEmergencyMessages } from "@/lib/emergencyService";
import EmergencyHelpSent from "./EmergencyHelpSent";

interface TimerCompleteModalProps {
  onClose: () => void;
}

const TimerCompleteModal: React.FC<TimerCompleteModalProps> = ({ onClose }) => {
  const [_, setLocation] = useLocation();
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = React.useState(false);
  const { selectedContacts } = useSafety();

  const handleImSafe = () => {
    // Handle the "I am safe" flow
    onClose();
  };

  const handleNeedHelp = async () => {
    // Send emergency messages
    const result = await sendEmergencyMessages(selectedContacts);
    
    if (result) {
      onClose(); // Close this modal
      setIsEmergencyModalOpen(true); // Show the emergency sent modal
    }
  };

  const closeEmergencyModal = () => {
    setIsEmergencyModalOpen(false);
    setLocation("/chats"); // Navigate to chats after emergency is handled
  };

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div className="wa-bg-dark rounded-xl w-5/6 p-4 max-w-xs">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Check-In Time!</h2>
            <p className="wa-text-secondary text-sm">Your scheduled check-in time has arrived.</p>
          </div>
          
          <div className="flex flex-col space-y-3 mb-4">
            <button 
              onClick={handleImSafe}
              className="bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M7 12l5 5l10 -10"></path>
                <path d="M2 12l5 5m5 -5l5 -5"></path>
              </svg>
              I'm Safe
            </button>
            
            <button 
              onClick={handleNeedHelp}
              className="bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M10 5h4v4h-4z"></path>
                <path d="M12 9v6"></path>
                <path d="M12 22c5.523 0 10 -4.477 10 -10a10 10 0 0 0 -19.995 -.324l-.005 .324l.004 .28c.148 5.393 4.567 9.72 9.996 9.72z"></path>
              </svg>
              I Need Help
            </button>
          </div>
          
          <div className="text-center">
            <button 
              onClick={onClose}
              className="wa-text-secondary underline"
            >
              Snooze for 5 minutes
            </button>
          </div>
        </div>
      </div>
      
      {isEmergencyModalOpen && (
        <EmergencyHelpSent 
          contactCount={selectedContacts.length} 
          onClose={closeEmergencyModal} 
        />
      )}
    </>
  );
};

export default TimerCompleteModal;