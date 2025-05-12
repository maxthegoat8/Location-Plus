import React, { createContext, useContext, useState, ReactNode } from "react";
import { SafetyContact, safetyContacts } from "@/lib/data";

interface SafetyContextType {
  selectedContacts: SafetyContact[];
  toggleContact: (contact: SafetyContact) => void;
  setSelectedDuration: (minutes: number) => void;
  selectedDuration: number;
  checkInStatus: "none" | "pending" | "safe" | "help";
  setCheckInStatus: (status: "none" | "pending" | "safe" | "help") => void;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const SafetyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default: first two contacts are selected
  const [selectedContacts, setSelectedContacts] = useState<SafetyContact[]>(
    safetyContacts.slice(0, 2)
  );
  const [selectedDuration, setSelectedDuration] = useState<number>(120); // 2 hours in minutes
  const [checkInStatus, setCheckInStatus] = useState<"none" | "pending" | "safe" | "help">("none");

  const toggleContact = (contact: SafetyContact) => {
    setSelectedContacts(prev => {
      const isSelected = prev.some(c => c.id === contact.id);
      if (isSelected) {
        return prev.filter(c => c.id !== contact.id);
      } else {
        return [...prev, contact];
      }
    });
  };

  return (
    <SafetyContext.Provider
      value={{
        selectedContacts,
        toggleContact,
        selectedDuration,
        setSelectedDuration,
        checkInStatus,
        setCheckInStatus
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error("useSafety must be used within a SafetyProvider");
  }
  return context;
};
