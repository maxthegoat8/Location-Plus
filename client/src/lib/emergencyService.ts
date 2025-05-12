import { SafetyContact, chats, Message } from "./data";

// Keep track of emergency messages we've sent
const emergencyMessages: Record<string, Message[]> = {};

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
    // For demonstration purposes, we're logging and creating mock messages
    safetyContacts.forEach(contact => {
      console.log(`Sending emergency alert to ${contact.name} at ${contact.phone}`);
      console.log(`Message: I need help, attached is my location`);
      
      // Create emergency chats with top priority for contacts
      updateContactChatWithEmergency(contact);
    });
    
    return true;
  } catch (error) {
    console.error("Failed to send emergency messages:", error);
    return false;
  }
}

// Find or "create" an emergency chat for a contact (mocked for demo)
export function updateContactChatWithEmergency(contact: SafetyContact) {
  // Find if the contact has a chat already
  let chatForContact = chats.find(c => c.name === contact.name);
  
  if (!chatForContact) {
    // In a real app, we would create a new chat in the database
    // For demo, we're just creating one in memory (which won't persist on refresh)
    const newChatId = `emergency-${contact.id}`;
    chatForContact = {
      id: newChatId,
      name: contact.name,
      lastMessage: "I need help, attached is my location",
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      avatar: contact.avatar,
      isGroup: false,
      isRead: true,
      isOnline: true,
      unreadCount: 0
    };
    
    // Add to beginning of chats list
    chats.unshift(chatForContact);
  } else {
    // Update the existing chat
    chatForContact.lastMessage = "I need help, attached is my location";
    chatForContact.time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    chatForContact.isRead = true;
    
    // Move to top of chats list
    const index = chats.findIndex(c => c.id === chatForContact!.id);
    if (index > 0) {
      chats.splice(index, 1);
      chats.unshift(chatForContact);
    }
  }
  
  // Create a location message in the chat
  const locationMessage: Message = {
    id: `emergency-loc-${Date.now()}-${contact.id}`,
    content: "I need help, attached is my location",
    timestamp: new Date(),
    senderId: "me",
    type: "location"
  };
  
  // Store the message for this chat
  if (!emergencyMessages[chatForContact.id]) {
    emergencyMessages[chatForContact.id] = [];
  }
  emergencyMessages[chatForContact.id].push(locationMessage);
  
  return chatForContact;
}

// Get emergency messages for a chat
export function getEmergencyMessagesForChat(chatId: string): Message[] {
  return emergencyMessages[chatId] || [];
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