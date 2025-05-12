export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  isGroup: boolean;
  isRead: boolean;
  isOnline: boolean;
  unreadCount: number;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  type: "text" | "location";
}

export interface SafetyContact {
  id: string;
  name: string;
  avatar: string;
  phone: string;
}

// Safety Contacts
export const safetyContacts: SafetyContact[] = [
  {
    id: "sc1",
    name: "Julia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    phone: "+1234567890"
  },
  {
    id: "sc2",
    name: "Daniel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    phone: "+1234567891"
  },
  {
    id: "sc3",
    name: "Anna",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    phone: "+1234567892"
  },
  {
    id: "sc4",
    name: "Andrew",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    phone: "+1234567893"
  }
];

// Chat data
export const chats: Chat[] = [
  {
    id: "c1",
    name: "c'est moi",
    lastMessage: "You: https://preview--secure-chat-plus.lovable.app/",
    time: "Yesterday",
    isGroup: false,
    isRead: true,
    isOnline: false,
    unreadCount: 0
  },
  {
    id: "c2",
    name: "Impact Investing Group",
    lastMessage: 'You reacted ❤️ to "I already fixed the format"',
    time: "9:05 PM",
    isGroup: true,
    isRead: false,
    isOnline: false,
    unreadCount: 0
  },
  {
    id: "c3",
    name: "Tute Rodriguez",
    lastMessage: "sunday?",
    time: "8:48 PM",
    avatar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    isGroup: false,
    isRead: true,
    isOnline: true,
    unreadCount: 0
  },
  {
    id: "c4",
    name: "Matze K",
    lastMessage: "klingt nicht gut haha",
    time: "8:47 PM",
    avatar: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    isGroup: false,
    isRead: true,
    isOnline: false,
    unreadCount: 0
  },
  {
    id: "c5",
    name: "CATÓLICA LISBON MSc 24/25",
    lastMessage: "IC 24/25, Events/Tickets/Parties/Resells/Transport to events, BRM Group",
    time: "7:30 PM",
    isGroup: true,
    isRead: false,
    isOnline: true,
    unreadCount: 17
  },
  {
    id: "c6",
    name: "Forward2025",
    lastMessage: "Forward community 💙, Announcements",
    time: "6:15 PM",
    isGroup: true,
    isRead: false,
    isOnline: false,
    unreadCount: 0
  },
  {
    id: "c7",
    name: "Católica 24/25 🇵🇹",
    lastMessage: "Group chat messages...",
    time: "5:45 PM",
    isGroup: true,
    isRead: false,
    isOnline: false,
    unreadCount: 134
  }
];

// Message data for specific chat
const messagesForChat3: Message[] = [
  {
    id: "m1",
    content: "Hey! How are you doing?",
    timestamp: new Date(2023, 5, 12, 9, 15),
    senderId: "other",
    type: "text"
  },
  {
    id: "m2",
    content: "I'm good! Just working on some projects. How about you?",
    timestamp: new Date(2023, 5, 12, 9, 18),
    senderId: "me",
    type: "text"
  },
  {
    id: "m3",
    content: "All good here. I'm planning to go hiking this weekend. Would you like to join?",
    timestamp: new Date(2023, 5, 12, 9, 20),
    senderId: "other",
    type: "text"
  },
  {
    id: "m4",
    content: "Sounds fun! When and where?",
    timestamp: new Date(2023, 5, 12, 9, 22),
    senderId: "me",
    type: "text"
  },
  {
    id: "m5",
    content: "Sunday at 8am. We're going to Mountain Trail. I'll share my live location with you using the new Location+ feature so you can find us!",
    timestamp: new Date(2023, 5, 12, 9, 24),
    senderId: "other",
    type: "text"
  },
  {
    id: "m6",
    content: "Great! I'll check out the Location+ feature. Sunday works for me!",
    timestamp: new Date(2023, 5, 12, 9, 26),
    senderId: "me",
    type: "text"
  },
  {
    id: "m7",
    content: "Mountain Trail Entrance",
    timestamp: new Date(2023, 5, 12, 9, 30),
    senderId: "other",
    type: "location"
  },
  {
    id: "m8",
    content: "Got it! I'll set a safety check for when I leave home too.",
    timestamp: new Date(2023, 5, 12, 9, 32),
    senderId: "me",
    type: "text"
  }
];

// Helper functions to find data
export function findChatById(id: string): Chat | undefined {
  return chats.find(chat => chat.id === id);
}

export function findMessagesForChat(chatId: string): Message[] {
  // Currently only have messages for chat3, but could expand this to handle more chats
  if (chatId === "c3") {
    return messagesForChat3;
  }
  return [];
}
