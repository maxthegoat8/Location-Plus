import { useCallback, useState } from "react";
import { useLocation } from "wouter";
import StatusBar from "@/components/StatusBar";
import SafetyContactCard from "@/components/SafetyContactCard";
import CheckInModal from "@/components/CheckInModal";
import SafetyCheckModal from "@/components/SafetyCheckModal";
import CheckInCountdown from "@/components/CheckInCountdown";
import ContactSelectionModal from "@/components/ContactSelectionModal";
import { useSafety } from "@/contexts/SafetyContext";
import { safetyContacts } from "@/lib/data";

const LocationSafety = () => {
  const [_, setLocation] = useLocation();
  const [duration, setDuration] = useState(120); // Default 2 hours (in minutes)
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [isSafetyCheckModalOpen, setIsSafetyCheckModalOpen] = useState(false);
  const [isContactSelectionModalOpen, setIsContactSelectionModalOpen] = useState(false);
  const [isLocationShared, setIsLocationShared] = useState(true);
  const [scheduledCheckInTime, setScheduledCheckInTime] = useState<Date | null>(null);
  const [checkInMessage, setCheckInMessage] = useState("");
  const { selectedContacts, toggleContact } = useSafety();

  const navigateToChats = useCallback(() => {
    setLocation("/chats");
  }, [setLocation]);

  const openCheckInModal = useCallback(() => {
    setIsCheckInModalOpen(true);
  }, []);

  const closeCheckInModal = useCallback(() => {
    setIsCheckInModalOpen(false);
  }, []);

  const handleSetCheckIn = useCallback((scheduledTime: Date, message: string) => {
    // Close the check-in modal
    setIsCheckInModalOpen(false);
    
    // Set the scheduled time and message
    setScheduledCheckInTime(scheduledTime);
    setCheckInMessage(message);
    
    // Start the countdown
    setIsCountdownActive(true);
  }, []);

  const openSafetyCheckModal = useCallback(() => {
    // Stop the countdown
    setIsCountdownActive(false);
    
    // Open the safety check modal
    setIsSafetyCheckModalOpen(true);
  }, []);

  const cancelScheduledCheckIn = useCallback(() => {
    setIsCountdownActive(false);
    setScheduledCheckInTime(null);
  }, []);

  const closeSafetyCheckModal = useCallback(() => {
    setIsSafetyCheckModalOpen(false);
  }, []);

  const openContactSelectionModal = useCallback(() => {
    setIsContactSelectionModalOpen(true);
  }, []);

  const closeContactSelectionModal = useCallback(() => {
    setIsContactSelectionModalOpen(false);
  }, []);

  // This should filter contacts that are not already selected
  const getAvailableContacts = useCallback(() => {
    return safetyContacts.filter(
      contact => !selectedContacts.some(sc => sc.id === contact.id)
    );
  }, [selectedContacts]);

  const getDurationLabel = useCallback((minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    } else {
      return `${Math.floor(minutes / 60)}h`;
    }
  }, []);

  return (
    <div className="phone-container wa-bg-dark text-white rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 flex flex-col h-full">
        <StatusBar />
        
        {/* Header */}
        <div className="wa-bg-green p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={navigateToChats} className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l14 0"></path>
                <path d="M5 12l6 6"></path>
                <path d="M5 12l6 -6"></path>
              </svg>
            </button>
            <h1 className="text-xl font-bold">Location +</h1>
          </div>
          <div className="flex space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 8h.01"></path>
              <rect x="4" y="4" width="16" height="16" rx="3"></rect>
              <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
              <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
        </div>
        
        {/* Safety Features Description */}
        <div className="p-4 wa-bg-green text-white">
          <p>Friends can request your live location and send safety check messages.</p>
        </div>
        
        {/* Safety Contacts */}
        <div className="p-4 wa-bg-dark overflow-y-auto flex-1">
          <h2 className="text-lg font-semibold mb-3">My safety contacts...</h2>
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            {selectedContacts.map((contact) => (
              <SafetyContactCard
                key={contact.id}
                contact={contact}
                isSelected={true}
                onToggle={() => toggleContact(contact)}
              />
            ))}
            <SafetyContactCard
              isAddButton={true}
              onAddClick={openContactSelectionModal}
            />
          </div>
          
          {/* Live Location Toggle */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold">Share live location</h3>
              <p className="text-sm wa-text-secondary">Friends can see your location</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isLocationShared}
                onChange={() => setIsLocationShared(!isLocationShared)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:wa-light-green"></div>
            </label>
          </div>
          
          {/* Location Duration Slider */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Duration for location sharing</h3>
            <input 
              type="range" 
              min="15" 
              max="480" 
              step="15" 
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-2 wa-bg-bubble-in rounded-lg appearance-none cursor-pointer" 
            />
            <div className="flex justify-between text-xs wa-text-secondary mt-1">
              <span>15min</span>
              <span>2h</span>
              <span>4h</span>
              <span>8h</span>
            </div>
          </div>
          
          {/* Location Map */}
          <div className="mb-6 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-black opacity-30 flex items-center justify-center">
              <div className="text-white text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                  <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-6.364 6.364l-6.364 -6.364a9 9 0 0 1 12.728 -12.728z"></path>
                  <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                </svg>
                <p className="font-semibold">Your Current Location</p>
              </div>
            </div>
            <svg width="100%" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1A2E35" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1A2E35" strokeWidth="1"/>
                </pattern>
              </defs>
              
              <rect width="100%" height="100%" fill="#0D1F26"/>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Roads */}
              <path d="M 0 100 L 400 100" stroke="#2D4046" strokeWidth="20" />
              <path d="M 200 0 L 200 200" stroke="#2D4046" strokeWidth="20" />
              
              {/* Location markers */}
              <circle cx="200" cy="100" r="15" fill="#25D366" />
              <circle cx="150" cy="140" r="6" fill="#34B7F1" />
              <circle cx="250" cy="70" r="6" fill="#34B7F1" />
            </svg>
          </div>
          
          {/* Safety Check Button */}
          <div className="wa-bg-bubble-in p-4 rounded-xl mb-4">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#25D366] mr-2">
                <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
                <path d="M12 3v6"></path>
              </svg>
              <h3 className="font-semibold">Send safety check</h3>
            </div>
            <button 
              onClick={openCheckInModal}
              className="wa-light-green text-white w-full py-2 rounded-lg font-semibold"
            >
              Schedule Check-In
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isCheckInModalOpen && (
        <CheckInModal 
          onClose={closeCheckInModal} 
          onSetCheckIn={handleSetCheckIn}
        />
      )}
      
      {isCountdownActive && scheduledCheckInTime && (
        <CheckInCountdown 
          scheduledTime={scheduledCheckInTime}
          onComplete={openSafetyCheckModal}
          onCancel={cancelScheduledCheckIn}
        />
      )}
      
      {isSafetyCheckModalOpen && (
        <SafetyCheckModal onClose={closeSafetyCheckModal} />
      )}

      {isContactSelectionModalOpen && (
        <ContactSelectionModal
          availableContacts={getAvailableContacts()}
          onSelectContact={toggleContact}
          onClose={closeContactSelectionModal}
        />
      )}
    </div>
  );
};

export default LocationSafety;
