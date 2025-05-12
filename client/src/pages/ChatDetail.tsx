import { useCallback, useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import StatusBar from "@/components/StatusBar";
import ChatBubble from "@/components/ChatBubble";
import { chats, findChatById, findMessagesForChat } from "@/lib/data";
import { getEmergencyMessagesForChat } from "@/lib/emergencyService";

const ChatDetail = () => {
  const [_, setLocation] = useLocation();
  const [matched, params] = useRoute('/chat/:id');
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMessages] = useState<any[]>([]); // Combined messages
  
  const chatId = params?.id || "";
  const chat = findChatById(chatId);
  const regularMessages = findMessagesForChat(chatId);
  const emergencyMessages = getEmergencyMessagesForChat(chatId);

  // Combine regular and emergency messages
  useEffect(() => {
    if (chat) {
      const combined = [...regularMessages, ...emergencyMessages].sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
      );
      setAllMessages(combined);
    }
  }, [chat, regularMessages, emergencyMessages]);

  const navigateToChats = useCallback(() => {
    setLocation("/chats");
  }, [setLocation]);

  if (!chat) {
    navigateToChats();
    return null;
  }

  // Format online status based on chat type
  const getStatusText = () => {
    if (chat.isGroup) {
      return "group chat";
    } else if (chat.isOnline) {
      return "online";
    } else {
      return "last seen today";
    }
  };

  // Check if this is an emergency contact/chat
  const isEmergencyChat = emergencyMessages.length > 0;

  return (
    <div className="phone-container wa-bg-dark text-white rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 flex flex-col h-full">
        <StatusBar />
        
        {/* Chat Header */}
        <div className={`p-2 flex items-center ${isEmergencyChat ? 'bg-red-800' : 'wa-bg-bubble-in'}`}>
          <button 
            onClick={navigateToChats} 
            className="mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l14 0"></path>
              <path d="M5 12l6 6"></path>
              <path d="M5 12l6 -6"></path>
            </svg>
          </button>
          <div className="flex items-center flex-1">
            {chat.avatar ? (
              <img src={chat.avatar} className="w-10 h-10 rounded-full mr-3" alt={chat.name} />
            ) : (
              <div className="w-10 h-10 bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5"></path>
                  <path d="M12 12a10 10 0 1 0 10 10h-20"></path>
                </svg>
              </div>
            )}
            <div>
              <h2 className="font-semibold">{chat.name}</h2>
              <p className="text-xs wa-text-secondary">{getStatusText()}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
              <circle cx="10" cy="10" r="3"></circle>
              <circle cx="17" cy="8" r="0.5" fill="currentColor"></circle>
              <path d="M5 19l3 -3c.928 -.893 2.072 -.893 3 0l4 4"></path>
              <path d="M14 19l3 -3c.928 -.893 2.072 -.893 3 0l1 1"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 bg-[#0B141A] bg-opacity-90 p-3 overflow-y-auto">
          {/* Emergency Alert Banner */}
          {isEmergencyChat && (
            <div className="bg-red-700 text-white p-3 rounded-lg mb-3 text-center">
              <p className="font-bold">Emergency Help Request Sent</p>
              <p className="text-sm">Location information has been shared with this contact</p>
            </div>
          )}

          {/* Date Divider */}
          <div className="flex justify-center my-3">
            <span className="wa-bg-bubble-in text-xs wa-text-secondary px-3 py-1 rounded-lg">TODAY</span>
          </div>
          
          {allMessages.map((message) => (
            <ChatBubble 
              key={message.id} 
              message={message} 
            />
          ))}
        </div>
        
        {/* Chat Input */}
        <div className="p-2 flex items-center wa-bg-dark">
          <button className="p-2 wa-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10a10 10 0 0 0 -10 -10"></path>
              <path d="M8 9l8 0"></path>
              <path d="M8 13l4 0"></path>
              <path d="M8 17l2 0"></path>
            </svg>
          </button>
          <div className="flex-1 wa-bg-bubble-in rounded-full px-4 py-2 mx-2 flex items-center">
            <input 
              type="text" 
              placeholder="Message" 
              className="bg-transparent w-full outline-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button className="ml-2 wa-text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                <path d="M9 17h6"></path>
                <path d="M9 13h6"></path>
              </svg>
            </button>
            <button className="ml-2 wa-text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 8h.01"></path>
                <rect x="4" y="4" width="16" height="16" rx="3"></rect>
                <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
                <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
              </svg>
            </button>
          </div>
          <button className="p-2 bg-[#128C7E] rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19c0.966 0 1.71 -1.052 3 -3.5s2.034 -3.5 3 -3.5a1 1 0 0 1 1 1v3a6 6 0 0 1 -6 6v-3z"></path>
              <path d="M12 19c-0.966 0 -1.71 -1.052 -3 -3.5s-2.034 -3.5 -3 -3.5a1 1 0 0 0 -1 1v3a6 6 0 0 0 6 6v-3z"></path>
              <path d="M13.41 13.109l-0.41 -0.109l4 -12h.5a2 2 0 0 1 2 2v3.5"></path>
              <path d="M10.59 13.109l.41 -0.109l-4 -12h-.5a2 2 0 0 0 -2 2v3.5"></path>
              <path d="M12 19v3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
