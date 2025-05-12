import React from "react";
import { SafetyContact } from "@/lib/data";

interface SafetyContactCardProps {
  contact?: SafetyContact;
  isSelected?: boolean;
  onToggle?: () => void;
  isAddButton?: boolean;
  onAddClick?: () => void;
}

const SafetyContactCard: React.FC<SafetyContactCardProps> = ({ 
  contact, 
  isSelected = false,
  onToggle,
  isAddButton = false,
  onAddClick
}) => {
  if (isAddButton) {
    return (
      <div 
        className="flex flex-col items-center cursor-pointer"
        onClick={onAddClick}
      >
        <div className="relative w-16 h-16 wa-bg-green rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
        </div>
        <span className="text-sm mt-1">Add New</span>
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div 
      className={`flex flex-col items-center ${isSelected ? 'opacity-100' : 'opacity-70'} cursor-pointer`}
      onClick={onToggle}
    >
      <div className="relative">
        <img 
          src={contact.avatar} 
          className="w-16 h-16 rounded-full object-cover" 
          alt={`Safety contact - ${contact.name}`} 
        />
        {isSelected && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M5 12l5 5l10 -10"></path>
            </svg>
          </div>
        )}
      </div>
      <span className="text-sm mt-1">{contact.name}</span>
    </div>
  );
};

export default SafetyContactCard;
