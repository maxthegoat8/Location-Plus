import { SafetyContact, chats } from "./data";

// This function will simulate creating new chats with emergency messages
export async function sendEmergencyMessages(safetyContacts: SafetyContact[]): Promise<boolean> {
  try {
    if (safetyContacts.length === 0) {
      console.error("No safety contacts selected");
      return false;
    }

    // Simulating API call to send emergency messages
    console.log(`Sending emergency messages to ${safetyContacts.length} contacts`);
    
    // In a real app, we would use the API to create real chat messages here
    // For demonstration purposes, we're just logging the action
    safetyContacts.forEach(contact => {
      console.log(`Sending emergency alert to ${contact.name} at ${contact.phone}`);
      console.log(`Message: I need help, attached is my location`);
    });
    
    return true;
  } catch (error) {
    console.error("Failed to send emergency messages:", error);
    return false;
  }
}

// Find an existing chat or create a new one for emergency contact
export function findOrCreateEmergencyChat(contact: SafetyContact) {
  // In a real app, we would check if a chat exists and create one if it doesn't
  // For now, we'll just return the first chat as a placeholder
  return chats[0];
}

// Generate the current location for emergency messaging
export function getCurrentLocation(): { latitude: number; longitude: number } {
  // In a real app, we would get the actual device location
  // For demonstration, we're returning fixed coordinates
  return {
    latitude: 40.7128,
    longitude: -74.0060
  };
}

// Format location as a user-friendly string
export function formatLocation(coordinates: { latitude: number; longitude: number }): string {
  return `Latitude: ${coordinates.latitude.toFixed(4)}, Longitude: ${coordinates.longitude.toFixed(4)}`;
}