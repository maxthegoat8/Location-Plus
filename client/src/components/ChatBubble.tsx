import React from "react";
import { Message } from "@/lib/data";
import { formatTime } from "@/lib/utils";

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isOutgoing = message.senderId === "me";

  if (message.type === "location") {
    return (
      <div className={`flex mb-3 ${isOutgoing ? "justify-end" : ""}`}>
        <div className={isOutgoing ? "wa-chat-bubble-out" : "wa-chat-bubble-in"}>
          <div className="flex items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#25D366] mr-1">
              <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-6.364 6.364l-6.364 -6.364a9 9 0 0 1 12.728 -12.728z"></path>
              <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            </svg>
            <span className="font-semibold">Live Location</span>
          </div>
          <div className="rounded w-full h-32 bg-[#1A2E35] relative overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1A2E35" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1A2E35" strokeWidth="1"/>
                </pattern>
              </defs>
              
              <rect width="100%" height="100%" fill="#0D1F26"/>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Roads */}
              <path d="M 0 100 L 400 100" stroke="#2D4046" strokeWidth="20" />
              <path d="M 200 0 L 200 200" stroke="#2D4046" strokeWidth="20" />
              
              {/* Location marker */}
              <circle cx="200" cy="100" r="15" fill="#25D366" />
            </svg>
          </div>
          <p className="mt-1 text-sm">{message.content}</p>
          <div className="flex justify-end items-center mt-1">
            <span className="text-[10px] wa-text-secondary mr-1">{formatTime(message.timestamp)}</span>
            {isOutgoing && (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-status-blue text-xs">
                <path d="M5 12l5 5l10 -10"></path>
                <path d="M5 19l5 5l10 -10"></path>
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-3 ${isOutgoing ? "justify-end" : ""}`}>
      <div className={isOutgoing ? "wa-chat-bubble-out" : "wa-chat-bubble-in"}>
        <p>{message.content}</p>
        <div className="flex justify-end items-center mt-1">
          <span className="text-[10px] wa-text-secondary mr-1">{formatTime(message.timestamp)}</span>
          {isOutgoing && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="wa-status-blue text-xs">
              <path d="M5 12l5 5l10 -10"></path>
              <path d="M5 19l5 5l10 -10"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
