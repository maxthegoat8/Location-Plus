import {
  type User,
  type InsertUser,
  type Chat,
  type InsertChat,
  type Message,
  type InsertMessage,
  type SafetyContact as SafetyContactType,
  type InsertSafetyContact,
  type SafetyCheckIn,
  type InsertSafetyCheckIn,
  type LocationSharing,
  type InsertLocationSharing
} from "@shared/schema";

// Storage interface for WhatsApp clone
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Chat methods
  getChat(id: number): Promise<Chat | undefined>;
  getUserChats(userId: number): Promise<Chat[]>;
  createChat(chat: InsertChat): Promise<Chat>;
  addUserToChat(chatId: number, userId: number, isAdmin?: boolean): Promise<void>;

  // Message methods
  getChatMessages(chatId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;

  // Safety contact methods
  getUserSafetyContacts(userId: number): Promise<SafetyContactType[]>;
  createSafetyContact(contact: InsertSafetyContact): Promise<SafetyContactType>;
  deleteSafetyContact(contactId: number): Promise<void>;

  // Safety check-in methods
  getUserSafetyCheckIns(userId: number): Promise<SafetyCheckIn[]>;
  createSafetyCheckIn(checkIn: InsertSafetyCheckIn): Promise<SafetyCheckIn>;
  updateSafetyCheckInStatus(checkInId: number, status: string): Promise<SafetyCheckIn>;
  addContactToSafetyCheckIn(checkInId: number, contactUserId: number): Promise<void>;

  // Location sharing methods
  getUserActiveLocationSharing(userId: number): Promise<LocationSharing | undefined>;
  createLocationSharing(location: InsertLocationSharing): Promise<LocationSharing>;
  deleteLocationSharing(sharingId: number): Promise<void>;
  addContactToLocationSharing(locationSharingId: number, contactUserId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chats: Map<number, Chat>;
  private chatParticipants: Map<string, { userId: number; chatId: number; isAdmin: boolean }>;
  private messages: Map<number, Message>;
  private safetyContacts: Map<number, SafetyContactType>;
  private safetyCheckIns: Map<number, SafetyCheckIn>;
  private safetyCheckInContacts: Map<string, { checkInId: number; contactUserId: number; notified: boolean }>;
  private locationSharing: Map<number, LocationSharing>;
  private locationSharingContacts: Map<string, { locationSharingId: number; contactUserId: number }>;

  private userIdCounter: number;
  private chatIdCounter: number;
  private messageIdCounter: number;
  private safetyContactIdCounter: number;
  private safetyCheckInIdCounter: number;
  private locationSharingIdCounter: number;

  constructor() {
    this.users = new Map();
    this.chats = new Map();
    this.chatParticipants = new Map();
    this.messages = new Map();
    this.safetyContacts = new Map();
    this.safetyCheckIns = new Map();
    this.safetyCheckInContacts = new Map();
    this.locationSharing = new Map();
    this.locationSharingContacts = new Map();

    this.userIdCounter = 1;
    this.chatIdCounter = 1;
    this.messageIdCounter = 1;
    this.safetyContactIdCounter = 1;
    this.safetyCheckInIdCounter = 1;
    this.locationSharingIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = {
      id,
      ...userData,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Chat methods
  async getChat(id: number): Promise<Chat | undefined> {
    return this.chats.get(id);
  }

  async getUserChats(userId: number): Promise<Chat[]> {
    const userChatIds = Array.from(this.chatParticipants.values())
      .filter(participant => participant.userId === userId)
      .map(participant => participant.chatId);

    return userChatIds.map(chatId => this.chats.get(chatId)!).filter(Boolean);
  }

  async createChat(chatData: InsertChat): Promise<Chat> {
    const id = this.chatIdCounter++;
    const chat: Chat = {
      id,
      ...chatData,
      createdAt: new Date()
    };
    this.chats.set(id, chat);
    return chat;
  }

  async addUserToChat(chatId: number, userId: number, isAdmin: boolean = false): Promise<void> {
    const key = `${chatId}-${userId}`;
    this.chatParticipants.set(key, { chatId, userId, isAdmin });
  }

  // Message methods
  async getChatMessages(chatId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.chatId === chatId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const message: Message = {
      id,
      ...messageData,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  // Safety contact methods
  async getUserSafetyContacts(userId: number): Promise<SafetyContactType[]> {
    return Array.from(this.safetyContacts.values())
      .filter(contact => contact.userId === userId);
  }

  async createSafetyContact(contactData: InsertSafetyContact): Promise<SafetyContactType> {
    const id = this.safetyContactIdCounter++;
    const contact: SafetyContactType = {
      id,
      ...contactData,
      createdAt: new Date()
    };
    this.safetyContacts.set(id, contact);
    return contact;
  }

  async deleteSafetyContact(contactId: number): Promise<void> {
    this.safetyContacts.delete(contactId);
  }

  // Safety check-in methods
  async getUserSafetyCheckIns(userId: number): Promise<SafetyCheckIn[]> {
    return Array.from(this.safetyCheckIns.values())
      .filter(checkIn => checkIn.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createSafetyCheckIn(checkInData: InsertSafetyCheckIn): Promise<SafetyCheckIn> {
    const id = this.safetyCheckInIdCounter++;
    const checkIn: SafetyCheckIn = {
      id,
      ...checkInData,
      status: "pending",
      completedAt: null,
      createdAt: new Date()
    };
    this.safetyCheckIns.set(id, checkIn);
    return checkIn;
  }

  async updateSafetyCheckInStatus(checkInId: number, status: string): Promise<SafetyCheckIn> {
    const checkIn = this.safetyCheckIns.get(checkInId);
    if (!checkIn) {
      throw new Error("Safety check-in not found");
    }

    const updatedCheckIn: SafetyCheckIn = {
      ...checkIn,
      status,
      completedAt: status === "completed" ? new Date() : checkIn.completedAt
    };
    this.safetyCheckIns.set(checkInId, updatedCheckIn);
    return updatedCheckIn;
  }

  async addContactToSafetyCheckIn(checkInId: number, contactUserId: number): Promise<void> {
    const key = `${checkInId}-${contactUserId}`;
    this.safetyCheckInContacts.set(key, { 
      checkInId, 
      contactUserId, 
      notified: false 
    });
  }

  // Location sharing methods
  async getUserActiveLocationSharing(userId: number): Promise<LocationSharing | undefined> {
    const now = new Date();
    return Array.from(this.locationSharing.values())
      .find(location => 
        location.userId === userId && 
        new Date(location.expiresAt) > now
      );
  }

  async createLocationSharing(locationData: InsertLocationSharing): Promise<LocationSharing> {
    const id = this.locationSharingIdCounter++;
    const location: LocationSharing = {
      id,
      ...locationData,
      createdAt: new Date()
    };
    this.locationSharing.set(id, location);
    return location;
  }

  async deleteLocationSharing(sharingId: number): Promise<void> {
    this.locationSharing.delete(sharingId);
    // Also delete any associated contacts
    Array.from(this.locationSharingContacts.entries())
      .filter(([_, value]) => value.locationSharingId === sharingId)
      .forEach(([key]) => this.locationSharingContacts.delete(key));
  }

  async addContactToLocationSharing(locationSharingId: number, contactUserId: number): Promise<void> {
    const key = `${locationSharingId}-${contactUserId}`;
    this.locationSharingContacts.set(key, { locationSharingId, contactUserId });
  }
}

export const storage = new MemStorage();

// ----- START: Check‑In Storage Methods -----
export async function createCheckIn(data: {
  userId: number;
  scheduledAt: Date;
  message: string;
  contacts: number[];
}): Promise<CheckIn> {
  const [record] = await db.insert(check_ins)
    .values({ ...data })
    .returning();
  return record;
}

export async function getPendingCheckIns(): Promise<CheckIn[]> {
  return await db
    .select()
    .from(check_ins)
    .where(and(
      lte(check_ins.scheduledAt, new Date()),
      eq(check_ins.sent, false)
    ));
}

export async function markCheckInSent(id: number): Promise<void> {
  await db.update(check_ins)
    .set({ sent: true })
    .where(eq(check_ins.id, id));
}

export async function getContactById(id: number) {
  const [record] = await db.select().from(trusted_contacts).where(eq(trusted_contacts.id, id));
  return record;
}
// ----- END: Check‑In Storage Methods -----