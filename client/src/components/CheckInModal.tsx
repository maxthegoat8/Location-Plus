import React, { useState } from "react";
import { useSafety } from "@/contexts/SafetyContext";

interface CheckInModalProps {
  onClose: () => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ onClose }) => {
  const [selectedTime, setSelectedTime] = useState<number>(120); // 2 hours by default
  const [message, setMessage] = useState<string>("I'll let you know when I arrive...");
  const { selectedContacts } = useSafety();

  const timeOptions = [
    { value: 15, label: "15 min" },
    { value: 30, label: "30 min" },
    { value: 45, label: "45 min" },
    { value: 60, label: "1 hour" },
    { value: 120, label: "2 hours" },
    { value: 180, label: "3 hours" },
  ];

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="wa-bg-dark rounded-xl w-5/6 p-4">
        <h2 className="text-xl font-bold mb-4">Schedule a Check-In</h2>
        
        {/* Time Picker */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Select Check-In Time</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeOptions.map((option) => (
              <button 
                key={option.value}
                className={`py-2 rounded text-center ${
                  selectedTime === option.value ? "wa-bg-green text-white" : "wa-bg-bubble-in"
                }`}
                onClick={() => setSelectedTime(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Safety Contacts */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Send to</h3>
          <div className="flex space-x-2 overflow-x-auto">
            {selectedContacts.slice(0, 4).map((contact) => (
              <div key={contact.id} className="flex flex-col items-center">
                <img 
                  src={contact.avatar} 
                  className="w-12 h-12 rounded-full object-cover" 
                  alt={`Safety contact - ${contact.name}`} 
                />
                <span className="text-xs mt-1">{contact.name}</span>
              </div>
            ))}
            {selectedContacts.length === 0 && (
              <p className="text-sm wa-text-secondary">No contacts selected. Please select safety contacts first.</p>
            )}
          </div>
        </div>
        
        {/* Message */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Add a message (optional)</h3>
          <textarea 
            className="w-full wa-bg-bubble-in rounded-lg p-2 outline-none" 
            rows={2} 
            placeholder="I'll let you know when I arrive..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <button className="wa-bg-green text-white py-3 rounded-lg font-semibold">
            Set Check-In
          </button>
          <button 
            onClick={onClose}
            className="wa-bg-bubble-in py-3 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;
