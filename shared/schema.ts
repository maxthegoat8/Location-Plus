import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  avatar: text("avatar"),
  phone: text("phone").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat table
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  isGroup: boolean("is_group").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat participants table
export const chatParticipants = pgTable("chat_participants", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").references(() => chats.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").references(() => chats.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  type: text("type").default("text").notNull(), // text, location, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Safety contacts table
export const safetyContacts = pgTable("safety_contacts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  contactUserId: integer("contact_user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Safety check-ins table
export const safetyCheckIns = pgTable("safety_check_ins", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  scheduledTime: timestamp("scheduled_time").notNull(),
  status: text("status").default("pending").notNull(), // pending, completed, missed
  message: text("message"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Safety check-in contacts table
export const safetyCheckInContacts = pgTable("safety_check_in_contacts", {
  id: serial("id").primaryKey(),
  checkInId: integer("check_in_id").references(() => safetyCheckIns.id).notNull(),
  contactUserId: integer("contact_user_id").references(() => users.id).notNull(),
  notified: boolean("notified").default(false).notNull(),
  notifiedAt: timestamp("notified_at"),
});

// Location sharing table
export const locationSharing = pgTable("location_sharing", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Location sharing contacts table
export const locationSharingContacts = pgTable("location_sharing_contacts", {
  id: serial("id").primaryKey(),
  locationSharingId: integer("location_sharing_id").references(() => locationSharing.id).notNull(),
  contactUserId: integer("contact_user_id").references(() => users.id).notNull(),
});

// Schemas for insert operations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatar: true,
  phone: true,
});

export const insertChatSchema = createInsertSchema(chats).pick({
  name: true,
  isGroup: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  chatId: true,
  userId: true,
  content: true,
  type: true,
});

export const insertSafetyContactSchema = createInsertSchema(safetyContacts).pick({
  userId: true,
  contactUserId: true,
});

export const insertSafetyCheckInSchema = createInsertSchema(safetyCheckIns).pick({
  userId: true,
  scheduledTime: true,
  message: true,
});

export const insertLocationSharingSchema = createInsertSchema(locationSharing).pick({
  userId: true,
  latitude: true,
  longitude: true,
  expiresAt: true,
});

// Types for the tables
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Chat = typeof chats.$inferSelect;
export type InsertChat = z.infer<typeof insertChatSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type SafetyContact = typeof safetyContacts.$inferSelect;
export type InsertSafetyContact = z.infer<typeof insertSafetyContactSchema>;

export type SafetyCheckIn = typeof safetyCheckIns.$inferSelect;
export type InsertSafetyCheckIn = z.infer<typeof insertSafetyCheckInSchema>;

export type LocationSharing = typeof locationSharing.$inferSelect;
export type InsertLocationSharing = z.infer<typeof insertLocationSharingSchema>;
