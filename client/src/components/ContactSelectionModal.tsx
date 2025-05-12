import React from "react";
import { SafetyContact } from "@/lib/data";

interface ContactSelectionModalProps {
  availableContacts: SafetyContact[];
  onSelectContact: (contact: SafetyContact) => void;
  onClose: () => void;
}

const ContactSelectionModal: React.FC<ContactSelectionModalProps> = ({
  availableContacts,
  onSelectContact,
  onClose
}) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="wa-bg-dark rounded-xl w-5/6 p-4 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Contact</h2>
          <button onClick={onClose} className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="wa-bg-bubble-in rounded-lg flex items-center px-4 py-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-text-secondary mr-2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.3 -4.3"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search contacts" 
            className="bg-transparent text-white w-full outline-none" 
          />
        </div>

        <div className="overflow-y-auto flex-1">
          {availableContacts.map(contact => (
            <div 
              key={contact.id}
              className="flex items-center py-3 border-b border-[#1F2C34] cursor-pointer"
              onClick={() => onSelectContact(contact)}
            >
              <img 
                src={contact.avatar} 
                className="w-12 h-12 rounded-full mr-4 object-cover" 
                alt={`${contact.name}`} 
              />
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm wa-text-secondary">{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="wa-bg-bubble-in py-3 rounded-lg font-semibold mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContactSelectionModal;