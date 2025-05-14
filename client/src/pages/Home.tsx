import { useCallback, useState } from "react";
import { useLocation } from "wouter";
import StatusBar from "@/components/StatusBar";
import HomeWidgetModal from "@/components/HomeWidgetModal";
import EmergencyHelpSent from "@/components/EmergencyHelpSent";
import { useSafety } from "@/contexts/SafetyContext";
import { sendEmergencyMessages } from "@/lib/emergencyService";

const Home = () => {
  const [_, setLocation] = useLocation();
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const { selectedContacts } = useSafety();

  const openWidgetModal = useCallback(() => {
    setIsWidgetModalOpen(true);
  }, []);

  const closeWidgetModal = useCallback(() => {
    setIsWidgetModalOpen(false);
  }, []);

  const closeEmergencyModal = useCallback(() => {
    setIsEmergencyModalOpen(false);
  }, []);

  const handleSendHelp = useCallback(async () => {
    // Close the widget modal
    setIsWidgetModalOpen(false);
    
    // Send emergency messages to all selected safety contacts
    const result = await sendEmergencyMessages(selectedContacts);
    
    if (result) {
      // Show the emergency sent confirmation
      setIsEmergencyModalOpen(true);
    }
  }, [selectedContacts]);

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const batteryLevel = "100 % geladen";

  return (
    <div className="phone-container wa-bg-dark text-white rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 flex flex-col h-full">
        <StatusBar />
        
        {/* Home Screen Content */}
        <div className="flex-1 p-4 bg-gradient-to-br from-pink-300 via-red-300 to-blue-400 flex flex-col justify-center items-center">
          <div className="mb-4 text-4xl font-semibold text-white text-center">
            {currentTime}
          </div>
          <div className="text-white text-center mb-6">
            {batteryLevel}
          </div>
          
          {/* WhatsApp Widget */}
          <div 
            onClick={openWidgetModal}
            className="bg-gray-800 bg-opacity-70 p-4 rounded-xl w-full max-w-xs flex items-center space-x-3 text-white cursor-pointer shadow-lg mb-4"
          >
            <div className="wa-light-green rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
              </svg>
            </div>
            <span className="text-xl">Check-In at 10:40!</span>
          </div>
          
          {/* Quick Access Icons */}
          <div className="flex justify-between w-full max-w-xs mt-auto">
            <div className="bg-gray-800 bg-opacity-70 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M15 14l5 -5l-5 -5"></path>
                <path d="M4 20l7 -12"></path>
              </svg>
            </div>
            <div className="bg-gray-800 bg-opacity-70 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M8.813 10.242l.708 -.708a2 2 0 1 1 2.828 2.83l-.708 .706"></path>
                <path d="M11.642 13.642l-.708 .708a2 2 0 1 1 -2.828 -2.828l.708 -.708"></path>
                <circle cx="12" cy="12" r="9"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isWidgetModalOpen && (
        <HomeWidgetModal 
          onClose={closeWidgetModal} 
          onSendHelp={handleSendHelp} 
        />
      )}

      {isEmergencyModalOpen && (
        <EmergencyHelpSent 
          contactCount={selectedContacts.length} 
          onClose={closeEmergencyModal} 
        />
      )}
    </div>
  );
};

export default Home;