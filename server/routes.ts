import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertChatSchema, 
  insertMessageSchema, 
  insertSafetyContactSchema, 
  insertSafetyCheckInSchema,
  insertLocationSharingSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the WhatsApp clone

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Chat routes
  app.post("/api/chats", async (req, res) => {
    try {
      const chatData = insertChatSchema.parse(req.body);
      const chat = await storage.createChat(chatData);
      res.status(201).json(chat);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create chat" });
      }
    }
  });

  app.get("/api/chats/:id", async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const chat = await storage.getChat(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: "Failed to get chat" });
    }
  });

  app.get("/api/users/:userId/chats", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const chats = await storage.getUserChats(userId);
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user chats" });
    }
  });

  // Message routes
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create message" });
      }
    }
  });

  app.get("/api/chats/:chatId/messages", async (req, res) => {
    try {
      const chatId = parseInt(req.params.chatId);
      const messages = await storage.getChatMessages(chatId);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get chat messages" });
    }
  });

  // Safety contact routes
  app.post("/api/safety-contacts", async (req, res) => {
    try {
      const contactData = insertSafetyContactSchema.parse(req.body);
      const contact = await storage.createSafetyContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create safety contact" });
      }
    }
  });

  app.get("/api/users/:userId/safety-contacts", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const contacts = await storage.getUserSafetyContacts(userId);
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get safety contacts" });
    }
  });

  app.delete("/api/safety-contacts/:contactId", async (req, res) => {
    try {
      const contactId = parseInt(req.params.contactId);
      await storage.deleteSafetyContact(contactId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete safety contact" });
    }
  });

  // Safety check-in routes
  app.post("/api/safety-check-ins", async (req, res) => {
    try {
      const checkInData = insertSafetyCheckInSchema.parse(req.body);
      const checkIn = await storage.createSafetyCheckIn(checkInData);
      res.status(201).json(checkIn);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create safety check-in" });
      }
    }
  });

  app.get("/api/users/:userId/safety-check-ins", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const checkIns = await storage.getUserSafetyCheckIns(userId);
      res.status(200).json(checkIns);
    } catch (error) {
      res.status(500).json({ message: "Failed to get safety check-ins" });
    }
  });

  app.patch("/api/safety-check-ins/:checkInId", async (req, res) => {
    try {
      const checkInId = parseInt(req.params.checkInId);
      const { status } = req.body;
      if (!["pending", "completed", "missed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const checkIn = await storage.updateSafetyCheckInStatus(checkInId, status);
      res.status(200).json(checkIn);
    } catch (error) {
      res.status(500).json({ message: "Failed to update safety check-in" });
    }
  });

  // Location sharing routes
  app.post("/api/location-sharing", async (req, res) => {
    try {
      const locationData = insertLocationSharingSchema.parse(req.body);
      const location = await storage.createLocationSharing(locationData);
      res.status(201).json(location);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create location sharing" });
      }
    }
  });

  app.get("/api/users/:userId/location-sharing", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const location = await storage.getUserActiveLocationSharing(userId);
      if (!location) {
        return res.status(404).json({ message: "No active location sharing found" });
      }
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ message: "Failed to get location sharing" });
    }
  });

  app.delete("/api/location-sharing/:sharingId", async (req, res) => {
    try {
      const sharingId = parseInt(req.params.sharingId);
      await storage.deleteLocationSharing(sharingId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete location sharing" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
